/**
 * 백엔드 REST 호출 최소 래퍼.
 *
 * 공용 응답 포맷·전역 에러 규약은 백엔드와 아직 합의되지 않았다(CLAUDE.md). 그래서 광범위한
 * api-client는 만들지 않고, #18 소셜 로그인 완결에 필요한 만큼만 둔다. 규격이 확정되면 여기에
 * 응답 언래핑·에러 매핑을 얹는다.
 *
 * - 베이스 URL은 `NEXT_PUBLIC_API_BASE_URL`(소셜 인가 이동과 동일 소스, lib/oauth.ts).
 * - 세션은 SID httpOnly 쿠키라 모든 호출에 `credentials: 'include'`가 필수다(브라우저가 쿠키를
 *   자동 첨부·수신). 로컬은 localhost:3000↔8080이 동일 site(포트는 site 판정에서 제외)라
 *   SameSite=Lax 쿠키가 그대로 흐른다. 배포에서 도메인이 갈리면 SameSite=None·Secure가 필요하다.
 */

/**
 * 백엔드 베이스 URL. 미배선(빈 값)이면 null.
 * 소셜 인가 이동(lib/oauth.ts)과 REST 호출이 같은 소스를 쓰도록 여기서 한 번만 정의해 내보낸다.
 */
export function getApiBaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (raw === undefined || raw === '') {
    return null;
  }
  // 값 뒤에 슬래시가 붙어 와도 이중 슬래시가 되지 않도록 정리한다.
  return raw.replace(/\/+$/, '');
}

/**
 * 실패한 응답(비 2xx)·네트워크 오류·미배선을 하나의 타입으로 올린다.
 * `status`는 HTTP 상태 코드(네트워크 오류·미배선은 0)라 호출부가 401(미로그인) 등을 분기할 수 있다.
 */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * 베이스 URL을 붙이고 세션 쿠키를 실어 fetch한다. 비 2xx면 ApiError를 던진다.
 * 응답 파싱은 엔드포인트마다 모양이 달라 여기서 하지 않고 Response를 그대로 돌려준다(호출부가 파싱).
 */
export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const baseUrl = getApiBaseUrl();
  if (baseUrl === null) {
    throw new ApiError('API 베이스 URL이 설정되지 않았습니다(NEXT_PUBLIC_API_BASE_URL).', 0);
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      credentials: 'include',
    });
  } catch {
    // fetch는 네트워크 단절·CORS 차단 등에서 reject한다. 상태 코드가 없으므로 0으로 표기한다.
    throw new ApiError('네트워크 오류로 요청에 실패했습니다.', 0);
  }

  if (!response.ok) {
    throw new ApiError(`요청이 실패했습니다(HTTP ${response.status}).`, response.status);
  }
  return response;
}

import type { OAuthProvider } from '@/types/auth';

/**
 * 소셜 로그인(카카오·구글) 진입 URL 생성.
 *
 * 백엔드 리다이렉트 주도 방식이다(#18). 프론트는 아래 경로로 "이동만" 하고, 카카오·구글과의
 * code 교환과 세션(SID httpOnly 쿠키) 발급은 전부 백엔드가 처리한다. 인증이 끝나면 백엔드가
 * 성공 시 `/oauth/callback`, 실패 시 `/oauth/failed?reason=...`로 다시 프론트로 리다이렉트한다.
 *
 * 베이스 URL은 `NEXT_PUBLIC_API_BASE_URL`로 주입한다(클라이언트에서 이동하므로 NEXT_PUBLIC 필요).
 * 백엔드가 값을 확정하기 전이라, 미배선이면 null을 돌려 호출부가 이동을 건너뛰게 한다.
 */

// 백엔드 표준 경로. code 교환·세션 발급은 서버가 담당하므로 프론트는 provider 이름만 붙인다.
const AUTHORIZE_PATH = '/oauth2/authorization';

function getApiBaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (raw === undefined || raw === '') {
    return null;
  }
  // 값 확정 시 뒤에 슬래시가 붙어 와도 이중 슬래시가 되지 않도록 정리한다.
  return raw.replace(/\/+$/, '');
}

/**
 * 제공자별 인가 시작 URL. 베이스 URL(env)이 아직 없으면 null.
 * null이면 호출부는 이동하지 않는다(백엔드 값 배선 후 동작).
 */
export function getOAuthAuthorizeUrl(provider: OAuthProvider): string | null {
  const baseUrl = getApiBaseUrl();
  if (baseUrl === null) {
    return null;
  }
  return `${baseUrl}${AUTHORIZE_PATH}/${provider}`;
}

import { apiFetch } from './api';

/**
 * 인증/회원 관련 백엔드 호출.
 *
 * 백엔드 소스(jnj3j3/MoongCheap_backend@develop) 컨트롤러로 요청·응답 규격을 확인해 작성했다.
 * 다른 도메인 호출까지 일반화한 api-client는 규격 합의 전이라 만들지 않는다(CLAUDE.md).
 */

/**
 * 소셜 최초 로그인 완료 요청 바디. 백엔드 `SocialSignupCompleteRequestDto`와 필드가 일치한다.
 * - termsAgreed  : [필수] 이용약관 동의
 * - policyAgreed : [필수] 개인정보 수집·이용 동의
 * - ageVerified  : [필수] 만 14세 이상
 */
export interface SocialSignupCompletePayload {
  termsAgreed: boolean;
  policyAgreed: boolean;
  ageVerified: boolean;
  nickname: string;
}

/**
 * 소셜 최초 로그인 유저의 가입을 완료한다.
 *
 * 백엔드 OAuth 성공 핸들러는 약관 미동의(=최초 유저)를 `/oauth/callback?status=incomplete`로
 * 되돌리고, `IncompleteSignupFilter`가 완료 전까지 다른 API를 막는다. 이 호출로 약관 동의와
 * 닉네임을 확정해야 로그인이 실제로 성립한다. 인증은 이미 발급된 SID 세션 쿠키로 이뤄진다
 * (credentials:'include'는 apiFetch가 처리). 성공 시 백엔드는 204 No Content라 반환값이 없다.
 *
 * `POST /api/auth/social-signup/complete`
 */
export async function completeSocialSignup(payload: SocialSignupCompletePayload): Promise<void> {
  await apiFetch('/api/auth/social-signup/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

interface NicknameAvailabilityResponse {
  nickname: string;
  available: boolean;
}

/**
 * 닉네임 사용 가능 여부(정규화 후 활성 회원 기준 중복 검사). 이 엔드포인트는 세션이 필요 없다.
 * `GET /api/members/nicknames/availability?nickname=`
 */
export async function checkNicknameAvailability(nickname: string): Promise<boolean> {
  const response = await apiFetch(
    `/api/members/nicknames/availability?nickname=${encodeURIComponent(nickname)}`,
  );
  const data = (await response.json()) as NicknameAvailabilityResponse;
  return data.available;
}

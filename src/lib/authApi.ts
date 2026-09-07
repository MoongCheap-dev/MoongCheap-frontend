import type { SessionUser } from '@/types/auth';

import { ApiError, apiFetch } from './api';

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

/**
 * `GET /api/members/me` 응답(백엔드 ProfileResponseDto). 세션이 유효할 때만 온다.
 * 화면 타입(SessionUser)이 아니라 백엔드 원형이며, getMe가 화면 타입으로 변환한다.
 * seller는 판매자 등록을 마친 계정에만 있고, 그 밖엔 null이다.
 */
interface ProfileResponse {
  loginId: string;
  nickname: string;
  phoneNumberMasked: string;
  email: string;
  joinedAt: string;
  isSeller: boolean;
  linkedProviders: string[];
  seller: { businessName: string; status: string } | null;
}

/**
 * 현재 세션의 회원 정보. 로그인 상태면 SessionUser, 미로그인이면 null을 돌린다.
 *
 * 세션은 SID httpOnly 쿠키로 붙는다(credentials는 apiFetch가 처리). 미로그인 응답 포맷(401 vs
 * 200+null)은 백엔드와 아직 확정되지 않아 양쪽 모두 "미로그인"으로 접는다 — 401이면 null을,
 * 본문이 비어 오면(null) null을 돌린다. 그 외 오류(네트워크·5xx)는 로그아웃이 아니므로 던진다.
 *
 * 백엔드 원형(ProfileResponseDto)을 화면 타입(SessionUser)으로 여기서 변환한다(types/auth.ts 원칙).
 * role은 isSeller로부터 만든다(ADMIN은 이 앱에 진입 자체가 없어 프로필로 오지 않는다).
 * `GET /api/members/me`
 */
export async function getMe(): Promise<SessionUser | null> {
  let response: Response;
  try {
    response = await apiFetch('/api/members/me');
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }

  const data = (await response.json()) as ProfileResponse | null;
  if (data === null) {
    return null;
  }

  return {
    id: data.loginId,
    nickname: data.nickname,
    email: data.email,
    role: data.isSeller ? 'SELLER' : 'CONSUMER',
  };
}

/**
 * 세션 폐기(로그아웃). `POST /api/auth/logout`으로 백엔드가 SID 쿠키를 만료시킨다.
 * 이미 만료된 세션(401)도 결과적으로 "로그아웃됨"이라 성공으로 접는다. 그 외 오류는 던진다.
 * `POST /api/auth/logout`
 */
export async function logout(): Promise<void> {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return;
    }
    throw error;
  }
}

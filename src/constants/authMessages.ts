/**
 * 인증 폼 검증 메시지 모음.
 *
 * 스키마·화면에 흩어지기 쉬운 사용자 문구를 한곳에서 관리한다(문구 통일·재사용, 추후 i18n 대비).
 * 자릿수처럼 검증 값에 의존하는 문구는 함수로 둬 값(스키마의 길이 상수)을 단일 출처로 유지한다.
 */
export const AUTH_ERROR_MESSAGES = {
  id: {
    required: '아이디를 입력해 주세요',
  },
  email: {
    invalid: '올바른 이메일 형식이 아닙니다',
  },
  password: {
    required: '비밀번호를 입력해 주세요',
    min: (length: number) => `비밀번호는 ${length}자 이상이어야 합니다`,
    max: (length: number) => `비밀번호는 ${length}자 이하여야 합니다`,
    confirmRequired: '비밀번호를 한 번 더 입력해 주세요',
    mismatch: '비밀번호가 일치하지 않습니다',
  },
  nickname: {
    min: (length: number) => `닉네임은 ${length}자 이상이어야 합니다`,
    max: (length: number) => `닉네임은 ${length}자 이하여야 합니다`,
  },
  agreement: {
    terms: '이용약관에 동의해 주세요',
    privacy: '개인정보 처리방침에 동의해 주세요',
  },
} as const;

/**
 * 소셜 로그인 실패 안내 문구.
 *
 * 백엔드는 소셜 로그인 실패 시 `/oauth/failed?reason=...`로 리다이렉트한다. reason 값은 백엔드와
 * 합의한 3종(denied·provider_error·server_error)이다. 규약에 없는 값이나 누락된 경우에도
 * 화면이 깨지지 않도록 기본 문구로 떨어뜨린다.
 */
export const OAUTH_FAILURE_MESSAGES = {
  denied: '로그인이 취소되었어요',
  provider_error: '소셜 로그인 제공자에서 문제가 발생했어요',
  server_error: '로그인 처리 중 문제가 발생했어요',
} as const;

export type OAuthFailureReason = keyof typeof OAUTH_FAILURE_MESSAGES;

const OAUTH_FALLBACK_MESSAGE = '로그인에 실패했어요. 잠시 후 다시 시도해 주세요';

/** reason 쿼리값을 안내 문구로 매핑한다. 규약에 없거나 누락된 값은 기본 문구로 떨어진다. */
export function getOAuthFailureMessage(reason: string | undefined): string {
  if (reason !== undefined && reason in OAUTH_FAILURE_MESSAGES) {
    return OAUTH_FAILURE_MESSAGES[reason as OAuthFailureReason];
  }
  return OAUTH_FALLBACK_MESSAGE;
}

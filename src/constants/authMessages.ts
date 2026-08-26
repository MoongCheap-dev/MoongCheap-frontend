/**
 * 인증 폼 검증 메시지 모음.
 *
 * 스키마·화면에 흩어지기 쉬운 사용자 문구를 한곳에서 관리한다(문구 통일·재사용, 추후 i18n 대비).
 * 회원가입 플로우(이메일→아이디→비밀번호→완료)와 로그인이 공유한다.
 */
export const AUTH_ERROR_MESSAGES = {
  id: {
    required: '아이디를 입력해 주세요',
    /** mock 중복 아이디. Figma 8-error 시안 문구. */
    taken: '이미 존재하는 아이디입니다',
  },
  email: {
    invalid: '올바른 이메일 형식이 아닙니다',
  },
  password: {
    required: '비밀번호를 입력해 주세요',
    /**
     * 자릿수·조합 위반 공통 문구. Figma 9번(비밀번호) 헬퍼가 default·error에서 같은 문구라
     * 하나로 둔다. 서버 규칙이 확정되면 이 문구와 스키마 규칙을 함께 맞춘다.
     */
    rule: '8~16자리 대소문자, 특수기호, 숫자를 사용하여 입력해 주세요',
  },
} as const;

/**
 * 검증 통과(성공) 안내 문구.
 *
 * 회원가입 입력 단계는 로그인과 달리 유효 시 입력칸 아래에 녹색으로 성공 문구를 노출한다
 * (Figma success 상태). 단계별로 같은 문구를 써서 한곳에 둔다.
 */
export const AUTH_SUCCESS_MESSAGES = {
  confirmed: '확인되었습니다.',
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
  // Object.hasOwn으로 자체 키만 확인한다. `in`은 프로토타입 키(toString·constructor 등)까지
  // 매칭돼, `?reason=toString` 같은 값이 함수/객체를 반환하고 렌더에서 깨질 수 있다.
  if (reason !== undefined && Object.hasOwn(OAUTH_FAILURE_MESSAGES, reason)) {
    return OAUTH_FAILURE_MESSAGES[reason as OAuthFailureReason];
  }
  return OAUTH_FALLBACK_MESSAGE;
}

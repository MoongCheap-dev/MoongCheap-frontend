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

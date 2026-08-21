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

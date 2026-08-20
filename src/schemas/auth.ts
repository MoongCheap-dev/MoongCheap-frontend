import { z } from 'zod';

/**
 * 인증 폼 검증 스키마.
 *
 * 아래 두 가지는 아직 확정되지 않았다. 확정되면 이 파일만 고치면 되고 화면은 건드리지 않는다.
 *
 * 1. 로그인 식별자가 아이디인지 이메일인지. 기능 명세 안에서 문구가 엇갈린다
 *    (요구사항명은 "아이디와 비밀번호", 상세는 "이메일과 비밀번호", 별도로 "아이디 중복 확인").
 *    확정 전까지 이메일 기준으로 둔다.
 * 2. 비밀번호 자릿수·문자 조합 규칙. 명세에 없다. 아래 값은 잠정이며 서버 규칙이 나오면 맞춘다.
 *
 * 클라이언트 검증은 UX 목적이다. 서버가 같은 값을 다시 검증하며, 서버가 돌려준 필드 오류는
 * `AuthResult.fieldErrors`로 받아 같은 입력칸 아래에 표시한다.
 */

/** 잠정 규칙. 서버 규칙 확정 시 교체한다. */
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 64;
const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 20;

const password = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다`)
  .max(PASSWORD_MAX_LENGTH, `비밀번호는 ${PASSWORD_MAX_LENGTH}자 이하여야 합니다`);

export const loginSchema = z.object({
  email: z.email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(1, '비밀번호를 입력해 주세요'),
});

export const signupSchema = z
  .object({
    email: z.email('올바른 이메일 형식이 아닙니다'),
    nickname: z
      .string()
      .min(NICKNAME_MIN_LENGTH, `닉네임은 ${NICKNAME_MIN_LENGTH}자 이상이어야 합니다`)
      .max(NICKNAME_MAX_LENGTH, `닉네임은 ${NICKNAME_MAX_LENGTH}자 이하여야 합니다`),
    password,
    passwordConfirm: z.string().min(1, '비밀번호를 한 번 더 입력해 주세요'),
    // 필수 동의는 z.literal(true)가 아니라 boolean + refine으로 둔다.
    // literal(true)는 타입을 true로 고정해 체크 해제 상태(false)를 폼 기본값으로 쓸 수 없다.
    termsAgreed: z.boolean().refine((agreed) => agreed, '이용약관에 동의해 주세요'),
    privacyAgreed: z.boolean().refine((agreed) => agreed, '개인정보 처리방침에 동의해 주세요'),
    marketingAgreed: z.boolean(),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;

import { z } from 'zod';

import { AUTH_ERROR_MESSAGES } from '@/constants/authMessages';

/**
 * 인증 폼 검증 스키마.
 *
 * 아래 두 가지는 아직 확정되지 않았다. 확정되면 이 파일만 고치면 되고 화면은 건드리지 않는다.
 *
 * 1. 로그인 식별자의 형식 규칙(아이디 문자·자릿수). Figma 로그인 시안(2026-08-21)과 기획이
 *    "이메일과 아이디를 모두 보유하되 로그인은 아이디로"로 정리돼(회원가입: 개인정보동의 →
 *    본인인증 → 이메일 → 아이디 → 비밀번호), 로그인 식별자는 `id`로 확정했다. 다만 아이디의
 *    허용 문자·길이 규칙은 서버 미확정이라 여기서는 "필수(빈값 금지)"만 검증하고, 규칙이
 *    나오면 이 스키마에만 반영한다(화면은 그대로).
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
  .min(PASSWORD_MIN_LENGTH, AUTH_ERROR_MESSAGES.password.min(PASSWORD_MIN_LENGTH))
  .max(PASSWORD_MAX_LENGTH, AUTH_ERROR_MESSAGES.password.max(PASSWORD_MAX_LENGTH));

export const loginSchema = z.object({
  id: z.string().min(1, AUTH_ERROR_MESSAGES.id.required),
  password: z.string().min(1, AUTH_ERROR_MESSAGES.password.required),
});

export const signupSchema = z
  .object({
    email: z.email(AUTH_ERROR_MESSAGES.email.invalid),
    nickname: z
      .string()
      .min(NICKNAME_MIN_LENGTH, AUTH_ERROR_MESSAGES.nickname.min(NICKNAME_MIN_LENGTH))
      .max(NICKNAME_MAX_LENGTH, AUTH_ERROR_MESSAGES.nickname.max(NICKNAME_MAX_LENGTH)),
    password,
    passwordConfirm: z.string().min(1, AUTH_ERROR_MESSAGES.password.confirmRequired),
    // 필수 동의는 z.literal(true)가 아니라 boolean + refine으로 둔다.
    // literal(true)는 타입을 true로 고정해 체크 해제 상태(false)를 폼 기본값으로 쓸 수 없다.
    termsAgreed: z.boolean().refine((agreed) => agreed, AUTH_ERROR_MESSAGES.agreement.terms),
    privacyAgreed: z.boolean().refine((agreed) => agreed, AUTH_ERROR_MESSAGES.agreement.privacy),
    marketingAgreed: z.boolean(),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: AUTH_ERROR_MESSAGES.password.mismatch,
    path: ['passwordConfirm'],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;

import { z } from 'zod';

import { AUTH_ERROR_MESSAGES } from '@/constants/authMessages';

/**
 * 인증 폼 검증 스키마.
 *
 * 아래 두 가지는 아직 확정되지 않았다. 확정되면 이 파일만 고치면 되고 화면은 건드리지 않는다.
 *
 * 1. 로그인/아이디 식별자의 형식 규칙(허용 문자·자릿수). 서버 미확정이라 여기서는 "필수(빈값 금지)"만
 *    검증한다. 아이디 중복 여부는 형식과 별개로 서버(현재는 mock)가 판단한다.
 * 2. 비밀번호 규칙. 명세엔 없고 Figma 시안 문구("8~16자리 대소문자, 특수기호, 숫자")를 근거로 잠정
 *    적용한다. 서버 규칙이 나오면 아래 상수·정규식을 교체한다(화면은 그대로).
 *
 * 클라이언트 검증은 UX 목적이다. 서버가 같은 값을 다시 검증하며, 서버가 돌려준 필드 오류는
 * `AuthResult.fieldErrors`로 받아 같은 입력칸 아래에 표시한다.
 */

/** 잠정 규칙. 서버 규칙 확정 시 교체한다. */
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 16;
/**
 * 대문자·소문자·숫자·특수문자를 각각 최소 1개 포함. 공백 불가.
 * Figma 문구의 "대소문자, 특수기호, 숫자"를 네 종류 필수로 해석한 잠정 규칙이다.
 */
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S+$/;

/** 로그인 식별자 = 아이디. 형식 규칙 미확정이라 필수만 검증. */
export const loginSchema = z.object({
  id: z.string().min(1, AUTH_ERROR_MESSAGES.id.required),
  password: z.string().min(1, AUTH_ERROR_MESSAGES.password.required),
});

/**
 * 회원가입 단계 필드 스키마.
 *
 * 위저드가 단계별로 현재 필드만 검증하므로 개별 스키마로 내보낸다. 세 필드를 합친
 * `signupSchema`는 지금은 `SignupValues` 타입 도출에만 쓰이며(제출 전 검증은 스텝별 게이팅으로
 * 대신한다), 서버 연동 시 최종 제출 직전 전체 재검증이 필요하면 그대로 재사용할 수 있다.
 * (아이디 중복확인 통과 여부는 형식과 별개라 스키마가 아닌 화면 상태로 관리한다.)
 */
export const signupEmailSchema = z.email(AUTH_ERROR_MESSAGES.email.invalid);

export const signupIdSchema = z.string().min(1, AUTH_ERROR_MESSAGES.id.required);

export const signupPasswordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, AUTH_ERROR_MESSAGES.password.rule)
  .max(PASSWORD_MAX_LENGTH, AUTH_ERROR_MESSAGES.password.rule)
  .regex(PASSWORD_PATTERN, AUTH_ERROR_MESSAGES.password.rule);

export const signupSchema = z.object({
  email: signupEmailSchema,
  id: signupIdSchema,
  password: signupPasswordSchema,
});

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;

/** 사용 모드(구매자/판매자). Figma 08.27 "B-01 모드 선택" 시안. 온보딩 첫 스텝에서 고른다. */
export type SignupMode = 'buyer' | 'seller';

/**
 * 회원가입 단계 식별자. URL 쿼리(`?step=`)와 위저드 상태에 함께 쓴다.
 * Figma 08.27 재설계로 앞단에 모드 선택·개인정보 동의가 추가됐다:
 *   mode → terms → (휴대폰 인증: 미구현) → email → id → password → complete.
 */
export type SignupStep = 'mode' | 'terms' | 'email' | 'id' | 'password' | 'complete';

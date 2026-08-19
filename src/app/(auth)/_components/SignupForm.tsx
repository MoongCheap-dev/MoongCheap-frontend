'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { mockSignup } from '@/mocks/auth';
import { signupSchema, type SignupValues } from '@/schemas/auth';

// 공통 UI 프리미티브(src/components/ui) 규약이 확정되기 전이라 네이티브 요소로 작성한다.
// LoginForm과 마크업이 겹치는 것은 의도한 것이다. 어떤 단위로 묶을지가 규약 회의 안건이므로
// 지금 임의로 추출하지 않는다.

export function SignupForm() {
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
      termsAgreed: false,
      privacyAgreed: false,
      marketingAgreed: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);

    const result = await mockSignup(values);

    if (!result.ok) {
      // 서버가 지목한 필드 오류는 해당 입력칸 아래에 표시한다.
      // 클라이언트 검증을 통과해도 서버가 다시 검증하므로 이 경로가 필요하다.
      result.fieldErrors?.forEach((fieldError) => {
        setError(fieldError.field as keyof SignupValues, { message: fieldError.message });
      });
      setFormError(result.message);
      return;
    }

    // TODO: 가입 완료 후 이동 처리. 백엔드 인증 규격 확정 후 작성한다.
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {formError !== null && (
        <p role="alert" className="text-danger bg-danger-soft rounded px-3 py-2 text-sm">
          {formError}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-email" className="text-sm font-medium">
          이메일
        </label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email !== undefined}
          aria-describedby={errors.email !== undefined ? 'signup-email-error' : undefined}
          className="border-surface-line placeholder:text-placeholder h-11 rounded-lg border px-3"
          {...register('email')}
        />
        {errors.email !== undefined && (
          <p id="signup-email-error" role="alert" className="text-danger text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-nickname" className="text-sm font-medium">
          닉네임
        </label>
        <input
          id="signup-nickname"
          type="text"
          autoComplete="nickname"
          aria-invalid={errors.nickname !== undefined}
          aria-describedby={errors.nickname !== undefined ? 'signup-nickname-error' : undefined}
          className="border-surface-line placeholder:text-placeholder h-11 rounded-lg border px-3"
          {...register('nickname')}
        />
        {errors.nickname !== undefined && (
          <p id="signup-nickname-error" role="alert" className="text-danger text-sm">
            {errors.nickname.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-password" className="text-sm font-medium">
          비밀번호
        </label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          aria-invalid={errors.password !== undefined}
          aria-describedby={errors.password !== undefined ? 'signup-password-error' : undefined}
          className="border-surface-line placeholder:text-placeholder h-11 rounded-lg border px-3"
          {...register('password')}
        />
        {errors.password !== undefined && (
          <p id="signup-password-error" role="alert" className="text-danger text-sm">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-password-confirm" className="text-sm font-medium">
          비밀번호 확인
        </label>
        <input
          id="signup-password-confirm"
          type="password"
          autoComplete="new-password"
          aria-invalid={errors.passwordConfirm !== undefined}
          aria-describedby={
            errors.passwordConfirm !== undefined ? 'signup-password-confirm-error' : undefined
          }
          className="border-surface-line placeholder:text-placeholder h-11 rounded-lg border px-3"
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm !== undefined && (
          <p id="signup-password-confirm-error" role="alert" className="text-danger text-sm">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      {/* 명세에 약관 동의 이력 저장 요구사항이 있어 항목을 분리해 둔다. */}
      <fieldset className="border-surface-line flex flex-col gap-2 rounded-lg border p-3">
        <legend className="px-1 text-sm font-medium">약관 동의</legend>

        <label htmlFor="signup-terms" className="flex items-center gap-2 text-sm">
          <input
            id="signup-terms"
            type="checkbox"
            className="size-4"
            {...register('termsAgreed')}
          />
          이용약관 동의 (필수)
        </label>
        {errors.termsAgreed !== undefined && (
          <p role="alert" className="text-danger text-sm">
            {errors.termsAgreed.message}
          </p>
        )}

        <label htmlFor="signup-privacy" className="flex items-center gap-2 text-sm">
          <input
            id="signup-privacy"
            type="checkbox"
            className="size-4"
            {...register('privacyAgreed')}
          />
          개인정보 처리방침 동의 (필수)
        </label>
        {errors.privacyAgreed !== undefined && (
          <p role="alert" className="text-danger text-sm">
            {errors.privacyAgreed.message}
          </p>
        )}

        <label htmlFor="signup-marketing" className="flex items-center gap-2 text-sm">
          <input
            id="signup-marketing"
            type="checkbox"
            className="size-4"
            {...register('marketingAgreed')}
          />
          마케팅 정보 수신 동의 (선택)
        </label>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary h-11 rounded-lg font-medium text-white disabled:opacity-50"
      >
        {isSubmitting ? '가입 중' : '회원가입'}
      </button>
    </form>
  );
}

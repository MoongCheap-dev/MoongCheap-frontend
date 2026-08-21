'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { mockLogin } from '@/mocks/auth';
import { loginSchema, type LoginValues } from '@/schemas/auth';

// 공통 UI 프리미티브(src/components/ui) 규약이 확정되기 전이라 네이티브 요소로 작성한다.
// 규약이 정해지면 이 마크업을 프리미티브로 치환하며, 아래 폼 로직은 그대로 둔다.

export function LoginForm() {
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);

    const result = await mockLogin(values);

    if (!result.ok) {
      // 로그인 실패는 어느 쪽이 틀렸는지 알려주지 않는다. 계정 존재 여부가 드러나기 때문이다.
      setFormError(result.message);
      return;
    }

    // TODO: 세션 확립 후 이동 처리. 백엔드 인증 규격 확정 후 작성한다.
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {formError !== null && (
        <p role="alert" className="text-content-error bg-surface-error rounded px-3 py-2 text-sm">
          {formError}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="login-email" className="text-sm font-medium">
          이메일
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email !== undefined}
          aria-describedby={errors.email !== undefined ? 'login-email-error' : undefined}
          className="border-border-subtle placeholder:text-content-quinary rounded-8 h-11 border px-3"
          {...register('email')}
        />
        {errors.email !== undefined && (
          <p id="login-email-error" role="alert" className="text-content-error text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="login-password" className="text-sm font-medium">
          비밀번호
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          aria-invalid={errors.password !== undefined}
          aria-describedby={errors.password !== undefined ? 'login-password-error' : undefined}
          className="border-border-subtle placeholder:text-content-quinary rounded-8 h-11 border px-3"
          {...register('password')}
        />
        {errors.password !== undefined && (
          <p id="login-password-error" role="alert" className="text-content-error text-sm">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-surface-button-primary-default hover:bg-surface-button-primary-hover active:bg-surface-button-primary-pressed disabled:bg-surface-disabled-primary disabled:text-content-disabled-primary text-content-oncolor text-button-16 rounded-8 h-11"
      >
        {isSubmitting ? '로그인 중' : '로그인'}
      </button>
    </form>
  );
}

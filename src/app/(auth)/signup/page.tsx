import type { Metadata } from 'next';
import Link from 'next/link';

import { SignupForm } from '../_components/SignupForm';

export const metadata: Metadata = {
  title: '회원가입',
};

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">회원가입</h1>

      <SignupForm />

      <p className="text-muted text-center text-sm">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="text-foreground underline">
          로그인
        </Link>
      </p>
    </div>
  );
}

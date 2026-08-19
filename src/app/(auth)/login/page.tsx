import type { Metadata } from 'next';
import Link from 'next/link';

import { LoginForm } from '../_components/LoginForm';

export const metadata: Metadata = {
  title: '로그인',
};

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">로그인</h1>

      <LoginForm />

      <p className="text-muted text-center text-sm">
        아직 회원이 아니신가요?{' '}
        <Link href="/signup" className="text-foreground underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}

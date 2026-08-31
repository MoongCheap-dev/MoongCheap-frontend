import type { Metadata } from 'next';
import Link from 'next/link';

import { LoginForm } from '../_components/LoginForm';
import { SocialLoginButtons } from '../_components/SocialLoginButtons';

export const metadata: Metadata = {
  title: '로그인',
};

// 라우트 미정: 아이디/비밀번호 찾기 화면은 아직 경로가 정해지지 않았다. 시안에는 있으므로
// 자리는 두되, 경로가 확정되면 button을 Link로 바꾼다.
const RECOVERY_LINKS = ['아이디 찾기', '비밀번호 찾기'] as const;

export default function LoginPage() {
  return (
    // main(flex-1)을 채워 세로 중앙 정렬한다(예전 AuthLayout의 justify-center를 페이지로 옮김).
    <div className="flex flex-1 flex-col justify-center">
      <h1 className="mb-8 text-2xl leading-snug font-bold">
        원하는 상품을 모아
        <br />더 좋은 조건으로 구매하세요
      </h1>

      <LoginForm />

      {/* 비회원 둘러보기. 로그인 없이 홈으로 진입한다. */}
      <Link
        href="/"
        className="border-border-subtle bg-surface-primary text-content-primary rounded-8 mt-3 flex h-13 items-center justify-center border font-medium"
      >
        일단 둘러보기
      </Link>

      {/* 일반 회원가입은 PM 결정으로 잠정 보관 — 링크는 그대로 두되 /signup 진입만 막는다(라우트·
          위저드는 그대로 유지). 재개 시 아래 button을 다시 `<Link href="/signup">`으로 되돌리면 된다. */}
      <nav className="text-content-quarternary mt-5 flex items-center justify-center gap-3 text-xs">
        <button type="button" className="hover:text-content-primary">
          회원가입
        </button>
        {RECOVERY_LINKS.map((label) => (
          <span key={label} className="contents">
            <span aria-hidden="true" className="bg-divider-default h-3 w-px" />
            {/* TODO: 찾기 플로우 경로 확정 후 Link로 교체 */}
            <button type="button" className="hover:text-content-primary">
              {label}
            </button>
          </span>
        ))}
      </nav>

      <div className="mt-16">
        <SocialLoginButtons />
      </div>
    </div>
  );
}

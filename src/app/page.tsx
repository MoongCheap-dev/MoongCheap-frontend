import Link from 'next/link';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';

export default function HomePage() {
  return (
    <main className="max-w-mobile mx-auto flex min-h-svh w-full flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">MoongCheap</h1>
        <p className="text-content-quarternary">수요 집결형 공동구매 플랫폼</p>
      </div>

      {/* 임시 진입점. 홈 화면 시안 확정 전, 회원가입/로그인 플로우로 들어갈 수 있게 둔다. */}
      {/* 일반 회원가입은 PM 결정으로 잠정 보관 — 버튼은 그대로 두되 /signup으로 이동하는 대신
          '준비 중' 토스트를 띄운다(미구현 진입점 규칙). 재개 시 ComingSoonButton을 다시
          `<Link href="/signup">`으로 되돌리면 된다. */}
      <div className="flex w-full flex-col gap-3">
        <ComingSoonButton className="bg-surface-button-primary-default hover:bg-surface-button-primary-hover active:bg-surface-button-primary-pressed text-content-oncolor rounded-8 flex h-13 items-center justify-center font-medium">
          회원가입
        </ComingSoonButton>
        <Link
          href="/login"
          className="border-border-subtle bg-surface-primary text-content-primary rounded-8 flex h-13 items-center justify-center border font-medium"
        >
          로그인
        </Link>
      </div>
    </main>
  );
}

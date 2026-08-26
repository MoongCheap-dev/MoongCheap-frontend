import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-mobile mx-auto flex min-h-svh w-full flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">MoongCheap</h1>
        <p className="text-content-quarternary">수요 집결형 공동구매 플랫폼</p>
      </div>

      {/* 임시 진입점. 홈 화면 시안 확정 전, 회원가입/로그인 플로우로 들어갈 수 있게 둔다. */}
      <div className="flex w-full flex-col gap-3">
        <Link
          href="/signup"
          className="bg-surface-button-primary-default hover:bg-surface-button-primary-hover active:bg-surface-button-primary-pressed text-content-oncolor rounded-8 flex h-13 items-center justify-center font-medium"
        >
          회원가입
        </Link>
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

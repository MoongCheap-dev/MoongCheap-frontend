'use client';

import { useEffect } from 'react';

import { RotateCcw, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 인증 화면(로그인·회원가입·소셜 로그인 콜백 등)의 에러 바운더리(#18).
// 처리 중·상태 변경 중 서버가 종료되거나 연결이 끊겨 렌더/조회가 실패하면, Next 기본 크래시 대신
// 이 화면을 띄운다. reset()으로 해당 세그먼트를 다시 렌더해 재시도한다.
// error.tsx는 App Router 예약 파일이라 default export를 사용한다(프로젝트 규칙의 예외).
export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // 원인 파악용 로깅. 에러 리포팅 도구가 도입되면 이 지점에서 전송한다.
    console.error('[auth] 화면 처리 실패:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col items-center gap-6">
        <span className="bg-danger-soft text-danger flex size-16 items-center justify-center rounded-full">
          <TriangleAlert className="size-8" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl leading-snug font-bold">문제가 발생했어요</h1>
          <p className="text-muted text-sm leading-relaxed">
            잠시 후 다시 시도해주세요.
            <br />
            계속되면 다시 로그인 해 주세요.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-primary active:bg-primary-pressed flex h-13 items-center justify-center gap-2 rounded-lg font-medium text-white"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          다시 시도
        </button>
        <button
          type="button"
          onClick={() => router.replace('/login')}
          className="border-surface-line bg-surface text-foreground flex h-13 items-center justify-center rounded-lg border font-medium"
        >
          로그인으로 돌아가기
        </button>
      </div>
    </div>
  );
}

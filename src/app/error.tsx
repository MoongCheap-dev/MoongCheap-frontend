'use client';

import { useEffect } from 'react';

import { ERROR_ACTION_CLASS, ErrorScreen } from '@/components/ui/ErrorScreen';
import { ERROR_SCREEN_RETRY_LABEL } from '@/constants/commonMessages';

// 루트 에러 바운더리(#44). (auth)를 뺀 전 세그먼트의 렌더·조회 실패를 여기서 받는다.
// 이 파일이 없으면 /mypage/* 에서 실패했을 때 Next 기본 크래시 화면이 그대로 노출된다.
//
// 잡히는 순간 하위 트리 전체가 교체되므로 각 화면의 셸(mypage/layout 등)도 사라진다.
// 그래서 모바일 폭 고정을 여기서 다시 준다.
//
// error.tsx는 App Router 예약 파일이라 default export를 쓴다(프로젝트 규칙의 예외).
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 원인 파악용 로깅. 에러 리포팅 도구가 도입되면 이 지점에서 전송한다.
    console.error('[root] 화면 처리 실패:', error);
  }, [error]);

  return (
    <div className="max-w-mobile mx-auto flex min-h-svh w-full flex-col">
      <ErrorScreen>
        <button className={ERROR_ACTION_CLASS} onClick={reset} type="button">
          {ERROR_SCREEN_RETRY_LABEL}
        </button>
      </ErrorScreen>
    </div>
  );
}

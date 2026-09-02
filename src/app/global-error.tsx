'use client';

import { useEffect } from 'react';

import { ERROR_ACTION_CLASS, ErrorScreen } from '@/components/ui/ErrorScreen';
import { ERROR_SCREEN_RETRY_LABEL } from '@/constants/commonMessages';

import './globals.css';

// 루트 레이아웃 에러 바운더리(#44).
//
// app/error.tsx는 layout.tsx·template.tsx 자신에서 난 오류를 못 잡는다. 그 자리를 이 파일이 받는다.
// 루트 레이아웃을 대체하는 위치라 <html>·<body>를 직접 그리고 globals.css도 직접 불러온다.
//
// 실제로 여기까지 오는 경우는 좁다. 루트 레이아웃이 하는 일이 배경 클래스와 ToastProvider뿐이라,
// 사실상 ToastProvider가 터질 때가 거의 전부다. 그래도 여기가 비면 흰 화면만 남는다.
//
// 화면은 시안 '모든화면 error 페이지'(453:26351)로 나머지 에러 화면과 같다.
// 다만 ToastProvider 바깥이라 토스트는 뜨지 않는다(이 화면은 토스트를 쓰지 않는다).
//
// global-error.tsx는 App Router 예약 파일이라 default export를 쓴다(프로젝트 규칙의 예외).
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 원인 파악용 로깅. 에러 리포팅 도구가 도입되면 이 지점에서 전송한다.
    console.error('[global] 루트 레이아웃 처리 실패:', error);
  }, [error]);

  return (
    <html className="h-full antialiased" lang="ko">
      <body className="bg-background-default flex min-h-svh flex-col">
        <div className="max-w-mobile mx-auto flex min-h-svh w-full flex-col">
          <ErrorScreen>
            <button className={ERROR_ACTION_CLASS} onClick={reset} type="button">
              {ERROR_SCREEN_RETRY_LABEL}
            </button>
          </ErrorScreen>
        </div>
      </body>
    </html>
  );
}

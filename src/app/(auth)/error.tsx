'use client';

import { useEffect } from 'react';

import { ERROR_ACTION_CLASS, ErrorScreen } from '@/components/ui/ErrorScreen';
import { ERROR_SCREEN_RETRY_LABEL } from '@/constants/commonMessages';

// 인증 화면(로그인·회원가입·소셜 로그인 콜백)의 에러 바운더리(#18 → #44에서 시안 적용).
//
// 시안이 "모든 error 페이지는 이 페이지로 연결합니다"라고 못박아 뒤 루트와 같은 화면을 쓴다.
// 초안에 있던 '로그인으로 돌아가기' 보조 버튼은 시안에 없어 뺐다. 인증 화면에서 reset()이
// 실패해도 상단 진입점으로 돌아갈 수 있어 동선이 막히지는 않는다.
//
// 셸(모바일 폭·패딩)은 (auth)/layout.tsx가 이미 씌우므로 여기서는 다시 주지 않는다.
//
// error.tsx는 App Router 예약 파일이라 default export를 쓴다(프로젝트 규칙의 예외).
export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 원인 파악용 로깅. 에러 리포팅 도구가 도입되면 이 지점에서 전송한다.
    console.error('[auth] 화면 처리 실패:', error);
  }, [error]);

  return (
    <ErrorScreen>
      <button className={ERROR_ACTION_CLASS} onClick={reset} type="button">
        {ERROR_SCREEN_RETRY_LABEL}
      </button>
    </ErrorScreen>
  );
}

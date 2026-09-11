'use client';

import { useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

import { initNavigationHistory, markPop, recordNavigation } from '@/lib/navigationHistory';

// 앱 내부 네비게이션을 세어 navigationHistory 모듈을 갱신한다. GoBackButton이 클릭 시점에 그 값을
// 읽어 back() 여부를 정한다([[navigationHistory]]). 화면에는 아무것도 그리지 않는다.
//
// 라우트마다 하나만 있으면 되므로 루트 레이아웃에 한 번 마운트한다.

export function NavigationHistoryTracker() {
  const pathname = usePathname();
  // 마운트 시의 pathname effect는 랜딩 항목이라 push로 세지 않는다.
  const initialized = useRef(false);

  useEffect(() => {
    initNavigationHistory();
    window.addEventListener('popstate', markPop);
    return () => window.removeEventListener('popstate', markPop);
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    recordNavigation();
  }, [pathname]);

  return null;
}

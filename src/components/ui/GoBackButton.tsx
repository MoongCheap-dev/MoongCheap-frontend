'use client';

import type { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

// 브라우저 히스토리의 이전 항목으로 돌아가는 버튼. 404(not-found.tsx)·수요 상세(B-12) '확인'이 쓴다.
//
// 서버 컴포넌트에서 useRouter를 직접 못 쓰므로 이 얇은 client 래퍼로 감싼다.
// ComingSoonButton과 같은 방침이다 — 상태가 필요한 조각만 잘라 내고 페이지는 서버에 둔다.
// className은 호출부가 준다.
//
// fallbackHref: 히스토리가 없는 첫 진입(공유 링크·새 탭·주소창 직접 입력)에서 router.back()은
// 앱 안에 돌아갈 곳이 없어 no-op이 되거나 사이트를 벗어난다. 이때 버튼이 유일한 exit인 화면
// (B-12 '확인')은 죽은 버튼이 되므로, fallbackHref가 주어지면 그 경로로 대신 이동한다.
// 값이 없으면(404 등) 기존처럼 항상 back()만 한다.

interface GoBackButtonProps {
  children: ReactNode;
  className?: string;
  /** 돌아갈 히스토리가 없을 때 이동할 경로. 생략 시 항상 router.back(). */
  fallbackHref?: string;
}

/** 일부 브라우저(주로 Chromium)만 지원하는 Navigation API의 필요한 부분만 좁혀 쓴다. */
interface NavigationApi {
  readonly canGoBack?: boolean;
}

/**
 * 이 페이지에서 뒤로 갈 앞선 항목이 있는지. Navigation API의 canGoBack이 정확한 신호다
 * (현재가 히스토리의 첫 항목이면 false). 미지원 브라우저(예: Safari)에선 history.length로
 * 근사한다 — length는 교차 출처·빈 탭 항목까지 세어 부정확하므로 폴백으로만 쓴다.
 */
function canGoBack(): boolean {
  const nav = (window as unknown as { navigation?: NavigationApi }).navigation;
  if (nav !== undefined && typeof nav.canGoBack === 'boolean') {
    return nav.canGoBack;
  }
  return window.history.length > 1;
}

export function GoBackButton({ children, className, fallbackHref }: GoBackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // 첫 진입(공유 링크·새 탭 등)이라 돌아갈 앱 내 항목이 없으면, fallbackHref가 있으면 그리로
    // 이동한다. 없으면(404 등) 기존처럼 back()에 맡긴다.
    if (fallbackHref !== undefined && !canGoBack()) {
      router.push(fallbackHref);
      return;
    }
    router.back();
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

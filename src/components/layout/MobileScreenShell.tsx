import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

// 모바일 전용 화면 셸. 시안이 393px 고정폭이라 상품·수요·주문 등 GNB 없는 화면이 같은 컬럼
// (max-w-mobile 중앙 고정, min-h-svh flex-col)을 공유한다. 하단 고정 CTA가 이 컬럼 안에서
// sticky로 붙는다. 각 라우트의 layout.tsx는 이 셸을 얇게 감싸며 화면별 셸 결정을 주석으로 남긴다.
//
// 배경은 화면마다 다를 수 있어(대부분 흰색 background-default, 마이페이지는 subtle) className으로
// 덮는다.
//
// ⚠️ orders·mypage 셸은 열린 PR(#51·#53·#56·#58)이 각자의 layout.tsx를 물고 있어 지금 옮기면
//    충돌한다 — 그 PR들이 머지된 뒤 별도 이슈로 이 셸에 통합한다. (main) 그룹 셸도 마찬가지다.

interface MobileScreenShellProps {
  children: ReactNode;
  /** 배경 등 덮어쓸 클래스. 기본 배경은 background-default. */
  className?: string;
}

export function MobileScreenShell({ children, className }: MobileScreenShellProps) {
  return (
    <div
      className={cn(
        'max-w-mobile bg-background-default mx-auto flex min-h-svh w-full flex-col',
        className,
      )}
    >
      {children}
    </div>
  );
}

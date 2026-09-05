import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

// 홈의 가로 스크롤 목록. 시안 `img-list`·`list`(좌우 여백 16, 카드 사이 간격은 섹션마다 다름).
//
// 스크롤바는 숨긴다. 시안에 없고, 모바일에서는 기본으로 보이지 않는다.
interface HorizontalScrollerProps {
  children: ReactNode;
  /** 카드 사이 간격. 시안 실측값이 섹션마다 20 / 22 / 33으로 다르다. */
  className?: string;
}

export function HorizontalScroller({ children, className }: HorizontalScrollerProps) {
  return (
    <div
      className={cn(
        'flex w-full [scrollbar-width:none] items-start overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {children}
    </div>
  );
}

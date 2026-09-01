import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import type { StatusTone } from '@/types/status';

// 공구·주문 상태를 표시하는 배지. 상태값(GB_*·ORD_*)의 tone을 색으로 매핑하는 유일한 지점이다.
// 상태별 색이 디자인으로 확정되면 아래 TONE_CLASS 한 곳만 고친다. 상태 코드→라벨/톤은
// constants/demandBoardStatus·orderStatus의 메타에서 얻어 tone·children으로 넘긴다.
//
// 예) const meta = getOrderStatusMeta(status);
//     <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>

const TONE_CLASS: Record<StatusTone, string> = {
  brand: 'bg-surface-button-secondary-default text-content-brand',
  info: 'bg-surface-visibility text-content-visibility',
  success: 'bg-surface-success text-content-success',
  warning: 'bg-surface-warning text-content-warning',
  neutral: 'bg-surface-secondary text-content-quarternary',
};

interface StatusBadgeProps {
  tone: StatusTone;
  children: ReactNode;
  className?: string;
}

export function StatusBadge({ tone, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'text-caption-12 inline-flex items-center rounded-full px-2 py-0.5 font-medium',
        TONE_CLASS[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

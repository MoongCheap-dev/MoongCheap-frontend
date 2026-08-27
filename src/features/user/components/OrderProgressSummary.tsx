import { ORDER_PROGRESS_LABELS, ORDER_PROGRESS_STEPS } from '@/constants/orderStatus';
import { cn } from '@/lib/cn';
import type { OrderProgressCounts } from '@/types/user';

// 진행중인 주문 단계별 건수. 단계 목록은 `constants/orderStatus.ts`가 갖는다.
// 시안이 기능 명세서(`Order-03` 결제 대기)와 어긋나 있어, 확인이 끝나면 상수만 고치면 되도록 뺐다.

interface OrderProgressSummaryProps {
  counts: OrderProgressCounts;
}

export function OrderProgressSummary({ counts }: OrderProgressSummaryProps) {
  return (
    <ol className="flex w-full items-center justify-between p-4">
      {ORDER_PROGRESS_STEPS.map((status) => {
        const count = counts[status];

        return (
          <li className="flex w-11.5 flex-col items-center gap-[3px]" key={status}>
            {/* 0건과 1건 이상을 색으로 구분한다. 시안에서 진행 중인 단계만 브랜드 색이다. */}
            <span
              className={cn(
                'text-heading-24 flex h-11.5 w-full items-center justify-center',
                count > 0 ? 'text-content-brand' : 'text-content-secondary',
              )}
            >
              {count}
            </span>
            <span className="text-caption-10 text-content-secondary w-full text-center">
              {ORDER_PROGRESS_LABELS[status]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

import { CountdownTimer } from '@/features/home/components/CountdownTimer';
import { cn } from '@/lib/cn';
import type { HomeProductCard } from '@/types/home';

// 마감 표시 배지. 시안 컴포넌트 `d-day-time`.
//
// ⚠️ 시안이 네 가지 형태를 섞어 쓴다.
//     card-list-1  `D-1`          `03:09:12`
//     card-list-7  `D-1 15:02:11` `D-0 23:11:18`
//    D-day만, 카운트다운만, 그리고 둘을 한 배지에 같이 쓰는 경우가 다 있다. 어느 쪽이 규칙인지
//    시안만으로는 알 수 없어, 데이터에 있는 것을 있는 대로 그린다(둘 다 있으면 사이에 공백).
//    PM 확인 대상.

interface TimeBadgeProps {
  dday?: HomeProductCard['dday'];
  deadline?: HomeProductCard['deadline'];
  className?: string;
}

export function TimeBadge({ dday, deadline, className }: TimeBadgeProps) {
  if (dday === undefined && deadline === undefined) {
    return null;
  }

  return (
    <span className={cn('whitespace-nowrap', className)}>
      {dday !== undefined && `D-${dday}`}
      {dday !== undefined && deadline !== undefined && ' '}
      {deadline !== undefined && <CountdownTimer deadline={deadline} />}
    </span>
  );
}

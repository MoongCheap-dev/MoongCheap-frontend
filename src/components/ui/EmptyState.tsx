import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

// 빈 상태(결과 0건) 공통 레이아웃. 콜드스타트 안내 등 목록이 비었을 때 노출한다.
// 예) 홈 참여 가능한 수요 0건 "아직 참여할 수 있는 공구가 없어요..."(FN-B03-01).
//
// 문구는 화면마다 다르므로 title·description으로 주입한다. action은 버튼 등 ReactNode를 그대로 받는다
// (상호작용이 필요한 버튼은 호출 측 client 컴포넌트에서 만들어 넘긴다 — 이 컴포넌트는 서버에서도 렌더 가능).

interface EmptyStateProps {
  /** 핵심 안내 문구. */
  title: string;
  /** 보조 설명(선택). */
  description?: string;
  /** 아이콘 등 상단 그래픽(선택). */
  icon?: ReactNode;
  /** 행동 유도 버튼 등(선택). */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 px-6 py-12 text-center',
        className,
      )}
    >
      {icon !== undefined && <div className="text-content-quinary mb-1">{icon}</div>}
      <p className="text-content-secondary text-body-15 font-medium">{title}</p>
      {description !== undefined && (
        <p className="text-content-quarternary text-caption-12">{description}</p>
      )}
      {action !== undefined && <div className="mt-4">{action}</div>}
    </div>
  );
}

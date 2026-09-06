import type { ReactNode } from 'react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { getParticipationStatusMeta } from '@/constants/participationStatus';
import type { ParticipationItem } from '@/types/participation';

// B-17 내 수요 참여 카드 한 건. 상태별 부가 액션(예: 대체상품 확인 버튼)은 호출부(client)가
// action 슬롯으로 주입한다 — EmptyState와 같은 방침이다.
//
// 카드 본문(썸네일+정보)을 탭하면 수요 상세(B-12)로 이동한다. onOpenDetail을 주면 본문이 버튼이
// 되고, 없으면 비상호작용 영역으로 렌더한다. 하단 action(대체상품 버튼 등)은 본문 버튼 밖에 두어
// 버튼 중첩을 피한다.
//
// 상품 이미지는 아직 목 데이터에 원본이 없어 회색 placeholder로 둔다. 실제 썸네일 연동 시
// 이 자리를 next/image로 교체한다.

interface ParticipationCardProps {
  item: ParticipationItem;
  /** 카드 본문 탭 → 수요 상세(B-12) 진입. 없으면 본문은 비상호작용. */
  onOpenDetail?: () => void;
  /** 상태별 하단 액션(선택). SUBSTITUTE_OFFERED의 '대체상품 확인하기' 등. */
  action?: ReactNode;
}

export function ParticipationCard({ item, onOpenDetail, action }: ParticipationCardProps) {
  const meta = getParticipationStatusMeta(item.status);

  const body = (
    <>
      {/* 상품 이미지 placeholder(원본 미연동). */}
      <div aria-hidden className="bg-surface-secondary rounded-12 size-16 shrink-0" />

      <div className="flex min-w-0 flex-1 flex-col gap-1 text-left">
        <StatusBadge className="self-start" tone={meta.tone}>
          {meta.badgeLabel}
        </StatusBadge>
        <p className="text-body-14 text-content-primary truncate font-medium">{item.productName}</p>
        {item.optionLabel !== undefined && (
          <p className="text-caption-12 text-content-quarternary truncate">{item.optionLabel}</p>
        )}
        <p className="text-caption-12 text-content-tertiary">
          {item.priceLabel} · 수량 {item.quantity}개
        </p>
      </div>
    </>
  );

  return (
    <article className="flex w-full flex-col gap-3 py-4">
      {onOpenDetail !== undefined ? (
        <button
          type="button"
          onClick={onOpenDetail}
          className="focus-visible:ring-effect-focus-ring-primary flex w-full gap-3 rounded-sm outline-none focus-visible:ring-2"
        >
          {body}
        </button>
      ) : (
        <div className="flex w-full gap-3">{body}</div>
      )}

      {action}
    </article>
  );
}

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';
import { PRODUCT_DETAIL } from '@/constants/productMessages';
import { TimeBadge } from '@/features/home/components/TimeBadge';
import type { ProductQuickDeal } from '@/types/product';

// B-08 상품 상세의 "진행중인 뭉치 퀵 참여" 딜 카드. 시안 컴포넌트 `demand-card`(188×108).
//
//   [마감 배지(코랄)]              [N명 참여]
//   희망가격대(볼드)
//   뭉셀러 N명
//
// 카드 탭 → 수요 상세(B-12)로 이동해야 하나 아직 화면이 없어 '준비 중' 토스트로 둔다.
// 마감 배지는 홈과 같은 TimeBadge를 쓰되 시안대로 코랄 pill(surface/button/secondary)로 감싼다.

/** 시안 `badge` = surface/button/secondary/default 배경 + content/brand 글자. */
const TIME_BADGE_CLASS =
  'bg-surface-button-secondary-default text-label-13 text-content-brand rounded-4 flex h-[22px] items-center px-2';

interface QuickDealCardProps {
  deal: ProductQuickDeal;
}

export function QuickDealCard({ deal }: QuickDealCardProps) {
  return (
    <ComingSoonButton className="border-border-subtle bg-background-default rounded-12 flex w-[188px] shrink-0 flex-col gap-2 border px-3 pt-3 pb-4 text-left">
      <span className="flex h-[22px] w-full items-center justify-between">
        <TimeBadge className={TIME_BADGE_CLASS} dday={deal.dday} deadline={deal.deadline} />
        <span className="text-label-10 text-content-quinary">
          {PRODUCT_DETAIL.dealParticipants(deal.participantCount)}
        </span>
      </span>

      <span className="flex w-full flex-col">
        <span className="text-title-18 text-content-primary">{deal.desiredPriceLabel}</span>
        <span className="text-caption-12 text-content-tertiary w-full">
          {PRODUCT_DETAIL.dealSellers(deal.sellerCount)}
        </span>
      </span>
    </ComingSoonButton>
  );
}

import Image from 'next/image';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';
import { HOME_CARD } from '@/constants/homeMessages';
import { TimeBadge } from '@/features/home/components/TimeBadge';
import type { HomeProductCard } from '@/types/home';

// card-list-7(현재 인기 공구 상품)의 넓은 가로 카드. 시안 `981:18321`(310×120).
//
// ProductRow(361×65)와 달리 이미지가 120이고, 상품명 아래가 `참여업체 N곳`이 아니라
// 브랜드명이다. 마감 배지도 코랄이 아니라 이미지 위 흰 배지다.

/** 시안: 흰 배경 80% + 테두리 #e6e6e6, radius 4. 이미지 오른쪽 위. */
const TIME_BADGE_CLASS =
  'border-border-subtle rounded-4 text-label-10 text-content-primary border bg-white px-1 py-0.5 opacity-80';

/** 시안 `badge/surface/gary` = 회색 20%. */
const PERSONNEL_BADGE_CLASS =
  'rounded-4 text-label-10 text-content-primary bg-coolgray-400/20 px-1 py-0.5 whitespace-nowrap';

interface WideProductRowProps {
  product: HomeProductCard;
}

export function WideProductRow({ product }: WideProductRowProps) {
  const hasTime = product.dday !== undefined || product.deadline !== undefined;

  return (
    <ComingSoonButton className="flex w-[310px] items-start gap-2 text-left">
      <span className="rounded-8 bg-surface-tertiary relative block size-[120px] shrink-0 overflow-hidden">
        {product.thumbnailUrl !== undefined && (
          <Image alt="" className="object-cover" fill sizes="120px" src={product.thumbnailUrl} />
        )}
        {hasTime && (
          <span className="absolute top-0 right-0 flex flex-col items-end p-1">
            <TimeBadge
              className={TIME_BADGE_CLASS}
              dday={product.dday}
              deadline={product.deadline}
            />
          </span>
        )}
      </span>

      <span className="flex w-[182px] shrink-0 flex-col justify-between self-stretch">
        <span className="flex w-full flex-col gap-1">
          {product.participantCount !== undefined && (
            <span className="flex items-start">
              <span className={PERSONNEL_BADGE_CLASS}>
                {HOME_CARD.participants(product.participantCount)}
              </span>
            </span>
          )}
          <span className="flex w-full flex-col">
            <span className="text-label-16 text-content-primary w-full truncate">
              {product.name}
            </span>
            {product.brandName !== undefined && (
              <span className="text-caption-10 text-content-tertiary w-full">
                {product.brandName}
              </span>
            )}
          </span>
        </span>

        <span className="flex w-full flex-col text-right">
          <span className="text-caption-10 text-content-tertiary w-full">
            {HOME_CARD.desiredPriceSpaced}
          </span>
          <span className="text-label-16 text-content-primary w-full">
            {product.desiredPriceLabel}
          </span>
        </span>
      </span>
    </ComingSoonButton>
  );
}

import Image from 'next/image';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';
import { HOME_CARD } from '@/constants/homeMessages';
import { CountdownTimer } from '@/features/home/components/CountdownTimer';
import { WishButton } from '@/features/home/components/WishButton';
import type { HomeProductCard } from '@/types/home';

// 가로 스크롤 섹션의 세로 카드. 시안 컴포넌트 `img-card`(632:5110 계열, 폭 121).
//
// 상품 상세(B-08)가 아직 없어 카드 전체가 '준비 중' 토스트다. 찜 버튼은 카드 안에 겹쳐
// 있지만 별개 동작이라, 버튼 중첩(HTML 위반)을 피하려고 형제로 두고 절대 배치했다.

/** 시안: 흰 배경 80% + 테두리 #e6e6e6, radius 4. D-day와 카운트다운이 같은 자리를 쓴다. */
const TIME_BADGE_CLASS =
  'border-border-subtle rounded-4 text-label-10 text-content-primary border bg-white px-1 py-0.5 opacity-80';

/** 시안: `badge/surface/sky` = 하늘색 20%. */
const PERSONNEL_BADGE_CLASS =
  'rounded-4 text-label-10 text-content-primary bg-sky-400/20 px-1 py-0.5';

interface ProductCardProps {
  product: HomeProductCard;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="relative flex w-[121px] shrink-0 flex-col gap-2">
      <ComingSoonButton className="flex w-full flex-col gap-2 text-left">
        <span className="rounded-8 bg-surface-tertiary relative block aspect-square w-full overflow-hidden">
          {product.thumbnailUrl !== undefined && (
            <Image alt="" className="object-cover" fill sizes="121px" src={product.thumbnailUrl} />
          )}

          {/* 마감 표시. 시안이 `D-1`과 `03:09:12` 두 형태를 같은 자리에 그린다. */}
          {(product.dday !== undefined || product.deadline !== undefined) && (
            <span className="absolute top-0 right-0 flex flex-col items-end p-1">
              <span className={TIME_BADGE_CLASS}>
                {product.deadline !== undefined ? (
                  <CountdownTimer deadline={product.deadline} />
                ) : (
                  `D-${product.dday}`
                )}
              </span>
            </span>
          )}
        </span>

        <span className="flex w-full flex-col gap-4">
          <span className="flex w-full flex-col gap-1">
            <span className="flex items-start">
              <span className={PERSONNEL_BADGE_CLASS}>
                {HOME_CARD.participants(product.participantCount)}
              </span>
            </span>
            <span className="flex w-full flex-col">
              <span className="text-label-16 text-content-primary w-full truncate">
                {product.name}
              </span>
              {product.sellerCount !== undefined && (
                <span className="text-caption-10 text-content-tertiary w-full">
                  {HOME_CARD.sellers(product.sellerCount)}
                </span>
              )}
            </span>
          </span>

          <span className="flex w-full flex-col text-right">
            <span className="text-caption-10 text-content-quarternary w-full">
              {HOME_CARD.desiredPriceTight}
            </span>
            <span className="text-label-16 text-content-primary w-full">
              {product.desiredPriceLabel}
            </span>
          </span>
        </span>
      </ComingSoonButton>

      {/*
        찜 버튼. 시안에서는 이미지 박스 안쪽 아래에 오른쪽 정렬로 얹혀 있다(px-8 py-4).
        카드 전체 버튼과 겹치지 않게 형제로 두고, 이미지 높이(= 카드 폭, 정사각)만큼만
        차지하게 한다. 덮개는 클릭을 통과시키고 버튼만 받는다.
      */}
      <span className="pointer-events-none absolute top-0 left-0 flex h-[121px] w-full items-end justify-end px-2 py-1">
        <WishButton />
      </span>
    </article>
  );
}

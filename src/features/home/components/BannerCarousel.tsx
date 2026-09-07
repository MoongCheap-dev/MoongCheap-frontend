'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import type { HomeBanner } from '@/types/home';

// 배너 캐러셀. 시안 `981:18163`(361×217, radius 12) + 프로토타입 `981:19122`(11장).
//
// 가로 스크롤 + 스냅으로 만든다. 자동 재생 여부가 시안에 없어 넣지 않았다 — 프로토타입이
// 수동 넘김(shift+space)으로만 되어 있고 재생 간격 표기도 없다. PM·디자인 확인 대상.
//
// ⚠️ 시안 카운터가 1번만 `1/11`이고 나머지는 `N/10`이다. 11번째를 나중에 추가하면서 앞의
// 총 개수를 못 고친 것으로 보여, 총 개수는 슬라이드 수에서 계산한다.
//
// 배너 이미지는 아직 없다(이슈 #60). 없으면 회색 자리로 둔다.
//
// 오버레이 문구가 있는 배너는 그 문구가 곧 이미지 설명이라 이미지를 장식으로 두고(`alt=""`),
// 문구가 이미지에 인쇄된 배너만 `imageAltText`를 받아 대체 텍스트로 넣는다.

/** 시안: 아래쪽만 어두워지는 오버레이. 흰 글씨 가독성용이다. */
const OVERLAY_CLASS =
  'pointer-events-none absolute inset-0 bg-[linear-gradient(180.33deg,rgba(82,82,82,0)_60.268%,rgba(82,82,82,0.315)_82.092%,rgba(82,82,82,0.8)_99.521%)]';

interface BannerCarouselProps {
  banners: readonly HomeBanner[];
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // 스크롤 위치에서 현재 장을 되읽는다. 스냅이 멈추는 지점이 곧 각 장의 왼쪽 끝이다.
  const handleScroll = () => {
    const viewport = viewportRef.current;
    if (viewport === null || viewport.clientWidth === 0) {
      return;
    }
    setIndex(Math.round(viewport.scrollLeft / viewport.clientWidth));
  };

  return (
    <div className="w-full px-4">
      <div className="rounded-12 relative h-[217px] w-full overflow-hidden">
        <div
          className="flex size-full snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto [&::-webkit-scrollbar]:hidden"
          onScroll={handleScroll}
          ref={viewportRef}
        >
          {banners.map((banner) => (
            <div className="relative h-full w-full shrink-0 snap-start" key={banner.id}>
              {banner.imageUrl === undefined ? (
                <div aria-hidden className="bg-surface-tertiary size-full" />
              ) : (
                <Image
                  alt={banner.imageAltText ?? ''}
                  className="object-cover"
                  fill
                  sizes="393px"
                  src={banner.imageUrl}
                  priority={banner.id === banners[0]?.id}
                />
              )}

              {/* 문구가 이미지에 인쇄된 배너(시안 4·6번)는 오버레이도 글씨도 없다. */}
              {banner.title !== undefined && (
                <>
                  <div aria-hidden className={OVERLAY_CLASS} />
                  <div className="text-content-oncolor absolute top-[137px] left-0 flex w-full flex-col px-3">
                    <p className="text-heading-24 w-full">{banner.title}</p>
                    {banner.description !== undefined && (
                      <p className="text-body-14 w-full">{banner.description}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute top-0 right-0 flex items-center justify-center p-2.5">
          <span className="text-label-12 text-content-oncolor rounded-round border-border-oncolor bg-normal-1/20 border px-2 py-0.5">
            {index + 1}/{banners.length}
          </span>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

import { HOME_SECTIONS } from '@/constants/homeMessages';
import { BannerCarousel } from '@/features/home/components/BannerCarousel';
import { CategoryGrid } from '@/features/home/components/CategoryGrid';
import { DemandSection } from '@/features/home/components/DemandSection';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { RowListSection } from '@/features/home/components/RowListSection';
import {
  mockGetClosingProducts,
  mockGetDeadlineProducts,
  mockGetDemandProducts,
  mockGetHomeBanners,
} from '@/mocks/home';

export const metadata: Metadata = {
  title: '뭉치',
};

// B-03 홈피드. 시안 `981:18157`.
//
// 페이지는 서버 컴포넌트로 둔다. 상태가 필요한 조각(캐러셀·카운트다운)만 client 리프로
// 격리한다.
export default async function HomePage() {
  const [banners, demandProducts, closingProducts, deadlineProducts] = await Promise.all([
    mockGetHomeBanners(),
    mockGetDemandProducts(),
    mockGetClosingProducts(),
    mockGetDeadlineProducts(),
  ]);

  return (
    <main className="flex w-full flex-col">
      <HomeHeader />
      <BannerCarousel banners={banners} />
      <CategoryGrid />

      {/* 섹션 사이 간격은 시안 실측 96px로 일정하다. */}
      <div className="flex w-full flex-col gap-24">
        <DemandSection products={demandProducts} />
        <RowListSection
          description={HOME_SECTIONS.closing.description}
          products={closingProducts}
          title={HOME_SECTIONS.closing.title}
        />
        <RowListSection
          description={HOME_SECTIONS.deadline.description}
          products={deadlineProducts}
          title={HOME_SECTIONS.deadline.title}
        />
      </div>
    </main>
  );
}

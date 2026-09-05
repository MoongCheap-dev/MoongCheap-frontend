import type { Metadata } from 'next';

import { BannerCarousel } from '@/features/home/components/BannerCarousel';
import { CategoryGrid } from '@/features/home/components/CategoryGrid';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { mockGetHomeBanners } from '@/mocks/home';

export const metadata: Metadata = {
  title: '뭉치',
};

// B-03 홈피드. 시안 `981:18157`.
//
// 페이지는 서버 컴포넌트로 둔다. 상태가 필요한 조각(캐러셀·카운트다운)만 client 리프로
// 격리한다.
export default async function HomePage() {
  const banners = await mockGetHomeBanners();

  return (
    <main className="flex w-full flex-col">
      <HomeHeader />
      <BannerCarousel banners={banners} />
      <CategoryGrid />
    </main>
  );
}

import { Suspense } from 'react';

import type { Metadata } from 'next';

import { SellerApplyWizard } from '@/features/seller/components/SellerApplyWizard';

export const metadata: Metadata = {
  title: '판매자 전환',
};

// S-01 판매자 전환. 마이페이지 프로필 카드의 '판매자 전환' 버튼에서 진입한다.
//
// 시안에 앱바가 없다(상태바 바로 아래가 제목이다). 되돌아가는 길은 각 화면의 '나중에 하기' ·
// '이전' 버튼이라, 다른 마이페이지 하위 화면과 달리 AppBar를 두지 않는다.
//
// 마이페이지 셸이 background/subtle을 깔지만 이 화면은 흰 바탕이라 background/default로 덮는다.
export default function SellerApplyPage() {
  // SellerApplyWizard가 useSearchParams(스텝 읽기)를 쓰므로 Suspense 경계로 감싼다(프로덕션 빌드 요건).
  return (
    <main className="bg-background-default flex w-full flex-1 flex-col">
      <Suspense fallback={null}>
        {/* '나중에 하기'·'구매자 계정 유지하기'의 목적지. 시안에 없어 진입점인 마이페이지로 되돌린다.
            주문 플로우 등 다른 진입점이 생기면 그 페이지가 자기 경로를 넘긴다. */}
        <SellerApplyWizard exitHref="/mypage" />
      </Suspense>
    </main>
  );
}

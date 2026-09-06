import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { ParticipationList } from '@/features/participation/components/ParticipationList';
import { mockGetParticipations } from '@/mocks/participation';

export const metadata: Metadata = {
  title: '내 수요 참여 목록',
};

// B-17 수요 상태별 목록(내 수요 참여 목록). GNB '내 대기' 진입 화면.
//
// 라우트는 GNB 탭 키('waiting', businessRules.ts GNB_TABS)를 따라 임시로 /waiting에 둔다.
// App Router 경로 규약이 확정되면 옮긴다(CLAUDE.md '미확정' 참고).
//
// 하단탭(BottomNav)은 시안에 있으나 구성이 미확정이라 넣지 않는다 — mypage 셸과 같은 방침
// (mypage/layout.tsx: '하단탭이 확정되면 그룹 레이아웃으로 옮긴다'). 확정 시 라우트 그룹
// 레이아웃에서 공통 GNB를 깔고, backHref는 그때 제거한다.
//
// 목록 조회만 서버에서 하고(mock), 탭 전환·대체상품 확인 다이얼로그는 ParticipationList(client)가 맡는다.
export default async function WaitingPage() {
  const items = await mockGetParticipations();

  return (
    <main className="max-w-mobile bg-background-default mx-auto flex min-h-svh w-full flex-col">
      <AppBar backHref="/" title="내 수요 참여 목록" />
      <ParticipationList initialItems={items} />
    </main>
  );
}

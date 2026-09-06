import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { ParticipationList } from '@/features/participation/components/ParticipationList';
import { mockGetParticipations } from '@/mocks/participation';

export const metadata: Metadata = {
  title: '내 뭉치 참여 목록',
};

// B-17 내 뭉치 참여 목록. GNB '내 대기' 진입 화면.
//
// 라우트는 GNB 탭 키('waiting', businessRules.ts GNB_TABS)를 따라 임시로 /waiting에 둔다.
// App Router 경로 규약이 확정되면 옮긴다(CLAUDE.md '미확정' 참고).
//
// 목록 조회만 서버에서 하고(mock), 탭 전환·낙찰 취소 다이얼로그는 ParticipationList(client)가 맡는다.
export default async function WaitingPage() {
  const items = await mockGetParticipations();

  return (
    <main className="max-w-mobile bg-background-default mx-auto flex min-h-svh w-full flex-col">
      <AppBar backHref="/" title="내 뭉치 참여 목록" />
      <ParticipationList initialItems={items} />
      <BottomNav active="waiting" />
    </main>
  );
}

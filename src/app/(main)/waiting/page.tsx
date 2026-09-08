import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { ParticipationList } from '@/features/participation/components/ParticipationList';
import { mockGetParticipations } from '@/mocks/participation';

export const metadata: Metadata = {
  title: '내 뭉치 참여 목록',
};

// B-17 내 뭉치 참여 목록. GNB '내 대기' 진입 화면.
//
// (main) 라우트 그룹에 둔다 — 하단 GNB는 이 그룹의 공용 레이아웃이 그린다(홈피드 #62가 정본).
// 라우트 그룹은 URL 경로에 영향이 없어 진입 경로는 그대로 /waiting 이다.
//
// 목록 조회만 서버에서 하고(mock), 탭 전환·낙찰 취소 다이얼로그는 ParticipationList(client)가 맡는다.
export default async function WaitingPage() {
  const items = await mockGetParticipations();

  return (
    <main className="flex w-full flex-1 flex-col">
      <AppBar backHref="/" title="내 뭉치 참여 목록" />
      <ParticipationList awardResultHref="/award-result" initialItems={items} />
    </main>
  );
}

import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { AwardResultView } from '@/features/participation/components/AwardResultView';
import { mockGetAwardResult } from '@/mocks/awardResult';

export const metadata: Metadata = {
  title: '낙찰 결과',
};

// B-19 낙찰 성공 정보. 내 뭉치 참여 목록(B-17)의 배정완료 카드 → 낙찰 결과 확인으로 이어지는 화면.
//
// 라우트는 임시로 /award-result에 둔다. 낙찰 결과는 특정 참여 건의 상세라 규격 확정 시
// /participation/[id] 형태로 옮긴다(App Router 경로 규약 미확정 — CLAUDE.md '미확정' 참고).
// backHref는 목록(B-17, /waiting)으로 되돌린다.
//
// 결과 조회만 서버에서 하고(mock), 낙찰 취소 다이얼로그는 AwardResultView(client)가 맡는다.
export default async function AwardResultPage() {
  const result = await mockGetAwardResult();

  return (
    <main className="max-w-mobile bg-background-default mx-auto flex min-h-svh w-full flex-col">
      <AppBar backHref="/waiting" title="낙찰 결과" />
      <AwardResultView result={result} />
    </main>
  );
}

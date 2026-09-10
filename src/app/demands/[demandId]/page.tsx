import type { Metadata } from 'next';

import { DemandGuideView } from '@/features/demand/components/DemandGuideView';

export const metadata: Metadata = {
  title: '수요 상세',
};

// B-12 수요 상세. B-08 상품 상세의 퀵 참여 딜 카드에서 `/demands/[demandId]`로 진입한다.
//
// MVP 화면(node 981:15479)은 특정 수요 데이터가 아니라 공구 진행 과정을 안내하는 정적 화면이라
// demandId를 아직 소비하지 않는다. 딜별로 URL을 남겨(어느 수요에서 왔는지) 추후 실데이터 상세가
// 붙을 자리를 열어 둔다.
//
// 생성 타입(PageProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 params를 직접
// 타이핑한다(app/products/[productId]/page.tsx와 같은 이유).
export default async function DemandDetailPage({
  params,
}: {
  params: Promise<{ demandId: string }>;
}) {
  await params;

  return <DemandGuideView />;
}

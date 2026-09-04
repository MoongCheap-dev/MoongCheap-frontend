import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { OrderDetail } from '@/features/order/components/OrderDetail';
import { mockGetOrderDetail } from '@/mocks/order';

export const metadata: Metadata = {
  title: '주문상세',
};

// B-28 주문상세(FN-B28-01). B-21 주문 내역의 '주문상세 >'에서 진입한다.
//
// backHref는 /orders로 고정한다(명세: 헤더 백버튼 → B-21로 복귀).
//
// 생성 타입(PageProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 params를 직접
// 타이핑한다(app/layout.tsx와 같은 이유).
export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await mockGetOrderDetail(orderId);

  return (
    <main className="flex w-full flex-1 flex-col">
      <AppBar backHref="/orders" title="주문상세" />
      <OrderDetail order={order} />
    </main>
  );
}

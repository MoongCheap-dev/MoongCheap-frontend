import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { OrderList } from '@/features/order/components/OrderList';
import { mockGetOrders } from '@/mocks/order';

export const metadata: Metadata = {
  title: '주문 내역',
};

// B-21 주문 내역(FN-B21-01). 마이페이지 '진행중인 주문내역 > 자세히보기'에서 진입한다.
//
// 조회만 서버에서 하고 탭 전환은 OrderList(client)가 맡는다.
// backHref는 /mypage로 고정한다(명세: 헤더 백버튼 → B-26으로 복귀).
//
// ⚠️ 무한 스크롤(`BR-B21-01-11`, 20건 단위)은 붙이지 않았다. 페이지네이션 응답 규격이 없고
//    목이 3건이라 확인할 수도 없다. API 연동 시 추가한다.
export default async function OrdersPage() {
  const orders = await mockGetOrders();

  return (
    <main className="flex w-full flex-1 flex-col">
      <AppBar backHref="/mypage" title="주문 내역" />
      <OrderList orders={orders} />
    </main>
  );
}

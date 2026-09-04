import type { OrderSummary } from '@/types/order';

/**
 * 주문 목 데이터.
 *
 * `mocks/user.ts`와 같은 규칙이다. 실제 연동 시 이 함수의 **본문만** API 호출로 교체하고 반환
 * 타입은 그대로 둔다. 도메인 B(거래·주문) 백엔드 명세가 아직 없어 지금은 화면 확인용이다.
 *
 * 값은 시안(`818:35719`)에 적힌 3건을 그대로 옮겼다. 상태는 시안이 전부 '배송완료'인데, 탭
 * 필터가 동작하는 것을 확인할 수 없어 **뒤 두 건의 상태만 바꿨다**(시안 값 아님 — 주석 표시).
 * **빈 목록**(`453:26371`)을 확인하려면 아래 배열을 비운다.
 *
 * 상품 이미지는 디자인이 넘겨준 목 에셋이다(이미지 네이밍 시트 `[B-21] 1-1`·`2-1`·`3-1`).
 * 실제로는 API가 주는 값이라 목이 사라지면 이 파일과 함께 지운다.
 */

const mockOrders: OrderSummary[] = [
  {
    id: 'ord-1',
    orderedAt: '26.08.20',
    sellerName: '뉴베러',
    status: 'DELIVERED',
    items: [
      {
        id: 'ord-1-item-1',
        name: '[작심삼일 특가] 슬림 버니&베어 캔디',
        option: '슬림 버니 캔디 옐로우 픽',
        quantity: '1박스',
        price: 35_100,
        imageUrl: '/images/order-item-1.png',
      },
    ],
  },
  {
    id: 'ord-2',
    orderedAt: '26.08.13',
    sellerName: '바이너랩',
    // 시안은 '배송완료'다. 탭 필터 확인용으로 바꿨다.
    status: 'SHIPPING',
    items: [
      {
        id: 'ord-2-item-1',
        name: '겟 글로이',
        quantity: '1박스',
        price: 58_000,
        imageUrl: '/images/order-item-2.png',
      },
    ],
  },
  {
    id: 'ord-3',
    orderedAt: '26.07.09',
    sellerName: '캘리포니아골드뉴트리션',
    // 시안은 '배송완료'다. 탭 필터 확인용으로 바꿨다.
    status: 'PURCHASE_CONFIRMED',
    items: [
      {
        id: 'ord-3-item-1',
        name: '락토비프 프로바이오틱스 300억',
        option: '1박스 60정',
        quantity: '1박스',
        price: 59_000,
        imageUrl: '/images/order-item-3.png',
      },
    ],
  },
];

export async function mockGetOrders(): Promise<OrderSummary[]> {
  return mockOrders;
}

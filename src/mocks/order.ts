import type { OrderDetail, OrderSummary } from '@/types/order';

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

/**
 * 주문 상세 목. 목록 3건 각각에 대응한다.
 *
 * 1번(뉴베러)은 시안(`453:25878`)의 값을 그대로 옮겼다. 시안은 목록과 **상태가 다르다** —
 * 목록은 '배송완료', 상세는 '배송준비중'이다. 시안 각각을 그대로 따랐다.
 *
 * 2·3번은 상세 시안이 없다. 목록에 있는 상품 금액에 배송비를 더해 총액을 맞췄다. 쿠폰·포인트는
 * 시안 1번에만 있는 항목이라 넣지 않았다.
 *
 * ⚠️ 쿠폰 할인·포인트 사용은 시안에만 있고 기능명세 `FN-B28-01` 결제 내역 정의에는 없다
 *    (명세는 상품 금액·배송비·총 결제 금액·결제수단만 적는다). 시안대로 넣고 PM 확인 대상으로 남긴다.
 */

/** 시안 배송비. 3건이 같은 값을 쓴다. */
const MOCK_SHIPPING_FEE = 3_000;

/** 배송지도 시안 1번 값을 3건이 공유한다. 본인 주문이라 수령인이 같다. */
const mockShipping = {
  recipient: '김뭉치',
  phoneMasked: '010 - **** - 1234',
  address: '[12345] 서울 강남구 역삼동 646-15',
} as const;

const mockOrderDetails: OrderDetail[] = [
  {
    ...mockOrders[0],
    status: 'PREPARING',
    orderNumber: '12012348371629',
    paidAt: '26.08.26',
    shipping: { ...mockShipping },
    payment: {
      lines: [
        { label: '상품 금액', amount: 35_100 },
        { label: '쿠폰 할인', amount: -5_400 },
        { label: '포인트 사용', amount: -2_400 },
        { label: '배송비', amount: MOCK_SHIPPING_FEE },
      ],
      total: 27_300,
      method: '카드결제',
    },
  },
  ...mockOrders.slice(1).map((order, index): OrderDetail => {
    const itemsTotal = order.items.reduce((sum, item) => sum + item.price, 0);
    return {
      ...order,
      orderNumber: `1201234837162${index + 1}`,
      paidAt: order.orderedAt,
      shipping: { ...mockShipping },
      payment: {
        lines: [
          { label: '상품 금액', amount: itemsTotal },
          { label: '배송비', amount: MOCK_SHIPPING_FEE },
        ],
        total: itemsTotal + MOCK_SHIPPING_FEE,
        method: '카드결제',
      },
    };
  }),
];

/**
 * 주문 상세 조회. 없는 주문이면 null을 돌려주고 라우트가 404로 처리한다.
 * 연동 시 이 본문만 `GET /orders/{orderId}`로 바꾼다.
 */
export async function mockGetOrderDetail(orderId: string): Promise<OrderDetail | null> {
  return mockOrderDetails.find((order) => order.id === orderId) ?? null;
}

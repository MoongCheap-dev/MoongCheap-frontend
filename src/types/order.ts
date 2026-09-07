import type { OrderStatus } from '@/constants/orderStatus';

/**
 * 주문 화면(B-21 목록 · B-28 상세)이 요구하는 타입.
 *
 * `types/user.ts`와 같은 원칙이다. 백엔드 응답을 옮긴 것이 아니라 **화면이 필요로 하는 모양**이며,
 * 규격이 나오면 API 계층에서 변환해 이 타입으로 맞춘다. 도메인 B(거래·주문) 명세는 아직 없다.
 */

/**
 * 주문에 담긴 상품 한 줄.
 *
 * 값은 주문 생성 시점의 **스냅샷**이다(`BR-B21-01-02`). 원본 상품이 바뀌거나 지워져도 주문
 * 내역의 표시는 그대로 유지돼야 하므로, 상품 id를 들고 조회하지 않고 값을 그대로 담는다.
 */
export interface OrderItem {
  id: string;
  /** 상품명. 시안 예) `[작심삼일 특가] 슬림 버니&베어 캔디` */
  name: string;
  /** 선택한 옵션. 없을 수 있다(시안 2번째 카드). */
  option?: string;
  /** 수량 표기. `1박스`처럼 단위가 붙은 문자열이라 숫자가 아니다. */
  quantity: string;
  /** 결제 금액(원). 표시할 때 자리수를 넣는다. */
  price: number;
  /**
   * 상품 이미지. 실제로는 API가 준다. 목은 디자인이 넘겨준 에셋을 쓴다.
   * 선택값으로 둬, 응답에 이미지가 없는 주문에서도 카드가 깨지지 않게 한다(회색 자리로 대체).
   */
  imageUrl?: string;
}

/** 주문 목록(B-21) 카드 한 장. */
export interface OrderSummary {
  id: string;
  /** 주문일자. 시안 표기는 `26.08.20`이다. */
  orderedAt: string;
  /** 판매자(스토어)명. */
  sellerName: string;
  status: OrderStatus;
  /**
   * 주문에 담긴 상품. 시안은 카드마다 1건이지만 공동구매 주문은 여러 건이 될 수 있어 배열로 둔다.
   */
  items: OrderItem[];
}

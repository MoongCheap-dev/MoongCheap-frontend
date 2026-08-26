import type { OrderProgressStatus } from '@/types/user';

/**
 * 마이페이지가 보여주는 주문 진행 단계와 라벨.
 *
 * ⚠️ **기능 명세서와 어긋난다.** `Order-03`은 주문이 "결제 대기" 상태로 생성된다고 못박고 있고,
 * 공동구매는 목표 인원을 달성해야 결제가 실행되므로(`GroupBuy-05`) "결제 대기"가 뭉치의 기본
 * 상태다. 그런데 시안(B-26)에는 그 단계가 없다. PM 확인 후 **이 배열만** 고치면 화면이 따라오도록
 * 단계 목록을 화면에서 분리해 둔다.
 */
export const ORDER_PROGRESS_STEPS: readonly OrderProgressStatus[] = [
  'PAYMENT_COMPLETED',
  'DELIVERY_REQUESTED',
  'PREPARING',
  'SHIPPING',
  'DELIVERED',
];

export const ORDER_PROGRESS_LABELS: Record<OrderProgressStatus, string> = {
  PAYMENT_COMPLETED: '결제완료',
  DELIVERY_REQUESTED: '배송요청',
  PREPARING: '배송준비중',
  SHIPPING: '배송중',
  DELIVERED: '배송완료',
};

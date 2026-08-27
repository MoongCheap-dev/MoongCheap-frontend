import type { OrderProgressStatus } from '@/types/user';

/**
 * 마이페이지가 보여주는 주문 진행 단계와 라벨.
 *
 * 2026-08-27 백엔드 ERD 논의로 주문과 결제의 순서가 뒤집혔다.
 *
 *   [전] 참여 -> 결제 -> 주문 생성
 *   [후] 참여 -> 낙찰 판정 -> 주문 생성 -> 48h 유예 -> 일괄 자동결제 -> 배송지 입력
 *
 * 주문이 낙찰 시점에 생기고 결제는 48시간 뒤에 실행되므로 **주문 대부분이 결제 전 상태로
 * 존재한다.** 그래서 시안(B-26)에 없던 `PAYMENT_PENDING`을 맨 앞에 둔다.
 *
 * ⚠️ 백엔드 상태 코드 목록을 아직 받지 못했다(API 계약 초안 Q19). 값은 잠정이며,
 * 확정되면 **이 파일만** 고치면 화면이 따라온다.
 */
export const ORDER_PROGRESS_STEPS: readonly OrderProgressStatus[] = [
  'PAYMENT_PENDING',
  'PAYMENT_COMPLETED',
  'DELIVERY_REQUESTED',
  'PREPARING',
  'SHIPPING',
  'DELIVERED',
];

export const ORDER_PROGRESS_LABELS: Record<OrderProgressStatus, string> = {
  PAYMENT_PENDING: '결제대기',
  PAYMENT_COMPLETED: '결제완료',
  DELIVERY_REQUESTED: '배송요청',
  PREPARING: '배송준비중',
  SHIPPING: '배송중',
  DELIVERED: '배송완료',
};

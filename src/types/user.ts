/**
 * 회원(마이페이지) 화면이 요구하는 타입.
 *
 * `types/auth.ts`와 같은 원칙이다. 백엔드 응답을 옮긴 것이 아니라 **화면이 필요로 하는 모양**이며,
 * 규격이 나오면 API 계층에서 변환해 이 타입으로 맞춘다.
 */

/**
 * 마이페이지 "진행중인 주문내역"의 진행 단계.
 *
 * `PAYMENT_PENDING`은 2026-08-27 구조 변경(주문 생성이 결제보다 앞섬)으로 추가했다.
 * 시안에는 없지만 실제로는 가장 많은 주문이 머무는 단계다. 백엔드 코드 확정 시 맞춘다.
 */
export type OrderProgressStatus =
  | 'PAYMENT_PENDING'
  | 'PAYMENT_COMPLETED'
  | 'DELIVERY_REQUESTED'
  | 'PREPARING'
  | 'SHIPPING'
  | 'DELIVERED';

/** 단계별 주문 건수. 0건도 자리를 차지하므로 전 단계를 채운다. */
export type OrderProgressCounts = Record<OrderProgressStatus, number>;

/** 마이페이지 홈(B-26)이 한 번에 필요로 하는 데이터. */
export interface MyPageOverview {
  nickname: string;
  email: string;
  orderProgress: OrderProgressCounts;
}

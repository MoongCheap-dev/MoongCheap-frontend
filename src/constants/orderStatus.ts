import { canTransition } from '@/lib/statusTransition';
import type { StatusMeta } from '@/types/status';

/**
 * 주문 상태 레지스트리. 화면 B-21(주문 내역)·B-26(마이페이지 요약)·B-28(주문 상세)이 참조한다.
 *
 * 출처: 기능정의서 '상태정의' 시트 — 주문 상태(B-21). 상태값·라벨·전이·비고를 그대로 옮겼다.
 * 주문 레코드는 공구가 GB_CLOSED에 도달할 때 ORD_PAID로 생성된다(상태정의 ★ 연결 지점).
 *
 * 정방향 진행이 원칙이며 ORD_CANCELED만 예외 분기다. ORD_REQUESTED("배송요청")는 되돌아갈 수 없는
 * 지점으로, 진입 후 수량 변경이 불가능하다(여분 구매 마감선).
 */
export const ORDER_STATUS = {
  /** 결제완료 — GB_CLOSED 도달 시 주문 레코드 생성. ★ 이 구간에 바로구매 오픈. */
  ORD_PAID: {
    label: '결제완료',
    tone: 'brand',
    isTerminal: false,
    next: ['ORD_REQUESTED', 'ORD_CANCELED'],
  },
  /** 배송요청 — 여분 판매 마감 + 최종 수량을 판매자에게 전달. 되돌아갈 수 없는 지점(수량 변경 불가). */
  ORD_REQUESTED: {
    label: '배송요청',
    tone: 'info',
    isTerminal: false,
    next: ['ORD_PREPARING'],
  },
  /** 배송준비중 — 판매자 발주 확인 및 출고 준비 착수. */
  ORD_PREPARING: {
    label: '배송준비중',
    tone: 'info',
    isTerminal: false,
    next: ['ORD_SHIPPING'],
  },
  /** 배송중 — 송장 등록 및 집화 완료. 배송 조회(FN-B22-01) 가능. */
  ORD_SHIPPING: {
    label: '배송중',
    tone: 'info',
    isTerminal: false,
    next: ['ORD_DELIVERED'],
  },
  /** 배송완료 — 택배사 배송완료 처리. 이 상태에서만 '구매 확정' 버튼을 노출한다. */
  ORD_DELIVERED: {
    label: '배송완료',
    tone: 'success',
    isTerminal: false,
    next: ['ORD_CONFIRMED'],
  },
  /** 구매확정 — 사용자 수령 확인 또는 배송완료 후 7일 경과 시 자동 확정(AUTO_CONFIRM_DAYS). */
  ORD_CONFIRMED: {
    label: '구매확정',
    tone: 'success',
    isTerminal: true,
    next: [],
  },
  /** 취소/교환/반품 — 사용자 취소 요청 또는 판매자 취소. B-26에서 별도 버튼으로 분리 진입(로직 미구현). */
  ORD_CANCELED: {
    label: '취소/교환/반품',
    tone: 'neutral',
    isTerminal: true,
    next: [],
  },
} as const satisfies Record<string, StatusMeta<string>>;

/** 주문 상태 코드 유니온. 레지스트리 키에서 파생하므로 상수와 항상 일치한다. */
export type OrderStatus = keyof typeof ORDER_STATUS;

/**
 * B-21 주문 목록에 노출하는 상태 순서(정방향 진행 순).
 * 취소 계열(ORD_CANCELED)은 별도 동선으로 분리되므로 진행 순서 배열에서 제외한다.
 */
export const ORDER_STATUS_FLOW = [
  'ORD_PAID',
  'ORD_REQUESTED',
  'ORD_PREPARING',
  'ORD_SHIPPING',
  'ORD_DELIVERED',
  'ORD_CONFIRMED',
] as const satisfies readonly OrderStatus[];

/** 상태 코드로 메타(라벨·톤·전이)를 얻는다. */
export function getOrderStatusMeta(status: OrderStatus) {
  return ORDER_STATUS[status];
}

/** from → to 전이가 상태 그래프상 허용되는지 검사한다(범용 canTransition 위임). */
export function canTransitionOrder(from: OrderStatus, to: OrderStatus): boolean {
  return canTransition(ORDER_STATUS, from, to);
}

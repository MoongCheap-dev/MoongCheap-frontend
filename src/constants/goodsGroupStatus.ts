import { canTransition } from '@/lib/statusTransition';
import type { StatusMeta } from '@/types/status';

/**
 * 공구(공동구매) 상태 레지스트리. 화면 B-17(내 참여) 탭과 수요/공구 상세가 참조한다.
 *
 * 출처: 기능정의서 '상태정의' 시트 — 공구 상태(B-17). 상태값·라벨·전이·비고를 그대로 옮겼다.
 * 백엔드가 상태를 확정 관리하므로 이 상수는 **화면이 라벨·다음 동작을 판단하기 위한 참조 모델**이며,
 * API 응답 포맷(래핑 여부·필드명)과는 무관하다. 응답이 어떤 모양이든 API 계층에서 이 코드로 변환한다.
 *
 * ⚠️ MVP 범위: GB_CANCELED는 "클러스터 생성 후 실패 경로 없음"으로 MVP에서 도달 불가하며 구조만
 *    정의한다. GB_SUBSTITUTE_OFFERED(대체상품 제안)도 Full 범위다. 상태값은 미리 열어 두되 화면
 *    노출/전이는 MVP 스콥에 따라 제한한다.
 */
export const GOODS_GROUP_STATUS = {
  /** 모이는 중 — 수요조사 등록 후 모집 개시. 참여·참여 취소 가능. */
  GB_GATHERING: {
    label: '모이는 중',
    tone: 'brand',
    isTerminal: false,
    next: ['GB_ACTION_REQUIRED', 'GB_CANCELED'],
  },
  /** 확인 필요 — 모집 마감 + 낙찰 성립. 참여자별 조치(결제/대체상품 수락·거절) 발생. */
  GB_ACTION_REQUIRED: {
    label: '확인 필요',
    tone: 'warning',
    isTerminal: false,
    next: ['GB_CLOSED', 'GB_CANCELED'],
  },
  /** 종료 — 모든 참여자 조치 완료로 공구 성립 확정. ★ 이 낙찰 시점에 주문 레코드(PAYMENT_PENDING) 생성 → B-21. */
  GB_CLOSED: {
    label: '종료',
    tone: 'success',
    isTerminal: true,
    next: [],
  },
  /** 취소 — 미낙찰 / 최소 수량 미달 / 판매자 취소. ⚠️ MVP 도달 불가, Full에서 활성화. */
  GB_CANCELED: {
    label: '취소',
    tone: 'neutral',
    isTerminal: true,
    next: [],
  },
  /**
   * 대체상품 제안 — 미배정 요청이 유사 상품과 묶여 클러스터 생성 대상이 된 경우. Full 범위.
   * 상태정의상 다음 상태는 (수락)배정완료 / (거절)미배정 / (만료)소멸 — 이는 공구가 아닌 수요 '요청'
   * 레벨의 상태축이며 아직 코드가 정의되지 않았다. 그래서 이 GB_ 축에서는 후속을 비워 둔다(추론 금지).
   */
  GB_SUBSTITUTE_OFFERED: {
    label: '대체상품 제안',
    tone: 'warning',
    isTerminal: false,
    next: [],
  },
} as const satisfies Record<string, StatusMeta<string>>;

/** 공구 상태 코드 유니온. 레지스트리 키에서 파생하므로 상수와 항상 일치한다. */
export type GoodsGroupStatus = keyof typeof GOODS_GROUP_STATUS;

/** 상태 코드로 메타(라벨·톤·전이)를 얻는다. */
export function getGoodsGroupStatusMeta(status: GoodsGroupStatus) {
  return GOODS_GROUP_STATUS[status];
}

/** from → to 전이가 상태 그래프상 허용되는지 검사한다(범용 canTransition 위임). */
export function canTransitionGoodsGroup(from: GoodsGroupStatus, to: GoodsGroupStatus): boolean {
  return canTransition(GOODS_GROUP_STATUS, from, to);
}

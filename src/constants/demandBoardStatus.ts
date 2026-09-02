import { canTransition } from '@/lib/statusTransition';
import type { StatusMeta } from '@/types/status';

/**
 * 수요보드 상태 레지스트리. 화면 B-17(내 참여) 탭과 수요/공구 상세가 참조한다.
 *
 * 출처: 기능정의서 '상태 정의' 시트 V2.8 — 수요보드 상태(`demand_board.status`, BE 정의분).
 * `GB_` 접두사가 붙은 4종이 이 축의 전부다. 백엔드가 상태를 확정 관리하므로 이 상수는
 * **화면이 라벨·다음 동작을 판단하기 위한 참조 모델**이며, API 응답 포맷(래핑 여부·필드명)과는
 * 무관하다. 응답이 어떤 모양이든 API 계층에서 이 코드로 변환한다.
 *
 * ⚠️ 축을 헷갈리지 말 것. 상태 정의 시트에는 이름이 비슷한 축이 둘 더 있다.
 *    - `demand.status` — 요청(접수 건) 단위. 대체상품 제안(SUBSTITUTE_OFFERED)이 여기 속한다.
 *    - `GroupBuy.status` — 공구 단위. "PM임의, BE 추후 업데이트 예정"이라 아직 코드로 옮기지 않는다.
 *
 * ⚠️ MVP 범위: GB_CANCELED는 "클러스터 생성 후 실패 경로 없음"으로 MVP에서 도달 불가하며
 *    구조만 정의한다(BR-B17-01-09). 취소 탭은 항상 빈 목록으로 노출한다.
 */
export const DEMAND_BOARD_STATUS = {
  /** 모이는 중 — 응찰 접수 및 참여자 모집. 참여·참여 취소 가능. */
  GB_GATHERING: {
    label: '모이는 중',
    tone: 'brand',
    isTerminal: false,
    next: ['GB_ACTION_REQUIRED'],
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
  /**
   * 취소 — 최소 수량 미달 / 미낙찰. 판매자 취소는 이 축이 아니라 `GroupBuy.CANCELED`다.
   * ⚠️ MVP 도달 불가(BR-B17-01-09), Full에서 활성화.
   */
  GB_CANCELED: {
    label: '취소',
    tone: 'neutral',
    isTerminal: true,
    next: [],
  },
} as const satisfies Record<string, StatusMeta<string>>;

/** 수요보드 상태 코드 유니온. 레지스트리 키에서 파생하므로 상수와 항상 일치한다. */
export type DemandBoardStatus = keyof typeof DEMAND_BOARD_STATUS;

/** 상태 코드로 메타(라벨·톤·전이)를 얻는다. */
export function getDemandBoardStatusMeta(status: DemandBoardStatus) {
  return DEMAND_BOARD_STATUS[status];
}

/** from → to 전이가 상태 그래프상 허용되는지 검사한다(범용 canTransition 위임). */
export function canTransitionDemandBoard(from: DemandBoardStatus, to: DemandBoardStatus): boolean {
  return canTransition(DEMAND_BOARD_STATUS, from, to);
}

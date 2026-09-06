import type { StatusTone } from '@/types/status';

/**
 * 화면 B-17(내 수요 참여 목록)의 상태 탭·카드 배지 표시 모델. **screen-local · 잠정**.
 *
 * 탭 라벨은 시안(B-17)의 상태 탭을 그대로 옮겼다: 전체 / 모이는 중 / 배정완료 / 확인필요 / 완료.
 *
 * ⚠️ 백엔드 상태 축과의 매핑은 아직 확정 전이다. 시안 탭은 실제로는 서로 다른 축에 걸쳐 있을 수 있다.
 *    - `demand_board.status`(GB_*) — 모이는 중(GB_GATHERING)·확인 필요(GB_ACTION_REQUIRED)·완료(GB_CLOSED)
 *    - '배정완료'(낙찰 배정)와 '확인필요' 내 대체상품 제안은 demand.status 등 세부 축일 수 있다.
 *    (참고: constants/demandBoardStatus.ts · orderStatus.ts)
 *
 * 그래서 여기서는 화면이 **필터·배지를 그리기 위한 참조 모델**만 둔다. 배지 색은 상태마다 직접
 * 박지 않고 의미 톤(StatusTone)만 부여하며, 실제 색은 StatusBadge가 시맨틱 토큰으로 매핑한다.
 * BE 규격이 확정되면 이 파일에서 위 상수들로 변환하고, 카드/탭 계약은 그대로 둔다.
 */

export interface ParticipationStatusMeta {
  /** 상태 탭 라벨('전체' 제외). */
  readonly tabLabel: string;
  /** 카드 배지 문구. */
  readonly badgeLabel: string;
  /** 그 탭이 비었을 때의 안내 문구. 시안 B-17 각 탭 빈 상태 카피. */
  readonly emptyTitle: string;
  readonly tone: StatusTone;
}

export const PARTICIPATION_STATUS = {
  /** 모이는 중 — 응찰 접수·참여자 모집. */
  GATHERING: {
    tabLabel: '모이는 중',
    badgeLabel: '모이는 중',
    emptyTitle: '모이는 중인 수요가 없어요',
    tone: 'brand',
  },
  /** 배정완료 — 낙찰 배정됨(참여자 낙찰 취소 가능). */
  ALLOCATED: {
    tabLabel: '배정완료',
    badgeLabel: '배정완료',
    emptyTitle: '배정된 내 물품이 없어요',
    tone: 'info',
  },
  /** 확인필요 — 참여자 조치 필요(대체상품 제안 등 → B-16). */
  ACTION_REQUIRED: {
    tabLabel: '확인필요',
    badgeLabel: '대체상품 제안',
    emptyTitle: '확인이 필요한 내역이 없어요',
    tone: 'warning',
  },
  /** 완료 — 참여 종결. */
  DONE: {
    tabLabel: '완료',
    badgeLabel: '완료',
    emptyTitle: '완료된 참여가 없어요',
    tone: 'success',
  },
} as const satisfies Record<string, ParticipationStatusMeta>;

/** 참여 상태 코드 유니온. 레지스트리 키에서 파생한다. */
export type ParticipationStatus = keyof typeof PARTICIPATION_STATUS;

/** 상태 코드로 배지·탭 메타를 얻는다. */
export function getParticipationStatusMeta(status: ParticipationStatus): ParticipationStatusMeta {
  return PARTICIPATION_STATUS[status];
}

/** '전체' 탭 키. 상태 코드와 겹치지 않는 별도 값. */
export const PARTICIPATION_TAB_ALL = 'ALL' as const;

/** 상태 탭 키. '전체' + 각 상태. */
export type ParticipationTab = typeof PARTICIPATION_TAB_ALL | ParticipationStatus;

/**
 * 상태 탭 목록. 순서는 시안(B-17) 탭 순서를 그대로 따른다.
 * '전체'를 맨 앞에 두고, 나머지는 상태 레지스트리의 tabLabel을 재사용한다.
 */
export const PARTICIPATION_TABS: readonly { key: ParticipationTab; label: string }[] = [
  { key: PARTICIPATION_TAB_ALL, label: '전체' },
  { key: 'GATHERING', label: PARTICIPATION_STATUS.GATHERING.tabLabel },
  { key: 'ALLOCATED', label: PARTICIPATION_STATUS.ALLOCATED.tabLabel },
  { key: 'ACTION_REQUIRED', label: PARTICIPATION_STATUS.ACTION_REQUIRED.tabLabel },
  { key: 'DONE', label: PARTICIPATION_STATUS.DONE.tabLabel },
];

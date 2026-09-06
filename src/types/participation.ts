import type { ParticipationStatus } from '@/constants/participationStatus';

/**
 * 화면 B-17(내 수요 참여 목록) 카드 한 건이 요구하는 타입.
 *
 * `types/payment.ts`와 같은 원칙이다. 백엔드 응답을 옮긴 것이 아니라 **화면이 필요로 하는 모양**이며,
 * 규격이 나오면 API 계층에서 변환해 이 타입으로 맞춘다.
 *
 * 현재 백엔드 Swagger(2026-09-06)에는 B-17이 쓸 **참여 목록 조회·낙찰 취소·대체상품 엔드포인트가
 * 없다**(수요 `등록`(POST /api/members/me/demand)·수요보드 `존재 확인`만 존재). 그래서 목록은 mock이다.
 * 다만 응답 관례는 확정됐다 — **래핑 없음, 목록은 배열**(IdResponse `{id}`, 도감만 `{list,totalCount}`).
 * mocks/participation.ts가 이미 배열을 반환하므로, 조회 엔드포인트가 오면 타입 변경 없이 붙는다.
 * 참고로 확정된 `DemandCreateRequestDto`는 quantity(1~99)·isSubstitutable·catalogId·desiredPriceMin/Max를
 * 가지며, 참여 응답 DTO가 도착하면 이 타입을 그 필드에 맞춘다.
 */
export interface ParticipationItem {
  readonly id: string;
  /** 상품명. 시안 카드 제목. */
  readonly productName: string;
  /** 옵션·용량 등 부제(선택). 시안 카드의 상품명 아래 회색 보조 문구. */
  readonly optionLabel?: string;
  /** 참여 수량(개). 출처: FN-B09-01 수량(1~99). */
  readonly quantity: number;
  /**
   * 희망 가격대 라벨. 시안 카드 하단 가격 표기.
   * 값은 constants/businessRules.ts의 PRICE_BANDS 라벨을 그대로 쓴다(예: '2만원 이하').
   */
  readonly priceLabel: string;
  /** 참여(접수) 날짜 'YYYY.MM.DD'. 목록의 날짜 그룹 헤더 기준. */
  readonly requestedAt: string;
  /** 참여 상태. 카드 배지·탭 필터가 참조한다. */
  readonly status: ParticipationStatus;
}

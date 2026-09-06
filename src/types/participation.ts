import type { ParticipationStatus } from '@/constants/participationStatus';

/**
 * 화면 B-17(내 수요 참여 목록) 카드 한 건이 요구하는 타입.
 *
 * `types/payment.ts`와 같은 원칙이다. 백엔드 응답을 옮긴 것이 아니라 **화면이 필요로 하는 모양**이며,
 * 규격이 나오면 API 계층에서 변환해 이 타입으로 맞춘다. B-17은 **도메인 B(거래·공동구매)**라
 * 상세 엔드포인트·DTO·필드명은 아직 미수령이다(BE 담당 부재). 다만 응답 관례는 도메인 A 실측으로
 * 확정됐다 — **래핑 없음, 목록은 배열**(mocks/participation.ts가 이미 배열을 반환한다).
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

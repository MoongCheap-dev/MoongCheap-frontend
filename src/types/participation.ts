import type { ParticipationStatus } from '@/constants/participationStatus';

/**
 * 화면 B-17(내 뭉치 참여 목록) 카드 한 건이 요구하는 타입.
 *
 * `types/payment.ts`와 같은 원칙이다. 백엔드 응답을 옮긴 것이 아니라 **화면이 필요로 하는 모양**이며,
 * 규격이 나오면 API 계층에서 변환해 이 타입으로 맞춘다.
 *
 * 현재 백엔드 Swagger(2026-09-06)에는 B-17이 쓸 **참여 목록 조회·낙찰 취소·대체상품 엔드포인트가
 * 없다**(수요 등록·수요보드 존재 확인만 존재). 그래서 목록은 mock이다. 응답 관례는 확정 — 목록은
 * 래핑 없이 배열이라 mocks/participation.ts가 배열을 반환한다. 참여 응답 DTO가 도착하면 이 타입을
 * 그 필드에 맞춘다. dday·participantCount는 시안에 있는 표시값으로, 실제 산출 규칙은 BE 확정 시.
 */
export interface ParticipationItem {
  readonly id: string;
  /** 상품명. 시안 카드 제목(볼드). */
  readonly productName: string;
  /** 브랜드·카테고리. 시안 카드 부제(예: 종근당건강 · 라라스윗). */
  readonly category: string;
  /** 참여 수량(개). 출처: FN-B09-01 수량(1~99). */
  readonly quantity: number;
  /** 희망 가격대 라벨. PRICE_BANDS 라벨을 쓴다(예: 3만원 이하). */
  readonly priceLabel: string;
  /** 참여 인원 수. 시안 카드의 'N명 참여' 배지. */
  readonly participantCount: number;
  /** 마감까지 남은 일수. 시안의 'D-N' 배지(0이면 D-0). */
  readonly dday: number;
  /** 참여(접수) 날짜 'YYYY.MM.DD'. 목록의 날짜 그룹 헤더 기준. */
  readonly requestedAt: string;
  /** 참여 상태. 카드 배지·탭 필터·액션이 참조한다. */
  readonly status: ParticipationStatus;
}

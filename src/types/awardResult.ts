/**
 * 화면 B-19(낙찰 성공 정보) 낙찰 결과 한 건이 요구하는 타입.
 *
 * `types/participation.ts`와 같은 원칙이다. 백엔드 응답을 옮긴 것이 아니라 **화면이 필요로 하는 모양**이며,
 * 규격이 나오면 API 계층에서 변환해 이 타입으로 맞춘다.
 *
 * 현재 백엔드 Swagger(2026-09-06)에는 낙찰 결과 조회 엔드포인트가 없다(참여 목록·낙찰 취소도 부재 —
 * types/participation.ts 주석 참고). 그래서 값은 mock이며, 시안(B-19)의 예시 수치를 옮겼다.
 * 결제/정산 배선은 도메인 B 규격 확정 후 별도 이슈다(이슈 #66 범위 밖).
 *
 * 낙찰(award)은 "48시간 내 자동결제 대기" 상태(=참여 상태의 배정완료 ALLOCATED)의 상세다. 그래서 화면
 * 하단 CTA가 '뭉치 낙찰 취소하기'다(자동결제 전까지 취소 가능). 상태 축이 확정되면 이 상세를 그 축에
 * 맞춰 연결한다(참고: constants/participationStatus.ts ALLOCATED). 용어 'award'는 코드 스타일 컨벤션
 * 도메인 용어표(낙찰 = award/winningBid)를 따른다.
 */
export interface AwardResult {
  readonly id: string;
  /** 상품명. 시안 상품 카드 제목(볼드). */
  readonly productName: string;
  /** 브랜드·카테고리. 시안 상품 카드 부제(예: 종근당 건강). */
  readonly category: string;
  /** 최종 낙찰가(원). 시안 '최종 낙찰가'. */
  readonly finalBidPrice: number;
  /** 희망 가격대 라벨(예: 3만원 이하). 시안 '희망가'. PRICE_BANDS 라벨과 같은 문자열. */
  readonly desiredPriceLabel: string;
  /** 내 참여 수량(개). 시안 '내 참여 수량'. */
  readonly myQuantity: number;
  /** 낙찰 셀러명. 시안 '셀러명'. */
  readonly sellerName: string;
  /** 낙찰 날짜 'YYYY.MM.DD'. 시안 '낙찰 날짜'. */
  readonly awardedAt: string;
  /** 최종 응찰 수(건). 시안 '최종 응찰'. */
  readonly finalBidCount: number;
  /** 참여 뭉치단 수(개). 시안 '참여 뭉치단'. */
  readonly participantGroupCount: number;
  /** 결제 예정 금액(원). 시안 '결제 예정 금액'(현재는 최종 낙찰가와 동일). */
  readonly expectedPaymentPrice: number;
}

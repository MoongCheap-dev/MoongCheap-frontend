/**
 * B-08 상품 상세 화면 문구. 시안(node 1153:72748 / 1153:73735)에서 읽은 그대로다.
 *
 * ⚠️ 9/4 디자인 결정 "UI의 `수요`·`공구`를 `뭉치`로 통일"에 따라 시안도 "뭉치 퀵 참여"·
 * "뭉치 참여하기"로 쓴다. 문구가 바뀌면 이 파일만 고친다.
 */

export const PRODUCT_DETAIL = {
  /**
   * 실시간 열람 배지. 가운데 인원 수만 코랄(content/brand)로 강조돼 세 조각으로 나눠 둔다.
   * 예: "현재 " + "231명" + "이 보고 있어요!".
   */
  viewingPrefix: '현재 ',
  viewingCount: (count: number) => `${count.toLocaleString('ko-KR')}명`,
  viewingSuffix: '이 보고 있어요!',

  /** 상품 이미지 좌하단 칩. 비슷한 상품 목록(Full)으로 이동 — 아직 화면 부재. */
  similarProducts: '비슷한 상품',

  /** 진행중인 뭉치 퀵 참여 섹션 제목. "건"만 content/primary로 강조된다. */
  quickDealsLead: (count: number) => `진행중인 뭉치 퀵 참여 ${count}`,
  quickDealsUnit: '건',

  /** 딜 카드 내부 문구. */
  dealParticipants: (count: number) => `${count.toLocaleString('ko-KR')}명 참여`,
  dealSellers: (count: number) => `뭉셀러 ${count}명`,

  /** 상품설명 섹션. */
  descriptionHeading: '상품설명',
  viewMore: '자세히 보기',
  collapse: '접기',

  /** 하단 고정 CTA. 수요 등록/참여(B-09)로 이동 — 아직 화면 부재. */
  participateCta: '뭉치 참여하기',
} as const;

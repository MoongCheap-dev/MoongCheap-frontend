/**
 * 정적 이미지 에셋 경로. public/images/ 하위 파일을 컴포넌트에 문자열로 박지 않고
 * 여기서 단일 관리한다(경로 오타 방지·파일 이동 시 한 곳만 수정). next/image의 src에 그대로 넘긴다.
 *
 * 지금은 여러 화면이 공유하는 예외/빈 상태 일러스트만 둔다. 화면 전용 에셋(홈 배너·상품 카드·
 * 카테고리 아이콘 등)은 각 화면을 구현하며 그 배선 시점에 추가한다.
 * (#60에서 public/images/ 하위에 반입만 해 둔 상태 — 화면 미구현.)
 */

/** 예외/빈 상태 일러스트. public/images/exception/ 공용. */
export const EXCEPTION_ASSETS = {
  /** 전체화면 오류(모든 error 페이지) 삽화. ErrorScreen에서 사용. */
  error: '/images/exception/error.webp',
  /** 결제수단 미등록 빈 상태의 지갑 일러스트. B-14. */
  emptyPayment: '/images/exception/empty-payment.webp',
  /** 주문/참여 내역 빈 상태 일러스트. B-21(화면 구현 시 배선). */
  emptyHistory: '/images/exception/empty-history.webp',
} as const;

/** 낙찰 결과(B-19) 화면 전용 일러스트. */
export const AWARD_RESULT_ASSETS = {
  /** 낙찰 성공 상단 축하 삽화. AwardResultView에서 사용. */
  celebrate: '/images/bid-result/1-1.webp',
} as const;

/**
 * 기능정의서에서 숫자로 확정된 비즈니스 상수. 여러 화면이 공유하는 값만 모은다.
 *
 * 각 값의 출처(화면 ID·기능 ID)를 주석에 남긴다. 서버가 최종 판정 주체인 값(마감·자동확정 등)은
 * 프론트가 표기·카운트다운·낙관적 UI에 쓰는 참조값이지 서버 판정을 대신하지 않는다.
 *
 * ⚠️ 기간 모델은 08.26 'B안 전환'으로 개정됐다. 구(舊) "고정 라운드 7일"(IA 시트 B-09)은 삭제됐고,
 *    아래처럼 유효기간·미배정 대기·프로세싱(모집)·확인 기한으로 분리됐다(FN-B09-01·FN-B09-04).
 */

/* ── 수요 접수~성사 기간 모델 (B안 08.26) ── */

/** 수요 요청 유효기간(일). 접수 시점 기준. = 미배정 대기 + 프로세싱. 출처: FN-B09-04. */
export const REQUEST_VALIDITY_DAYS = 7;

/** 미배정 대기 최대 기간(일). 이 기간 내 클러스터 편입 실패 시 요청 소멸. 출처: FN-B09-04. */
export const UNASSIGNED_WAIT_MAX_DAYS = 2;

/**
 * 수요보드 프로세싱(모집) 기간(일). **수요보드 생성 시점** 기준(접수 시점 아님).
 * 수요 상세·카드의 '남은 시간' 표기 기준. 출처: FN-B09-04 · MC-B12-01.
 */
export const BOARD_PROCESSING_DAYS = 5;

/** 낙찰 후 참여자 확인·취소 기한(시간). 경과 시 자동결제. 출처: FN-B09-02 · 상태정의. */
export const CONFIRM_WINDOW_HOURS = 48;

/** 배송완료 후 자동 구매확정 기한(일). 미확인 시 자동 확정. 출처: 상태정의 ORD_CONFIRMED · B-22. */
export const AUTO_CONFIRM_DAYS = 7;

/* ── 입력 제약 ── */

/** 주문/접수 수량 범위와 기본값. 출처: FN-B09-01 · MC-B12-02 (기본값 1, 1~99 정수). */
export const ORDER_QUANTITY_MIN = 1;
export const ORDER_QUANTITY_MAX = 99;
export const ORDER_QUANTITY_DEFAULT = 1;

/** 검색어 길이 제약. 출처: BR-B05-01-01 (2자 이상, 공백만으로는 실행 불가). 최대는 운영 조정 가능. */
export const SEARCH_QUERY_MIN_LENGTH = 2;
export const SEARCH_QUERY_MAX_LENGTH = 50;

/** 최근 검색어 로컬 저장 최대 건수. 초과 시 오래된 것부터 제거. 출처: FN-B05-02. */
export const SEARCH_HISTORY_MAX = 10;

/** 대체 상품 추천 자연어 조건 최대 글자수. 출처: FN-B09-03 (조정 가능). */
export const SUBSTITUTE_NOTE_MAX_LENGTH = 100;

/** 계정당 결제수단 등록 최대 건수. 도달 시 추가 차단. 출처: BR-B14-02-05 · BR-B14-01-07. */
export const PAYMENT_METHOD_MAX = 5;

/** 계정당 배송지 등록 최대 건수. 도달 시 추가 차단. 출처: BR-B30-01-09 · FN-B30-02. */
export const ADDRESS_MAX = 5;

/* ── 목록·카드 공통 동작 ── */

/** 무한 스크롤 페이지당 건수. 출처: BR-B17-01-11 · BR-B21-01-11. */
export const LIST_PAGE_SIZE = 20;

/** 남은 시간이 이 값 미만이면 카드에 '마감 임박'으로 강조 표기(시간). 출처: BR-B17-01-13. */
export const IMMINENT_THRESHOLD_HOURS = 12;

/* ── 홈 피드 미리보기 노출 개수. 출처: FN-B03-01. ── */
export const HOME_CATALOG_PREVIEW_COUNT = 9; // 상품 도감 상위 9개
export const HOME_GATHERING_PREVIEW_COUNT = 3; // 모이는 중 수요 마감 임박순 상위 3개

/**
 * 수요 접수 희망 가격대 구간(7종, 택1). 카드·수요 상세의 가격 범위 표기도 이 구간을 따른다.
 *
 * 화면 표기는 '이하/초과'로 통일하고 저장값은 1원 단위로 분리해, 택1 구조에서 경계값이 두 구간에
 * 동시 귀속되지 않게 한다(BR-B09-01-10). 서버로 보내는 값은 `min`·`max`이며 `key`는 화면 상태용
 * 식별자다.
 *
 * 최상위 구간의 `max: 999_999`는 내부 상한이라 어떤 화면에도 노출하지 않는다. B-06 희망가 범위는
 * 보드 집계값을 만원 단위로 절삭해 표기하는 별도 규칙을 따른다(예: 집계 20,001~100,000 → 2만~10만원).
 *
 * 출처: FN-B09-01 구성 요소 · BR-B09-01-10 · '가격 데이터 실제 매핑값' 표(8/31).
 */
export const PRICE_BANDS = [
  { key: 'upto_5k', label: '5천원 이하', min: 0, max: 5_000 },
  { key: 'upto_10k', label: '1만원 이하', min: 5_001, max: 10_000 },
  { key: 'upto_20k', label: '2만원 이하', min: 10_001, max: 20_000 },
  { key: 'upto_30k', label: '3만원 이하', min: 20_001, max: 30_000 },
  { key: 'upto_50k', label: '5만원 이하', min: 30_001, max: 50_000 },
  { key: 'upto_100k', label: '10만원 이하', min: 50_001, max: 100_000 },
  { key: 'over_100k', label: '10만원 초과', min: 100_001, max: 999_999 },
] as const;

export type PriceBandKey = (typeof PRICE_BANDS)[number]['key'];

/**
 * 하단 GNB 탭 정의. MVP는 3탭 고정. 각 탭은 해당 루트 화면으로 이동한다.
 * 출처: FN-B03-02 GNB (홈 · 내 대기 · 마이페이지 → B-03 / B-17 / B-24).
 *
 * `href`는 라우팅 규약이 확정되면 채운다(현재 App Router 경로 미확정). 지금은 대상 화면 ID만 고정한다.
 */
export const GNB_TABS = [
  { key: 'home', label: '홈', screenId: 'B-03' },
  { key: 'waiting', label: '내 대기', screenId: 'B-17' },
  { key: 'my', label: '마이페이지', screenId: 'B-24' },
] as const;

export type GnbTabKey = (typeof GNB_TABS)[number]['key'];

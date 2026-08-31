/**
 * 화면 카탈로그. IA 시트(IA_구매자_V1 / 판매자)에서 확정된 화면 ID·이름·범위를 단일 소스로 옮겼다.
 *
 * 라우팅·접근 가드·"준비 중" 분기가 모두 이 표를 기준으로 판단하게 만들기 위한 것이다.
 * 화면 그림(디자인)과 무관하게 확정된 정보만 담았고, 레이아웃/구성요소는 각 화면 구현 시 채운다.
 *
 * scope:
 * - 'MVP'          이번 MVP 구현 대상
 * - 'Full'         정식 버전 범위 (MVP 진입점은 노출하되 탭 시 '준비 중' 토스트)
 * - 'DISCONTINUED' 결번 — 기능 삭제/타 화면과 통합되어 더는 만들지 않음
 */
export type ScreenScope = 'MVP' | 'Full' | 'DISCONTINUED';
export type ScreenRole = 'buyer' | 'seller';

export interface ScreenDef {
  /** 화면 ID. IA 시트의 'B-01' · 'S-01' 표기를 그대로 쓴다. */
  readonly id: string;
  /** 화면명(IA Depth 2). */
  readonly name: string;
  readonly role: ScreenRole;
  readonly scope: ScreenScope;
  /** IA Depth 1 그룹(온보딩·인증, 홈, 결제 등). 내비/정보구조 그룹핑용. */
  readonly group: string;
}

/** 구매자 화면(B-*). */
export const BUYER_SCREENS = [
  { id: 'B-01', name: '로그인/회원가입', role: 'buyer', scope: 'MVP', group: '온보딩·인증' },
  { id: 'B-02', name: '관심 상품 선택', role: 'buyer', scope: 'Full', group: '온보딩·인증' },
  { id: 'B-03', name: '홈', role: 'buyer', scope: 'MVP', group: '홈' },
  { id: 'B-04', name: '성사된 공구 전체보기', role: 'buyer', scope: 'Full', group: '홈' },
  { id: 'B-05', name: '검색 입력', role: 'buyer', scope: 'MVP', group: '홈' },
  { id: 'B-06', name: '상품 도감 검색 결과', role: 'buyer', scope: 'MVP', group: '상품·수요' },
  {
    id: 'B-07',
    name: '자연어 상품 탐색 결과',
    role: 'buyer',
    scope: 'DISCONTINUED',
    group: '상품·수요',
  },
  { id: 'B-08', name: '상품 상세', role: 'buyer', scope: 'MVP', group: '상품·수요' },
  { id: 'B-09', name: '수요 등록/참여', role: 'buyer', scope: 'MVP', group: '상품·수요' },
  { id: 'B-10', name: '상품 직접 추가', role: 'buyer', scope: 'Full', group: '상품·수요' },
  { id: 'B-11', name: '동일상품 후보 확인', role: 'buyer', scope: 'Full', group: '상품·수요' },
  { id: 'B-12', name: '수요 상세', role: 'buyer', scope: 'MVP', group: '상품·수요' },
  { id: 'B-13', name: '장바구니', role: 'buyer', scope: 'Full', group: '상품·수요' },
  { id: 'B-14', name: '결제수단 등록', role: 'buyer', scope: 'MVP', group: '결제' },
  { id: 'B-15', name: '결제', role: 'buyer', scope: 'MVP', group: '결제' },
  { id: 'B-16', name: '대체 상품 수락', role: 'buyer', scope: 'Full', group: '결제' },
  { id: 'B-17', name: '수요 상태별 목록', role: 'buyer', scope: 'MVP', group: '내 참여' },
  { id: 'B-18', name: '참여중 수요 상세', role: 'buyer', scope: 'DISCONTINUED', group: '내 참여' },
  { id: 'B-19', name: '낙찰 성공 정보', role: 'buyer', scope: 'MVP', group: '결과' },
  { id: 'B-20', name: '낙찰·구매실패 안내', role: 'buyer', scope: 'Full', group: '결과' },
  { id: 'B-21', name: '주문 내역', role: 'buyer', scope: 'MVP', group: '주문·배송' },
  { id: 'B-22', name: '배송상태 확인', role: 'buyer', scope: 'MVP', group: '주문·배송' },
  { id: 'B-23', name: '청약철회·환불', role: 'buyer', scope: 'DISCONTINUED', group: '주문·배송' },
  { id: 'B-24', name: '프로필·설정', role: 'buyer', scope: 'MVP', group: '마이페이지' },
  { id: 'B-25', name: '알림 설정', role: 'buyer', scope: 'Full', group: '마이페이지' },
  { id: 'B-26', name: '마이페이지 홈', role: 'buyer', scope: 'MVP', group: '마이페이지' },
  { id: 'B-27', name: '참여 가능한 수요 전체보기', role: 'buyer', scope: 'MVP', group: '홈' },
  { id: 'B-28', name: '주문상세', role: 'buyer', scope: 'MVP', group: '주문·배송' },
  { id: 'B-29', name: '도감 전체보기', role: 'buyer', scope: 'Full', group: '상품·수요' },
  { id: 'B-30', name: '배송지 등록', role: 'buyer', scope: 'MVP', group: '마이페이지' },
] as const satisfies readonly ScreenDef[];

/** 판매자 화면(S-*). */
export const SELLER_SCREENS = [
  { id: 'S-01', name: '판매자 전환 (역할 승격)', role: 'seller', scope: 'MVP', group: '온보딩' },
  { id: 'S-02', name: '사업자 인증', role: 'seller', scope: 'MVP', group: '온보딩' },
  { id: 'S-03', name: '취급 상품 등록', role: 'seller', scope: 'MVP', group: '온보딩' },
  { id: 'S-04', name: '스토어 연동', role: 'seller', scope: 'Full', group: '온보딩' },
  { id: 'S-05', name: '재고·목표 매출 입력', role: 'seller', scope: 'Full', group: '온보딩' },
  { id: 'S-06', name: '수요 목록 (홈)', role: 'seller', scope: 'MVP', group: '수요 보드' },
  { id: 'S-07', name: '수요 상세', role: 'seller', scope: 'MVP', group: '수요 보드' },
  { id: 'S-08', name: '응찰 조건 입력', role: 'seller', scope: 'MVP', group: '응찰' },
  { id: 'S-10', name: '진행 중 응찰 현황', role: 'seller', scope: 'MVP', group: '응찰' },
  { id: 'S-11', name: '낙찰 통보', role: 'seller', scope: 'MVP', group: '결과' },
  { id: 'S-12', name: '유찰 통보', role: 'seller', scope: 'MVP', group: '결과' },
  { id: 'S-13', name: '재응찰 제안', role: 'seller', scope: 'Full', group: '결과' },
  { id: 'S-14', name: '발송 처리', role: 'seller', scope: 'MVP', group: '발송·정산' },
  { id: 'S-15', name: '정산 내역', role: 'seller', scope: 'MVP', group: '발송·정산' },
  { id: 'S-16', name: '정산 보류 기간 표시', role: 'seller', scope: 'Full', group: '발송·정산' },
] as const satisfies readonly ScreenDef[];

/** 전체 화면 목록(구매자 + 판매자). */
export const SCREENS = [...BUYER_SCREENS, ...SELLER_SCREENS] as const;

/** ID → 화면 정의 조회 인덱스. 라우팅·가드에서 반복 조회되므로 O(1) 조회를 위해 한 번만 만든다. */
const SCREEN_BY_ID: ReadonlyMap<string, ScreenDef> = new Map(
  SCREENS.map((screen) => [screen.id, screen]),
);

/** ID로 화면 정의를 찾는다. 없으면 undefined. */
export function getScreen(id: string): ScreenDef | undefined {
  return SCREEN_BY_ID.get(id);
}

/** 해당 화면이 MVP 구현 대상인지. 라우팅·가드에서 '준비 중' 분기 판단에 쓴다. */
export function isMvpScreen(id: string): boolean {
  return getScreen(id)?.scope === 'MVP';
}

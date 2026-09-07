/**
 * 판매자 전환(S-01) 화면 문구.
 *
 * 기능명세서에 `FN-S01-xx` 행이 없어 **시안이 유일한 근거**다. 문구는 시안에 적힌 그대로 옮겼고,
 * 임의로 다듬지 않았다(오탈자로 보이는 것도 포함 — `notFound`의 띄어쓰기).
 *
 * 셀러 구현은 MVP에서 통째로 빠져 있다(2026-09-02 팀장 확인). 지금은 퍼블리싱만 하며 API는 없다.
 */

export const SELLER_APPLY_INTRO = {
  title: '판매를 시작해볼까요?',
  description: '간단한 인증을 통해 판매자 계정으로 전환해보세요!',
  notice: '전환 후에도 구매자 화면으로 언제든 돌아올 수 있습니다.',
  applyLabel: '판매자 전환 하기',
  laterLabel: '나중에 하기',
} as const;

/** 온보딩 카드 3장. 순서가 곧 전환 절차라 배열로 둔다. */
export const SELLER_APPLY_STEPS = [
  { title: '사업자등록번호 입력', description: '번호 확인 후 인증을 진행해요' },
  { title: '승인 결과 확인', description: '승인까지 잠시 시간이 걸릴 수 있어요' },
  { title: '판매자 모드 시작', description: '상품 등록과 주문관리를 시작해요' },
] as const;

export const SELLER_APPLY_BUSINESS = {
  title: '사업자등록 번호 입력',
  description: '발급받은 사업자등록 번호를 입력해주세요.',
  label: '사업자등록번호 10자리',
  placeholder: '사업자등록번호',
  verified: '인증완료',
  /** 시안 문구 그대로. '등록되지 않은'이 맞지만 고치지 않고 디자인 확인 대상으로 남긴다. */
  notFound: '등록되지않은 사업자등록번호입니다.',
  prevLabel: '이전',
  nextLabel: '다음',
} as const;

export const SELLER_APPLY_DONE = {
  title: '판매자로 전환이 완료됐어요',
  description: '마이페이지 내에서 판매자와 구매자를 전환할 수 있어요!',
  sellLabel: '판매자로 판매하기',
  keepBuyerLabel: '구매자 계정 유지하기',
} as const;

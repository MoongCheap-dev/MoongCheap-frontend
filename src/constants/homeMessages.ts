/**
 * 홈피드(B-03) 문구. 시안 `981:18157`에서 읽은 그대로다.
 *
 * ⚠️ 9/4 디자인 의사결정에 "UI의 `수요`·`공구`를 `뭉치`로 통일"이 있는데 **홈 시안은 아직 옛
 * 용어 그대로**다(`성사 직전 공구`·`브랜드별 인기 공구` 등). 어느 쪽이 정본인지 디자인 확인
 * 대기 중이라, 지금은 시안 문구를 그대로 옮기고 문구를 전부 이 파일에 모아 뒀다. 확정되면
 * 여기만 고치면 화면 전체에 반영된다.
 */

export const HOME_GNB_TITLE = '뭉치';
export const HOME_SEARCH_PLACEHOLDER = '검색어를 입력해주세요.';

/** 섹션 헤더의 오른쪽 링크. 행선지가 전부 미정이라 '준비 중' 토스트로 둔다. */
export const HOME_SECTION_MORE = '더보기';

/** 섹션 제목·부제. 번호는 시안의 `card-list-N` 순서다. */
export const HOME_SECTIONS = {
  /**
   * card-list-1. 검색 키워드에 따라 바뀌는 문구로 보이지만 시안에 규칙이 없어 그대로 둔다.
   */
  demand: { title: '유산균에서 현재 수요가 있어요!' },
  closing: { title: '성사 직전 공구', description: '이 공구에 참여하면 성사 확률이 올라가요!' },
  /** card-list-3. `뭉치님`이 서비스명인지 사용자 닉네임인지 시안만으로는 알 수 없다. */
  interest: { title: '뭉치님의 관심사 추천!' },
  succeeded: { title: '성사된 공구에 바로 참여해보세요!' },
  brandDeal: { title: '현재 인기 브랜드딜' },
  deadline: { title: '참여가능 마감 직전 공구', description: '다음번에는 기회가 없어요' },
  popular: { title: '현재 인기 공구 상품' },
  byBrand: { title: '브랜드별 인기 공구' },
} as const;

/** card-list-1 아래 전체 폭 버튼. */
export const HOME_DEMAND_MORE_BUTTON = '더 많은 수요 공구 찾아보기!';

/**
 * 카드 안 문구.
 *
 * ⚠️ 시안이 `희망가격대`(가로 카드)와 `희망 가격대`(세로 리스트)를 섞어 쓴다. 실수로 보이지만
 * 문구는 디자인 결정이라 시안 그대로 두 가지를 유지한다. PM·디자인 확인 대상.
 */
export const HOME_CARD = {
  participants: (count: number) => `현재 ${count.toLocaleString('ko-KR')}명`,
  participantsSuffix: (count: number) => `${count.toLocaleString('ko-KR')}명 참여`,
  sellers: (count: number) => `참여업체 ${count}곳`,
  desiredPriceTight: '희망가격대',
  desiredPriceSpaced: '희망 가격대',
} as const;

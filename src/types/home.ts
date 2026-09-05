/**
 * 홈피드(B-03) 화면 타입.
 *
 * 백엔드 도메인 A의 `ProductCatalogSummaryDto`가 `{ id, name, thumbnailUrl }` 3개뿐이라 시안의
 * 카드를 채울 수 없다. 연동 시점에 필드가 추가될 것을 전제로, 이름은 DTO 표기를 그대로 따르고
 * 아직 규격이 없는 값만 덧붙였다(문의 발송함).
 */

/** 상품 도감 요약. 백엔드 `ProductCatalogSummaryDto`와 같은 이름을 쓴다. */
export interface ProductCatalogSummary {
  id: string;
  name: string;
  /** 이미지 반입 전에는 비어 있다. 없으면 카드가 회색 자리를 그린다. */
  thumbnailUrl?: string;
}

/** 홈 카드가 보여주는 공구 정보. 명세에 아직 없는 값이라 목에만 있다. */
export interface HomeProductCard extends ProductCatalogSummary {
  /** 브랜드·셀러명. 시안에서 상품명 아래 회색 한 줄로 나온다. */
  brandName?: string;
  /** 참여 인원. 시안 `현재 1200명` / `1,200명 참여`. */
  participantCount: number;
  /** 응찰한 판매자 수. 시안 `참여업체 3곳`. */
  sellerCount?: number;
  /** 희망 가격대 라벨. 시안이 문자열로 그린다(`3만원 이하`). */
  desiredPriceLabel: string;
  /**
   * 마감까지 남은 시간. 시안이 두 가지로 그린다.
   * - `dday`  : `D-2` 뱃지
   * - `deadline`: `12:06:03` 실시간 카운트다운. ISO 문자열로 두고 화면에서 계산한다.
   */
  dday?: number;
  deadline?: string;
}

/** 배너 캐러셀 한 장. */
export interface HomeBanner {
  id: string;
  /**
   * 배너 위에 흰 글씨로 얹는 문구. 시안 4번(신라면)·6번(비비고)은 문구가 이미지에 인쇄돼 있어
   * 오버레이가 없다. 그래서 선택값이다.
   */
  title?: string;
  description?: string;
  imageUrl?: string;
}

/** 브랜드별 인기 공구 섹션의 브랜드 칩. */
export interface HomeBrand {
  id: string;
  name: string;
  logoUrl?: string;
}

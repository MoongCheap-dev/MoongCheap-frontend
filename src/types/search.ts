/**
 * 상품 도감 검색(B-06) 화면 타입.
 *
 * 검색 자체는 백엔드 `GET /api/products-search/search`(OpenSearch)로 실데이터를 받는다
 * ([[lib/productSearchApi]]). 다만 시안 카드가 요구하는 값 중 **수요 관련 네 가지**
 * (마감 D-day · 모집중/마감임박 배지 · 진행중인 퀵 참여 건수 · 참여 인원)는 검색 응답에 없다.
 * 검색 문서는 상품 도감(`ProductCatalog`)만 색인하고 수요보드를 보지 않기 때문이다.
 *
 * 수요보드 조회는 `GET /api/demand-boards/catalog/{catalogId}`가 있지만 **카탈로그 1건당 1콜**이라
 * 목록 화면에서 20장을 그리려면 20번 호출해야 한다. 목록용이 아니다. 검색 응답에 수요보드 요약을
 * 얹어 달라고 요청할 항목이며, 그 전까지 이 네 값은 목이다.
 */

import type { SEARCH_FILTERS } from '@/constants/searchMessages';

/** 필터 칩 키. 문구 상수에서 파생하므로 상수와 항상 일치한다. */
export type SearchFilterKey = (typeof SEARCH_FILTERS)[number]['key'];

/**
 * 검색 결과 카드 한 장.
 *
 * `id`·`name`·`spec`·`thumbnailUrl`·`listPrice`는 검색 응답 값이고, 나머지는 목이다.
 * 목 필드가 없으면 시안대로 '수요 없음' 카드(배지 하나 + 상품명 + 규격)로 그려진다.
 */
export interface ProductSearchResult {
  id: string;
  name: string;
  /** 규격/용량 부제. BE `specSummary`. 시안 "프로바이오틱스 80포 160g". */
  spec?: string;
  /** 없으면 카드가 회색 자리를 그린다. */
  thumbnailUrl?: string;
  /** 정가. BE `listPrice`. 시안 B-06엔 표시 자리가 없어 아직 화면엔 안 쓴다. */
  listPrice?: number;
  /** 진행 중인 수요의 남은 일수. 시안 `마감 D-1`. (mock - 검색 응답에 없음) */
  dday?: number;
  /** 수요 상태. 없으면 '수요 없음' 카드다. (mock - 검색 응답에 없음) */
  demandStatus?: 'gathering' | 'closing';
  /** 진행중인 뭉치 퀵 참여 건수. (mock - 검색 응답에 없음) */
  quickDealCount?: number;
  /** 참여 인원. (mock - 검색 응답에 없음) */
  participantCount?: number;
}

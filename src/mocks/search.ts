import type { ProductSearchResult } from '@/types/search';

/**
 * B-06 상품 도감 검색 결과 목 데이터. 시안 `1153:72821`의 카드 5장을 그대로 옮겼다.
 *
 * 검색 자체는 실제 API(`GET /api/products-search/search`)를 쓴다. 이 목은 **호출이 실패했을 때의
 * 대체물**이다(미로그인 · `NEXT_PUBLIC_API_BASE_URL` 미배선 · OpenSearch 색인 비어 있음).
 * `lib/productApi` + `ProductDetailView`가 쓰는 것과 같은 방식이다.
 *
 * 목이 실데이터보다 필드가 많다. 검색 응답에는 수요 관련 값(마감 D-day · 모집중/마감임박 ·
 * 퀵 참여 건수 · 참여 인원)이 없어서다([[types/search]]). 그래서 실제 검색이 성공하면 카드는
 * 시안의 '수요 없음' 모양으로 그려지고, 목으로 떨어졌을 때만 시안의 두 모양이 다 보인다.
 *
 * ⚠️ 이미지가 3장뿐이다. #60·#73에서 `public/images/catalog-search/`에 반입된 것이
 *    골드(2-1) · 뷰티(2-2) · 코어맥스(2-3)뿐이라 시안의 다이어트 · 당케어 카드는 썸네일 자리가
 *    비어 있다(회색 자리로 그려진다). 에셋 추가 반입 대상.
 */
const MOCK_RESULTS: readonly ProductSearchResult[] = [
  {
    id: 'catalog-search-1',
    name: '[종근당건강] 락토핏 생유산균 뷰티',
    spec: '프로바이오틱스/저분자콜라겐펩타이드GT 60포 120g',
    thumbnailUrl: '/images/catalog-search/2-2.webp',
    dday: 1,
    demandStatus: 'closing',
    quickDealCount: 3,
    participantCount: 900,
  },
  {
    id: 'catalog-search-2',
    name: '[종근당건강] 락토핏 생유산균 코어맥스',
    spec: '프로바이오틱스/아연 60포 120g',
    thumbnailUrl: '/images/catalog-search/2-3.webp',
    dday: 4,
    demandStatus: 'gathering',
    quickDealCount: 3,
    participantCount: 800,
  },
  {
    id: 'catalog-search-3',
    name: '[종근당건강] 락토핏 생유산균 골드',
    spec: '프로바이오틱스 80포 160g',
    thumbnailUrl: '/images/catalog-search/2-1.webp',
  },
  {
    id: 'catalog-search-4',
    name: '[종근당] 락토핏 다이어트',
    spec: '덴마크 유산균이야기',
  },
  {
    id: 'catalog-search-5',
    name: '[종근당] 락토핏 당케어',
    spec: '덴마크 유산균이야기',
  },
];

/** 검색 결과 목. 연동 실패 시에만 쓰인다. */
export async function mockSearchProducts(): Promise<readonly ProductSearchResult[]> {
  return MOCK_RESULTS;
}

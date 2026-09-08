import type { ProductDetail } from '@/types/product';

/**
 * B-08 상품 상세 목 데이터. 백엔드 상품 상세 규격이 없어 화면 검수용으로만 쓴다.
 *
 * 시안이 두 상태를 그린다.
 *  - 시나리오 1(node 1153:72748): 진행중인 뭉치 퀵 참여 0건 — 딜 카드 없음
 *  - 시나리오 2(node 1153:73735): 진행중인 뭉치 퀵 참여 3건 — 딜 카드 가로 스크롤
 * 한 컴포넌트가 `quickDeals` 길이만으로 두 상태를 그린다.
 *
 * 이미지는 반입된 홈 에셋(#60)을 재사용한다. 상품설명 이미지는 전용 마케팅 에셋이 없어
 * 배너 에셋을 임시로 쓴다 — 실제 상품설명 이미지는 콘텐츠/BE 연동 대상이다.
 * 아코디언 본문도 상품/정책 데이터라, 지금은 일반 안내 문구를 placeholder로 둔다.
 */

/** 상품 상세정보/배송정보/교환·환불 아코디언 공통 placeholder. 규격 확정 시 서버 값으로 대체. */
const SHARED_INFO_SECTIONS = [
  {
    id: 'detail',
    title: '상품 상세정보',
    body: '상품 상세정보는 상품·콘텐츠 데이터 연동 후 제공됩니다. 원산지·용량·성분 등 표기 정보가 이 영역에 표시됩니다.',
  },
  {
    id: 'shipping',
    title: '배송정보',
    body: '뭉치가 성사되면 셀러가 일괄 발송합니다. 배송비·예상 도착일 등 상세 배송 정책은 연동 후 안내됩니다.',
  },
  {
    id: 'return',
    title: '교환/환불/반품 정보',
    body: '교환·환불·반품 정책은 관련 법령과 셀러 정책에 따릅니다. 상세 조건은 연동 후 안내됩니다.',
  },
] as const;

function hoursFromNow(hours: number): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

/** 시나리오 1 — 퀵 참여 0건. 홈 card-list-1 '락토핏 골드'(demand-1)에 대응. */
const goldDetail: ProductDetail = {
  id: 'demand-1',
  name: '[종근당건강] 락토핏 생유산균 골드',
  brandName: '종근당건강',
  spec: '프로바이오틱스 80포 160g',
  thumbnailUrl: '/images/main-home/card-list-1/1-1.png',
  descriptionImageUrl: '/images/main-home/banner-carousel/banner-10.png',
  viewingCount: 504,
  similarThumbnails: [
    '/images/main-home/card-list-1/1-2.png',
    '/images/main-home/card-list-1/1-4.png',
  ],
  quickDeals: [],
  infoSections: SHARED_INFO_SECTIONS,
};

/** 시나리오 2 — 퀵 참여 3건. 홈 card-list-1 '락토핏 코어'(demand-3)에 대응. */
const coreMaxDetail: ProductDetail = {
  id: 'demand-3',
  name: '[종근당건강] 락토핏 생유산균 코어맥스',
  brandName: '종근당건강',
  spec: '프로바이오틱스 80포 160g',
  thumbnailUrl: '/images/main-home/card-list-1/1-3.png',
  descriptionImageUrl: '/images/main-home/banner-carousel/banner-10.png',
  viewingCount: 231,
  similarThumbnails: [
    '/images/main-home/card-list-1/1-1.png',
    '/images/main-home/card-list-1/1-2.png',
  ],
  quickDeals: [
    {
      id: 'deal-1',
      deadline: hoursFromNow(0.15),
      participantCount: 1200,
      desiredPriceLabel: '1만원 이하',
      sellerCount: 3,
    },
    {
      id: 'deal-2',
      dday: 1,
      participantCount: 150,
      desiredPriceLabel: '2만원 이하',
      sellerCount: 2,
    },
    {
      id: 'deal-3',
      dday: 2,
      participantCount: 150,
      desiredPriceLabel: '3만원 이하',
      sellerCount: 1,
    },
  ],
  infoSections: SHARED_INFO_SECTIONS,
};

const PRODUCT_DETAILS: Readonly<Record<string, ProductDetail>> = {
  [goldDetail.id]: goldDetail,
  [coreMaxDetail.id]: coreMaxDetail,
};

/**
 * 상품 상세 조회. 홈/검색 카드가 넘기는 id로 찾고, 목에 없는 id(다른 카드에서 진입)는
 * 시나리오 2(퀵 참여 있는 상세)를 기본값으로 돌려 화면이 항상 채워지게 한다.
 */
export async function mockGetProductDetail(productId: string): Promise<ProductDetail> {
  const found = PRODUCT_DETAILS[productId];
  if (found !== undefined) {
    return found;
  }
  return { ...coreMaxDetail, id: productId };
}

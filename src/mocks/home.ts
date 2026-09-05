import type { HomeBanner, HomeProductCard } from '@/types/home';

/**
 * 홈피드 목 데이터. API가 없어 화면 검수용으로만 쓴다.
 *
 * 백엔드 도메인 A에 홈 섹션용 엔드포인트가 없다. `GET /api/product-catalog`은 "상위 9개"를
 * `{ id, name, thumbnailUrl }`로만 주기 때문에 시안의 어떤 섹션도 채울 수 없다(문의 발송함).
 *
 * 문구는 전부 시안 `981:19122`(배너 프로토타입 11장)에서 읽은 그대로다.
 * 이미지 경로는 반입 이슈(#60)가 정한 이름을 그대로 쓴다.
 */
const mockBanners: readonly HomeBanner[] = [
  {
    id: 'banner-1',
    imageUrl: '/images/main-home/banner-carousel/banner-1.png',
    title: '라라스윗 아이스크림 공구',
    description: '저당 아이스크림의 권위자! 공구떴다.',
  },
  {
    id: 'banner-2',
    imageUrl: '/images/main-home/banner-carousel/banner-2.png',
    title: '메디큐브 공구 특가',
    description: '메디큐브 뷰티디바이스 공구 특가! 오늘만 있는기회',
  },
  {
    id: 'banner-3',
    imageUrl: '/images/main-home/banner-carousel/banner-3.png',
    title: '다이어트 빵 공구 기획전',
    description: '다이어트 때 빵 땡긴다면?',
  },
  // 시안 4번(신라면 블랙)은 문구가 이미지에 인쇄돼 있어 오버레이가 없다.
  { id: 'banner-4', imageUrl: '/images/main-home/banner-carousel/banner-4.png' },
  {
    id: 'banner-5',
    imageUrl: '/images/main-home/banner-carousel/banner-5.png',
    title: '락토핏 골드 특가',
    description: '60개입을 만원대에 GET',
  },
  // 시안 6번(비비고)도 문구가 이미지에 인쇄돼 있다.
  { id: 'banner-6', imageUrl: '/images/main-home/banner-carousel/banner-6.png' },
  {
    id: 'banner-7',
    imageUrl: '/images/main-home/banner-carousel/banner-7.png',
    title: '저당 아이스크림 기획전',
    description: '파인트 3개를 만원대로?',
  },
  {
    id: 'banner-8',
    imageUrl: '/images/main-home/banner-carousel/banner-8.png',
    title: '지금 현재 인기 과자 조리퐁',
    description: '크라운제과 기획전 공구를 만나보세요!',
  },
  {
    id: 'banner-9',
    imageUrl: '/images/main-home/banner-carousel/banner-9.png',
    title: '콘칩 공구 기획전',
    description: '24개입 1박스가 5천원대 이하?!',
  },
  {
    id: 'banner-10',
    imageUrl: '/images/main-home/banner-carousel/banner-10.png',
    title: '락토핏 기획전',
    description: '유산균으로 건강관리 해보세요!',
  },
  {
    id: 'banner-11',
    imageUrl: '/images/main-home/banner-carousel/banner-11.png',
    title: '저당 과자 기획전',
    description: '다이어트에도 가볍게!',
  },
];

export async function mockGetHomeBanners(): Promise<readonly HomeBanner[]> {
  return mockBanners;
}

/**
 * card-list-1(유산균에서 현재 수요가 있어요!) 목록. 시안 `981:18263`의 값 그대로다.
 *
 * ⚠️ 시안 3번 카드만 희망가격대가 `3만원이하`로 띄어쓰기가 빠져 있다. 같은 목록 안 표기
 * 불일치라 실수로 보고 `3만원 이하`로 통일했다. 문구가 아니라 표기 규칙이라 판단.
 *
 * `deadline`은 화면 확인용으로 현재 시각 기준 상대값을 만든다. 정적 렌더라 빌드 시각이
 * 기준이 되므로, 실제 마감 시각은 API 연동 때 서버 값으로 바뀐다.
 */
function hoursFromNow(hours: number): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

const mockDemandProducts: readonly HomeProductCard[] = [
  {
    id: 'demand-1',
    name: '락토핏 생유산균 골드',
    thumbnailUrl: '/images/main-home/card-list-1/1-1.png',
    participantCount: 1200,
    sellerCount: 3,
    desiredPriceLabel: '3만원 이하',
    dday: 1,
  },
  {
    id: 'demand-2',
    name: '락토핏 다이어트',
    thumbnailUrl: '/images/main-home/card-list-1/1-2.png',
    participantCount: 800,
    sellerCount: 2,
    desiredPriceLabel: '2만원 이하',
    dday: 2,
  },
  {
    id: 'demand-3',
    name: '락토핏 코어',
    thumbnailUrl: '/images/main-home/card-list-1/1-3.png',
    participantCount: 680,
    sellerCount: 4,
    desiredPriceLabel: '3만원 이하',
    deadline: hoursFromNow(3),
  },
  {
    id: 'demand-4',
    name: '락토핏 당케어 데일리',
    thumbnailUrl: '/images/main-home/card-list-1/1-4.png',
    participantCount: 180,
    sellerCount: 1,
    desiredPriceLabel: '3만원 이하',
    deadline: hoursFromNow(1),
  },
  {
    id: 'demand-5',
    name: '락토핏 뷰티',
    thumbnailUrl: '/images/main-home/card-list-1/1-5.png',
    participantCount: 220,
    sellerCount: 5,
    desiredPriceLabel: '1만원 이하',
    dday: 1,
  },
];

export async function mockGetDemandProducts(): Promise<readonly HomeProductCard[]> {
  return mockDemandProducts;
}

/** card-list-2(성사 직전 공구). 시안 `981:18273`. */
const mockClosingProducts: readonly HomeProductCard[] = [
  {
    id: 'closing-1',
    name: '지리산 감자 2kg',
    thumbnailUrl: '/images/main-home/card-list-2/2-1.png',
    participantCount: 1800,
    sellerCount: 5,
    desiredPriceLabel: '1만원 이하',
    deadline: hoursFromNow(12),
  },
  {
    id: 'closing-2',
    name: '군산 양배추 5kg',
    thumbnailUrl: '/images/main-home/card-list-2/2-2.png',
    participantCount: 1530,
    sellerCount: 2,
    desiredPriceLabel: '3만원 이하',
    dday: 2,
  },
  {
    id: 'closing-3',
    name: '제주 애월 당근 3kg',
    thumbnailUrl: '/images/main-home/card-list-2/2-3.png',
    participantCount: 1420,
    sellerCount: 3,
    desiredPriceLabel: '3만원 이하',
    dday: 2,
  },
  {
    id: 'closing-4',
    name: '홍천 급냉 찐 옥수수 1kg',
    thumbnailUrl: '/images/main-home/card-list-2/2-4.png',
    participantCount: 1240,
    sellerCount: 1,
    desiredPriceLabel: '1만원 이하',
    dday: 1,
  },
  {
    id: 'closing-5',
    name: '해남 고구마 5kg',
    thumbnailUrl: '/images/main-home/card-list-2/2-5.png',
    participantCount: 1320,
    sellerCount: 6,
    desiredPriceLabel: '5만원 이하',
    dday: 1,
  },
];

/** card-list-6(참여가능 마감 직전 공구). 시안 `981:18307`. 전부 카운트다운이다. */
const mockDeadlineProducts: readonly HomeProductCard[] = [
  {
    id: 'deadline-1',
    name: '국내산 생 들기름 250ml',
    thumbnailUrl: '/images/main-home/card-list-6/6-1.png',
    participantCount: 780,
    sellerCount: 1,
    desiredPriceLabel: '2만원 이하',
    deadline: hoursFromNow(11),
  },
  {
    id: 'deadline-2',
    name: '카누 미니 30입 5개',
    thumbnailUrl: '/images/main-home/card-list-6/6-2.png',
    participantCount: 126,
    sellerCount: 2,
    desiredPriceLabel: '1만원 이하',
    deadline: hoursFromNow(10),
  },
  {
    id: 'deadline-3',
    name: '청수당 말차라떼 18g*35입',
    thumbnailUrl: '/images/main-home/card-list-6/6-3.png',
    participantCount: 1420,
    sellerCount: 1,
    desiredPriceLabel: '3만원 이하',
    deadline: hoursFromNow(9),
  },
  {
    id: 'deadline-4',
    name: '화이트하임 5박스',
    thumbnailUrl: '/images/main-home/card-list-6/6-4.png',
    participantCount: 1240,
    sellerCount: 3,
    desiredPriceLabel: '3만원 이하',
    deadline: hoursFromNow(7),
  },
  {
    id: 'deadline-5',
    name: '쿠크다스 4박스',
    thumbnailUrl: '/images/main-home/card-list-6/6-5.png',
    participantCount: 1320,
    sellerCount: 2,
    desiredPriceLabel: '1만원 이하',
    deadline: hoursFromNow(3),
  },
];

export async function mockGetClosingProducts(): Promise<readonly HomeProductCard[]> {
  return mockClosingProducts;
}

export async function mockGetDeadlineProducts(): Promise<readonly HomeProductCard[]> {
  return mockDeadlineProducts;
}

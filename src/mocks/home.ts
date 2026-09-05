import type { HomeBanner } from '@/types/home';

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

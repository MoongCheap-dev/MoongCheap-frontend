import type { ParticipationItem } from '@/types/participation';

/**
 * 내 뭉치 참여 목록(B-17) 목 데이터.
 *
 * `mocks/payment.ts`와 같은 규칙이다. 실제 연동 시 이 함수의 **본문만** 목록 조회로 교체하고
 * 반환 타입은 그대로 둔다. 값은 시안(B-17)의 예시를 옮겼다. 배열을 그대로 반환하는 것은 확정된
 * 응답 관례(도메인 A 실측: 목록은 래핑 없이 배열)와 일치한다.
 *
 * **빈 상태 확인**: 아래 배열을 비우면 콜드스타트("아직 참여한 수요가 없어요")를 볼 수 있다.
 * 특정 탭의 빈 문구는 그 상태 항목만 빼면 재현된다(예: ALLOCATED 항목 제거 후 배정완료 탭).
 */
const mockParticipations: ParticipationItem[] = [
  {
    id: 'dp-1',
    productName: '락토핏 생유산균 골드',
    category: '종근당건강',
    quantity: 1,
    priceLabel: '3만원 이하',
    participantCount: 1200,
    dday: 0,
    requestedAt: '2026.08.10',
    status: 'ACTION_REQUIRED',
  },
  {
    id: 'dp-2',
    productName: '저당요거트바',
    category: '라라스윗',
    quantity: 24,
    priceLabel: '2만원 이하',
    participantCount: 1200,
    dday: 2,
    requestedAt: '2026.08.10',
    status: 'ALLOCATED',
  },
  {
    id: 'dp-3',
    productName: '박카스 병으로 8입 골드',
    category: '동아제약',
    quantity: 2,
    priceLabel: '2만원 이하',
    participantCount: 860,
    dday: 3,
    requestedAt: '2026.08.10',
    status: 'GATHERING',
  },
  {
    id: 'dp-4',
    productName: '컨디션 스틱 이지샷',
    category: 'HK이노엔',
    quantity: 3,
    priceLabel: '3만원 이하',
    participantCount: 540,
    dday: 5,
    requestedAt: '2026.08.08',
    status: 'GATHERING',
  },
  {
    id: 'dp-5',
    productName: '레드불 에너지 드링크',
    category: '레드불',
    quantity: 2,
    priceLabel: '5만원 이하',
    participantCount: 1000,
    dday: 0,
    requestedAt: '2026.08.08',
    status: 'DONE',
  },
];

export async function mockGetParticipations(): Promise<ParticipationItem[]> {
  return mockParticipations;
}

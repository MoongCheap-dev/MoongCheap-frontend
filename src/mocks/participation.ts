import type { ParticipationItem } from '@/types/participation';

/**
 * 내 수요 참여 목록(B-17) 목 데이터.
 *
 * `mocks/payment.ts`와 같은 규칙이다. 실제 연동 시 이 함수의 **본문만** 목록 조회로 교체하고
 * 반환 타입은 그대로 둔다. 값은 시안(B-17)의 예시를 옮겼다.
 *
 * **빈 상태 확인**: 아래 배열을 비우면 콜드스타트("아직 참여한 수요가 없어요")를 볼 수 있다.
 * 특정 탭의 "해당하는 내역이 없어요"는 그 상태의 항목만 빼면 재현된다(예: WON 항목 제거 후 성사됨 탭).
 */
const mockParticipations: ParticipationItem[] = [
  {
    id: 'dp-1',
    productName: '박카스 병으로 8입 골드',
    optionLabel: '120ml x 8병',
    quantity: 2,
    priceLabel: '2만원 이하',
    requestedAt: '2026.09.12',
    status: 'GATHERING',
  },
  {
    id: 'dp-2',
    productName: '락토핏 생유산균 골드',
    optionLabel: '2g x 50포',
    quantity: 1,
    priceLabel: '3만원 이하',
    requestedAt: '2026.09.12',
    status: 'ACTION_REQUIRED',
  },
  {
    id: 'dp-3',
    productName: '컨디션 스틱 이지샷',
    optionLabel: '20g x 6포',
    quantity: 3,
    priceLabel: '3만원 이하',
    requestedAt: '2026.09.12',
    status: 'ALLOCATED',
  },
  {
    id: 'dp-4',
    productName: '핫식스 더 킹 캔',
    optionLabel: '355ml x 24캔',
    quantity: 1,
    priceLabel: '3만원 이하',
    requestedAt: '2026.08.15',
    status: 'GATHERING',
  },
  {
    id: 'dp-5',
    productName: '레드불 에너지 드링크',
    optionLabel: '250ml x 20캔',
    quantity: 2,
    priceLabel: '5만원 이하',
    requestedAt: '2026.08.15',
    status: 'DONE',
  },
];

export async function mockGetParticipations(): Promise<ParticipationItem[]> {
  return mockParticipations;
}

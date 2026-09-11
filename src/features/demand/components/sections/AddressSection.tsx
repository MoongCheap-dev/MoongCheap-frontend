import { DEMAND_FORM_SECTIONS } from '@/constants/demandFormMessages';
import { DemandFormSection } from '@/features/demand/components/DemandFormSection';

// B-09 배송지 등록 섹션. 시안 `1153:71247`(없음) · `1153:71361`(기본 배송지 있음).
//
// 담을 것: 배송지가 없으면 `신규 배송지 추가` 행, 있으면 배송지 카드 + 수정 · 삭제.
// `useAddresses`로 목록을 불러오고 조회 중에는 자리를 잡아 둔다.
//
// TODO: 박시열 담당. 지금은 자리만 잡아 둔다.

interface AddressSectionProps {
  addressId: string | null;
  onAddressChange: (addressId: string | null) => void;
}

export function AddressSection({ addressId }: AddressSectionProps) {
  return (
    <DemandFormSection
      title={DEMAND_FORM_SECTIONS.address.title}
      titleId={DEMAND_FORM_SECTIONS.address.id}
    >
      <p className="text-body-14 text-content-tertiary">배송지 {addressId ?? '미선택'}</p>
    </DemandFormSection>
  );
}

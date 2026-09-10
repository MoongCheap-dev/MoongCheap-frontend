import type { PriceBandKey } from '@/constants/businessRules';
import { DEMAND_FORM_SECTIONS } from '@/constants/demandFormMessages';
import { DemandFormSection } from '@/features/demand/components/DemandFormSection';

// B-09 희망가격 섹션. 시안 `1153:71254`.
//
// TODO: 안혜진 담당. 선택지는 `PRICE_BANDS`(FN-B09-01)가 단일 출처라 여기서 새로 만들지 않는다.
// 시장가보다 높게 고른 경우의 토스트는 별도 시안(`1153:71594`)에 있다.

interface PriceBandSectionProps {
  priceBand: PriceBandKey | null;
  onPriceBandChange: (priceBand: PriceBandKey) => void;
}

export function PriceBandSection({ priceBand }: PriceBandSectionProps) {
  return (
    <DemandFormSection
      title={DEMAND_FORM_SECTIONS.price.title}
      titleId={DEMAND_FORM_SECTIONS.price.id}
    >
      <p className="text-body-14 text-content-tertiary">희망가격 {priceBand ?? '미선택'}</p>
    </DemandFormSection>
  );
}

import type { PriceBandKey } from '@/constants/businessRules';
import { DEMAND_FORM_SECTIONS } from '@/constants/demandFormMessages';
import { DemandFormSection } from '@/features/demand/components/DemandFormSection';

// B-09 희망가격 섹션. 시안 `1153:71254`.
//
// 담을 것: `PRICE_BANDS` 7종 라디오. 시장가보다 높게 고르면 토스트가 뜬다(`1153:71594`).
//
// TODO: 안혜진 담당. 지금은 자리만 잡아 둔다.

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

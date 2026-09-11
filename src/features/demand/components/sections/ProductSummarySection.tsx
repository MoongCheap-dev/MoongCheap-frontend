import { DEMAND_FORM_MESSAGES, DEMAND_FORM_SECTIONS } from '@/constants/demandFormMessages';
import { DemandFormSection } from '@/features/demand/components/DemandFormSection';

// B-09 제품 상세 섹션. 시안 `1153:71242`.
//
// TODO: 안혜진 담당. 수량 범위는 `ORDER_QUANTITY_MIN`~`MAX`(FN-B09-01)를 따른다.

interface ProductSummarySectionProps {
  productId: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function ProductSummarySection({ productId, quantity }: ProductSummarySectionProps) {
  return (
    <DemandFormSection
      note={DEMAND_FORM_MESSAGES.auctionWaitNote}
      title={DEMAND_FORM_SECTIONS.product.title}
      titleId={DEMAND_FORM_SECTIONS.product.id}
    >
      <p className="text-body-14 text-content-tertiary">
        상품 {productId} · 수량 {quantity}
      </p>
    </DemandFormSection>
  );
}

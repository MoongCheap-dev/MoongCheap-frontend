import { DEMAND_FORM_MESSAGES, DEMAND_FORM_SECTIONS } from '@/constants/demandFormMessages';
import type {
  DemandEasyPayProviderKey,
  DemandPaymentMethodKey,
} from '@/constants/demandFormMessages';
import { DemandFormSection } from '@/features/demand/components/DemandFormSection';

// B-09 결제수단 섹션. 시안 `1153:71279`.
//
// 담을 것: 토스 프로모션 배너 · 간편결제 라디오 + 사업자 3칸 · 카드/계좌/휴대폰 라디오.
// **동작은 토스페이만 붙인다**(시안 Description). 나머지는 그리되 고를 수 없다.
//
// TODO: 박시열 담당. 지금은 자리만 잡아 둔다.

interface PaymentMethodSectionProps {
  paymentMethod: DemandPaymentMethodKey | null;
  easyPayProvider: DemandEasyPayProviderKey | null;
  onPaymentMethodChange: (method: DemandPaymentMethodKey) => void;
  onEasyPayProviderChange: (provider: DemandEasyPayProviderKey) => void;
}

export function PaymentMethodSection({ paymentMethod }: PaymentMethodSectionProps) {
  return (
    <DemandFormSection
      note={DEMAND_FORM_MESSAGES.autoPaymentNote}
      title={DEMAND_FORM_SECTIONS.payment.title}
      titleId={DEMAND_FORM_SECTIONS.payment.id}
    >
      <p className="text-body-14 text-content-tertiary">결제수단 {paymentMethod ?? '미선택'}</p>
    </DemandFormSection>
  );
}

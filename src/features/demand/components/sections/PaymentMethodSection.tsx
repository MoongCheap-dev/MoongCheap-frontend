'use client';

import { ChevronDown } from 'lucide-react';

import { Radio, RadioGroup } from '@/components/ui/Radio';
import { useToast } from '@/components/ui/Toast';
import {
  DEMAND_EASY_PAY_PROVIDERS,
  DEMAND_FORM_MESSAGES,
  DEMAND_FORM_SECTIONS,
  DEMAND_PAYMENT_METHODS,
} from '@/constants/demandFormMessages';
import type {
  DemandEasyPayProviderKey,
  DemandPaymentMethodKey,
} from '@/constants/demandFormMessages';
import { DemandFormSection } from '@/features/demand/components/DemandFormSection';
import { cn } from '@/lib/cn';

// B-09 결제수단 섹션. 시안 `1153:71279` · `1153:71406`.
//
// **구현 범위가 시안 설명에 못박혀 있다.**
//   "결제수단 중 카드결제/계좌결제/휴대폰결제는 구현하지 않음"
//   "간편결제도 토스페이만 구현"
//   "네이버페이, 카카오페이는 디자인상으로만 존재"
//
// 그래서 넷 다 시안대로 그리되, 구현하지 않는 것을 누르면 선택되지 않고 '준비 중' 토스트가 뜬다.
// `disabled`로 흐리게 만들지 않은 이유는 시안에 흐린 상태가 없어서다. 기능정의서 머리말의
// "미구현 기능 진입점은 노출하되 탭 시 토스트" 규칙과 `ComingSoonButton`이 같은 방침이다.
//
// 실측(픽셀 직접 샘플): 배너 333x46 radius 8 surface-secondary · 사업자 칸 107x52 radius 4 ·
// 칸 사이 4 · 선택된 칸 테두리 #434343, 나머지 #d6d6d6 · 행 간격 16 · 라디오와 칸 사이 8.
//
// ⚠️ 사업자 로고 이미지가 저장소에 없다. 시안은 토스 로고를 벡터로, 네이버·카카오를 이미지로
//    갖고 있는데 어느 쪽도 반입되지 않았다. 지금은 이름을 글자로 적어 둔다. 에셋을 받으면
//    이 자리만 바꾼다.
//
// ⚠️ 시안 컴포넌트 안에 `혜택` 배지가 있지만 실제 프레임에는 그려지지 않는다(픽셀로 확인).
//    보이지 않는 것을 임의로 살리지 않았다.

/** 시안: 사업자 한 칸. 선택 여부로 테두리만 갈린다. */
const PROVIDER_CLASS =
  'text-caption-12 flex h-13 flex-1 items-center justify-center rounded-4 border';

interface PaymentMethodSectionProps {
  paymentMethod: DemandPaymentMethodKey | null;
  easyPayProvider: DemandEasyPayProviderKey | null;
  onPaymentMethodChange: (method: DemandPaymentMethodKey) => void;
  onEasyPayProviderChange: (provider: DemandEasyPayProviderKey) => void;
}

export function PaymentMethodSection({
  paymentMethod,
  easyPayProvider,
  onPaymentMethodChange,
  onEasyPayProviderChange,
}: PaymentMethodSectionProps) {
  const { showComingSoon } = useToast();

  return (
    <DemandFormSection
      note={DEMAND_FORM_MESSAGES.autoPaymentNote}
      title={DEMAND_FORM_SECTIONS.payment.title}
      titleId={DEMAND_FORM_SECTIONS.payment.id}
    >
      <div className="flex w-full flex-col gap-4">
        {/* 토스 프로모션 배너. 문구가 시안에 박혀 있지만 토스 연동 시 서버가 내려줄 수 있다. */}
        <div className="bg-surface-secondary rounded-8 flex h-11.5 w-full items-center justify-between gap-2 px-4">
          <p className="text-caption-12 text-content-primary min-w-0 truncate">
            {DEMAND_FORM_MESSAGES.tossPromotion}
          </p>
          <ChevronDown className="text-content-quarternary size-4 shrink-0" />
        </div>

        <RadioGroup
          className="gap-4"
          labelledBy={DEMAND_FORM_SECTIONS.payment.id}
          name="demand-payment-method"
        >
          {DEMAND_PAYMENT_METHODS.map((method) => (
            <div className="flex w-full flex-col gap-2" key={method.key}>
              <Radio
                checked={paymentMethod === method.key}
                label={method.label}
                name="demand-payment-method"
                onChange={() => {
                  if (!method.implemented) {
                    showComingSoon();
                    return;
                  }
                  onPaymentMethodChange(method.key);
                }}
                value={method.key}
              />

              {/* 간편결제 아래에만 사업자 3칸이 붙는다. */}
              {method.key === 'easy' && (
                <div className="flex w-full items-center gap-1">
                  {DEMAND_EASY_PAY_PROVIDERS.map((provider) => (
                    <button
                      className={cn(
                        PROVIDER_CLASS,
                        easyPayProvider === provider.key
                          ? 'border-border-secondary text-content-primary'
                          : 'border-border-quarternary text-content-quarternary',
                      )}
                      key={provider.key}
                      onClick={() => {
                        if (!provider.implemented) {
                          showComingSoon();
                          return;
                        }
                        onEasyPayProviderChange(provider.key);
                      }}
                      type="button"
                    >
                      {provider.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
      </div>
    </DemandFormSection>
  );
}

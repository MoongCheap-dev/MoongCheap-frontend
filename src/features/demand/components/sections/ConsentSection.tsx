import type { DemandConsentKey } from '@/constants/demandFormMessages';

// B-09 약관 동의 섹션. 시안 `1153:71336`(기본) · `1153:71463`(기본 배송지 있음).
//
// 다른 섹션과 달리 제목도 카드도 없다. 전체동의 체크박스 하나와 필수 3줄이 전부다.
//
// 담을 것: `주문 내용 확인 및 결제동의` 체크박스가 아래 3개를 한 번에 켜고 끈다. 3개가 모두
// 켜지면 전체동의도 켜진다.
//
// TODO: 박시열 담당. 지금은 자리만 잡아 둔다.

interface ConsentSectionProps {
  consents: Record<DemandConsentKey, boolean>;
  onConsentsChange: (consents: Record<DemandConsentKey, boolean>) => void;
}

export function ConsentSection({ consents }: ConsentSectionProps) {
  return (
    <section className="flex w-full flex-col gap-2 px-4">
      <p className="text-body-14 text-content-tertiary">
        약관 동의 {Object.values(consents).filter(Boolean).length} / {Object.keys(consents).length}
      </p>
    </section>
  );
}

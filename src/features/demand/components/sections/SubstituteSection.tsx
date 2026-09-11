import { DEMAND_FORM_SECTIONS } from '@/constants/demandFormMessages';
import { DemandFormSection } from '@/features/demand/components/DemandFormSection';

// B-09 대체 상품 동의 섹션. 시안 `1153:71324`(기본) · `1153:71479`(툴팁) · `1153:71709`(동의).
//
// TODO: 안혜진 담당. 값은 위(`DemandFormView`)가 들고 있어서 이 파일만 채우면 된다.
// 자연어 조건은 `SUBSTITUTE_NOTE_MAX_LENGTH`(FN-B09-03)를 넘지 못한다.

interface SubstituteSectionProps {
  agreed: boolean | null;
  note: string;
  onAgreedChange: (agreed: boolean) => void;
  onNoteChange: (note: string) => void;
}

export function SubstituteSection({ agreed }: SubstituteSectionProps) {
  return (
    <DemandFormSection
      title={DEMAND_FORM_SECTIONS.substitute.title}
      titleId={DEMAND_FORM_SECTIONS.substitute.id}
    >
      <p className="text-body-14 text-content-tertiary">
        대체 상품 동의 {agreed === null ? '미선택' : agreed ? '동의' : '동의 안함'}
      </p>
    </DemandFormSection>
  );
}

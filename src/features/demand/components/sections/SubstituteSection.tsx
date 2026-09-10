import { DEMAND_FORM_SECTIONS } from '@/constants/demandFormMessages';
import { DemandFormSection } from '@/features/demand/components/DemandFormSection';

// B-09 대체 상품 동의 섹션. 시안 `1153:71324`(기본) · `1153:71479`(툴팁) · `1153:71709`(동의).
//
// 담을 것: 제목 옆 물음표 → 말풍선, 동의 / 동의 안함 라디오, `동의`를 고르면 펼쳐지는 입력칸
// (최대 `SUBSTITUTE_NOTE_MAX_LENGTH`자).
//
// TODO: 안혜진 담당. 지금은 자리만 잡아 둔다.

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

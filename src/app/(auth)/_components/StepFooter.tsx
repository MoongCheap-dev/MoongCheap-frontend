import { cn } from '@/lib/cn';

// 회원가입 온보딩 스텝(모드선택·개인정보동의·휴대폰인증)이 공유하는 하단 이전/다음 버튼 행.
// 버튼 변형은 MoongCheap_DS Button 기준: 이전=quarternary(아웃라인), 다음=tertiary(검정),
// 비활성=disabled-primary. 검정 버튼 글씨는 content-inverse(라이트=흰색/다크=검정)라 다크모드에서도
// 대비가 유지된다(content-oncolor는 항상 흰색이라 다크의 밝은 tertiary 배경에서 안 보임).
//
// SignupWizard의 입력 스텝은 키보드 오버레이 대응(footerRef transform)이 얽혀 있어 자체 푸터를
// 유지하고, 이 컴포넌트는 그 외 스텝이 공유한다.

interface StepFooterProps {
  onPrev: () => void;
  /** 오른쪽 주 버튼 라벨(예: "다음"). */
  nextLabel: string;
  onNext: () => void;
  /** false면 주 버튼을 비활성화한다. */
  canProceed: boolean;
}

export function StepFooter({ onPrev, nextLabel, onNext, canProceed }: StepFooterProps) {
  return (
    <div className="mt-auto flex gap-3 pt-8">
      <button
        type="button"
        onClick={onPrev}
        className="border-border-button-quarternary bg-surface-button-quarternary-default hover:bg-surface-button-quarternary-hover active:bg-surface-button-quarternary-pressed text-content-primary focus-visible:ring-effect-focus-ring-primary rounded-8 h-13 flex-1 border font-medium outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        이전
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className={cn(
          'focus-visible:ring-effect-focus-ring-primary rounded-8 h-13 flex-1 font-medium outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          canProceed
            ? 'bg-surface-button-tertiary-default hover:bg-surface-button-tertiary-hover active:bg-surface-button-tertiary-pressed text-content-inverse'
            : 'bg-surface-disabled-primary text-content-disabled-primary cursor-not-allowed',
        )}
      >
        {nextLabel}
      </button>
    </div>
  );
}

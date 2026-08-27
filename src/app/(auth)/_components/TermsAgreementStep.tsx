'use client';

import { cn } from '@/lib/cn';

// 회원가입 온보딩 개인정보 동의 스텝. Figma 08.27 "1-0 개인정보 동의" 시안.
// 문구는 시안 그대로 옮긴다. 시안엔 필수 3항목만 있고 선택 항목은 없다.
// "모두동의"를 켜면 필수 전체가 켜지고, 필수 전체가 켜져야 하단 "다음"이 활성화된다(기본 미체크 → 다음 비활성).
//
// [필수] 이용약관·개인정보 수집 항목의 "›"는 약관 상세로 가는 표식이지만, 상세 화면 경로가
// 아직 없어 자리만 둔다(로그인 화면의 아이디/비밀번호 찾기와 같은 방침). 경로 확정 시 연결한다.
//
// 체크박스/셰브런은 공통 UI 프리미티브 규약 확정 전이라 네이티브 요소로 자체 완결한다(CLAUDE.md).

/** 필수 동의 항목의 체크 상태. 모두 true여야 다음으로 진행할 수 있다. */
export interface TermsAgreements {
  /** [필수] 만 14세 이상 */
  age14: boolean;
  /** [필수] 이용약관 */
  tos: boolean;
  /** [필수] 개인정보 수집 및 이용 */
  privacy: boolean;
}

/** 초기(미체크) 상태. 위저드가 스텝 간 상태로 보관한다. */
export const EMPTY_AGREEMENTS: TermsAgreements = { age14: false, tos: false, privacy: false };

/** 필수 3항목 모두 동의했는지. 다음 진행 게이팅에 쓴다. */
export function isAllAgreed(value: TermsAgreements): boolean {
  return value.age14 && value.tos && value.privacy;
}

interface TermItem {
  key: keyof TermsAgreements;
  label: string;
  /** 약관 상세(›)가 있는 항목인지. */
  hasDetail: boolean;
}

const TERM_ITEMS: TermItem[] = [
  { key: 'age14', label: '[필수] 만 14세 이상입니다.', hasDetail: false },
  { key: 'tos', label: '[필수] 이용약관', hasDetail: true },
  { key: 'privacy', label: '[필수] 개인정보 수집 및 이용', hasDetail: true },
];

function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={cn('size-5 shrink-0', checked ? 'text-content-brand' : 'text-content-quinary')}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5 8 14.5 16 6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="text-content-quarternary size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.5 4.5 13 10l-5.5 5.5" />
    </svg>
  );
}

interface TermsAgreementStepProps {
  value: TermsAgreements;
  onChange: (next: TermsAgreements) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function TermsAgreementStep({ value, onChange, onPrev, onNext }: TermsAgreementStepProps) {
  const allAgreed = isAllAgreed(value);

  // 모두동의: 현재 전체 동의면 전부 해제, 아니면 전부 동의.
  const toggleAll = () => {
    const next = !allAgreed;
    onChange({ age14: next, tos: next, privacy: next });
  };

  const toggleOne = (key: keyof TermsAgreements) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">개인정보 동의</h1>
          <p className="text-content-quarternary text-sm">
            뭉치를 사용하시려면 개인정보 동의가 필요해요!
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* 모두동의: 시안에서 별도 박스로 강조된다. */}
          <button
            type="button"
            role="checkbox"
            aria-checked={allAgreed}
            onClick={toggleAll}
            className="border-border-subtle focus-visible:ring-effect-focus-ring-primary rounded-12 flex items-center gap-3 border p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <CheckIcon checked={allAgreed} />
            <span className="font-medium">모두동의</span>
          </button>

          {/* 필수 항목. 상세(›)가 있는 항목은 오른쪽에 셰브런을 둔다. */}
          <div className="flex flex-col gap-4 px-1">
            {TERM_ITEMS.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={value[item.key]}
                  onClick={() => toggleOne(item.key)}
                  className="focus-visible:ring-effect-focus-ring-primary flex flex-1 items-center gap-3 rounded-md text-left outline-none focus-visible:ring-2"
                >
                  <CheckIcon checked={value[item.key]} />
                  <span className="text-sm">{item.label}</span>
                </button>
                {item.hasDetail && (
                  // TODO: 약관 상세 화면 경로 확정 후 Link로 연결한다.
                  <button
                    type="button"
                    aria-label={`${item.label} 자세히 보기`}
                    className="shrink-0"
                  >
                    <ChevronIcon />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 행. 스타일은 SignupWizard의 이전/다음과 동일하게 맞춘다(프리미티브 미확정). */}
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
          disabled={!allAgreed}
          className={cn(
            'focus-visible:ring-effect-focus-ring-primary rounded-8 h-13 flex-1 font-medium outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            allAgreed
              ? 'bg-surface-button-tertiary-default hover:bg-surface-button-tertiary-hover active:bg-surface-button-tertiary-pressed text-content-oncolor'
              : 'bg-surface-disabled-primary text-content-disabled-primary cursor-not-allowed',
          )}
        >
          다음
        </button>
      </div>
    </div>
  );
}

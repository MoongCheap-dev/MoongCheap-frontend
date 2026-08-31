'use client';

import { cn } from '@/lib/cn';

import { ScreenColumn } from './ScreenColumn';
import { StepFooter } from './StepFooter';

// 회원가입 온보딩 개인정보 동의 스텝. Figma 08.27 "1-0 개인정보 동의" 시안.
// 문구는 시안 그대로 옮긴다. 시안엔 필수 3항목만 있고 선택 항목은 없다.
// "전체동의"를 켜면 필수 전체가 켜지고, 필수 전체가 켜져야 하단 "다음"이 활성화된다(기본 미체크 → 다음 비활성).
//
// 동의는 네이티브 체크박스(<input type="checkbox">)로 구현한다 — 스페이스 토글 등 키보드 동작을
// 브라우저가 준다(CLAUDE.md: 입력은 네이티브 요소). 체크 표식은 시안대로 커스텀 아이콘으로 그리고
// 네이티브 input은 sr-only로 숨긴다.
//
// [필수] 이용약관·개인정보 수집 항목의 "›"는 약관 상세로 가는 표식이지만, 상세 화면 경로가 아직 없다.
// 눌러도 동작 없는 죽은 컨트롤을 만들지 않도록, 경로가 생기기 전까지는 비인터랙티브 표식(aria-hidden)으로
// 자리만 둔다. 경로 확정 시 Link로 교체한다.

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
  /** 필수 동의 항목인지. true면 라벨 앞에 빨강 [필수] 표식을 붙인다. */
  required: boolean;
  /** 약관 상세(›)가 있는 항목인지. */
  hasDetail: boolean;
}

// [필수] 접두어는 라벨 문자열에서 분리해 렌더 시 빨강(content-error)으로 강조한다(필수 항목 시각 표시).
const TERM_ITEMS: TermItem[] = [
  { key: 'age14', label: '만 14세 이상입니다.', required: true, hasDetail: false },
  { key: 'tos', label: '이용약관', required: true, hasDetail: true },
  { key: 'privacy', label: '개인정보 수집 및 이용', required: true, hasDetail: true },
];

// 내부 sr-only input이 :focus-visible일 때 카드/행에 포커스 링을 준다.
const FOCUS_RING_CLASS =
  'has-[:focus-visible]:ring-effect-focus-ring-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2';

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
      className="text-content-quarternary size-5 shrink-0"
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

  // 전체동의: 현재 전체 동의면 전부 해제, 아니면 전부 동의.
  const toggleAll = () => {
    const next = !allAgreed;
    onChange({ age14: next, tos: next, privacy: next });
  };

  const toggleOne = (key: keyof TermsAgreements) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <ScreenColumn>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">개인정보 동의</h1>
          <p className="text-content-quarternary text-sm">
            뭉치를 사용하시려면 개인정보 동의가 필요해요!
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* 전체동의: 시안에서 별도 박스로 강조된다. */}
          <label
            className={cn(
              'border-border-subtle rounded-12 flex cursor-pointer items-center gap-3 border p-4',
              FOCUS_RING_CLASS,
            )}
          >
            <input type="checkbox" checked={allAgreed} onChange={toggleAll} className="sr-only" />
            <CheckIcon checked={allAgreed} />
            <span className="font-medium">전체동의</span>
          </label>

          {/* 필수 항목. 상세(›)가 있는 항목은 오른쪽에 (비인터랙티브) 셰브런을 둔다. */}
          <div className="flex flex-col gap-4 px-1">
            {TERM_ITEMS.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <label
                  className={cn(
                    'rounded-8 flex flex-1 cursor-pointer items-center gap-3',
                    FOCUS_RING_CLASS,
                  )}
                >
                  <input
                    type="checkbox"
                    checked={value[item.key]}
                    onChange={() => toggleOne(item.key)}
                    className="sr-only"
                  />
                  <CheckIcon checked={value[item.key]} />
                  <span className="text-sm">
                    {item.required && <span className="text-content-error">[필수] </span>}
                    {item.label}
                  </span>
                </label>
                {/* TODO: 약관 상세 경로 확정 후 <Link>로 교체(그전까지 비인터랙티브 표식). */}
                {item.hasDetail && (
                  <span aria-hidden="true">
                    <ChevronIcon />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <StepFooter onPrev={onPrev} nextLabel="다음" onNext={onNext} canProceed={allAgreed} />
    </ScreenColumn>
  );
}

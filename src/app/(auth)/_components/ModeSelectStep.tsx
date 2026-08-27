'use client';

import { cn } from '@/lib/cn';
import type { SignupMode } from '@/schemas/auth';

// 회원가입 온보딩 첫 스텝: 사용 모드(구매자/판매자) 선택. Figma 08.27 "B-01 모드 선택" 시안.
// 문구는 시안 그대로 옮긴다.
//   ※판매자 변형의 부제가 "뭉치를 사용하시려면 개인정보 동의가 필요해요!"로 달라(구매자 변형과 불일치)
//     디자인팀에 확인 중이다. 확인 전까지는 공통 부제로 아래 문구를 쓴다.
//   ※하단 CTA 라벨 "가입하기"도 디자인 확인 중이라 바뀔 수 있다(다음 스텝이 더 있어 "다음"이 자연스러움).
//
// 카드/라디오/배지는 공통 UI 프리미티브 규약이 확정되기 전이라 네이티브 요소로 자체 완결한다
// (로그인·회원가입 화면과 같은 방침 — CLAUDE.md). 규약이 정해지면 프리미티브로 치환한다.
//
// 기본은 "미선택"이며, 미선택이면 하단 가입하기 버튼을 비활성화해 방어한다(시안 default 상태).

interface ModeOption {
  value: SignupMode;
  label: string;
  /** 선택된 카드에만 노출되는 설명. */
  description: string;
}

const MODE_OPTIONS: ModeOption[] = [
  {
    value: 'buyer',
    label: '구매자',
    description: '원하는 상품을 모아, 함께 더 합리적으로 구매해보세요.',
  },
  {
    value: 'seller',
    label: '판매자',
    description: '고객의 수요를 먼저 확인하고, 부담 없이 필요한 만큼 판매해보세요.',
  },
];

interface ModeSelectStepProps {
  /** 선택된 모드. null이면 미선택(기본). */
  value: SignupMode | null;
  onChange: (mode: SignupMode) => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export function ModeSelectStep({ value, onChange, onPrev, onSubmit }: ModeSelectStepProps) {
  const canProceed = value !== null;

  return (
    // AuthLayout의 main(flex-1)을 채우는 화면 컬럼. 제목·카드는 상단, 버튼 행은 mt-auto로 바닥 고정
    // (SignupWizard·CompleteScreen과 같은 패턴).
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">원하는 사용 모드를 선택해 주세요</h1>
          <p className="text-content-quarternary text-sm">
            구매자, 판매자 중 나에게 맞는 모드를 선택해주세요.
          </p>
        </div>

        <div role="radiogroup" aria-label="사용 모드" className="flex flex-col gap-3">
          {MODE_OPTIONS.map((option) => {
            const selected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(option.value)}
                className={cn(
                  'focus-visible:ring-effect-focus-ring-primary rounded-12 flex flex-col gap-2 border p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  // 선택: 코랄 테두리 / 미선택: 회색 테두리
                  selected ? 'border-border-brand' : 'border-border-subtle',
                )}
              >
                <span className="flex items-center gap-2">
                  {/* 라디오 표식. 선택 시 코랄 링 + 코랄 점. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full border',
                      selected ? 'border-border-brand' : 'border-border-subtle',
                    )}
                  >
                    {selected && <span className="bg-surface-brand size-2.5 rounded-full" />}
                  </span>
                  <span className="font-medium">{option.label}</span>
                  {selected && (
                    <span className="bg-surface-brand text-content-oncolor rounded-md px-1.5 py-0.5 text-xs font-medium">
                      현재 모드
                    </span>
                  )}
                </span>
                {/* 설명은 선택된 카드에만 노출(시안). 라디오 폭(size-5 + gap-2 = 28px)만큼 들여쓴다. */}
                {selected && (
                  <span className="text-content-quarternary pl-7 text-sm">
                    {option.description}
                  </span>
                )}
              </button>
            );
          })}
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
          onClick={onSubmit}
          disabled={!canProceed}
          className={cn(
            'focus-visible:ring-effect-focus-ring-primary rounded-8 h-13 flex-1 font-medium outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            canProceed
              ? 'bg-surface-button-tertiary-default hover:bg-surface-button-tertiary-hover active:bg-surface-button-tertiary-pressed text-content-oncolor'
              : 'bg-surface-disabled-primary text-content-disabled-primary cursor-not-allowed',
          )}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}

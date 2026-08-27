'use client';

import { cn } from '@/lib/cn';
import type { SignupMode } from '@/schemas/auth';

import { ScreenColumn } from './ScreenColumn';
import { StepFooter } from './StepFooter';

// 회원가입 온보딩 첫 스텝: 사용 모드(구매자/판매자) 선택. Figma 08.27 "B-01 모드 선택" 시안.
// 문구는 시안 그대로 옮긴다. 부제는 선택된 모드에 따라 달라진다(구매자/판매자 각 변형의 문구, 디자인 확정).
// 하단 CTA는 "다음"(디자인 확정 — 뒤에 개인정보 동의·휴대폰 인증 등 단계가 더 있음).
//
// 단일 선택은 네이티브 라디오(<input type="radio">, 같은 name)로 구현한다 — 방향키 이동·roving
// tabindex 등 라디오 그룹 키보드 동작을 브라우저가 공짜로 준다(CLAUDE.md: 입력은 네이티브 요소).
// 라디오 표식·카드 테두리·배지는 시안대로 커스텀 렌더하고, 네이티브 input은 sr-only로 숨긴다.
//
// 기본은 "미선택"이며, 미선택이면 하단 다음 버튼을 비활성화해 방어한다(시안 default 상태).

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

// 부제는 선택된 모드에 따라 달라진다(Figma 각 변형 문구 그대로).
// 미선택(기본)은 구매자 변형과 같은 안내문으로 둔다(선택을 유도하는 공통 문구).
const SUBTITLE_BY_MODE: Record<SignupMode, string> = {
  buyer: '구매자, 판매자 중 나에게 맞는 모드를 선택해주세요.',
  seller: '뭉치를 사용하시려면 개인정보 동의가 필요해요!',
};

// 라디오/체크박스 카드가 공유하는 키보드 포커스 링(내부 sr-only input이 :focus-visible일 때 카드에 링).
const FOCUS_RING_CLASS =
  'has-[:focus-visible]:ring-effect-focus-ring-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2';

interface ModeSelectStepProps {
  /** 선택된 모드. null이면 미선택(기본). */
  value: SignupMode | null;
  onChange: (mode: SignupMode) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ModeSelectStep({ value, onChange, onPrev, onNext }: ModeSelectStepProps) {
  const canProceed = value !== null;
  const subtitle = value === null ? SUBTITLE_BY_MODE.buyer : SUBTITLE_BY_MODE[value];

  return (
    <ScreenColumn>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">원하는 사용 모드를 선택해 주세요</h1>
          <p className="text-content-quarternary text-sm">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-3">
          {MODE_OPTIONS.map((option) => {
            const selected = value === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  'rounded-12 flex cursor-pointer flex-col gap-2 border p-4',
                  FOCUS_RING_CLASS,
                  // 선택: 코랄 테두리 / 미선택: 회색 테두리
                  selected ? 'border-border-brand' : 'border-border-subtle',
                )}
              >
                <input
                  type="radio"
                  name="signup-mode"
                  value={option.value}
                  checked={selected}
                  onChange={() => onChange(option.value)}
                  className="sr-only"
                />
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
              </label>
            );
          })}
        </div>
      </div>

      <StepFooter onPrev={onPrev} nextLabel="다음" onNext={onNext} canProceed={canProceed} />
    </ScreenColumn>
  );
}

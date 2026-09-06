'use client';

import { cn } from '@/lib/cn';

// 상태·범주를 가로로 전환하는 세그먼트 탭. 시안 B-17의 **회색 알약(pill) 칩** 탭에 대응한다.
// 목록 화면들이 공유할 P0 공용 컴포넌트라 특정 화면에 묶지 않고 여기 둔다.
//
// 활성 표시는 시안대로 **글자 색·굵기**로만 준다(활성 = 검정 볼드, 비활성 = 회색). 칩 배경은
// 활성/비활성 동일한 연회색이다. 최종 색·간격은 디자인 확정 시 여기만 손본다.
//
// 접근성: 값 하나만 선택되는 필터라 버튼 그룹 + aria-pressed로 표현한다. 옵션이 넘치면 가로 스크롤.

interface SegmentOption<T extends string> {
  readonly key: T;
  readonly label: string;
}

interface SegmentControlProps<T extends string> {
  readonly options: readonly SegmentOption<T>[];
  readonly value: T;
  readonly onChange: (key: T) => void;
  /** 그룹의 접근성 이름(예: '참여 상태 필터'). */
  readonly ariaLabel: string;
  readonly className?: string;
}

export function SegmentControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: SegmentControlProps<T>) {
  return (
    <div
      aria-label={ariaLabel}
      role="group"
      className={cn(
        'flex w-full gap-2 overflow-x-auto px-4 py-3',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.key === value;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.key)}
            className={cn(
              'text-body-14 bg-surface-secondary rounded-round shrink-0 px-4 py-1.5 whitespace-nowrap outline-none',
              'focus-visible:ring-effect-focus-ring-primary focus-visible:ring-2',
              isActive ? 'text-content-primary font-bold' : 'text-content-tertiary',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

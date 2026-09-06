'use client';

import { cn } from '@/lib/cn';

// 상태·범주를 가로로 전환하는 세그먼트 탭. 시안 B-17의 밑줄형 탭(전체·진행중·대체제안…)에 대응한다.
// 목록 화면들이 공유할 P0 공용 컴포넌트라 특정 화면에 묶지 않고 여기 둔다.
//
// 밑줄형(활성 = 코랄 글자 + 하단 바)으로 구현했다. 알약형(segmented pill)이 필요한 화면이 생기면
// variant를 넓히되 아래 props 계약은 유지한다. 최종 색·간격은 디자인 확정 시 여기만 손본다.
//
// 접근성: 값 하나만 선택되는 필터라 버튼 그룹 + aria-pressed로 표현한다(탭패널을 별도로 두지 않아
// role="tab"/"tabpanel" 배선은 생략). 옵션이 넘치면 가로 스크롤한다.

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
        'border-divider-default flex w-full gap-4 overflow-x-auto border-b px-4',
        // 활성 탭 하단 바가 컨테이너 border 위에 겹쳐 얇아 보이지 않도록 스크롤바만 숨긴다.
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
              'text-body-15 relative shrink-0 py-3 whitespace-nowrap outline-none',
              'focus-visible:ring-effect-focus-ring-primary rounded-sm focus-visible:ring-2',
              isActive ? 'text-content-brand font-semibold' : 'text-content-quarternary',
            )}
          >
            {option.label}
            {isActive && (
              <span
                aria-hidden
                className="bg-content-brand absolute inset-x-0 -bottom-px h-0.5 rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

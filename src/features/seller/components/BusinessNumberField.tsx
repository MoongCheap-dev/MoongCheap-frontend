'use client';

import { cn } from '@/lib/cn';

import { CircleCheckIcon, CircleExclamationIcon, CircleXIcon } from './SellerApplyIcons';

// 판매자 전환(S-01) 사업자등록번호 입력칸. 시안의 DS `input` 컴포넌트(212:4710 외)를 옮긴 것으로,
// 라벨이 칸 위에 뜨는 인증 화면의 StepField와는 다른 부품이다(라벨이 칸 **안** 위쪽에 있다).
//
// 지금 쓰는 곳이 이 화면 하나뿐이라 features 아래에 둔다. 두 번째 사용처가 생기면
// components/ui로 올린다(공통 UI 2회 규칙).
//
// 실측(시안 453:25169·25189·25199): 높이 72 · radius 12 · 좌우 패딩 12 · 라벨과 값 사이 4 ·
// 칸과 헬퍼 사이 2 · 헬퍼 좌우 패딩 8 · 헬퍼 아이콘과 문구 사이 4.

/** 입력칸 시각 상태. focus는 CSS(focus-within)가 처리하므로 상태값에 두지 않는다. */
export type BusinessNumberStatus = 'default' | 'success' | 'error';

interface BusinessNumberFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  status: BusinessNumberStatus;
  /** 칸 아래 안내 문구. 시안은 success·error에만 있다. */
  helper?: string;
  maxLength: number;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function BusinessNumberField({
  id,
  label,
  placeholder,
  value,
  status,
  helper,
  maxLength,
  onChange,
  onClear,
}: BusinessNumberFieldProps) {
  const helperId = helper !== undefined ? `${id}-helper` : undefined;

  return (
    <div className="flex w-full flex-col gap-0.5">
      <div
        className={cn(
          'rounded-12 flex h-18 w-full flex-col justify-center gap-1 border px-3',
          status === 'success'
            ? 'border-border-success'
            : status === 'error'
              ? 'border-border-error'
              : // 기본 테두리는 회색이고 포커스가 들어오면 진해진다(시안 default → focus).
                'border-border-quarternary focus-within:border-border-secondary',
        )}
      >
        <label className="text-label-14 text-content-tertiary w-full" htmlFor={id}>
          {label}
        </label>

        <div className="flex w-full items-center justify-between gap-2">
          <input
            aria-describedby={helperId}
            aria-invalid={status === 'error'}
            className={cn(
              'text-body-18 placeholder:text-content-quarternary min-w-0 flex-1 bg-transparent outline-none',
              // ⚠️ 시안은 error일 때만 값 색이 한 단계 흐리다(#575757). 다른 상태는 #303030이다.
              //    의도인지 확인이 필요하지만 임의로 통일하지 않고 시안 그대로 옮겼다.
              status === 'error' ? 'text-content-tertiary' : 'text-content-secondary',
            )}
            id={id}
            inputMode="numeric"
            maxLength={maxLength}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            value={value}
          />

          {/* 시안은 값이 있는 세 상태(focus·success·error) 모두에서 지우기 버튼을 보여 준다. */}
          {value.length > 0 && (
            <button
              aria-label={`${label} 지우기`}
              className={cn(
                'focus-visible:ring-effect-focus-ring-primary rounded-round outline-none focus-visible:ring-2',
                status === 'success'
                  ? 'text-content-success'
                  : status === 'error'
                    ? 'text-content-error'
                    : 'text-content-secondary',
              )}
              onClick={onClear}
              tabIndex={-1}
              type="button"
            >
              <CircleXIcon />
            </button>
          )}
        </div>
      </div>

      {helper !== undefined && (
        <p
          className={cn(
            'text-caption-12 flex items-center gap-1 px-2',
            status === 'error' ? 'text-content-error' : 'text-content-success',
          )}
          id={helperId}
          role={status === 'error' ? 'alert' : undefined}
        >
          {status === 'error' ? <CircleExclamationIcon /> : <CircleCheckIcon />}
          {helper}
        </p>
      )}
    </div>
  );
}

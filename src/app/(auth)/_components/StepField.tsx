'use client';

import type { UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/lib/cn';

// 회원가입 스텝(이메일·아이디·비밀번호)이 공유하는 단일 입력칸.
// LoginForm의 플로팅 라벨·Clear(X) 패턴을 재사용하되, 로그인과 달리 성공/오류를 모달이 아니라
// 입력칸 아래 인라인 헬퍼로 노출한다(Figma 회원가입 시안). 마크업이 로그인과 겹치는 것은 의도한
// 것이다(공통 UI 프리미티브 규약 확정 전까지 임의 추출하지 않는다 — CLAUDE.md).
//
// 디자인 토큰(#15) 머지에 맞춰 시맨틱 클래스로 교체 완료.
//   버튼 변형 기준은 SignupWizard 상단 주석 참고(검정 CTA=tertiary, 이전=quarternary — DS로 확인).

/** 입력칸 시각 상태. success=녹색 체크, error=빨강, default=회색(값 있으면 검정). */
export type FieldStatus = 'default' | 'success' | 'error';

// 라벨은 상태와 무관하게 항상 기본 회색(로그인 시안과 동일 규칙).
const FLOATING_LABEL_CLASS =
  'text-content-quarternary bg-background-default text-caption-12 absolute -top-2 left-3 px-1';

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="text-content-success size-5"
      fill="currentColor"
    >
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 11.4L5.6 10l1.1-1.1L9 11.2l4.3-4.3L14.4 8 9 13.4z" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="text-content-error size-5"
      fill="currentColor"
    >
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.54 10.48l-1.06 1.06L10 11.06l-2.48 2.48-1.06-1.06L8.94 10 6.46 7.52l1.06-1.06L10 8.94l2.48-2.48 1.06 1.06L11.06 10z" />
    </svg>
  );
}

interface ClearButtonProps {
  label: string;
  onClear: () => void;
}

function ClearButton({ label, onClear }: ClearButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      tabIndex={-1}
      onClick={onClear}
      className="text-content-quarternary"
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5" fill="currentColor">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.54 10.48l-1.06 1.06L10 11.06l-2.48 2.48-1.06-1.06L8.94 10 6.46 7.52l1.06-1.06L10 8.94l2.48-2.48 1.06 1.06L11.06 10z" />
      </svg>
    </button>
  );
}

interface StepFieldProps {
  id: string;
  label: string;
  type?: 'email' | 'text' | 'password';
  autoComplete?: string;
  placeholder: string;
  status: FieldStatus;
  /** 입력칸 아래 안내 문구. 기본(회색)=규칙 안내, success=녹색, error=빨강. */
  helper?: string;
  value: string;
  field: UseFormRegisterReturn;
  onClear: () => void;
  /** 포커스 진입/이탈 알림. 위저드가 "타이핑 중엔 에러 숨김"을 결정하는 데 쓴다. */
  onFocusChange?: (focused: boolean) => void;
  /** Enter 키로 현재 스텝을 진행한다(이메일/비번=다음, 아이디=중복확인 또는 다음).
   *  '다음' 버튼이 비활성일 땐 폼 암묵 제출이 막히므로, 폼 대신 입력칸 keydown으로 직접 처리한다. */
  onEnter?: () => void;
  /** 오른쪽 인라인 컨트롤(예: 아이디 중복확인 버튼). 있으면 Clear(X) 대신 노출한다. */
  rightSlot?: React.ReactNode;
}

export function StepField({
  id,
  label,
  type = 'text',
  autoComplete,
  placeholder,
  status,
  helper,
  value,
  field,
  onClear,
  onFocusChange,
  onEnter,
  rightSlot,
}: StepFieldProps) {
  const hasValue = value.length > 0;
  const helperId = helper !== undefined ? `${id}-helper` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <label htmlFor={id} className={FLOATING_LABEL_CLASS}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={status === 'error'}
          aria-describedby={helperId}
          // 위저드는 스텝별로 현재 필드만 렌더하고 React가 같은 위치의 input을 재사용하므로,
          // uncontrolled로 두면 이전 스텝으로 돌아왔을 때 DOM 값이 직전 스텝 값(또는 빈값)으로 남는다.
          // value로 controlled 처리해 항상 RHF 상태(useWatch)를 반영한다. onChange/onBlur/ref는 field가 준다.
          // useWatch가 초기 렌더에 undefined를 줄 수 있어 ''로 보정한다(안 하면 uncontrolled→controlled 경고).
          value={value ?? ''}
          className={cn(
            'placeholder:text-content-quinary rounded-8 h-14 w-full border px-4 text-sm outline-none',
            // 오른쪽 컨트롤 폭만큼 패딩을 벌려 텍스트가 겹치지 않게 한다.
            rightSlot !== undefined ? 'pr-28' : 'pr-11',
            // 빈 값: 회색(포커스 시 검정) / 값 있음: 검정 / success: 녹색 / error: 빨강
            status === 'success'
              ? 'border-border-success'
              : status === 'error'
                ? 'border-border-error'
                : hasValue
                  ? 'border-border-primary'
                  : 'border-border-subtle focus:border-border-primary',
          )}
          {...field}
          // field.onBlur(RHF의 touched 갱신)를 먼저 호출한 뒤 포커스 이탈을 알린다.
          // 스프레드 뒤에 둬야 field의 onBlur를 덮어쓰지 않고 감쌀 수 있다.
          onFocus={() => onFocusChange?.(true)}
          onBlur={(event) => {
            field.onBlur(event);
            onFocusChange?.(false);
          }}
          onKeyDown={(event) => {
            // onEnter가 있을 때만 Enter를 가로챈다. 핸들러가 없으면 preventDefault로 폼 기본 제출을
            // 삼키지 않도록 그냥 흘려보낸다. IME 조합 확정(한글 입력 등)의 Enter는 무시한다.
            if (onEnter && event.key === 'Enter' && !event.nativeEvent.isComposing) {
              event.preventDefault();
              onEnter();
            }
          }}
        />
        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
          {status === 'success' && <CheckIcon />}
          {status === 'error' && <ErrorIcon />}
          {status === 'default' && hasValue && rightSlot === undefined && (
            <ClearButton label={`${label} 지우기`} onClear={onClear} />
          )}
          {rightSlot}
        </div>
      </div>

      {helper !== undefined && (
        <p
          id={helperId}
          role={status === 'error' ? 'alert' : undefined}
          className={cn(
            'text-caption-12',
            status === 'success'
              ? 'text-content-success'
              : status === 'error'
                ? 'text-content-error'
                : 'text-content-quarternary',
          )}
        >
          {helper}
        </p>
      )}
    </div>
  );
}

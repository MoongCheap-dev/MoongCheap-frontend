import { cn } from '@/lib/cn';

// 켜짐/꺼짐 스위치. Figma `toggle` 컴포넌트(453:9907) - 트랙 44x24, 노브 지름 20, 안쪽 여백 2.
//
// 시안은 SVG로 내려오지만 이미지로 쓰지 않는다. 스위치는 아이콘이 아니라 조작 대상이라
// 상태·포커스·다크모드를 이미지로는 표현할 수 없다. 치수와 색만 시안에서 가져와 마크업으로 짠다.
//
// ⚠️ 꺼짐 상태 시안이 없다. 알림 설정 시안의 토글 3개가 전부 켜짐이라 트랙 색을 확인할 수
// 없어 `surface-tertiary`(라이트 #e6e6e6)로 두었다. 디자인 확인 후 바꾼다.
//
// 제어 컴포넌트다. 상태는 호출하는 쪽이 갖는다.

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** 스크린리더가 읽을 이름. 시각적 라벨은 행이 따로 그리므로 여기서 이름을 준다. */
  label: string;
  disabled?: boolean;
}

export function ToggleSwitch({ checked, onChange, label, disabled = false }: ToggleSwitchProps) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className={cn(
        'rounded-round flex h-6 w-11 shrink-0 items-center p-0.5 transition-colors',
        'focus-visible:ring-effect-focus-ring-primary outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        checked ? 'bg-surface-brand' : 'bg-surface-tertiary',
        disabled && 'bg-surface-disabled-secondary',
      )}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      role="switch"
      type="button"
    >
      {/* 노브. 트랙 44 - 여백 2*2 - 노브 20 = 20px만큼 움직인다. */}
      <span
        aria-hidden
        className={cn(
          'bg-surface-primary rounded-round size-5 transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  );
}

import type { ComponentPropsWithRef } from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/lib/cn';

// 라벨이 붙은 체크박스. Figma `checkbox+text` 컴포넌트(453:9951)에 대응한다.
// 박스 20x20 · 테두리 1.4px · radius 4 · 라벨은 caption-12.
//
// 네이티브 <input type="checkbox">를 시각적으로만 감추고 그 위에 박스를 그린다. 키보드 포커스·
// Space 토글·폼 제출값이 브라우저 기본으로 따라오고, react-hook-form의 register도 그대로 꽂힌다.
// ToggleSwitch를 button으로 만든 것과 갈리는 지점인데, 그쪽은 폼 필드가 아니라 즉시 반영되는
// 설정이라 값이 폼에 실릴 필요가 없었다.
//
// 체크 표시는 형제 선택자로 켠다. peer-checked:는 peer의 **형제**에만 걸리므로, 체크 아이콘
// 자체가 아니라 형제인 박스에 걸고 그 안의 svg를 [&_svg]로 짚는다.
//
// 잠긴 상태는 라벨 전체를 흐리게 한다. 라벨 텍스트는 input의 형제가 아니라 peer-로 못 짚어서
// has-[:disabled]:로 바깥 <label>에 건다. 시안에 비활성 상태가 없어 색을 새로 정하는 대신
// 투명도만 낮췄다. 정의가 나오면 여기만 고친다.

type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'className'> & {
  label: string;
  className?: string;
};

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className={cn('flex items-center gap-2 has-[:disabled]:opacity-50', className)}>
      <span className="relative flex size-5 shrink-0">
        <input className="peer sr-only" type="checkbox" {...props} />
        <span
          aria-hidden
          className="border-content-quinary rounded-4 text-content-oncolor peer-checked:bg-surface-brand peer-checked:border-surface-brand peer-focus-visible:ring-effect-focus-ring-primary flex size-5 items-center justify-center border-[1.4px] peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-checked:[&_svg]:opacity-100"
        >
          <Check className="size-3.5 opacity-0" strokeWidth={3} />
        </span>
      </span>

      <span className="text-caption-12 text-content-secondary">{label}</span>
    </label>
  );
}

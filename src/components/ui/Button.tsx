import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

// 코랄 계열 secondary 필(pill) 버튼의 기본 형태. AlertDialog 확인·ErrorState 재시도 등이 공유한다.
// bg·pressed·포커스 링·rounded-full·font-medium·글자색(기본 content-primary)을 기본으로 깔고,
// 크기(h-*)·여백(px-*)·글자색 변주는 className으로 덮는다(twMerge가 충돌 클래스를 정리한다).
// 디자인 시스템 버튼 규약이 확정되면 이 base 한 곳만 고친다.

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'bg-surface-button-secondary-default text-content-primary active:bg-surface-button-secondary-pressed focus-visible:ring-effect-focus-ring-primary rounded-full font-medium outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    />
  );
}

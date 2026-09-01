import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

// 코랄 계열 secondary 필(pill) 버튼의 기본 형태. AlertDialog 확인·ErrorState 재시도 등이 공유한다.
// bg·pressed·포커스 링·rounded-round·글자색(기본 content-primary)을 기본으로 깔고,
// 크기(h-*)·여백(px-*)·글자색 변주는 className으로 덮는다(twMerge가 충돌 클래스를 정리한다).
// 디자인 시스템 버튼 규약이 확정되면 이 base 한 곳만 고친다.
//
// **base에 글자 굵기를 깔지 않는다.** Tailwind v4의 타이포 토큰 유틸리티는
// `font-weight: var(--tw-font-weight, var(--text-button-14--font-weight))`로 생성되는데,
// `font-medium`이 `--tw-font-weight: 500`을 세팅해 버리면 토큰의 fallback(600)에 도달하지 못한다.
// 두 클래스의 소스 순서와 무관하게 결과는 항상 500이고, `cn`(twMerge)도 font-size 그룹과
// font-weight 그룹을 다른 것으로 보기 때문에 충돌로 정리해 주지 않는다.
// 굵기가 필요한 호출부는 타이포 토큰(`text-button-14` 등)이나 `font-*`를 직접 넘긴다.

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'bg-surface-button-secondary-default text-content-primary active:bg-surface-button-secondary-pressed focus-visible:ring-effect-focus-ring-primary rounded-round outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    />
  );
}

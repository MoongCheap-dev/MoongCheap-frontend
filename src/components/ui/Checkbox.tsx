'use client';

import type { ComponentProps, ReactNode } from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/lib/cn';

type CheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'children'> & {
  /** 체크박스 오른쪽에 붙는 라벨. label 요소가 감싸므로 htmlFor 없이 동작한다. */
  children?: ReactNode;
  className?: string;
};

export function Checkbox({ className, children, disabled, ...props }: CheckboxProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 text-sm',
        disabled ? 'text-muted cursor-not-allowed' : 'text-foreground cursor-pointer',
        className,
      )}
    >
      <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          disabled={disabled}
          className={cn(
            'border-surface-line bg-surface peer size-5 appearance-none rounded-md border',
            'checked:border-primary checked:bg-primary',
            'focus-visible:ring-primary/30 focus-visible:ring-2 focus-visible:outline-none',
            'disabled:bg-primary-soft disabled:cursor-not-allowed disabled:opacity-60',
          )}
          {...props}
        />
        <Check
          aria-hidden
          strokeWidth={3}
          className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100"
        />
      </span>
      {children}
    </label>
  );
}

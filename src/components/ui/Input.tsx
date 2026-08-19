'use client';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

type InputProps = ComponentProps<'input'>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'border-surface-line bg-surface text-foreground h-11 w-full rounded-xl border px-3.5 text-sm',
        'placeholder:text-muted',
        'focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-2 focus-visible:outline-none',
        'disabled:bg-primary-soft disabled:text-muted disabled:cursor-not-allowed',
        'aria-[invalid=true]:border-danger aria-[invalid=true]:focus-visible:ring-danger/20',
        className,
      )}
      {...props}
    />
  );
}

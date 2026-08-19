'use client';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

type TextareaProps = ComponentProps<'textarea'>;

export function Textarea({ className, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(
        'border-surface-line bg-surface text-foreground w-full resize-y rounded-xl border px-3.5 py-2.5 text-sm',
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

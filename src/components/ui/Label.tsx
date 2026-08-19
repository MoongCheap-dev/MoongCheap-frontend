import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

type LabelProps = ComponentProps<'label'> & {
  required?: boolean;
};

export function Label({ required = false, className, children, ...props }: LabelProps) {
  return (
    <label className={cn('text-foreground text-sm font-medium', className)} {...props}>
      {children}
      {required && (
        <span aria-hidden className="text-danger ml-0.5">
          *
        </span>
      )}
    </label>
  );
}

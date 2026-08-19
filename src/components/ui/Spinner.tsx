import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/cn';

type SpinnerProps = {
  className?: string;
  /** 스크린리더용 상태 텍스트. 버튼 내부처럼 이미 맥락이 있으면 생략 가능. */
  label?: string;
};

export function Spinner({ className, label }: SpinnerProps) {
  return (
    <LoaderCircle
      role="status"
      aria-label={label}
      aria-hidden={label === undefined || undefined}
      className={cn('size-4 shrink-0 animate-spin', className)}
    />
  );
}

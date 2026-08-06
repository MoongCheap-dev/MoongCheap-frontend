import { cn } from '@/lib/cn';
import type { ScanStatus } from '@/types/scan';

const STATUS_MAP: Record<ScanStatus, { label: string; className: string }> = {
  safe: { label: '안전', className: 'bg-safe-soft text-safe' },
  warning: { label: '주의', className: 'bg-warning-soft text-warning' },
  danger: { label: '위험', className: 'bg-danger-soft text-danger' },
};

export function StatusBadge({ status }: { status: ScanStatus }) {
  const { label, className } = STATUS_MAP[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        className,
      )}
    >
      {label}
    </span>
  );
}

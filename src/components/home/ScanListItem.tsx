import { Clock } from 'lucide-react';

import { StatusBadge } from '@/components/common/StatusBadge';
import { Thumbnail } from '@/components/common/Thumbnail';
import type { Scan } from '@/types/scan';

export function ScanListItem({ scan }: { scan: Scan }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-2xl bg-surface p-3 text-left shadow-[0_1px_3px_rgba(17,18,27,0.06)] transition active:scale-[0.99]"
    >
      <Thumbnail seed={scan.thumbSeed} className="h-12 w-12 shrink-0" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-foreground">{scan.fileName}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
          <Clock className="h-3.5 w-3.5" />
          {scan.scannedAt}
        </p>
      </div>

      <StatusBadge status={scan.status} />
    </button>
  );
}

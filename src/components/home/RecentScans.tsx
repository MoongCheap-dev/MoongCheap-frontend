import { ChevronRight } from 'lucide-react';

import { ScanListItem } from '@/components/home/ScanListItem';
import type { Scan } from '@/types/scan';

export function RecentScans({ scans }: { scans: Scan[] }) {
  return (
    <section className="px-5 pt-6 pb-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">최근 검사</h2>
        <button
          type="button"
          className="flex items-center gap-0.5 text-sm font-medium text-muted transition active:text-foreground"
        >
          모두 보기
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {scans.map((scan) => (
          <ScanListItem key={scan.id} scan={scan} />
        ))}
      </div>
    </section>
  );
}

import { ImageIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

/** 목데이터용 썸네일 — 실제 이미지 대신 시드 색상 그라데이션을 보여준다. */
export function Thumbnail({ seed, className }: { seed: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-xl bg-placeholder',
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, #${seed} 0%, #${seed}99 55%, #1118 100%)`,
      }}
    >
      <ImageIcon className="h-4 w-4 text-white/70" />
    </div>
  );
}

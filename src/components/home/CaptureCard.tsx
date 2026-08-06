import { Camera, Images } from 'lucide-react';

import { cn } from '@/lib/cn';

/**
 * @param spacious 최근 검사 섹션이 숨겨졌을 때 미리보기-버튼 간격을 넓혀 화면 균형을 맞춘다.
 *                 (최근 검사를 다시 켜면 false 로 되돌려 원래 간격 복구)
 */
export function CaptureCard({ spacious = false }: { spacious?: boolean }) {
  return (
    <section className="px-5">
      {/* 미리보기 영역 (카메라/선택한 사진이 들어갈 자리) */}
      <div className="flex aspect-[4/3.4] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-placeholder text-muted">
        <Camera className="h-10 w-10" strokeWidth={1.6} />
        <p className="text-sm">검사할 사진을 촬영하거나 선택하세요</p>
      </div>

      {/* 버튼 섹션 — spacious 일 때 미리보기와의 간격을 넓힌다 */}
      <div className={cn('mt-4 space-y-3', spacious && 'mt-14')}>
        {/* 앨범에서 불러오기 */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-semibold text-white shadow-[0_6px_16px_rgba(78,127,236,0.35)] transition active:scale-[0.99] active:bg-primary-pressed"
        >
          <Images className="h-5 w-5" strokeWidth={2.2} />
          앨범에서 불러오기
        </button>

        {/* 직접 촬영하기 */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-surface-line bg-surface py-4 text-base font-semibold text-foreground transition active:scale-[0.99]"
        >
          <Camera className="h-5 w-5" strokeWidth={2.2} />
          직접 촬영하기
        </button>
      </div>
    </section>
  );
}

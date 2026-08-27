'use client';

import { Button } from '@/components/ui/Button';
import { ERROR_STATE_MESSAGE, RETRY_LABEL } from '@/constants/commonMessages';
import { cn } from '@/lib/cn';

// 조회 실패 등 오류 상태 공통 레이아웃 + 재시도 버튼.
// 출처: FN-B03-01 오류 상태 "'잠시 후 다시 시도해 주세요' + [새로고침] 버튼".
//
// onRetry를 주면 재시도 버튼을 노출한다(다시 조회하는 콜백을 연결). 없으면 문구만 노출한다.

interface ErrorStateProps {
  /** 오류 문구. 기본은 공통 문구(ERROR_STATE_MESSAGE). */
  message?: string;
  /** 재시도 콜백. 주어지면 [새로고침] 버튼을 노출한다. */
  onRetry?: () => void;
  /** 재시도 버튼 라벨. 기본 '새로고침'. */
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  message = ERROR_STATE_MESSAGE,
  onRetry,
  retryLabel = RETRY_LABEL,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-4 px-6 py-12 text-center',
        className,
      )}
    >
      <p className="text-content-quarternary text-body-15">{message}</p>
      {onRetry !== undefined && (
        <Button onClick={onRetry} className="text-button-14 text-content-brand h-10 px-5">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

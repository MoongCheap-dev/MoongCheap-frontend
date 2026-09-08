'use client';

import { useId, useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/cn';

// 펼침/접힘 공용 아코디언. 시안 B-08 상품 상세의 정보 섹션(상품 상세정보·배송정보·교환/환불)에서
// 처음 쓴다. 제목 행(p-4, 좌:제목 우:셰브런)을 탭하면 본문이 펼쳐지고 셰브런이 뒤집힌다.
//
// 시안 제목은 button-15(SemiBold) content/secondary, 셰브런 24px. 본문은 별도 시안이 없어
// body-14 content/tertiary로 둔다. 여러 섹션을 세로로 쌓을 때 경계가 필요하면 호출부가
// className으로 상단 구분선을 준다.

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  /** 초기 펼침 여부. 기본 접힘. */
  defaultOpen?: boolean;
  className?: string;
}

export function Accordion({ title, children, defaultOpen = false, className }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((prev) => !prev)}
        className="focus-visible:ring-effect-focus-ring-primary flex w-full items-center justify-between p-4 outline-none focus-visible:ring-2"
      >
        <span className="text-button-15 text-content-secondary text-left">{title}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            'text-content-tertiary size-6 shrink-0 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div id={bodyId} className="text-body-14 text-content-tertiary px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

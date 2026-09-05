import { ChevronRight } from 'lucide-react';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';
import { HOME_SECTION_MORE } from '@/constants/homeMessages';

// 홈 섹션 머리. 시안 컴포넌트 `default`(409:2140). 제목 + 오른쪽 `더보기 >`.
//
// `더보기` 행선지가 일곱 섹션 전부 미정이다. 시안에 이어지는 화면이 없고, 기능명세에서도
// B-04(성사된 공구 전체보기)·B-29(도감 전체보기)는 Full, B-27은 결번이다. 확정 전까지
// '준비 중' 토스트로 둔다(의사결정 기록 2026-08-28).

interface SectionHeaderProps {
  title: string;
  /** 시안에서 두 섹션만 제목 아래 회색 한 줄이 붙는다(성사 직전 · 마감 직전). */
  description?: string;
  /** 시안에 `더보기`가 없는 섹션이 있다(card-list-1·2·6). */
  showMore?: boolean;
}

export function SectionHeader({ title, description, showMore = true }: SectionHeaderProps) {
  return (
    <div className="flex w-full items-start justify-end gap-1 px-4">
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="text-heading-18 text-content-primary w-full">{title}</h2>
        {description !== undefined && (
          <p className="text-caption-12 text-content-quarternary w-full">{description}</p>
        )}
      </div>

      {showMore && (
        <ComingSoonButton className="flex h-[30px] shrink-0 items-center justify-center gap-1 px-1">
          <span className="text-body-14 text-content-quarternary whitespace-nowrap">
            {HOME_SECTION_MORE}
          </span>
          <ChevronRight aria-hidden className="text-content-quarternary size-4" />
        </ComingSoonButton>
      )}
    </div>
  );
}

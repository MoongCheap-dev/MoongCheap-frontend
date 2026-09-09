'use client';

import { SEARCH_FILTERS, SEARCH_FILTER_GROUP_LABEL } from '@/constants/searchMessages';
import { cn } from '@/lib/cn';
import type { SearchFilterKey } from '@/types/search';

// B-06 결과 필터 칩. 시안 `818:10099`(전체) · `1153:72806`(모집중) · `1153:72815`(마감 임박).
//
// 공용 `SegmentControl`을 쓰지 않는다. 그쪽은 B-17의 회색 알약 탭이라 선택 표시가 글자 굵기·색뿐이고
// 배경이 항상 같은데, 여기는 radius가 8이고 **칩마다 선택 색이 다르다.** 같은 부품이 아니다.
// 세 번째 사용처가 생기면 그때 공통점을 추려 올린다(공통 UI 2회 규칙).
//
// ⚠️ 시안 변수 오바인딩. 선택된 칩 배경이 셋 다 `surface-danger`로 바인딩돼 있는데 실제 채움값은
//    각각 `#ffe0e1` · `rgba(50,104,255,0.2)` · `rgba(255,24,96,0.2)`로 다르다. 우리 토큰의
//    `surface-danger`는 `#ff0050`(불투명)이라 이름을 따라가면 시안과 다른 색이 나온다. 실제
//    채움값과 같은 토큰(`surface-button-secondary-hover` · `surface-visibility` · `surface-error`)에
//    맞췄다. 디자인 확인 대상.
//
// ⚠️ 타이포도 칩마다 다르다. `전체`만 label-16(16/22 SemiBold)이고 나머지 둘은 body-15(15/24
//    Medium)다. 선택 여부와 무관하게 항상 그렇다. 실수로 보이지만 시안 그대로 옮긴다.

/** 선택됐을 때의 배경·글자색. 시안의 실제 채움값 기준. */
const SELECTED_CLASS: Record<SearchFilterKey, string> = {
  all: 'bg-surface-button-secondary-hover text-content-brand',
  gathering: 'bg-surface-visibility text-content-visibility',
  closing: 'bg-surface-error text-content-error',
};

/** 칩별 타이포. 시안이 `전체`만 다른 스타일을 쓴다. */
const TEXT_CLASS: Record<SearchFilterKey, string> = {
  all: 'text-label-16',
  gathering: 'text-body-15',
  closing: 'text-body-15',
};

interface SearchFilterTabsProps {
  value: SearchFilterKey;
  onChange: (key: SearchFilterKey) => void;
}

export function SearchFilterTabs({ value, onChange }: SearchFilterTabsProps) {
  return (
    <div
      aria-label={SEARCH_FILTER_GROUP_LABEL}
      className="flex w-full [scrollbar-width:none] gap-2 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden"
      role="group"
    >
      {SEARCH_FILTERS.map((filter) => {
        const isActive = filter.key === value;
        return (
          <button
            aria-pressed={isActive}
            className={cn(
              'rounded-8 flex shrink-0 items-center justify-center px-3 py-1 whitespace-nowrap outline-none',
              'focus-visible:ring-effect-focus-ring-primary focus-visible:ring-2',
              TEXT_CLASS[filter.key],
              isActive
                ? SELECTED_CLASS[filter.key]
                : 'bg-surface-secondary text-content-quarternary',
            )}
            key={filter.key}
            onClick={() => onChange(filter.key)}
            type="button"
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

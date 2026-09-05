import Image from 'next/image';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';
import { HOME_CATEGORIES } from '@/constants/categories';

// 카테고리 10종. 시안 `981:18164`(5×2, 행 간격 16, 좌우 여백 16, 항목 폭 54).
//
// 행선지가 시안·기능명세 어디에도 없어 전부 '준비 중' 토스트다.
//
// 아이콘은 시안이 이모지를 벡터화한 것이라 색이 여러 개다. currentColor로 바꿀 수 없어
// SVG 파일 그대로 렌더한다. 파일이 타일과 같은 54×54 좌표계라 타일을 채우기만 하면 된다.

/** 시안: 타일 54×54, radius 8, 배경 #fafafa, 테두리 #e6e6e6. */
const TILE_CLASS =
  'bg-background-subtle border-border-subtle rounded-8 relative aspect-square w-full overflow-hidden border';

export function CategoryGrid() {
  return (
    <div className="flex w-full flex-col gap-4 py-4">
      {[HOME_CATEGORIES.slice(0, 5), HOME_CATEGORIES.slice(5)].map((row) => (
        <div className="flex w-full items-center justify-between px-4" key={row[0].id}>
          {row.map((category) => (
            <ComingSoonButton className="flex w-13.5 flex-col items-start gap-1" key={category.id}>
              <span className={TILE_CLASS}>
                <Image
                  alt=""
                  className="object-contain"
                  fill
                  sizes="54px"
                  src={`/images/main-home/category/${category.id}.svg`}
                />
              </span>
              <span className="text-caption-9 text-content-primary w-full text-center">
                {category.label}
              </span>
            </ComingSoonButton>
          ))}
        </div>
      ))}
    </div>
  );
}

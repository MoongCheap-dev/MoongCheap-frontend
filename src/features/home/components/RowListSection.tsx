import { PagedRowList } from '@/features/home/components/PagedRowList';
import { SectionHeader } from '@/features/home/components/SectionHeader';
import type { HomeProductCard } from '@/types/home';

// card-list-2(성사 직전 공구) · card-list-6(참여가능 마감 직전 공구). 시안 `981:18271`·`981:18305`.
// 둘은 제목·부제와 데이터만 다르고 구성이 같다.

interface RowListSectionProps {
  title: string;
  description: string;
  products: readonly HomeProductCard[];
}

export function RowListSection({ title, description, products }: RowListSectionProps) {
  return (
    <section className="flex w-full flex-col gap-3">
      <SectionHeader description={description} title={title} />
      <PagedRowList products={products} />
    </section>
  );
}

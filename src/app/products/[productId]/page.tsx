import type { Metadata } from 'next';

import { ProductDetailView } from '@/features/product/components/ProductDetailView';
import { mockGetProductDetail } from '@/mocks/product';

export const metadata: Metadata = {
  title: '상품 상세',
};

// B-08 상품 상세. 홈 상품 카드(ProductCard·ProductRow)·도감 검색(B-06)에서 진입한다.
//
// 상품 조회만 서버에서 하고(mock), 상품설명 펼침·아코디언 등 상호작용은 ProductDetailView(client)가
// 맡는다. 뒤로가기는 진입 경로가 다양해(홈/검색) history 기반이다.
//
// 생성 타입(PageProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 params를 직접
// 타이핑한다(app/layout.tsx와 같은 이유).
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await mockGetProductDetail(productId);

  return <ProductDetailView product={product} />;
}

'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import { EmptyState } from '@/components/ui/EmptyState';
import { ERROR_ACTION_CLASS, ErrorScreen } from '@/components/ui/ErrorScreen';
import { CATALOG_SEARCH_ASSETS } from '@/constants/assets';
import { ERROR_SCREEN_RETRY_LABEL } from '@/constants/commonMessages';
import { SEARCH_EMPTY, SEARCH_ERROR_DESCRIPTION } from '@/constants/searchMessages';
import { SearchFilterTabs } from '@/features/search/components/SearchFilterTabs';
import { SearchResultCard } from '@/features/search/components/SearchResultCard';
import { searchProducts } from '@/lib/productSearchApi';
import { mockSearchProducts } from '@/mocks/search';
import type { ProductSearchResult, SearchFilterKey } from '@/types/search';

// B-06 검색 결과 본문. 시안 `1153:72821`(전체) · `1153:72803`(모집중) · `1153:72812`(마감 임박).
//
// 조회가 클라이언트인 이유: `/api/products-search/search`는 permitAll이 아니라 세션(SID)이 필요한데
// SID는 httpOnly 쿠키라 브라우저만 갖고 있다. 서버 컴포넌트에서 부르면 쿠키 없이 나가 401이 된다
// ([[lib/productSearchApi]]).
//
// 조회에 실패하면(미로그인 · 미배선 · 색인 없음) 목으로 떨어진다. `ProductDetailView`와 같은 방침이다.
// 검색이 아예 안 되는 것과 결과가 0건인 것은 화면이 달라야 해서, 목 대체는 '실패'로 세지 않는다.
//
// ⚠️ 필터는 아직 목록을 실질적으로 거르지 못한다. 검색 응답에 수요보드 정보가 없어 실데이터에는
//    `demandStatus`가 없기 때문이다([[types/search]]). 아래 분기는 값이 생기면 그대로 동작하고,
//    지금은 목으로 떨어졌을 때만 시안대로 갈린다.

/** 검색 응답을 화면 타입으로 옮긴다. 수요 관련 값은 응답에 없어 비워 둔다. */
function toResults(products: Awaited<ReturnType<typeof searchProducts>>['products']) {
  return products.map<ProductSearchResult>((item) => ({
    id: String(item.id),
    name: item.name,
    spec: item.specSummary ?? undefined,
    thumbnailUrl: item.thumbnailUrl ?? undefined,
    listPrice: item.listPrice ?? undefined,
  }));
}

interface SearchResultsViewProps {
  query: string;
  /**
   * 상품 상세 경로의 앞부분. 카드 링크는 여기에 `/{id}`를 붙인다. 라우트는 호출부(page)가 정한다.
   *
   * 경로를 만드는 **함수**로 받으면 안 된다. 호출부가 서버 컴포넌트라 함수는 클라이언트 경계를
   * 넘지 못한다("Functions cannot be passed directly to Client Components").
   */
  productHrefBase: string;
}

export function SearchResultsView({ query, productHrefBase }: SearchResultsViewProps) {
  // 결과에 그 결과가 어떤 검색어의 것인지를 함께 담는다. 검색어가 바뀐 직후 이전 목록이 잠깐
  // 남는 것을 막으면서도, effect 본문에서 동기 setState를 하지 않게 된다.
  const [loaded, setLoaded] = useState<{
    query: string;
    results: readonly ProductSearchResult[];
  } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<SearchFilterKey>('all');
  // 재시도 때마다 값을 바꿔 조회 effect를 다시 돌린다.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    async function load() {
      let results: readonly ProductSearchResult[];
      try {
        const response = await searchProducts(query);
        results = toResults(response.products);
      } catch {
        // 조회 실패는 정상 경로(로그인 전 · 백엔드 미기동 · 색인 없음). 목으로 화면을 채운다.
        results = await mockSearchProducts();
      }
      if (active) {
        setLoaded({ query, results });
      }
    }

    load().catch((cause: unknown) => {
      if (!active) return;
      setError(cause instanceof Error ? cause : new Error('검색에 실패했습니다.'));
    });

    return () => {
      active = false;
    };
  }, [query, attempt]);

  const retry = useCallback(() => {
    setError(null);
    setLoaded(null);
    setAttempt((prev) => prev + 1);
  }, []);

  if (error !== null) {
    return (
      <ErrorScreen description={SEARCH_ERROR_DESCRIPTION}>
        <button className={ERROR_ACTION_CLASS} onClick={retry} type="button">
          {ERROR_SCREEN_RETRY_LABEL}
        </button>
      </ErrorScreen>
    );
  }

  // 첫 조회 중에는 필터도 목록도 그리지 않는다. 개수를 알기 전에 필터를 그리면 칩을 누를 수 있는데
  // 거를 대상이 없다.
  if (loaded === null || loaded.query !== query) {
    return null;
  }

  const visible =
    filter === 'all'
      ? loaded.results
      : loaded.results.filter((item) => item.demandStatus === filter);

  return (
    <div className="flex w-full flex-1 flex-col">
      <SearchFilterTabs onChange={setFilter} value={filter} />

      {visible.length === 0 ? (
        <EmptyState
          description={SEARCH_EMPTY.description}
          icon={<Image alt="" height={112} src={CATALOG_SEARCH_ASSETS.emptyResult} width={112} />}
          title={SEARCH_EMPTY.title}
        />
      ) : (
        // 시안: 좌우 여백 16, 카드 사이 20.
        <ul className="flex w-full flex-col gap-5 p-4">
          {visible.map((product) => (
            <SearchResultCard
              href={`${productHrefBase}/${encodeURIComponent(product.id)}`}
              key={product.id}
              product={product}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

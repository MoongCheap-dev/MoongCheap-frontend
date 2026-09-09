import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { ComingSoonButton } from '@/components/ui/ComingSoonButton';
import { CartIcon } from '@/components/ui/Icons';
import { SEARCH_TITLE } from '@/constants/searchMessages';
import { SearchView } from '@/features/search/components/SearchView';

export const metadata: Metadata = {
  title: SEARCH_TITLE,
};

// B-05 검색 입력. 홈 헤더의 검색바에서 진입한다. 시안 `1153:72646`.
//
// ⚠️ 시안의 프레임 이름이 `B-21. 주문내역 - empty`로 잘못 붙어 있다(내용은 B-05다). 실제 B-21은
//    `1153:73814`다. 디자인에 알려 둘 것.
//
// (main) 라우트 그룹에 둔다 - 하단 GNB는 이 그룹의 공용 레이아웃이 그린다. 시안에도 하단바가 있다.
//
// 장바구니(B-13)는 Full 범위라 화면이 없다. 시안에 있는 진입점이라 노출은 하고 탭하면 '준비 중'
// 토스트를 띄운다(의사결정 기록 2026-08-28).
//
// `?q=`는 결과 화면(B-06)의 검색어 칸을 눌러 편집하러 돌아왔을 때 채워진다. 홈에서 처음 들어오면
// 비어 있다(시안 기본 상태). 그래서 입력창에 autoFocus를 걸지 않는다 - 걸면 키보드가 바로 올라와
// 기본 상태 시안이 화면에 나타날 일이 없어진다.
//
// 생성 타입(PageProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 searchParams를
// 직접 타이핑한다(app/layout.tsx와 같은 이유).
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <main className="flex w-full flex-1 flex-col">
      <AppBar
        action={
          // 시안: 52×52 터치 영역 안에 24 아이콘(홈 GNB와 같은 규격).
          <ComingSoonButton className="flex size-13 shrink-0 items-center justify-center p-3.5">
            {/* 시안의 이 아이콘만 #434343으로 우리 content 스케일에 없는 값이다. 같은 장바구니
                아이콘인 B-06(#303030 = content/secondary)에 맞춘다. 디자인 확인 대상. */}
            <CartIcon className="text-content-secondary size-6" />
            <span className="sr-only">장바구니</span>
          </ComingSoonButton>
        }
        backHref="/"
        title={SEARCH_TITLE}
      />
      <SearchView initialQuery={q ?? ''} resultsHref="/search/results" />
    </main>
  );
}

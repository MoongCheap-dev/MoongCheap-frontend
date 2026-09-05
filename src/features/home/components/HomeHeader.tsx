import { ComingSoonButton } from '@/components/ui/ComingSoonButton';
import { HOME_GNB_TITLE, HOME_SEARCH_PLACEHOLDER } from '@/constants/homeMessages';
import { BellIcon, CartIcon, SearchIcon } from '@/features/home/components/HomeIcons';

// 홈 상단. 시안 `981:18160`(GNB) + `981:18161`(검색바).
//
// 알림(B-25)·장바구니(B-13)는 둘 다 Full 범위라 화면이 없다. 시안에 있는 진입점이라 노출은
// 하고 탭하면 '준비 중' 토스트를 띄운다(의사결정 기록 2026-08-28).
//
// 검색바는 입력창이 아니라 검색 화면(B-05)으로 가는 버튼이다. B-05가 아직 없어 지금은
// 토스트로 두고, 검색 이슈 착수 시 `<Link href="/search">`로 바꾼다.

/** 시안: 52×52 터치 영역 안에 24 아이콘. */
const GNB_ACTION_CLASS = 'flex size-13 items-center justify-center p-3';

export function HomeHeader() {
  return (
    <header className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between px-4">
        <h1 className="text-title-18 text-content-secondary min-w-0 flex-1">{HOME_GNB_TITLE}</h1>
        <div className="flex items-center">
          <ComingSoonButton className={GNB_ACTION_CLASS}>
            <BellIcon className="text-content-secondary size-6" />
            <span className="sr-only">알림</span>
          </ComingSoonButton>
          <ComingSoonButton className={GNB_ACTION_CLASS}>
            <CartIcon className="text-content-secondary size-6" />
            <span className="sr-only">장바구니</span>
          </ComingSoonButton>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 py-3">
        <ComingSoonButton className="bg-surface-secondary rounded-round flex h-10 w-full items-center gap-2 px-4 py-0.5">
          <span className="text-section-title-16 text-content-disabled-secondary min-w-0 flex-1 text-left">
            {HOME_SEARCH_PLACEHOLDER}
          </span>
          <SearchIcon className="text-content-quarternary size-6 shrink-0" />
        </ComingSoonButton>
      </div>
    </header>
  );
}

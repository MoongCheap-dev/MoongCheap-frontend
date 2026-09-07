'use client';

import type { ComponentType } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavDelayIcon, NavHomeIcon, NavMyIcon } from '@/components/layout/BottomNavIcons';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/cn';

// 하단 탭바. 시안 `834:9240`(222×64 알약, 화면 하단 중앙 고정).
//
// 활성 표시는 폭 67·높이 53의 회색 알약인데, 탭 하나의 폭은 48이다(좌우 12 + 아이콘 24).
// 즉 활성 알약이 탭 사이 간격(19)까지 좌우로 9.5씩 밀고 들어온다. 그래서 알약을 탭 안에
// 절대 배치로 깔고 내용은 그 위에 올린다 — 탭 자체를 67로 넓히면 전체 폭이 222를 넘는다.
//
// `대기`는 B-17(내 뭉치 참여 목록) 화면이 아직 없다. 시안에 있는 탭이라 노출은 하고 탭하면
// '준비 중' 토스트를 띄운다(미구현 진입점 규칙, 의사결정 기록 2026-08-28).

interface NavItem {
  key: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  /** 화면이 아직 없는 탭은 href를 비운다. */
  href?: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', label: '홈', Icon: NavHomeIcon, href: '/' },
  { key: 'delay', label: '대기', Icon: NavDelayIcon },
  { key: 'my', label: 'MY', Icon: NavMyIcon, href: '/mypage' },
];

/** 탭 하나의 내부. 활성 알약과 내용의 쌓임 순서를 여기서 고정한다. */
const ITEM_CLASS =
  'relative flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-round';

function NavItemBody({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <>
      {/* 시안의 활성 알약(67×53). 탭 폭(48)보다 넓어 간격을 파고든다. */}
      {active && (
        <span
          aria-hidden
          className="bg-surface-tertiary rounded-32 absolute top-1/2 left-1/2 h-[53px] w-[67px] -translate-x-1/2 -translate-y-1/2"
        />
      )}
      <item.Icon
        className={cn(
          'relative size-6',
          active ? 'text-content-brand' : 'text-content-quarternary',
        )}
      />
      <span
        className={cn(
          'text-label-10 relative whitespace-nowrap',
          active ? 'text-content-brand' : 'text-content-quarternary',
        )}
      >
        {item.label}
      </span>
    </>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const { showComingSoon } = useToast();

  return (
    <nav
      aria-label="주요 메뉴"
      className="fixed inset-x-0 bottom-[env(safe-area-inset-bottom)] z-40 flex justify-center"
    >
      <div className="bg-surface-primary rounded-round flex h-16 w-[222px] items-center gap-[19px] px-5 drop-shadow-[0px_2px_10px_rgba(0,0,0,0.1)]">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href !== undefined &&
            (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));

          if (item.href === undefined) {
            return (
              <button key={item.key} type="button" onClick={showComingSoon} className={ITEM_CLASS}>
                <NavItemBody item={item} active={false} />
              </button>
            );
          }

          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={ITEM_CLASS}
            >
              <NavItemBody item={item} active={active} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

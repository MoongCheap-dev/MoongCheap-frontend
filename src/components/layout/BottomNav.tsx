import { Clock, Home, User } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/cn';

// 하단 GNB(글로벌 내비게이션). 시안 B-17 등 루트 화면 하단의 플로팅 3탭에 대응한다.
// 탭 구성은 businessRules.ts GNB_TABS(홈 · 내 대기 · 마이페이지 → B-03 / B-17 / B-24)를 따른다.
//
// ⚠️ App Router 경로 규약이 미확정이라 href는 현재 존재하는 라우트로 임시 배선한다
//    (홈=/ · 대기=/waiting · MY=/mypage). 규약 확정 시 이 표만 고친다.
// mypage 셸 주석대로, 하단탭이 확정되면 라우트 그룹 레이아웃으로 올려 공용화한다.

type NavKey = 'home' | 'waiting' | 'my';

const ITEMS: readonly { key: NavKey; label: string; href: string; Icon: typeof Home }[] = [
  { key: 'home', label: '홈', href: '/', Icon: Home },
  { key: 'waiting', label: '대기', href: '/waiting', Icon: Clock },
  { key: 'my', label: 'MY', href: '/mypage', Icon: User },
];

interface BottomNavProps {
  active: NavKey;
}

export function BottomNav({ active }: BottomNavProps) {
  return (
    <nav
      aria-label="주요 메뉴"
      className="max-w-mobile pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto w-full px-4 pb-4"
    >
      <ul className="bg-background-default shadow-effect-shadow-primary pointer-events-auto flex items-center justify-around rounded-full px-2 py-2 shadow-lg">
        {ITEMS.map(({ key, label, href, Icon }) => {
          const isActive = key === active;
          return (
            <li key={key}>
              <Link
                aria-current={isActive ? 'page' : undefined}
                className="flex w-16 flex-col items-center gap-1 py-1"
                href={href}
              >
                <span
                  className={cn(
                    'flex size-9 items-center justify-center rounded-full',
                    isActive ? 'bg-surface-brand text-content-oncolor' : 'text-content-tertiary',
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                </span>
                <span
                  className={cn(
                    'text-caption-10',
                    isActive ? 'text-content-brand font-medium' : 'text-content-tertiary',
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

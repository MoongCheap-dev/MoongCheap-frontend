'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { useToast } from '@/components/ui/Toast';

// 전체 폭 목록 행(라벨 + 우측 chevron). B-25 "활동 알림" 목록이 쓴다.
//
// `SettingsRow`와 합치지 않았다. 그쪽은 흰 카드 안에 들어가는 행이라 chevron이 없고 마지막
// 행에 구분선이 없다. 이 행은 카드 밖 전체 폭이고 모든 행에 구분선이 붙는다. 겉모습만 비슷할 뿐
// 다른 컴포넌트다.
//
// 이동 경로가 없으면 '준비 중인 기능이에요' 토스트를 띄운다. 기능정의서 머리말이 "MVP 미구현
// 기능의 진입점은 노출하되, 탭 시 토스트를 노출한다"로 정하고 있다.
//
// chevron은 경로 유무와 무관하게 항상 그린다. B-25의 활동 알림 4행이 전부 경로가 없어서,
// 경로가 있을 때만 그리면 시안의 목록 모양이 통째로 무너진다. 대신 행이 탭에 반응하므로
// "이동할 것처럼 보이는데 아무 일도 안 일어난다"는 문제는 생기지 않는다.

interface SettingsNavRowProps {
  label: string;
  href?: string;
}

const ROW_CLASS =
  'text-body-15 text-content-secondary border-divider-default active:bg-surface-secondary flex w-full items-center justify-between border-b p-4 text-left';

export function SettingsNavRow({ label, href }: SettingsNavRowProps) {
  const { showComingSoon } = useToast();

  const content = (
    <>
      {label}
      {/* 시안 stroke는 #a5a5a5. 값이 정확히 맞는 content 토큰이 disabled/primary뿐이라
          이름은 어긋나지만 그 토큰을 쓴다(다크에서도 밝아져 동작이 맞다). */}
      <ChevronRight aria-hidden className="text-content-disabled-primary size-6 shrink-0" />
    </>
  );

  return (
    <li className="w-full">
      {href === undefined ? (
        <button className={ROW_CLASS} onClick={showComingSoon} type="button">
          {content}
        </button>
      ) : (
        <Link className={ROW_CLASS} href={href}>
          {content}
        </Link>
      )}
    </li>
  );
}

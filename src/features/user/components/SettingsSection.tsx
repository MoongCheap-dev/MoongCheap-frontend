import type { ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';

// 마이페이지의 흰 카드 한 장. 제목 + (선택) 우측 이동 링크 + 내용으로 이루어진다.
// B-26의 "진행중인 주문내역"·"설정", B-24의 "계정 설정"이 전부 같은 껍데기다.
//
// 우측 링크를 ReactNode로 받지 않고 경로·라벨로 받는다. 페이지(조립 담당)에 마크업이
// 흘러들어가지 않게 하려는 것이다.
//
// `actionLabel`만 주고 `actionHref`를 비우면 MVP 미구현 진입점으로 보고 '준비 중' 토스트를 띄운다.

interface SettingsSectionProps {
  title: string;
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
}

const ACTION_CLASS =
  'text-body-14 text-content-quarternary flex h-[30px] shrink-0 items-center gap-1 px-1';

export function SettingsSection({
  title,
  actionHref,
  actionLabel,
  children,
}: SettingsSectionProps) {
  const action =
    actionLabel === undefined ? null : (
      <>
        {actionLabel}
        <ChevronRight aria-hidden className="size-5" />
      </>
    );

  return (
    <section className="bg-background-default rounded-12 flex w-full flex-col gap-3 p-4">
      <div className="flex w-full items-start justify-between gap-1">
        <h2 className="text-title-18 text-content-primary min-w-0 flex-1">{title}</h2>

        {action !== null &&
          (actionHref === undefined ? (
            <ComingSoonButton className={ACTION_CLASS}>{action}</ComingSoonButton>
          ) : (
            <Link className={ACTION_CLASS} href={actionHref}>
              {action}
            </Link>
          ))}
      </div>

      {children}
    </section>
  );
}

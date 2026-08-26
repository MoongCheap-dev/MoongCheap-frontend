import type { ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// 마이페이지의 흰 카드 한 장. 제목 + (선택) 우측 이동 링크 + 내용으로 이루어진다.
// B-26의 "진행중인 주문내역"·"설정", B-24의 "계정 설정"이 전부 같은 껍데기다.
//
// 우측 링크를 ReactNode로 받지 않고 경로·라벨로 받는다. 페이지(조립 담당)에 마크업이
// 흘러들어가지 않게 하려는 것이다.

interface SettingsSectionProps {
  title: string;
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
}

export function SettingsSection({
  title,
  actionHref,
  actionLabel,
  children,
}: SettingsSectionProps) {
  return (
    <section className="bg-background-default rounded-12 flex w-full flex-col gap-3 p-4">
      <div className="flex w-full items-start justify-between gap-1">
        <h2 className="text-title-18 text-content-primary min-w-0 flex-1">{title}</h2>

        {actionHref !== undefined && actionLabel !== undefined && (
          <Link
            className="text-body-14 text-content-quarternary flex h-[30px] shrink-0 items-center gap-1 px-1"
            href={actionHref}
          >
            {actionLabel}
            <ChevronRight aria-hidden className="size-5" />
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}

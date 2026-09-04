'use client';

import { useState } from 'react';

import { ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';
import { ORDER_LIST_TABS, type OrderListTabKey } from '@/constants/orderStatus';
import { cn } from '@/lib/cn';
import type { OrderListItem } from '@/types/order';

import { OrderCard } from './OrderCard';
import { OrderListEmpty } from './OrderListEmpty';

// B-21 주문 내역 목록. 시안 `818:35719`(목록) · `453:26371`(빈 상태).
//
// 탭 상태만 client가 필요해 목록 전체를 이 조각이 맡는다. 조회는 page.tsx(서버)가 한다.
//
// 시안에 없어 명세를 따른 것 · 명세에 없어 시안을 따른 것은 각 지점에 주석으로 표시했다.

/** 시안 탭: 높이 36 · label-14. 선택된 칸만 흰 배경 + radius 8. */
const TAB_CLASS = 'text-label-14 flex h-9 flex-1 items-center justify-center p-2.5';

interface OrderListProps {
  /**
   * 주문과 그 상세 경로. 도메인 컴포넌트가 라우트 문자열을 갖지 않도록 경로는 호출부가 만든다.
   *
   * 콜백(`getDetailHref`)이 아니라 값으로 받는 이유는 서버 컴포넌트가 이 client 조각을
   * 렌더하기 때문이다. 함수 prop은 서버→클라이언트 경계를 넘지 못한다.
   */
  items: OrderListItem[];
}

export function OrderList({ items }: OrderListProps) {
  const [tab, setTab] = useState<OrderListTabKey>('all');

  const activeTab = ORDER_LIST_TABS.find((item) => item.key === tab) ?? ORDER_LIST_TABS[0];
  const visibleItems =
    activeTab.statuses === null
      ? items
      : items.filter(({ order }) =>
          (activeTab.statuses as readonly string[]).includes(order.status),
        );

  // 주문이 하나도 없으면 시안(453:26371)대로 탭·검색을 감추고 빈 상태만 보여 준다.
  if (items.length === 0) {
    return (
      <OrderListEmpty
        action={
          // '공구 하러가기'의 목적지가 시안에 없고, 공구 목록 화면도 아직 없다.
          <ComingSoonButton className="bg-surface-button-tertiary-default text-content-inverse text-button-14 rounded-20 flex h-10 w-32.75 items-center justify-center px-3">
            공구 하러가기
          </ComingSoonButton>
        }
      />
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex w-full flex-col gap-2 px-4 pt-3.25">
        {/* 탭. 시안은 3칸(전체·배송 준비중·완료)인데 어떤 상태를 묶는지가 없어, 매핑이 정의된
            명세 4종을 따랐다(constants/orderStatus.ts ORDER_LIST_TABS 주석 참고). */}
        <div
          className="bg-surface-button-quarternary-hover rounded-12 flex w-full items-center justify-between p-1"
          role="tablist"
        >
          {ORDER_LIST_TABS.map((item) => {
            const selected = item.key === tab;
            return (
              <button
                aria-selected={selected}
                className={cn(
                  TAB_CLASS,
                  selected
                    ? 'bg-background-default rounded-8 text-content-primary'
                    : 'rounded-4 text-content-tertiary',
                )}
                key={item.key}
                onClick={() => setTab(item.key)}
                role="tab"
                type="button"
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* 검색은 MVP 미포함이다(`BR-B21-01-10`). 시안에 있으니 그리고 동작만 막는다. */}
        <ComingSoonButton className="bg-surface-button-quarternary-hover rounded-24 text-label-12 text-content-disabled-primary flex h-8.5 w-full items-center justify-between px-3 py-2">
          구매한 상품/스토어/브랜드를 검색해보세요
          <Search aria-hidden className="size-5" />
        </ComingSoonButton>
      </div>

      {visibleItems.length === 0 ? (
        // 탭별 빈 목록은 시안이 없다(명세 `🖌️ 디자인 필요` 2번). 전체 빈 상태의 문구를 그대로
        // 쓰고 CTA는 뺐다. 탭 문구가 확정되면 여기만 고친다.
        <OrderListEmpty />
      ) : (
        <ol className="flex w-full flex-col gap-2 pt-2">
          {visibleItems.map(({ order, detailHref }) => (
            <li className="flex w-full flex-col gap-1" key={order.id}>
              <div className="flex w-full items-center justify-between px-4 py-2">
                <p className="text-label-16 text-content-primary">{order.orderedAt}</p>
                <Link
                  className="text-caption-12 text-content-primary flex shrink-0 items-center gap-0.5"
                  href={detailHref}
                >
                  주문상세
                  <ChevronRight aria-hidden className="size-4.5" />
                </Link>
              </div>

              <div className="w-full px-4">
                <OrderCard order={order} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

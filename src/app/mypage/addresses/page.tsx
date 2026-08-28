import type { Metadata } from 'next';
import Link from 'next/link';

import { AppBar } from '@/components/layout/AppBar';
import { AddressCard } from '@/features/user/components/AddressCard';
import { mockGetAddresses } from '@/mocks/address';

export const metadata: Metadata = {
  title: '배송지 목록',
};

// 시안의 + 아이콘(22px 박스 안 14px 글리프). lucide의 Plus는 획이 얇아 시안과 다르게 보여
// 경로를 그대로 옮겼다. 굵기·둥근 끝이 시안의 채워진 형태와 일치한다.
function PlusIcon() {
  return (
    <svg aria-hidden className="size-[22px] shrink-0" fill="currentColor" viewBox="0 0 22 22">
      <path d="M17.1328 10.1328C17.6118 10.1328 18 10.521 18 11C18 11.479 17.6118 11.8672 17.1328 11.8672H11.8672V17.1328C11.8672 17.6118 11.479 18 11 18C10.521 18 10.1328 17.6118 10.1328 17.1328V11.8672H4.86721C4.38824 11.8672 4.00003 11.479 4 11C4 10.521 4.38821 10.1328 4.86721 10.1328H10.1328V4.86721C10.1328 4.38821 10.521 4 11 4C11.479 4 11.8672 4.38821 11.8672 4.86721V10.1328H17.1328Z" />
    </svg>
  );
}

// B-30 배송지 목록. 마이페이지 설정에서 진입한다. `FN-B30-01`.
//
// 2026-08-27 주문·결제 순서가 뒤집히면서 결제 성공 후 배송지 입력에서도 이 화면을 거치게
// 됐다. 진입 경로가 둘이므로 뒤로 가기를 history가 아니라 경로로 받는 AppBar 규약이 여기서
// 값을 한다. 주문 쪽 진입이 붙으면 backHref를 그쪽에서 다르게 넘긴다.
//
// 빈 목록에도 안내 문구가 없다(시안). 추가 버튼만 남으므로 EmptyState를 쓰지 않는다.
export default async function AddressListPage() {
  const addresses = await mockGetAddresses();

  return (
    <main className="bg-background-default flex w-full flex-1 flex-col pb-6">
      <AppBar backHref="/mypage" title="배송지 목록" />

      <div className="flex w-full flex-col gap-5 px-4 pt-5">
        {/* 시안의 빈 목록 프레임은 '신규 배송지 추가', 카드가 있는 프레임은 '새 배송지 추가'로
            문구가 다르다. 같은 버튼이므로 하나로 통일했다. 어느 쪽이 정본인지 확인 필요. */}
        <Link
          className="bg-surface-secondary text-label-14 text-content-tertiary rounded-8 active:bg-surface-button-quarternary-pressed flex w-full items-center justify-center gap-1 py-3"
          href="/mypage/addresses/new"
        >
          <PlusIcon />새 배송지 추가
        </Link>

        {addresses.length > 0 && (
          <ul className="flex w-full flex-col gap-5">
            {addresses.map((address) => (
              <AddressCard
                address={address}
                editHref={`/mypage/addresses/${address.id}/edit`}
                key={address.id}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

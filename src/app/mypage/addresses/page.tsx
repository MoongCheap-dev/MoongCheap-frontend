import type { Metadata } from 'next';
import Link from 'next/link';

import { AppBar } from '@/components/layout/AppBar';
import { ADDRESS_MAX } from '@/constants/businessRules';
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
// 2026-08-27 주문·결제 순서가 뒤집히면서 결제 성공 후에도 배송지를 입력하게 됐다. 다만 그
// 진입 경로(B-15 결제 화면)는 아직 만들어지지 않았고 라우트도 확정되지 않았다. 지금은 마이페이지
// 진입 하나뿐이라 backHref를 /mypage로 고정한다.
//
// 주문 쪽 진입이 생기면 그때 복귀 경로를 받아야 한다. 뒤로 가기를 history가 아니라 경로로 받는
// AppBar 규약이라 페이지가 값만 바꿔 넘기면 되고, 그 시점에 허용 목록 검증을 함께 넣는다.
//
// 빈 목록에도 안내 문구가 없다(시안). 추가 버튼만 남으므로 EmptyState를 쓰지 않는다.
export default async function AddressListPage() {
  const addresses = await mockGetAddresses();
  const isEmpty = addresses.length === 0;
  const isFull = addresses.length >= ADDRESS_MAX;

  return (
    <main className="bg-background-default flex w-full flex-1 flex-col pb-6">
      <AppBar backHref="/mypage" title="배송지 목록" />

      <div className="flex w-full flex-col gap-5 px-4 pt-5">
        {/* 시안이 상태별로 문구가 다르다. 빈 목록(453:25757)은 '신규 배송지 추가',
            카드가 있는 목록(453:25765)은 '새 배송지 추가'다. 같은 버튼이라 통일하고 싶지만
            문구는 디자인 결정이라 시안 그대로 둔다. 의도인지 확인 후 한쪽으로 정리한다.

            상한 도달 상태는 시안이 없다(FN-B30-01에 '디자인 필요'로 남아 있다). 링크를 죽이면
            눌러도 반응이 없어 고장으로 보이므로, 이동만 막고 문구로 이유를 알린다. 문구는
            같은 규칙을 쓰는 B-14의 '카드는 최대 5개까지 등록할 수 있어요'를 따랐다. */}
        {isFull ? (
          <p className="bg-surface-disabled-secondary text-label-14 text-content-disabled-secondary rounded-8 flex w-full items-center justify-center gap-1 py-3">
            배송지는 최대 {ADDRESS_MAX}개까지 등록할 수 있어요
          </p>
        ) : (
          <Link
            className="bg-surface-secondary text-label-14 text-content-tertiary rounded-8 active:bg-surface-button-quarternary-pressed flex w-full items-center justify-center gap-1 py-3"
            href="/mypage/addresses/new"
          >
            <PlusIcon />
            {isEmpty ? '신규 배송지 추가' : '새 배송지 추가'}
          </Link>
        )}

        {!isEmpty && (
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

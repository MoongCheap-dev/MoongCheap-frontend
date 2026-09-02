import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AppBar } from '@/components/layout/AppBar';
import { AddressForm } from '@/features/user/components/AddressForm';
import { mockGetAddress } from '@/mocks/address';

export const metadata: Metadata = {
  title: '배송지 수정',
};

// B-30 배송지 수정. 목록 카드의 '수정'으로 진입한다. `FN-B30-02`.
//
// 시안에 수정 프레임이 따로 없다. 기능정의서가 등록·수정을 한 화면으로 묶고 타이틀만
// '배송지 추가' / '배송지 수정'으로 가른다고 해서 폼을 그대로 재사용한다.
//
// 생성 타입(PageProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 params를
// 직접 타이핑한다(src/app/layout.tsx와 같은 이유).
export default async function AddressEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const address = await mockGetAddress(id);

  if (address === undefined) {
    notFound();
  }

  return (
    <main className="bg-background-default flex w-full flex-1 flex-col">
      <AppBar backHref="/mypage/addresses" title="배송지 수정" />
      {/* 기본배송지를 해제하면 기본이 0건이 된다. 다른 배송지를 기본으로 지정하는 방식으로만
          바꿀 수 있다(BR-B30-02-06). */}
      <AddressForm
        lockDefault={address.isDefault}
        successHref="/mypage/addresses"
        defaultValues={{
          postalCode: address.postalCode,
          address: address.address,
          addressDetail: address.addressDetail,
          entranceCode: address.entranceCode ?? '',
          // 저장된 값이 없다는 것은 '없음'을 골랐다는 뜻이다(스키마상 둘 중 하나는 채워진다).
          noEntranceCode: address.entranceCode === undefined,
          name: address.name,
          recipient: address.recipient,
          phone: address.phone,
          isDefault: address.isDefault,
        }}
      />
    </main>
  );
}

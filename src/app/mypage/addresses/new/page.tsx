import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { AddressForm } from '@/features/user/components/AddressForm';
import { mockGetAddresses } from '@/mocks/address';

export const metadata: Metadata = {
  title: '배송지 등록',
};

// B-30 배송지 등록. 목록의 '새 배송지 추가'로 진입한다. `FN-B30-02`.
//
// 폼 전체가 상태를 갖고 우편번호 팝업까지 띄워야 해서 본문은 클라이언트 컴포넌트다.
// 페이지는 셸(앱바)만 조립하고, 폼이 혼자서는 알 수 없는 목록 정보만 넘긴다.
export default async function AddressCreatePage() {
  const addresses = await mockGetAddresses();

  return (
    <main className="bg-background-default flex w-full flex-1 flex-col">
      <AppBar backHref="/mypage/addresses" title="배송지 등록" />
      {/* 첫 배송지는 무조건 기본이 된다(구성 요소 BR-04 "최초 등록 시 체크 + 비활성"). */}
      <AddressForm lockDefault={addresses.length === 0} successHref="/mypage/addresses" />
    </main>
  );
}

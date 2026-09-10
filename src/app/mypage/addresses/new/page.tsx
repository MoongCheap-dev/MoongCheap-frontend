import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { AddressCreateView } from '@/features/user/components/AddressCreateView';

export const metadata: Metadata = {
  title: '배송지 등록',
};

// B-30 배송지 등록. 목록의 '새 배송지 추가'로 진입한다. `FN-B30-02`.
//
// 폼 전체가 상태를 갖고 우편번호 팝업까지 띄워야 해서 본문은 클라이언트 컴포넌트다.
// 페이지는 셸(앱바)만 조립한다.
//
// 목록 조회와 저장 배선은 `AddressCreateView`가 맡는다. 세션이 SID httpOnly 쿠키라 서버
// 컴포넌트에서 조회할 수 없고, 저장 콜백은 함수 prop이라 서버→클라 경계를 못 넘는다.
export default function AddressCreatePage() {
  return (
    <main className="bg-background-default flex w-full flex-1 flex-col">
      <AppBar backHref="/mypage/addresses" title="배송지 등록" />
      <AddressCreateView successHref="/mypage/addresses" />
    </main>
  );
}

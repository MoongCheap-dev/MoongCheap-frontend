import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { PaymentMethodManager } from '@/features/user/components/PaymentMethodManager';
import { mockGetPaymentMethods } from '@/mocks/payment';

export const metadata: Metadata = {
  title: '결제수단 관리',
};

// B-14 결제수단 관리(FN-B14-01). 마이페이지 설정 '결제수단 등록 • 변경'에서 진입한다.
//
// 목록 조회만 서버에서 하고, 모드 전환·기본변경 같은 상호작용은 PaymentMethodManager(client)가 맡는다.
// 마이페이지 셸이 background/subtle을 깔지만 이 화면은 카드 배경이 흰 바탕이라 background/default로 덮는다.
//
// backHref는 /mypage로 고정한다. 기본변경 모드 → 조회 모드로 되돌리는 단계별 백(BR-B14-01-13)은
// 뒤로가기 가로채기가 필요해 mock 범위에서 제외했다(Manager 주석 참고).
export default async function PaymentMethodsPage() {
  const methods = await mockGetPaymentMethods();

  return (
    <main className="bg-background-default flex w-full flex-1 flex-col">
      <AppBar backHref="/mypage" title="결제수단 관리" />
      <PaymentMethodManager initialMethods={methods} />
    </main>
  );
}

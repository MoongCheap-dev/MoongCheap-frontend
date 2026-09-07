import { BottomNav } from '@/components/layout/BottomNav';

// 하단 탭바를 쓰는 화면들의 셸. 모바일 전용 시안이라 마이페이지·주문 셸과 같은 폭(393px)이다.
// 생성 타입(LayoutProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 children을
// 직접 타이핑한다.
//
// ⚠️ 지금은 홈만 이 그룹에 있다. 마이페이지(`/mypage`)와 주문(`/orders`)은 열려 있는 PR
// #51 · #53 · #56 · #58이 각자의 layout.tsx를 물고 있어 지금 옮기면 충돌한다. 네 PR이
// 머지된 뒤 별도 이슈로 옮긴다.
//
// 아래 여백은 시안 실측이다. 콘텐츠 끝(y=4149)과 탭바 위(y=4200) 사이가 51, 탭바가 64.
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-mobile bg-background-default mx-auto flex min-h-svh w-full flex-col pb-[calc(115px+env(safe-area-inset-bottom))]">
      {children}
      <BottomNav />
    </div>
  );
}

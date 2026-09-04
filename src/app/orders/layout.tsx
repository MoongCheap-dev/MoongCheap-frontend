// 주문 화면 셸. 모바일 전용 시안이라 마이페이지 셸과 같은 폭(393px)으로 중앙 고정한다.
// 마이페이지와 달리 배경이 흰색이다(시안 818:35719).
//
// 생성 타입(LayoutProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 children을
// 직접 타이핑한다.
export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-mobile bg-background-default mx-auto flex min-h-svh w-full flex-col">
      {children}
    </div>
  );
}

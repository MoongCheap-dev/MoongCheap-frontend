// 마이페이지 셸. 모바일 전용 시안이라 인증 셸과 같은 폭(393px)으로 중앙 고정한다.
// 생성 타입(LayoutProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 children을 직접 타이핑한다.
//
// 라우트 그룹((shop) 등)을 만들지 않은 이유는 홈 시안이 없어 하단탭 구성이 미정이기 때문이다.
// 하단탭이 확정되면 이 셸을 그룹 레이아웃으로 옮긴다.
export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-mobile bg-background-subtle mx-auto flex min-h-svh w-full flex-col">
      {children}
    </div>
  );
}

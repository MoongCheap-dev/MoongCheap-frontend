// 인증 화면 전용 셸. 로그인 전에는 헤더와 하단탭을 띄우지 않기 위해 라우트 그룹으로 분리했다.
// 생성 타입(LayoutProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 children을 직접 타이핑한다.
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 모바일 전용 디자인이므로 인증 화면은 여기서 모바일 폭(393px)으로 중앙 고정한다.
  // 393 = Figma 기준 폭(Responsive_Size). 태블릿/웹 브레이크포인트가 확정되면 여기에 반응형을 얹는다.
  return (
    <div className="max-w-mobile mx-auto flex min-h-svh w-full flex-col justify-center px-4 py-10">
      <main className="w-full">{children}</main>
    </div>
  );
}

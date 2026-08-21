// 인증 화면 전용 셸. 로그인 전에는 헤더와 하단탭을 띄우지 않기 위해 라우트 그룹으로 분리했다.
// 생성 타입(LayoutProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 children을 직접 타이핑한다.
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col justify-center px-4 py-10">
      {/* 화면 폭은 루트 레이아웃(body)에서 고정한다. 여기서는 좌우 여백·세로 정렬만 담당. */}
      <main className="w-full">{children}</main>
    </div>
  );
}

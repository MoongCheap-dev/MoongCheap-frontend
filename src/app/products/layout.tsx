import { MobileScreenShell } from '@/components/layout/MobileScreenShell';

// 상품 화면 셸. 모바일 전용 시안이라 주문·수요 셸과 같은 폭(393px)으로 중앙 고정하고 배경은
// 흰색이다(B-08 시안 배경 background/default) — 공용 MobileScreenShell 기본값 그대로.
//
// 하단 고정 CTA가 이 컬럼(min-h-svh flex-col) 안에서 sticky로 붙으므로 BottomNav 그룹에
// 두지 않는다 — 상품 상세는 GNB 없이 뒤로가기로만 빠져나온다.
//
// 생성 타입(LayoutProps)은 `next build` 전에 존재하지 않아 typecheck에서 깨지므로 children을
// 직접 타이핑한다.
export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MobileScreenShell>{children}</MobileScreenShell>;
}

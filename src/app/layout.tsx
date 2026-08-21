import type { Metadata, Viewport } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'MoongCheap',
  description: '수요 집결형 공동구매 플랫폼 뭉치',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Next.js가 생성하는 전역 LayoutProps 타입은 `next build` 전에는 존재하지 않는다.
// CI가 build보다 typecheck를 먼저 돌리므로 children을 직접 타이핑한다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 모바일 전용 디자인이므로 앱 전체를 모바일 폭으로 중앙 고정한다. 393 = Figma 기준 폭
  // (Responsive_Size). 태블릿/웹 브레이크포인트가 확정되면 이 값에 반응형을 얹는다.
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="bg-background mx-auto flex min-h-svh w-full max-w-[393px] flex-col">
        {children}
      </body>
    </html>
  );
}

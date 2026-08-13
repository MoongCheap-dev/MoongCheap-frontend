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
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

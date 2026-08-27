import type { Metadata, Viewport } from 'next';

import { ToastProvider } from '@/components/ui/Toast';

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
  // body는 배경만 책임진다. 모바일 폭 고정(393px)은 인증 화면 셸((auth)/layout.tsx) 등
  // 각 라우트 그룹에서 준다. 셀러 화면(사이드바)처럼 전체 폭이 필요한 레이아웃도 있어
  // 전역에 폭을 고정하면 다크모드에서 393px 바깥 배경이 비고 사이드바가 잘린다.
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="bg-background-default min-h-svh">
        {/* 전역 토스트. children은 server 컴포넌트로 유지된다(client Provider의 자식 slot이라 경계를 넘지 않음). */}
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

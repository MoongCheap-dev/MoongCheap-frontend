'use client';

import type { ReactNode } from 'react';

import { useToast } from '@/components/ui/Toast';

// MVP 미구현(잠정 보관) 기능의 진입점 버튼. 외형은 평상시 버튼 그대로 두되, 탭하면 이동 대신
// '준비 중인 기능이에요' 토스트를 띄운다. 기능정의서 머리말 규칙("미구현 기능 진입점은 노출하되,
// 탭 시 토스트를 노출한다")을 따르며, SettingsNavRow(href 없을 때)와 같은 방침이다.
//
// 서버 컴포넌트(page.tsx 등)에서 useToast를 직접 못 쓰므로, 이 얇은 client 래퍼로 감싼다.
// className은 호출부가 준다 — 자리마다 외형이 달라서다(홈=코랄 전체폭 CTA, 로그인 nav=텍스트 링크).

interface ComingSoonButtonProps {
  children: ReactNode;
  className?: string;
}

export function ComingSoonButton({ children, className }: ComingSoonButtonProps) {
  const { showComingSoon } = useToast();

  return (
    <button type="button" onClick={showComingSoon} className={className}>
      {children}
    </button>
  );
}

'use client';

import type { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

// 브라우저 히스토리의 이전 항목으로 돌아가는 버튼. 404(not-found.tsx)가 쓴다.
//
// 서버 컴포넌트에서 useRouter를 직접 못 쓰므로 이 얇은 client 래퍼로 감싼다.
// ComingSoonButton과 같은 방침이다 — 상태가 필요한 조각만 잘라 내고 페이지는 서버에 둔다.
// className은 호출부가 준다.

interface GoBackButtonProps {
  children: ReactNode;
  className?: string;
}

export function GoBackButton({ children, className }: GoBackButtonProps) {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={className}>
      {children}
    </button>
  );
}

'use client';

import type { ReactNode } from 'react';

import { useToast } from '@/components/ui/Toast';

// MVP 미구현 진입점. 시안대로 그리되 탭하면 '준비 중인 기능이에요' 토스트를 띄운다.
//
// 기능정의서 머리말과 의사결정 기록(2026-08-28)이 "미구현 진입점 인터랙션은 토스트 일괄 표시"로
// 정하고 있다. 진입점을 감추면 시안의 목록·버튼 구성이 무너지고, 링크로 두면 없는 화면으로 이동해
// 404가 난다.
//
// 겉모습은 호출부가 정한다. 같이 놓이는 <Link>와 같은 className을 넘겨 한 줄에 섞여도 티가 나지
// 않게 한다. 토스트 호출만 여기로 모으는 이유는 호출부(마이페이지·프로필 설정)가 async 서버
// 컴포넌트라 콜백을 prop으로 내려보낼 수 없기 때문이다. 이 리프만 클라이언트 경계가 된다.

interface ComingSoonButtonProps {
  className: string;
  children: ReactNode;
}

export function ComingSoonButton({ children, className }: ComingSoonButtonProps) {
  const { showComingSoon } = useToast();

  return (
    <button className={className} onClick={showComingSoon} type="button">
      {children}
    </button>
  );
}

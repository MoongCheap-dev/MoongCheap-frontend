'use client';

import { useState, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 전역 클라이언트 상태(TanStack Query) 경계. #70에서 세션 조회(GET /api/members/me)를 전역
// 공유 캐시로 확립하며 도입했다(CLAUDE.md가 상태관리를 "필요한 시점"으로 미뤄 둔 지점).
//
// 서버 상태(세션·프로필 등)는 별도 전역 스토어가 아니라 queryKey로 공유되는 캐시로 다룬다.
// 세션은 ['session'] 키 하나에 담기고, useSession을 호출하는 어느 컴포넌트든 같은 캐시를
// 보며(중복 요청은 Query가 병합), 로그아웃이 그 캐시를 비운다.

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 조회 화면이 리렌더마다 재요청하지 않도록 기본 신선도 시간을 둔다. 세션·프로필처럼
        // 자주 바뀌지 않는 데이터에 맞춘 값이며, 개별 쿼리에서 필요하면 덮어쓴다.
        staleTime: 60_000,
        // 미로그인(401)까지 재시도하면 로그인 판정이 늦어진다. 세션 쿼리는 retry:false로 더 조인다.
        retry: 1,
      },
    },
  });
}

export function Providers({ children }: { children: ReactNode }) {
  // QueryClient를 렌더마다 새로 만들면 캐시가 초기화된다. useState 초기화 함수로 인스턴스를
  // 한 번만 생성한다(App Router 표준 패턴). 브라우저 탭마다 독립이며 서버로 공유되지 않는다.
  const [queryClient] = useState(makeQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

// 소셜 로그인 콜백 도착 후 이동만 담당하는 클라이언트 컴포넌트.
// 페이지는 서버 컴포넌트(metadata 유지)로 두고, 내비게이션만 여기서 처리한다. 화면에 그리는 것은 없다.
export function OAuthCallbackRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 콜백 도착 = 로그인 성공(실패는 백엔드가 /oauth/failed로 보냄). 홈으로 보낸다.
    // replace로 히스토리를 남기지 않아 뒤로가기가 콜백으로 돌아오지 않는다.
    // TODO(별도 이슈): 전역 세션 조회가 생기면 여기서 사용자 정보 refetch 후 이동하도록 확장한다.
    router.replace('/');
  }, [router]);

  return null;
}

import type { Metadata } from 'next';

import { OAuthCallbackRedirect } from '../../_components/OAuthCallbackRedirect';

export const metadata: Metadata = {
  title: '로그인 처리 중',
};

// 소셜 로그인(카카오·구글) 성공 착지 경로(#18). 백엔드가 code 교환과 SID(httpOnly 쿠키) 세션
// 발급을 마친 뒤 이 경로로 리다이렉트한다. 즉 여기 도착 = 로그인 성공이며(실패는 /oauth/failed로 감),
// 토큰은 쿼리로 오지 않고 쿠키에 있어 프론트가 파싱할 것이 없다. 지금은 홈으로 보내기만 한다.
// 전역 로그인 상태(세션 조회) 배선은 별도 이슈에서 다룬다.
export default function OAuthCallbackPage() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm">로그인 처리 중입니다</p>
      <p className="text-muted text-sm">잠시만 기다려 주세요</p>
      <OAuthCallbackRedirect />
    </div>
  );
}

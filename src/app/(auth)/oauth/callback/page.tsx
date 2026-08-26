import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 처리 중',
};

// 소셜 로그인(카카오·구글) 채택 예정(피그마 디자인 확인). 백엔드 OAuth 규격 확정 전이라 자리만 잡아 둔다.
// 제공자가 이 경로로 리다이렉트하면, 여기서 세션 확립 후 이동시킨다.
export default function OAuthCallbackPage() {
  return (
    // main(flex-1)을 채워 상하좌우 중앙 정렬한다.
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <p className="text-sm">로그인 처리 중입니다</p>
      <p className="text-content-quarternary text-sm">잠시만 기다려 주세요</p>
    </div>
  );
}

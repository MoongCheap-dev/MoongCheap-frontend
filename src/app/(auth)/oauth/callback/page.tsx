import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 처리 중',
};

// 소셜 로그인(카카오·구글) 채택 여부가 확정되지 않아 자리만 잡아 둔다.
// 채택되면 제공자가 이 경로로 리다이렉트하며, 여기서 세션 확립 후 이동시킨다.
// 채택되지 않으면 이 라우트를 삭제한다.
export default function OAuthCallbackPage() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm">로그인 처리 중입니다</p>
      <p className="text-muted text-sm">잠시만 기다려 주세요</p>
    </div>
  );
}

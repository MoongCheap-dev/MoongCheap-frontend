import { redirect } from 'next/navigation';

// 소셜 로그인(카카오·구글) 성공 착지 경로(#18). 백엔드가 code 교환과 SID(httpOnly 쿠키) 세션
// 발급을 마친 뒤 이 경로로 리다이렉트한다(실패는 /oauth/failed로 감). 토큰은 쿼리로 오지 않고
// 쿠키에 있어 프론트가 파싱할 것이 없다.
//
// 다만 백엔드 OAuth 성공 핸들러는 약관 미동의(=최초 소셜 유저)를 `?status=incomplete`로 되돌린다.
// 이때는 아직 가입이 미완이라 `IncompleteSignupFilter`가 다른 API를 막으므로, 약관 동의+닉네임을
// 받는 완료 화면(/oauth/complete)으로 보낸다. 완료 유저(재로그인)는 곧장 홈으로 넘겨 '처리 중'
// 화면 플래시 없이 이동시킨다.
// TODO(후속): 전역 세션 조회(GET /api/members/me)가 생기면 홈 이동 전에 사용자 정보를 확립한다.
export default async function OAuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const { status } = await searchParams;
  const value = Array.isArray(status) ? status[0] : status;

  if (value === 'incomplete') {
    redirect('/oauth/complete');
  }
  redirect('/');
}

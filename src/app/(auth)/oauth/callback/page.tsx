import { redirect } from 'next/navigation';

// 소셜 로그인(카카오·구글) 성공 착지 경로(#18). 백엔드가 code 교환과 SID(httpOnly 쿠키) 세션
// 발급을 마친 뒤 이 경로로 리다이렉트한다. 즉 여기 도착 = 로그인 성공이며(실패는 /oauth/failed로 감),
// 토큰은 쿼리로 오지 않고 쿠키에 있어 프론트가 파싱할 것이 없다. 서버에서 곧장 홈으로 넘겨
// '처리 중' 화면 플래시 없이 이동시킨다.
// TODO(별도 이슈): 전역 세션 조회가 생기면 이동 전에 사용자 정보를 확립하도록 확장한다.
export default function OAuthCallbackPage() {
  redirect('/');
}

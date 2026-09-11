import { SplashScreen } from '@/features/auth/components/SplashScreen';

// ⚠️ 검수용 임시 라우트다. 배선이 끝나면 이 파일만 지운다.
//
// 스플래쉬는 독립 화면이 아니라 로그인(B-01)이 세션을 확인하는 동안 띄우는 구성 요소다
// (기능명세서 FN-B01-03). 그래서 원래는 URL이 없다. 다만 지금은 전환 기준 시간이 정해지지
// 않아 B-01에 붙일 수 없고, 붙인다 해도 세션 확인이 수십 ms에 끝나면 눈으로 볼 수가 없다.
// 시안 대조와 애니메이션 확인을 위해 주소를 하나 열어 둔다.
//
//   /splash                  기본        시안 1318:13032
//   /splash?variant=loading  로딩 지연   시안 1372:6186 「후보2」

export default async function SplashPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string | string[] }>;
}) {
  const { variant } = await searchParams;

  return <SplashScreen variant={variant === 'loading' ? 'loading' : 'default'} />;
}

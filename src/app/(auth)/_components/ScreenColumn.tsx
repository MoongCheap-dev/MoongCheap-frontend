import type { ReactNode } from 'react';

// AuthLayout의 main(flex-1 세로 컬럼)을 채우는 화면 컬럼. 자식 중 하단 CTA에 mt-auto를 주면
// 바닥에 고정된다(Figma 7-1·10). 뷰포트 높이를 직접 계산하지 않고 부모를 flex-1로 채우므로
// AuthLayout의 패딩이 바뀌어도 안전하다. 회원가입 각 스텝 화면과 완료 화면이 공유한다.
export function ScreenColumn({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>;
}

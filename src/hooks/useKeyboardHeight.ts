'use client';

import { useEffect, useState } from 'react';

// 모바일 소프트 키보드가 화면 하단을 가리는 높이(px)를 추적한다.
// 기본 동작(interactive-widget=resizes-visual)에서는 키보드가 올라와도 레이아웃 뷰포트
// (window.innerHeight)는 그대로고 visualViewport.height만 줄어든다. 그 차이가 곧 키보드 높이다.
// visualViewport가 없거나(구형 브라우저) 데스크톱·SSR이면 0을 반환한다.
//
// 키보드 열림/닫힘은 visualViewport 'resize'로 잡는다. 'scroll'(핀치줌 팬 등)은 프레임마다
// 발생해 리렌더를 유발하고 CTA를 흔들리게 하므로 구독하지 않는다.
//
// 회원가입 하단 CTA를 키보드 위로 끌어올리는 데 쓴다(Figma 7-2. 이메일-focus).
export function useKeyboardHeight(): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (vv === null) {
      return;
    }

    const update = () => {
      // 레이아웃 뷰포트 - (보이는 높이 + 상단 오프셋) = 하단이 가려진 양.
      // 포커스 스크롤로 offsetTop이 생겨도 가려진 실제 높이만 남긴다. 음수는 0으로 클램프.
      const covered = window.innerHeight - vv.height - vv.offsetTop;
      setHeight(covered > 1 ? Math.round(covered) : 0);
    };

    update();
    vv.addEventListener('resize', update);
    return () => {
      vv.removeEventListener('resize', update);
    };
  }, []);

  return height;
}

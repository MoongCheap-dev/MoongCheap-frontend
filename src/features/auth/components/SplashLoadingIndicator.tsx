import { SPLASH_MESSAGES } from '@/constants/splashMessages';

// 로딩 지연 스플래쉬의 하단 묶음. 시안 「후보2」 `1372:6195`.
//
// 실측(프레임 393x852 기준): 묶음 폭 194 · 진행바 높이 4.85 · 진행바와 문구 사이 12 ·
// 문구와 점 사이 8 · 점 27x6.
//
// ⚠️ 진행바는 실제 진행률이 아니다. 세션 확인은 요청 한 건이라 퍼센트를 셀 근거가 없어서
//    연출로만 차오른다(`app/animations.css`). 진행률로 바꾸기로 정해지면 폭을 상태로 준다.
//
// ⚠️ 회색은 시맨틱이 아니라 **프리미티브** 토큰(`coolgray-200` = #e6e6e6)을 쓴다.
//
//    시안은 `surface-disabled`에 묶여 있는데, 그 시맨틱 토큰의 다크 값은 #575757이다. 코랄
//    배경 위에 짙은 회색이 얹혀 진행바가 꺼진 것처럼 보인다. 스플래쉬는 두 모드에서 같은
//    브랜드 화면이라 여기서 색이 뒤집히면 안 된다.
//
//    라이트·다크가 같은 값인 시맨틱 토큰은 없다(전수 확인). 프리미티브는 생성기가 '모드와
//    무관한 값' 블록으로 내보내서(build-tokens.mjs) 두 모드에서 같은 값이 보장된다. 디자인이
//    준 토큰 파일에서 나온 이름이라 hex를 직접 박는 것과는 다르다.
//
//    코랄 배경 위 트랙용 시맨틱 토큰이 생기면 그쪽으로 옮긴다.

export function SplashLoadingIndicator() {
  return (
    <div className="flex w-[194px] flex-col items-center gap-3">
      {/* 트랙. 채움은 scaleX로 움직여서 트랙 밖으로 나가지 않게 감싼다. */}
      <div className="rounded-round bg-coolgray-200 h-[4.85px] w-full overflow-hidden">
        <div className="splash-progress-fill bg-content-oncolor h-full w-full" />
      </div>

      <div className="flex items-center gap-2">
        <p className="text-caption-14 text-content-oncolor">{SPLASH_MESSAGES.loading}</p>

        {/* 시안 컴포넌트 `3 Dots/Jumping`. 원본이 원 3개뿐이라 SVG 파일 대신 마크업으로 옮겼다.
            애니메이션이 붙어야 해서 이쪽이 다루기 쉽다. 지름 6 · 사이 간격 4.5 → 전체 폭 27. */}
        <span aria-hidden className="flex items-center gap-[4.5px]">
          <span className="splash-dot rounded-round bg-coolgray-200 size-1.5" />
          <span className="splash-dot rounded-round bg-coolgray-200 size-1.5" />
          <span className="splash-dot rounded-round bg-coolgray-200 size-1.5" />
        </span>
      </div>
    </div>
  );
}

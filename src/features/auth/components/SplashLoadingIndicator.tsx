import { SPLASH_MESSAGES } from '@/constants/splashMessages';

// 로딩 지연 스플래쉬의 하단 묶음. 시안 「후보2」 `1372:6195`.
//
// 실측(프레임 393x852 기준): 묶음 폭 194 · 진행바 높이 4.85 · 진행바와 문구 사이 12 ·
// 문구와 점 사이 8 · 점 27x6.
//
// ⚠️ 진행바는 실제 진행률이 아니다. 세션 확인은 요청 한 건이라 퍼센트를 셀 근거가 없어서
//    연출로만 차오른다(`app/animations.css`). 진행률로 바꾸기로 정해지면 폭을 상태로 준다.
//
// ⚠️ 회색 #e6e6e6은 토큰을 안 쓰고 값을 박았다. 시안이 `surface-disabled`(라이트 #e6e6e6)에
//    묶여 있는데 그 토큰의 다크 값은 #575757이라, 코랄 배경 위에 짙은 회색이 얹혀 진행바가
//    꺼진 것처럼 보인다. 이 화면은 두 모드에서 같은 브랜드 화면이라 값을 고정하는 쪽이 맞다
//    (소셜 로그인 버튼의 카카오 노랑·네이버 초록과 같은 처리).

export function SplashLoadingIndicator() {
  return (
    <div className="flex w-[194px] flex-col items-center gap-3">
      {/* 트랙. 채움은 scaleX로 움직여서 트랙 밖으로 나가지 않게 감싼다. */}
      <div className="rounded-round h-[4.85px] w-full overflow-hidden bg-[#e6e6e6]">
        <div className="splash-progress-fill bg-content-oncolor h-full w-full" />
      </div>

      <div className="flex items-center gap-2">
        <p className="text-caption-14 text-content-oncolor">{SPLASH_MESSAGES.loading}</p>

        {/* 시안 컴포넌트 `3 Dots/Jumping`. 원본이 원 3개뿐이라 SVG 파일 대신 마크업으로 옮겼다.
            애니메이션이 붙어야 해서 이쪽이 다루기 쉽다. 지름 6 · 사이 간격 4.5 → 전체 폭 27. */}
        <span aria-hidden className="flex items-center gap-[4.5px]">
          <span className="splash-dot rounded-round size-1.5 bg-[#e6e6e6]" />
          <span className="splash-dot rounded-round size-1.5 bg-[#e6e6e6]" />
          <span className="splash-dot rounded-round size-1.5 bg-[#e6e6e6]" />
        </span>
      </div>
    </div>
  );
}

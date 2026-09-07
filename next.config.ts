import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    /**
     * 변환할 이미지 폭을 실제 사용처로 좁힌다.
     *
     * 자체 호스팅에서 `next/image`는 요청된 (원본, 폭, 품질) 조합마다 Node 프로세스 안의
     * sharp로 변환하고 그 결과를 캐시한다. 기본값은 `deviceSizes` 8종 + `imageSizes` 8종이라
     * 쓰이지도 않는 크기까지 변환·캐시될 수 있다. 이 앱은 모바일 전용 시안(`max-w-mobile`
     * 393px)이고 컴포넌트가 `sizes`를 고정값으로 넘기므로 필요한 폭이 정해져 있다.
     *
     * 값의 근거는 각 컴포넌트의 `sizes` 실측치와 그 2배(레티나)다.
     *   배너 393 · 브랜드딜 260 · 상품카드 121 · 와이드 120 · 브랜드행 106 · 행 65 · 주문 60
     */
    deviceSizes: [393, 786],
    imageSizes: [60, 65, 106, 120, 121, 130, 212, 242, 260, 520],

    /**
     * 변환 결과 캐시 수명. 목 이미지는 파일명이 바뀌지 않으면 내용도 안 바뀌고, 실제 데이터는
     * 업로드마다 URL이 달라진다. 짧게 잡을 이유가 없다.
     */
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;

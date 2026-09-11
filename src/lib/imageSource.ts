/**
 * `next/image`에 넘겨도 되는 경로인지 판정한다.
 *
 * 자체 호스팅 `next/image`는 **절대 URL을 `images.remotePatterns`에 등록된 호스트에 대해서만**
 * 처리한다. 등록되지 않은 호스트를 주면 최적화 단계에서 예외가 나고 그 화면이 통째로 죽는다.
 *
 *   Error: Invalid src prop (https://…) on `next/image`, hostname "…" is not configured
 *          under images in your `next.config.js`
 *
 * 지금 `next.config.ts`에는 `remotePatterns`가 없다. 이미지 호스트가 정해지지 않았기 때문이다
 * (백엔드 시드는 `https://example.com/thumb/1.jpg` 같은 자리표시자다). 그렇다고 `hostname: '**'`로
 * 열면 우리 서버가 아무 URL이나 받아 내려받고 변환해 주는 이미지 프록시가 된다. 남의 대역폭·
 * 내부망 주소로 요청을 유도할 수 있어 열어 두면 안 된다.
 *
 * 그래서 호스트가 확정될 때까지는 **앱이 직접 서빙하는 경로만** 통과시킨다. 절대 URL은 그리지 않고
 * 호출부가 회색 자리를 그린다. 화면이 죽는 것보다 이미지 한 장이 비는 편이 낫다.
 *
 * 실제 이미지 호스트가 정해지면 `next.config.ts`에 `remotePatterns` 항목을 넣고 이 가드를 지운다.
 */
export function isRenderableImageSrc(src: string | null | undefined): src is string {
  if (src === null || src === undefined || src === '') {
    return false;
  }
  // `//example.com/a.png`(프로토콜 상대)도 외부 주소다. 슬래시 하나로 시작하는 것만 통과시킨다.
  return src.startsWith('/') && !src.startsWith('//');
}

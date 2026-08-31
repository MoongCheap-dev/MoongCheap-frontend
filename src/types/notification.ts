/**
 * 알림 설정(B-25) 화면이 요구하는 타입.
 *
 * `types/user.ts`와 같은 원칙이다. 백엔드 응답을 옮긴 것이 아니라 **화면이 필요로 하는 모양**이며,
 * 규격이 나오면 API 계층에서 변환해 이 타입으로 맞춘다.
 */

/**
 * 마케팅 정보 수신 동의.
 *
 * `agreed`가 전체 동의이고 `push`·`email`은 그 아래 채널이다. 동의를 철회하면 채널도 함께
 * 꺼져야 한다(동의 없이 채널만 켜져 있으면 수신 근거가 없다). 이 규칙은 화면이 아니라
 * 백엔드도 함께 지켜야 하므로 API 규격을 받을 때 확인한다.
 */
export interface MarketingConsent {
  agreed: boolean;
  push: boolean;
  email: boolean;
}

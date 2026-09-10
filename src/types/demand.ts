/**
 * 수요(demand) 도메인에서 화면이 필요로 하는 타입. `types/participation.ts`와 같은 원칙 —
 * 백엔드 응답을 옮긴 것이 아니라 화면이 그리는 데 필요한 모양이며, 규격이 나오면 API 계층에서
 * 변환해 맞춘다.
 *
 * 현재는 수요 상세(B-12) '뭉치 진행 과정' 안내 화면이 쓰는 단계 서술 타입만 있다. 실제 수요
 * 데이터(상품·참여자·가격 등) 모델은 백엔드 규격 확정 후 이 파일에 추가한다.
 */

/** 진행 과정 카드 한 단계. 번호는 배열 순서(index+1)로 매긴다. */
export interface DemandGuideStep {
  /** 단계 아이콘(48px SVG) 경로. */
  readonly icon: string;
  /** 단계명. 카드 제목(번호 뒤). */
  readonly title: string;
  /** 단계 설명. 카드 부제. */
  readonly description: string;
}

/**
 * 홈 카테고리 10종. 시안 `981:18165`·`981:18210`(5×2 그리드) 그대로다.
 *
 * `id`는 이미지 에셋 파일명이다. 이미지 반입 이슈(#60)가 정한 이름을 그대로 쓴다
 * (`public/images/main-home/category/<id>.svg`).
 *
 * 아이콘 SVG는 타일과 같은 54×54 좌표계로 내보내져 있어 위치·크기를 코드에서 맞출 필요가 없다.
 * `toys`만 55×54라 타일에 맞춰 비율을 유지한 채 넣는다.
 *
 * 행선지는 시안·기능명세 어디에도 없다. 확정 전까지 '준비 중' 토스트로 둔다
 * (미구현 진입점 규칙, 의사결정 기록 2026-08-28).
 */
export const HOME_CATEGORIES = [
  { id: 'food', label: '식품' },
  { id: 'clothing', label: '의류' },
  { id: 'cosmetics', label: '화장품' },
  { id: 'toys', label: '장난감' },
  { id: 'office', label: '문구/오피스' },
  { id: 'pet-supplies', label: '반려동물용품' },
  { id: 'furniture', label: '가구' },
  { id: 'health-food', label: '헬스/건강식품' },
  { id: 'electronics', label: '가전/전자기기' },
  { id: 'daily-necessities', label: '생필품' },
] as const satisfies readonly { id: string; label: string }[];

export type HomeCategoryId = (typeof HOME_CATEGORIES)[number]['id'];

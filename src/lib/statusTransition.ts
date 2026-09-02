import type { StatusMeta } from '@/types/status';

/**
 * 상태 레지스트리에서 from → to 전이가 허용되는지 검사하는 범용 헬퍼.
 *
 * 공구(GB_*)·주문(ORD_*) 등 여러 상태축이 같은 판정 로직을 공유하므로 한곳에 둔다.
 * 각 도메인은 이 함수를 감싼 명명된 래퍼(canTransitionGoodsGroup 등)로 노출한다.
 *
 * 실제 상태 전이는 백엔드 권한이다. 이 함수는 화면의 낙관적 UI·버튼 노출 판단용 방어 체크다.
 *
 * `from`은 타입상 `Code`로 좁혀져 있지만 실제 값은 백엔드 응답에서 온다. 백엔드가 상태를 추가하거나
 * 프론트 레지스트리와 어긋나면 런타임에 미등록 코드가 들어오고, 그때 `registry[from]`이 undefined가
 * 되어 화면이 통째로 죽는다. 모르는 상태에서는 전이 불가로 떨어뜨린다 - 버튼 노출 판단에 쓰이므로
 * 막는 쪽이 안전하다.
 */
export function canTransition<Code extends string>(
  registry: Record<Code, StatusMeta<Code>>,
  from: Code,
  to: Code,
): boolean {
  return ((registry[from]?.next ?? []) as readonly string[]).includes(to);
}

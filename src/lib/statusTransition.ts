import type { StatusMeta } from '@/types/status';

/**
 * 상태 레지스트리에서 from → to 전이가 허용되는지 검사하는 범용 헬퍼.
 *
 * 공구(GB_*)·주문(ORD_*) 등 여러 상태축이 같은 판정 로직을 공유하므로 한곳에 둔다.
 * 각 도메인은 이 함수를 감싼 명명된 래퍼(canTransitionGoodsGroup 등)로 노출한다.
 *
 * 실제 상태 전이는 백엔드 권한이다. 이 함수는 화면의 낙관적 UI·버튼 노출 판단용 방어 체크다.
 */
export function canTransition<Code extends string>(
  registry: Record<Code, StatusMeta<Code>>,
  from: Code,
  to: Code,
): boolean {
  return (registry[from].next as readonly string[]).includes(to);
}

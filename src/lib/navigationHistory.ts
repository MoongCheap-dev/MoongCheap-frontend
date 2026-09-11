// 앱 내부 히스토리에 '뒤로 갈 앞선 항목'이 있는지 추적한다.
//
// GoBackButton은 돌아갈 곳이 없으면 fallbackHref로 보내야 하는데, 그 판별에 쓰던
// `window.history.length > 1`은 교차 출처·빈 탭 항목까지 세어 부정확했다. 외부 링크로
// `/demands/[id]`에 처음 들어와도 length가 2라 `back()`이 사이트를 벗어난다.
//
// Navigation API의 `canGoBack`은 이 판별에 정확하지만 Safari 등은 지원하지 않는다. 그런
// 브라우저를 위해 **앱이 직접 만든 항목만** 센다. GoBackButton은 Navigation API가 있으면 그쪽을
// 먼저 쓰고, 없을 때만 이 값을 본다([[GoBackButton]]).
//
// 방식: 현재 항목이 랜딩(문서 로드 시점) 위로 몇 칸 쌓였는지를 `depth`로 들고 있는다. depth>0이면
// 바로 뒤 항목이 앱 내부 항목이라 `back()`이 안전하다. depth는 `history.state`에 함께 저장해
// 새로고침에도 살아남는다(state는 리로드 후에도 유지된다). 갱신은 `NavigationHistoryTracker`가
// 라우트 변경마다 호출한다.
//
// 정밀하지 않은 경계(모두 '안전한 쪽' = 항목이 없다고 보고 fallback으로 보냄):
//   - `router.replace`(항목 교체)는 push로 세어 depth가 과다 계상될 수 있다. 다만 이 앱의 뒤로가기
//     사용처(404·B-12 확인)는 replace로 도달하지 않는다.
//   - 쿼리만 바뀌는 이동은 usePathname이 감지하지 못해 세지 않는다(과소 계상 → fallback, 안전).

const DEPTH_KEY = '__mcHistoryDepth';

let depth = 0;

// popstate에서 이동해 간 항목의 depth. 뒤이어 도는 pathname 변경 처리가 이 값을 소비해, 그 변경이
// push(앞으로)인지 pop(뒤/앞으로가기)인지 구분한다.
let pendingPopDepth: number | null = null;

function readStateDepth(): number | null {
  const state = window.history.state as Record<string, unknown> | null;
  const value = state?.[DEPTH_KEY];
  return typeof value === 'number' ? value : null;
}

/** Next가 넣어 둔 state를 보존하며 현재 항목에 depth만 얹는다. */
function stampCurrentEntry(): void {
  window.history.replaceState({ ...window.history.state, [DEPTH_KEY]: depth }, '');
}

/** 문서 로드 시 한 번. 새로고침이면 저장된 depth를 복구하고, 첫 진입이면 0으로 찍는다. */
export function initNavigationHistory(): void {
  const saved = readStateDepth();
  if (saved !== null) {
    depth = saved;
    return;
  }
  depth = 0;
  stampCurrentEntry();
}

/** popstate에서 호출. 이동해 간 항목에 저장돼 있던 depth를 다음 이동 처리가 쓰도록 넘긴다. */
export function markPop(): void {
  pendingPopDepth = readStateDepth() ?? 0;
}

/** 라우트가 바뀔 때 호출. 직전이 pop이었으면 그 항목의 depth로 맞추고, 아니면 push로 본다. */
export function recordNavigation(): void {
  if (pendingPopDepth !== null) {
    depth = pendingPopDepth;
    pendingPopDepth = null;
    return;
  }
  depth += 1;
  stampCurrentEntry();
}

/** 뒤로 갈 앱 내부 항목이 있는지. */
export function hasInAppHistoryEntry(): boolean {
  return depth > 0;
}

'use client';

import { useCallback, useSyncExternalStore } from 'react';

import { SEARCH_HISTORY_MAX } from '@/constants/businessRules';

// 최근 검색어(FN-B05-02). 서버에 저장할 곳이 없어 브라우저 로컬에 둔다. 기기·브라우저마다 따로
// 남는 값이고 계정을 따라다니지 않는다. 규격이 생기면 이 파일의 읽기·쓰기만 API로 바꾼다.
//
// localStorage는 React 바깥의 저장소라 `useSyncExternalStore`로 구독한다. effect에서 읽어
// setState하는 방식보다 이쪽이 맞다.
//   - 서버 스냅샷을 따로 주므로 SSR 결과와 첫 클라이언트 렌더가 어긋나지 않는다(하이드레이션).
//   - 같은 화면을 두 탭에 띄워도 `storage` 이벤트로 서로 맞춰진다.
//   - 렌더 직후 setState가 한 번 더 도는 연쇄 렌더가 없다.
//
// **메모리 캐시가 화면의 진짜 소스이고 localStorage는 그 사본이다.** 순서를 반대로 두면
// localStorage에 못 쓰는 브라우저(사이트 데이터 차단·용량 초과)에서 화면이 통째로 멈춘다.
// 저장에 실패했는데 화면 값을 저장소에서 다시 읽으면 방금 넣은 검색어가 사라져, 추가·삭제가
// 아무 반응 없는 것처럼 보인다. 그래서 저장 실패는 '이번 세션에만 남고 새로고침하면 사라진다'로
// 끝나야 하고, 화면 값까지 되돌리면 안 된다.
//
// 스냅샷은 **참조가 안정적이어야** 한다. 매번 새 배열을 만들면 useSyncExternalStore가 값이
// 바뀐 것으로 보고 무한 렌더에 빠진다. 그래서 캐시를 한 번만 채우고, 쓰기나 다른 탭의 변경이
// 있을 때만 갈아 끼운다.

const STORAGE_KEY = 'moongcheap.recentSearches';

/** 서버 렌더와 저장소 접근 실패에서 함께 쓰는 빈 스냅샷. 참조를 고정해야 해서 상수로 둔다. */
const EMPTY: readonly string[] = [];

/** 화면이 보는 값. `null`은 '아직 저장소에서 읽지 않았다'는 뜻이다(빈 목록과 구분된다). */
let cache: readonly string[] | null = null;

const listeners = new Set<() => void>();

/** 저장값을 문자열 배열로만 받아들인다. 손상된 값이 들어와도 화면이 깨지지 않게 한다. */
function parse(raw: string | null): readonly string[] {
  if (raw === null) {
    return EMPTY;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return EMPTY;
    }
    const keywords = parsed.filter(
      (item): item is string => typeof item === 'string' && item !== '',
    );
    return keywords.length === 0 ? EMPTY : keywords.slice(0, SEARCH_HISTORY_MAX);
  } catch {
    return EMPTY;
  }
}

/** 사생활 보호 모드 등에서는 localStorage 접근 자체가 예외를 던진다. 없는 것과 같게 다룬다. */
function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** 저장소를 읽는 것은 캐시가 비어 있을 때뿐이다(첫 렌더, 그리고 다른 탭의 변경으로 비운 뒤). */
function getSnapshot(): readonly string[] {
  cache ??= parse(readRaw());
  return cache;
}

function getServerSnapshot(): readonly string[] {
  return EMPTY;
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  // 다른 탭이 같은 키를 바꾸면 이 이벤트가 온다(같은 탭의 쓰기는 발생하지 않아 write가 직접 알린다).
  // 캐시를 비워 다음 스냅샷에서 저장소를 다시 읽게 한다. 구독자가 여럿이어도 비우는 동작은
  // 여러 번 해도 무해하다.
  function handleStorage(event: StorageEvent) {
    // key가 null이면 저장소 전체가 비워진 것이다(clear()). 그 경우도 반영한다.
    if (event.key !== null && event.key !== STORAGE_KEY) {
      return;
    }
    cache = null;
    onStoreChange();
  }

  window.addEventListener('storage', handleStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener('storage', handleStorage);
  };
}

function write(keywords: readonly string[]): void {
  // 화면 값을 먼저 확정한다. 저장이 실패해도 이번 세션에서는 정상으로 보인다(새로고침하면 사라진다).
  cache = keywords;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  } catch {
    // 사이트 데이터 차단·용량 초과. 남길 곳이 없을 뿐이라 화면은 그대로 둔다.
  }
  for (const listener of listeners) {
    listener();
  }
}

export function useRecentSearches() {
  const keywords = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /** 최신 검색어를 맨 앞에 넣는다. 같은 말을 다시 검색하면 중복 없이 맨 앞으로 올라온다. */
  const add = useCallback((keyword: string) => {
    const trimmed = keyword.trim();
    if (trimmed === '') {
      return;
    }
    const current = getSnapshot();
    write([trimmed, ...current.filter((item) => item !== trimmed)].slice(0, SEARCH_HISTORY_MAX));
  }, []);

  const remove = useCallback((keyword: string) => {
    write(getSnapshot().filter((item) => item !== keyword));
  }, []);

  const clear = useCallback(() => {
    write(EMPTY);
  }, []);

  return { keywords, add, remove, clear };
}

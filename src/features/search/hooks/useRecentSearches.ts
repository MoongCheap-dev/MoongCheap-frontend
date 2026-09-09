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
// 스냅샷은 **참조가 안정적이어야** 한다. 매번 새 배열을 만들면 useSyncExternalStore가 값이
// 바뀐 것으로 보고 무한 렌더에 빠진다. 그래서 파싱 결과를 모듈 캐시에 담아 두고 쓰기가 있을 때만
// 새 배열로 갈아 끼운다.

const STORAGE_KEY = 'moongcheap.recentSearches';

/** 서버 렌더와 저장소 접근 실패에서 함께 쓰는 빈 스냅샷. 참조를 고정해야 해서 상수로 둔다. */
const EMPTY: readonly string[] = [];

let cache: readonly string[] = EMPTY;
/** 캐시가 어떤 원본 문자열에서 나왔는지. 원본이 그대로면 파싱을 건너뛰고 같은 참조를 돌려준다. */
let cacheSource: string | null = null;

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

function getSnapshot(): readonly string[] {
  const raw = readRaw();
  if (raw !== cacheSource) {
    cacheSource = raw;
    cache = parse(raw);
  }
  return cache;
}

function getServerSnapshot(): readonly string[] {
  return EMPTY;
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  // 다른 탭이 같은 키를 바꾸면 이 이벤트가 온다(같은 탭의 쓰기는 발생하지 않아 아래에서 직접 알린다).
  window.addEventListener('storage', onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

function write(keywords: readonly string[]): void {
  const raw = JSON.stringify(keywords);
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // 저장에 실패해도 이번 세션의 화면 상태는 유지된다.
  }
  cacheSource = raw;
  cache = keywords;
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

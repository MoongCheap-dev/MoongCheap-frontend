'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import { createPortal } from 'react-dom';

import { COMING_SOON_MESSAGE } from '@/constants/commonMessages';

// 전역 토스트. 짧은 안내 메시지를 화면 하단에 잠깐 띄우고 자동으로 사라진다.
// 대표 용례: MVP 미구현(Full) 진입점 탭 시 '준비 중인 기능이에요'(showComingSoon).
//
// 의존성을 늘리지 않으려고 React 컨텍스트 + Portal로 직접 구현한다(AlertDialog와 같은 방침).
// 최종 비주얼은 디자인 확정 시 아래 마크업/토큰만 손보면 되고, 호출부(useToast) 계약은 유지한다.
//
// 사용법:
//   1) 루트 레이아웃에서 트리를 <ToastProvider>로 감싼다.
//   2) 클라이언트 컴포넌트에서 const { showToast, showComingSoon } = useToast();

const DEFAULT_DURATION_MS = 2500;

// 메시지 문자열을 토스트의 식별자로 삼는다 — 같은 메시지는 동시에 하나만 존재하며('준비 중' 연타 대응),
// 재호출 시 새로 쌓지 않고 자동 사라짐 타이머만 리셋한다.
interface ToastItem {
  message: string;
}

interface ToastContextValue {
  /** 임의 메시지를 토스트로 노출한다. duration(ms) 미지정 시 기본값. */
  showToast: (message: string, options?: { duration?: number }) => void;
  /** '준비 중인 기능이에요' 토스트 단축 호출. */
  showComingSoon: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  // 메시지별 자동 제거 타이머. 언마운트 시 모두 정리해 누수·유령 업데이트를 막는다.
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Portal은 클라이언트에서만 그린다(SSR엔 document 없음). 서버·첫 클라이언트 렌더가 모두
  // false라 하이드레이션 불일치가 없고, effect 내 setState 없이 클라이언트 판별만 한다.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((timer) => clearTimeout(timer));
      pending.clear();
    };
  }, []);

  const dismiss = useCallback((message: string) => {
    setToasts((prev) => prev.filter((toast) => toast.message !== message));
    const timer = timers.current.get(message);
    if (timer !== undefined) {
      clearTimeout(timer);
      timers.current.delete(message);
    }
  }, []);

  const showToast = useCallback(
    (message: string, options?: { duration?: number }) => {
      // 같은 메시지가 이미 떠 있으면 중복으로 쌓지 않고, 이번 호출로 타이머만 리셋한다.
      // 부작용(타이머 예약)은 state updater 밖에 둔다 — updater는 순수해야 StrictMode 이중 호출에 안전하다.
      const previous = timers.current.get(message);
      if (previous !== undefined) {
        clearTimeout(previous);
      }
      setToasts((prev) =>
        prev.some((toast) => toast.message === message) ? prev : [...prev, { message }],
      );
      timers.current.set(
        message,
        setTimeout(() => dismiss(message), options?.duration ?? DEFAULT_DURATION_MS),
      );
    },
    [dismiss],
  );

  const showComingSoon = useCallback(() => showToast(COMING_SOON_MESSAGE), [showToast]);

  // context 값을 메모이제이션해, 토스트 추가/제거로 Provider가 리렌더돼도 소비자가 불필요하게 리렌더되지 않게 한다.
  const value = useMemo(() => ({ showToast, showComingSoon }), [showToast, showComingSoon]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div
            // GNB 위에 겹치도록 하단에서 살짝 띄운다. 폭은 모바일 기준 컨테이너에 맞춘다.
            className="pointer-events-none fixed inset-x-0 bottom-24 z-50 mx-auto flex max-w-[var(--container-mobile)] flex-col items-center gap-2 px-4"
            role="status"
            aria-live="polite"
          >
            {toasts.map((toast) => (
              <div
                key={toast.message}
                className="bg-surface-button-tertiary-default text-content-inverse text-caption-14 pointer-events-auto rounded-full px-4 py-2.5 shadow-lg"
              >
                {toast.message}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

/** 토스트 호출 훅. ToastProvider 하위에서만 사용한다. */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error('useToast는 ToastProvider 안에서만 사용할 수 있습니다.');
  }
  return context;
}

'use client';

import { useCallback, useEffect, useState } from 'react';

import { getAddresses } from '@/lib/addressApi';
import { ApiError } from '@/lib/api';
import type { Address } from '@/types/address';

/**
 * 배송지 목록 조회 상태.
 *
 * 서버 컴포넌트에서 부를 수 없어 훅으로 둔다. 세션이 SID **httpOnly 쿠키**라 브라우저가 요청에
 * 자동으로 실어 보내는데, Next 서버에는 그 쿠키 저장소가 없다. 서버 컴포넌트에서 호출하면
 * 쿠키 없이 나가 401이 된다.
 *
 * ⚠️ 이 훅은 임시 형태다. #70에서 TanStack Query 도입이 결정되면 `useQuery`로 옮긴다.
 * 그때 호출부(`addresses`·`isLoading`·`error`·`refetch`)는 그대로 두고 본문만 바꾼다.
 * 캐시·중복 요청 제거·포커스 재검증이 없으므로 사용처가 늘기 전에 옮기는 것이 좋다.
 */

/**
 * 세 상태를 하나로 묶는다. 따로 두면 effect 본문에서 로딩 플래그를 동기로 세워야 하는데,
 * React Compiler가 그 패턴을 막는다(연쇄 렌더). 로딩 전환은 최초값과 `refetch`에서만 일어난다.
 */
type AddressesQueryState =
  | { status: 'loading' }
  | { status: 'success'; addresses: Address[] }
  | { status: 'error'; error: ApiError };

export interface AddressesState {
  /** 조회 전·실패 시 null. 성공하면 배열(0건이면 빈 배열)이다. */
  addresses: Address[] | null;
  isLoading: boolean;
  /** 조회 실패 사유. 화면이 문구를 고르도록 ApiError 그대로 올린다. */
  error: ApiError | null;
  refetch: () => void;
}

/** apiFetch는 네트워크 오류·미배선까지 ApiError로 감싸지만, 그 밖의 예외도 형태를 맞춘다. */
function toApiError(caught: unknown): ApiError {
  return caught instanceof ApiError ? caught : new ApiError('배송지를 불러오지 못했습니다.', 0);
}

export function useAddresses(): AddressesState {
  const [state, setState] = useState<AddressesQueryState>({ status: 'loading' });
  // 값이 바뀔 때마다 effect를 다시 돌려 재조회한다.
  const [attempt, setAttempt] = useState(0);

  const refetch = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((previous) => previous + 1);
  }, []);

  useEffect(() => {
    // 응답이 늦게 도착한 요청이 최신 결과를 덮어쓰지 않도록 막는다(언마운트 후 setState도 방지).
    let active = true;

    getAddresses()
      .then((addresses) => {
        if (active) {
          setState({ status: 'success', addresses });
        }
      })
      .catch((caught: unknown) => {
        if (active) {
          setState({ status: 'error', error: toApiError(caught) });
        }
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  return {
    addresses: state.status === 'success' ? state.addresses : null,
    isLoading: state.status === 'loading',
    error: state.status === 'error' ? state.error : null,
    refetch,
  };
}

'use client';

import Link from 'next/link';

import { ERROR_ACTION_CLASS, ErrorScreen } from '@/components/ui/ErrorScreen';
import { ADDRESS_MAX } from '@/constants/businessRules';
import { ERROR_SCREEN_RETRY_LABEL } from '@/constants/commonMessages';
import { AddressCard } from '@/features/user/components/AddressCard';
import { useAddresses } from '@/features/user/hooks/useAddresses';

// B-30 배송지 목록 본문. 페이지(서버 컴포넌트)는 앱바만 조립하고 데이터는 여기서 가져온다.
//
// 조회가 클라이언트인 이유는 `useAddresses` 주석 참고(SID httpOnly 쿠키는 브라우저만 갖고 있다).
//
// ⚠️ 로딩·조회 실패 화면은 시안이 없다(FN-B30-01이 '디자인 필요'로 남겨 뒀다). 새로 그리지 않고
//    공용 `ErrorScreen`을 재사용하고, 로딩은 자리만 비워 둔다. 시안이 나오면 교체한다.

// 시안의 + 아이콘(22px 박스 안 14px 글리프). lucide의 Plus는 획이 얇아 시안과 다르게 보여
// 경로를 그대로 옮겼다. 굵기·둥근 끝이 시안의 채워진 형태와 일치한다.
function PlusIcon() {
  return (
    <svg aria-hidden className="size-[22px] shrink-0" fill="currentColor" viewBox="0 0 22 22">
      <path d="M17.1328 10.1328C17.6118 10.1328 18 10.521 18 11C18 11.479 17.6118 11.8672 17.1328 11.8672H11.8672V17.1328C11.8672 17.6118 11.479 18 11 18C10.521 18 10.1328 17.6118 10.1328 17.1328V11.8672H4.86721C4.38824 11.8672 4.00003 11.479 4 11C4 10.521 4.38821 10.1328 4.86721 10.1328H10.1328V4.86721C10.1328 4.38821 10.521 4 11 4C11.479 4 11.8672 4.38821 11.8672 4.86721V10.1328H17.1328Z" />
    </svg>
  );
}

export function AddressListView() {
  const { addresses, isLoading, error, refetch } = useAddresses();

  if (error !== null) {
    return (
      <ErrorScreen description={['배송지를 불러오지 못했어요.', '잠시 후 다시 시도해주세요.']}>
        <button className={ERROR_ACTION_CLASS} onClick={refetch} type="button">
          {ERROR_SCREEN_RETRY_LABEL}
        </button>
      </ErrorScreen>
    );
  }

  // 첫 조회 중에는 목록도 추가 버튼도 그리지 않는다. 개수를 알기 전에 버튼을 그리면
  // '신규/새 배송지 추가' 문구와 상한 안내가 응답 후 바뀌어 깜빡인다.
  if (isLoading || addresses === null) {
    return null;
  }

  const isEmpty = addresses.length === 0;
  const isFull = addresses.length >= ADDRESS_MAX;

  return (
    <div className="flex w-full flex-col gap-5 px-4 pt-5">
      {/* 시안이 상태별로 문구가 다르다. 빈 목록(453:25757)은 '신규 배송지 추가',
          카드가 있는 목록(453:25765)은 '새 배송지 추가'다. 같은 버튼이라 통일하고 싶지만
          문구는 디자인 결정이라 시안 그대로 둔다. 의도인지 확인 후 한쪽으로 정리한다.

          상한 도달 상태는 시안이 없다(FN-B30-01에 '디자인 필요'로 남아 있다). 링크를 죽이면
          눌러도 반응이 없어 고장으로 보이므로, 이동만 막고 문구로 이유를 알린다. 문구는
          같은 규칙을 쓰는 B-14의 '카드는 최대 5개까지 등록할 수 있어요'를 따랐다. */}
      {isFull ? (
        <p className="bg-surface-disabled-secondary text-label-14 text-content-disabled-secondary rounded-8 flex w-full items-center justify-center gap-1 py-3">
          배송지는 최대 {ADDRESS_MAX}개까지 등록할 수 있어요
        </p>
      ) : (
        <Link
          className="bg-surface-secondary text-label-14 text-content-tertiary rounded-8 active:bg-surface-button-quarternary-pressed flex w-full items-center justify-center gap-1 py-3"
          href="/mypage/addresses/new"
        >
          <PlusIcon />
          {isEmpty ? '신규 배송지 추가' : '새 배송지 추가'}
        </Link>
      )}

      {!isEmpty && (
        <ul className="flex w-full flex-col gap-5">
          {addresses.map((address) => (
            <AddressCard
              address={address}
              editHref={`/mypage/addresses/${address.id}/edit`}
              key={address.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

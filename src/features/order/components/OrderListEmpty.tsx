import type { ReactNode } from 'react';

import Image from 'next/image';

// B-21 주문 0건 안내. 시안 `453:26371`.
//
// 공용 `ui/EmptyState`를 쓰지 않았다. 그쪽은 제목이 `body-15`에 간격이 gap-2인 작은 인라인
// 빈 상태(B-14 결제수단)인데, 이 화면은 200px 일러스트에 제목이 `heading-18`이고 간격도 12·20으로
// 훨씬 크다. 억지로 className으로 덮으면 두 화면이 서로를 깨뜨린다.
// 세 번째 빈 상태가 나오면 그때 두 변형을 하나로 합친다(공통 UI 2회 규칙).

interface OrderListEmptyProps {
  /** 하단 CTA. 이동 경로가 화면마다 다를 수 있어 호출부가 넣는다. */
  action?: ReactNode;
}

export function OrderListEmpty({ action }: OrderListEmptyProps) {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-3 px-4">
      {/* 시안은 200×200 자리에 일러스트를 123%로 키워 가장자리를 잘라 놓았다(여백 제거). */}
      <div className="relative size-50 shrink-0 overflow-hidden">
        <Image
          alt=""
          className="absolute -top-[23px] -left-[23px] max-w-none"
          height={246}
          priority
          src="/images/order-empty-box.png"
          width={246}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-5 px-4">
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <p className="text-heading-18 text-content-primary w-full">주문 내역이 없어요</p>
          {/* 시안이 두 줄로 끊어 놓았다. 폭 163에서 자연스럽게 나뉘도록 폭을 고정한다. */}
          <p className="text-button-14 text-content-quarternary w-40.75">
            상품을 구매한 뒤에 확인해주세요.
          </p>
        </div>

        {action}
      </div>
    </div>
  );
}

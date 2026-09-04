import type { ReactNode } from 'react';

import Image from 'next/image';

// B-21 주문 0건 안내. 시안 `453:26371`.
//
// 공용 `ui/EmptyState`를 쓰지 않았다. 그쪽은 제목이 `body-15`에 간격이 gap-2인 작은 인라인
// 빈 상태(B-14 결제수단)인데, 이 화면은 200px 일러스트에 제목이 `heading-18`이고 간격도 12·20으로
// 훨씬 크다. 억지로 className으로 덮으면 두 화면이 서로를 깨뜨린다.
// 세 번째 빈 상태가 나오면 그때 두 변형을 하나로 합친다(공통 UI 2회 규칙).

/** 시안이 끊어 놓은 두 줄. 문구·줄바꿈 위치 모두 시안 그대로다. */
const EMPTY_DESCRIPTION = ['상품을 구매한 뒤에', '확인해주세요.'] as const;

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
          {/* 시안이 두 줄을 각각 별도 텍스트로 두고 있다. 폭에 기대 자연 줄바꿈시키면 글꼴·자간이
              조금만 달라져도 끊기는 자리가 밀린다. 줄을 그대로 명시한다(ErrorScreen과 같은 방식). */}
          <p className="text-button-14 text-content-quarternary">
            {EMPTY_DESCRIPTION.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </p>
        </div>

        {action}
      </div>
    </div>
  );
}

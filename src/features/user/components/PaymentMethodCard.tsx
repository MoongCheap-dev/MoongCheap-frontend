import type { PaymentMethod } from '@/types/payment';

// 결제수단 목록(B-14)의 카드 한 장. 카드 썸네일 + 카드명 + 마스킹 번호로 구성한다.
//
// 두 모드를 판별 유니온으로 나눈다(FN-B14-01 BR-12).
//   · 'view'   조회 모드 — 기본 카드에 '기본' 뱃지. onActivate가 있으면(2건 이상) 행 탭으로
//              기본변경 모드에 진입한다. 1건 이하면 onActivate를 넘기지 않아 탭에 반응하지 않는다(BR-16).
//   · 'select' 기본변경 모드 — 좌측 라디오(단일 선택). 뱃지 대신 라디오가 상태를 표시한다.
//
// 시안 카드 표면: 강조 카드(조회 모드의 기본 카드 / 기본변경 모드의 선택 카드)는 흰 배경 + 진한
// 테두리, 나머지는 회색(surface/secondary) 채움에 테두리 없음. 테두리 두께차로 크기가 튀지 않게
// 비강조 카드도 투명 테두리를 둔다. 썸네일은 mock 플레이스홀더로, 실제 카드사 아트는 토스 응답에서 온다.

type PaymentMethodCardProps =
  | { method: PaymentMethod; variant: 'view'; onActivate?: () => void }
  | { method: PaymentMethod; variant: 'select'; selected: boolean; onSelect: () => void };

const CARD_BASE = 'rounded-12 flex w-full items-center gap-3 px-4 py-3.5';

function surfaceClass(emphasized: boolean) {
  return emphasized
    ? 'bg-background-default border-content-primary border'
    : 'bg-surface-secondary border border-transparent';
}

// 시안 표기 '6131 - •••• - •••• - 9000'. 가운데 8자리는 저장하지 않으므로 마스킹으로 채운다.
function maskedNumber(bin: string, last4: string) {
  return `${bin} - •••• - •••• - ${last4}`;
}

function CardBody({ method }: { method: PaymentMethod }) {
  return (
    <>
      {/* mock 썸네일. 연동 시 카드사 이미지로 교체된다. */}
      <span aria-hidden className="bg-surface-tertiary h-[38px] w-[30px] shrink-0 rounded-[4px]" />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
        <span className="text-label-16 text-content-primary truncate">{method.name}</span>
        <span className="text-body-14 text-content-tertiary">
          {maskedNumber(method.bin, method.last4)}
        </span>
      </span>
    </>
  );
}

export function PaymentMethodCard(props: PaymentMethodCardProps) {
  const { method } = props;

  if (props.variant === 'select') {
    const { selected, onSelect } = props;
    return (
      <li className="w-full">
        <button
          aria-checked={selected}
          className={`${CARD_BASE} ${surfaceClass(selected)} active:bg-surface-tertiary`}
          onClick={onSelect}
          role="radio"
          type="button"
        >
          <span
            aria-hidden
            className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
              selected ? 'border-content-primary' : 'border-border-tertiary'
            }`}
          >
            {selected && <span className="bg-content-primary size-2.5 rounded-full" />}
          </span>
          <CardBody method={method} />
        </button>
      </li>
    );
  }

  const { onActivate } = props;

  // 조회 모드. 2건 이상이면 행 탭으로 기본변경 모드에 진입한다(onActivate가 있을 때만 버튼으로).
  if (onActivate === undefined) {
    return (
      <li className={`${CARD_BASE} ${surfaceClass(method.isDefault)}`}>
        <CardBody method={method} />
        {method.isDefault && <DefaultBadge />}
      </li>
    );
  }

  return (
    <li className="w-full">
      <button
        className={`${CARD_BASE} ${surfaceClass(method.isDefault)} active:bg-surface-tertiary`}
        onClick={onActivate}
        type="button"
      >
        <CardBody method={method} />
        {method.isDefault && <DefaultBadge />}
      </button>
    </li>
  );
}

// 기본결제수단 표시. 시안은 검정 채운 pill + 흰 글씨.
function DefaultBadge() {
  return (
    <span className="bg-surface-button-tertiary-default text-content-inverse text-label-14 shrink-0 rounded-full px-3.5 py-1.5">
      기본
    </span>
  );
}

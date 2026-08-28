import type { ReactNode } from 'react';

// 배송지 폼(B-30)의 라벨 + 입력 묶음. 라벨은 label-14, 아래로 8px 띄운다.
//
// 인증 화면의 `StepField`와 합치지 않았다. 그쪽은 플로팅 라벨(입력칸 테두리 위에 얹힌)이고
// 이 화면은 라벨이 입력칸 위에 따로 놓인다. 마크업도 상태 표현도 겹치지 않는다.

interface AddressFieldProps {
  label: string;
  children: ReactNode;
}

export function AddressField({ label, children }: AddressFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-label-14 text-content-tertiary">{label}</span>
      {children}
    </div>
  );
}

/** 폼 입력칸 공통 클래스. 시안: 테두리 #d6d6d6 · radius 8 · px 12 · py 10 · label-14. */
export const ADDRESS_INPUT_CLASS =
  'border-border-quarternary rounded-8 text-label-14 text-content-primary placeholder:text-content-quinary focus-visible:ring-effect-focus-ring-primary w-full border px-3 py-2.5 outline-none focus-visible:ring-2';

/** 검색 결과가 채우는 읽기 전용 칸. 시안: 배경 surface-primary · 테두리 divider-default. */
export const ADDRESS_READONLY_CLASS =
  'bg-surface-primary border-divider-default rounded-8 text-label-14 text-content-primary placeholder:text-content-quinary h-10 border px-3 outline-none';

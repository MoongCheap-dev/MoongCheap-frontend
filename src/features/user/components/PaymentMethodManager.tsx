'use client';

import { useState } from 'react';

import Image from 'next/image';

import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import { PAYMENT_METHOD_MAX } from '@/constants/businessRules';
import { PaymentMethodCard } from '@/features/user/components/PaymentMethodCard';
import type { PaymentMethod } from '@/types/payment';

// B-14 결제수단 관리(FN-B14-01). 목록 조회 + 기본결제수단 변경까지가 이 화면의 MVP 범위다.
//
// 상태(모드·선택·목록)를 들고 있어 클라이언트 경계다. 페이지는 서버 컴포넌트로 두고 목 데이터만
// 내려준다(MarketingConsentSection과 같은 방식).
//
// ⚠️ mock UI다. 실제 목록 조회·기본변경은 토스 브랜드페이 SDK/백엔드 연동 시점에 붙인다
//    (08.26 mock→위젯 전환, FN-B14-02). 지금은 화면 상태만 바꾼다.
//
// 이번 범위에서 뺀 것(명세 근거):
//  · 카드 추가 — 토스 브랜드페이 위젯이 담당(자체 화면 없음). SDK 미연동이라 '준비 중' 토스트.
//  · 삭제(편집 모드) — FN-B14-04 Full·⚠️TBD 미확정. '편집' 진입점은 노출하되 '준비 중' 토스트.
//  · 기본변경 모드 백버튼 복귀(BR-13)·'변경 중…' 로딩(BR-10) — 뒤로가기 가로채기·실제 비동기가
//    필요해 mock 범위 밖. 연동 시 채운다.

interface PaymentMethodManagerProps {
  initialMethods: PaymentMethod[];
}

type Mode = 'view' | 'changeDefault';

// 시안의 카드 추가 글리프 — 회색 원형 배경 안에 흰 '+'. lucide Plus는 획이 얇아 시안과 달라
// 채워진 '+' 경로(배송지 목록과 동일 글리프)를 옮겼다.
function AddGlyph() {
  return (
    <span className="bg-content-disabled-primary flex size-6 shrink-0 items-center justify-center rounded-full">
      <svg
        aria-hidden
        className="text-content-inverse size-3.5"
        fill="currentColor"
        viewBox="0 0 22 22"
      >
        <path d="M17.1328 10.1328C17.6118 10.1328 18 10.521 18 11C18 11.479 17.6118 11.8672 17.1328 11.8672H11.8672V17.1328C11.8672 17.6118 11.479 18 11 18C10.521 18 10.1328 17.6118 10.1328 17.1328V11.8672H4.86721C4.38824 11.8672 4.00003 11.479 4 11C4 10.521 4.38821 10.1328 4.86721 10.1328H10.1328V4.86721C10.1328 4.38821 10.521 4 11 4C11.479 4 11.8672 4.38821 11.8672 4.86721V10.1328H17.1328Z" />
      </svg>
    </span>
  );
}

export function PaymentMethodManager({ initialMethods }: PaymentMethodManagerProps) {
  const { showToast, showComingSoon } = useToast();
  const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);
  const [mode, setMode] = useState<Mode>('view');

  const defaultId = methods.find((method) => method.isDefault)?.id ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(defaultId);

  // 빈 목록(등록 카드 0건). 안내 문구 + '카드 등록하기'만 노출한다(FN-B14-01 화면상태 '빈 목록').
  if (methods.length === 0) {
    return (
      <EmptyState
        action={
          <button
            className="bg-surface-button-tertiary-default text-content-inverse text-label-14 active:bg-surface-button-tertiary-pressed rounded-full px-6 py-3.5"
            onClick={showComingSoon}
            type="button"
          >
            카드 등록하기
          </button>
        }
        className="flex-1"
        description="결제에 사용할 카드를 등록해 주세요."
        icon={
          // B-14 empty 시안의 지갑 일러스트(Figma node 755:16137, 160×146). 장식용이라 alt는 빈 값.
          <Image alt="" height={146} priority src="/images/payment-empty-wallet.png" width={160} />
        }
        title="등록된 카드가 없어요"
      />
    );
  }

  const atMax = methods.length >= PAYMENT_METHOD_MAX;
  const canApply = mode === 'changeDefault' && selectedId !== null && selectedId !== defaultId;

  function enterChangeDefault() {
    setSelectedId(defaultId);
    setMode('changeDefault');
  }

  // 기본변경 확정(mock). 선택 카드를 기본으로 바꾸고 최상단으로 올린다(BR-01/05). 성공 토스트 후 조회 모드 복귀.
  function applyDefaultChange() {
    if (selectedId === null) return;
    setMethods((prev) => {
      const next = prev.map((method) => ({ ...method, isDefault: method.id === selectedId }));
      const picked = next.find((method) => method.id === selectedId);
      if (picked === undefined) return prev;
      return [picked, ...next.filter((method) => method.id !== selectedId)];
    });
    setMode('view');
    showToast('기본결제수단이 변경되었어요');
  }

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex w-full flex-1 flex-col gap-3 px-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-section-title-16 text-content-primary">등록된 결제 수단</h2>
          {/* 편집 = 삭제 모드(BR-08). FN-B14-04 미확정이라 진입점만 두고 '준비 중' 토스트.
              시안은 회색 채운 pill. */}
          <button
            className="bg-surface-secondary text-label-14 text-content-quarternary active:bg-surface-tertiary rounded-full px-3.5 py-1.5"
            onClick={showComingSoon}
            type="button"
          >
            편집
          </button>
        </div>

        <ul className="flex w-full flex-col gap-3">
          {methods.map((method) =>
            mode === 'changeDefault' ? (
              <PaymentMethodCard
                key={method.id}
                method={method}
                onSelect={() => setSelectedId(method.id)}
                selected={selectedId === method.id}
                variant="select"
              />
            ) : (
              <PaymentMethodCard
                key={method.id}
                method={method}
                // 2건 이상일 때만 행 탭으로 기본변경 모드 진입(BR-16).
                onActivate={methods.length >= 2 ? enterChangeDefault : undefined}
                variant="view"
              />
            ),
          )}
        </ul>

        {atMax ? (
          // 상한(5건) 도달: 비활성 + '+' 미노출(BR-07). 문구는 🖌️ 디자인 확정 전 임시.
          <p className="bg-surface-secondary text-caption-12 text-content-quarternary rounded-12 px-4 py-5 text-center">
            결제 카드는 최대 {PAYMENT_METHOD_MAX}개까지 등록할 수 있어요
          </p>
        ) : (
          <button
            className="bg-surface-secondary text-label-14 text-content-tertiary rounded-12 active:bg-surface-tertiary flex w-full flex-col items-center justify-center gap-1.5 px-4 py-5"
            onClick={showComingSoon}
            type="button"
          >
            <AddGlyph />
            결제 카드 추가하기
          </button>
        )}
      </div>

      {mode === 'changeDefault' && (
        <div className="sticky bottom-0 w-full px-4 pt-3 pb-6">
          <button
            className="bg-surface-button-tertiary-default text-content-inverse text-label-16 rounded-12 active:bg-surface-button-tertiary-pressed disabled:bg-surface-button-quarternary-default disabled:text-content-disabled-primary w-full py-4"
            disabled={!canApply}
            onClick={applyDefaultChange}
            type="button"
          >
            기본결제수단 바꾸기
          </button>
        </div>
      )}
    </div>
  );
}

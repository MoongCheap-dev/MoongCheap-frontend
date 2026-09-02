'use client';

import { useState } from 'react';

import { AlertDialog } from '@/components/ui/AlertDialog';

// 설정 목록에서 확인 다이얼로그를 거치는 행. B-24의 `로그아웃`·`회원탈퇴`가 쓴다.
// 시안 453:25474(로그아웃) · 453:25499(회원탈퇴).
//
// 서버 컴포넌트(SettingsRow)에서 다이얼로그 개폐 상태를 못 다루므로 이 얇은 client 조각으로
// 자른다. ComingSoonButton과 같은 방침이다 — 행의 생김새(className)는 호출부가 준다.
//
// 확인을 눌러도 지금은 닫기만 한다. 두 행 다 실제 동작이 아직 없다.
//   로그아웃  세션 폐기(POST /api/auth/logout)가 API 계층과 함께 붙는다. 그때 완료 조건
//             "뒤로가기로 재진입 불가"(FN-B24-02)에 맞춰 로그인 화면으로 replace 한다.
//   회원탈퇴  진입점만 노출하고 동작은 mock이다(BR-B24-01-04).

interface ConfirmActionRowProps {
  label: string;
  className?: string;
  /** 다이얼로그 제목. 시안 문구 그대로. */
  title: string;
  /** 다이얼로그 본문. 시안 문구 그대로. */
  message: string;
  /** 실행 버튼 라벨. 시안은 행 라벨과 같은 문구를 쓴다. */
  confirmLabel: string;
}

export function ConfirmActionRow({
  label,
  className,
  title,
  message,
  confirmLabel,
}: ConfirmActionRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <>
      <button className={className} onClick={() => setIsOpen(true)} type="button">
        {label}
      </button>

      <AlertDialog
        cancelLabel="돌아가기"
        confirmLabel={confirmLabel}
        isOpen={isOpen}
        message={message}
        onClose={close}
        onConfirm={close}
        title={title}
      />
    </>
  );
}

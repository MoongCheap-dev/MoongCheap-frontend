'use client';

import { useEffect, useRef } from 'react';

// 알림용 모달. Figma의 "[에러 메시지]" 팝업(본문 + 확인 버튼)에 대응한다.
//
// 의존성을 늘리지 않으려고 네이티브 <dialog>의 showModal()을 쓴다. 포커스 트랩·Esc 닫힘·
// 백드롭·접근성(모달 시맨틱)이 브라우저 기본으로 제공된다. 공통 UI 프리미티브(shadcn Dialog)
// 규약이 확정되면 이 컴포넌트를 그 스캐폴드로 치환하되, 아래 props 계약은 유지한다.

interface AlertDialogProps {
  /**
   * 열림 여부(제어 컴포넌트). onClose에서 반드시 이 값을 false로 되돌려야 한다.
   * 그렇지 않으면 Esc·확인으로 닫아도 isOpen이 true로 남아, 재렌더 시 effect가 다시 열어버린다.
   */
  isOpen: boolean;
  /** 본문 메시지. 화면에 보이는 핵심 문구이자, 제목이 없을 땐 모달의 접근성 이름으로도 쓰인다. */
  message: string;
  /** 제목(선택). Figma의 "[에러 메시지]" 자리. 실제 문구 미확정이라 기본은 제목 없이 메시지만 노출. */
  title?: string;
  confirmLabel?: string;
  /** 닫기 요청(확인 버튼·Esc) 시 호출. open을 false로 되돌리는 책임이 여기 있다. */
  onClose: () => void;
}

export function AlertDialog({
  isOpen,
  message,
  title,
  confirmLabel = '확인',
  onClose,
}: AlertDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog === null) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      role="alertdialog"
      // 제목이 있으면 제목이 이름, 없으면 메시지를 이름으로 삼아 모달에 항상 접근성 이름을 준다.
      aria-labelledby={title !== undefined ? 'alert-dialog-title' : 'alert-dialog-message'}
      aria-describedby={title !== undefined ? 'alert-dialog-message' : undefined}
      className="bg-surface m-auto w-[calc(100%-4rem)] max-w-xs rounded-2xl p-0 shadow-xl backdrop:bg-black/40"
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1.5">
          {title !== undefined && (
            <p id="alert-dialog-title" className="text-base font-semibold">
              {title}
            </p>
          )}
          <p id="alert-dialog-message" className="text-muted text-sm">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          // 모달이 열리면 브라우저가 이 버튼에 자동 포커스한다(Enter=확인, Esc=닫기 동작 유지).
          // 다만 포커스 표시(테두리/링)는 노출하지 않는다 — 기본 검은 outline 제거, 별도 링도 없음.
          className="bg-primary-soft text-foreground active:bg-surface-line h-12 rounded-full font-medium outline-none"
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}

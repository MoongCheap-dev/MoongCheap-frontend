'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { AlertDialog } from '@/components/ui/AlertDialog';
import { useToast } from '@/components/ui/Toast';
import { LOGOUT_CONFIRM } from '@/constants/commonMessages';
import { useLogout } from '@/features/auth/session';
import { SETTINGS_ROW_PRESSABLE_CLASS } from '@/features/user/components/SettingsRow';

// B-24 로그아웃 실행 행(#70). 기존 확인 행(ConfirmActionRow)은 닫기만 했으나, 여기서
// POST /api/auth/logout으로 세션을 폐기하고 전역 상태를 미로그인으로 만든 뒤(useLogout),
// 완료 조건(FN-B24-02 "뒤로가기로 재진입 불가")에 맞춰 로그인 화면으로 replace 한다.
// 실패는 토스트로 알리고 화면에 머문다(재시도 가능). SettingsList의 <ul> 안에 놓이므로 <li>로 감싼다.

const LOGOUT_FAILED_MESSAGE = '로그아웃에 실패했어요. 잠시 후 다시 시도해 주세요.';

export function LogoutRow() {
  const router = useRouter();
  const { showToast } = useToast();
  const { mutate, isPending } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    if (isPending) {
      return;
    }
    mutate(undefined, {
      onSuccess: () => {
        setIsOpen(false);
        // 세션 캐시는 useLogout이 비웠다. 로그인 화면으로 replace 해 히스토리에서 마이페이지를 지운다.
        router.replace('/login');
      },
      onError: () => {
        setIsOpen(false);
        showToast(LOGOUT_FAILED_MESSAGE);
      },
    });
  };

  return (
    <li className="w-full">
      <button
        className={SETTINGS_ROW_PRESSABLE_CLASS}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        로그아웃
      </button>

      <AlertDialog
        isOpen={isOpen}
        title={LOGOUT_CONFIRM.title}
        message={LOGOUT_CONFIRM.message}
        confirmLabel={LOGOUT_CONFIRM.confirmLabel}
        isProcessing={isPending}
        onConfirm={handleConfirm}
        onClose={() => {
          // 처리 중에는 닫기(취소·Esc·백드롭)를 막아 이중 실행·중도 이탈을 방지한다.
          if (!isPending) {
            setIsOpen(false);
          }
        }}
      />
    </li>
  );
}

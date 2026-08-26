import type { ReactNode } from 'react';

// 설정 카드 안의 메뉴 목록. 행 사이에만 구분선을 넣어야 해서(마지막 행은 없음)
// 행마다 border를 다는 대신 목록에서 `divide-y`로 처리한다.

interface SettingsListProps {
  children: ReactNode;
}

export function SettingsList({ children }: SettingsListProps) {
  return <ul className="divide-divider-default flex w-full flex-col divide-y">{children}</ul>;
}

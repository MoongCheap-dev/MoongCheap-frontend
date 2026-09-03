import Link from 'next/link';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';
import { ConfirmActionRow } from '@/features/user/components/ConfirmActionRow';

// 설정 카드 안의 메뉴 한 행. 이동 경로가 있으면 링크, 없으면 성격에 따라 갈린다.
//
// 세 갈래인 이유는 "경로가 없다"에 서로 다른 두 상태가 섞여 있기 때문이다.
//
//   href        이동 경로가 있다. 링크.
//   comingSoon  MVP에 없는 진입점. 탭하면 '준비 중인 기능이에요' 토스트를 띄운다.
//   confirm     실행 전 확인이 필요한 행(로그아웃·회원탈퇴). 탭하면 확인 다이얼로그를 띄운다.
//   전부 없음    아직 붙일 동작이 없는 행. 시안대로 그리되 반응은 두지 않는다.

interface SettingsRowProps {
  label: string;
  /** 이동 경로. */
  href?: string;
  /** MVP 미구현 진입점 여부. `href`가 없을 때만 의미가 있다. */
  comingSoon?: boolean;
  /**
   * 확인 다이얼로그 설정. `href`가 없을 때만 의미가 있다.
   * 문구는 시안 그대로이며 `constants/commonMessages`의 상수를 그대로 펼쳐 넘긴다.
   */
  confirm?: {
    title: string;
    message: string;
    confirmLabel: string;
  };
}

const ROW_CLASS = 'text-body-15 text-content-primary flex w-full items-center px-4 py-3 text-left';

// 눌림 피드백은 실제로 반응하는 행에만 붙인다. 아무 일도 안 일어나는 행에 넣으면
// 눌렸다는 신호만 주고 끝나서 오히려 고장으로 보인다.
const PRESSABLE_CLASS = `${ROW_CLASS} active:bg-surface-secondary`;

export function SettingsRow({ label, href, comingSoon = false, confirm }: SettingsRowProps) {
  if (href !== undefined) {
    return (
      <li className="w-full">
        <Link className={PRESSABLE_CLASS} href={href}>
          {label}
        </Link>
      </li>
    );
  }

  if (comingSoon) {
    return (
      <li className="w-full">
        <ComingSoonButton className={PRESSABLE_CLASS}>{label}</ComingSoonButton>
      </li>
    );
  }

  if (confirm !== undefined) {
    return (
      <li className="w-full">
        <ConfirmActionRow className={PRESSABLE_CLASS} label={label} {...confirm} />
      </li>
    );
  }

  // 시안대로 그리되 이동만 막는다. 색을 흐리게 바꾸면 디자인에 없는 상태를 만들게 된다.
  return (
    <li className="w-full">
      <span className={ROW_CLASS}>{label}</span>
    </li>
  );
}

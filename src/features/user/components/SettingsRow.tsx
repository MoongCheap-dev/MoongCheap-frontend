import Link from 'next/link';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';

// 설정 카드 안의 메뉴 한 행. 이동 경로가 있으면 링크, 없으면 성격에 따라 갈린다.
//
// 세 갈래인 이유는 "경로가 없다"에 서로 다른 두 상태가 섞여 있기 때문이다.
//
//   href        이동 경로가 있다. 링크.
//   comingSoon  MVP에 없는 진입점. 탭하면 '준비 중인 기능이에요' 토스트를 띄운다.
//   둘 다 없음   기능은 있는데 아직 못 붙인 행(로그아웃·회원탈퇴). 확인 모달이 필요해서
//               (`Auth-06` `Auth-11`) 별도 작업으로 남았다. 여기에 '준비 중' 토스트를 띄우면
//               잘못된 안내가 되므로 지금은 반응 없는 텍스트로 둔다.

interface SettingsRowProps {
  label: string;
  /** 이동 경로. */
  href?: string;
  /** MVP 미구현 진입점 여부. `href`가 없을 때만 의미가 있다. */
  comingSoon?: boolean;
}

const ROW_CLASS = 'text-body-15 text-content-primary flex w-full items-center px-4 py-3 text-left';

// 눌림 피드백은 실제로 반응하는 행에만 붙인다. 아무 일도 안 일어나는 행에 넣으면
// 눌렸다는 신호만 주고 끝나서 오히려 고장으로 보인다.
const PRESSABLE_CLASS = `${ROW_CLASS} active:bg-surface-secondary`;

export function SettingsRow({ label, href, comingSoon = false }: SettingsRowProps) {
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

  // 시안대로 그리되 이동만 막는다. 색을 흐리게 바꾸면 디자인에 없는 상태를 만들게 된다.
  return (
    <li className="w-full">
      <span className={ROW_CLASS}>{label}</span>
    </li>
  );
}

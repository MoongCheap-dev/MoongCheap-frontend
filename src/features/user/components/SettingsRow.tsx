import Link from 'next/link';

// 설정 목록의 한 행. 이동 경로가 없으면 링크 대신 비활성 텍스트로 둔다.
//
// `고객센터`·`1:1 문의`처럼 기능 명세서에 근거가 없는 항목이 시안에 들어 있어, 화면은 그리되
// 이동은 막아야 한다. 그 상태를 `href` 유무로 표현한다.

interface SettingsRowProps {
  label: string;
  href?: string;
}

const ROW_CLASS = 'text-body-15 text-content-primary flex w-full items-center px-4 py-3 text-left';

export function SettingsRow({ label, href }: SettingsRowProps) {
  return (
    <li className="w-full">
      {href === undefined ? (
        // 시안대로 그리되 이동만 막는다. 색을 흐리게 바꾸면 디자인에 없는 상태를 만들게 된다.
        <span className={ROW_CLASS}>{label}</span>
      ) : (
        <Link className={`${ROW_CLASS} active:bg-surface-secondary`} href={href}>
          {label}
        </Link>
      )}
    </li>
  );
}

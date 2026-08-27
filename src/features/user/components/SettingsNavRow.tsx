import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// 전체 폭 목록 행(라벨 + 우측 chevron). B-25 "활동 알림" 목록이 쓴다.
//
// `SettingsRow`와 합치지 않았다. 그쪽은 흰 카드 안에 들어가는 행이라 chevron이 없고 마지막
// 행에 구분선이 없다. 이 행은 카드 밖 전체 폭이고 모든 행에 구분선이 붙는다. 겉모습만 비슷할 뿐
// 다른 컴포넌트다.
//
// `SettingsRow`와 같은 규칙으로 이동 경로가 없으면 링크 대신 텍스트로 둔다.

interface SettingsNavRowProps {
  label: string;
  href?: string;
}

const ROW_CLASS =
  'text-body-15 text-content-secondary border-divider-default flex w-full items-center justify-between border-b p-4 text-left';

export function SettingsNavRow({ label, href }: SettingsNavRowProps) {
  const content = (
    <>
      {label}
      {/* 시안 stroke는 #a5a5a5. 값이 정확히 맞는 content 토큰이 disabled/primary뿐이라
          이름은 어긋나지만 그 토큰을 쓴다(다크에서도 밝아져 동작이 맞다). */}
      <ChevronRight aria-hidden className="text-content-disabled-primary size-6 shrink-0" />
    </>
  );

  return (
    <li className="w-full">
      {href === undefined ? (
        <span className={ROW_CLASS}>{content}</span>
      ) : (
        <Link className={`${ROW_CLASS} active:bg-surface-secondary`} href={href}>
          {content}
        </Link>
      )}
    </li>
  );
}

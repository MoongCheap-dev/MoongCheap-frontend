import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// 하위 화면 공통 상단 앱바. Figma `icon+text` 컴포넌트(399:20414)에 대응한다.
//
// B-24 프로필 설정에 인라인으로 두었던 것을 B-25 알림 설정이 같은 모양을 쓰게 되어 올렸다.
// (컨벤션의 2회 규칙 - 두 번째 사용처가 생기면 추출한다.)
//
// 시안의 우측 "편집" 텍스트 버튼 변형은 아직 쓰는 화면이 없어 넣지 않았다. 필요해지면
// actionHref/actionLabel 쌍으로 추가한다(ProfileCard·SettingsSection과 같은 방식).

interface AppBarProps {
  title: string;
  /** 뒤로 가기 경로. 브라우저 history 대신 경로를 받는 이유는 직접 진입(새로고침·딥링크)에도
   *  같은 곳으로 가야 하고, 서버 컴포넌트에서 쓸 수 있어야 하기 때문이다. */
  backHref: string;
}

export function AppBar({ title, backHref }: AppBarProps) {
  return (
    <header className="border-divider-default flex h-13 w-full shrink-0 items-center border-b">
      {/* 시안의 chevron-left는 #575757(content/tertiary)이다. B-24에 인라인으로 짤 때
          content/primary로 넣었던 것을 여기서 바로잡는다. */}
      <Link
        aria-label="뒤로 가기"
        className="text-content-tertiary flex h-13 w-10 shrink-0 items-center px-2"
        href={backHref}
      >
        <ChevronLeft aria-hidden className="size-6" />
      </Link>
      <h1 className="text-title-17 text-content-primary min-w-0 flex-1">{title}</h1>
    </header>
  );
}

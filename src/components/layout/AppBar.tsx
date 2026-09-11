import type { ReactNode } from 'react';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// 하위 화면 공통 상단 앱바. Figma `icon+text` 컴포넌트(399:20414 · 818:9977)에 대응한다.
//
// B-24 프로필 설정에 인라인으로 두었던 것을 B-25 알림 설정이 같은 모양을 쓰게 되어 올렸다.
// (컨벤션의 2회 규칙 - 두 번째 사용처가 생기면 추출한다.)
//
// 시안 컴포넌트는 제목 오른쪽에 `rightIcon`(아이콘 하나)·`textButton`("편집") 두 변형을 갖는다.
// B-05 검색 입력이 `rightIcon`(장바구니)을 쓰게 되어 `action` 슬롯으로 열었다. 둘 다 같은 자리에
// 들어가므로 무엇을 넣을지는 호출부가 정한다.

interface AppBarProps {
  title: string;
  /** 뒤로 가기 경로. 브라우저 history 대신 경로를 받는 이유는 직접 진입(새로고침·딥링크)에도
   *  같은 곳으로 가야 하고, 서버 컴포넌트에서 쓸 수 있어야 하기 때문이다. */
  backHref: string;
  /** 제목 오른쪽 액션(아이콘 버튼·"편집" 링크 등). 없으면 제목만 그린다. */
  action?: ReactNode;
}

export function AppBar({ title, backHref, action }: AppBarProps) {
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
      {/* 시안 `818:9980` - 제목과 액션이 한 줄을 나눠 쓴다(justify-between). 액션이 없어도
          제목 위치가 바뀌면 안 되므로 flex-1은 이 줄이 갖는다. */}
      <div className="flex h-full min-w-0 flex-1 items-center justify-between">
        <h1 className="text-title-17 text-content-primary min-w-0 truncate">{title}</h1>
        {action}
      </div>
    </header>
  );
}

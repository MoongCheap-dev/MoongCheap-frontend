'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { getOAuthAuthorizeUrl } from '@/lib/oauth';
import type { OAuthProvider } from '@/types/auth';

// 소셜 로그인 버튼 줄(카카오·네이버·구글·애플). Figma 로그인 시안 기준.
//
// 백엔드와 합의된 카카오·구글만 실제 인가 플로우에 연결한다(#18). 클릭하면 백엔드 인가 경로로
// 이동하고, 이후 code 교환·세션(SID 쿠키) 발급·성공/실패 리다이렉트는 백엔드가 처리한다.
// 네이버·애플은 구현 계획이 없어 겉모습만 유지한다(핸들러 없음 = 눌러도 동작 없음).
// 브랜드 마크(색·로고)는 각 서비스의 자산이므로 디자인 토큰이 아니라 브랜드 색을 그대로 쓴다.
// 공통 Button 프리미티브(Social-Login variant)가 확정되면 이 마크업을 그 컴포넌트로 치환한다.

// 실제 인가 플로우에 연결된 제공자. 나머지(naver·apple)는 껍데기.
const CONNECTED_PROVIDERS: ReadonlySet<string> = new Set<OAuthProvider>(['kakao', 'google']);

function startOAuth(provider: OAuthProvider) {
  const authorizeUrl = getOAuthAuthorizeUrl(provider);
  // 베이스 URL(NEXT_PUBLIC_API_BASE_URL) 미배선이면 이동하지 않는다. 백엔드 값 확정 후 동작한다.
  if (authorizeUrl === null) {
    return;
  }
  // OAuth는 전체 페이지 리다이렉트다. 라우터가 아니라 브라우저 내비게이션으로 백엔드로 넘긴다.
  window.location.href = authorizeUrl;
}

interface SocialProvider {
  id: string;
  label: string;
  className: string;
  icon: ReactNode;
}

const PROVIDERS: SocialProvider[] = [
  {
    id: 'kakao',
    label: '카카오로 로그인',
    className: 'bg-[#FEE500]',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="#3A2929">
        <path d="M12 3C6.48 3 2 6.54 2 10.9c0 2.82 1.9 5.29 4.75 6.7-.16.55-1 3.52-1.03 3.75 0 0-.02.17.09.23.11.07.24.02.24.02.32-.04 3.7-2.44 4.28-2.85.54.08 1.1.12 1.67.12 5.52 0 10-3.54 10-7.9C22 6.54 17.52 3 12 3z" />
      </svg>
    ),
  },
  {
    id: 'naver',
    label: '네이버로 로그인',
    className: 'bg-[#03C75A]',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="#ffffff">
        <path d="M14.7 3v8.4L9.1 3H4v18h5.3v-8.4L14.9 21H20V3z" />
      </svg>
    ),
  },
  {
    id: 'google',
    label: '구글로 로그인',
    className: 'border-surface-line border bg-white',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" className="size-6">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
      </svg>
    ),
  },
  {
    id: 'apple',
    label: '애플로 로그인',
    className: 'bg-black',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="#ffffff">
        <path d="M16.36 12.78c-.02-2.13 1.74-3.15 1.82-3.2-.99-1.45-2.54-1.65-3.09-1.67-1.31-.13-2.56.77-3.23.77-.67 0-1.69-.75-2.78-.73-1.43.02-2.75.83-3.49 2.11-1.49 2.58-.38 6.39 1.07 8.48.71 1.02 1.56 2.17 2.67 2.13 1.07-.04 1.48-.69 2.77-.69 1.29 0 1.66.69 2.79.67 1.15-.02 1.88-1.04 2.58-2.07.81-1.19 1.15-2.34 1.17-2.4-.03-.01-2.24-.86-2.26-3.4zM14.6 6.25c.59-.72.99-1.71.88-2.7-.85.03-1.88.57-2.49 1.28-.55.63-1.03 1.64-.9 2.61.95.07 1.92-.48 2.51-1.19z" />
      </svg>
    ),
  },
];

export function SocialLoginButtons() {
  return (
    <div className="flex items-center justify-center gap-4">
      {PROVIDERS.map((provider) => {
        const isConnected = CONNECTED_PROVIDERS.has(provider.id);
        return (
          <button
            key={provider.id}
            type="button"
            aria-label={provider.label}
            // 카카오·구글만 인가 플로우로 이동한다. 네이버·애플은 핸들러가 없어 동작하지 않는다.
            onClick={isConnected ? () => startOAuth(provider.id as OAuthProvider) : undefined}
            className={cn(
              'flex size-12 items-center justify-center rounded-full',
              provider.className,
            )}
          >
            {provider.icon}
          </button>
        );
      })}
    </div>
  );
}

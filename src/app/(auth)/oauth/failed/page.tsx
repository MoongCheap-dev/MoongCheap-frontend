import type { Metadata } from 'next';
import Link from 'next/link';

import { getOAuthFailureMessage } from '@/constants/authMessages';

export const metadata: Metadata = {
  title: '로그인 실패',
};

// 소셜 로그인(카카오·구글) 실패 착지 경로. 백엔드가 실패 시 `/oauth/failed?reason=...`로 리다이렉트한다.
// reason 값(denied·provider_error·server_error)을 안내 문구로 바꿔 보여주고, 다시 로그인으로 되돌린다.
// reason은 URLSearchParams 특성상 문자열 배열로도 올 수 있어 첫 값만 취한다. 규약 밖 값은 기본 문구로 떨어진다.
export default async function OAuthFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string | string[] }>;
}) {
  const { reason } = await searchParams;
  const message = getOAuthFailureMessage(Array.isArray(reason) ? reason[0] : reason);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl leading-snug font-bold">로그인에 실패했어요</h1>
        <p className="text-content-quarternary text-sm">{message}</p>
      </div>

      <Link
        href="/login"
        className="bg-surface-button-primary-default hover:bg-surface-button-primary-hover active:bg-surface-button-primary-pressed text-content-oncolor rounded-8 flex h-13 w-full items-center justify-center font-medium"
      >
        다시 로그인하기
      </Link>
    </div>
  );
}

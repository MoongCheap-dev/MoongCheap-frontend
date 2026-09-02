import { ArrowLeftRight, Pencil, User } from 'lucide-react';
import Link from 'next/link';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';

// 프로필 카드. Figma `Frame 117` 컴포넌트에 대응하며 마이페이지(B-26)와 프로필 설정(B-24)이
// 함께 쓴다. 두 화면이 같은 인스턴스를 참조하고 있어 처음부터 컴포넌트로 뺐다.
//
// 시안의 변형(편집 아이콘 · 역할 전환 버튼)은 boolean prop이 아니라 **이동 경로 유무**로 가른다.
// 도메인 컴포넌트가 라우트 문자열을 들고 있으면 라우팅이 바뀔 때 여기까지 고쳐야 한다.

interface ProfileCardProps {
  nickname: string;
  email: string;
  /** 프로필 수정 진입 경로. 넘기지 않으면 편집 아이콘을 감춘다. */
  editHref?: string;
  /** 역할 전환 진입 경로. 넘기지 않으면 전환 버튼을 감춘다. */
  roleSwitchHref?: string;
  /** 경로 없이 버튼만 노출하고 '준비 중' 토스트를 띄운다. S-01 착수 전까지 쓴다. */
  roleSwitchComingSoon?: boolean;
  roleSwitchLabel?: string;
}

const ROLE_SWITCH_CLASS =
  'bg-surface-quinary text-content-inverse text-label-13 rounded-round flex shrink-0 items-center gap-1 px-2 py-0.5';

export function ProfileCard({
  nickname,
  email,
  editHref,
  roleSwitchHref,
  roleSwitchComingSoon = false,
  roleSwitchLabel = '판매자 전환',
}: ProfileCardProps) {
  const roleSwitch = (
    <>
      <ArrowLeftRight aria-hidden className="size-4" />
      {roleSwitchLabel}
    </>
  );

  return (
    <section className="bg-background-default rounded-12 flex w-full items-center gap-3 p-4">
      {/* 프로필 이미지 업로드는 아직 없다. 시안의 기본 아바타를 그대로 쓴다. */}
      <span className="bg-surface-tertiary text-content-quarternary rounded-round flex size-16 shrink-0 items-center justify-center">
        <User aria-hidden className="size-6" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
        <div className="flex w-full items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <p className="text-heading-18 text-content-primary truncate">{nickname}</p>
            {editHref !== undefined && (
              <Link
                aria-label="프로필 설정"
                className="bg-surface-secondary text-content-primary rounded-round flex size-5 shrink-0 items-center justify-center"
                href={editHref}
              >
                <Pencil aria-hidden className="size-4" />
              </Link>
            )}
          </div>

          {roleSwitchHref !== undefined && (
            <Link className={ROLE_SWITCH_CLASS} href={roleSwitchHref}>
              {roleSwitch}
            </Link>
          )}
          {roleSwitchHref === undefined && roleSwitchComingSoon && (
            <ComingSoonButton className={ROLE_SWITCH_CLASS}>{roleSwitch}</ComingSoonButton>
          )}
        </div>

        <p className="text-body-14 text-content-tertiary truncate">{email}</p>
      </div>
    </section>
  );
}

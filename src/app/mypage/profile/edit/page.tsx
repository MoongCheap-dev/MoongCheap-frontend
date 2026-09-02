import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { LinkButton } from '@/features/user/components/LinkButton';
import { ProfileCard } from '@/features/user/components/ProfileCard';
import { SettingsList } from '@/features/user/components/SettingsList';
import { SettingsRow } from '@/features/user/components/SettingsRow';
import { SettingsSection } from '@/features/user/components/SettingsSection';
import { mockGetMyPageOverview } from '@/mocks/user';

export const metadata: Metadata = {
  title: '프로필 설정',
};

// B-24 프로필 설정. 마이페이지의 프로필 카드 편집 아이콘으로 진입한다. `User-02` `User-03`.
//
// 상단 앱바는 B-25 알림 설정이 같은 모양을 쓰게 되어 `components/layout/AppBar`로 올렸다.
export default async function ProfileEditPage() {
  const overview = await mockGetMyPageOverview();

  return (
    <main className="flex w-full flex-col pb-6">
      <AppBar backHref="/mypage" title="프로필 설정" />

      <div className="flex w-full flex-col gap-6 p-4">
        <div className="bg-background-default rounded-12 flex w-full flex-col">
          <ProfileCard email={overview.email} nickname={overview.nickname} />
          <div className="flex w-full items-start gap-2.5 px-4 pb-4">
            {/* 프로필 사진 변경(FN-B24-04)·닉네임 변경(FN-B24-03) 모두 Full 범위라 화면이 없다. */}
            <LinkButton label="프로필 사진 변경" />
            <LinkButton label="닉네임 변경" />
          </div>
        </div>

        <SettingsSection title="계정 설정">
          <SettingsList>
            {/* 두 화면 모두 기능명세에 행이 없고 아직 만들지 않았다. API는 명세에 있으니
                범위가 확정되면 경로를 넣는다. */}
            <SettingsRow comingSoon label="회원정보 변경" />
            <SettingsRow comingSoon label="비밀번호 변경" />
            {/* 환불계좌는 기능 명세서에 근거가 없다. `User-09`는 판매자 정산 계좌다. PM 확인 필요. */}
            <SettingsRow comingSoon label="환불계좌 관리" />
            {/* 로그아웃·회원탈퇴는 확인 모달이 필요해(`Auth-06` `Auth-11`) 이번 범위에서 제외한다. */}
            <SettingsRow label="로그아웃" />
            <SettingsRow label="회원탈퇴" />
          </SettingsList>
        </SettingsSection>
      </div>
    </main>
  );
}

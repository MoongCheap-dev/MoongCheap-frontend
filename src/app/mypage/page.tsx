import type { Metadata } from 'next';

import { LinkButton } from '@/features/user/components/LinkButton';
import { OrderProgressSummary } from '@/features/user/components/OrderProgressSummary';
import { ProfileCard } from '@/features/user/components/ProfileCard';
import { SettingsList } from '@/features/user/components/SettingsList';
import { SettingsRow } from '@/features/user/components/SettingsRow';
import { SettingsSection } from '@/features/user/components/SettingsSection';
import { mockGetMyPageOverview } from '@/mocks/user';

export const metadata: Metadata = {
  title: '마이페이지',
};

// B-26 마이페이지(구매자). 하위 화면 전부의 진입점이다. `User-01`.
//
// 페이지는 서버 컴포넌트다. 미구현 진입점의 '준비 중' 토스트는 `ComingSoonButton` 리프에서만
// 클라이언트 경계를 만든다.
//
// 시안의 진입점 중 화면이 아직 없는 것이 많다. 링크로 두면 404가 나므로 경로를 비워 토스트로
// 돌린다(의사결정 기록 2026-08-28 "미구현 진입점 인터랙션은 토스트 일괄 표시").
export default async function MyPage() {
  const overview = await mockGetMyPageOverview();

  return (
    <main className="flex w-full flex-col pb-6">
      <header className="flex w-full flex-col gap-1 p-4">
        <h1 className="text-heading-24 text-content-primary w-full">마이페이지</h1>
      </header>

      <div className="flex w-full flex-col gap-6 px-4">
        {/* 판매자 전환(S-01)은 MVP지만 화면이 아직 없다. 다음 작업으로 잡혀 있으니
            착수하면 roleSwitchHref="/mypage/seller-apply"로 되돌린다. */}
        <ProfileCard
          editHref="/mypage/profile/edit"
          email={overview.email}
          nickname={overview.nickname}
          roleSwitchComingSoon
        />

        {/* 주문 내역(B-21)은 도메인 B라 명세도 화면도 아직 없다. */}
        <SettingsSection actionLabel="자세히보기" title="진행중인 주문내역">
          <div className="flex w-full flex-col gap-1.5">
            <OrderProgressSummary counts={overview.orderProgress} />
            <LinkButton label="취소/교환/반품 조회" />
          </div>
        </SettingsSection>

        <SettingsSection title="설정">
          <SettingsList>
            {/* 결제수단 등록(B-14)은 팀원 담당분이라 아직 화면이 없다. */}
            <SettingsRow comingSoon label="결제수단 등록 • 변경" />
            <SettingsRow href="/mypage/addresses" label="배송지 관리" />
            <SettingsRow href="/mypage/notifications/settings" label="알림설정" />
            {/* 고객센터·1:1 문의는 기능 명세서에 요구사항이 없다. 디자인팀이 임의로 넣은 항목이라
                화면만 그리고 탭하면 준비 중 토스트를 띄운다. PM 확인 후 경로를 넣는다. */}
            <SettingsRow comingSoon label="고객센터" />
            <SettingsRow comingSoon label="1:1 문의" />
          </SettingsList>
        </SettingsSection>
      </div>
    </main>
  );
}

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
// 상호작용이 없어 서버 컴포넌트로 둔다. 이동은 전부 <Link>라 클라이언트 경계가 필요 없다.
export default async function MyPage() {
  const overview = await mockGetMyPageOverview();

  return (
    <main className="flex w-full flex-col pb-6">
      <header className="flex w-full flex-col gap-1 p-4">
        <h1 className="text-heading-24 text-content-primary w-full">마이페이지</h1>
      </header>

      <div className="flex w-full flex-col gap-6 px-4">
        <ProfileCard
          editHref="/mypage/profile/edit"
          email={overview.email}
          nickname={overview.nickname}
          roleSwitchHref="/mypage/seller-apply"
        />

        <SettingsSection actionHref="/orders" actionLabel="자세히보기" title="진행중인 주문내역">
          <div className="flex w-full flex-col gap-1.5">
            <OrderProgressSummary counts={overview.orderProgress} />
            <LinkButton href="/orders?filter=claims" label="취소/교환/반품 조회" />
          </div>
        </SettingsSection>

        <SettingsSection title="설정">
          <SettingsList>
            <SettingsRow href="/mypage/payment-methods" label="결제수단 등록 • 변경" />
            <SettingsRow href="/mypage/addresses" label="배송지 관리" />
            <SettingsRow href="/mypage/notifications/settings" label="알림설정" />
            {/* 고객센터·1:1 문의는 기능 명세서에 요구사항이 없다. 디자인팀이 임의로 넣은 항목이라
                화면만 그리고 이동은 막아 둔다. PM 확인 후 경로를 넣는다. */}
            <SettingsRow label="고객센터" />
            <SettingsRow label="1:1 문의" />
          </SettingsList>
        </SettingsSection>
      </div>
    </main>
  );
}

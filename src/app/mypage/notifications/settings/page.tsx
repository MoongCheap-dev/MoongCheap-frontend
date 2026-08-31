import type { Metadata } from 'next';

import { AppBar } from '@/components/layout/AppBar';
import { MarketingConsentSection } from '@/features/user/components/MarketingConsentSection';
import { SettingsNavRow } from '@/features/user/components/SettingsNavRow';
import { mockGetMarketingConsent } from '@/mocks/notification';

export const metadata: Metadata = {
  title: '알림 설정',
};

// 활동 알림 하위 항목. 네 개 모두 기능 명세서에 근거가 없다.
//
// 팔로잉·스토어는 뭉치의 도메인에 아예 없는 개념이고(판매자 팔로우·스토어 화면이 없다),
// 새소식·키워드도 대응하는 요구사항이 없다. B-26의 `고객센터`·`1:1 문의`와 같은 처리로
// 화면만 그리고 이동은 막는다. PM 확인 후 경로를 넣거나 항목을 뺀다.
const ACTIVITY_NOTIFICATION_ROWS = [
  '새소식 알림 설정',
  '팔로잉 알림 설정',
  '키워드 알림 설정',
  '스토어 재입고 알림',
] as const;

const ACTIVITY_NOTICE =
  '수신 거부 설정이 시스템에 실시간 반영되지 않은 경우 알림이 발송될 수 있어요. (1시간 내 반영)';

// B-25 알림 설정. 마이페이지 설정 목록에서 진입한다.
//
// 마이페이지 셸이 background/subtle을 깔지만 이 화면은 카드 없이 전체가 흰 바탕이라
// background/default로 덮는다.
export default async function NotificationSettingsPage() {
  const consent = await mockGetMarketingConsent();

  return (
    <main className="bg-background-default flex w-full flex-1 flex-col gap-5 pb-6">
      <AppBar backHref="/mypage" title="알림 설정" />

      <MarketingConsentSection initialConsent={consent} />

      <section className="flex w-full flex-col">
        <h2 className="text-section-title-16 text-content-primary px-4 py-3">활동 알림</h2>

        <ul className="flex w-full flex-col">
          {ACTIVITY_NOTIFICATION_ROWS.map((label) => (
            <SettingsNavRow key={label} label={label} />
          ))}
        </ul>

        <p className="text-caption-12 text-content-quinary px-4 py-3">{ACTIVITY_NOTICE}</p>
      </section>
    </main>
  );
}

'use client';

import { useState } from 'react';

import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { NotificationChannelRow } from '@/features/user/components/NotificationChannelRow';
import type { MarketingConsent } from '@/types/notification';

// B-25 알림 설정의 마케팅 수신 동의 묶음. 토글 상태를 들고 있어 클라이언트 경계다.
//
// 화면에서 상태를 갖는 부분이 여기뿐이라 페이지는 서버 컴포넌트로 두고 이 조각만 잘라냈다.
// 아래 "활동 알림" 목록은 이동만 하므로 페이지가 직접 그린다.
//
// ⚠️ 저장 동작이 없다. 알림 설정 API 규격을 아직 받지 못해 화면 상태만 바꾼다.
// 규격이 나오면 onChange에서 mutation을 호출하고 실패 시 이전 값으로 되돌린다.

const MARKETING_NOTICE =
  '이벤트, 혜택 등에 대한 정보를 이메일, SMS, 앱 알림(앱 사용시)으로 받아 볼 수 있어요. (동의 철회 시까지)';

interface MarketingConsentSectionProps {
  initialConsent: MarketingConsent;
}

export function MarketingConsentSection({ initialConsent }: MarketingConsentSectionProps) {
  const [consent, setConsent] = useState<MarketingConsent>(initialConsent);

  // 전체 동의를 끄면 채널도 함께 끈다. 동의 없이 채널만 켜져 있으면 수신 근거가 없다.
  // 동의를 다시 켤 때 채널을 자동으로 켜지는 않는다(사용자가 고른 채널을 대신 정하지 않는다).
  function handleAgreedChange(agreed: boolean) {
    setConsent(
      agreed ? { ...consent, agreed: true } : { agreed: false, push: false, email: false },
    );
  }

  return (
    <section className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between px-4 py-3">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-section-title-16 text-content-primary">
            회원·서비스 이벤트 혜택 알림 동의
          </p>
          <p className="text-body-14 text-content-quarternary">다양한 혜택, 소식을 알려드려요.</p>
        </div>

        <ToggleSwitch
          checked={consent.agreed}
          label="회원·서비스 이벤트 혜택 알림 동의"
          onChange={handleAgreedChange}
        />
      </div>

      {/* 전체 동의가 꺼져 있으면 채널은 켤 수 없다. */}
      <NotificationChannelRow
        checked={consent.push}
        disabled={!consent.agreed}
        label="푸시 알림"
        onChange={(push) => setConsent({ ...consent, push })}
      />
      <NotificationChannelRow
        checked={consent.email}
        disabled={!consent.agreed}
        label="이메일"
        onChange={(email) => setConsent({ ...consent, email })}
      />

      <p className="text-caption-12 text-content-quinary px-4 py-3">{MARKETING_NOTICE}</p>
    </section>
  );
}

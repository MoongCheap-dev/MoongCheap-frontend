import { Suspense } from 'react';

import type { Metadata } from 'next';

import { SignupWizard } from '../_components/SignupWizard';

export const metadata: Metadata = {
  title: '회원가입',
};

export default function SignupPage() {
  // SignupWizard가 useSearchParams(스텝 읽기)를 쓰므로 Suspense 경계로 감싼다(프로덕션 빌드 요건).
  return (
    <Suspense fallback={null}>
      <SignupWizard />
    </Suspense>
  );
}

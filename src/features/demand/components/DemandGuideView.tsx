import Image from 'next/image';

import { GoBackButton } from '@/components/ui/GoBackButton';
import { DEMAND_GUIDE, DEMAND_GUIDE_STEPS } from '@/constants/demandGuide';

// B-12 수요 상세 화면 본문. 시안 node 981:15479("뭉치 진행 과정").
//
// 특정 수요 데이터를 그리지 않고 공구 진행 방식을 5단계 카드로 안내하는 정적 화면이다. 그래서
// API·mock 없이 constants/demandGuide.ts의 고정 카피만 렌더한다(진입 경로는 딜별이지만 화면
// 내용은 공통이라 demandId는 URL 식별용으로만 받고 여기선 쓰지 않는다).
//
// 시안엔 뒤로가기 헤더가 없고 하단 '확인' 버튼으로 닫는다 — router.back()이 필요한 유일한 조각이라
// GoBackButton을 그 버튼으로 재사용하고 페이지는 서버 컴포넌트로 둔다(ComingSoonButton과 같은 방침).
//
// 단계 번호는 배열 순서(index+1)로 매긴다. 순서 있는 안내라 <ol>/<li>로 의미를 준다.

export function DemandGuideView() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <section className="flex flex-col gap-1 px-4 pt-4 pb-3">
          <h1 className="text-heading-24 text-content-primary">{DEMAND_GUIDE.title}</h1>
          <p className="text-body-14 text-content-tertiary">{DEMAND_GUIDE.subtitle}</p>
        </section>

        <ol className="flex flex-col gap-4 px-4">
          {DEMAND_GUIDE_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="bg-surface-primary rounded-12 flex items-center gap-2 p-4"
            >
              <span className="relative size-12 shrink-0">
                <Image alt="" className="object-contain" fill sizes="48px" src={step.icon} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-title-17 text-content-primary">
                  {index + 1}. {step.title}
                </span>
                <span className="text-body-14 text-content-tertiary">{step.description}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* 하단 고정 CTA. 검정 tertiary 버튼, 탭 시 뒤로가기로 화면을 닫는다. */}
      <footer className="bg-background-default sticky bottom-0 w-full p-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <GoBackButton className="bg-surface-button-tertiary-default text-content-inverse text-button-15 active:bg-surface-button-tertiary-pressed rounded-8 flex h-12 w-full items-center justify-center">
          {DEMAND_GUIDE.confirm}
        </GoBackButton>
      </footer>
    </>
  );
}

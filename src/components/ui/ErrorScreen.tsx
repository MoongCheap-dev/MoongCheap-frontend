import type { ReactNode } from 'react';

import Image from 'next/image';

import { ERROR_SCREEN_DESCRIPTION, ERROR_SCREEN_TITLE } from '@/constants/commonMessages';

// 전체화면 오류 공통 레이아웃. 시안 '모든화면 error 페이지'(453:26351).
//
// 시안 설명이 용도를 못박아 뒀다 — "인터넷 연결 불완전 / 오류 / 조회 실패 등 에러페이지는
// 이페이지로 연결합니다." 그래서 에러 바운더리(error.tsx)와 404가 이 컴포넌트를 공유한다.
//
// 훅도 핸들러도 갖지 않아 서버 컴포넌트에서도 쓸 수 있다. 하단 액션은 호출부가 children으로
// 넣는다(재시도는 client의 reset(), 404는 <Link>라 성격이 다르다). 두 액션의 생김새는
// ERROR_ACTION_CLASS로 맞춘다.
//
// 목록 안에 끼워 넣는 인라인 오류는 ui/ErrorState.tsx가 따로 담당한다(FN-B03-01).

/**
 * 하단 액션의 공통 클래스. 시안 값은 90×40 · radius 20 · surface/button/tertiary(#303030).
 *
 * 폭은 고정하지 않는다. 시안의 90px은 '다시 시도'(px-4 기준 88px)에서 자연스럽게 나오고,
 * 404처럼 라벨이 길어지는 화면도 같은 클래스를 쓸 수 있다.
 *
 * ui/Button은 코랄 secondary 필 버튼이라 배경·글자색·radius를 전부 덮어야 해서 쓰지 않는다.
 * 버튼 variant 규약이 생기면 그때 합친다.
 */
export const ERROR_ACTION_CLASS =
  'text-button-14 bg-surface-button-tertiary-default text-content-inverse hover:bg-surface-button-tertiary-hover active:bg-surface-button-tertiary-pressed focus-visible:ring-effect-focus-ring-primary rounded-20 flex h-10 items-center justify-center px-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

interface ErrorScreenProps {
  /** 제목. 기본은 시안 문구. */
  title?: string;
  /** 본문. 시안이 두 줄로 끊어 놓아 줄 단위 배열로 받는다. */
  description?: readonly string[];
  /** 하단 액션(재시도 버튼·홈 링크 등). 시안은 1개. */
  children?: ReactNode;
}

export function ErrorScreen({
  title = ERROR_SCREEN_TITLE,
  description = ERROR_SCREEN_DESCRIPTION,
  children,
}: ErrorScreenProps) {
  return (
    // flex-1로 부모가 준 높이를 받아 그 안에서 가운데 정렬한다. 부모 셸은 호출부가 씌운다.
    // 간격은 시안 실측값 — 이미지 32 텍스트블록, 제목 8 본문, 본문 20 버튼.
    <div
      role="alert"
      className="flex w-full flex-1 flex-col items-center justify-center gap-8 px-4 text-center"
    >
      {/* 제목이 상태를 설명하므로 삽화는 장식으로 둔다.
          ⚠️ 현재 파일은 시안 크기 그대로인 1x(123×112)라 고해상도 화면에서 흐리다.
             디자인에서 원본을 받으면 같은 경로에 덮어쓴다(코드 수정 불필요). */}
      <Image src="/images/error-cone.png" alt="" width={123} height={112} priority />

      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-heading-18 text-content-primary">{title}</h1>
          <p className="text-body-14 text-content-quarternary">
            {description.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}

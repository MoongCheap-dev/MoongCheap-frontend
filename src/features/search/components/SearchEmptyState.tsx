import Image from 'next/image';

import { ComingSoonButton } from '@/components/ui/ComingSoonButton';
import { ERROR_ACTION_CLASS } from '@/components/ui/ErrorScreen';
import { CATALOG_SEARCH_ASSETS } from '@/constants/assets';
import { SEARCH_EMPTY } from '@/constants/searchMessages';

// B-06 검색 결과 0건. 시안 `1153:72790`의 `complete-img-text-button` 컴포넌트(`647:321`).
//
// 공용 `EmptyState`를 쓰지 않는다. 그쪽은 다른 시안에서 나온 것이라 삽화 크기 · 제목 굵기 · 본문
// 크기 · 간격이 전부 다르다(body-15/caption-12 대 heading-18/button-14, 삽화 없음). 덮어쓸 값이
// 컴포넌트 전체라 재사용이 아니다.
//
// `complete-img-text-button`은 Figma에서는 공용 컴포넌트지만 우리 코드에서 쓰는 화면은 여기가
// 처음이다. 두 번째 사용처가 생기면 components/ui로 올린다(공통 UI 2회 규칙).
//
// 버튼은 눌러도 갈 곳이 없어 '준비 중' 토스트다. 시안 `1153:72796`이 같은 처리를 그려 뒀다
// (시안의 토스트 문구는 `미구현된 기능입니다.`인데, 우리는 기능정의서 문구
// `준비 중인 기능이에요`로 통일한다 - 2026-09-09 결정).

export function SearchEmptyState() {
  return (
    // 시안: 검색바 아래 96, 좌우 여백 16, 삽화와 텍스트 사이 8.
    <div className="flex w-full flex-col items-center gap-2 px-4 pt-24">
      {/* 시안: 200×200. 파일은 512 원본이라 next/image가 배율에 맞춰 내려보낸다. */}
      <Image alt="" height={200} src={CATALOG_SEARCH_ASSETS.emptyResult} width={200} />

      {/* 시안: 텍스트 블록과 버튼 사이 20. */}
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h2 className="text-heading-18 text-content-primary w-full">{SEARCH_EMPTY.title}</h2>
          <div className="text-button-14 text-content-quarternary flex w-full flex-col items-center">
            {SEARCH_EMPTY.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        {/* 시안 값(#303030 · h40 · radius 20 · button-14 · 흰 글자)이 오류 화면 액션과 같아
            ERROR_ACTION_CLASS를 그대로 쓴다. 폭은 시안이 131인데 그 클래스의 방침대로
            고정하지 않고 문구에서 나오게 둔다. */}
        <ComingSoonButton className={ERROR_ACTION_CLASS}>
          {SEARCH_EMPTY.actionLabel}
        </ComingSoonButton>
      </div>
    </div>
  );
}

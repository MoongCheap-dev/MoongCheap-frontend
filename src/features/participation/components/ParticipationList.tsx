'use client';

import { useMemo, useState } from 'react';

import { PackageOpen, SearchX } from 'lucide-react';

import { AlertDialog } from '@/components/ui/AlertDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { SegmentControl } from '@/components/ui/SegmentControl';
import { useToast } from '@/components/ui/Toast';
import {
  getParticipationStatusMeta,
  PARTICIPATION_TAB_ALL,
  PARTICIPATION_TABS,
  type ParticipationTab,
} from '@/constants/participationStatus';
import { ParticipationCard } from '@/features/participation/components/ParticipationCard';
import type { ParticipationItem } from '@/types/participation';

// B-17 내 뭉치 참여 목록의 상호작용 셸(client). 서버에서 받은 초기 목록을 상태 탭으로 거르고,
// 날짜별로 묶어 보여 준다. 필터·그룹핑은 순수 계산이라 useMemo로 memo한다.
//
// 상태별 카드 액션(시안): **해당 필터 탭에서만** 카드 아래 버튼이 뜬다('전체' 탭엔 없음).
//  · 확인필요(ACTION_REQUIRED) — '대체상품 확인하기' → 대체상품 확인(B-16). 라우트 부재라 '준비 중' 토스트.
//  · 배정완료(ALLOCATED)   — '낙찰 취소하기' → 파괴적 확인 다이얼로그. mock은 확인 시 낙관적 제거.

// 낙찰 취소 확인 다이얼로그 문구. 시안 텍스트 기준(최종 카피 확정 시 이 상수만 손본다).
const CANCEL_AWARD_CONFIRM = {
  title: '낙찰을 취소하시겠어요?',
  message: '취소하면 이 공구 참여가 종료되며, 다시 참여하려면 처음부터 신청해야 해요.',
  confirmLabel: '낙찰 취소',
} as const;

interface DateGroup {
  date: string;
  items: ParticipationItem[];
}

/**
 * 필터된 목록을 날짜별로 묶는다. 그룹 순서를 입력 정렬에 의존하지 않도록, 먼저 날짜 내림차순으로
 * 정렬한 뒤 묶는다('YYYY.MM.DD'는 zero-pad라 문자열 비교가 곧 날짜 비교). JS sort는 안정 정렬이라
 * 같은 날짜 안의 원래 순서(응답 순서)는 보존된다.
 */
function groupByDate(items: ParticipationItem[]): DateGroup[] {
  const groups: DateGroup[] = [];
  const indexByDate = new Map<string, number>();

  const sorted = [...items].sort((a, b) => b.requestedAt.localeCompare(a.requestedAt));
  for (const item of sorted) {
    const existing = indexByDate.get(item.requestedAt);
    if (existing === undefined) {
      indexByDate.set(item.requestedAt, groups.length);
      groups.push({ date: item.requestedAt, items: [item] });
    } else {
      groups[existing].items.push(item);
    }
  }

  return groups;
}

interface ParticipationListProps {
  initialItems: ParticipationItem[];
}

export function ParticipationList({ initialItems }: ParticipationListProps) {
  const [tab, setTab] = useState<ParticipationTab>(PARTICIPATION_TAB_ALL);
  // 낙찰 취소는 목록을 바꾸므로(낙관적 제거) 목록을 상태로 들고 있는다.
  const [items, setItems] = useState<ParticipationItem[]>(initialItems);
  const [cancelTarget, setCancelTarget] = useState<ParticipationItem | null>(null);
  const { showComingSoon, showToast } = useToast();

  const groups = useMemo(() => {
    const filtered =
      tab === PARTICIPATION_TAB_ALL ? items : items.filter((item) => item.status === tab);
    return groupByDate(filtered);
  }, [items, tab]);

  const hasAnyParticipation = items.length > 0;
  const isEmpty = groups.length === 0;
  // 시안: 액션 버튼은 해당 상태 필터 탭에서만 노출('전체' 제외).
  const inFilteredTab = tab !== PARTICIPATION_TAB_ALL;

  // 낙찰 취소 확정(mock). 대상 항목을 목록에서 제거하고 안내 토스트를 띄운다. 실제 상태 전이는 BE 연동 시.
  function handleConfirmCancel() {
    if (cancelTarget === null) {
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== cancelTarget.id));
    setCancelTarget(null);
    showToast('낙찰을 취소했어요');
  }

  return (
    <div className="flex w-full flex-1 flex-col pb-28">
      <SegmentControl
        ariaLabel="참여 상태 필터"
        onChange={setTab}
        options={PARTICIPATION_TABS}
        value={tab}
      />

      {isEmpty ? (
        // 참여 이력 자체가 없으면 콜드스타트, 있으면 현재 탭 결과 없음으로 구분한다.
        // 아이콘은 exception 일러스트(#60) 병합 전까지 lucide placeholder를 쓴다.
        hasAnyParticipation ? (
          <EmptyState
            className="flex-1"
            description="다른 상태 탭을 확인해 보세요."
            icon={<SearchX aria-hidden className="size-12" />}
            title={
              tab === PARTICIPATION_TAB_ALL
                ? '해당하는 내역이 없어요'
                : getParticipationStatusMeta(tab).emptyTitle
            }
          />
        ) : (
          <EmptyState
            className="flex-1"
            description="관심 있는 상품의 수요에 참여해 보세요."
            icon={<PackageOpen aria-hidden className="size-12" />}
            title="아직 참여한 수요가 없어요"
          />
        )
      ) : (
        <div className="flex w-full flex-col">
          {groups.map((group, index) => (
            <section key={group.date} className="flex w-full flex-col">
              {/* 날짜 그룹 사이 회색 구분 밴드(첫 그룹 제외). */}
              {index > 0 && <div aria-hidden className="bg-surface-secondary h-2 w-full" />}
              <h2 className="text-heading-18 text-content-primary px-4 pt-4 pb-2">{group.date}</h2>
              <ul className="flex w-full flex-col gap-3 px-4 pb-2">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <ParticipationCard
                      action={renderAction(item, inFilteredTab, {
                        onSubstitute: showComingSoon,
                        onCancel: () => setCancelTarget(item),
                      })}
                      item={item}
                      // 카드 본문 탭 → 수요 상세(B-12). 라우트 부재라 '준비 중' 토스트.
                      onOpenDetail={showComingSoon}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <AlertDialog
        cancelLabel="돌아가기"
        confirmLabel={CANCEL_AWARD_CONFIRM.confirmLabel}
        isOpen={cancelTarget !== null}
        message={CANCEL_AWARD_CONFIRM.message}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancel}
        title={CANCEL_AWARD_CONFIRM.title}
      />
    </div>
  );
}

interface ActionHandlers {
  onSubstitute: () => void;
  onCancel: () => void;
}

/**
 * 카드 하단 액션 버튼. 시안대로 해당 상태 필터 탭에서만 렌더한다(전체 탭·기타 상태는 없음).
 * 두 버튼 모두 회색 풀폭 버튼 스타일이다.
 */
function renderAction(item: ParticipationItem, inFilteredTab: boolean, handlers: ActionHandlers) {
  if (!inFilteredTab) {
    return undefined;
  }

  const label =
    item.status === 'ACTION_REQUIRED'
      ? '대체상품 확인하기'
      : item.status === 'ALLOCATED'
        ? '낙찰 취소하기'
        : null;
  if (label === null) {
    return undefined;
  }

  const onClick = item.status === 'ACTION_REQUIRED' ? handlers.onSubstitute : handlers.onCancel;

  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-surface-secondary text-content-primary text-button-14 active:bg-surface-tertiary rounded-12 flex h-11 w-full items-center justify-center"
    >
      {label}
    </button>
  );
}

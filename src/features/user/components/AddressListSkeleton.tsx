import { Skeleton } from '@/components/ui/Skeleton';

// B-30 배송지 목록 첫 조회 자리표시자.
//
// ⚠️ 로딩 화면은 시안이 없다(FN-B30-01이 '디자인 필요'로 남겨 뒀다). 새 화면을 그리지 않고
//    실제 목록과 같은 뼈대(추가 버튼 + 카드)만 회색 블록으로 세운다. 문구·아이콘은 넣지 않는다.
//    개수를 모르는 채로 '신규/새 배송지 추가'를 그리면 응답 후 문구가 바뀌어 깜빡이기 때문이다
//    (AddressListView가 로딩 중에 아무것도 그리지 않던 이유와 같다).
//
// 조회 실패 화면을 공용 `ErrorScreen`으로 대신한 것과 같은 방침이다. 시안이 나오면 교체한다.

/**
 * 자리표시 카드 수. 실제 개수는 응답 전에 알 수 없으므로 화면 상단을 채우는 최소치만 둔다.
 * 배열 인덱스를 key로 쓰지 않으려고 이름을 붙여 둔다.
 */
const PLACEHOLDER_KEYS = ['first', 'second'] as const;

export function AddressListSkeleton() {
  return (
    <div aria-busy className="flex w-full flex-col gap-5 px-4 pt-5" role="status">
      <span className="sr-only">배송지 목록을 불러오는 중</span>

      {/* 추가 버튼 자리. 실제 버튼과 같은 높이다(py-3 + 22px 글자 = 46). */}
      <Skeleton className="rounded-8 h-[46px] w-full" />

      <div className="flex w-full flex-col gap-5">
        {PLACEHOLDER_KEYS.map((key) => (
          // 테두리·여백은 AddressCard와 같은 값을 쓴다. 안쪽 글자 자리만 블록으로 바꾼다.
          <div
            className="border-border-quarternary rounded-12 flex w-full flex-col border px-4"
            key={key}
          >
            <div className="border-border-quarternary flex w-full flex-col gap-3 border-b py-3">
              {/* 배송지명 */}
              <Skeleton className="h-[22px] w-24" />

              <div className="flex w-full flex-col gap-1">
                {/* 주소 · 공동현관번호 · 수령인 세 줄 */}
                <Skeleton className="h-[22px] w-full" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>

            {/* 수정 · 삭제 행. 실제 버튼과 같은 폭(54)이다. */}
            <div className="flex items-center gap-4 py-2">
              <Skeleton className="h-5 w-[54px]" />
              <Skeleton className="h-5 w-[54px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

# 코드 스타일 컨벤션

파일·심볼 네이밍과 코드 스타일 규칙입니다. **폴더 구조**(레이어 + 기능 하이브리드)는 [structure-convention/SKILLS.md](../structure-convention/SKILLS.md)에서 별도로 다룹니다.

---

## 1. 원칙 (기존 설정과 정합)

- **named export 사용** — `export function`. `export default` 금지 (App Router 예약 파일·설정 파일은 예외). `import/no-default-export`가 강제.
- **`@/` 별칭** — `src` 기준 절대경로. `../../../` 상대경로 지옥 회피 (`tsconfig.json`).
- **`any` 금지**, 인라인 스타일 금지 (Tailwind 클래스 사용).
- import 순서는 `import/order`가 자동 정렬 (`npm run lint -- --fix`).

## 2. 파일·폴더 이름

| 대상                 | 규칙                    | 예시                                                 |
| -------------------- | ----------------------- | ---------------------------------------------------- |
| 컴포넌트 파일        | PascalCase `.tsx`       | `DemandCard.tsx`, `BidStatus.tsx`                    |
| 훅 파일              | camelCase, `use` 접두사 | `useDemandList.ts`, `useDebounce.ts`                 |
| 유틸·라이브러리      | camelCase               | `cn.ts`, `formatPrice.ts`                            |
| 타입 전용 파일       | camelCase               | `demand.ts`, `bid.ts`                                |
| 상수 파일            | camelCase               | `routes.ts`, `queryKeys.ts`                          |
| App Router 예약 파일 | 프레임워크 규약 소문자  | `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` |
| 폴더                 | kebab-case              | `demand-list/`, `bid-status/`                        |

## 3. 심볼 이름

| 대상            | 규칙                           | 예시                                 |
| --------------- | ------------------------------ | ------------------------------------ |
| 컴포넌트        | PascalCase                     | `export function DemandCard() {}`    |
| 훅              | `use` + camelCase              | `export function useDemandList() {}` |
| 함수·변수       | camelCase                      | `formatPrice`, `isLoading`           |
| 상수            | UPPER_SNAKE 또는 as const 객체 | `MAX_QUANTITY`, `ROUTES`             |
| 타입·인터페이스 | PascalCase                     | `type Demand`, `type BidStatus`      |
| 불리언          | `is`/`has`/`can` 접두사        | `isOpen`, `hasBid`, `canParticipate` |
| 이벤트 핸들러   | `handle` 접두사                | `handleSubmit`, `handleClick`        |
| 이벤트 prop     | `on` 접두사                    | `onSelect`, `onClose`                |

## 4. 도메인 용어 (혼용 방지)

서비스 핵심 용어의 영문 표기를 통일합니다. 백엔드 기능명세서/API 규격이 나오면 **그쪽 용어에 맞춰 갱신**합니다.

| 한글             | 영문(잠정)          | 비고                                               |
| ---------------- | ------------------- | -------------------------------------------------- |
| 수요             | demand              | 소비자가 등록하는 원하는 상품                      |
| 응찰             | bid                 | 셀러가 모인 수요에 거는 제안                       |
| 낙찰             | award / winningBid  | 자동 낙찰 결과 (용어 확정 필요)                    |
| 공동구매/공구 딜 | groupDeal           | 도메인 B                                           |
| 참여             | participation       | 소비자의 공구 참여                                 |
| 성사(판정)       | settlement 판정     | 도메인 B. 정산과 혼동 주의                         |
| 정산             | payout / settlement | 셀러 정산. 위 "성사"와 영문 겹칠 수 있어 확정 필요 |

> ⚠️ 영문 용어는 **잠정**입니다. 백엔드 API 필드명과 어긋나면 매핑 비용이 생기므로, 규격 확정 시 이 표를 최우선으로 맞춥니다.

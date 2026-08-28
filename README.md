# MoongCheap (뭉치)

**살 사람이 먼저 모이면, 파는 쪽이 조건을 맞춘다.**

수요 집결형 역경매 공동구매 플랫폼의 프론트엔드 저장소입니다.
kt cloud TECH UP 2기 통합 프로젝트 2팀 · 브이

<p>
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Node_20-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node 20" />
</p>

---

## 무엇을 만드나

기존 공동구매는 판매자가 조건을 먼저 정하고 소비자를 모읍니다. 뭉치는 순서를 뒤집습니다.

```
수요 등록  ->  판매자 응찰  ->  라운드 마감  ->  낙찰  ->  자동 결제  ->  발송  ->  수령 확인
 상품·수량      가격·수량 조건     7일         총액 최저 1건   48시간 뒤
```

| 단계            | 무슨 일이 일어나나                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| **수요 등록**   | 소비자가 상품과 수량을 올립니다. **가격은 입력하지 않습니다.** AI 챗봇이 주 진입점입니다               |
| **응찰**        | 판매자가 수요를 보고 가격·최소 성사 수량·최대 공급 가능 수량을 제시합니다. 수요 지정 없이는 불가합니다 |
| **라운드 마감** | 등록 7일 후 자동 마감됩니다. 수요 등록과 응찰이 같은 구간에서 **동시에** 진행됩니다                    |
| **낙찰**        | 총액이 가장 낮은 응찰 1건을 고릅니다. **부분 낙찰은 없습니다.** 최소 성사 수량에 못 미치면 미달입니다  |
| **결제**        | 낙찰 후 **48시간이 취소 가능 기한**이고, 경과하면 등록된 결제수단으로 일괄 자동결제됩니다              |
| **발송·수령**   | 판매자가 운송장을 입력하면 배송이 시작됩니다. 배송완료 7일 뒤 자동 수령완료, 청약철회 7일 후 정산 확정 |

> **용어 주의.** "딜(deal)"이라는 단일 엔티티는 없습니다. `수요(Board)` -> `상품(Product, 곧 응찰)` -> `공동구매(GroupBuy)` 3단 구조입니다. 라우트·타입·목 데이터는 모두 이 3단을 따릅니다.
>
> **상태 이름·기한·판정 규칙의 단일 출처는 IA의 「수요 상태 정의」 탭입니다.** 임의로 상태를 추가하지 않습니다. 그리고 IA 시트 자체도 정본이 아닙니다 - 최신 정본은 디스코드 `의사결정-기록채널`입니다.

**소비자는 다른 사람의 수요를 조회할 수 없습니다.** 소비자 홈은 수요 목록이 아니라 낙찰 상품 게시판이고, 수요 목록은 판매자 전용 화면입니다.

### 백엔드는 별도 저장소

이 저장소는 프론트엔드만 담고 있습니다. 백엔드는 REST API로 제공되며 두 도메인으로 나뉩니다. 프론트는 양쪽을 모두 소비합니다.

| 도메인                     | 범위                                                 |
| -------------------------- | ---------------------------------------------------- |
| **도메인 A** 카탈로그·계정 | 인증, 회원, 상품, 재고, 알림, 검색, AI 챗봇          |
| **도메인 B** 거래·공동구매 | 장바구니, 주문, 결제, 공구 딜, 참여, 성사 판정, 정산 |

`src/app/api/` Route Handler는 두지 않습니다.

---

## 팀

| <a href="https://github.com/Hyejinjin-An"><img src="https://avatars.githubusercontent.com/u/115617565?v=4" width="110" alt="안혜진" /></a> | <a href="https://github.com/ParkSiYeol3"><img src="https://avatars.githubusercontent.com/u/162967437?v=4" width="110" alt="박시열" /></a> |
| :----------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
|                                               **[안혜진](https://github.com/Hyejinjin-An)**                                                |                                               **[박시열](https://github.com/ParkSiYeol3)**                                                |
|                             인증 화면(로그인·회원가입·소셜)<br />공통 레이어(상태·상수·화면 카탈로그·공통 UI)                              |                    프로젝트 세팅 · 디자인 토큰 파이프라인<br />마이페이지 계열(허브·프로필·알림·배송지) · 판매자 전환                     |

---

## 시작하기

Node 20 (`.nvmrc`), 패키지 매니저는 **npm**입니다.

```bash
npm ci                # package-lock.json 기준 설치 (npm install 대신 권장)
cp .env.local.example .env.local
npm run dev           # http://localhost:3000
```

| 스크립트               | 하는 일                         |
| ---------------------- | ------------------------------- |
| `npm run dev`          | 개발 서버 (Turbopack)           |
| `npm run build`        | 프로덕션 빌드                   |
| `npm run lint`         | ESLint (`-- --fix`로 자동 수정) |
| `npm run typecheck`    | `tsc --noEmit`                  |
| `npm run format`       | Prettier 적용                   |
| `npm run format:check` | Prettier 검사 (CI용)            |

### 환경변수

현재 필요한 값은 하나뿐입니다. 비워 두면 소셜 로그인 버튼이 비활성화될 뿐, 나머지 화면은 정상 동작합니다.

```
NEXT_PUBLIC_API_BASE_URL=   # 백엔드 베이스 URL. 소셜 로그인 인가 이동의 기준 주소
```

---

## 기술 스택

실제로 설치된 것만 적었습니다. 도입을 미룬 것과 그 이유는 [`docs/deferred-setup.md`](./docs/deferred-setup.md)에 있습니다.

| 분류       | 사용 기술                                         | 고른 이유                                                                                       |
| ---------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 프레임워크 | Next.js 16 (App Router, Turbopack)                | 수요 -> 응찰 -> 공동구매 -> 주문으로 이어지는 화면 흐름을 라우트 구조로 그대로 표현             |
| UI         | React 19                                          | 상품 카드·응찰 목록처럼 반복되는 UI의 재사용                                                    |
| 언어       | TypeScript (`strict`, `any` 금지)                 | 외부 백엔드 응답을 다룰 때 생기는 null 처리 누락을 컴파일 타임에 차단                           |
| 스타일     | Tailwind CSS v4 + `clsx` + `tailwind-merge`       | CSS-first 설정이라 디자인 토큰을 CSS 변수로 그대로 주입할 수 있음                               |
| 아이콘     | `lucide-react`                                    | 시안 글리프와 맞는 아이콘은 에셋 대신 대체해 번들·만료 URL 문제를 피함                          |
| 폼·검증    | `react-hook-form` + `zod` + `@hookform/resolvers` | 비제어 입력이라 리렌더가 적고, 검증 규칙을 스키마 한 곳에 모아 서버 규칙 확정 시 그 파일만 교체 |
| 품질       | ESLint · Prettier · `import/order`                | 2인 협업에서 스타일 편차와 diff 노이즈 제거                                                     |
| Git 훅     | husky · lint-staged · commitlint                  | 커밋 시점에 lint·typecheck·메시지 규칙을 검사해 CI 실패를 로컬에서 차단                         |
| CI         | GitHub Actions                                    | PR마다 lint · typecheck · format 검사, 주간 의존성 취약점 감사                                  |
| 협업       | GitHub · Notion · Figma · Discord                 | 코드 · 문서 · 디자인 · 소통 분리                                                                |

각 설정의 상세 근거와 커스텀 룰 설명은 [`docs/setup-decisions.md`](./docs/setup-decisions.md)에 있습니다.

### 아직 안 정해진 것

| 항목           | 상태                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| 인증 방식      | **확정.** 세션 기반, SID를 httpOnly 쿠키로. 토큰을 JS로 저장하지 않음         |
| 결제 방식      | **확정.** 토스페이먼츠 빌링키. 프론트가 결제창을 띄우는 건 결제수단 등록 때뿐 |
| 공용 응답 포맷 | 미정. 성공/실패 래핑 여부와 필드명 미확정                                     |
| API 베이스 URL | 미정. 도메인 A·B가 단일 게이트웨이인지 분리인지                               |
| 에러 코드 체계 | 미정. HTTP status만인지 별도 비즈니스 코드가 있는지                           |
| 상태 관리      | TanStack Query · Zustand 도입 예정. API 규격 확정 후                          |
| 테스트 러너    | 미정                                                                          |
| PWA            | 미정                                                                          |

> 위 미정 항목과 관련된 코드(`api-client.ts`, 응답 래퍼 타입, 에러 코드 상수)는 **의도적으로 비워 뒀습니다.** 추측으로 만들면 규격이 나올 때 다시 씁니다.

---

## 프로젝트 구조

레이어와 기능을 섞은 하이브리드 구조입니다. 자세한 규칙은 [`.agents/structure-convention/SKILLS.md`](./.agents/structure-convention/SKILLS.md)에 있습니다.

```text
MoongCheap-frontend
├── .agents/                  # 팀 개발 컨벤션 (에이전트 자동 로드)
├── .github/                  # 이슈·PR 템플릿, CI 워크플로
├── .husky/                   # commit-msg(commitlint), pre-commit(lint-staged + typecheck)
├── design/tokens/            # 디자인 토큰 파이프라인 (아래 섹션 참고)
│   ├── raw/                  # 디자인팀이 전달한 Figma Variables JSON (원본)
│   └── build-tokens.mjs      # raw -> src/app/globals.css 생성기
├── docs/                     # 컨벤션·설정 근거·보안 요건
└── src/
    ├── app/                  # App Router. 페이지는 조립만 한다
    │   ├── (auth)/           #   로그인·회원가입·소셜 콜백
    │   └── mypage/           #   마이페이지·프로필·알림·배송지
    ├── components/
    │   ├── layout/           # 셸 요소 (AppBar 등)
    │   └── ui/               # 도메인을 모르는 프리미티브 (Button, Toast, Checkbox …)
    ├── features/             # 도메인 컴포넌트. features/user/components/…
    ├── constants/            # 상태 레지스트리·화면 카탈로그·비즈니스 상수·공통 문구
    ├── hooks/                # 커스텀 훅
    ├── lib/                  # 유틸 (cn, oauth, formatPhone …)
    ├── mocks/                # API 미연동 구간용 목 데이터
    ├── schemas/              # zod 폼 스키마
    ├── types/                # 화면이 요구하는 타입
    └── tests/                # 테스트 설정 (러너 미정)
```

의존 방향은 **한 방향**입니다. 어기면 리뷰에서 지적합니다.

```
app (페이지) -> features (도메인) -> components/ui (프리미티브)
```

- `components/ui`는 도메인을 몰라야 합니다. 특정 화면·기능 이름이 들어가면 안 됩니다
- `features`는 라우트 문자열을 직접 들고 있지 않습니다. 경로는 props로 받습니다
- 공용 컴포넌트는 **두 번째 사용처가 생겼을 때** 올립니다. 미리 만들지 않습니다
- `@/` -> `src/` 경로 별칭을 씁니다

---

## 디자인 토큰

색·간격·타이포를 코드에 직접 쓰지 않습니다. 디자인팀이 준 Figma Variables JSON에서 CSS 변수를 **생성**합니다.

```bash
node design/tokens/build-tokens.mjs   # design/tokens/raw/ -> src/app/globals.css
npm run format
```

> ⚠️ **`src/app/globals.css`를 직접 고치지 마세요.** 생성 파일이라 다음 실행 때 덮어써집니다. 값을 바꾸려면 `design/tokens/raw/`의 JSON을 교체하고 생성기를 다시 돌립니다.

이름을 두 층으로 나눠 내보냅니다. 합치면 유틸리티에 라이트 값이 박혀 다크모드가 죽습니다.

```css
:root            --content-primary: #0a0a0a;              /* 1층: 모드가 갈리는 값 */
@theme inline    --color-content-primary: var(--content-primary);  /* 2층: 유틸리티 생성 */
```

그래서 화면 코드에서는 항상 시맨틱 유틸리티만 씁니다.

```tsx
<p className="text-body-15 text-content-primary">  ✅
<p className="text-[15px] text-gray-900">          ❌
```

프론트는 Figma **View 권한**입니다(2026-08-21부터). 토큰 값의 원본은 언제나 `design/tokens/raw/`의 JSON입니다.

---

## 개발 흐름

전체 규칙은 [`docs/convention/README.md`](./docs/convention/README.md), 완료 기준은 [`docs/convention/definition-of-done.md`](./docs/convention/definition-of-done.md)에 있습니다.

```
이슈 생성  ->  develop에서 브랜치  ->  작업·커밋  ->  PR  ->  승인 1명 + CI 통과  ->  squash 머지
```

| 항목      | 형식                                                                | 예시                                  |
| --------- | ------------------------------------------------------------------- | ------------------------------------- |
| 브랜치    | `유형/#이슈번호/설명`                                               | `feat/#25/notification-settings`      |
| 커밋      | `유형: 상세설명 (#이슈번호)`                                        | `feat: 알림 설정 화면 퍼블리싱 (#25)` |
| 허용 유형 | `feat` `fix` `hotfix` `style` `refactor` `chore` `docs` `init` `ci` |                                       |

**주의할 점 두 가지.**

- 브랜치명에 `#`가 들어가므로 zsh에서는 따옴표로 감싸야 합니다. `git push -u origin 'feat/#25/...'`
- 커밋 제목 맨 앞에 영문 대문자를 쓰면 commitlint가 거부합니다(`subject-case`). 제품명·컴포넌트명을 문두에 두지 마세요
- husky pre-commit에 막히면 `--no-verify`로 우회하지 말고 원인을 고칩니다

### 자동 검사

| 시점      | 검사                                                              |
| --------- | ----------------------------------------------------------------- |
| commit    | commitlint(메시지) · lint-staged · 전체 typecheck                 |
| PR        | GitHub Actions - lint · typecheck · format:check                  |
| 주간      | 의존성 취약점 감사 (`security.yml`)                               |
| PR (예정) | CodeRabbit 리뷰 - 설정은 [`.coderabbit.yaml`](./.coderabbit.yaml) |

---

## 진행 상황

화면 퍼블리싱 단계입니다. **API는 아직 연동하지 않았고 모든 화면이 `src/mocks/`의 목 데이터로 동작합니다.**

| 영역          | 상태                                                       |
| ------------- | ---------------------------------------------------------- |
| 프로젝트 세팅 | 완료 - 툴링·CI·컨벤션·이슈/PR 템플릿                       |
| 디자인 토큰   | 완료 - 생성 파이프라인 + 2026-08-27 토큰 반영              |
| 공통 레이어   | 완료 - 상태 레지스트리·화면 카탈로그·비즈니스 상수·공통 UI |
| 인증          | 퍼블리싱 완료 - 로그인·회원가입·소셜 인가 플로우           |
| 마이페이지    | 퍼블리싱 완료 - 허브·프로필 설정                           |
| 알림 설정     | 진행 중                                                    |
| 배송지        | 진행 중                                                    |
| 판매자 전환   | 예정                                                       |
| 주문·결제     | 대기 - 결제수단 화면 설계 확인 필요                        |
| API 연동      | 대기 - 백엔드 규격 확정 후                                 |

---

## 문서

| 문서                                                                               | 내용                                    |
| ---------------------------------------------------------------------------------- | --------------------------------------- |
| [`.agents/README.md`](./.agents/README.md)                                         | 코드 스타일 · 폴더 구조 · 디자인 컨벤션 |
| [`docs/convention/README.md`](./docs/convention/README.md)                         | 브랜치 · 커밋 · PR 규칙                 |
| [`docs/convention/definition-of-done.md`](./docs/convention/definition-of-done.md) | 작업 완료 기준 · PR 리뷰 체크리스트     |
| [`docs/setup-decisions.md`](./docs/setup-decisions.md)                             | 각 도구 설정의 근거, 커스텀 룰 설명     |
| [`docs/deferred-setup.md`](./docs/deferred-setup.md)                               | 지금 가져오지 않은 것과 재검토 시점     |
| [`docs/security-baseline.md`](./docs/security-baseline.md)                         | 인프라·백엔드에 요청하는 보안 최소 요건 |
| [`docs/route-map.md`](./docs/route-map.md)                                         | 라우트 맵 초안                          |
| [`design/tokens/README.md`](./design/tokens/README.md)                             | 토큰 생성기 사용법과 이름 두 층 구조    |
| [`CLAUDE.md`](./CLAUDE.md)                                                         | 에이전트용 프로젝트 지침                |

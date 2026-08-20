# MoongCheap (뭉치)

**수요 집결형 공동구매 플랫폼 — 프론트엔드**

> kt cloud TECH UP 2기 통합 프로젝트 2팀 · 브이

## 📌 MoongCheap은 이런 서비스예요

MoongCheap은 **소비자가 원하는 상품의 수요를 먼저 등록하고, 같은 수요가 모이면 셀러들이 응찰해 조건이 가장 좋은 응찰이 자동 낙찰되는 역경매형 공동구매 서비스**입니다.

기존 공동구매는 셀러가 조건을 먼저 정하고 소비자를 모읍니다. MoongCheap은 순서를 뒤집습니다.

- **수요 등록** — 사고 싶은 상품과 희망 조건을 먼저 올립니다
- **수요 집결** — 같은 수요가 모여 하나의 공구 딜이 됩니다
- **셀러 응찰** — 모인 수요를 보고 셀러들이 가격·조건을 제시합니다
- **자동 낙찰** — 조건이 가장 좋은 응찰이 자동으로 낙찰됩니다
- **성사 판정 · 정산** — 목표 수량 도달 여부로 성사를 판정하고 정산까지 이어집니다

> "살 사람이 먼저 모이면, 파는 쪽이 조건을 맞춘다"

이 저장소는 **프론트엔드**입니다. 백엔드는 별도 저장소에서 REST API로 제공되며, 아래 두 도메인으로 나뉩니다.

| 도메인                     | 범위                                                 |
| -------------------------- | ---------------------------------------------------- |
| **도메인 A** 카탈로그·계정 | 인증, 회원, 상품, 재고, 알림, 검색, AI 챗봇          |
| **도메인 B** 거래·공동구매 | 장바구니, 주문, 결제, 공구 딜, 참여, 성사 판정, 정산 |

## 🙋‍♀️ MoongCheap의 FE Developer를 소개합니다!

| <a href="https://github.com/Hyejinjin-An"><img src="https://avatars.githubusercontent.com/u/115617565?v=4" width="120" alt="안혜진" /></a> | <a href="https://github.com/ParkSiYeol3"><img src="https://avatars.githubusercontent.com/u/162967437?v=4" width="120" alt="박시열" /></a> |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 안혜진                                                                                                                                     | 박시열                                                                                                                                    |
| _담당 화면 협의 중_                                                                                                                        | 인증(로그인·회원가입) · 회원(마이페이지·배송지)                                                                                           |

## 💻 기술 스택

> 초기 세팅 단계입니다. 아래는 **현재 저장소에 실제로 설치된 것**만 적었습니다.
> 상태 관리·폼·검증 라이브러리는 백엔드 API 규격이 확정된 뒤 도입합니다. ([`docs/deferred-setup.md`](./docs/deferred-setup.md))

| **분류**      | **기술**                                                                                                                                                                                                                                                                                                                                                                                                                    | **선정 이유**                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Framework     | <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">                                                                                                                                                                                                                                                                                                                    | App Router 기반으로 수요 등록 → 딜 → 주문까지 이어지는 화면 흐름과 라우팅을 일관되게 관리                 |
| Library       | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">                                                                                                                                                                                                                                                                                                                        | 컴포넌트 기반 구조로 딜 카드·응찰 목록 등 반복 UI의 재사용성과 유지보수성 확보                            |
| Language      | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">                                                                                                                                                                                                                                                                                                              | `strict` + `any` 금지로 외부 백엔드 응답을 다룰 때 생기는 null 처리 누락을 컴파일 타임에 차단             |
| Styling       | <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">                                                                                                                                                                                                                                                                                                           | 유틸리티 클래스 기반으로 반복 CSS 없이 공통 컴포넌트(`components/ui`) 조합만으로 빠르고 일관된 UI 구현    |
| Backend       | <img src="https://img.shields.io/badge/REST_API-02569B?style=for-the-badge">                                                                                                                                                                                                                                                                                                                                                | 백엔드가 별도 저장소에서 도메인 A·B로 나뉘어 제공되므로, 프론트는 Route Handler 없이 REST API를 직접 소비 |
| Formatting    | <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">                                                                                                                                                                                                           | `import/order`·`no-default-export` 등 규칙을 강제해 2인 협업에서 코드 스타일 편차와 diff 노이즈를 제거    |
| Git Hooks     | <img src="https://img.shields.io/badge/husky-42B983?style=for-the-badge"> <img src="https://img.shields.io/badge/commitlint-000000?style=for-the-badge&logo=commitlint&logoColor=white">                                                                                                                                                                                                                                    | 커밋 시점에 lint·typecheck·커밋 메시지 규칙을 자동 검사해 CI 실패를 로컬에서 미리 차단                    |
| CI            | <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">                                                                                                                                                                                                                                                                                                       | PR마다 lint · typecheck · format 검사와 주간 의존성 취약점 감사를 자동 실행                               |
| Collaboration | <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> | 개발, 문서화, 디자인, 커뮤니케이션을 역할별로 분리하여 협업 효율 향상                                     |

각 설정의 상세 근거와 커스텀 룰 설명은 [`docs/setup-decisions.md`](./docs/setup-decisions.md)에 있습니다.

**미확정 항목:** PWA 채택 여부, 백엔드 인증 방식(Authorization 헤더 / httpOnly 쿠키), 공용 응답 포맷, API 베이스 URL.

## 🧩 핵심 사용자 흐름

### 소비자

- 회원가입 / 로그인
- 원하는 상품 검색 또는 AI 챗봇으로 탐색
- 수요 등록 (희망 상품·수량·조건)
- 같은 수요로 모인 **공구 딜**에 참여
- 셀러 응찰 현황과 낙찰 조건 확인
- 장바구니 → 주문 → 결제
- 성사 판정 결과 확인, 마이페이지에서 주문·배송지 관리

### 셀러

- 집결된 수요(공구 딜) 확인
- 가격·조건 응찰
- 자동 낙찰 결과 확인
- 정산 확인

### 주요 화면 구성

- **Auth** — 로그인, 회원가입
- **Home / Search** — 딜 목록, 상품 검색, AI 챗봇
- **Demand / Deal** — 수요 등록, 공구 딜 상세, 응찰 현황, 참여
- **Cart / Order** — 장바구니, 주문, 결제
- **My Page** — 프로필, 주문 내역, 배송지 관리, 알림

## 📂 프로젝트 구조

```text
📦 MoongCheap-frontend
┣ 📜 CLAUDE.md              # 프로젝트 전역 지침
┣ 📜 AGENTS.md              # Next.js 자동 블록 + CLAUDE.md 포인터
┣ 📜 commitlint.config.mjs  # 커밋 메시지 규칙
┣ 📜 eslint.config.mjs
┣ 📜 next.config.ts
┣ 📜 postcss.config.mjs
┣ 📜 tsconfig.json
┣ 📂 .github                # 이슈·PR 템플릿, CI 워크플로(ci.yml, security.yml)
┣ 📂 .husky                 # commit-msg(commitlint), pre-commit(lint-staged + typecheck)
┣ 📂 docs
┃ ┣ 📜 setup-decisions.md   # 도구 설정 근거 (발표 대비)
┃ ┣ 📜 deferred-setup.md    # 지금 가져오지 않은 것과 재검토 시점
┃ ┗ 📂 convention           # 브랜치·커밋·PR 규칙
┣ 📂 public                 # 정적 에셋
┗ 📂 src
  ┣ 📂 app                  # Next.js App Router
  ┣ 📂 components           # 도메인별 UI, ui/는 공통 컴포넌트
  ┣ 📂 constants            # 상수 및 localStorage key
  ┣ 📂 hooks                # 커스텀 훅
  ┣ 📂 lib                  # 유틸리티 (cn.ts)
  ┣ 📂 mocks                # 백엔드 API 미완성 구간용 목 데이터
  ┣ 📂 tests                # 테스트 설정
  ┗ 📂 types                # 타입 정의
```

- `@/` → `src/` 경로 별칭 사용
- `src/schemas/`, `src/stores/`는 해당 라이브러리(zod / Zustand)를 도입할 때 만듭니다
- `src/app/api/` Route Handler는 두지 않습니다. 백엔드가 별도 저장소에 있습니다

## 📦 Package Manager

- **npm** 사용
- `package-lock.json` 기반으로 의존성 버전을 관리합니다.

```bash
npm install           # 의존성 설치
npm run dev           # 개발 서버 실행
npm run build         # 프로덕션 빌드
npm run lint          # ESLint 실행
npm run format        # Prettier 포맷팅
npm run format:check  # Prettier 포맷 검사 (CI용)
npm run typecheck     # TypeScript 타입 체크
```

## 📚 문서 가이드

- [브랜치·커밋·PR 규칙](./docs/convention/README.md) — 오늘부터 적용
- [개발 컨벤션(.agents)](./.agents/README.md) — 코드 스타일·폴더 구조·디자인 (SKILLS.md, 에이전트 자동 로드)
- [설정 근거](./docs/setup-decisions.md) — 각 도구가 하는 일, 커스텀 룰 설명
- [보류한 설정](./docs/deferred-setup.md) — 언제 무엇을 가져올지

@AGENTS.md

# CLAUDE.md

**MoongCheap(뭉치)** 프론트엔드 저장소입니다.

## 프로젝트

수요 집결형 공동구매 플랫폼. 소비자가 원하는 상품의 수요를 먼저 등록하고, 같은 수요가 모이면 셀러들이 응찰해 조건이 가장 좋은 응찰이 자동 낙찰되는 **역경매형 공동구매** 서비스입니다.

kt cloud TECH UP 2기 통합 프로젝트 2팀. 프론트엔드 2명, 백엔드는 **별도 저장소에서 REST API로 제공**됩니다.

## 백엔드 도메인 분할

| 도메인                     | 범위                                                 |
| -------------------------- | ---------------------------------------------------- |
| **도메인 A** 카탈로그·계정 | 인증, 회원, 상품, 재고, 알림, 검색, AI 챗봇          |
| **도메인 B** 거래·공동구매 | 장바구니, 주문, 결제, 공구 딜, 참여, 성사 판정, 정산 |

프론트는 두 도메인의 API를 모두 소비합니다. **Supabase를 사용하지 않습니다.**

## 현재 스택

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · ESLint · Prettier · husky + commitlint

**아직 설치하지 않은 것**: 상태 관리(TanStack Query / Zustand), 폼(react-hook-form), 검증(zod). 필요한 시점에 추가합니다. → [`docs/deferred-setup.md`](docs/deferred-setup.md)

## 지금은 초기 세팅 단계입니다

이 저장소에는 **도구 설정만** 들어 있습니다. API 계층·도메인 컨벤션·폴더 세부 규칙은 아직 없습니다.

**임의로 채우지 마세요.** 아래는 백엔드와 합의되지 않았습니다.

- **인증 방식** — Authorization 헤더 / httpOnly 쿠키 미정
- **공용 응답 포맷** — 성공/실패 응답의 래핑 여부·필드명 미정
- **API 베이스 URL** — 도메인 A·B가 단일 게이트웨이인지 분리인지 미정
- **PWA 채택 여부** — 미정

관련 코드(`api-client`, 스키마, 환경변수)를 추측으로 작성하지 말고, 규격이 나온 뒤에 만듭니다.

## 문서

- [`docs/convention/README.md`](docs/convention/README.md) — 브랜치·커밋·PR 규칙 (**오늘부터 적용**)
- [`docs/setup-decisions.md`](docs/setup-decisions.md) — 각 도구 설정의 근거, 커스텀 룰 설명
- [`docs/deferred-setup.md`](docs/deferred-setup.md) — 지금 가져오지 않은 것과 재검토 시점

## 핵심 규칙 요약

- 커밋: `유형: 상세설명 (#이슈번호)` / 브랜치: `유형/#이슈/설명`
- 허용 커밋 타입: `feat` `fix` `hotfix` `style` `refactor` `chore` `docs` `init` (`commitlint.config.mjs`가 강제)
- `develop`에서 브랜치 → PR → **squash 머지** (팀원 1명 승인 + CI 통과)
- `export function` 사용(default export 지양 — App Router 예약 파일·설정 파일은 예외), `any` 금지, 인라인 스타일 금지
- import 순서는 `import/order`가 자동 정렬 (`npm run lint -- --fix`)
- 비밀키는 `.env.local`(로컬)·`.env`(배포)에만. `.gitignore`가 `.env*` 전체를 차단
- husky hook에 막히면 `--no-verify`로 우회하지 말고 원인을 먼저 해결

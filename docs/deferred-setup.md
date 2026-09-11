# 보류한 설정 (deferred setup)

[menhering-app](https://github.com/MENHERING/menhering-app)에서 **가져오지 않기로 한** 항목과 재검토 시점을 기록합니다.

## 왜 보류하는가

멘헤링은 **Supabase가 곧 백엔드**인 PWA 프로젝트입니다. Next.js Route Handler(`app/api/**`)로 API를 직접 만들고 Supabase RPC를 호출하는 구조라, 응답 포맷·인증·쿼리 키 전부를 **프론트가 정의**했습니다.

MoongCheap은 반대입니다. 백엔드가 별도 저장소에서 REST API를 제공하고, 프론트는 그 규격을 **따라가는** 쪽입니다. 지금 멘헤링의 API 계층을 가져와도 백엔드 응답 포맷이 다르면 전부 다시 쓰게 됩니다.

## 보류 항목

| 항목                                       | 가져오지 않는 이유                                                | 재검토 시점             |
| ------------------------------------------ | ----------------------------------------------------------------- | ----------------------- |
| `.agents/` 도메인·구조·Supabase·API 컨벤션 | 멘헤링 도메인(학습·아바타·오답노트)과 Supabase 전제에 맞춰진 문서 | 백엔드 API 규격 확정 후 |
| `src/lib/query-keys.ts`                    | 도메인 키 구조가 멘헤링 기준(learning / avatar / wrongNote 등)    | 화면·API 확정 후        |
| `docs/convention/` 중 도메인·구조 문서     | 위와 동일. 협업 규칙(브랜치·커밋·PR)만 발췌해 가져옴              | 코드가 쌓인 뒤          |
| `.mcp.json`                                | 내용이 멘헤링 Supabase MCP 서버 URL 하나뿐. MoongCheap은 미사용   | 필요 시점에 개별 판단   |
| `vercel.json`                              | 내용이 멘헤링 웹푸시 cron 설정 하나뿐                             | 배포 방식 확정 후       |

## 함께 미룬 의존성

아래는 필요해지는 시점에 설치합니다. 지금 설치하면 쓰지도 않는 패키지가 lock 파일에 남습니다.

| 패키지    | 도입 시점                                 |
| --------- | ----------------------------------------- |
| `zustand` | 전역 클라이언트 상태가 실제로 필요해질 때 |

## 도입 완료

| 패키지                                          | 도입 시점                                                                    |
| ----------------------------------------------- | ---------------------------------------------------------------------------- |
| `zod`, `@hookform/resolvers`, `react-hook-form` | 인증 폼 화면(로그인·회원가입) 착수, PR #5                                    |
| `@tanstack/react-query`                         | 세션 조회(`GET /api/members/me`) 전역 상태 확립, #70 (devtools는 미도입)     |
| `sharp` (devDep)                                | 이미지 에셋 최적화 스크립트(`scripts/optimize-images.mjs`)·`next/image`, #60 |

`src/schemas/`는 위 도입과 함께 생성했습니다. `src/stores/`는 `zustand` 도입 시 함께 만듭니다.
TanStack Query 도입으로 `src/app/providers.tsx`(QueryClientProvider)·`src/features/auth/session.ts`(세션 캐시)를 함께 만들었습니다.

## 아직 미확정 (남은 것만)

관련 코드를 임의로 작성하지 않고 비워 둔 상태입니다. (확정된 항목은 [결정된 사항](#결정된-사항)으로 이동)

- **로그인 식별자** — 아이디(`loginId`) 기반. 백엔드 `ProfileResponseDto.loginId`(소셜 전용 계정은 `null`). 로그인 폼 입력 식별자 확정은 로그인 화면 후속과 함께 정리([`src/schemas/auth.ts`](../src/schemas/auth.ts)).
- **비밀번호 정책** — 자릿수·문자 조합 규칙. 현재 8~64자는 잠정값, 서버 규칙 확정 시 교체
- **PWA 채택 여부** — 미정. 현재 관련 의존성·설정 없음(하단 참고).

## 결정된 사항

- **인증 방식 = httpOnly 쿠키(SID)** — Authorization 헤더 미사용. 소셜/일반 로그인 동일 구조, 토큰을 JS로 저장/파싱하지 않음([`security-baseline.md`](./security-baseline.md) 요건 1).
- **API 계층·응답 포맷·베이스 URL·에러 코드 확정**(2026-09-08 실측) — 멘헤링 래퍼 대신 최소 `src/lib/api.ts`(`apiFetch`, `credentials:'include'`) 자체 작성.
  - **베이스 URL**: 단일 `NEXT_PUBLIC_API_BASE_URL` 하나(도메인 A·B 구분 없음). 로컬 `http://localhost:8080`.
  - **성공 응답**: 래퍼 없는 **bare DTO** → `json() as DTO`.
  - **실패 응답**: `{ success:false, data:null, error:{ code, message, fieldErrors } }` 봉투 → `apiFetch`가 비2xx에서 throw.
  - **에러 코드**: HTTP status + 비즈니스 코드 병용. `error.code`에 도메인 코드(예: `COMMON_401`, `SEARCH_001`).
- **공용 UI 프리미티브 = as-built(2회 규칙)** — 규약 문서를 먼저 쓰지 않고, 두 번째 사용처가 생길 때 `src/components/ui`로 추출한다. 현재 `Button`·`Checkbox`·`ToggleSwitch`·`SegmentControl`·`Accordion`·`AlertDialog`·`Toast`·`Skeleton`·`EmptyState`·`ErrorScreen`/`ErrorState`·`StatusBadge`·`GoBackButton`·`ComingSoonButton` 등이 있고 디자인 토큰(globals.css 생성물)에 바인딩한다.
- **자동 리뷰·환경 견본 도입** — `.coderabbit.yaml`(PR 자동 리뷰, 자체 규약)·`.env.local.example`(`NEXT_PUBLIC_API_BASE_URL` 견본)을 MoongCheap용으로 자체 작성(#18). `env.d.ts`는 아직 미도입.
- **소셜 로그인(카카오/구글) 채택 · 백엔드 OAuth 규격 확정** — 웹 OAuth 전체 리다이렉트 방식(모바일 웹, PWA 예정). 백엔드와 아래 규격 합의 완료.
  - **진입**: 프론트는 `{baseUrl}/oauth2/authorization/kakao`(또는 `.../google`)로 단순 이동(`location.href`/`<a>`, fetch 아님).
  - **콜백**: 백엔드가 provider와 code 교환 → **SID(httpOnly 쿠키)** 세션 발급 후 프론트로 리다이렉트. **쿼리로 토큰을 넘기지 않음** → 프론트는 토큰 저장/파싱 없음([`security-baseline.md`](./security-baseline.md) 요건 1 충족).
  - **착지 URL**: 성공 `https://moongcheap.com/oauth/callback`(`src/app/(auth)/oauth/callback` 라우트 유지) · 실패 `https://moongcheap.com/oauth/failed?reason=denied|provider_error|server_error`.
  - **가입/연동**: 최초 소셜 로그인은 **완료 스텝**을 거친다. 백엔드가 약관 미동의(=최초 유저)를 콜백에 `?status=incomplete`로 되돌리면 프론트는 `/oauth/complete`로 이동해 **약관 동의 + 닉네임**을 받고 `POST /api/auth/social-signup/complete`로 가입을 확정한다(완료 유저 재로그인은 곧장 홈). 동일 이메일이어도 **자동 연동 없이 별개 계정** 신규 가입.
  - **세션**: 일반 로그인과 세션·갱신·로그아웃 구조 동일.
  - **env**: `KAKAO_CLIENT_ID` / `GOOGLE_CLIENT_ID`를 백엔드가 제공 예정(키 이름 확정 후 `.env.local` 배선).
  - **보류**: 로그인 후 "원래 가려던 페이지로 복귀"는 보호 라우트 가드 도입 시 프론트 `sessionStorage` 방식으로 추가 예정(백엔드 지원 불필요, 고정 URL로 충분).
- **목(mock) 전략** — MSW 없이 async 함수가 `AuthResult`를 반환하는 방식으로 진행(뼈대 작성자 의도). 실제 연동 시 함수 본문만 API 호출로 교체하고 반환 타입은 유지([`src/mocks/auth.ts`](../src/mocks/auth.ts)).

## 제거한 멘헤링 전용 의존성

지시서상 제거 대상으로 명시됐던 항목의 실제 상태입니다.

| 대상                                        | 멘헤링 실제 상태                      | 조치                                                                                            |
| ------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `pixi.js`, `@pixi/core`, `@pixi/display`    | 있음                                  | 가져오지 않음                                                                                   |
| `pixi-live2d-display-lipsyncpatch` (Live2D) | 있음                                  | 가져오지 않음                                                                                   |
| `howler`, `@types/howler`                   | 있음                                  | 가져오지 않음                                                                                   |
| `@ducanh2912/next-pwa`                      | **멘헤링에 없음**                     | 해당 없음                                                                                       |
| `serwist`                                   | **없음.** `@serwist/turbopack`만 존재 | 가져오지 않음                                                                                   |
| `@supabase/ssr`, `@supabase/supabase-js`    | 있음                                  | 가져오지 않음                                                                                   |
| `web-push`, `@types/web-push`               | 있음 (웹 푸시)                        | 가져오지 않음                                                                                   |
| `motion`, `react-colorful`, `esbuild`       | 있음 (애니메이션·컬러픽커·에셋 가공)  | 가져오지 않음                                                                                   |
| `sharp`                                     | 있음 (에셋 가공)                      | **이후 도입** — 이미지 최적화 스크립트·`next/image`용 devDep(#60). [도입 완료](#도입-완료) 참고 |

**PWA 채택 여부는 미정입니다.** 현재 PWA 관련 의존성·설정은 하나도 없습니다. 채택하기로 하면 `@serwist/turbopack` + `src/app/serwist/` 라우트 + `manifest.ts`를 추가하게 됩니다.

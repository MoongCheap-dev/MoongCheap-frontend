# 보류한 설정 (deferred setup)

[menhering-app](https://github.com/MENHERING/menhering-app)에서 **가져오지 않기로 한** 항목과 재검토 시점을 기록합니다.

## 왜 보류하는가

멘헤링은 **Supabase가 곧 백엔드**인 PWA 프로젝트입니다. Next.js Route Handler(`app/api/**`)로 API를 직접 만들고 Supabase RPC를 호출하는 구조라, 응답 포맷·인증·쿼리 키 전부를 **프론트가 정의**했습니다.

MoongCheap은 반대입니다. 백엔드가 별도 저장소에서 REST API를 제공하고, 프론트는 그 규격을 **따라가는** 쪽입니다. 지금 멘헤링의 API 계층을 가져와도 백엔드 응답 포맷이 다르면 전부 다시 쓰게 됩니다.

## 보류 항목

| 항목                                                       | 가져오지 않는 이유                                                                                        | 재검토 시점               |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------- |
| `.agents/` 도메인·구조·Supabase·API 컨벤션                 | 멘헤링 도메인(학습·아바타·오답노트)과 Supabase 전제에 맞춰진 문서                                         | 백엔드 API 규격 확정 후   |
| `src/lib/api-client.ts`, `api-error.ts`, `api-response.ts` | 응답 포맷(`{ statusCode, message, data }`)을 프론트가 정하던 구조. MoongCheap은 백엔드 포맷을 따라가야 함 | 백엔드 응답 규격 확정 후  |
| `src/lib/query-keys.ts`                                    | 도메인 키 구조가 멘헤링 기준(learning / avatar / wrongNote 등)                                            | 화면·API 확정 후          |
| `docs/convention/` 중 도메인·구조 문서                     | 위와 동일. 협업 규칙(브랜치·커밋·PR)만 발췌해 가져옴                                                      | 코드가 쌓인 뒤            |
| `.coderabbit.yaml`                                         | 초기 세팅 단계에서 자동 리뷰 지적이 쏟아져 노이즈가 됨                                                    | 기능 개발 시작 후         |
| `.mcp.json`                                                | 내용이 멘헤링 Supabase MCP 서버 URL 하나뿐. MoongCheap은 Supabase 미사용                                  | 필요 시점에 개별 판단     |
| `vercel.json`                                              | 내용이 멘헤링 웹푸시 cron 설정 하나뿐                                                                     | 배포 방식 확정 후         |
| `env.d.ts`, `.env.local.example`                           | 멘헤링 환경변수(Supabase·Kakao·VAPID) 전용. MoongCheap은 API 베이스 URL조차 미확정                        | 백엔드 엔드포인트 확정 후 |

## 함께 미룬 의존성

아래는 필요해지는 시점에 설치합니다. 지금 설치하면 쓰지도 않는 패키지가 lock 파일에 남습니다.

| 패키지                               | 도입 시점                                 |
| ------------------------------------ | ----------------------------------------- |
| `@tanstack/react-query` (+ devtools) | 백엔드 API 연동 시작 시                   |
| `zustand`                            | 전역 클라이언트 상태가 실제로 필요해질 때 |

### 도입 완료

| 패키지                                          | 도입 시점                                 |
| ----------------------------------------------- | ----------------------------------------- |
| `zod`, `@hookform/resolvers`, `react-hook-form` | 인증 폼 화면(로그인·회원가입) 착수, PR #5 |

`src/schemas/`는 위 도입과 함께 생성했습니다. `src/stores/`는 `zustand` 도입 시 함께 만듭니다.

## 백엔드와 합의가 필요한 사항

관련 코드를 임의로 작성하지 않고 비워 둔 상태입니다.

- **인증 방식** — Authorization 헤더 vs httpOnly 쿠키
- **공용 응답 포맷** — 성공/실패 응답의 공통 래핑 여부와 필드명
- **API 베이스 URL** — 도메인 A·B가 단일 게이트웨이 뒤에 있는지, 분리돼 있는지
- **에러 코드 체계** — HTTP status만 쓰는지, 별도 비즈니스 에러 코드가 있는지
- **로그인 식별자** — 아이디 vs 이메일. 명세 내부에서 문구가 엇갈림. 잠정 이메일 기준([`src/schemas/auth.ts`](../src/schemas/auth.ts))
- **비밀번호 정책** — 자릿수·문자 조합 규칙. 현재 8~64자는 잠정값, 서버 규칙 확정 시 교체

## 프론트·기획 결정이 필요한 사항

인증 스캐폴딩(PR #5)에서 자리만 잡아 둔 미확정 항목입니다.

- **공용 UI 프리미티브(`src/components/ui`) 규약** — 미정(진행 예정). 확정 전이라 폼이 네이티브 요소로 작성됨. 규약 확정 시 마크업만 프리미티브로 치환(폼 로직은 유지)

## 결정된 사항

- **소셜 로그인(카카오/구글) 채택** — 피그마 디자인에서 소셜 로그인 확인, **채택 예정**. `src/app/(auth)/oauth/callback` 라우트 유지. 실제 연동은 백엔드 OAuth 규격 확정 후.
- **목(mock) 전략** — MSW 없이 async 함수가 `AuthResult`를 반환하는 방식으로 진행(뼈대 작성자 의도). 실제 연동 시 함수 본문만 API 호출로 교체하고 반환 타입은 유지([`src/mocks/auth.ts`](../src/mocks/auth.ts)).

## 제거한 멘헤링 전용 의존성

지시서상 제거 대상으로 명시됐던 항목의 실제 상태입니다.

| 대상                                           | 멘헤링 실제 상태                      | 조치          |
| ---------------------------------------------- | ------------------------------------- | ------------- |
| `pixi.js`, `@pixi/core`, `@pixi/display`       | 있음                                  | 가져오지 않음 |
| `pixi-live2d-display-lipsyncpatch` (Live2D)    | 있음                                  | 가져오지 않음 |
| `howler`, `@types/howler`                      | 있음                                  | 가져오지 않음 |
| `@ducanh2912/next-pwa`                         | **멘헤링에 없음**                     | 해당 없음     |
| `serwist`                                      | **없음.** `@serwist/turbopack`만 존재 | 가져오지 않음 |
| `@supabase/ssr`, `@supabase/supabase-js`       | 있음                                  | 가져오지 않음 |
| `web-push`, `@types/web-push`                  | 있음 (웹 푸시)                        | 가져오지 않음 |
| `motion`, `react-colorful`, `sharp`, `esbuild` | 있음 (애니메이션·컬러픽커·에셋 가공)  | 가져오지 않음 |

**PWA 채택 여부는 미정입니다.** 현재 PWA 관련 의존성·설정은 하나도 없습니다. 채택하기로 하면 `@serwist/turbopack` + `src/app/serwist/` 라우트 + `manifest.ts`를 추가하게 됩니다.

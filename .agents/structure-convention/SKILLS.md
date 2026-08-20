# 폴더 구조 컨벤션

`src/` 디렉토리 구조와 배치 규칙입니다. **채택: 레이어 + 기능 하이브리드** (2026-08-14, 프론트 그룹). 네이밍 규칙은 [code-style-convention/SKILLS.md](../code-style-convention/SKILLS.md)에서 별도로 다룹니다.

> 지금은 **규칙만 확정**합니다. `features/` 하위 실물 도메인 폴더는 **와이어프레임으로 화면이 확정된 뒤** 만듭니다. 지금 미리 만들면 안 맞는 폴더가 남습니다 (→ [`docs/deferred-setup.md`](../../docs/deferred-setup.md)).

---

## 1. 원칙

- **도메인/기능에 종속된 코드는 `features/<도메인>/`에 모은다.**
- **둘 이상의 기능이 공유하는 것만** 최상위 레이어 폴더(`components/`, `hooks/`, `lib/` 등)에 둔다.
- 판단 기준: _"이게 한 도메인에만 쓰이나?"_ → 예면 `features/`, 아니면 공용 레이어.
- `app/`은 **얇게** 유지 — 라우팅과 조립만, 로직은 `features/`로 내린다.

## 2. 트리

```text
src/
  app/                    # App Router 라우트. page/layout이 features를 조립만
  features/               # 기능/도메인 단위 (화면 확정 후 하위 폴더 생성)
    <domain>/             #   예: demand, bid, group-deal, payment, auth ...
      components/         #   이 도메인 전용 컴포넌트
      hooks/              #   이 도메인 전용 훅
      api/                #   이 도메인 API 호출 (백엔드 규격 확정 후)
      types/              #   이 도메인 타입
  components/             # 공용 컴포넌트
    ui/                   #   디자인 프리미티브 (Button, Input 등)
  hooks/                  # 공용 훅
  lib/                    # 유틸 (cn.ts 등)
  constants/              # 공용 상수 (routes, queryKeys 등)
  types/                  # 공용/전역 타입
  schemas/                # zod 검증 스키마 (인증 폼 도입, PR #5)
  mocks/                  # 목 데이터. async 함수가 결과 타입을 반환, 연동 시 본문만 API로 교체
  tests/                  # 테스트
```

> 위 최상위 폴더(`components`/`hooks`/`lib`/`constants`/`types`/`mocks`/`tests`)는 **초기 세팅부터 존재**합니다(`.gitkeep`). `schemas/`는 인증 폼(PR #5)과 함께 추가됐습니다. `features/`만 새로 추가되는 개념이며, 하위 도메인 폴더는 나중에 채웁니다.

## 3. `features/<도메인>` 내부 규칙

- 내부는 서브폴더(`components`/`hooks`/`api`/`types`)를 **필요한 것만** 둔다. 작은 도메인은 파일 몇 개로 시작해도 됨.
- 도메인 이름(`<domain>`)은 [code-style-convention/SKILLS.md](../code-style-convention/SKILLS.md)의 도메인 용어표를 따른다 (예: `demand`, `bid`). **백엔드 API 용어 확정 시 그쪽에 맞춰 갱신.**
- 도메인 간 직접 import는 지양. 공유가 필요하면 공용 레이어로 승격한다.

## 4. 안 가져온 것

- 다른 프로젝트의 도메인 폴더와 그에 묶인 구조 문서는 **가져오지 않았다.** 뭉치 도메인으로 새로 세운다.
- `src/lib/api-client.ts` 등 API 계층은 백엔드 규격 확정 후 (→ [`docs/deferred-setup.md`](../../docs/deferred-setup.md)).

## 5. 확정 후 할 일 (와이어프레임 수령 시)

- [`docs/route-map.md`](../../docs/route-map.md)의 큰 구획 → 실제 화면 → `features/` 하위 도메인 폴더 확정
- 각 도메인의 `api/`는 백엔드 응답 포맷 확정 후 작성

# .agents — MoongCheap 팀 컨벤션

프론트 개발 컨벤션을 카테고리별 `SKILLS.md` 하나로 모아둔 폴더입니다.
전원 Claude Code를 사용하므로, 루트 [`CLAUDE.md`](../CLAUDE.md)에서 이 문서들을 자동으로 참조(항상 로드)합니다.

## 문서 목록

| 카테고리    | 문서                                                               | 내용                                                |
| ----------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| Git         | [`../docs/convention/README.md`](../docs/convention/README.md)     | Git Flow, 커밋/브랜치 규칙, PR·머지 조건            |
| 코드 스타일 | [code-style-convention/SKILLS.md](code-style-convention/SKILLS.md) | 네이밍·export·TypeScript·스타일·도메인 용어         |
| 폴더 구조   | [structure-convention/SKILLS.md](structure-convention/SKILLS.md)   | `src/` 디렉토리 구조·역할 (레이어+기능 하이브리드)  |
| 디자인      | [design-convention/SKILLS.md](design-convention/SKILLS.md)         | shadcn 부분 도입, Figma 토큰 5층 배선·semantic 매핑 |

## 출처

- Git 컨벤션은 `docs/convention/README.md`에 있고(팀 공용), 여기서는 링크로 참조합니다.
- 코드/구조/디자인 컨벤션은 MoongCheap 프론트 그룹 합의 기준입니다.
- 디자인 토큰 값의 **원본(source of truth)은 [`design/tokens/raw/`](../design/tokens/raw/)의 Variables JSON**입니다. 2026-08-21부터 프론트는 Figma **View 권한**이고, 토큰은 디자인팀이 JSON으로 전달합니다. `src/app/globals.css`는 [`design/tokens/build-tokens.mjs`](../design/tokens/build-tokens.mjs)가 생성하므로 직접 고치지 마세요 (→ [`design/tokens/README.md`](../design/tokens/README.md)).
- `design-convention/SKILLS.md`의 표는 조회용 전사본입니다. 값이 다르면 JSON에 맞춥니다.

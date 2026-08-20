<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 프로젝트 지침

위 블록은 `next dev`가 자동으로 쓰고 다시 삽입합니다. 지우지 마세요.

프로젝트 설명과 작업 규칙은 [`CLAUDE.md`](./CLAUDE.md)에 있습니다. Codex 등 `AGENTS.md`만 읽는 에이전트도 아래 문서를 함께 읽고 따르세요.

- [`CLAUDE.md`](./CLAUDE.md) — 프로젝트 개요, 백엔드 도메인 분할, 미확정 사항, 핵심 규칙
- [`.agents/README.md`](./.agents/README.md) — 코드 스타일 · 폴더 구조 · 디자인 컨벤션 (`SKILLS.md`)
- [`docs/convention/README.md`](./docs/convention/README.md) — 브랜치 · 커밋 · PR 규칙
- [`docs/setup-decisions.md`](./docs/setup-decisions.md) — 도구 설정 근거
- [`docs/deferred-setup.md`](./docs/deferred-setup.md) — 아직 도입하지 않은 것

초기 세팅 단계입니다. 인증 방식·응답 포맷·API 베이스 URL은 백엔드와 미합의 상태이니 추측으로 코드를 작성하지 마세요.

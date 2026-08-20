# Definition of Done · PR 리뷰 체크리스트 (프론트엔드)

프론트엔드 그룹(2인)이 **작업 완료 판정**과 **PR 리뷰** 시 확인하는 기준입니다.
협업 규칙(브랜치·커밋·PR 절차)은 [`README.md`](./README.md), 보안 요건은 [`../security-baseline.md`](../security-baseline.md)를 참조합니다. 성능 목표치는 아래 성능 섹션에 명시했습니다.

## ✅ Definition of Done (작업 완료 기준)

한 작업(이슈)이 "완료"이려면:

- [ ] 요구사항(화면 정의서/이슈)의 기능이 동작한다
- [ ] 로딩 / 에러 / 빈 상태 등 **예외 케이스가 처리**돼 있다
- [ ] 콘솔에 에러·경고가 없다
- [ ] 라우팅·뒤로가기·새로고침이 정상 동작한다
- [ ] `npm run lint` · `npm run typecheck` · `npm run format:check` 통과 (CI와 동일)
- [ ] 반응형이 깨지지 않는다 (디자인 기준 확정 후)
- [ ] 성능 목표치를 벗어나지 않는다 (아래 성능 섹션)
- [ ] 관련 문서(화면 정의서 등)를 갱신했다

## 🔀 PR 리뷰 체크리스트

리뷰어(팀원 1명)가 승인 전 확인:

### 컨벤션

- [ ] 커밋 메시지 형식 `유형: 상세설명 (#이슈번호)` ([`README.md`](./README.md))
- [ ] `export function`(named export) 사용, default export 없음 (App Router 예약 파일·설정 파일 제외)
- [ ] `any` 미사용, 인라인 스타일 미사용
- [ ] import 순서 자동 정렬 통과 (`import/order`)

### 보안 (→ [`../security-baseline.md`](../security-baseline.md))

- [ ] 인증 토큰을 `localStorage`/`sessionStorage`에 저장하지 않았다
- [ ] 사용자 생성 콘텐츠(수요 설명·셀러 제안·리뷰 등)를 그대로 HTML 렌더링하지 않았다 (`dangerouslySetInnerHTML` 지양)
- [ ] 결제 플로우에서 카드 원문(번호·CVC)을 프론트 상태·폼에 담지 않았다 (PG 토큰화/iframe 위임)
- [ ] 서버 검증을 클라 검증으로 대체하지 않았다 (에러 응답 처리 존재)
- [ ] CSP 위반 유발하는 인라인 스크립트·임의 외부 리소스를 넣지 않았다

### 성능 (Core Web Vitals "good" 기준)

- [ ] 주요 화면 **LCP < 2.5s / CLS < 0.1 / INP < 200ms** (로컬 Lighthouse 모바일 기준)
- [ ] 상호작용 많은 화면에서 **TBT로 INP 근사 확인**, 눈에 띄는 블로킹 없음
- [ ] **서드파티 스크립트 예산(≤ N개)** 초과 없음, 신규 추가 시 PR에 근거
- [ ] 이미지·폰트에 `next/image`·`next/font` 사용 (CLS 유발 없음)

### 품질

- [ ] 컴포넌트·훅·타입 네이밍이 규칙에 맞는다 ([`code-style-convention/SKILLS.md`](../../.agents/code-style-convention/SKILLS.md))
- [ ] 추측으로 미확정 규격(인증·응답 포맷·API base URL)을 코드에 박지 않았다
- [ ] 불필요한 재렌더·중복 요청이 없다
- [ ] 접근성 기본(대체 텍스트, 시맨틱 태그, 키보드 포커스)을 지켰다

> 이 문서는 초기 기준선입니다. 실제 개발이 진행되며 항목을 추가·조정하고, 변경 시 PR로 함께 갱신합니다.

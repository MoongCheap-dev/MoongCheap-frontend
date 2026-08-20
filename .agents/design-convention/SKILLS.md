# 디자인 컨벤션

shadcn 부분 도입 방침 + Figma 디자인 토큰 배선 규칙을 한곳에 모은 문서입니다. 디자인팀 Figma 산출물을 **왜곡 없이** 코드로 옮기기 위한 프론트 공유 규칙.

> ## 🤖 구현 에이전트에게
>
> 이 문서는 **방침·규칙·매핑 계층**이지 **컴포넌트 명세나 값의 원본이 아니다.** 구현 전 아래를 지킬 것:
>
> - **prop 이름·variant 조합·상태별 스타일·hex 값·`-p`/알파 변수명·컴포넌트 동작을 추측하지 말 것.** 이 값들은 **Figma에만** 있고, 아래 표는 스크린샷 전사본이라 오타 가능성이 있다.
> - **원본(source of truth) = Figma (Dev Mode MCP)** + 그로부터 생성한 `globals.css` 토큰 파일. Figma 접근이 없으면 값을 하드코딩해 확정하지 말고 **중단하고 물어볼 것.**
> - 색은 항상 **semantic 클래스**(`bg-surface-*`·`text-content-*`·`border-border-*`)로만. primitive 직접 참조 금지.
> - 토큰 배선은 [§5 Tailwind v4 토큰 배선](#5-tailwind-v4-토큰-배선-5층-정답-패턴)을 그대로 따른다.

---

## 1. 원칙 — shadcn 부분 도입

**shadcn을 "그대로 쓰는 라이브러리"가 아니라 "동작·접근성 스캐폴드"로만 쓰고, 겉모습은 우리 Figma 토큰으로 갈아끼운다.**

- shadcn/ui는 npm 의존성이 아니라 **컴포넌트 소스를 우리 저장소로 복사**해 우리가 소유·수정하는 방식이다.
- 우리가 취하는 것: **Radix 동작 로직**(포커스 트랩, 키보드 내비, ARIA), 마크업 골격, 상태 관리 배선.
- 우리가 버리는 것: shadcn **기본 디자인**(색·radius·스페이싱·new-york 룩). 이건 Figma로 대체한다.

### ❌ 하지 말 것

- `npx shadcn add button` 후 **그대로 화면에 사용**. → 디자인이 shadcn 기본 룩에 끼워맞춰진다.
- shadcn의 테마 초기화(`globals.css`에 shadcn 기본 `--primary` 등 **원본 값** 주입)를 우리 `@theme` 위에 덮어쓰기.
- 팀원 두 명이 서로 다른 방식(한 명은 변수 매핑, 한 명은 클래스 치환)으로 같은 컴포넌트를 만드는 것.

## 2. 스타일 연결: (A) 변수 매핑 vs (B) 클래스 치환

shadcn 컴포넌트는 자기 CSS 변수(`--primary`, `--border`, `--ring` 등)를 하드코딩해서 온다. 우리 semantic과 이름이 다르므로 둘 중 하나로 연결한다.

### (A) 변수 매핑 — 기본값

`globals.css`에서 shadcn 기본 변수를 **우리 semantic으로 1회 매핑**한다. 그러면 shadcn 컴포넌트가 마크업 수정 없이 우리 색으로 렌더된다.

```css
:root {
  --background: var(--background-default);
  --foreground: var(--content-primary);
  --border: var(--border-primary);
  --ring: var(--effect-focus-ring-primary);
  /* ... 전체 매핑표는 아래 §9 shadcn 브리지 참조 */
}
```

> 매핑 대상은 light/dark 값을 실제로 들고 있는 **plain semantic 변수(`--background-default`)**. `@theme inline`이 만드는 `--color-*`(브리지 이름)가 아니다 — 그건 유틸리티 생성 전용이라 `:root`에 안 남을 수 있다(→ [§5](#5-tailwind-v4-토큰-배선-5층-정답-패턴)).

- **다크모드는 자동.** 우리 semantic이 `.dark`에서 값을 스왑하므로, shadcn 변수도 따라 바뀐다. shadcn의 `.dark` 전략과 동일해서 그대로 호환.
- **언제 쓰나:** 상태·계층이 단순해 shadcn 기본 변수로 표현되는 컴포넌트 (Avatar, 단순 Input 등).

### (B) 클래스 치환 — 변형이 풍부한 컴포넌트

Figma 디자인이 shadcn 기본보다 **상태·계층이 많을 때**(대표: Button), shadcn이 심는 `bg-primary` 같은 클래스를 **우리 semantic 클래스로 직접 치환**한다.

```tsx
// shadcn 원본: bg-primary text-primary-foreground hover:bg-primary/90
// 우리 치환:  bg-surface-button-primary-default hover:bg-surface-button-primary-hover
//            active:bg-surface-button-primary-pressed text-content-oncolor
```

- 계층(primary/secondary/tertiary/quarternary)·상태(default/hover/pressed)를 `class-variance-authority(cva)` variant로 매핑하고, 각 값은 `surface/button/*` semantic 클래스를 쓴다.
- **언제 쓰나:** Button, Segment-Controls 등 `--color-surface-button-*`처럼 **버튼 전용 semantic이 따로 정의된 컴포넌트.**

### 규칙 요약

| 상황                                                        | 방식                                  |
| ----------------------------------------------------------- | ------------------------------------- |
| shadcn 기본 변수로 표현 가능                                | **(A)** 변수 매핑 (globals.css 1회)   |
| Figma에 컴포넌트 전용 semantic 존재 (`surface/button/*` 등) | **(B)** 클래스 치환 (cva variant)     |
| shadcn 대응 없음                                            | 직접 제작 + semantic 클래스 직접 사용 |

> (A)는 프로젝트에 한 번만 세팅. 이후 개별 컴포넌트 작업은 대부분 (B) 판단만 하면 된다.

## 3. 도입 대상 컴포넌트 (Figma "Ready for dev" 기준)

Figma에 컴포넌트로 정의된 것: **Button · Input · Profile · Segment-Controls · GNB-Navigation · Social-Login · Spinner**.

| 컴포넌트         | shadcn 스캐폴드            | 비고                                                                                                                                                            |
| ---------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button           | `button`                   | 계층 4종(primary~quarternary) × 상태(default/hover/pressed/focus/loading/disabled/danger) × square/round × sm/md/lg. **변형이 shadcn 기본보다 많음 → 방식 (B)** |
| Input            | `input`                    | 상태(기본/포커스/에러). 테두리색은 `border/*` semantic 참조                                                                                                     |
| Segment-Controls | `tabs` 또는 `toggle-group` | Radix 동작만 취함                                                                                                                                               |
| GNB-Navigation   | (자체 제작)                | shadcn 대응 컴포넌트 없음. 직접 구현                                                                                                                            |
| Social-Login     | Button 재사용              | 별도 컴포넌트 아님, Button variant로                                                                                                                            |
| Profile          | `avatar`                   |                                                                                                                                                                 |
| Spinner          | (자체 제작)                | Figma parts로 존재                                                                                                                                              |

> shadcn에 1:1 대응이 없으면 **억지로 맞추지 말고 직접 만든다.** 스캐폴드는 편의지 의무가 아니다.

## 4. 컴포넌트 추가 절차

1. Figma에서 해당 컴포넌트의 **변형·상태·소비 semantic**을 확인 (아래 토큰표와 대조).
2. shadcn 대응이 있으면 소스만 복사(`components/ui/`), 없으면 직접 생성.
3. shadcn 기본 스타일 제거 → (A)/(B) 규칙으로 우리 semantic 연결.
4. **primitive 직접 참조 금지** — 반드시 semantic 클래스(`bg-surface-*`, `text-content-*`, `border-border-*`)만.
5. 라이트/다크 모두 확인 (`.dark` 토글).
6. 컨벤션 점검: `export function`(named), `any` 금지, 인라인 스타일 금지 (→ [code-style-convention/SKILLS.md](../code-style-convention/SKILLS.md)). shadcn 원본이 이를 어기면 우리 규칙에 맞게 수정.

> shadcn 컴포넌트는 보통 `class-variance-authority` · `tailwind-merge`(+`clsx`) · Radix 패키지를 요구한다. **컴포넌트를 처음 도입하는 시점에** 설치한다(→ [`docs/deferred-setup.md`](../../docs/deferred-setup.md) 정책). `cn()` 유틸(clsx+tailwind-merge)은 첫 컴포넌트와 함께 `lib/`에 둔다.
> `components/ui/` 폴더 규칙은 [structure-convention/SKILLS.md](../structure-convention/SKILLS.md)를 따른다. **Tailwind v4 + shadcn**: shadcn CLI의 기본 init은 v3 전제 설정을 넣을 수 있으니 init은 돌리지 말고 **컴포넌트 소스만** 가져온다.

---

## 5. Tailwind v4 토큰 배선 (5층 정답 패턴)

`globals.css` 하나에 아래 **5개 층**으로 배선한다. 이 순서·방식이 정답이며, 임의 변경 금지.

> **왜 5층인가 (핵심).** semantic은 **두 개의 변수**로 나뉜다: `.dark`가 스왑하는 **plain 값 변수**(`--background-default`)와, 유틸리티를 만드는 **theme 브리지 변수**(`--color-background-default`). 이 둘을 `@theme inline` 한 줄로 합치면 다크가 안 먹는다(→ [아래 함정](#흔한-함정-4층으로-합치면-다크가-안-먹는다)). shadcn v4가 쓰는 구조가 이것이다.

```css
@import 'tailwindcss';

/* ① Primitives — 고정 원시값. 일반 :root 커스텀 속성.
   @theme에 넣지 않는다 → bg-brand-500 유틸리티가 안 생겨서
   "primitive 직접 사용 금지"가 자연히 강제됨. */
:root {
  --color-brand-500: #__value__; /* 실제 hex는 Figma에서 (아직 미확정) */
  --color-coolgray-900: #__value__;
  --color-normal-1: #__value__;
  /* ... primitives 240개 + opacity/알파 변형 */
}

/* ② 정적 스케일 — 모드에 안 변하는 값(radius·글자크기)은 일반 @theme.
   여기 있는 것만 rounded-*, text-* 유틸리티가 생성됨. */
@theme {
  --radius-4: 4px;
  --radius-8: 8px; /* ... 32까지 */
  --text-body-14: 14px; /* ... */
}

/* ③ Semantic 값 (light 기본) — @theme이 아닌 일반 :root.
   접두사 없는 plain 변수(--background-default). primitive를 참조. */
:root {
  --background-default: var(--color-normal-1);
  --surface-brand: var(--color-brand-400-p);
  --content-primary: var(--color-coolgray-950);
  /* ... color-semantic 51개 전부 (light 값) */
}

/* ④ Semantic 값 (dark 스왑) — 같은 plain 변수를 .dark에서 덮어쓴다.
   primitives·정적 스케일·⑤ 브리지는 그대로. light와 다른 것만 적는다. */
.dark {
  --background-default: var(--color-coolgray-900);
  --surface-brand: var(--color-brand-350);
  --content-primary: var(--color-normal-1);
  /* ... dark 값이 light와 다른 semantic만 */
}

/* ⑤ Theme 브리지 — @theme inline으로 --color-* 을 ③/④의 plain 변수에 연결.
   inline이라 유틸리티가 var(--background-default)를 인라인 → .dark 스왑이 반영됨.
   이 층에 있는 것만 bg-surface-*, text-content-*, border-border-* 유틸이 생성됨. */
@theme inline {
  --color-background-default: var(--background-default);
  --color-surface-brand: var(--surface-brand);
  --color-content-primary: var(--content-primary);
  /* ... color-semantic 51개 전부 */
}
```

**핵심 규칙**

- **왜 semantic을 두 층(③④ + ⑤)으로 나누나:** `@theme inline`은 유틸리티에 변수 참조가 아니라 **정의 시점의 값을 인라인**한다. `@theme inline { --color-x: var(--y) }` 는 `.bg-x { background-color: var(--y) }` 를 만든다(`var(--color-x)`가 **아님**). 그래서 `.dark`가 덮어쓸 변수(`--y = --background-default`)를 ⑤가 인라인하도록 만들어야 스왑이 걸린다.
- **primitives는 ①(일반 `:root`)** — `@theme`에 넣지 말 것. 넣으면 `bg-brand-500` 유틸이 생겨 primitive 직접 사용을 막지 못한다.
- **semantic 값은 ③④(일반 `:root`/`.dark`), 유틸리티는 ⑤(`@theme inline`)** — 브리지 `--color-*` 이름은 유틸리티 생성 전용이고, 실제 light/dark 값은 접두사 없는 `--background-default`류가 들고 있는다.
- **다크모드 방식** = `.dark` 클래스 토글 (shadcn과 동일 → shadcn 컴포넌트 그대로 호환).
- ⚠️ **③④가 참조하는 primitive 변수명은 Figma와 정확히 일치해야 함** — `--color-brand-400-p`의 `-p`가 실제 변수명인지 Figma에서 확인 후 확정(→ [§11 미확정](#11-미확정-디자인팀-확인-대기)).

### 흔한 함정: 4층으로 합치면 다크가 안 먹는다

semantic을 `@theme inline` 한 줄에 primitive 직결로 합치면 안 된다:

```css
/* ✗ 틀림 — light 값에 고정됨 */
@theme inline {
  --color-background-default: var(--color-normal-1);
}
.dark {
  --color-background-default: var(--color-coolgray-900);
}
```

`inline`이 유틸리티에 `var(--color-normal-1)`(primitive)을 인라인하므로 `.bg-background-default { background-color: var(--color-normal-1) }` 가 되어 **light에 고정**된다. `.dark`가 바꾸는 `--color-background-default`는 유틸리티가 읽지 않는다. 반드시 ③④의 plain 변수를 거쳐 ⑤가 그걸 인라인하게 한다.

---

## 6. Figma 컬렉션 구조 + 변환 규칙

### 컬렉션 (실물)

| 컬렉션             | 변수 수 | 비고                                         |
| ------------------ | ------- | -------------------------------------------- |
| `color-primitives` | 240     | 팔레트, 직접 참조 금지                       |
| `color-semantic`   | 51      | **컴포넌트가 쓰는 것**                       |
| `component`        | 0       | 컴포넌트 전용 변수 없음 (semantic 직접 참조) |
| `number`           | 50      |                                              |
| `typography`       | 42      |                                              |
| `responsive`       | 1       |                                              |

### 변환 규칙 (표에 없는 새 토큰 만나면 이걸로 직접 변환)

1. `/` · `_` → `-`
2. 전부 소문자
3. 용도별 접두사를 붙이고, 중복되는 계층 이름은 생략

예: `surface/button/primary/pressed` → `--color-surface-button-primary-pressed` → `bg-surface-button-primary-pressed`

> ⚠️ **Figma Dev Mode 출력을 그대로 쓰면 안 된다.** Figma는 `var(--red-500)`처럼 **`--color-` 접두사 없이** 내보낸다. Tailwind v4는 접두사가 있어야 유틸리티 클래스를 만들므로, 위 규칙으로 접두사를 붙인다.

### 용도별 접두사 (Tailwind v4 고정, 임의 변경 불가)

| 용도           | 접두사           | 생성 클래스                        |
| -------------- | ---------------- | ---------------------------------- |
| 색상           | `--color-`       | `bg-` `text-` `border-` `fill-`    |
| 글자 크기      | `--text-`        | `text-`                            |
| 글자 굵기      | `--font-weight-` | `font-`                            |
| 글꼴           | `--font-`        | `font-`                            |
| 모서리         | `--radius-`      | `rounded-`                         |
| 간격 기준값    | `--spacing`      | `gap-` `p-` `m-` `h-` `w-` `size-` |
| 브레이크포인트 | `--breakpoint-`  | `sm:` `md:`                        |

> `--`는 변수 시작 기호. 계층 구분은 하이픈 1개. (`--color-brand-500` O / `--color--brand--500` X)

## 7. Color · Primitives

팔레트. **화면/컴포넌트에서 직접 참조하지 말 것 — 아래 Semantic만 참조한다.** (Semantic이 바뀌어도 컴포넌트를 안 고치기 위해.)

패턴: `그룹/단계` → `--color-<그룹>-<단계>` (예: `brand/500` → `--color-brand-500` → `bg-brand-500`)

- 그룹: `blue` `brand` `cool-gray` `green` `orange` `pink` `purple` `red` `sky-blue` `yellow` — **각 그룹 20~950 단계**
- `normal`: `0`(흰) `1`(검) 예외 스케일
- **알파 변형**: `opacity/<그룹>/<단계>-A<NN>` = 해당 색 **NN% 투명도** (예: `opacity/red/400-A20` = red/400 20%). Semantic이 상태 배경 등에 참조.
- `-p` 접미(`brand/400-p`): primitive의 특정 변형명. **해석하지 말고 그대로** 참조값으로 둔다.

## 8. Color · Semantic

**컴포넌트는 이 표의 토큰만 쓴다.** 각 토큰은 light/dark 두 모드에서 서로 다른 primitive를 참조한다. "참조" 열은 primitive 이름이고, 실제 코드에서 쓰는 건 **CSS 변수** 열.

### background

| Figma                | CSS 변수                     | light      | dark           |
| -------------------- | ---------------------------- | ---------- | -------------- |
| `background/default` | `--color-background-default` | `normal/1` | `coolgray/900` |

### content (텍스트 색 — `text-` 클래스로 사용)

| Figma                 | CSS 변수                      | light            | dark           |
| --------------------- | ----------------------------- | ---------------- | -------------- |
| `content/brand`       | `--color-content-brand`       | `brand/400-p`    | `brand/400-p`  |
| `content/primary`     | `--color-content-primary`     | `coolgray/950`   | `normal/1`     |
| `content/secondary`   | `--color-content-secondary`   | `coolgray/800`   | `coolgray/100` |
| `content/tertiary`    | `--color-content-tertiary`    | `coolgray/600`   | `coolgray/200` |
| `content/quarternary` | `--color-content-quarternary` | `coolgray/500`   | `coolgray/300` |
| `content/disabled`    | `--color-content-disabled`    | `coolgray/400-p` | `coolgray/300` |
| `content/warning`     | `--color-content-warning`     | `orange/500-p`   | `orange/450`   |
| `content/success`     | `--color-content-success`     | `green/500-p`    | `green/450`    |
| `content/error`       | `--color-content-error`       | `red/400-p`      | `red/350`      |
| `content/visibility`  | `--color-content-visibility`  | `blue/500-p`     | `blue/450`     |
| `content/oncolor`     | `--color-content-oncolor`     | `normal/1`       | `normal/1`     |
| `content/inverse`     | `--color-content-inverse`     | `normal/1`       | `coolgray/950` |

> Figma의 `Font_Brand/Primary/Secondary/Tertiary/Disabled` 시각 문서가 이 content 색을 눈으로 보여주는 것.

### surface (배경 색 — `bg-` 클래스로 사용)

| Figma                | CSS 변수                     | light                    | dark                     |
| -------------------- | ---------------------------- | ------------------------ | ------------------------ |
| `surface/brand`      | `--color-surface-brand`      | `brand/400-p`            | `brand/350`              |
| `surface/primary`    | `--color-surface-primary`    | `coolgray/50`            | `coolgray/800`           |
| `surface/secondary`  | `--color-surface-secondary`  | `coolgray/100`           | `coolgray/700`           |
| `surface/tertiary`   | `--color-surface-tertiary`   | `coolgray/200`           | `coolgray/600`           |
| `surface/disabled`   | `--color-surface-disabled`   | `coolgray/50`            | `coolgray/500`           |
| `surface/danger`     | `--color-surface-danger`     | `red/500`                | `red/400-p`              |
| `surface/warning`    | `--color-surface-warning`    | `opacity/orange/500-A20` | `opacity/orange/500-A20` |
| `surface/success`    | `--color-surface-success`    | `opacity/green/500-A20`  | `opacity/green/500-A20`  |
| `surface/error`      | `--color-surface-error`      | `opacity/red/400-A20`    | `opacity/red/400-A20`    |
| `surface/visibility` | `--color-surface-visibility` | `opacity/blue/500-A20`   | `opacity/blue/500-A20`   |

#### surface/button (버튼 계층별 · default/hover/pressed)

| Figma                                | CSS 변수                                     | light          | dark                    |
| ------------------------------------ | -------------------------------------------- | -------------- | ----------------------- |
| `surface/button/primary/default`     | `--color-surface-button-primary-default`     | `brand/400-p`  | `brand/350`             |
| `surface/button/primary/hover`       | `--color-surface-button-primary-hover`       | `brand/350`    | `brand/300`             |
| `surface/button/primary/pressed`     | `--color-surface-button-primary-pressed`     | `brand/500`    | `brand/500`             |
| `surface/button/secondary/default`   | `--color-surface-button-secondary-default`   | `brand/50`     | `opacity/brand/400-A20` |
| `surface/button/secondary/hover`     | `--color-surface-button-secondary-hover`     | `brand/100`    | `opacity/brand/400-A30` |
| `surface/button/secondary/pressed`   | `--color-surface-button-secondary-pressed`   | `brand/200`    | `opacity/brand/400-A20` |
| `surface/button/tertiary/default`    | `--color-surface-button-tertiary-default`    | `coolgray/800` | `coolgray/50`           |
| `surface/button/tertiary/hover`      | `--color-surface-button-tertiary-hover`      | `coolgray/700` | `coolgray/200`          |
| `surface/button/tertiary/pressed`    | `--color-surface-button-tertiary-pressed`    | `coolgray/900` | `coolgray/100`          |
| `surface/button/quarternary/default` | `--color-surface-button-quarternary-default` | `coolgray/50`  | `opacity/normal/1-A10`  |
| `surface/button/quarternary/hover`   | `--color-surface-button-quarternary-hover`   | `coolgray/100` | `opacity/normal/1-A20`  |
| `surface/button/quarternary/pressed` | `--color-surface-button-quarternary-pressed` | `coolgray/200` | `opacity/normal/1-A10`  |

### border (테두리 색 — `border-` 클래스로 사용)

| Figma                       | CSS 변수                            | light            | dark                    |
| --------------------------- | ----------------------------------- | ---------------- | ----------------------- |
| `border/brand`              | `--color-border-brand`              | `brand/400-p`    | `brand/350`             |
| `border/primary`            | `--color-border-primary`            | `coolgray/800`   | `coolgray/200`          |
| `border/secondary`          | `--color-border-secondary`          | `coolgray/400-p` | `coolgray/600`          |
| `border/tertiary`           | `--color-border-tertiary`           | `coolgray/300`   | `coolgray/700`          |
| `border/disabled`           | `--color-border-disabled`           | `coolgray/200`   | `coolgray/800`          |
| `border/inverse`            | `--color-border-inverse`            | `normal/1`       | `coolgray/900`          |
| `border/warning`            | `--color-border-warning`            | `orange/500-p`   | `orange/450`            |
| `border/success`            | `--color-border-success`            | `green/500-p`    | `green/450`             |
| `border/error`              | `--color-border-error`              | `red/400-p`      | `red/350`               |
| `border/visibility`         | `--color-border-visibility`         | `blue/500-p`     | `blue/450`              |
| `border/button/secondary`   | `--color-border-button-secondary`   | `brand/100`      | `opacity/brand/400-A20` |
| `border/button/tertiary`    | `--color-border-button-tertiary`    | `coolgray/300`   | `coolgray/500`          |
| `border/button/quarternary` | `--color-border-button-quarternary` | `coolgray/300`   | `coolgray/600`          |

### divider

| Figma             | CSS 변수                  | light          | dark           |
| ----------------- | ------------------------- | -------------- | -------------- |
| `divider/default` | `--color-divider-default` | `coolgray/200` | `coolgray/700` |

### effect / focus-ring

| Figma                         | CSS 변수                              | light                      | dark                       |
| ----------------------------- | ------------------------------------- | -------------------------- | -------------------------- |
| `effect/focus-ring/primary`   | `--color-effect-focus-ring-primary`   | `opacity/brand/400-A20`    | `opacity/brand/400-A20`    |
| `effect/focus-ring/secondary` | `--color-effect-focus-ring-secondary` | `opacity/coolgray/400-A20` | `opacity/coolgray/400-A20` |

## 9. shadcn 브리지

shadcn 컴포넌트를 스캐폴드로 가져올 때, shadcn 기본 변수를 우리 semantic으로 매핑(또는 컴포넌트 클래스를 우리 것으로 치환)한다.

> ⚠️ **브리지 대상은 §5 ③④의 plain 변수(`--background-default`)이지 ⑤의 `--color-*`가 아니다.** `@theme inline`의 `--color-*`는 유틸리티 생성 전용이라 `:root`에 커스텀 속성으로 남지 않을 수 있어 `var(--color-background-default)`가 비게 될 수 있다. shadcn 변수는 light/dark 스왑을 실제로 들고 있는 plain 변수에 건다.

| shadcn 변수            | 우리 semantic (plain)              |
| ---------------------- | ---------------------------------- |
| `--background`         | `--background-default`             |
| `--foreground`         | `--content-primary`                |
| `--primary`            | `--surface-button-primary-default` |
| `--primary-foreground` | `--content-oncolor`                |
| `--border`             | `--border-primary`                 |
| `--ring`               | `--effect-focus-ring-primary`      |
| `--destructive`        | `--surface-danger`                 |
| `--muted`              | `--surface-secondary`              |

## 10. Typography / Number / Responsive

### Font Size — `Font_Size` 그룹명 생략, 계층 하나만

| CSS 변수                  | 값  | 클래스                  |
| ------------------------- | --- | ----------------------- |
| `--text-caption-9`        | 9   | `text-caption-9`        |
| `--text-caption-10`       | 10  | `text-caption-10`       |
| `--text-label-12`         | 12  | `text-label-12`         |
| `--text-label-13`         | 13  | `text-label-13`         |
| `--text-body-14`          | 14  | `text-body-14`          |
| `--text-body-15`          | 15  | `text-body-15`          |
| `--text-section-title-16` | 16  | `text-section-title-16` |
| `--text-title-17`         | 17  | `text-title-17`         |
| `--text-title-18`         | 18  | `text-title-18`         |
| `--text-heading-20`       | 20  | `text-heading-20`       |
| `--text-heading-22`       | 22  | `text-heading-22`       |
| `--text-heading-24`       | 24  | `text-heading-24`       |

> 행간(`--text-*--line-height`)은 ⛔ 미확정.

### Font Weight / Family

- Weight: Tailwind 기본, 선언 없이 사용 — `medium`→`font-medium` / `semibold`→`font-semibold` / `bold`→`font-bold` / `extrabold`→`font-extrabold`
- Family: `--font-sans` = Pretendard (본문 기본, 이미 적용됨) → `font-sans`

### Number — 기본 스케일로 흡수 (4배수 = Tailwind spacing)

Figma는 `--gap-gap-12`, `--height-height-52`처럼 이름이 겹치는 토큰을 내보내지만, **우리는 이걸 쓰지 않고 Tailwind 기본 클래스로 흡수한다.**

| Figma                     | 클래스                     | 용도             |
| ------------------------- | -------------------------- | ---------------- |
| Gap 4/8/12/16/20/24/28/32 | `gap-1`~`gap-8`            | 요소 간격        |
| Height 16/24/32           | `size-4`/`size-6`/`size-8` | 아이콘           |
| Height 44/48/52           | `h-11`/`h-12`/`h-13`       | 버튼             |
| Margin/Default 16         | `px-4`                     | 모바일 좌우 여백 |
| Border 1/2                | `border`/`border-2`        | 테두리 두께      |

- **Radius만 별도 선언**(숫자 이름이라): `Radius_4`~~`Radius_32` → `--radius-4`~~`--radius-32` → `rounded-4`~`rounded-32` (4·8·12·16·20·24·28·32). `radius/round` 9999px → `rounded-full`.
- `Number_Reference_Value/*`(원시값)는 코드에 안 씀. 이걸 참조하는 상위 토큰만 사용.

### Responsive

- `Responsive_Size` 393 = 모바일 기준 폭 (컨테이너 최대폭 적용 여부 미정)
- Tablet/Web 브레이크포인트 ⛔ 미확정 → 확정 시 `--breakpoint-md` `--breakpoint-lg` 추가

## 11. 미확정 (디자인팀 확인 대기)

- **행간(line-height)** — 폰트 크기별 값 미수령. 텍스트 컴포넌트 확정 불가.
- **Tablet / Web 브레이크포인트** — 미정.
- **`loading` 상태** 처리(스피너 위치·disabled 병행) 패턴은 Button 첫 구현 시 팀 합의.
- 🔴 **Primitives 라벨 버그** — `Sky_Blue` 3개 / `Purple` 없음. (미확정 아님, **정정 대상**)

## 갱신 규칙

- Figma에 토큰이 추가되면 해당 절에 행을 추가한다.
- semantic 값은 **Figma가 기준**. 이 문서와 다르면 Figma에 맞춘다.
- Figma Variables의 `Code syntax`는 현재 `--color-` 접두사 없이 자동 생성됨 → 그대로는 기준 문서로 못 삼음. 디자인팀이 Web syntax를 `--color-*`로 채우면 재검토.

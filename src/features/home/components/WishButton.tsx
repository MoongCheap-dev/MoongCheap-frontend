import { ComingSoonButton } from '@/components/ui/ComingSoonButton';

// 찜(관심상품) 토글. 시안 컴포넌트 `wish-switch`(818:9735)의 path를 그대로 옮겼다.
//
// 찜 기능은 IA·기능명세 어디에도 화면이나 요구사항이 없다. 시안에만 있는 진입점이라 노출은
// 하고 탭하면 '준비 중' 토스트를 띄운다.
export function WishButton() {
  return (
    <ComingSoonButton className="pointer-events-auto flex size-6 items-center justify-center">
      <svg
        className="size-6 opacity-80"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        focusable="false"
      >
        <path
          d="M7 3C4.239 3 2 5.216 2 7.95C2 10.157 2.875 15.395 11.488 20.69C11.6425 20.7833 11.8195 20.8327 12 20.8327C12.1805 20.8327 12.3575 20.7833 12.512 20.69C21.126 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3C14.239 3 12 6 12 6C12 6 9.761 3 7 3Z"
          className="fill-background-subtle stroke-content-disabled-primary"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">찜하기</span>
    </ComingSoonButton>
  );
}

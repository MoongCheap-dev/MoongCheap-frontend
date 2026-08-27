import Link from 'next/link';

// 시안의 quarternary 버튼(연회색 바탕 + 얇은 테두리)을 링크로 쓴 것.
// B-26의 "취소/교환/반품 조회", B-24의 "프로필 사진 변경"·"닉네임 변경"이 같은 모양이다.
//
// 공용 프리미티브(`components/ui/Button`)로 올리지 않는 이유는 아직 이 한 가지 변형만
// 쓰이기 때문이다. 두 번째 변형(primary 등)이 실제로 필요해질 때 함께 올린다.

interface LinkButtonProps {
  label: string;
  href: string;
}

export function LinkButton({ label, href }: LinkButtonProps) {
  return (
    <Link
      className="bg-surface-button-quarternary-default border-border-button-quarternary text-button-14 text-content-primary rounded-8 active:bg-surface-button-quarternary-pressed flex h-11 w-full flex-1 items-center justify-center border px-3 text-center"
      href={href}
    >
      {label}
    </Link>
  );
}

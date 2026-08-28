import { ToggleSwitch } from '@/components/ui/ToggleSwitch';

// 마케팅 수신 채널 한 줄(푸시 알림 · 이메일). 라벨 + 토글 + 아래 구분선.
//
// 전체 동의 행은 제목·설명 2줄에 타이포도 달라서 이 컴포넌트에 합치지 않았다. 시안에서
// 두 행은 같은 모양이 아니고, 실제로 같은 것은 "라벨 + 토글" 배치뿐이다.

interface NotificationChannelRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function NotificationChannelRow({
  label,
  checked,
  onChange,
  disabled = false,
}: NotificationChannelRowProps) {
  return (
    <div className="border-divider-default flex w-full items-center justify-between border-b px-4 py-3">
      <span className="text-button-14 text-content-quarternary">{label}</span>
      <ToggleSwitch checked={checked} disabled={disabled} label={label} onChange={onChange} />
    </div>
  );
}

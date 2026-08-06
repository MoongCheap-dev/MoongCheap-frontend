import { Camera } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="flex items-center gap-2.5 px-5 pt-2 pb-4">
      {/* TODO: 오려둔 카메라 로고 파일이 준비되면 아래 placeholder를 <Image>로 교체.
          예: <Image src="/logo.svg" alt="SafeShot" width={40} height={40} /> */}
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Camera className="h-6 w-6" strokeWidth={2.2} />
      </span>
      <span className="text-2xl font-bold tracking-tight text-foreground">SafeShot</span>
    </header>
  );
}

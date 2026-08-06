import Image from 'next/image';

export function AppHeader() {
  return (
    <header className="flex items-center gap-2.5 px-5 pt-2 pb-4">
      <Image
        src="/logo.svg"
        alt="SafeShot 로고"
        width={40}
        height={40}
        priority
        className="h-10 w-10 rounded-xl"
      />
      <span className="text-2xl font-bold tracking-tight text-foreground">SafeShot</span>
    </header>
  );
}

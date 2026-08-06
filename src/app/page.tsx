import { AppHeader } from '@/components/home/AppHeader';
import { CaptureCard } from '@/components/home/CaptureCard';
import { StatusBar } from '@/components/home/StatusBar';
// 최근 검사 섹션은 후순위로 밀려 임시 비활성화 (다시 켤 때 아래 주석과 함께 복구)
// import { RecentScans } from '@/components/home/RecentScans';
// import { recentScans } from '@/mocks/scans';

export default function HomePage() {
  return (
    <main className="flex min-h-full justify-center bg-[#e9ebef] py-0 sm:py-8">
      {/* 모바일 프레임 (프로토타입 표현용) */}
      <div className="flex min-h-svh w-full max-w-[420px] flex-col bg-background sm:min-h-0 sm:overflow-hidden sm:rounded-[2.5rem] sm:shadow-2xl">
        <StatusBar />
        <AppHeader />
        {/* 최근 검사 숨김 동안에는 spacious 로 미리보기-버튼 간격을 넓힌다.
            최근 검사를 다시 켤 때: 아래 CaptureCard 의 `spacious` 제거 + RecentScans 두 줄(상단 import 포함) 주석 해제 → 원래 레이아웃 복구 */}
        <CaptureCard spacious />
        {/* <RecentScans scans={recentScans} /> */}
      </div>
    </main>
  );
}

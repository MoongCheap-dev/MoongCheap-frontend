import { cn } from '@/lib/cn';

// 로딩 자리표시자. 홈 피드·목록 화면의 "영역별 스켈레톤"(FN-B03-01) 등 조회 화면 공통.
// 실제 콘텐츠와 같은 크기의 블록을 pulse로 노출한다. 크기·모양은 className으로 맞춘다.
//
// 예) <Skeleton className="h-40 w-full rounded-16" />  // 카드 자리
//     <Skeleton className="h-4 w-24" />                 // 텍스트 한 줄 자리

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div aria-hidden className={cn('bg-surface-secondary animate-pulse rounded-md', className)} />
  );
}

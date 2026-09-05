'use client';

import { useEffect, useState } from 'react';

// 마감까지 남은 시간. 시안이 `03:09:12`(HH:MM:SS)로 그린다.
//
// 서버에서 계산하면 하이드레이션 때 값이 어긋나므로 첫 렌더에서는 아무것도 그리지 않고
// 마운트 후 클라이언트 시계로만 채운다. 자리를 잡아 두기 위해 폭은 부모가 준다.

function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
}

interface CountdownTimerProps {
  /** 마감 시각. ISO 8601 문자열. */
  deadline: string;
}

export function CountdownTimer({ deadline }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<string | null>(null);

  useEffect(() => {
    const target = new Date(deadline).getTime();

    const tick = () => {
      setRemaining(formatRemaining(target - Date.now()));
    };

    tick();
    const timer = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [deadline]);

  // 마운트 전에는 자리만 비워 둔다. 숫자 폭이 일정해 레이아웃이 흔들리지 않는다.
  return <span suppressHydrationWarning>{remaining ?? ''}</span>;
}

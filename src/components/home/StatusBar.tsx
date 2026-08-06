import { BatteryFull, SignalHigh, Wifi } from 'lucide-react';

/** iOS 느낌의 목업 상태바 (프로토타입 전용 장식) */
export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-sm font-semibold text-foreground">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <SignalHigh className="h-4 w-4" strokeWidth={2.5} />
        <Wifi className="h-4 w-4" strokeWidth={2.5} />
        <BatteryFull className="h-5 w-5" strokeWidth={2} />
      </div>
    </div>
  );
}

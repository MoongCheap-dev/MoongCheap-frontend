export type ScanStatus = 'safe' | 'warning' | 'danger';

export interface Scan {
  id: string;
  fileName: string;
  /** 프로토타입용 표시 문자열 (예: '오늘 10:32') */
  scannedAt: string;
  /** 썸네일 색상 시드 — 목데이터용 그라데이션 생성에 사용 */
  thumbSeed: string;
  status: ScanStatus;
}

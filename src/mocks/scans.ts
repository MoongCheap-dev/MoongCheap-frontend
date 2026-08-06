import type { Scan } from '@/types/scan';

/** 홈 화면 "최근 검사" 목데이터 (프로토타입) */
export const recentScans: Scan[] = [
  {
    id: 'scan-01',
    fileName: 'photo_20250104.jpg',
    scannedAt: '오늘 10:32',
    thumbSeed: '4e7fec',
    status: 'safe',
  },
  {
    id: 'scan-02',
    fileName: 'photo_20250104.jpg',
    scannedAt: '오늘 10:32',
    thumbSeed: '7c9cf0',
    status: 'safe',
  },
  {
    id: 'scan-03',
    fileName: 'IMG_2384.png',
    scannedAt: '어제 21:08',
    thumbSeed: 'e0922f',
    status: 'warning',
  },
  {
    id: 'scan-04',
    fileName: 'screenshot_1229.jpg',
    scannedAt: '어제 18:41',
    thumbSeed: 'e05353',
    status: 'danger',
  },
];

/**
 * public/images 하위 PNG를 표시 크기에 맞춰 줄이고 WebP로 바꾼다.
 *
 * `design/tokens/build-tokens.mjs`와 같은 방식이다. 생성물(.webp)을 커밋하고,
 * 디자인이 새 에셋을 주면 원본 PNG를 넣은 뒤 이 스크립트를 다시 돌린다.
 *
 *   node scripts/optimize-images.mjs
 *   node scripts/optimize-images.mjs --dry
 *
 * 왜 필요한가 — `next/image`는 자체 호스팅 환경에서 Node 프로세스 안의 sharp로 원본을
 * 디코딩한다. 원본이 클수록 변환 1회의 CPU·메모리가 커지고, 그게 FE 노드 스펙 상향으로
 * 이어진다(클라우드 파트 예산 문서 참고). 원본을 미리 줄이면 런타임 변환이 싸진다.
 *
 * SVG는 대상이 아니다. 이미 작고(총 49KB) 벡터라 리사이즈 개념이 없다.
 */

import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const ROOT = path.join(process.cwd(), 'public', 'images');
const DRY = process.argv.includes('--dry');

/**
 * 목표 폭. 각 이미지가 화면에 그려지는 폭을 2배(레티나)한 값이다.
 *
 * 표시 폭은 컴포넌트에서 두 가지 형태로 나타난다. **둘 다 확인해야 한다.**
 *   - `fill` + `sizes="NNNpx"`  (홈 카드류)
 *   - 고정 `width={NNN}`         (일러스트·미리보기류)
 *
 * 여기 없는 경로는 `DEFAULT_WIDTH`로 간다. 상품 사진은 한 장이 여러 카드에 쓰일 수 있어
 * 가장 큰 사용처(브랜드딜 260)에 맞췄다. 더 작게 그리는 카드는 `next/image`가 런타임에
 * 한 번 더 줄인다.
 *
 * 새 화면을 만들 때 표시 폭이 260을 넘는 이미지가 생기면 여기에 추가한다.
 * 빠뜨리면 고밀도 화면에서 확대돼 흐려진다.
 */
const TARGET_WIDTHS = [
  ['banner-carousel', 786], // BannerCarousel sizes="393px"
  ['product-description', 786], // 상품 상세 설명, 화면 폭(393) 전체
  ['seller-apply-preview', 672], // SellerApplyWizard width={336}
];

/** 브랜드딜 260 · 상품카드 121 · 와이드 120 · 브랜드행 106 · 행 65 · 주문 60 · 빈 상태 246 */
const DEFAULT_WIDTH = 520;

/** WebP는 한 변이 이 값을 넘을 수 없다. 넘으면 인코딩 자체가 실패한다. */
const WEBP_MAX_SIDE = 16383;

function targetWidth(relativePath) {
  const match = TARGET_WIDTHS.find(([fragment]) => relativePath.includes(fragment));
  return match ? match[1] : DEFAULT_WIDTH;
}

async function collectPngFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectPngFiles(full);
      return entry.name.toLowerCase().endsWith('.png') ? [full] : [];
    }),
  );
  return files.flat();
}

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}

async function main() {
  const files = (await collectPngFiles(ROOT)).sort();
  if (files.length === 0) {
    console.log('변환할 PNG가 없습니다. 이미 최적화된 상태입니다.');
    return;
  }

  let before = 0;
  let after = 0;

  for (const file of files) {
    const relative = path.relative(ROOT, file);
    const source = sharp(file, { limitInputPixels: false });
    const { width, height } = await source.metadata();
    const max = targetWidth(relative);
    const nextWidth = Math.min(width, max);
    const nextHeight = Math.round((height * nextWidth) / width);

    if (nextHeight > WEBP_MAX_SIDE) {
      throw new Error(
        `${relative}: 축소 후 세로가 ${nextHeight}px으로 WebP 한계(${WEBP_MAX_SIDE}px)를 넘습니다. ` +
          '디자인 파트에 분할본을 요청하세요.',
      );
    }

    const output = file.replace(/\.png$/i, '.webp');
    const buffer = await source
      .resize({ width: nextWidth, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const originalSize = (await stat(file)).size;
    before += originalSize;
    after += buffer.length;

    console.log(
      `${relative.padEnd(48)} ${`${width}x${height}`.padEnd(13)} → ` +
        `${`${nextWidth}x${nextHeight}`.padEnd(13)} ` +
        `${formatSize(originalSize).padStart(8)} → ${formatSize(buffer.length).padStart(8)}`,
    );

    if (DRY) continue;
    await sharp(buffer).toFile(output);
    await unlink(file);
  }

  const percent = ((after / before) * 100).toFixed(1);
  console.log(
    `\n${files.length}장  ${formatSize(before)} → ${formatSize(after)}  (원본의 ${percent}%)` +
      (DRY ? '  [--dry, 파일을 쓰지 않았습니다]' : ''),
  );
}

await main();

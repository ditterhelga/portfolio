#!/usr/bin/env node
/**
 * Downloads Dreamkas case images from the Figma file using the REST Images API.
 *
 * Renaming layers inside Figma is not possible from this repo or the Cursor Figma MCP
 * (read-only). Run this once with a token to save files with the correct names locally.
 *
 * Setup:
 *   1. Figma → Settings → Security → Generate personal access token
 *   2. export FIGMA_ACCESS_TOKEN="your_token"
 *   3. node scripts/export-dreamkas-figma-assets.mjs
 *
 * File key matches: https://www.figma.com/design/tFUnl7BQoWLUk1cRUkoDQu/...
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'assets', 'images');

const FILE_KEY = 'tFUnl7BQoWLUk1cRUkoDQu';

/** Node id (Figma format with colon) → output filename */
const ASSETS = [
  ['136:2632', 'dreamkas-hero.png'],
  ['136:2638', 'dreamkas-main.png'],
  ['136:2635', 'dreamkas-logo.png'],
  ['136:2643', 'dreamkas-overview-pos-wide.png'],
  ['136:2651', 'dreamkas-overview-cashier-square.png'],
  ['136:2649', 'dreamkas-overview-viki-mini.png'],
  ['136:2654', 'dreamkas-challenge-old-pos.png'],
  ['136:2657', 'dreamkas-eco-shop.png'],
  ['136:2660', 'dreamkas-research-me.png'],
  ['381:6003', 'dreamkas-quote-kapatsevich.png'],
  ['136:2868', 'dreamkas-persona-cashiers.png'],
  ['136:2138', 'dreamkas-persona-owners.png'],
  ['136:3068', 'dreamkas-persona-hq.png'],
  ['136:3201', 'dreamkas-cafe.png'],
  ['136:3204', 'dreamkas-viki-pos-lineup.png'],
  ['136:3207', 'dreamkas-ux-hand-viki.png'],
  ['136:3210', 'dreamkas-ux-cashier-wide.png'],
  ['136:3220', 'dreamkas-gallery-interface-1.png'],
  ['136:3276', 'dreamkas-gallery-interface-2.png'],
  ['136:3224', 'dreamkas-gallery-thumb-01.png'],
  ['136:3226', 'dreamkas-gallery-thumb-02.png'],
  ['136:3228', 'dreamkas-gallery-thumb-03.png'],
  ['136:3230', 'dreamkas-gallery-thumb-04.png'],
  ['136:3232', 'dreamkas-gallery-thumb-05.png'],
  ['136:3267', 'dreamkas-receipt.png'],
  ['136:3270', 'dreamkas-alco.png'],
  ['136:3297', 'dreamkas-results-cashier-portrait.png'],
  ['136:3295', 'dreamkas-results-cashier-chart.png'],
  ['136:2443', 'dreamkas-video-testimonials-poster.png'],
  ['136:2552', 'dreamkas-video-operations-poster.png'],
  ['136:3304', 'dreamkas-results-owner-photo.png'],
  ['136:3307', 'dreamkas-results-owner-chart.png'],
  ['390:3160', 'dreamkas-quote-ildar.png'],
  ['136:3310', 'dreamkas-viki-tower.png'],
  ['136:3313', 'dreamkas-learnings-store.png'],
  ['136:3318', 'dreamkas-self-checkout-csi.png'],
  ['136:3324', 'dreamkas-self-checkout-igor.png'],
  ['136:3327', 'dreamkas-self-checkout-spar.png'],
  ['136:3330', 'dreamkas-self-checkout-lenta.png'],
];

const BATCH = 15;
const SCALE = 2;
const FORMAT = 'png';

function encodeNodeId(id) {
  return id.replace(':', '-');
}

async function fetchImageUrls(token, ids) {
  const params = new URLSearchParams({
    ids: ids.join(','),
    format: FORMAT,
    scale: String(SCALE),
  });
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?${params}`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API ${res.status}: ${text}`);
  }
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  return data.images || {};
}

async function download(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
}

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN;
  if (!token) {
    console.error(
      'Set FIGMA_ACCESS_TOKEN (or FIGMA_TOKEN) to a Figma personal access token.\n' +
        'Figma → Settings → Security → Personal access tokens.'
    );
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const ids = ASSETS.map(([id]) => id);
  const urlMap = {};

  for (let i = 0; i < ids.length; i += BATCH) {
    const chunk = ids.slice(i, i + BATCH);
    const images = await fetchImageUrls(token, chunk);
    Object.assign(urlMap, images);
  }

  let ok = 0;
  for (const [nodeId, filename] of ASSETS) {
    const key = encodeNodeId(nodeId);
    const url = urlMap[nodeId] || urlMap[key];
    if (!url) {
      console.warn(`No URL for ${nodeId} (${filename}) — skipped`);
      continue;
    }
    const dest = join(OUT_DIR, filename);
    await download(url, dest);
    console.log('Wrote', filename);
    ok += 1;
  }

  console.log(`\nDone: ${ok}/${ASSETS.length} files → ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

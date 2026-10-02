#!/usr/bin/env node
// Fitz Clean SVG Icons — README kapak afişi (banner.svg) üreticisi
// Zero-dependency. İkonlar sırayla çizilir → bekler → geri sarar (kütüphane draw-in standardı).
// Kullanım: node scripts/banner.mjs   → banner.svg
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// 4 kategoriden 3'er ikon (sol → sağ: gezinti, eylem, medya, e-ticaret)
const FEATURED = [
  'compass', 'layers', 'map-pin',
  'heart', 'star', 'shield',
  'play', 'music', 'video',
  'shopping-cart', 'package', 'gift',
];
const W = 1200, H = 340, MARGIN = 78, CYCLE = 7, STAGGER = 0.32;
const SHAPES = 'path|circle|polygon|line|rect|polyline|ellipse';

function iconInner(name) {
  const src = readFileSync(join('static', `${name}.svg`), 'utf8').trim();
  const inner = src.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').trim();
  // draw-in için her şekle pathLength="100" ekle (kütüphane standardı)
  return inner.replace(new RegExp(`<(${SHAPES})(\\s|>)`, 'g'), '<$1 pathLength="100"$2');
}

export function generateBanner() {
  const n = FEATURED.length;
  const step = (W - 2 * MARGIN) / (n - 1);
  const groups = FEATURED.map((name, i) => {
    const s = 2.05 + 0.65 * Math.sin((Math.PI * i) / (n - 1)); // ortada hafif büyük
    const x = (MARGIN + i * step - 12 * s).toFixed(1);
    const y = (H / 2 - 12 * s).toFixed(1);
    const d = (i * STAGGER).toFixed(2);
    return `  <g class="i" style="--d:${d}s" transform="translate(${x} ${y}) scale(${s.toFixed(3)})">${iconInner(name)}</g>`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="bt">
  <title id="bt">Fitz Clean SVG Icons — 12 ikon sırayla çizilir, bekler ve geri sarar</title>
  <defs>
    <radialGradient id="g1" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#34d399" stop-opacity=".30"/><stop offset="100%" stop-color="#34d399" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#818cf8" stop-opacity=".26"/><stop offset="100%" stop-color="#818cf8" stop-opacity="0"/></radialGradient>
    <linearGradient id="hl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".10"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" rx="22" fill="#09090b"/>
  <ellipse cx="1060" cy="24" rx="320" ry="185" fill="url(#g1)"/>
  <ellipse cx="140" cy="322" rx="300" ry="175" fill="url(#g2)"/>
  <rect x="70" y="169.5" width="${W - 140}" height="1" fill="url(#hl)"/>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="21.5" fill="none" stroke="rgba(255,255,255,.08)"/>
  <g fill="none" stroke="#f2f2f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
${groups}
  </g>
  <style>
    .i path,.i circle,.i polygon,.i line,.i rect,.i polyline,.i ellipse{stroke-dasharray:100;stroke-dashoffset:100;opacity:0;animation:draw ${CYCLE}s cubic-bezier(.16,1,.3,1) infinite;animation-delay:var(--d)}
    @keyframes draw{0%{stroke-dashoffset:100;opacity:0}1%{stroke-dashoffset:100;opacity:1}15%{stroke-dashoffset:0;opacity:1}82%{stroke-dashoffset:0;opacity:1}96%{stroke-dashoffset:100;opacity:1}97%{opacity:0}100%{stroke-dashoffset:100;opacity:0}}
    @media (prefers-reduced-motion: reduce){.i path,.i circle,.i polygon,.i line,.i rect,.i polyline,.i ellipse{animation:none;stroke-dashoffset:0;opacity:1}}
  </style>
</svg>
`;
}

const runDirect = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (runDirect) {
  writeFileSync('banner.svg', generateBanner(), 'utf8');
  console.log('banner.svg üretildi');
}

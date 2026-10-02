#!/usr/bin/env node
// Fitz Clean SVG Icons — build & validate
// Zero-dependency. Kullanım:
//   node scripts/build.mjs            → icons.json + sprite.svg + preview.html + dist/
//   node scripts/build.mjs --check    → yalnızca doğrulama (CI), çıktı üretmez
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CHECK_ONLY = process.argv.includes('--check');
const FAIL = (msg) => { console.error(`HATA: ${msg}`); process.exit(1); };

// ---------- topla ----------
const readDir = (d) => readdirSync(d).filter(f => f.endsWith('.svg')).sort();
const statics = readDir('static');
const animated = readDir('animated');

// ---------- doğrulama ----------
const errors = [];
if (statics.length === 0) errors.push('static/ boş');
if (statics.length !== animated.length) errors.push(`simetri bozuk: static=${statics.length} animated=${animated.length}`);
const nameOk = /^[a-z0-9-]+\.svg$/;
for (const f of [...statics, ...animated]) {
  if (!nameOk.test(f)) errors.push(`geçersiz dosya adı: ${f}`);
}
const sSet = new Set(statics), aSet = new Set(animated);
for (const f of statics) if (!aSet.has(f)) errors.push(`animated eşleşmiyor: ${f}`);
for (const f of animated) if (!sSet.has(f)) errors.push(`static eşleşmiyor: ${f}`);

for (const f of statics) {
  const t = readFileSync(join('static', f), 'utf8');
  if (t.includes('<style')) errors.push(`static'te <style> olmamalı: ${f}`);
  if (!t.includes('viewBox')) errors.push(`viewBox yok: static/${f}`);
  if (!t.includes('xmlns=')) errors.push(`xmlns yok: static/${f}`);
  if (!t.includes('currentColor')) errors.push(`currentColor yok: static/${f}`);
  if (/<script/i.test(t)) errors.push(`<script> yasak: static/${f}`);
}
for (const f of animated) {
  const t = readFileSync(join('animated', f), 'utf8');
  if (!t.includes('@media (prefers-reduced-motion')) errors.push(`prefers-reduced-motion yok: animated/${f}`);
  if (!t.includes('stroke-dashoffset:0 !important') && !t.includes('stroke-dashoffset: 0 !important'))
    errors.push(`reduced-motion dashoffset sıfırlaması yok: animated/${f}`);
  if (!t.includes('viewBox')) errors.push(`viewBox yok: animated/${f}`);
  if (/<script/i.test(t)) errors.push(`<script> yasak: animated/${f}`);
}

const icons = statics.map(f => f.replace('.svg', ''));
const catAll = JSON.parse(readFileSync('scripts/categories.json', 'utf8'));
const cat = Object.fromEntries(icons.map(n => [n, catAll[n] || '']));
const uncategorized = icons.filter(n => !catAll[n]);
if (uncategorized.length) { console.error('HATA: kategorisiz ikon:', uncategorized.join(', ')); process.exit(1); }
if (new Set(icons).size !== icons.length) errors.push('yinelenen ikon adı');

if (errors.length) { errors.forEach(e => console.error('HATA:', e)); process.exit(1); }
console.log(`doğrulama: ${icons.length} ikon, simetrik ✅`);

// ---------- --check modu: yalnız doğrula ----------
if (CHECK_ONLY) { console.log('--check: temiz'); process.exit(0); }

// ---------- üret ----------
const spriteParts = statics.map(f => {
  const inner = readFileSync(join('static', f), 'utf8')
    .replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
  const name = f.replace('.svg', '');
  return `  <symbol id="icon-${name}" viewBox="0 0 24 24">${inner}</symbol>`;
});
const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${spriteParts.join('\n')}\n</svg>\n`;
writeFileSync('sprite.svg', sprite, 'utf8');

const iconData = { schema: 2, count: icons.length, generated: new Date().toISOString().slice(0, 10), icons, categories: cat };
writeFileSync('icons.json', JSON.stringify(iconData, null, 2) + '\n', 'utf8');

// ---------- preview üretimi ----------
// currentColor preview'da gerçek çalışsın diye ikonlar inline <svg> olarak gömülür
// (<img> izole doküman yaratır, currentColor siyaha düşer — kurul tespiti)
const staticSvg = Object.fromEntries(statics.map(f => [f.replace('.svg', ''), readFileSync(join('static', f), 'utf8')]));
const animatedSvg = Object.fromEntries(animated.map(f => [f.replace('.svg', ''), readFileSync(join('animated', f), 'utf8')]));
const tmpl = readFileSync('scripts/preview.template.html', 'utf8');
const preview = tmpl
  .replace('__ICONS_DATA__', JSON.stringify(icons))
  .replace(/__COUNT__/g, String(icons.length))
  .replace('__SVG_STATIC__', JSON.stringify(staticSvg))
  .replace('__SVG_ANIMATED__', JSON.stringify(animatedSvg))
  .replace('__CAT_MAP__', JSON.stringify(cat));
writeFileSync('preview.html', preview, 'utf8');

// ---------- dist ----------
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/static', { recursive: true });
mkdirSync('dist/animated', { recursive: true });
for (const f of statics) copyFileSync(join('static', f), join('dist/static', f));
for (const f of animated) copyFileSync(join('animated', f), join('dist/animated', f));
for (const f of ['sprite.svg', 'icons.json', 'aliases.json', 'LICENSE', 'preview.html', 'index.html', '.nojekyll'])
  if (existsSync(f)) copyFileSync(f, join('dist', f));
writeFileSync('dist/.nojekyll', '');
console.log(`dist/ üretildi: ${icons.length} statik + ${icons.length} animated + sprite + preview`);

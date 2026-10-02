// Idempotent: her animated SVG'nin <style> bloğuna prefers-reduced-motion
// reset kuralını ekler (varsa atlar). Dash animasyonlarında ikon kaybolmasın
// diye 3'lü reset uygular (animation+dashoffset+opacity+transform).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'animated';
let injected = 0, skipped = 0;
for (const f of readdirSync(dir).filter(f => f.endsWith('.svg')).sort()) {
  const p = join(dir, f);
  let t = readFileSync(p, 'utf8');
  if (t.includes('@media (prefers-reduced-motion')) { skipped++; continue; }
  const classes = [...t.matchAll(/class="([^"]+)"/g)].flatMap(m => m[1].split(/\s+/)).filter(c => c.startsWith('fx-'));
  if (classes.length === 0) { console.error(`HATA: fx- class yok: ${f}`); process.exit(1); }
  const sel = classes.map(c => `.${c}`).join(',');
  const rule = `@media (prefers-reduced-motion: reduce){ ${sel}{ animation:none !important; stroke-dasharray:none !important; stroke-dashoffset:0 !important; opacity:1 !important; transform:none !important; transition:none !important; } }`;
  const i = t.lastIndexOf('</style>');
  if (i === -1) { console.error(`HATA: style yok: ${f}`); process.exit(1); }
  t = t.slice(0, i) + rule + '\n' + t.slice(i);
  writeFileSync(p, t, 'utf8');
  injected++;
}
console.log(`inject: ${injected} eklendi, ${skipped} atlandı (zaten var)`);

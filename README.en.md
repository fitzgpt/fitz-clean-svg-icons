# Fitz Clean SVG Icons

A clean, fast, production-ready SVG icon collection for modern interfaces.
**87 static + 87 animated** icons across 4 categories. MIT licensed, zero dependencies.

- Live showcase: **[fitzgpt.github.io/fitz-clean-svg-icons](https://fitzgpt.github.io/fitz-clean-svg-icons/)** — search, category filter, color picker, TR/EN
- TR: [README.md](README.md)

## Install

**1) Copy into your project** — [download the repo](https://github.com/fitzgpt/fitz-clean-svg-icons/archive/refs/tags/v0.2.0.zip) (ZIP) or clone it, then take the `static/` or `animated/` folder. Files are standalone, zero dependencies.

**2) CDN (no copying)** — hotlink the file directly:

```
https://cdn.jsdelivr.net/gh/fitzgpt/fitz-clean-svg-icons@v0.2.0/static/search.svg
https://cdn.jsdelivr.net/gh/fitzgpt/fitz-clean-svg-icons@v0.2.0/animated/search.svg
```

> npm publishing coming soon — once live, `npm install @fitzgpt/fitz-clean-svg-icons` is all it takes.

## Usage

```html
<img src="./static/search.svg" alt="Search" width="24" height="24" />
```

Uses `currentColor` — inherits color from its parent:

```html
<div style="color:#0f172a">
  <img src="./static/heart.svg" alt="Heart" width="24" height="24" />
</div>
```

### Sprite

```html
<svg style="display:none"><use href="./sprite.svg#icon-search"/></svg>
```

> Note: with `<img src>` the `currentColor` inheritance is lost (the SVG becomes an
> isolated document). Either use inline `<svg>` or switch to the CSS `mask-image`
> pattern — demonstrated in [preview.html](https://fitzgpt.github.io/fitz-clean-svg-icons/).

## Categories (87 icons)

| Category | Count | Examples |
|---|---|---|
| gezinti (navigation) | 29 | home, arrow-right, chevron-down, external-link, log-out, menu, map |
| eylem (actions) | 23 | search, plus, edit, trash, download, save, close, camera, refresh |
| medya (media & content) | 25 | image, film, music, play, mail, message, star, info, notification |
| e-ticaret (commerce) | 11 | shopping-cart, credit-card, wallet, tag, gift, package, receipt |

Full list: [icons.json](icons.json) (with `categories` map)

## Animated Set

- Fully CSS-based (`<style>` embedded, no SMIL)
- `pathLength="100"` draw-in loop: draw → hold → reverse (infinite)
- Every file carries `@media (prefers-reduced-motion: reduce)` — snaps to the fully
  drawn static state when motion is reduced (CI-verified)
- Animations work via `<img>`; inline `<svg>` usage leaks the embedded `<style>` into
  page CSS (may require CSP `unsafe-inline`)

## v0.2.0 Breaking Note

Filenames changed from Turkish to English (`arama.svg` → `search.svg`).
Old → new mapping: [aliases.json](aliases.json)

## Roadmap

- [x] MIT license
- [x] `prefers-reduced-motion` support (87/87)
- [x] English canonical filenames + aliases.json
- [x] npm packaging + sprite + CI validation
- [x] 87 icons + 4 categories + showcase filter + TR/EN preview (v0.2.0)
- [ ] npm registry publish
- [ ] 120 core icons (v1.0 goal)
- [ ] Figma matching file

## Development

```bash
node scripts/build.mjs           # generates icons.json + sprite + preview + dist
node scripts/build.mjs --check   # CI contract validation (parity, reduced-motion, names)
```

Rules: kebab-case + ASCII filenames · `static`/`animated` symmetry holds · every icon
has both variants · new icon categories land in `scripts/categories.json`

## License

[MIT](LICENSE)

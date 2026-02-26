# Fitz Clean SVG Icons

A clean, lightweight SVG icon pack for modern interfaces.

- TR: [README.md](README.md)
- EN: [README.en.md](README.en.md)

This repository was originally prepared for a product project. The project was canceled, so I cleaned everything up, standardized the structure, and published the icon set for open use.

## GitHub Pages

- Live preview: `https://fitzgpt.github.io/fitz-clean-svg-icons/`

> The link may return 404 for a short time until the first deployment finishes.

## Why This Repo?

- Clear folder structure
- Two versions for each icon: `static` and `animated`
- Animated set is fully CSS-based (no SMIL)
- Ready-to-use preview page with copy/download flow
- ASCII-safe download naming

## Contents

- `static/` -> 42 static icons
- `animated/` -> 42 animated icons
- `preview.html` -> showcase/demo page

Total:

- **42 static + 42 animated = 84 SVG files**

## Download via CMD

Repository URL:

- `https://github.com/fitzgpt/fitz-clean-svg-icons.git`

### 1) Clone full repository

```bash
git clone https://github.com/fitzgpt/fitz-clean-svg-icons.git
cd fitz-clean-svg-icons
```

### 2) Download only icon folders (`static` + `animated`)

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/fitzgpt/fitz-clean-svg-icons.git
cd fitz-clean-svg-icons
git sparse-checkout set static animated
```

### 3) Open preview

- Open `preview.html` in your browser.

## Project Structure

```text
.
|- animated/
|- static/
|- preview.html
|- README.md
|- README.en.md
```

## Animation Architecture

Animated icons use CSS keyframes:

- No SMIL tags (`<animate>`, `<animateTransform>`, etc.)
- Each animated SVG is self-contained with its own keyframes
- Includes `prefers-reduced-motion` support
- Predictable behavior in modern browsers

## Naming Standard

Downloaded file names are consistent and safe:

- ASCII compatible
- `kebab-case`
- Suffix: `-sabit.svg` or `-hareketli.svg`

Examples:

- `gunes-sabit.svg`
- `gonder-hareketli.svg`
- `wi-fi-sabit.svg`

## Preview Features

- Color picker
- Per-icon copy action
- Per-icon download action
- Side-by-side static/animated comparison

## Integration Example

```html
<img src="./static/arama.svg" alt="Search" width="24" height="24" />
<img src="./animated/arama.svg" alt="Search (animated)" width="24" height="24" />
```

## Good Fit For

- Landing pages and SaaS interfaces
- Mobile/web dashboards
- Fast prototyping and MVPs
- Internal tools (admin/ops interfaces)

## Contributing

PRs and issues are welcome.

Please keep:

- naming conventions consistent
- `static`/`animated` parity intact
- preview sync updated

## Social

- X: `https://x.com/FitzGPT`

## License

There is no `LICENSE` file in the repository yet.
Adding one is recommended before broader distribution.

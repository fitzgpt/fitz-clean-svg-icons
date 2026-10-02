# Fitz Clean SVG Icons

Modern arayüzler için sade, hızlı ve üretime uygun SVG ikon koleksiyonu.
**87 statik + 87 animated** ikon, 4 kategoride. MIT lisanslı, sıfır bağımlılık.

- Canlı vitrin: **[fitzgpt.github.io/fitz-clean-svg-icons](https://fitzgpt.github.io/fitz-clean-svg-icons/)** — arama, kategori filtresi, renk seçici, TR/EN
- EN: [README.en.md](README.en.md)

## Kurulum

**1) Projene kopyala** — [repoyu indir](https://github.com/fitzgpt/fitz-clean-svg-icons/archive/refs/tags/v0.2.0.zip) (ZIP) veya klonla; `static/` ya da `animated/` klasörünü projene al. Dosyalar bağımsız çalışır, bağımlılık yok.

**2) CDN (kopyalamadan kullan)** — dosyayı doğrudan linkten çek:

```
https://cdn.jsdelivr.net/gh/fitzgpt/fitz-clean-svg-icons@v0.2.0/static/search.svg
https://cdn.jsdelivr.net/gh/fitzgpt/fitz-clean-svg-icons@v0.2.0/animated/search.svg
```

> npm yayını yakında — hazır olduğunda `npm install @fitzgpt/fitz-clean-svg-icons` tek satır yeter.

## Kullanım

```html
<img src="./static/search.svg" alt="Ara" width="24" height="24" />
```

`currentColor` kullanır — rengi üst elemandan miras alır:

```html
<div style="color:#0f172a">
  <img src="./static/heart.svg" alt="Kalp" width="24" height="24" />
</div>
```

### Sprite

```html
<svg style="display:none"><use href="./sprite.svg#icon-search"/></svg>
```

> Not: `<img src>` ile kullanımda `currentColor` miras alınmaz (SVG izole doküman olur).
> Renklendirmek için ya inline `<svg>` kullan ya da CSS `mask-image` desenine geç —
> [preview.html](https://fitzgpt.github.io/fitz-clean-svg-icons/)'de örnekli.

## Kategoriler (87 ikon)

| Kategori | Adet | Örnekler |
|---|---|---|
| gezinti | 29 | home, arrow-right, chevron-down, external-link, log-out, menu, map |
| eylem | 23 | search, plus, edit, trash, download, save, close, camera, refresh |
| medya & içerik | 25 | image, film, music, play, mail, message, star, info, notification |
| e-ticaret | 11 | shopping-cart, credit-card, wallet, tag, gift, package, receipt |

Tam liste: [icons.json](icons.json) (`categories` eşlemeli)

## Animated Set

- Tamamen CSS tabanlı (`<style>` gömülü, SMIL yok)
- `pathLength="100"` draw-in döngüsü: çiz → bekle → geri sar (sonsuz)
- Her dosyada `@media (prefers-reduced-motion: reduce)` — hareket azaltma tercihinde tam çizilmiş statik haline döner (CI doğrulamalı)
- `<img>` ile kullanımda animasyonlar çalışır; inline `<svg>` kullanımında gömülü `<style>` sayfa CSS'ine karışır (CSP `unsafe-inline` gerektirebilir)

## v0.2.0 Breaking Notu

Dosya adları Türkçe'den İngilizce'ye çevrildi (`arama.svg` → `search.svg`).
Eski → yeni eşleme: [aliases.json](aliases.json)

## Yol Haritası

- [x] MIT lisans
- [x] `prefers-reduced-motion` desteği (87/87)
- [x] İngilizce kanonik dosya adları + aliases.json
- [x] npm paketleme + sprite + CI doğrulama
- [x] 87 ikon + 4 kategori + vitrin filtresi + TR/EN önizleme (v0.2.0)
- [ ] npm yayını (npmjs.com)
- [ ] 120 çekirdek ikon (v1.0 hedefi)
- [ ] Figma eşleştirme dosyası

## Geliştirme

```bash
node scripts/build.mjs           # icons.json + sprite + preview + dist üret
node scripts/build.mjs --check   # CI kontrat denetimi (simetri, reduced-motion, isimler)
```

Kurallar: dosya adları kebab-case + ASCII · `static`/`animated` simetrisi bozulmaz · her ikonun iki varyantı olur · yeni ikon kategorisi `scripts/categories.json`'a işlenir

## Lisans

[MIT](LICENSE)

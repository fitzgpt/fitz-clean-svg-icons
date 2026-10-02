# Changelog

Tüm önemli değişiklikler bu dosyada belgelenir.
Format: [Keep a Changelog](https://keepachangelog.com/tr/1.1.0/) · Sürümleme: [SemVer](https://semver.org/lang/tr/)

## [0.2.0] - 2026-10-02

### Eklendi
- 3 yeni set: **navigation** (10), **media** (12), **commerce** (9) — toplam 87 statik + 87 animated
- Draw-in animasyonları sonsuz döngüye alındı (çiz → bekle → geri sar)
- İkon kategorileri (gezinti 29, eylem 23, medya 24, e-ticaret 11) — `scripts/categories.json` + `icons.json` `categories` eşlemesi (schema 2)
- Vitrin v3: kategori filtresi + bölüm başlıkları, TR/EN dil geçişi, @fitzgpt kutusu, renk seçici + tema, kopyala + sabit/hareketli indir
- Offscreen animasyon duraklatma (IntersectionObserver) — döngülü animasyonlar için performans
- README yenilemesi (TR + EN) + yol haritası; repo temizliği (dist/ artık izlenmiyor, kök .nojekyll kaldırıldı)

### Düzeltildi
- Draft setlerdeki animated dosyalarda gömülü animasyon kuralı eksikti — eklendi (kural yokken ikonlar statik kalıyordu)
- fx-draw CSS seçicisi element-level düzeltildi — animated ikonlar artık gerçekten animasyonlu

## [0.1.0] - 2026-10-02

### Eklendi
- MIT LICENSE dosyası
- Tüm animated ikonlarda `prefers-reduced-motion` desteği (gerçeklenen: her dosyada gömülü media query)
- 14 yeni çekirdek ikon: chevron-left/right/up/down, minus, users, calendar, clock, external-link, eye-off, link, log-out, arrow-left/right → toplam 56 statik + 56 animated
- İngilizce kanonik dosya adları (breaking: eski TR adlar aliases.json'da belgelendi)
- `icons.json` manifestosu (schema:1)
- `sprite.svg` — statik ikonlar için tek dosya `<symbol>/<use>` sprite
- npm paketi (`@fitzgpt/fitz-clean-svg-icons`)
- `scripts/build.mjs` — build + doğrulama (`--check`), data-driven preview üretimi
- CI doğrulama workflow'u (`lint.yml`): simetri, reduced-motion, isim/API denetimi

### Değişti
- Dosya adları Türkçe'den İngilizce'ye çevrildi (**breaking**) — `aliases.json` eşleme tablosuna bakın
- GitHub Pages artık `dist/` yayınlıyor (kök dizin değil); eski URL'ler kırılır
- Animated ikonlar `<img>` ile kullanıldığında currentColor çalışmaz (izole doküman) — renk için CSS mask deseni preview'da örneklenir; inline kullanım için animasyonlu ikonlar kendi `<style>` bloğunu taşır (CSP `unsafe-inline` gerektirir)

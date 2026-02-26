# Fitz Clean SVG Icons

Modern arayüzler için sade, hızlı ve üretime uygun SVG ikon koleksiyonu.

- TR: [README.md](README.md)
- EN: [README.en.md](README.en.md)

Bu repo, daha önce üzerinde çalıştığım bir ürün/proje için hazırlanmıştı. Proje iptal olunca, emek çöpe gitmesin diye seti temizledim, düzenledim ve herkes kullanabilsin diye yayınladım.

## GitHub Pages

- Canlı önizleme: `https://fitzgpt.github.io/fitz-clean-svg-icons/`

> İlk deploy tamamlanana kadar link kısa süre 404 dönebilir.

## Neden Bu Repo?

- Tek bir klasörde karışık dosyalar yerine net bir yapı
- Her ikonun iki versiyonu: `sabit` ve `hareketli`
- Hareketli set tamamen CSS tabanlı (SMIL yok)
- Hızlı kopyala/indir akışı için hazır preview ekranı
- İndirme tarafında ASCII güvenli dosya adları

## İçerik

- `static/` -> 42 sabit ikon
- `animated/` -> 42 hareketli ikon
- `preview.html` -> tüm ikonları tek ekranda gösteren demo/vitrin

Toplam:

- **42 sabit + 42 hareketli = 84 SVG dosyası**

## Proje Hikayesi

Bu ikon seti başlangıçta kapalı bir ürün fikri için tasarlanmıştı. Ürün planı iptal edildi ama ortaya çıkan ikon dili güçlü ve kullanılabilirdi. Bu yüzden:

1. Set sadeleştirildi
2. Dosya yapısı temizlendi
3. Animasyonlar standartlaştırıldı
4. Kullanıma hazır şekilde açık paylaşıma alındı

Kısacası: "iptal olan bir işten, yaşayan bir kaynak".

## CMD ile İndir

Git repo linki:

- `https://github.com/fitzgpt/fitz-clean-svg-icons.git`

### 1) Tüm repoyu indir

```bash
git clone https://github.com/fitzgpt/fitz-clean-svg-icons.git
cd fitz-clean-svg-icons
```

### 2) Sadece ikon klasörlerini indir (`static` + `animated`)

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/fitzgpt/fitz-clean-svg-icons.git
cd fitz-clean-svg-icons
git sparse-checkout set static animated
```

### 3) Önizleme aç

- `preview.html` dosyasını tarayıcıda aç.

## Klasör Yapısı

```text
.
|- animated/
|- static/
|- preview.html
|- README.md
```

## Animasyon Mimarisi

Hareketli ikonlar CSS keyframes kullanır.

- SMIL etiketleri kullanılmaz (`<animate>`, `<animateTransform>` vb. yok)
- Her SVG kendi içinde gerekli `@keyframes` tanımını taşır
- `prefers-reduced-motion` desteği vardır
- Çoğu modern tarayıcıda öngörülebilir çalışır

Bu yaklaşımın avantajı:

- Daha iyi taşınabilirlik
- Daha net kontrol
- Daha stabil entegrasyon

## İsimlendirme Standardı

İndirme adları güvenli ve tutarlıdır:

- ASCII uyumlu
- `kebab-case`
- Sonek: `-sabit.svg` veya `-hareketli.svg`

Örnekler:

- `gunes-sabit.svg`
- `gonder-hareketli.svg`
- `wi-fi-sabit.svg`

## Preview Özellikleri

- Renk seçici
- Her ikon için ayrı kopyala butonu
- Her ikon için ayrı indir butonu
- Statik/hareketli karşılaştırmayı aynı kartta görme

## Entegrasyon Örneği

Basit kullanım:

```html
<img src="./static/arama.svg" alt="Arama" width="24" height="24" />
<img src="./animated/arama.svg" alt="Arama (hareketli)" width="24" height="24" />
```

Renk kontrolü (currentColor):

```html
<div style="color:#0f172a">
  <img src="./static/kalp.svg" alt="Kalp" width="24" height="24" />
</div>
```

## Kimler İçin Uygun?

- Landing page ve SaaS arayüzleri
- Mobil/web dashboard tasarımları
- Hızlı prototipleme ve MVP süreçleri
- İç araçlar (admin panel, operasyon ekranları)

## Yol Haritası

- İkon kategorileri (navigasyon, e-ticaret, medya, sistem)
- Opsiyonel sprite çıktısı
- Versiyonlu changelog
- Figma eşleştirme dokümanı

## Katkı

PR ve issue açabilirsin.

Katkı verirken rica:

- İsimlendirme standardını koru
- `static`/`animated` simetrisini bozma
- Preview senkronunu unutma

## Sosyal

- X: `https://x.com/FitzGPT`

## Lisans

Henüz repo içinde bir `LICENSE` dosyası yok.
Yayın standardı için lisans eklenmesi önerilir.

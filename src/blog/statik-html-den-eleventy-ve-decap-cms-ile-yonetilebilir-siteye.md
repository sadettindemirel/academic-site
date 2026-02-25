---
title: "Statik bir HTML sayfasını Eleventy ve Decap CMS ile yönetilebilir bir siteye dönüştürmek"
date: 2026-02-25
author: "Sadettin Demirel"
excerpt: "Akademik profil sayfamı statik HTML'den 11ty (Eleventy) tabanlı, Decap CMS ile yönetilebilir bir siteye nasıl dönüştürdüğümü adım adım anlatıyorum. Netlify üzerinde deploy, blog sistemi ve interaktif içerik desteği dahil."
thumbnail: ""
tags_display: "Web Geliştirme, 11ty, Decap CMS, Netlify"
---

Bu yazıda, statik bir HTML dosyasından oluşan akademik profil sayfamı **Eleventy (11ty)** statik site üreticisi ve **Decap CMS** ile nasıl yönetilebilir bir yapıya kavuşturduğumu adım adım paylaşıyorum. Artık herhangi bir kod yazmadan, tarayıcı üzerinden içeriklerimi güncelleyebiliyorum.

---

## Neden böyle bir dönüşüme ihtiyaç duydum?

Başlangıçta tek bir `index.html` dosyasından oluşan bir profil sayfam vardı. Her değişiklik yapmak istediğimde HTML kodunu açıp düzenleme yapmam gerekiyordu. Yeni bir yayın eklemek, biyografiyi güncellemek ya da bir yazı platformu eklemek bile doğrudan kod müdahalesi gerektiriyordu.

**Hedeflerim şunlardı:**
- Kod yazmadan içerik güncelleyebilmek
- Blog yazıları ekleyebilmek
- İnteraktif içerikler (haritalar, grafikler) gömebilmek
- Otomatik deploy ile sürekli güncel kalabilmek

---

## Adım 1: Proje Altyapısını Kurmak

İlk adımda Node.js ve npm kurulumunu yaptım. Ardından projeye 11ty'yi ekledim:

```bash
npm init -y
npm install @11ty/eleventy --save-dev
```

Ayrıca bir `.eleventy.js` konfigürasyon dosyası oluşturdum. Bu dosya 11ty'ye kaynak dosyaların `src/` klasöründe olduğunu, çıktının `_site/` klasörüne yazılacağını ve statik dosyaların (CSS, JS, görseller) doğrudan kopyalanacağını söylüyor.

**Netlify için** bir `netlify.toml` dosyası ekledim. Bu dosya Netlify'a build komutunu (`npm run build`) ve yayınlanacak klasörü (`_site`) belirtiyor.

---

## Adım 2: İçeriği Veriye Dönüştürmek

En önemli adım buydu. HTML içindeki tüm hardcoded verileri **JSON dosyalarına** taşıdım:

**`src/_data/site.json`** — Kişisel bilgiler:
- Ad, unvan, biyografi
- Eğitim geçmişi
- Sosyal medya linkleri
- Yazı platformları (Medium, NewsLabTurkey, VOYD)

**`src/_data/publications.json`** — Akademik yayınlar:
- Kategorilere ayrılmış (Uluslararası hakemli makaleler, kitap bölümleri, bildiriler vb.)
- Her yayın için başlık, yazarlar ve yayın yeri bilgisi

Bu yapının en büyük avantajı: artık veriler tek bir yerde, düzenli bir formatta tutuluyor. CMS bu dosyaları doğrudan okuyup yazabiliyor.

---

## Adım 3: HTML'den Template'e Geçiş

Statik HTML dosyasını **Nunjucks** template diline çevirdim. Örneğin, daha önce şöyle olan bir yapı:

```html
<h1>Sadettin Demirel</h1>
<h2>Dr. Öğr. Üyesi, Gazetecilik</h2>
```

Şu hale geldi:

```html
<h1>{{ "{{" }} site.name {{ "}}" }}</h1>
<h2>{{ "{{" }} site.title {{ "}}" }}</h2>
```

Yayınlar için de döngü yapısı kullandım:

```
{{ "{%" }} for category in publications.categories {{ "%}" }}
  <h3>{{ "{{" }} category.title {{ "}}" }}</h3>
  {{ "{%" }} for pub in category.items {{ "%}" }}
    <div class="pub-card">
      <h3>{{ "{{" }} pub.title {{ "}}" }}</h3>
      <p>{{ "{{" }} pub.authors {{ "}}" }}</p>
    </div>
  {{ "{%" }} endfor {{ "%}" }}
{{ "{%" }} endfor {{ "%}" }}
```

Bu sayede yeni bir yayın eklemek için sadece JSON dosyasına bir satır eklemek yeterli — template otomatik olarak güncellenmiş sayfayı üretiyor.

---

## Adım 4: Decap CMS'i Entegre Etmek

Decap CMS, Git tabanlı bir içerik yönetim sistemi. Tarayıcı üzerinden kullanıcı dostu bir arayüz sunuyor ve yaptığınız her değişikliği otomatik olarak GitHub'a commit ediyor.

İki dosya oluşturdum:

**`src/admin/index.html`** — CMS arayüzünü yükleyen sayfa (CDN üzerinden)

**`src/admin/config.yml`** — İçerik modelini tanımlayan konfigürasyon. Burada hangi alanların düzenlenebileceğini, veri tiplerini ve dosya yollarını belirtiyoruz.

CMS backend olarak **GitHub** kullandım. Bu sayede giriş yapmak için GitHub hesabımı kullanıyorum ve her değişiklik doğrudan repo'ya commit ediliyor.

---

## Adım 5: Blog Sistemi Oluşturmak

Blog altyapısı için şunları ekledim:

1. **Blog yazıları** Markdown dosyaları olarak `src/blog/` klasöründe tutuluyor
2. **Listeleme sayfası** (`/blog/`) tüm yazıları kart görünümünde sunuyor
3. **Yazı şablonu** (`post.njk`) her blog yazısını kendi sayfasında gösteriyor
4. **CMS entegrasyonu** ile admin panelinden yeni yazı oluşturulabiliyor

Blog yazılarının en önemli özelliği: **HTML desteği**. Markdown içine doğrudan iframe, script veya herhangi bir HTML kodu yazabiliyorum. Bu sayede Flourish, Datawrapper, Google Maps gibi interaktif içerikleri rahatlıkla gömmek mümkün.

---

## Adım 6: İnteraktif İçerik Desteği

İnteraktif içerik gömmek için `.eleventy.js` dosyasında markdown-it kütüphanesini `html: true` seçeneğiyle yapılandırdım. Bu sayede blog yazılarında şu tür içerikler çalışıyor:

- **Google Maps** iframe embed'leri
- **Flourish** görselleştirmeleri
- **Datawrapper** grafikleri
- **YouTube** videoları
- Herhangi bir **iframe** tabanlı içerik

Embed kodu eklerken `<div class="embed-container">` ile sarmalamak, iframe'in responsive ve şık görünmesini sağlıyor.

---

## Adım 7: Netlify'a Deploy

Deploy süreci şu adımlardan oluştu:

1. **GitHub CLI** (`gh`) ile terminalden GitHub'a giriş yaptım
2. `gh repo create academic-site --public --source=. --push` ile repo oluşturup kodu push ettim
3. Netlify'da repo'yu bağladım — build ayarları `netlify.toml` sayesinde otomatik algılandı
4. **GitHub OAuth App** oluşturarak CMS'in GitHub ile giriş yapmasını sağladım

Artık her `git push` otomatik olarak siteyi yeniden build edip yayınlıyor. CMS üzerinden yapılan değişiklikler de aynı şekilde otomatik deploy ediliyor.

---

## Adım 8: Anti-Spam Koruması

İletişim formuna üç katmanlı koruma ekledim:

1. **Honeypot alanı** — Görünmez bir form alanı, botlar otomatik dolduruyor ve FormSubmit reddediyor
2. **Matematik CAPTCHA** — Her sayfa yüklendiğinde rastgele bir toplama sorusu (ör: "7 + 3 = ?")
3. **FormSubmit CAPTCHA** — Form gönderildikten sonra ek doğrulama sayfası

---

## Sonuç ve Kazanımlar

Bu dönüşümle birlikte:

- ✅ **Kod yazmadan** biyografi, yayın, sosyal medya bilgilerimi güncelleyebiliyorum
- ✅ **Blog yazıları** oluşturup yayınlayabiliyorum
- ✅ **İnteraktif içerikler** (haritalar, grafikler) gömebiliyorum
- ✅ Her değişiklik **otomatik olarak** yayına alınıyor
- ✅ Site **hızlı ve güvenli** (statik dosyalar, sunucu tarafı yok)

Kullanılan araçlar: **Eleventy (11ty)**, **Decap CMS**, **Netlify**, **GitHub**, **Nunjucks**, **markdown-it**, **FormSubmit.co**

Bu süreçte yapay zeka destekli kodlama asistanlarından yararlandım. Özellikle HTML'den template'e dönüşüm, JSON veri yapılandırması ve CMS konfigürasyonu gibi tekrarlayan işlemlerde büyük zaman tasarrufu sağladı.

> Akademik web sayfanızı benzer bir yapıya kavuşturmak isterseniz, tüm kaynak kodu [GitHub reposu](https://github.com/sadettindemirel/academic-site) üzerinden inceleyebilirsiniz.

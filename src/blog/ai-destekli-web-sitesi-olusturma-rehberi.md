---
title: "AI Destekli Kişisel Web Sitesi Oluşturma Rehberi — Adım Adım Prompt Şablonu"
date: 2026-02-26
author: "Sadettin Demirel"
excerpt: "AI kodlama asistanlarıyla (vibecoding) kişisel bir web sitesi oluşturmak için kullanabileceğiniz adım adım prompt şablonu. Eleventy, Decap CMS ve Netlify kullanarak deploy'a kadar tüm süreç."
thumbnail: ""
tags_display: "Vibecoding, AI, Web Geliştirme, Prompt Mühendisliği"
---

Bu yazıda, bir AI kodlama asistanına (Claude, Gemini, ChatGPT vb.) adım adım vereceğiniz prompt'ları ve her adımda **sizin yapmanız gereken** işlemleri paylaşıyorum. Bu rehberi takip ederek, sıfırdan kişisel bir web sitesi oluşturabilir, blog sistemi ekleyebilir ve Netlify üzerinde yayınlayabilirsiniz.

> **Ön koşullar:** Bir bilgisayar, internet bağlantısı, GitHub hesabı ve Netlify hesabı. Kodlama bilgisine gerek yok.

---

## ADIM 1 — Temel Siteyi Tasarla

Aşağıdaki prompt'u AI asistanınıza gönderin. **Köşeli parantez içindeki yerleri kendi bilgilerinizle doldurun:**

```
Bana kişisel bir akademik/profesyonel profil web sayfası oluştur.

Sayfamda şu bölümler olsun:
- Hero (karşılama) bölümü: ismim, unvanım, kısa biyografim ve profil fotoğrafım
- Hakkımda bölümü: detaylı biyografi
- Özgeçmiş bölümü: eğitim geçmişim (timeline formatında)
- [Opsiyonel: Yayınlarım bölümü — akademik yayınlarım kategorili şekilde]
- [Opsiyonel: Yazılarım bölümü — blog/Medium/diğer platformlardaki yazılarıma linkler]
- İletişim bölümü: iletişim formu
- Sabit üst menü (navigasyon)

Tasarım tercihleri:
- Modern, minimal ve profesyonel tasarım
- Açık renkli tema
- Google Fonts kullan (Inter + Playfair Display)
- Font Awesome ikonları
- Responsive (mobilde de güzel görünsün)
- Hover animasyonları olsun

Kişisel bilgilerim:
- İsim: [ADI SOYADI]
- Unvan: [UNVAN, ÖRN: Dr. Öğr. Üyesi, Bilgisayar Mühendisliği]
- E-posta: [E-POSTA ADRESİ]
- Biyografi: [2-3 PARAGRAF BİYOGRAFİ METNİ]
- Eğitim:
  - [YIL] — [DERECE], [KURUM]
  - [YIL] — [DERECE], [KURUM]
- Sosyal medya:
  - LinkedIn: [URL]
  - Twitter/X: [URL]
  - GitHub: [URL]
  - [DİĞER PLATFORMLAR]

Teknoloji olarak HTML, CSS ve JavaScript kullan.
Sayfayı tek bir index.html dosyası, bir style.css ve bir script.js olarak oluştur.
```

> 💡 **İpucu:** Profil fotoğrafınızı (`profile.jpeg`) proje klasörüne koyun. AI'ya fotoğrafın dosya adını belirtin.

---

## ADIM 2 — Sayfayı Kontrol Et ve Düzenle

AI size dosyaları oluşturduktan sonra sayfayı tarayıcıda açın ve kontrol edin. Beğenmediğiniz kısımlar için düzeltme prompt'ları gönderin:

```
Şu değişiklikleri yap:
- [ÖRN: Profil fotoğrafı daha büyük olsun]
- [ÖRN: Navigasyondaki "CV" yazısını "Özgeçmiş" olarak değiştir]
- [ÖRN: Yazılarım bölümünde kartlar şeklinde 3 ayrı platform linki olsun]
- [ÖRN: İletişim formuna anti-spam koruması (matematik CAPTCHA) ekle]
```

Bu adımı istediğiniz kadar tekrarlayabilirsiniz. Sayfa tam istediğiniz gibi olana kadar düzeltme isteyin.

---

## ADIM 3 — 11ty + Decap CMS'e Dönüştür

Statik sayfa hazır olduğunda, aşağıdaki prompt ile onu yönetilebilir bir yapıya dönüştürün:

```
Bu statik HTML sayfasını Eleventy (11ty) statik site üreticisine dönüştür ve
Decap CMS ekle. Şunları yap:

1. Proje altyapısı:
   - package.json oluştur (11ty bağımlılığı)
   - .eleventy.js konfigürasyonu
   - netlify.toml (Netlify build ayarları)
   - .gitignore

2. İçeriği veri dosyalarına taşı:
   - src/_data/site.json — kişisel bilgiler, biyografi, eğitim, sosyal linkler
   - [Eğer yayınlar varsa: src/_data/publications.json]

3. HTML'i Nunjucks template'ine çevir:
   - src/index.njk — tüm veriler JSON'dan dinamik olarak gelsin

4. Statik dosyaları src/ altına taşı:
   - style.css, script.js, profile.jpeg

5. Decap CMS admin panelini kur:
   - src/admin/index.html (CDN'den CMS yükle)
   - src/admin/config.yml (GitHub backend, tüm düzenlenebilir alanları tanımla)

CMS backend olarak GitHub kullan (git-gateway değil).
```

---

## ADIM 4 — Blog Sistemi Ekle

Blog özelliği istiyorsanız şu prompt'u gönderin:

```
Siteye bir blog sistemi ekle:

1. Blog altyapısı:
   - Blog yazıları Markdown dosyaları olarak src/blog/ klasöründe olsun
   - Her yazının kendi sayfası olsun (ör: /blog/yazi-basligi/)
   - Blog listeleme sayfası (/blog/) — kartlar halinde tüm yazılar
   - Blog yazı şablonu (post.njk) — başlık, tarih, yazar, içerik göstersin

2. Navigasyona "Blog" menü linki ekle

3. Decap CMS config'ine blog koleksiyonu ekle:
   - Başlık, tarih, yazar, özet, kapak görseli, etiketler, markdown içerik alanları

4. Markdown içinde HTML desteği olsun (iframe, embed kodları çalışsın)
   — markdown-it kütüphanesini html: true ile yapılandır

5. Blog CSS stilleri ekle (kartlar, yazı sayfası, embed container, responsive)
```

---

## ADIM 5 — Projeyi Build Et ve Test Et

```
Projeyi build et ve yerel sunucuda çalıştır.
Hataları düzelt. Tüm sayfaların doğru çalıştığını kontrol et:
- Ana sayfa
- Blog listesi
- Blog yazı sayfası
- Admin paneli (/admin/)
```

> **⚠️ SİZİN YAPMANIZ GEREKEN:** Bilgisayarınızda Node.js kurulu olmalı. Kurulu değilse AI'ya `brew install node` (Mac) veya `winget install OpenJS.NodeJS.LTS` (Windows) komutunu çalıştırmasını söyleyin.

---

## ADIM 6 — GitHub'a Yükleme

```
GitHub CLI (gh) yükle ve GitHub hesabıma giriş yap.
Sonra bu projeyi GitHub'da yeni bir repo olarak oluştur ve push et.
Repo adı: [REPO-ADI, ÖRN: my-website]
```

> **⚠️ SİZİN YAPMANIZ GEREKEN:**
>
> 1. AI `gh auth login` komutunu çalıştırdığında terminal size bir link ve kod gösterecek
> 2. **Tarayıcınızda o linke gidin**
> 3. **Kodu girin ve GitHub hesabınızla yetkilendirin**
> 4. Terminale dönün — giriş tamamlanmış olacak

---

## ADIM 7 — Netlify'a Deploy Etme

```
Netlify'a deploy için gerekli adımları söyle.
```

> **⚠️ SİZİN YAPMANIZ GEREKEN (tarayıcıda):**
>
> 1. **[app.netlify.com](https://app.netlify.com)** adresine gidin ve giriş yapın
> 2. **"Add new site"** → **"Import an existing project"** tıklayın
> 3. **"Deploy with GitHub"** seçin
> 4. Repo'nuzu bulup seçin (ör: `my-website`)
> 5. Build ayarları otomatik algılanacak — **"Deploy site"** tıklayın
> 6. Birkaç dakika bekleyin — siteniz `[RASTGELE-İSİM].netlify.app` adresinde yayında!

---

## ADIM 8 — CMS İçin GitHub OAuth Kurulumu

CMS panelinin çalışması için GitHub OAuth App oluşturmanız gerekiyor.

> **⚠️ SİZİN YAPMANIZ GEREKEN (tarayıcıda):**
>
> **A. GitHub'da OAuth App Oluşturun:**
> 1. **[github.com/settings/developers](https://github.com/settings/developers)** adresine gidin
> 2. **"OAuth Apps"** → **"New OAuth App"** tıklayın
> 3. Formu doldurun:
>    - **Application name:** `Web Sitem CMS`
>    - **Homepage URL:** `https://[SİTE-ADINIZ].netlify.app`
>    - **Authorization callback URL:** `https://api.netlify.com/auth/done`
> 4. **"Register application"** tıklayın
> 5. **Client ID**'yi kopyalayın
> 6. **"Generate a new client secret"** tıklayın → **Secret**'ı kopyalayın
>
> **B. Netlify'da OAuth'u Ekleyin:**
> 1. Netlify dashboard → sitenize gidin
> 2. **"Site configuration"** (sol menü) → **"Access & security"** veya **"Access control"** bölümünü bulun
> 3. **"OAuth"** → **"Install provider"** → **"GitHub"** seçin
> 4. **Client ID** ve **Client Secret** değerlerini yapıştırın → Kaydedin
>
> **C. Test Edin:**
> 1. `[SİTE-ADINIZ].netlify.app/admin/` adresine gidin
> 2. **"Login with GitHub"** tıklayın
> 3. CMS paneli açılacak — içeriklerinizi düzenleyebilirsiniz! 🎉

---

## ADIM 9 — İnteraktif İçerik Ekleme (Opsiyonel)

Blog yazılarına interaktif içerik gömmek isterseniz:

```
Blog yazılarımda şu tür interaktif içerikler gömmek istiyorum:
- Flourish görselleştirmeleri
- Google Maps haritaları
- Datawrapper grafikleri
- YouTube videoları

Markdown içinde HTML embed kodlarının çalışmasını sağla.
Embed'ler responsive olsun ve güzel görünsün.
```

> **⚠️ SİZİN YAPMANIZ GEREKEN:** CMS panelinden blog yazısı oluştururken embed kodunu doğrudan markdown editörüne yapıştırın. Backtick (`` ` ``) veya kod bloğu **kullanmayın**. İsterseniz şu şekilde sarın:
> ```html
> <div class="embed-container">
>   <iframe src="EMBED_URL" width="100%" height="600"></iframe>
> </div>
> ```

---

## ADIM 10 — Özel Alan Adı Bağlama (Opsiyonel)

Kendi alan adınızı (ör: `www.adiniz.com`) bağlamak isterseniz:

```
Netlify'da özel alan adı nasıl bağlanır açıkla.
```

> **⚠️ SİZİN YAPMANIZ GEREKEN:**
> 1. Bir alan adı satın alın (Namecheap, GoDaddy, Google Domains vb.)
> 2. Netlify dashboard → **"Domain management"** → **"Add custom domain"**
> 3. Alan adınızı girin
> 4. Alan adı sağlayıcınızda DNS ayarlarını Netlify'ın gösterdiği şekilde güncelleyin
> 5. **HTTPS** otomatik etkinleşecektir (Let's Encrypt)

---

## Özet Akış Şeması

| Adım | Ne Yapılıyor | Kim Yapıyor |
|:----:|:------------|:----------:|
| 1 | Temel site tasarımı | 🤖 AI |
| 2 | Kontrol ve düzeltmeler | 🤖 AI + 👤 Siz |
| 3 | 11ty + CMS dönüşümü | 🤖 AI |
| 4 | Blog sistemi | 🤖 AI |
| 5 | Build ve test | 🤖 AI |
| 6 | GitHub'a yükleme | 🤖 AI + **👤 GitHub yetkilendirme** |
| 7 | Netlify deploy | **👤 Tarayıcıda yapılır** |
| 8 | OAuth kurulumu | **👤 Tarayıcıda yapılır** |
| 9 | İnteraktif içerikler | 🤖 AI + 👤 Siz |
| 10 | Özel alan adı | **👤 Tarayıcıda yapılır** |

---

> 💡 **Not:** Bu rehber AI kodlama asistanlarıyla (vibecoding) web sitesi oluşturma sürecini standartlaştırmak için hazırlanmıştır. Her adımdaki prompt'ları kendi ihtiyaçlarınıza göre özelleştirebilirsiniz. Prompt'larda ne kadar detay verirseniz, AI'dan o kadar iyi sonuç alırsınız.

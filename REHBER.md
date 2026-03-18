# Kişisel Akademik Web Sitesi Oluşturma Rehberi

> Lisans öğrencileri için adım adım, AI destekli vibecoding kılavuzu.

---

## 🧰 Başlamadan Önce: Neye İhtiyacın Var?

| Araç | Neden? | Ücretsiz mi? |
|------|--------|-------------|
| [GitHub](https://github.com) hesabı | Kodlarını saklamak ve version control | ✅ |
| [Netlify](https://netlify.com) hesabı | Siteyi internete yayınlamak | ✅ |
| [Antigravity / Claude / Gemini vb.](https://antigravity.ai) | Kod yazan AI asistanın | ✅ (limitli) |
| [Node.js](https://nodejs.org) | Bilgisayarında siteyi test etmek için | ✅ |

---

## 📋 Kısaca Ne Yapacaksın?

```
1. Bilgisayarına Node.js kur
2. GitHub hesabı aç
3. AI asistana prompt ver → kod oluşturulur
4. GitHub'a yükle
5. Netlify'a bağla → siteniz internette!
6. (Opsiyonel) Decap CMS → kodlamadan içerik güncelle
```

---

## 🚀 ADIM 1 — Node.js Kur

Node.js, siteyi bilgisayarında test etmeni sağlar.

- **Mac:** [nodejs.org](https://nodejs.org) → "LTS" sürümü indir ve kur  
- **Windows:** [nodejs.org](https://nodejs.org) → "LTS" sürümü indir ve kur

Kurulumu doğrulamak için Terminal / Komut İstemi'ni aç ve yaz:
```bash
node --version
npm --version
```
Versiyon numaraları görüyorsan kurulum başarılı. ✅

---

## 🤖 ADIM 2 — AI Asistana İlk Promptu Ver

Aşağıdaki prompt şablonunu kendi bilgilerinle doldurarak AI asistana gönder.  
**Köşeli parantez `[...]` içindeki kısımları** kendi bilgilerinle değiştir:

```
Bana kişisel bir akademik profil web sayfası oluştur.

Teknoloji:
- Eleventy (11ty) statik site üreticisi kullan
- Tüm içerikler src/_data/site.json ve src/_data/publications.json
  dosyalarından gelsin (template engine: Nunjucks)
- Decap CMS ekle (src/admin/ klasörü, GitHub backend)
- netlify.toml ile Netlify deploy ayarı ekle
- markdown-it kütüphanesi html:true ayarıyla yapılandır (blog embed'leri için)

Özellikler:
- Blog sistemi: src/blog/ klasöründe markdown dosyaları
- Yayınlar sayfası: /publications/ (DOI linkli, kategorili)
- Gece/Gündüz modu toggle (localStorage'da hatırlansın)
- TR/EN dil geçişi (data-tr / data-en attribute sistemi, Blog hariç)
- Anti-spam: honeypot + matematik CAPTCHA (iletişim formunda)
- Responsive tasarım (Google Fonts: Inter + Playfair Display)
- Font Awesome ikonları (sosyal medya + akademik profiller)

Sayfalar:
- / → Ana sayfa (Hakkımda, Özgeçmiş/Kariyer, İletişim)
- /publications/ → Yayınlar (ayrı sayfa, DOI linkleri)
- /blog/ → Blog listesi + Yazılarım bölümü (yatay çizgiyle ayrı)
- /blog/[slug]/ → Blog yazısı sayfası
- /admin/ → Decap CMS paneli

Navigasyon menüsü:
Hakkımda | Özgeçmiş | Yayınlarım | Blog | İletişim

Kişisel bilgilerim:
- İsim: [ADI SOYADI]
- Unvan: [ÖRNEK: Dr. Öğr. Üyesi, Gazetecilik Bölümü]
- Kurum: [ÜNİVERSİTE ADI]
- E-posta: [E-POSTA]
- Biyografi (TR): [2-3 PARAGRAF]
- Biyografi (EN): [2-3 PARAGRAF İNGİLİZCE]

Eğitim:
- [YIL-YIL] — [DERECE], [KURUM] / [DEGREE EN], [INSTITUTION EN]
(Birden fazla varsa listeye ekle)

Kariyer:
- [YIL-YIL] — [POZİSYON], [KURUM] / [POSITION EN], [INSTITUTION EN]

Sosyal medya linkleri:
- E-posta: [EMAIL]
- X/Twitter: [URL]
- LinkedIn: [URL]
- ResearchGate: [URL]
- Google Scholar: [URL]
- ORCID: [URL]
- Web of Science: [URL]

Tasarım:
- Modern, minimal ve profesyonel
- CSS değişkenleri ile açık + koyu tema
- Hover animasyonları, kart tasarımı
- Profil fotoğrafı: profile.jpeg (src/ klasöründe)
```

---

## 💾 ADIM 3 — GitHub'a Yükle

AI kod dosyaları oluşturduktan sonra bunları GitHub'a yüklememiz gerekiyor.

### 3a. GitHub CLI Kur

- **Mac:** Terminale yaz → `brew install gh`  
- **Windows:** [cli.github.com](https://cli.github.com) → indir ve kur  

### 3b. GitHub'a Giriş Yap

```bash
gh auth login
```

Ekrandaki talimatları izle: tarayıcı açılacak → GitHub hesabınla giriş yap → onayla.

### 3c. Repo Oluştur ve Yükle

AI asistana şunu söyle ya da kendin terminalde çalıştır:

```bash
gh repo create academic-site --public --source=. --push
```

Bu komut:
- `academic-site` adında bir GitHub reposu oluşturur
- Mevcut tüm dosyaları GitHub'a yükler

> 🔗 Repo adresi: `https://github.com/KULLANICI_ADIN/academic-site`

---

## 🌐 ADIM 4 — Netlify'a Deploy Et

**Tarayıcıda yapılır — terminale gerek yok!**

1. **[app.netlify.com](https://app.netlify.com)** adresine git ve hesap aç (GitHub ile giriş yapabilirsin)
2. **"Add new site"** → **"Import an existing project"** tıkla
3. **"Deploy with GitHub"** seç
4. Listeden `academic-site` reposunu bul ve seç
5. Ayarlar otomatik algılanacak (`netlify.toml` dosyası sayesinde):
   - Build command: `npm run build`
   - Publish directory: `_site`
6. **"Deploy site"** tıkla

Birkaç dakika içinde siteniz `[rastgele-isim].netlify.app` adresinde yayında! 🎉

> 💡 İstersen ücretsiz alan adını `site-settings → Domain management` kısmından özelleştir (ör: `sadettindemirel.netlify.app`)

---

## 🔧 ADIM 5 — Decap CMS Kurulumu (İçeriği Kodlamadan Güncelleme)

Decap CMS ile blog yazısı ekleyebilir, biyografinizi güncelleyebilir, yayın ekleyebilirsin — kod yazmana gerek yok.

### 5a. GitHub OAuth App Oluştur

1. **[github.com/settings/developers](https://github.com/settings/developers)** git
2. **"OAuth Apps"** → **"New OAuth App"** tıkla
3. Formu doldur:
   - **Application name:** `Academic Site CMS`
   - **Homepage URL:** `https://SENİN-SITEN.netlify.app`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
4. **"Register application"** tıkla
5. **Client ID**'yi kopyala
6. **"Generate a new client secret"** tıkla → **Secret**'ı kopyala (bir kez gösterilir, kaydet!)

### 5b. Netlify'da OAuth Ayarı Yap

1. Netlify dashboard'unda → sitenin ayarlarına git
2. Sol menüde **"Site configuration"** → **"Access & security"**
3. **"OAuth"** bölümü → **"Install provider"** → **"GitHub"** seç
4. Client ID ve Secret'ı yapıştır → Kaydet

### 5c. CMS'e Giriş Yap

Tarayıcıda aç: `https://SENİN-SITEN.netlify.app/admin/`

**"Login with GitHub"** tıkla → CMS paneli açılacak! ✅

---

## ✍️ Decap CMS ile Blog Yazısı Yazma

1. `/admin/` sayfasına git
2. **"Blog Yazıları"** → **"New Blog Yazıları"** tıkla
3. Başlık, tarih, özet, içerik gir
4. **Embed kod eklemek için** (Flourish, Google Maps, vb.):
   - Embed kodunu doğrudan metin editörüne yapıştır
   - ⚠️ Backtick (`` ` ``) veya kod bloğu içine alma!
   - İsteğe bağlı: `<div class="embed-container">` ile sar
5. **"Publish"** tıkla → GitHub'a otomatik commit → Netlify otomatik deploy 🚀

---

## 🎨 Sonraki Adımlar (İsteğe Bağlı)

### Özel Alan Adı Bağlama

Kendi `.com` veya `.net` alan adını bağlamak istersen:
1. Alan adı satın al: [Namecheap](https://namecheap.com), [Porkbun](https://porkbun.com) (ucuz ve iyi)
2. Netlify → **"Domain management"** → **"Add custom domain"**
3. DNS ayarlarını Netlify'ın gösterdiği şekilde güncelle
4. HTTPS otomatik olarak etkinleşir (Let's Encrypt)

### Profil Foto Güncelleme

`profile.jpeg` dosyasını projeye kopyala, terminal veya CMS'den güncelle.

### Git Ayarları (İsteğe Bağlı)

Terminal'de bir kez çalıştır (tüm commit'ler senin adına görünsün):
```bash
git config --global user.name "Adın Soyadın"
git config --global user.email "email@example.com"
```

---

## ❓ Sık Karşılaşılan Sorunlar

| Sorun | Çözüm |
|-------|-------|
| Build hatası alıyorum | `npm run build` komutunu çalıştır, hata mesajını AI'ya göster |
| CMS'e giremiyorum | OAuth App ayarlarında Callback URL'i kontrol et |
| Embed kodları görünmüyor | Backtick içine almadığından emin ol |
| Push rejected hatası | `git pull --rebase origin main && git push` çalıştır |
| Site güncellenmiyor | Netlify dashboard'unda deploy logunu kontrol et |

---

## 📚 Faydalı Kaynaklar

- [Eleventy Dokümantasyonu](https://www.11ty.dev/docs/)
- [Decap CMS Dokümantasyonu](https://decapcms.org/docs/)
- [Netlify Başlangıç Kılavuzu](https://docs.netlify.com/get-started/)
- [GitHub CLI Kılavuzu](https://cli.github.com/manual/)
- [Font Awesome İkon Listesi](https://fontawesome.com/icons)
- [Flourish](https://flourish.studio) — grafik ve harita embed'leri için
- [Datawrapper](https://www.datawrapper.de) — grafik embed'leri için

---

*Bu rehber, Antigravity AI yardımıyla oluşturulan bir akademik profil web sitesinin yapım sürecine dayanmaktadır.*

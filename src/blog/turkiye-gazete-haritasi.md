---
title: Türkiye'de Yerel — Bölgesel — Yaygın Gazetelerin ve Haber Sitelerinin
  Haritasını Çıkarmak
date: 2025-10-20
author: Sadettin Demirel
excerpt: Ülkemizde kaç tane gazete ve internet haber sitesi var? Bunların kaç
  tanesi yerel, bölgesel ve yaygın düzeyde habercilik yapıyor? Bu yazıda bu
  sorulara cevap veriyor ve haritasını çıkarıyorum.
thumbnail: https://miro.medium.com/v2/resize:fit:4800/format:webp/1*uFDQuuSH1AfyrTSnt2OFxg.png
tags_display: Veri Gazeteciliği, Veri Görselleştirme
---

Ülkemizde kaç tane gazete ve internet haber sitesi var? Bunların kaç tanesi yerel, bölgesel ve yaygın düzeyde habercilik yapıyor? Ve bu haber kuruluşları hangi illerde yoğunluk gösteriyor? Bu yazıda bu sorulara cevap veriyorum ve bu kuruluşların haritasını çıkarıyorum.

Yukarıdaki soruları sorarak çıktığım yolda, iki ayrı resmi kaynak gördüm. İlki Türkiye İstatistik Kurumu'nun her yıl yayınladığı [süreli yayın ve yazılı medya istatistikleri](https://data.tuik.gov.tr/Bulten/Index?p=Sureli-Yayin-Istatistikleri-2023-53810). Bu veriler Türkiye genelindeki sayıların toparlanmış hali. Daha mikro düzeyde verileri ise [Basın İlan Kurumu (BİK) her ay PDF olarak yayınlamakta](https://ilanbis.bik.gov.tr/Uygulamalar/AylikListe). Yayınlanan verilerin PDF formatında olması, verilere erişimi kısıtlıyor.

Bu yazıda **Tabula**, **Google Tablolar** ve **Google Haritalarım** araçlarıyla PDF'ten veri kazıma, düzenleme ve görselleştirme aşamalarını anlatacağım.

---

## TABULA — Elektronik PDF'lerdeki Veri Avcısı

Tabula yazılımına dair çok şey söylemeye gerek yok. Zamanında NewslabTurkey ve Veri Okuryazarlığı Derneği işbirliğiyle temel veri gazeteciliği eğitimlerindeki [videolardan birinde](https://www.youtube.com/watch?v=-MTIfvi3Gyo) Pınar Dağ Firth hocam detaylıca anlatıyor.

Peki hangi PDF'i kazıyacağız? Basın İlan Kurumu'nun web sayfasında her ay düzenli olarak paylaştığı resmi ilan ve reklam yayımıyla alakalı süreli yayınlar içeren PDF dosyasını kazıyacağız.

Şimdilik sadece gazeteleri ve gazetelerden yayın türü olarak yaygın olanları seçtim. BİK aynı zamanda yerel ve bölgesel gibi kategorilerde de veriler sunmakta. BİK, veri tablosundaki değişkenleri sunuyor. Bu veri tablosunda haritalama için işimizi kolaylaştıracak veri sütunu ise **yönetim adresi**.

Bu PDF dosyasının Tabula'ya yüklenip, veri tabloları kazındığında, uygulama CSV (Comma Separated Value) formatında veriler sağlıyor. Bu aşamayı hem yerel hem de bölgesel gazeteler için tekrarlamamız gerekiyor. Böylelikle BİK sayfasında yerel, bölgesel ve yaygın gazetelere dair tüm verileri elde etmiş oluyoruz.

> 📥 İndirmiş olduğum tüm PDF dosyalarını [şuraya yükledim](https://drive.google.com/drive/folders/1c7M-jiGuRHLVWVMA5IO3nu4meHtQWmFE?usp=sharing). Ekim 2025 itibariyle yerel, bölgesel, yaygın gazeteler ve internet haber sitelerine dair bilgileri içeriyorlar.

---

## En Meşakkatli Aşama: Google Tablolar ile Veri Temizleme

Bu aşamada Tabula'dan aldığımız CSV dosyasını Google Tablolar'a aktararak düzenliyoruz. Veride kaymalar meydana gelmiş veya verideki değişken başlıklar tekrar etmiş olabilir. Filtreleme, sıralama veya Google Tablolar'ın sunduğu veri temizleme önerileri genellikle yeterlidir.

Bu aşamada en çok uğraştıran yerel gazete ve internet haber sitesi verisi çünkü veri boyutu diğerlerinden daha fazla. Nitekim, **BİK verilerine göre 508 yerel gazete, 361 internet haber sitesi** mevcut.

Bu aşama en meşakkatlisi! Bundan sonra 3 ayrı veri dosyası oluşturdum:
1. Yaygın ve bölgesel gazeteler
2. Yerel gazeteler
3. İnternet haber siteleri

---

## Google Haritalarım ile Görselleştirme

Google Haritalarım aracının en iyi özelliği adres verisini kullanabilmesi — haritalandırmak için lokasyon (enlem, boylam vb.) verilerine ihtiyaç olmamasıdır. [Bu linkten](https://www.google.com/maps/d/u/0/) başlayabilirsiniz.

### Adım 1: Verileri İçeri Aktarma
Halihazırda elimizde 3 ayrı veri seti var. Yaygın Gazeteleri içeren veri setini "Adsız katman" kısmındaki İçeri Aktar butonu ile seçerek işe başlayabiliriz. Verinizi seçtiğinizde ilk olarak lokasyon verisi olarak **Yönetim Adresini**, ikinci olarak ise sembolleri temsil edecek **Süreli Yayın Adını** seçmeniz gerekiyor.

### Adım 2: Verileri Düzenleme ve Katman Ekleme
Verileri aktardıktan sonra aktarılan verilerde hata varsa düzeltmeliyiz. Genelde adres verilerinde virgül veya tire işaretinden dolayı Google, ilgili lokasyonu haritada bulamayabiliyor. Daha sonrasında elimizdeki diğer verileri içeri aktarmak için katman eklemeliyiz.

### Adım 3: Haritada Düzenlemeler Yapma
Tüm veriler eklendiğinde her katman için sembol, sembol rengi seçilebilir. Aynı zamanda Temel Harita kısmında haritamızın temasını da değiştirebiliriz.

---

## İnteraktif Harita

Aşağıdaki interaktif haritada Türkiye'deki gazetelerin ve internet haber sitelerinin konumlarını inceleyebilirsiniz:

<div class="embed-container">
<iframe src="https://www.google.com/maps/d/u/0/embed?mid=19APCzPbTZK3y-ljYpHFQE_UBnabSmxI&ehbc=2E312F" width="100%" height="600" style="border:0; border-radius: 12px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>

---

## Sonuç

Bu yazıyı hem bu araçları tanıtmak hem de Üsküdar Üniversitesi İletişim Fakültesi öğrencilerine verdiğim derslerde rehberlik etmesi adına oluşturdum. Muhtemelen alanda çalışan akademisyen ve araştırmacılar için de faydalı olacağını öngörüyorum. Çünkü lokasyonların yanı sıra gazetelerin iletişim bilgileri de bulunmakta.

Bundan sonraki aşama öğrencilerimle bu haritayı daha da zenginleştirmek ve Basın İlan Kurumu dışında da var olan gazete ve internet haber sitelerini bu haritaya eklemek olacak.

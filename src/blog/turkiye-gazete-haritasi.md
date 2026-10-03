---
title: "Türkiye’de Yerel — Bölgesel — Yaygın Gazetelerin ve Haber Sitelerinin Haritasını Çıkarmak"
date: 2025-10-20
author: Sadettin Demirel
excerpt: "Ülkemizde kaç tane gazete ve internet haber sitesi var? Bunların kaç tanesi yerel, bölgesel ve yaygın düzeyde habercilik yapıyor? Ve bu haber kuruluşları hangi illerde yoğunluk gösteriyor? Bu yazıda bu sorulara cevap…"
thumbnail: https://cdn-images-1.medium.com/max/1024/1*uFDQuuSH1AfyrTSnt2OFxg.png
tags_display: "Veri Görselleştirme, Gazetecilik, Veri Kazıma, Data Visualization"
original_url: https://medium.com/verijurnali/t%C3%BCrkiyede-yerel-b%C3%B6lgesel-yayg%C4%B1n-gazetelerin-ve-haber-sitelerinin-haritas%C4%B1n%C4%B1-%C3%A7%C4%B1karmak-a215ce67f5cd
original_source: Medium
---
Ülkemizde kaç tane gazete ve internet haber sitesi var? Bunların kaç tanesi yerel, bölgesel ve yaygın düzeyde habercilik yapıyor? Ve bu haber kuruluşları hangi illerde yoğunluk gösteriyor? Bu yazıda bu sorulara cevap veriyorum ve bu kuruluşların haritasını çıkarıyorum.

Yukarıdaki soruları sorarak çıktığım yolda, iki ayrı resmi kaynak gördüm. İlki Türkiye İstatistik Kurumu’nun her yıl yayınladığı [süreli yayın ve yazılı medya istatistikleri](https://data.tuik.gov.tr/Bulten/Index?p=Sureli-Yayin-Istatistikleri-2023-53810). Bu veriler Türkiye’ genelindeki sayıların toparlanmış hali. Daha mikro düzeyde verileri ise [Basın İlan Kurumu (BİK) her ay PDF olarak yayınlamakta](https://ilanbis.bik.gov.tr/Uygulamalar/AylikListe). Yayınlanan verilerin PDF formatında olması, verilere erişimi kısıtlıyor. Bu yazıda Tabula, Google Tablolar ve Google Haritalarım araçlarıyla PDF’ten veri kazıma, düzenleme ve görselleştirme aşamalarını anlatacağım.

## TABULA — Elektronik PDF’lerdeki Veri Avcısı

Tabula yazılımına dair çok şey söylemeye gerek yok. Zamanında NewslabTurkey ve Veri Okuryazarlığı derneği işbirliğiyle temel veri gazeteciliği eğitimlerindeki [videolardan birinde](https://www.youtube.com/watch?v=-MTIfvi3Gyo) [Pınar Dağ Firth](https://medium.com/u/34acdfe33d43) hocam detaylıca anlatıyor. Ayrıca diğer video tabanlı derslere de [Veri Okuryazarlığı Derneği](https://medium.com/u/8c76bf04bdb6) [web sayfasından](https://voyd.org.tr/egitimler/) ve NewslabTurkey YouTube hesaplarından ulaşabilirsiniz.

<div class="embed-container"><iframe src="https://www.youtube.com/embed/-MTIfvi3Gyo?feature=oembed" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

Peki hangi PDF’i kazıyacağız? Basın İlan Kurumu’nun web sayfasında her ay düzenli olarak paylaştığı resmi ilan ve reklam yayımıyla alakalı süreli yayınlar içeren PDF dosyasını kazıyacağız. Aşağıdaki görseldeki gibi gazeteleri veya internet haber sitelerini seçilebiliyoruz. Bu aşamada adım adım gitmekte fayda var.

![](https://cdn-images-1.medium.com/max/1024/1*42P459NuvMycxuj9umK0eA.png)

Şimdilik sadece gazeteleri ve gazetelerden yayın türü olarak **yaygın** olanları seçtim. BİK aynı zamanda yerel ve bölgesel gibi kategorilerde de veriler sunmakta. Elde ettiğim PDF dosyası aşağıda yer alıyor. BİK, aşağıdaki veri tablosundaki değişkenleri sunuyor. Bu veri tablosunda haritalama için işimizi kolaylaştıracak veri sütunu ise *yönetim adresi*.

![](https://cdn-images-1.medium.com/max/1024/1*jFkwhXz_zo0qAMBvSyhwAA.png)

Bu PDF dosyasının [üstteki videoda gösterildiği gibi](https://www.youtube.com/watch?v=-MTIfvi3Gyo) Tabula’ya yüklenip, veri tabloları kazındığında, uygulama CSV (Coma Separated Value) formatında veriler sağlıyor. Bu aşamayı hem yerel hem de bölgesel gazeteler için tekrarlamamız gerekiyor. Böylelikle BİK sayfasında yerel, bölgesel ve yaygın gazetelere dair tüm verileri elde etmiş oluyoruz. Ayrıca benzer bir adımı internet haber siteleri üzerinde de gerçekleştirebiliriz. Böylelikle aşağıdaki gibi Türkiye’de BİK nezdinde yayında olan internet haberciliği yapan kuruluşları görebiliriz.

![](https://cdn-images-1.medium.com/max/1024/1*48P6LObgPyafYozk-fMung.png)

Bu arada indirmiş olduğum tüm PDF dosyalarını da [şuraya yükledim](https://drive.google.com/drive/folders/1c7M-jiGuRHLVWVMA5IO3nu4meHtQWmFE?usp=sharing). Ekim 2025 itibariyle yerel, bölgesel, yaygın gazeteler ve internet haber sitelerine dair bilgileri içeriyorlar. Peki, Tabula ile kazıdık, elimizde 4 ayrı CSV dosyası var. O zaman istikamet -videoda olduğu gibi - Google Tablolar dosyası açıp CSV’yi içeri aktarmak.

![](https://cdn-images-1.medium.com/max/1024/1*pt_MTkyXzJoWN_0FiCDmkg.png)

### En meşakkatli aşama Google Tablolar ile veri temizleme

Bu aşamada Tabula’dan aldığımız CSV dosyasını Google Tablolar’a aktararak düzenliyoruz. Veride kaymalar meydana gelmiş veya verideki değişken başlıklar tekrar etmiş olabilir. Filtreleme, sıralama veya Google Tablolar’ın sunduğu veri temizleme önerileri genellikle yeterlidir. Bu aşamada en çok uğraştıran yerel gazete ve internet haber sitesi verisi çünkü veri boyutu diğerlerinden daha fazla. Nitekim, BİK verilerine göre 508 yerel gazete, 361 internet haber sitesi mevcut.

![](https://cdn-images-1.medium.com/max/1024/1*YPTAvt_XTMd0Hw10v8ngng.png)

Bu aşama en meşakkatlisi! Bundan sonra ben 3 ayrı veri dosyası oluşturdum. İlki yaygın ve bölgesel gazeteler, ikincisi yerel gazeteler ve üçüncüsü ise internet haber sitelerini içeren Google tablolar verisi. Verilerin temizliğinden eminsek bir sonraki aşama, bu gazete ve haber sitelerinin *yönetim adreslerini* kullanarak görselleştirmek.

## Google Haritalarım

Google Haritalarım aracının en iyi özelliği adres verisini kullanabilmesi, haritalandırmak için lokasyon (enlem, boylam, vb.) verilerine ihtiyaç olmamasıdır. [Bu linkten](https://www.google.com/maps/d/u/0/) karşınıza çıkan sayfadan “yeni harita oluştur” ile başlıyoruz.

**Adım 1. Verileri İçeri Aktarma**

Normalde verileri bu aşamada manuel olarak da ekleyebiliriz ama niye yorulalım ki? Halihazırda elimizde 3 ayrı veri seti var. Yaygın Gazeteleri içeren verisetini “***Adsız katman***” kısmındaki ***İçeri Aktar*** butonu ile seçerek işe başlayabiliriz.

![](https://cdn-images-1.medium.com/max/1024/1*OPhAFBDNt8Ieygx9O4o--Q.png)

Verinizi seçtiğinizde ilk olarak size lokayon verisi olarak kullanacağınız ***Yönetim Adresini*** seçmeniz, ikinci olarak ise veri noktalarını işaretleyen sembolleri temsil edecek sütunu yani ***Süreli Yayın Adını*** seçmeniz gerekiyor.

![](https://cdn-images-1.medium.com/max/1024/1*hyIbFv4JHnWR6vzzNOc6mA.png)

**Adım 2. Verileri Düzenleme ve Katman Ekleme**

Verileri aktardıktan sonra aktarılan verilerde hata varsa düzeltmeliyiz. Genelde adres verilerinde virgül veya tire işaretinden dolayı Google, ilgili lokasyonu haritada bulamayabiliyor. Daha sonrasında elimizdeki diğer verileri içeri aktarmak için katman eklemeliyiz.

![](https://cdn-images-1.medium.com/max/1024/1*sR8XYy4W9olCNSzXlz3sEA.png)

**Adım 3. Haritada düzenlemeler yapma**

Tüm veriler eklendiğinde her katman için sembol, sembol rengi seçilebilir. Aynı zamanda Temel Harita kısmında haritamızın temasını da değiştirebiliriz. Sembolleri değiştirmek için her katmandaki “Tüm Öğeler” kısmını kullanabilirsiniz. Aşağıdaki görselde haritamı nasıl düzenlediğimi görebilirsiniz.

![](https://cdn-images-1.medium.com/max/1024/1*ugXeBf2ZvmTzilhXwNE6Sw.png)

Harita teması, semboller ve renkler de tamam ise geriye haritayı web ortamında paylaşmak kalıyor. “Paylaş” kısmında oluşturacağınız bağlantı ile haritayı erişilebilir hale getirebilirsiniz. Bunun yanısıra harita başlığınızın sağındaki üç nokta ikonuyla haritayı web sayfanıza da yerleştirebilirsiniz. Oluşturduğum haritanın interaktif halini ben de benzer bir şekilde alta ekledim.

<div class="embed-container"><iframe src="https://www.google.com/maps/d/embed?mid=19APCzPbTZK3y-ljYpHFQE_UBnabSmxI&amp;hl=en_US" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

Bu yazıyı hem bu araçları tanıtmak hem de Üsküdar Üniversitesi İletişim Fakültesi öğrencilerine verdiğim derslerde rehberlik etmesi adına oluşturdum. Muhtemelen alanda çalışan akademisyen ve araştırmacılar için de faydalı olacağını öngörüyorum. Çünkü lokasyonların yanı sıra gazetelerin iletişim bilgileri de bulunmakta. Bundan sonraki aşama öğrencilerimle bu haritayı daha da zenginleştirmek ve Basın İlan Kurumu dışında da var olan gazete ve internet haber sitelerini bu haritaya eklemek olacak.

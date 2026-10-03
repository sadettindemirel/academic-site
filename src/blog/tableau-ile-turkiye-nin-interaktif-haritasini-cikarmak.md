---
title: "Tableau ile Türkiye’nin interaktif haritasını çıkarmak"
date: 2020-04-10
author: Sadettin Demirel
excerpt: "Tableau, hem ücretsiz sürümü hem de zengin ve interaktif veri görselleştirme olanakları olsun veri görselleştirme ilgilenenler için vazgeçilmez araçlardan birisi. Fakat bir tableau kullanıcısı olarak aracın farkettiğim…"
thumbnail: https://cdn-images-1.medium.com/max/1024/0*VVhNsGY_zFFjiu5G.png
tags_display: "Dataviz, Tableau, Veri Görselleştirme, Data Visualization"
original_url: https://medium.com/verijurnali/tableau-ile-t%C3%BCrkiyenin-interaktif-haritas%C4%B1n%C4%B1-%C3%A7%C4%B1karmak-bd36e4160f2
original_source: Medium
---
## Tableau ile Türkiye’nin interaktif haritasını çıkarmak — (İnceleme)

![](https://cdn-images-1.medium.com/max/1024/0*VVhNsGY_zFFjiu5G.png)

Tableau, hem ücretsiz sürümü hem de zengin ve interaktif veri görselleştirme olanakları olsun veri görselleştirme ilgilenenler için vazgeçilmez araçlardan birisi. Fakat bir tableau kullanıcısı olarak aracın farkettiğim dezavantajlarından birisi en önemli özelliklerinin ayrıntılarda gizli olması. Bu yazının amacı da Tableau’nun önemli bir özelliğini tanıtmak ve nasıl uygulanacağını açıklamak. Bu arada Tableau’yle ilk defa tanışanlar aracı detaylıca incelediğim [*şu yazıdan*](https://datavizlove.blogspot.com.tr/2017/03/tableau-ile-deprem-verilerini.html) yararlanabilir.

Tableau’nun ayrıntılarda saklı kalan özelliği choropleth haritalama. Tableau 10 sürümüyle beraber gelen bu özellik daha önce Türkiye’nin illeri için kullanılamıyordu. Güncellemeyle birlikte haritalama için enlem ve boylam verilerine gerek kalmadan il bazlı interaktif haritalama yapılabiliyor.

### Peki nedir bu choropleth map?

![Choropleth Harita Örnekleri / visualoop](https://cdn-images-1.medium.com/max/1024/0*1zve3zmI_X87hxSH.)
*Choropleth Harita Örnekleri / visualoop*

[Datavizcatalogue.com](http://datavizcatalogue.com)’a göre choropleth haritaları, bir değişkene göre renkli, gölgeli veya desenli bölünmüş coğrafi alanları veya bölgeleri gösterir. Bu teknikte renklendirilmiş coğrafi bir alan üzerinden değerler görselleştirilir. Değişkenler coğrafi bölgelere göre renklendirilir ve açık ve kapalı tonlar kullanılır. Genelde lokasyon bazlı verileri karşılaştırma amacıyla tercih edilir.

### Nasıl Yapılır?

Tableau’de il genelinde interaktif bir choropleth (filled map) yapmak aslında 2 adımda yapılabilir. Ama daha basit hale getirmek için 3 aşamada anlatmayı tercih ettim:

***Adım 1****:*

Veri setini tableau’ye eklenirken aşağıdaki gibi bir sayfada her sütunde yer alan verilerin formatları düzenlenir. Tableau bunu otomatik olarak yapsa da bazı veri formatlarını doğrudan tanımlayamaz. Örneğin, ay ve günlerin bulunmadığı 2004, 1998, 1920 gibi sadece yılların bulunduğu bir sütunu tableau sayı olarak algılar. Aşağıda görüldüğü gibi Türkiye’nin illerinin bulunduğu sütun metin verisi olarak belirtilmiş. Harita oluşturmak için bahsi geçen sütunun coğrafi bir veri formatı çevrilmeli. Bunun içinde sırasıyla sütun üstündeki sembol: ***Abc > Geographic Role > State/Province*** seçilerek veriler lokasyon veri formatına dönüştürülür.

***Adım 2****:*

Dönüştürülen sütuna çift tıklanırsa tableau verilerden temel bir harita oluşturur. Daha önceki adımda “*Şehirler*” sütunundaki veriler lokasyon verisi olarak düzenlense de varsayılan iller ABD’ye göre ayarlandığı için ülkemiz şehirlerini tanımlayamaz. Bunu düzeltmek amacıyla haritanın sağ alt köşesine (82 unknowns), sonrasında lokasyon düzenleme (edit locations) seçeneğine tıklanmalıdır.

***Adım 3***:

İkinci adımdaki direktifler yerine getirildiğinde bahsedilen il verileri ve üst tarafta bu şehirlerin hangi ülkeye ait olduğuna dair bir sayfa ortaya çıkar. Country/ Region bölümünde Türkiye seçilerek interaktif choropleth harita hazırlanmış olur.

### Renklendirme ve Düzenleme

Yukarıdaki adımlar izlenirse interaktif bir choropleth harita oluşturulur ama süreç bununla bitmez. Anlamlı bir görselleştirme oluşturmak için şehirlere karşılık gelen değişkenler kullanılmalı, görselleştirmeyi okuyucunun kısa sürede kavramamasını sağlayan öğeler (renk lejand, tasarım) eklenmelidir.

Örneğin referandum verisi için sonuç değişkeni “color” bölümüne sürükle-bırak yapılarak anayasa değişikliğine hangi ilin evet veya hayır dediği görselleştirilebilir.

Bununla birlikte her ilin evet ve hayır oy oranları “detail” bölümüne sürükleyerek görselleştirmeye yardımcı değişkenler eklenebilir.

Son olarak estetik bir görselleştirme için haritada kullanılmayan ülkeler, bölgeler ve denizler çıkarılabilir. Üst menüden ***Map > Map Layers*** seçildikten sonra sol köşedeki ***base*** seçeneğindeki işaret kaldırılırsa daha estetik bir veri görselleştirme çalışması elde edilir.

Sonuç olarak seçim dönemlerinde veya illere yönelik araştırmalardan elde edilen veriler Tableau ile kolaylıkla interaktif bir şekilde görselleştirilebilir.

**Örnek çalışmalarım:**

![](https://cdn-images-1.medium.com/max/1024/1*11jujLm_96BgpoOuMzBlYQ.png)

[16 Nisan Referandum Sonuçları](http://public.tableau.com/views/16NisanAnayasaDeiikliiReferandum/Dashboard1?:embed=y&:loadOrderID=0&:display_count=yes)

![](https://cdn-images-1.medium.com/max/1024/1*WMUTIocCjQCmDD_O7j7ZHQ.png)

[İllere Göre Evlenme ve Boşanma Yaş Ortalamaları](http://public.tableau.com/views/llereGreEvlenmeveBoanmaYaOrtalamlarAverageAgeofMarriageandDivorceByCity/Dashboard1?:embed=y&:loadOrderID=1&:display_count=yes)

*16 Nisan Referandum verisi Wikipedia’dan alınmıştır:* [*veri seti*](https://docs.google.com/spreadsheets/d/1gPXxsOxI9KoML3kum9t3QSqglE3vgIEtJUzmVAmxqH8/edit?usp=sharing)

*\*Evlenme ve Boşanma istatistikleri TÜİK’in istatistiklerle kadın 2015 çalışmasından elde edilmiştir:* [*veri seti*](https://web.archive.org/web/20200925135851/http://www.tuik.gov.tr/PreHaberBultenleri.do?id=21519)

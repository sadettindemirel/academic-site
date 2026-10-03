---
title: "Türkiye ve dünyadan örneklerle veri görselleştirme hataları"
date: 2019-09-09
author: Sadettin Demirel
excerpt: "Dünyada The New York Times, The Guardian, Reuters, Al Jazeera, BBC, The Economist gibi büyük ölçekli haber merkezlerinin yanı sıra FiveThirtyEight, SRF, Der Spiegel, InfoTimes, ProPublica gibi orta ve küçük ölçekli…"
thumbnail: https://cdn-images-1.medium.com/max/1024/0*WwgT6N26S-5ztPTb
tags_display: "Veri Gazeteciliği, Data Visualization, Veri Görselleştirme, Data Journalism, Dataviz"
original_url: https://medium.com/verijurnali/t%C3%BCrkiye-ve-d%C3%BCnyadan-%C3%B6rneklerle-veri-g%C3%B6rselle%C5%9Ftirme-hatalar%C4%B1-7a402be35a53
original_source: Medium
---
## Bölüm 2: Türkiye ve dünyadan örneklerle veri görselleştirme hataları

![Photo by Isaac Smith on Unsplash](https://cdn-images-1.medium.com/max/1024/0*WwgT6N26S-5ztPTb)
*Photo by Isaac Smith on Unsplash*

Dünyada The New York Times, The Guardian, Reuters, Al Jazeera, BBC, The Economist gibi büyük ölçekli haber merkezlerinin yanı sıra FiveThirtyEight, SRF, Der Spiegel, InfoTimes, ProPublica gibi orta ve küçük ölçekli haber merkezleri de veri görselleştirme pratiklerini haberlerinde düzenli bir şekilde kullanıyor. Özellikle Wikileaks ve açık veri hareketiyle yükselişe geçen veri gazeteciliği ve veri görselleştirme trendi üniversitelerde verilen dersler, düzenlenen ödüller, konferanslar ve yapılan akademik çalışmalarla kemikleşmeye de başladı.

Veri görselleştirme kullanımı Türkiye özelinde basılı gazetelerin ekonomi sayfaları haricinde büyük ölçekli medya kuruluşlarında pek rağbet görmüyor. Her ne kadar BBC Türkçe, Al Jazeera Türkçe (faaliyette iken), Anadolu Ajansı (Infografik bölümü), Evrensel, Birgün, Dokuz8 Haber, Sol Haber, Bianet, 140Journos gibi orta veya küçük ölçekli, bazı durumlarda kendilerini alternatif medya olarak tanımlayan haber merkezleri belirli aralıklarda veri görselleştirme içeren haberler üretseler de henüz düzenli oranda sürekli bir üretim yapıldığını söyleyemeyiz.

Haber merkezlerinin dışında veri görselleştirmenin sivil toplum girişimleri tarafından kullanıldığını görüyoruz. Doğruluk Payı, Veri Kaynağı, Teyit gibi girişimler multimedya içeriklerinde veri görselleştirmeden etkili bir şekilde yararlanıyor. Sürdürülebilir gelir modeli ve okurun desteğinden yoksun, siyasi baskılar neticesinde reklam endüstrisinin sopa ve havuç misali kullanıldığı medya ekosistemlerinde haber merkezlerinin bu tip yeniliklere kendilerini entegre etmeleri tabii ki zorlaşıyor. Ama dünyadaki trendlere bir noktadan ayak uydurmaya, yerel düzeyde uygulamaya başlamak gerek.

Veri görselleştirme pratikleri haber merkezleri ve sivil toplum örgütleri tarafından kullanılıyor fakat bu kullanım bazı durumlarda okuru yanlış yönlendirebiliyor veya grafikteki mesaj okura belirli nedenlerle etkili yansıtılamamış olabiliyor. Bu nedenleri, veri görselleştirme süreçlerinde dikkat edilmesi gereken noktaları bir önceki [yazımda](/blog/haber-icin-veri-gorsellestirirken-nelere-dikkat-edilmeli/) detaylı ele almıştım. Önceki yazımla ilişkili olarak bu yazıda Türkiye ve dünyadan veri görselleştirme örneklerini inceleyeceğim. Özellikle yapılan hataları ve mevcut çalışmanın nasıl daha etkili hâle getirilebileceğine dair düşüncelerimi paylaşacağım.

İlk olarak [BBC’nin ulaşım masraflarına dair yaptığı haberle başlayalım](https://www.bbc.com/news/uk-42182497). Haberde kullanılan grafiklerin ilki olan çizgi grafikte eksenin sıfırdan başlatılmadığı göze çarpıyor. Bu durum kullanılan araçtan veya daha önceki dönemlere dair veri olmamasından da kaynaklanıyor olabilir ama her ne olursa olsun dikey eksenin sıfırdan başlatılması daha doğru bir tasarım tercihi olurdu.

![](https://cdn-images-1.medium.com/max/1024/0*j-UTV5cimFUX_aZ7.jpg)

Diğer yandan sağdaki simit (donuts) grafikte ise 1952'den 2016'ya kat edilen yolun yıllık kilometre bazında artışı gösteriliyor. Bu grafikte yapılan ilk hata belirli yıllar arası değişimi görselleştirmek için simit grafik tercih edilmesi. Her ne kadar görselleştirilen öge sayısının az olması ve açıklayıcı ifadelere yer verilmesi işe yarasa da daha etkili bir görselleştirme için [paralel koordinat grafiği](https://datavizcatalogue.com/TR/yontemleri/paralel_koordinat_grafigi.html) tercih edilebilirdi. Bir diğer hata grafikte farklı ulaşım araçları için birden fazla renk kullanmak yerine bir rengin belirli tonlarının tercih edilmiş olması. Ayrıca okura tanıdık gelmesi açısından soldaki grafikte benzer ögeler (cars, bus and coach) için kullanılan renkler de simit grafikte tercih edilebilirdi.

Reuters’ın Florida’da silahlı saldırılardaki ölümler konulu grafiği de grafik okuryazarlığı düşük olan bir okur için yanlış anlaşılmaya müsait. Tasarımcı veya veri görselleştirme uzmanı ekseni tersine çevirerek ve alan grafiği kırmızı renkte tercih ederek ölümler konusunda ayrıca bir bağlam oluşturmaya çalışıyor. Yaratıcı bir tercih olduğunu söyleyebiliriz ama alan grafiğin altında yer alan çizgiler yanlış anlaşılabilir. Bu noktada grafiğin nasıl okunacağına dair açıklayıcı bir metin eklemek yararlı olabilirdi.

![](https://cdn-images-1.medium.com/max/1024/0*tGex1Aj9NGFLlju9.png)

Türkiye’deki örneklerden eksen hatası yapılanları taradığımda Dokuz8 Haber’in veri haberleri serisinde birçoğuna rastladım. Örneğin aşağıdaki grafikte sağ tarafa üçüncü bir eksen eklenmiş. Depresyon tanı oranı ve anti-depresan dozajı veya kullanımının görselleştirildiği grafikte üçüncü bir eksen gereksiz çünkü her iki değer de bin kişi baz alınarak hesaplanmış.

![](https://cdn-images-1.medium.com/max/1024/0*X1GTfQI5IQS4GluK.png)

Yatay ve dikey olmak üzere sadece 2 eksen kullanmak yeterli olabilirdi. Ayrıca eksenlerin aralıkları da birbiriyle uyumlu değil. Bunun yanı sıra grafikte gereğinden fazla görsel eleman kullanılmış. Bu grafik iki grafiğe bölünerek biri tanı oranı diğeri anti-depresan dozajı olmak üzere OECD verileriyle görselleştirilebilirdi veyahut aşağıdaki grafikte olduğu üzere sadece OECD ülkeleri ve Türkiye’de bin kişiye düşen antidepresan dozajı kullanılabilirdi.

![](https://cdn-images-1.medium.com/max/1024/0*bBLU19RTMrxREls0.png)

Benzer bir hata yine aynı haber merkezinin ülkelerdeki STK sayısı ile nüfusu karşılaştırdığı görsel çalışmada da rahatlıkla görülebilir. Bu noktada değerler arası fark epey açık. Bu nedenle ilk grafikte üç eksen kullanmak yerine alttaki görselde olduğu gibi STK başına düşen kişi sayısını veya kişi başına düşen STK sayısını hesaplayıp görselleştirmek daha doğru bir tercih olurdu.

![](https://cdn-images-1.medium.com/max/1024/0*hhIZXNda3fjvWqFA.png)

Fakat ikinci grafikte arka planda kullanılan tona yakın bir renk paleti tercih edilmiş. Siyaha yakın tonlar yerine mavi ya da turuncu renkler kullanılabilirdi. Veyahut verileri yeniden görselleştirdiğim aşağıdaki grafikte olduğu gibi gri bir arka plan tercih edilebilir. Bu durumda siyah renk daha ön plana çıkacaktır.

![](https://cdn-images-1.medium.com/max/1024/0*p67_3I4lOaTgDzeM.png)

Grafikte kullanılan renklere gelmişken [Panenka Graphic’ten Chiqui Esteban’ın Futbolun Renkleri](https://www.elocuent.com/los-colores-del-futbol/) temalı infografiğini inceleyelim. Grafik Avrupa liglerindeki takımların renklerini gösteriyor ama grafiğin bir renk cümbüşüne dönüştüğünü söylemek yalan olmaz. Bunun yanı sıra takımlarda kullanılan renklerin ortalamalarının pasta grafikle görselleştirilmesi ülkelerarası karşılaştırma imkânını da zedeliyor. Sadece sağdaki pasta grafiklerden beyaz, kırmızı ve mavinin futbol kulüpleri tarafından daha fazla tercih edildiğini çıkarabiliyoruz.

![](https://cdn-images-1.medium.com/max/1024/0*XAXy8nEmL-Ov4Db1.jpg)

Renk kullanımına dair benzer bir hatayı 140Journos’un anayasa değişikliği görüşmelerine dair ret ve kabul oylarını görselleştirdiği grafikte de görmek mümkün. Seçilen grafik tipi ve oylar için kullanılan renkler uygun fakat arka planda sarı renk kullanılması estetik bir görüntü oluşturmuyor. Okur’un dikkatini çubuklara çekmek adına arka planda açık tonda gri renk veya kapalı tonlarda sarı renk paletleri tercih edilebilirdi. Görüldüğü üzere veri görselleştirme örneklerinde renkler bir çalışmanın avantajlı veya dezavantajlı ögesi hâline gelebiliyor.

![](https://cdn-images-1.medium.com/max/1024/0*g_F-25Jni9f85ozE.png)

Yapılan bir diğer hata 3 boyutlu grafikleri tercih etmek. Örneğin, Stockholm Uluslararası Barış Araştırmaları Enstitüsü (SIPRI)’nün ülkelerin sahip olduğu nükleer silahlar konulu çalışması üç boyutlu olarak görselleştirilmiş. Çalışmada nükleer silah sayısı sınırlarla beraber üç boyutlu olarak tasarlanmış. Mevcut durumu göstermek için hiç bu kadar detaya gerek yok. Aynı veri çubuk grafikle daha iyi ve basit bir şekilde görselleştirilebilirdi. Ülke sınırlarının üç boyutlu bir çubuk hâlinde görselleştirilmesi de boyutsal açıdan yanlış bir algı ortaya çıkarıyor. Örneğin Rusya’nın 7 bin nükleer silahı var ama Rusya, 6800 silahı olan ABD’nin üç katı büyüklüğe sahip.

![](https://cdn-images-1.medium.com/max/1024/0*uCCMOpj7162k88_O.png)

Bir diğer [üç boyutlu görselleştirme örneği](https://www.birgun.net/haber/31-mart-ile-23-haziran-in-karsilastirmasi-259631) ise Birgün’de yayınlanan 31 Mart — 23 Haziran İBB seçimlerinde İmamoğlu ve Yıldırım’ın ilçe bazında aldıkları oy oranlarını gösteren grafik. Her ne kadar tercih edilen renkler ve çubuk boyutları uygun olsa da ilçe bazında [koroplet bir harita](https://datavizcatalogue.com/TR/yontemleri/koroplet_harita.html), çubuk grafik gibi çeşitli alternatifler daha anlaşılır ve uygun olurdu.

![](https://cdn-images-1.medium.com/max/1024/0*P_OnxeTatGuUkZV4.png)

Nitekim haberin devamında yer alan çubuk grafikler ile kombine edilmiş veri tablosu da üç boyutlu harita yerine daha iyi bir alternatif olarak kullanılabilir.

![](https://cdn-images-1.medium.com/max/1024/0*c7eUiDgQUHX_tjbT.png)

Yanlış piktogram (figür) kullanımı da veri görselleştirme süreçlerinde yapılan hatalar arasında yer alıyor. Veri Kaynağı’nın büyükbaş hayvan sayısı ve yabancılara satılan konut sayısını belirli figürler yardımıyla görselleştirdiği çalışmaları örnek olarak kullanabiliriz.

![](https://cdn-images-1.medium.com/max/1024/0*LLDw3GGUZNJ4cjcf.jpg)

Soldaki grafikte açıklayıcı ifadeler bir nebze yardımcı oluyor ama görselin boyutunun değiştirilmesi yerine adet yazılabilirdi. Sağdakinde ise yine adet yerine ögelerin boyutlarının değiştirilmesi, benzer bir sorun ortaya çıkarıyor. Üstelik evleri sembolize eden figürün boyutları yanı sıra figürün kendisi de değişiyor. Bu nedenle tek bir ev sembolünün eldeki verinin durumuna göre adetler hâlinde kullanılması daha etkili ve doğru bir seçenek olurdu. Aşağıda aynı veriyi ev figürü kullanmadan her küp satılan 100 konuta denk gelecek şekilde görselleştirdim. Aşağıdaki görselde herhangi bir ev ikonu da kullanabilirdim. Kısacası figür ve sembolleri tercih edeceksek grafikte boyutlarıyla oynamak yerine adetleri belirtmek daha doğru olacaktır.

![](https://cdn-images-1.medium.com/max/800/0*nIE8g6fSPNCJze-7.png)

Ayrıca genelde sütun grafik kullanımlarında göze çarpan bir diğer sorunlu kullanım ise yatay eksendeki ifadelerin sayısının artmasıyla aşağıdaki grafiklere benzer çalışmalar elde edilmesi. Bu noktada eksende çubuklara karşılık gelen ifadelerin sığmaması sonucu yatay eksen uzadıkça uzuyor. Böyle bir durumda eksenlerin yer değiştirmesi daha doğru bir kullanım olacaktır. Hem okur ifadeleri okumakta zorlanmayacak hem de grafik yukarıdan aşağıya daha hiyerarşik ve düzenli duracak.

![](https://cdn-images-1.medium.com/max/1024/0*Y1k_RJbBMSJ-FVqe.jpg)

Örnek olarak Dokuz8 Haber tarafından hazırlanan sütun veyahut çubuk grafiğin daha doğru bir kullanım olduğunu söyleyebiliriz. Çubukların sıralamasında mutluluk endeksi baz alındığı için bu grafikte değerlerin yukarıdan aşağıya sıralanmamış olduğunu görüyoruz.

![](https://cdn-images-1.medium.com/max/1024/0*eSbmikYAzjgkkGer.png)

Son olarak dikkat edilmesi gereken konulardan bir diğeri grafiği gereğinden fazla süslemek veya çalışmaya gereksiz görsel unsurlar eklemek. Veri Kaynağı ve Dokuz8 Haber’in iki görselinde de grafiğin yanı sıra çalışmada bağlam oluşturması açısından görsel ögelere yer verilmiş. Bu noktada okurun dikkatini grafikteki değerlere yönlendirmenin daha doğru olacağını düşünüyorum. Grafikteki başlık, eksen isimleri ve grafiğin içerisinde kullanılacak açıklayıcı ifadeler (annotations) bu bağlamı sağlıyor.

Veri setlerini süslü bir şekilde görselleştirmek yerine estetik ögelerden yeterince yararlanarak en doğru ve basit bir şekilde görselleştirmek veriden okura verilecek mesajı daha ağdasız ve anlaşılabilir kılacaktır. Bu nedenle kullanılan estetik ve görsel ögelerle, istenen azami netlik veya sadelik arasındaki dengeyi iyi tutturmakta fayda var.

![](https://cdn-images-1.medium.com/max/1024/0*5el77tg_x4eKYuSh.png)

Sonuç olarak son yıllarda habercilikte sıklıkla tercih edilen veri görselleştirme pratiklerinin yanlış veya hatalı kullanımını Türkiye ve dünyadan örneklerle açıklamaya çalıştım. Büyük ölçekli haber merkezlerinden küçük ölçekli haber kuruluşlarına ve sivil toplum girişimlerine kadar geniş bir çerçevede bu hataların yapıldığını görüyoruz. Şimdilik dijital ortamda yayınlanan örnekleri inceledim ama muhtemelen basılı yayınlarda da bu tip hatalara rastlayabiliriz. Benzer bir inceleme olarak Economist muhabiri Sarah Leo’nun önceki [veri görselleştirme pratiklerinde yapılan hataları incelediği ve nasıl alternatif çözümler getirebileceğine dair düşüncelerini paylaştığı yazısını](https://medium.economist.com/mistakes-weve-drawn-a-few-8cdd8a42d368) önerebilirim (Ayrıca VOYD Veri Bülteninde de [bu yazının çevirisini](https://medium.com/veri-b%C3%BClteni/yanl%C4%B1%C5%9Flardan-ders-%C3%A7%C4%B1karmak-veri-g%C3%B6rselle%C5%9Ftirmede-yapt%C4%B1%C4%9F%C4%B1m%C4%B1z-hatalar-fc6015251614) yayınladık). Aslında veri gazeteciliği pratiklerinin ve veri görselleştirme kullanımın belirli düzeye geldiği ülkelerde bu tip incelemelere, görüş alışverişlere çevrim içi mecralardaki tartışmalara sıklıkla şahit oluyorum. Dileğim veri odaklı habercilik faaliyetlerinin ve veri görselleştirme kullanımının Türkiye’de daha çok medya kuruluşu, sivil toplum örgütü tarafından uygulanmaya başlanması ve bu tip konuları bizim de konuşmaya ve tartışmaya başlamamız.

*Originally published at* [*https://www.newslabturkey.org*](/blog/turkiye-ve-dunyadan-orneklerle-veri-gorsellestirme-hatalari/)

---
title: "Ücretsiz Veri Görselleştirme Araçları"
date: 2020-04-10
author: Sadettin Demirel
excerpt: "Veri görselleştirme, son yıllarda gittikçe önemli hale gelen bir disiplin ve beceri olarak karşımıza çıkıyor. Özellikle giderek artan veri miktarı, bu veriyi anlamlı hale getirme ve yorumlama ihtiyacınının bunda büyük…"
thumbnail: https://cdn-images-1.medium.com/max/1024/0*e-WmZ0lbczpfurnd
tags_display: "Dataviz, Veri Görselleştirme, İnceleme, Data Visualization"
original_url: https://medium.com/verijurnali/i%CC%87nceleme-%C3%BCcretsiz-veri-g%C3%B6rselle%C5%9Ftirme-ara%C3%A7lar%C4%B1-7f53efc82044
original_source: Medium
---
Veri görselleştirme, son yıllarda gittikçe önemli hale gelen bir disiplin ve beceri olarak karşımıza çıkıyor. Özellikle giderek artan veri miktarı, bu veriyi anlamlı hale getirme ve yorumlama ihtiyacınının bunda büyük bir payı var. Üstelik geçmişe göre veri analizi ve görselleştirme yazılımları ve araçlarına erişim sağlama daha üst seviyelerde ve bu araçların çoğu açık kaynak veya belli bir seviyeye kadar ücretsiz olarak kullanılabiliyor

Son 13 yıllık Google Trend verisine bakıldığında (*Bu yazı 2017 yılında kaleme alınmıştı*) 2008 yılından itibaren veri görselleştirme teriminin Google aramalarda payının arttığı görülüyor. 2017 yılında ise bu oran zirve noktasına ulaşmış. Her ne kadar 2004–2007 yılları arası düşüşün nedeni belirsiz olsa da 2008 yılından itibaren bariz bir artış olduğu söylenebilir.

![Veri kaynağı: Google Trends](https://cdn-images-1.medium.com/max/640/1*u-47a4GFC9To0AiWQp3dJA@2x.png)
*Veri kaynağı: Google Trends*

Kuşkusuz ki veri görselleştirme kendi içinde ayrı başlıklara sahip bir alan. Kullanılan işleve göre keşifçi veri görselleştirme (exploratory data visualization) ve sunum amaçlı veri görselleştirme (explanatory data visualization) pratiklerine rastlanabiliyor. İlk tip çalışmalar veri analizi öncesinde veriyi anlamak ve yorumlamak için yapılırken, ikinci tip analiz edilen veriden elde edilen çıktıların sunumu, sergilenmesi için kullanılıyor.

Her ne kadar görselleştirme pratikleri medyada infografik olarak karşımızı çıksa da grafik, interaktifler (interactives), bilimsel görselleştirme (scientific visualization) gibi farklı disiplinlerde veri görselleştirme pratikleri çeşitli terimlerle adlandırılıyor.

Ayrıca çalışmalar statik veya interaktif olarak sınıflandırılıyor. Verinin sunuluş şekli, tercih edilen teknik, renkler, boyutlar ve yapılan analiz çalışmanın başarısını etkiliyor. Çünkü veri görselleştirme sadece tasarım bilgisi değil, temel istatistik bilgisi de gerekiyor.

Ayrıca çalışmada seçilen araç da büyük önem arz ediyor. Seçilen araç ister kod tabanlı (R, Python,D3) ister web tabanlı(The Atlas, Data Wrapper, Flourish, Google Haritalar) veya başlı başına bir program (Tableau) olsun, çalışmanın başarısı aracın ne kadar esnek olduğu,sunduğu veya sunmadığı olanaklara göre değişiyor.

Diğer yandan açık kaynak veya freemium (belli bir seviyeye kadar ücretsiz hizmet sağlayan) araçlar mevcut olsa da veri görselleştirme genelde belirli bir bütçe gerektiren bir zanaat. Her geçen gün veri görselleştirme araçlarının sayısı artsa da bir çoğu ücretli çözümler sunuyor. Buna başlangıçta veya beta sürümünde ücretsiz kullanım sunan araçlar da (data wrapper) dahil. Tüm güçlüklere rağmen bu alanı canlı tutansa açık kaynak, ücretsiz veya belirli bir seviyeye kadar ücretli araçların varlığı. Her ne kadar sayıları az olsa da bir çoğu ya bilinmiyor veya henüz keşfedilmemiş. Bu nedenle bu yazı da hem ücretsiz hem de kod bilgisi gerektirmeyen veri görselleştirme araçlarını kısaca inceledim. Listelediklerimin hepsini kullandım, duruma göre kullanmaya devam ediyorum.

## [1\. Google](https://www.google.com/intl/tr/sheets/about/) Tablolar & [Open Office](https://www.openoffice.org/) & MS Excel

Her üçü de veri analizi için kullanılan en temel araçlardan. Hem arayüzleri hem de kullanım mekanizmaları benzer olduğu için aynı kategoride değerlendirdim. Bu araçlar sadece veri görselleştirme için değil, tablo formatındaki veriye her türlü manipülasyon, analiz için kullanılıyor. Google Tablolar ve Excel’de web tabanlı olarak da çalışılabiliyor. Google Tablolar’ın en önemli özelliklerinden birisi web ortamında işbirliği yapma imkanı sağlıyor. Bunun yanı sıra interaktif veri görselleştirme olanağı ve çalışmayı siteye embed etme seçeneği sunuyor.

## [2\. The Atlas](https://www.theatlas.com/)

The Atlas, online haber merkezi [Quartz media](https://qz.com/) tarafından geliştirilen ücretsiz bir veri görselleştirme aracı ve kütüphanesi. Araç web tabanlı, ve sadece belirli grafik tiplerini desteklese de statik görsel çalışmaları internet ortamında paylaşma imkanı tanıyor. Üyelik sistemi ile çalışan araç Wordpress ve bir çok platformu destekliyor ve görselleştirilen veriyi indirme imkanı sunuyor. Böylelikle The Atlas, bir araçtan öte bir paylaşım merkezine, veri görselleştirme kütüphanesi görevi görüyor.

![Örnek grafik](https://cdn-images-1.medium.com/max/644/1*TiZHlKZfiNDyWwAS1pAEpw@2x.png)
*Örnek grafik*

Atlas’a benzer bir araç olarak Financial Times, kendi geliştirdiği [FastCharts](https://web.archive.org/web/20191207145914/https://fastcharts.io/) görselleştirme aracını kullanıma sundu. Şuan için ücretsiz bir şekilde statik görsel çalışmalar üye olmadan gerçekleştirilebiliyor.

## [3\. Tableau Public](https://public.tableau.com/s/)

Tableau, bir business intelligence (iş zekası) yazılımı. Veri analizi ve veri görselleştirme amaçlı kullanılıyor. Tableu Public ise ücretli ve lisanslı olan hizmetin 10gb limitli ücretsiz sürümü. Üye olunarak yazılım indirilebiliyor. Tableau interaktif bir veri görselleştirme aracı, ücretsiz sürümü Tableau Public aynı zamanda çalışmaların sunulduğu ve paylaşıldığı online bir platform. Yani araç program tabanlı olsa da çalışmalar web tabanlı olarak sergilenebiliyor. The Atlas gibi embed kod seçeneği sunan araç, görselleştirmeleri diğer platformlarda yayınlama imkanı tanıyor. Çalışmaları pdf ve png formatında indirme olanağı da sunuyor.

*Tableau hakkında detaylı bilgiye yaptığım incelemelerden ulaşabilirsiniz:*

-   [Tableau ile Türkiye’nin interaktif haritasını çıkarmak](/blog/tableau-ile-turkiye-nin-interaktif-haritasini-cikarmak/)
-   [Tableau ile deprem verilerini görselleştirmek](/blog/tableau-ile-deprem-verilerini-gorsellestirmek/)
-   [Tableau ile veri analizi ve görselleştirme](/blog/tableau-ile-veri-analizi-ve-gorsellestirme/)

## [4\. Flourish](https://app.flourish.studio/projects)

Yakın zamanda beta sürümüyle erişime açılan [*Flourish, Google News Lab işbirliğiyle haber merkezlerine ücretsiz veri görselleştirme hizmeti sunuyor.*](https://flourish.studio/newsrooms/) Diğer ücretsiz araçlarla kıyaslandığında Flourish haber merkezlerinin kendi ihtiyacına göre kod ve tasarım özelleştirmeleri yapabileceği interaktif bir veri görselleştirme aracı. Ayrıca veri görselleştirmeler medium’daki yazılara embed edilebiliyor.

<div class="embed-container"><iframe src="https://public.flourish.studio/visualisation/297490/embed" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

Flourish, giderek veri görselleştirme kütüphanesini geliştiren ve güncelleyen bir ekibe sahip. Beta sürümünden bu yana araç sistematik bir şekilde geliştirildi. Örneğin üstteki yarışan çubuk grafik örneği bir kaç ay önce araca eklendi. Herkes açık bir şekilde oluşturulan tüm çalışmalar için Flourish ücretsiz olarak kullanılabiliyor. Aşağıdaki yazımdan detaylı bilgiye ulaşabilirsiniz:

[Haber Merkezleri İçin Ücretsiz Veri Görselleştirme Aracı: Flourish](/blog/haber-merkezleri-icin-ucretsiz-veri-gorsellestirme-araci-flourish/)

Flourish ile benzer bir şekilde Data Wrapper ve Infogram’da belli bir seviyeye kadar hizmet sağlıyor. [Datawrapper](https://www.datawrapper.de/#pricing) ile üretilen çalışmalarda 10 bin kişi ve üzeri görüntüleme limit olarak kabul ediliyor. [Infogram’da](https://infogram.com/pricing) ise ücretsiz olarak maksimum 10 görselleştirme çalışması üretilebiliyor. [Flourish](https://flourish.studio/pricing/) bu ikisine göre daha esnek ücretsiz çözümler sunuyor.

## [5\. Raw Graphs](http://rawgraphs.io/)

Raw Graphs, ücretsiz ve açık kaynak bir girişim. Density Design Araştırma Laboratuvarı tarafından hayata geçirilen proje karmaşık verileri sıradışı tekniklerle görselleştirmeyi ve herkes için kolay hale getirmeyi amaçlıyor. Verinin linkini Raw Graphs sayfasına yapıştırarak, veya dosyayı yükleyerek eldeki veri sisteme ekleniyor. Sonrasında verinin yapısına göre uygun grafik seçiliyor ve grafik svg veya png olarak indirilebiliyor.

![kaynak: rawgraphs.io](https://cdn-images-1.medium.com/max/800/1*y3hu-zOT_SPZBTBj_DruqQ.gif)
*kaynak: rawgraphs.io*

## [6\. Piktochart](https://piktochart.com/) ve [Canva](https://www.canva.com/)

Piktochart ve Canva daha çok imaj tabanlı infografik ve görsel tasarım araçları. Her ikisi de ücretsiz araçlar, fakat Piktochart özgün tasarımlar ve kaliteli görseller için ücretli bir çözüm sunuyor. Canva ise tamamen ücretsiz. Veri görselleştirme aracı kategorisine almamın nedeni, imaj tabanlı olsalar da, çalışmalara grafikler eklenerek, interaktif bir görsel elde edilebiliyor. Özellikle Piktochart, Canva’dan ayrı olarak yapılan çalışamların embed kod aracılığıyla diğer platformlarda paylaşılmasına izin veriyor. Ayrıca çalışmalar png, jpeg, pdf formatında da indirilebiliyor.

## [7\. Google Haritalar](https://www.google.com/maps/d/u/0/)

Google Haritalar (Google My Maps) google’ın sundugu harita hizmeti olmakla beraber genelde veri haritalamada da kullanılıyor. Veri boyutu ve kullanım olarak Google Drive kotası sınır olarak kabul edilirken, bu araç ile belirli bir noktayı (ülke, il, ilçe vb) görselleştirmek için enlem ve boylam verilerine gerek kalmıyor, otomatik olarak coğrafi kodlama işlemi yapılabiliyor.

![kaynak: http://searchengineland.com/](https://cdn-images-1.medium.com/max/1024/1*F8DfT7CmyGjvjAvhceq6Tw.jpeg)
*kaynak: http://searchengineland.com/*

## [8\. Carto](https://carto.com/)

Carto da lokasyon verilerinin görselleştirilmesinde sıklıkla kullanılan bir araç. Belirli bir seviyeye kadar kullanma olanağı sunan araç ile herhangi bir kod bilgisine gerek kalmadan coğrafi verilerin görselleştirilebiliyor. Elde edilen çalışma mobil uyumlu olarak diğer platformlarda embed kod yardımı ile yayınlanabiliyor.

<div class="embed-container"><iframe src="https://sadettin3069.carto.com/viz/94f24f09-27f6-4ce9-8bed-de95f0288563/embed_map" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

## [9\. Graph Commons](https://graphcommons.com/)

Kişiler, kurumlar, kavramlar arasındaki ilişkilerin ağ haritalanmasında kullanılan Graph Commons ücretsiz bir araç. Özel çalışmalar için ücretli çözümler sunuluyor. Graph Commons’da çalışma herkese açık olarak paylaşılıyor, herhangi bir veri limiti veya ağ harita limiti bulunmuyor. Çalışmayı diğer platformlarda paylaşma imkanı tanıyan araç, son dönemde stories adında yeni bir özellik duyurdu. Stories ile yapıla ag haritaları zaman tüneli halinde hareketli bir şekilde kullanılabilecek.

<div class="embed-container"><iframe src="https://graphcommons.com/graphs/09426282-c311-4b39-be2c-1bd4f93b5771/embed" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

Bu yazıda sıklıkla kullandığım veri görselleştirme araçlarını listeledim. Daha geniş ve kapsamlı bir liste için [**şu kaynaktan**](https://web.archive.org/web/20200508062345/http://dataviz.tools/) yararlanılabilir.

*Bu yazı yeni veri görselleştirme araçları ortaya çıktıkça veya bahsi geçen araçların faaliyetlerini durdurması durumunda güncellenecektir.*

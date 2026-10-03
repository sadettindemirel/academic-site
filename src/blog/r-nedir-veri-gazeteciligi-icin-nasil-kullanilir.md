---
title: "R nedir? Veri gazeteciliği için nasıl kullanılır?"
date: 2018-10-07
author: Sadettin Demirel
excerpt: "R istatistik dili veya programlama dili olarak bilinen ücretsiz ve açık kaynak bir yazılım. R ile herhangi bir web sitesini kazıyabilir, elde ettiğiniz veriyi temizleyip, manipüle edip görselleştirebilirsiniz. R ile…"
thumbnail: https://cdn-images-1.medium.com/max/1024/0*3UywEMNG7uYQoBR4
tags_display: "Verihaberciliği, Veri Gazeteciliği, R Programlama, Data Journalism, R Programming"
original_url: https://medium.com/verijurnali/r-programlama-nedir-veri-gazeteciligi-icin-nasil-kullanilir-58cf4182e47e
original_source: Medium
---
## R nedir ? Öğrenmek için nereden başlamalı ?

![Photo by Markus Spiske on Unsplash](https://cdn-images-1.medium.com/max/1024/0*3UywEMNG7uYQoBR4)
*Photo by Markus Spiske on Unsplash*

[R istatistik dili veya programlama dili](https://www.r-project.org/) olarak bilinen ücretsiz ve açık kaynak bir yazılım. R ile herhangi bir web sitesini kazıyabilir, elde ettiğiniz veriyi temizleyip, manipüle edip görselleştirebilirsiniz. R ile yapılabilecekler bunlarla sınırlı değil, bugün makine öğrenmesinden tutun, metin madenciliğine ve duygu analizine, interaktif web uygulamalarına (shiny.io) kadar geniş yelpazede kullanılan bir araç. Fakat bunları yapabilmek için R platformunun kendine özgü kodlama dilini de öğrenmek gerekiyor. [CRAN, R Arşiv Ağı’na](https://cran.r-project.org/) yüklenen paketler aracılığıyla çalışan yazılımın kendine ait bir uygulaması da olmasına rağmen genelde [R studio](https://www.rstudio.com/), [Microsoft R Open](https://mran.microsoft.com/) gibi entegre programlar tercih ediliyor. Bu programlar aracılığıyla hem R’ı öğrenmek daha kolay hâle geliyor hem de daha fazla işleve kolay bir şekilde ulaşılabiliyor.

![](https://cdn-images-1.medium.com/max/975/0*2bBUa9wIn38hS7EC.png)

### R veri gazeteciliği süreçlerinde nasıl kullanılıyor?

R, verinin elde edilmesinden sunumuna geniş yelpazede imkânlar sunuyor ve veriyle çalışan bir gazeteci için vazgeçilmez bir araç. Sadece bir kaç satır kodla çalışma akışınızı hızlandırabilir, gereksiz üçüncü parti araçlardan kurtulabilirsiniz.

ABD merkezli FiveThirtyEight R yazılımını en iyi şekilde kullanan haber merkezlerinin başında geliyor. [FiveThirtyEight’de çalışan veri gazetecisi Andre Flowers,](https://channel9.msdn.com/Events/useR-international-R-User-conference/useR2016/FiveThirtyEights-data-journalism-workflow-with-R) R yazılımını veri gazeteciliğinin her adımında kullandıklarını, veriyi işlemekten, temizlemeye, veri analizinden, çalışmanın interaktif olarak sunumuna kadar R’dan yararlandıklarını ifade ediyor. FiveThirtyEight bununla da yetinmiyor haberlerinde kullandığı verileri bir paket hâlinde [R ortamına](https://cran.r-project.org/web/packages/fivethirtyeight/vignettes/fivethirtyeight.html) ve [Github sayfasına](https://data.fivethirtyeight.com/) ekliyor. Bu sayede hem verinin yeniden kullanılmasını teşvik ediyor hem de yaptıkları işleri açık ve şeffaf bir şekilde sergilemiş oluyorlar. Peki neler üretiyorlar:

[UBER Manhattan’daki Taksicileri Nasıl Etkiledi](https://fivethirtyeight.com/features/uber-is-taking-millions-of-manhattan-rides-away-from-taxis/)

![](https://cdn-images-1.medium.com/max/975/0*TY58erjtPFKevO1N.png)

[ABD Seçim Tahminleri](https://projects.fivethirtyeight.com/2018-midterm-election-forecast/senate/?ex_cid=rrpromo)

![](https://cdn-images-1.medium.com/max/975/0*j7HA939DTGv0YZ22.png)

Bu arada FiveThirthyEight’in [2016 yılı Veri Gazeteciliği Ödüllerinde](https://www.datajournalismawards.org/past-winners/) yılın en iyi veri gazeteciliği sitesi ve en iyi veri uygulaması ödülünü de aldığını ekleyelim. FiveThirthyEight’in yanı sıra Propublica, Financial Times, [Buzzfeed](https://www.buzzfeednews.com/author/peteraldhous), ABD Ulusal Halk Radyosu (NPR), İsviçre merkezleri [SRF haber merkezi,](https://srfdata.github.io/) Alman haber merkezi [Spiegel Online](https://patrickstotz.github.io/) gibi bir çok haber merkezi R yazılımını veri gazeteciliği çalışma akışında kullanıyor. Bunların yanı sıra ödül almış veya almamış veri gazeteciliği veya araştırmacı gazetecilik projeleri de R yazılımından doğrudan veya dolaylı olarak yararlanıyor. Bu saydığım haber merkezlerinden bazıları ayrı bir veri ekibine sahipken bazıları ise R kullanma becerisine sahip veri gazetecisi istihdam ediyor.

R’ın kullanıldığı örnek bir diğer çalışma: Buzzfeed veri muhabiri Peter Aldhous, [ABD sağlık sistemini konu aldığı haberinde](https://www.buzzfeednews.com/article/peteraldhous/american-health-care) ggplot2 ve gganimate paketlerini kullanarak animasyon bir veri görselleştirme üretmiş. Ayrıca Peter Aldhous R kullandığı bir diğer haberi [Göklerdeki Casuslar](https://www.buzzfeednews.com/article/peteraldhous/spies-in-the-skies#.ymOqmNLdjW) ile [2016 yılı En İyi Veri Görselleştirme](https://www.datajournalismawards.org/past-winners/) ödülüne layık görüldü.

![gif: from Buzzfeed by Peter Aldhous](https://cdn-images-1.medium.com/max/800/0*O7Rvt_9ZS8gYoFJ9.gif)
*gif: from Buzzfeed by Peter Aldhous*

Bir diğer güncel örnek 2018 yılı En iyi Veri Gazeteciliği Portfolyosu ödülünü alan [Spiegel Online muhabiri Patrick Stotz](https://www.datajournalismawards.org/project-listing/?project_id=1995&utm_source=DJA+Newsletter&utm_campaign=01a6a34232-EMAIL_CAMPAIGN_2018_04_13_COPY_01&utm_medium=email&utm_term=0_8dec40e980-01a6a34232-). Stotz çalışmalarında ağırlıkla tidyverse paketini kullandığını ve veri kazıma, temizleme ve başlangıç analizlerini R ile yaptığını vurguluyor.

![](https://cdn-images-1.medium.com/max/975/0*d9R8haCPYT1Ub4eT.png)

### R öğrenmeye nereden başlamalı?

Bir kaç satır kod ile yukarıdaki çalışmaları hayata geçirmek, veri gazeteciliği süreçlerinde zamandan ve bütçeden tasarruf etmek hayal değil ama R programlama dilini öğrenmek zahmetli bir iş. Hem zaman hem de çaba gerektirse de imkânsız değil. R yazılımı web ortamında canlı bir topluluğa sahip. [Github](https://github.com/), [Stack overflow](https://stackoverflow.com/), [Rbloggers](https://www.r-bloggers.com/) gibi yardımlaşmaya açık forum tarzı siteler sıkıştığınızda yardım isteyebileceğiniz veya probleminize sorun bulabileceğiniz alanlar sunuyor. Bunun yanı sıra ücretsiz açık erişime sahip e-kitaplar, çevrimiçi eğitimler de cabası.

R öğrenmeye 2017 yılında başlamış biri olarak kişisel tecrübemi paylaşmam gerekirse, R programlama dilini öğrenmenin, bir dil öğrenmekten farkı yok. Sadece alıcının R yazılımı, bağlamın bilgisayar ortamı ve dilin ise formüle edilmiş kodlardan oluştuğu bir platform. Bu dili öğrenmek için envai çeşit ücretsiz ve ücretli kaynak ve sorularınıza cevap verecek yardımsever bir topluluk mevcut. Peki nereden başlamalı:

![](https://cdn-images-1.medium.com/max/975/0*-HeBY2PUu_Gra0oV.png)

[**SWIRL**](https://swirlstats.com/)

SwiRl, R paketlerinden farklı olarak R ve R studio gibi uygulamaları interaktif bir öğrenim platformu hâline getiriyor. [Sadece paketi yazılıma yükleyerek](https://swirlstats.com/students.html), soru cevap şeklinde ilerleyen bir eğitim modülüne yönlendiriliyorsunuz. Belirli komutlar yardımıyla kullanıcı adı ile giriş yapıp, [R programlamaya giriş, veri görselleştirme, veri temizleme](http://swirlstats.com/scn/title.html) gibi derslerden kolaylıkla yararlanabilirsiniz.

![](https://cdn-images-1.medium.com/max/975/0*El2FhjYPDYXWTWsR.png)

SwiRl’de henüz Türkçe bir derse denk gelmedim ama belki ilerde Türkçe veri gazeteciliği dersleri ve alıştırmalarıyla önemli bir öğrenme platformu hâline gelebilir.

[**DATACAMP**](https://www.datacamp.com/home)

Datacamp, ücretli bir çevrim içi öğrenme platformu fakat ücretsiz [R programlaya giriş dersleri](https://www.datacamp.com/community/open-courses) mevcut. Belirli sayıdaki modüller ücretsiz. Video destekli alıştırmalarla verimli bir öğrenme deneyimi sunuyor. Yıllık üyeliği pahalı olmasına rağmen, belirli haftalarda indirimlerden yararlanabilirsiniz.

### Diğer çevrimiçi eğitimler ve kaynaklar

-   Akademisyen Emre Toros tarafından hazırlanmış [ücretsiz Türkçe R Kitabı](https://bookdown.org/connect/#/apps/1531/access). Kitap sosyla bilimciler için yazılmış olsa da R öğrenmeye yeni başlayanlar için önemli bir kaynak.
-   Veri bilimci David Robinson tarafından oluşturulan çevrimiçi ücretsiz [R veri analizi ve görselleştirme eğitimi.](http://varianceexplained.org/RData/)
-   Texas Üniversitesi ve Knight’ın birlikte yürüttüğü “Gazeteciler için R Programlamaya Giriş” dersi [https://journalismcourses.org/course/view.php?id=9](https://journalismcourses.org/course/view.php?id=9), şu da ders için oluşturulmuş e-kitap: [https://learn.r-journalism.com/en/](https://learn.r-journalism.com/en/)
-   R ile veri gazeteciliği yapmak isteyenler için oluşturulmuş rehber tarzında bir kaynak [https://rddj.info](https://web.archive.org/web/20180930104558/https://rddj.info/)
-   R öğrenmeye yeni başlayanlar için bir kılavuz niteliğinde ücretsiz e-kitap [http://r4ds.had.co.nz/index.html](http://r4ds.had.co.nz/index.html)
-   Metin analizi ve duygu analiziyle ilgilenenler için faydalı bir e-kitap: [https://www.tidytextmining.com](https://www.tidytextmining.com/)

---
title: "Korona Günlerinde SWIRL ile R öğrenebilirsiniz!"
date: 2020-04-10
author: Sadettin Demirel
excerpt: "SwiRl R programlama dili için geliştirilmiş bir yazılım paketi, ggplot2 (veri görselleştirme), dplyr (veri manipülasyonu)gibi R paketlerinden farklı olarak R ve R studio gibi uygulamaları interaktif bir öğrenim…"
thumbnail: https://cdn-images-1.medium.com/max/1024/1*qTb-ywq2xKpoRXrzp3LZLw.jpeg
tags_display: "Veri Gazeteciliği, Rstats, R Programming, Swirl"
original_url: https://medium.com/verijurnali/swirl-ile-r-%C3%B6%C4%9Frenmek-%C3%A7ok-kolay-225de1b1e5a1
original_source: Medium
---
SwiRl R programlama dili için geliştirilmiş bir yazılım paketi, ggplot2 (veri görselleştirme), dplyr (veri manipülasyonu)gibi R paketlerinden farklı olarak R ve R studio gibi uygulamaları interaktif bir öğrenim platformu haline getiriyor.

John Hopkins Üniversitesi veri bilimcileri tarafından geliştirilen yazılım, “yaparak öğrenmek” prensibi üzerine kurulu. Açık kaynak kodlu yazılım, hali hazırda belirli R modülleriyle başlangıç seviyesindeki kullanıcılara R öğrenme ve [Github](https://github.com/swirldev/swirl) üzerinden yüklenecek yeni modüllerle R yeteneklerini geliştirme imkanı tanıyor.

Modüller basitten karmaşığa doğru giden problemler içeriyor. Başta genel bir temel bilgilerle başlayan dersler, tamamen kullanıcının yaparak öğrenmesi üzerine kurulu. Tüm bunlar interaktif bir bot yardımıyla mümkün hale geliyor. Üstelik problemi çözdüğünüzde bot tarafından telkin de ediliyorsunuz. Zorlanırsanız da, cevabı öğrenmek bir satır kod uzağınızda. Bu arada unutmadan yazılımın dili tabi ki ingilizce ;)

“Anlatmakla olmayacak hemen gösterelim”

Gerekli uygulamalar: [R](https://www.r-project.org/) ve [R studio](https://www.rstudio.com/)

## Kurulum aşaması

![R Console | En güzel tarafı da kullanıcı adını unutmaması, bu sayede kaldığımız yerden kolayca devam edebiliyoruz.](https://cdn-images-1.medium.com/max/800/1*BiNIWQo6_0sIETBnydXNPQ.png)
*R Console | En güzel tarafı da kullanıcı adını unutmaması, bu sayede kaldığımız yerden kolayca devam edebiliyoruz.*

Kurulum aşamasını aşağıda biraz türkçeleştirmeye çalıştım ama yazılım yükleme aşaması sonrası bot geri kalan tüm komutları kullanıcıya sunuyor. Aslında sadece R modüllerini öğretmek üzere yazılmış bir paket olsa da Google Asistan veya Amazon Alexa kullanıyormuşsunuz hissiyatına kapılmamak elde değil.

<a href="https://medium.com/media/6551743abeb25707934a04eb22a7e5c8/href">https://medium.com/media/6551743abeb25707934a04eb22a7e5c8/href</a>

Tabi ki en önemli fark ses komutuyla değil, kodlarla çalışıyor olması. Özellikle Twitter ve FB messenger botlarının yazıldığı günümüzde Swirl içinde bir bot yazılması ve hatta mobil uygulama üretilmesi uzak bir gelecek olmasa gerek. (*İşte hep bunlar Black Mirror kafası!*)

## İlk dersimize başlayalım :)

![R Console | Nerden başlayacaksınız? Ne kadar öğreneceksiniz? Artık ipler sizin elinizde :)](https://cdn-images-1.medium.com/max/896/1*mBwm9VcoBxWfgP5AzoH0Cg.png)
*R Console | Nerden başlayacaksınız? Ne kadar öğreneceksiniz? Artık ipler sizin elinizde :)*

R öğrenmeye swirl ile hali hazırda gelen modüllerle başlanılabilir. Bunun yanında github üzerinde derslere yardımcı sunumlar da bulunuyor. Swirl’in verdiği linkle ders sunumlarına ulaşmak mümkün.

Derslerin içeriğine yine [Github](https://github.com/swirldev/swirl_courses#swirl-courses) sayfasından veya bu [ders listesinden](http://swirlstats.com/scn/title.html) göz atılabilir. Eğer başlangıç seviyesinde R bilginiz varsa ilk modülden başlayabilirsiniz. Bu arada bu modüller kendi içinde 10 ile 20 arasında değişen alt başlıklara ayrılmış durumda.

![R Console | Örneğin EDA modülünün 15 ayrı başlığı bulunuyor.](https://cdn-images-1.medium.com/max/903/1*h1b0PbmT7qAmAFvPNBKDog.png)
*R Console | Örneğin EDA modülünün 15 ayrı başlığı bulunuyor.*

## SwiRl modül ekleme

Var olan dersler size hitap etmeyebilir veya yukarda bahsettiğim linklerden size uygun dersler bulmuş olabilirsiniz. Swirl için bu dersleri yüklemek de çok kolay. Modül ismindeki büyük ve küçük harflere dikkat ederek aşağıdaki kod yardımıyla, swirl için yazılmış diğer derslerden de yararlanabilirsiniz.

```r
install.packages("swirl")
library(swirl)
install_course("Course Name Here")
swirl()
```

SwiRl geliştiricilerin kendi dillerinde modül eklemesine ve swirl platformunda kullanılmasına izin veriyor. Henüz Türkçe bir derse denk gelmedim. Ama Swirl ile türkçe bir R modülü , kendimden biliyorum, özellikle başlangıç seviyesindekiler için faydalı olabilir.

## SWIRL’in yanı sıra Faydalı Eğitimler & Materyaller

Hem yazılımı kullanan topluluk hem de internet ortamındaki ücretsiz kaynaklar, eğer gereken çabayı sarf ederseniz, R öğrenmeyi kolaylaştırıyor. Aşağıya hem başlangıç seviyesine hem de R kullanıcılarına hitap edecek faydalı bulduğum bazı kaynakları ekliyorum. Kolaylıklar.

**Online Ücretsiz Kitap ve Materyaller**

-   Hadley Wickam ve Garret Grolemund’un [R for Data Science](http://r4ds.had.co.nz/index.html) kitabı
-   Julia Silge ve David Robinson’ın özellikle metin madenciliği üzerine [Text Mining With R](https://www.tidytextmining.com/) kitabı
-   Burak Aydın ve meslektaşlarından Türkçe [Sosyal Bilimler R Platformu](https://bookdown.org/burak2358/SARP-TR/) kitabı
-   Sharon Machlis’den [Practical R for Mass Communication and Journalism](http://www.machlis.com/R4Journalists/)
-   R ile veri gazeteciliği yapanlar için hazırlanmış [faydalı bir liste/rehber](https://web.archive.org/web/20200221131743/https://rddj.info/)
-   Cincinnati Üniversitesi tarafından hazırlanmış [R Programlama dili için bir kılavuz](http://uc-r.github.io/basics)
-   Claus Wilke’nin [Veri Görselleştirmenin Temelleri](https://serialmentor.com/dataviz/) kitabı
-   R’ın hazırlanan görselleştirmeler için [R Graphics Cookbook](https://r-graphics.org/)
-   Kieran Healy’den R’da [Veri Görselleştirmeye Uygulamalı Bir Giriş](https://socviz.co/index.html#preface)
-   Özellikle coğrafi verilerle çalışıyorsanız, [Geocomputation with R](https://geocompr.robinlovelace.net/) kitabını önerebilirim.
-   Benzer bir kaynak [Spatial Data Science with R](https://www.rspatial.org/raster/index.html)
-   Halihazırda R kullanan ve kendini geliştirmek isteyenler için Hadley Wickam’ın [Advanced R kitabı](https://adv-r.hadley.nz/)

**Eğitimler**

-   Veri bilimci [David Robinson’un R dersleri (Ücretsiz)](http://varianceexplained.org/RData/)
-   Washington Post gazetesi veri muhabirinden [Gazeteciler için R Eğitimi (Ücretsiz)](http://learn.r-journalism.com/en/introduction/)
-   R öğrenmeye Swirl ile başladım ama datacamp.com ile devam ettim. Özel günlerde ve haftalarda indirimlerini kaçırmazsanız indirimli bir üyelik sahibi olabilirsiniz (Ücretli)

**Ek olarak**

-   R kullanan blog yazarlarının paylaşımlarını toplandığı [R-bloggers sitesi](https://www.r-bloggers.com/) de gerçekten faydalı.
-   [R Studio Cheatsheets](https://www.rstudio.com/resources/cheatsheets/)
-   Son olarak newslabturkey.org’da [R ekosistemine dair yazılarıma da göz atabilirsiniz](https://www.newslabturkey.org/author/sadettindemirel/).

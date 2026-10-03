---
title: "R ile tweet verisi nasıl çekilir ve analiz edilir?"
date: 2018-10-18
author: Sadettin Demirel
excerpt: "Twitter birçoğumuzun günlük sosyalleşme, eğlence, dünyadan haberdar olma gibi ihtiyaçlarını karşıladığı sosyal ağlardan birisi. Aynı zamanda, markaların, kamu kuruluşlarının kullanıcısı olduğu dev bir bilgi üretim,…"
thumbnail: https://cdn-images-1.medium.com/max/1024/1*hVyyXKWHskqeVxOXrMckLg.jpeg
tags_display: "Veri Gazeteciliği, Data Journalism, Data Scraping, R Programming, Rstats"
original_url: https://medium.com/verijurnali/r-ile-twitter-verisi-nasil-cekilir-analiz-edilir-9a14e3f602f9
original_source: Medium
---
![by edar on pixabay](https://cdn-images-1.medium.com/max/1024/1*hVyyXKWHskqeVxOXrMckLg.jpeg)
*by edar on pixabay*

Twitter birçoğumuzun günlük sosyalleşme, eğlence, dünyadan haberdar olma gibi ihtiyaçlarını karşıladığı sosyal ağlardan birisi. Aynı zamanda, markaların, kamu kuruluşlarının kullanıcısı olduğu dev bir bilgi üretim, dağıtım ve tüketim merkezi. Bu yapısı itibariyle gazeteciler için önemli bir haber kaynağı ve dağıtım kanalı. Fakat bunun da ötesinde Twitter, işlemeyi bilen için zengin bir veri madeni. Ve bu veri madenini kullanarak bir siyasetçinin Twitter’da sadece ne paylaştığını değil, son 6 ayda en çok hangi kelimeleri kullandığına, ne kadar etkileşim aldığına, günün hangi saati tweet attığına, diğer politikacılara oranla aldığı etkileşim oranına, tweetlerinin duygusal analizine ulaşabilirsiniz. Peki bu veri madenini işlemeye nasıl ve nereden başlamalı?

Tweet verisinin kazınması için birçok yol mevcut. Bunu [bir eklenti yardımıyla](https://chrome.google.com/webstore/detail/twitter-archiver/pkanpfekacaojdncfgbjadedbggbbphi) da yapabilirsiniz, R programlama dilini ve [R paketlerini](https://rtweet.info/index.html) kullanarak da. R programlama dilinin avantajı [daha önceki yazımda da belirttiğim gibi](/blog/r-nedir-veri-gazeteciligi-icin-nasil-kullanilir/) veri kazımadan temizlemeye, veri analizinden görselleştirmeye tüm çalışma akışında etkili bir şekilde kullanılabilmesi.

Teknik aşamaya geçmeden, tweet verisinin gelenekselin dışında, veri gazeteciliği pratiği için nasıl kullanıldığına göz atalım. Buzzfeed veri gazetecisi Peter Aldhous, [Trump’ın ve kongre üyelerinin 1 yıl boyunca paylaştığı tweetleri incelediği](https://www.buzzfeednews.com/article/peteraldhous/trump-twitter-wars) haberinde [veri analizi ve görselleştirme süreçlerinde R ve paketlerini](https://buzzfeednews.github.io/2018-01-trump-twitter-wars/) kullanmış. Aldhous haberinde Trump’ın, Demokratların ve Cumhuriyetçilerin tweetlerinde sıklıkla kullandığı kelimeleri ve atılan tweetlerin duygu analizini yapmış.

![](https://cdn-images-1.medium.com/max/766/1*U-goktQKtvzt6qSDs9N64g.png)

![By Peter Aldhous from Buzzfeed](https://cdn-images-1.medium.com/max/855/1*O8gJARfgSVhOnbZGyQCyaA.png)
*By Peter Aldhous from Buzzfeed*

## Rtweet Paketi ile Veri Kazımaya Giriş

Twitter’dan veri çekebilmek için Twitter’ın uygulama geliştiriciler ve üçüncü parti hizmetler için sunduğu API (Application Programming Interface / Uygulama Programlama Arayüzü) hizmetinden yararlanacağız. Bunu R üzerinden yapabilmek için akademisyen [Michael Kearney tarafından geliştirilmiş rtweet paketini](https://rtweet.info/index.html) kullanacağız. Teknik detaylara başlamadan hemen önce, izleyeceğimiz adımları sıralayalım:

> ***Adım 1 — Twitter geliştirici hesabına başvuru***

> ***Adım 2 — API hizmetine erişmek için kapı görevi görecek uygulama oluşturma***

> ***Adım 3 — R studio üzerinden API’a erişim***

> ***Adım 4 — Trump’ın paylaşmış olduğu son 3000 tweetin kazınması***

> ***Adım 5 — Trump’ın paylaştığı son 1000 tweetin aldığı etkileşim değerlerinin incelenmesi***

### **1 — Twitter geliştirici hesabının açılması**

Twitter üzerinden API hizmeti için uygulama oluşturma eskiye göre daha meşakkatli. Normalde [apps.twitter.com](https://apps.twitter.com/) adresinden uygulamalar oluşturarak tweet verilerini çekebiliyorduk ama Ağustos 2018 itibariyle API’a erişmek için geliştirici hesabına başvurmak zorunlu hâle geldi. Başvuru sonrasında hesabın aktive edilmesi için bir süre beklemek zorunda kalabilirsiniz.

Geliştirici hesabınız kabul edildikten sonra API hizmetlerinin sunulduğu yeni site üzerinden ilk uygulamamızı oluşturmaya başlayabiliriz.

![](https://cdn-images-1.medium.com/max/975/0*e8fySc7fJRdv51WU.png)

### **2 — API hizmetine erişmek için uygulama oluşturma**

Yukarıdaki görselin sağ üst köşesinde yer alan [“Twitter Engagement Analysis”](https://developer.twitter.com/en/apps) menüsüne tıklayarak ilk uygulamamızı oluşturabiliriz. Karşımıza çıkan sayfadan uygulama oluştur seçeneğine tıklıyoruz. Öncelikle uygulamaya bir isim veriyoruz ve uygulamanın ne amaçla oluşturulduğuna dair birkaç cümlelik bir açıklama yazıyoruz.

![](https://cdn-images-1.medium.com/max/975/0*RT26ImXowrnJpaak.png)

Web sayfa adresine twitter profil adresinizi ekleyebilirsiniz. Twitter ile giriş yapmayı işaretledikten sonra Callback URL kısmına `http://127.0.0.1:1410/` adresini ekliyoruz. R ile API’ı bağlandığımızda tarayıcı tarafından bu adrese yönlendirileceğiz.

![](https://cdn-images-1.medium.com/max/975/0*UgsCEoi4kBOdMPLn.png)

En alttaki kısma ise uygulamanın ne için kullanılacağına dair daha detaylı bir bilgi eklememiz gerekiyor. Bu kısma, uygulamayı akademik çalışmalar veya gazetecilik amaçları için kullanacağınız veya kod öğrenmek için kullandığınızı ekleyebilirsiniz.

![](https://cdn-images-1.medium.com/max/975/0*pt-cBbHD7nYPednB.png)

Uygulama detaylarını tamamladıktan sonra en önemli kısma geldik. Bu kısımda kodlar API’e erişimimizi sağlayacak. Kendi uygulamanızdaki **API Key** ve **API Secret Key’leri** bir yere not etmeniz önemli. R üzerinden uygulamaya erişmek için bu token’leri kullanacağız.

![](https://cdn-images-1.medium.com/max/975/0*4WbAd1EmCc_gEgmR.png)

Yukarıdaki görselde yer alan API key değerlerini “regenerate” seçeneğine tıklayarak değiştirebilirsiniz. Uygulamaya başkalarının erişmesini istemiyorsanız bu token’leri paylaşmamanızı öneririm.

### **3 — R Studio üzerinden API’a erişim**

R studio üzerinden API’a erişebilmek için ilk olarak rtweet, httpuv ve [tidyverse](https://www.tidyverse.org/) paketlerini kuruyoruz. İkinci adımda bu paketleri library( ) fonksiyonu ile etkinleştiriyoruz.

![](https://cdn-images-1.medium.com/max/975/0*q9RV5D-HggTXdLdB.png)

Sonraki adım en önemlisi. İlk olarak uygulamanın adını (appname), API anahtarını (key) ve API gizli anahtarını (secret) yukarıdaki görselde ve kaynak kodda olduğu gibi konsola giriyoruz. Bu aşamada API’e erişim sağladığımızı belirten boş bir tarayıcı sayfası açılmalı. R studio konsolda da bunu açık bir şekilde görebiliriz.

![](https://cdn-images-1.medium.com/max/975/0*yTYYgHcy3oFPvNWy.png)

### **4 — Trump’ın paylaşmış olduğu son 1000 tweeti kazıyalım**

Trump’ın veya bir başka Twitter kullanıcısının tavan değeri 3200 olmak üzere paylaştığı tweetleri kolaylıkla kazıyabiliriz. Bunun için aşağıdaki kodu kullanmanız yeterli

“trump\_tweets <- get\_timeline(“twitter id”, n= tweet sayısı)) **“**

![](https://cdn-images-1.medium.com/max/975/0*ABIgJEF-QmsZxqwS.png)

Peki bir Twitter kullanıcısının verisini kazıdığımızda hangi tip verilere ulaşabiliyoruz? Kazıdığımız veride Trump’ın ne zaman tweet attığı, tweetin içeriği, retweet mi yoksa alıntılı retweet mi olduğu, aldığı beğeni ve retweet sayısı, kullandığı semboller, emojiler, hashtag’ler ve web adresleri, kimi retweetlediği, kimden mention aldığı, takipçi sayısı, tweeti attığı konuma kadar 88 farklı değişken bulunuyor. Fakat bu değişkenlerin bazısı her zaman uygulanabilir olmayabiliyor. Örneğin, kullanıcılar Twitter kullanırken konum verisini açmamış olabiliyorlar.

![](https://cdn-images-1.medium.com/max/975/0*_Szgr9doInOfssKW.png)

Ve bu, sadece bir kullanıcının tweetlerini çekmek istersek elde edebileceğimiz bir veri seti. Bununla birlikte, rtweet paketi sayesinde dünyada veya herhangi bir ülkedeki hashtag analizi, tweetlerin paylaşıldığı lokasyonlar, herhangi bir kullanıcının takipçi sayısı, veyahut Trump’ın beğendiği tweetlere kadar farklı türde ve boyutta çok çeşitli verilere ulaşabiliriz.

### **5 — Trump’ın paylaştığı son 1000 tweetin aldığı etkileşim değerlerini inceleyelim**

Artık veriyi elde ettiğimize göre bir sonraki aşamaya hazırız. Öncelikle kazıdığımız veriyi Trump’ın tweet attığı saati ve aldığı beğeni sayısını dahil edecek şekilde düzenleyelim. Ve aldığı retweet ve beğeni sayısını toplayıp ikiye bölerek tweet başına aldığı etkileşim değerini hesaplayalım. Trump’ın Twitter’da aldığı etkileşimi görselleştirelim.

![](https://cdn-images-1.medium.com/max/750/0*Jw3ED6esSqI3w8Pa.png)

Görselleştirmede [ggplot2](https://ggplot2.tidyverse.org/) paketini kullanacağız. Öyle görünüyor ki Trump’ın son 1000 paylaşımında beğenilme sayıları retweet edilmesinden bir hayli fazla.

![](https://cdn-images-1.medium.com/max/975/0*R53QYSurBw4otroN.png)

Bunun dışında Trump en çok kendi tweetlerini retweet etmiş.

![](https://cdn-images-1.medium.com/max/888/0*3CKry8b8VyEHA4wF.png)

Ayrıca Ağustos — Ekim ayları içinde en çok paylaşım yaptığı gün 14 Eylül.

![](https://cdn-images-1.medium.com/max/891/0*SAYvVMUsTLx7c4t2.png)

Tweet verisi kazındıktan sonra birçok şekilde analiz edilebilir. Bu yazıda değindiklerim bunun yalnızca bir kısmı. Bu veriyle neler yapılabileceğini Veri Bilimci David Robinson’ın [şu paylaşımında](http://varianceexplained.org/r/trump-tweets/) görebilirsiniz. Buna benzer bir başka örnek için 24 Haziran seçimleri öncesi [Cumhurbaşkanı adaylarının 1 Mayıs — 22 Haziran tarihleri arasında aldıkları etkileşim oranlarını incelediğim tweet zincirine](https://twitter.com/demirelsadettin/status/1010548865030852608) göz atabilirsiniz. Bir sonraki yazıda R’ın ve [ggplot2](https://ggplot2.tidyverse.org/) (veri görselleştirme) paketlerini kullanarak [bu adayların veri setini](https://docs.google.com/spreadsheets/d/1yOs70qXgIlRTmLuGutlVscmJ4iUfrqHucGjrSIEzFM0/edit?usp=sharing) ayrıntılı bir şekilde inceleyeceğim. [dplyr](https://dplyr.tidyverse.org/) (veri manipülasyonu)

Bu analizi kendi cihazında tekrarlamak isteyenler, Twitter uygulamalarını oluşturduktan sonra, [aşağıda görünen R dosyasını indirip](https://drive.google.com/file/d/1NKKMZEk_t8MxxhAP9ef3xxN5eVx4ZF90/view) R studio programında açarak Trump’ın tweetlerini analiz edebilirler. Farklı kullanıcı adlarını deneyerek farklı analizler de yapabilirsiniz. Bunu gerçekleştirmek için yalnızca kendi uygulamanızı oluşturmanız ve kod dosyasında yer alan uygulama adını ( *appname*), API key ( *key*) ve API secret key ( *secret*) değerlerini değiştirmeniz gerekiyor. Sonrasında aşağıdaki görselde yer alan **“Run”** butonuna tıklamanız yeterli olacaktır.

![](https://cdn-images-1.medium.com/max/975/0*yFnlIIQZpa_VbLBt.png)

*Bu analizi kendi bilgisayarında yapmak isteyenlerin indirmesi gereken dosya ve yazılımlar.*

-   *R kod dosyası:* [*https://drive.google.com/open?id=1NKKMZEk\_t8MxxhAP9ef3xxN5eVx4ZF90*](https://drive.google.com/open?id=1NKKMZEk_t8MxxhAP9ef3xxN5eVx4ZF90)
-   *R studio:* [*https://www.rstudio.com/products/rstudio/download/*](https://www.rstudio.com/products/rstudio/download/)

***Bu yazı ilk olarak*** [***NewLabTurkey.org’da yayımlanmıştır.***](/blog/r-ile-tweet-verisi-nasil-cekilir-ve-analiz/)

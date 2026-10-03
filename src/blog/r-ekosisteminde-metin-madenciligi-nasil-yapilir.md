---
title: "R ekosisteminde metin madenciliği nasıl yapılır?"
date: 2019-10-16
author: Sadettin Demirel
excerpt: "Veri gazeteciliği süreçlerinde sayılar kadar metinler de niceliksel analizin bir parçası olarak kullanılıyor. Çünkü metin de ürettiğimiz, kullandığımız ve paylaştığımız bir veri. Özellikle siyasilerin konuşmaları, bir…"
thumbnail: https://www.newslabturkey.org/wp-content/uploads/2019/10/1.png
tags_display: "Alet Çantası, Veri gazeteciliği, data, dplyr, Gazetecilik"
original_url: https://newslabturkey.org/2019/10/16/r-ekosisteminde-metin-madenciligi-nasil-yapilir/
original_source: NewsLabTurkey
---
Veri gazeteciliği süreçlerinde sayılar kadar metinler de niceliksel analizin bir parçası olarak kullanılıyor. Çünkü metin de ürettiğimiz, kullandığımız ve paylaştığımız bir veri. Özellikle siyasilerin konuşmaları, bir Twitter etiketi etrafında paylaşılan tweetler veyahut devletin bir kurumu tarafından yayınlanan bir rapor gazeteciler tarafından metin madenciliği sayesinde habercilik amaçları için kullanılabiliyor. Bu saydıklarıma [BuzzFeed’in Cumhuriyetçilerin ve Demokratların söylemlerini](https://www.buzzfeednews.com/article/peteraldhous/trump-twitter-wars) analiz ettiği çalışmayı, [Trump’ın Başkanlık Konuşmasının duygusal analizini](https://emotions.periscopic.com/inauguration/), [Five Thirty Eight’in 3 milyon Rus trolün tweetlerini incelemesini](https://fivethirtyeight.com/features/what-you-found-in-3-million-russian-troll-tweets/) örnek gösterebiliriz.

Metin madenciliğini veri madenciliğinin bir alt başlığı olarak tanımlamak yanlış olmaz. Yapılan işlem normalde analiz edilemeyen yapılandırılmamış büyük metin bloglarınının belirli kompütasyonel yöntemlerle analiz edilmesi, anlamlandırılması ve metin verisinden belirli temalar, trendler, ilişkiler elde edilmesidir.

Metin madenciliği geniş bir alan. Python ve R gibi araçlarla gelişmiş ağ analizleri ve çalışmalar yapılabiliyor. Daha çok giriş niteliğine sahip olacak bu yazıda R kullanarak metin verilerinin nasıl analiz edilebileceğini ve görselleştirileceğini anlatacağım.

R ekosisteminde farklı formatlarda metinler analiz edilebiliyor. Bu ister html, ister word veya pdf formatında olsun R’ın sahip olduğu kütüphaneler bu analizi mümkün kılıyor. Bu uygulamada 2 ayrı formattaki metin verisini anlamlandırmaya çalışacağız: Trump’ın paylaştığı son 3000 tweet ve bir düz metin (txt) formatındaki Nazım Hikmet şiiri.

Başlamadan önce hatırlatmakta fayda var, veri analizi ve görselleştirme işlemlerinde [dplyr](https://www.rdocumentation.org/packages/dplyr/versions/0.7.8) ve [ggplot2](https://www.rdocumentation.org/packages/ggplot2/versions/3.2.1) kütüphanelerini kullanacağım. Bu ikisine dair [NewLabTurkey’de](https://www.newslabturkey.org/) daha öncesinde [iki](/blog/r-ekosisteminde-dplyr-ile-veri-nasil-islenir-ve/) ayrı [yazı](/blog/r-ekosisteminde-veri-nasil-gorsellestirilir/) kaleme almıştım. Bunun yanı sıra metin bloklarını parçalayıp sıklıkla kullanılan ifadelere ulaşmak için [tidytext kütüphanesin](https://www.rdocumentation.org/packages/tidytext/versions/0.2.2)i kullanacağım.

## 1\. Hazırlık aşaması: Analiz edilecek metin verilerinin hazırlanması

Hazırlık aşamasında ilk olarak aşağıdaki kodlar yardımıyla bahsetmiş olduğum kütüphaneleri Rstudio üzerinde yükleyip aktif hâle getirdim. [Rtweet](https://www.rdocumentation.org/packages/rtweet/versions/0.6.9) kütüphanesini Trump’ın tweetlerini çekmek, [wordcloud2](https://www.rdocumentation.org/packages/wordcloud2/versions/0.2.1) paketini ise çıktıları kelime bulutu olarak görselleştirmek için kullanacağım.

```r
#paketleri aktif hale getirmeden önce lütfen yükleyin (install.packages("paket ismi"))

library("tidytext") #metin verilerini bu paketle analiz edeceğiz
library("tidyverse") #dplyr, ggplot2, tidyr gibi paketleri barındırıyor
library("rtweet") #tweetleri çekmek için kullanacağız.
library("wordcloud2") #kelime bulutu görseli için
library("stopwords")
```

Twitter’dan nasıl veri çekileceğini [önceki yazılarda anlatmış olduğum](/blog/r-ile-tweet-verisi-nasil-cekilir-ve-analiz/) için bu yazıda tekrar göstermeyeceğim. Tweet verileri zaten tablo formatında yapılandırılmış olarak geldiği için şimdilik Trump’ın tweetleri bir köşede dursun. Trump’ın tweetlerini, metin verilerininin temizlenmesi ve analiz kısmında derinlemesine inceleyeceğiz.

İkinci metin verisi ise Nâzım Hikmet’in Memleketimden İnsan Manzaraları [şiirinin 1. bölümünü](http://anadolusanat.org/siir/nazim26.html) içeren bir düz metin dosyası (txt formatında). Bu dosya roman veyahut bir politikacının miting konuşması da olabilirdi. Önemli nokta bu dosyayı R’a aktarıp analiz edilebilir hâle getirmek.

Öncelikle dosyayı **read\_lines( )** komutu ile içeri aktaralım ve **nh** olarak tanımlayalım. Aşağıdaki işlemde görüldüğü üzere dosyayı içeri aktardık. R şiirdeki her dizeyi bir satır olarak tanıdı. Şiirde 530 adet dize var. Bununla beraber noktalama işaretleri ve boşluklar da görülüyor.

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/1.png)

Sonraki adımda veriyi temizlemeye hazır hâle getirmek için bu satırları bir düz yazı gibi birbirine bitiştirip bir tablo (tibble) formatında kaydedeceğiz.

Aşağıda olduğu gibi ilk olarak **paste0()** komutu ile dizeleri birbirine bağladık. Hemen sonrasında **nh\_tidy** ögesini tablo formatında **nh\_tablo** olarak kaydettik. Artık veri temizleme aşamasına geçebiliriz.

```r
nh_tidy <- paste0(nh, collapse = " ")
nh_tablo <- tibble(nh_tidy)
str(nh_tablo)
## classes ‘tbl_df’, ‘tbl’ and 'data.frame':    1 obs. of  1 variable:
##  $ nh_tidy: chr "Haydarpasa garinda 1941 baharinda         saat on bes. Merdivenlerin üstünde günes
```

## **2\. Temizleme ve analiz aşaması**

Hatırlarsak ilk olarak Trump’ın tweetlerini çekmiştik. Şiir metninden önce Trump’ın tweetlerini kelimeler hâline getirip gereksiz ifadelerden ayıralım.

Trump’ın tweetlerini **trumptweets** ifadesine tanımladım. Bu dosyayı [GitHub’a](https://github.com/sadettindemirel/metin_veri_analizi/blob/master/trumptweets.rds) ekledim. Bu uygulamayı tekrarlamak isteyenler veriyi indirip bu yazıdaki kodlar yardımıyla kendi cihazlarında tüm işlemleri tekrarlayabilirler.

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/2.png)

Sadece tweet metniyle ilgilendiğimiz için ikinci adımda 5. sütunda yer alan tweet verisini filtreleyerek trump ögesine kaydedelim. **head( )** komutu ile ilk 6 tweetinin metnine bir göz atalım.

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/3.png)

Trump’ın ilk 6 tweetine bakarsak görülüyor ki gereksiz noktalama işaretleri, (burada göze çarpmasa da) linkler, rakamlar ve bir anlam ifade etmeyen **the, a, of** gibi kelimeler var. Metin verilerinin analizinde bu tip ifadeler gereksiz olarak görülür. Bu nedenle sırasıyla şu işlemleri yapacağız:

Aşağıdaki kod bloğu karmaşık görülebilir, bunun nedeni tüm temizleme aşamalarını zincir operatörü (**%>%**) ile birbirine bağladım. Her işlem sonrası eklediğim zincir operatörü işlemde bir sonraki aşamaya geçtiğimizi gösteriyor.

```r
trumptidy <- trump %>%

filter(!str_detect(text, '^"')) %>%

mutate(text = str_replace_all(text, "https://t.co/[A-Za-z\\d]+|&amp;", ""))%>%

unnest_tokens(word, text) %>%

filter(!word %in% stop_words$word,
        str_detect(word, "[a-z]"))
```

Hatırlarsak en son tweetlerin bulunduğu sütunu trump ifadesine tanımlamıştım. Aşağıdaki tüm işlemi bu trump adını verdiğimiz veri seti üzerinde yapacağız. Fakat öncelikle karışıklık çıkmaması için **trumptidy** adlı yeni bir öge oluşturarak yapacağımız işlemi buna tanımlayalım (**<-**).

```r
trumptidy <- trump %>%
...
```

İlk adım yani filtreleme aşamasında text sütununda yer alan tırnak işaretlerini ortadan kaldırdık. Bunu filter komutu içerisinde **str\_detect()** fonksiyonu kullanarak yaptık. **str\_detect( )** fonksiyonu içerisinde önce işlemi yapacağımız değişkenin ismi (uygulamada bu text oluyor) ve bu değişken içinde ne arıyorsak onu ifade eden bir argüman kullanmamız gerekiyor (bu uygulamada tırnak işaretlerini aradık). Son olarak tırnak işaretlerini metin verisinden çıkarmak için **str\_detect()** fonksiyonunun başına ünlem işareti (!) ekledik. Yani kısaca R’a ünlem işaretlerini bul ve veri setinden temizle komutu verdik.

```r
trumptidy <- trump %>%
  filter(!str_detect(text, '^"')) %>%
...
```

İkinci adımda ise tweetlerde genelde sonlarda yer alan linklerden kurtulmak için mutate komutu içerisinde **str\_replace\_all** fonksiyonunu kullandık. Aslında bu aşamada Excel’den aşina olduğumuz bul ve değiştir işlemini gerçekleştirdik. R’a önce “**https://t.co/\[A-Za-z\\\\d\]+|&amp;**” linkleri bulmasını ve boşluk **(“”)** ile değiştirmesi komutunu verdik. Bu sayede text sütunundaki link uzantıları da temizlenmiş oldu.

```r
trumptidy <- trump %>%
  filter(!str_detect(text, '^"')) %>%
  
  mutate(text = str_replace_all(text, "https://t.co/[A-Za-z\\d]+|&amp;", "")) %>%
...
```

Üçüncü adımda ise cümleleri kelimeler hâline getireceğiz. Metin madenciliğinde buna tokenization adı veriliyor. Bu uygulamada [**tidytext**](https://www.rdocumentation.org/packages/tidytext/versions/0.2.2) paketini kullandığım için bu işlemde **unnest\_tokens** komutunu kullanacağız. **Unnest\_tokens** komutu içerisinde öncelikle bu işlem sonrasında ortaya çıkan kelimeleri (word) tanımlayacak bir değişken ismi (**word**), sonrasında kelimelere bölmek istediğimiz metin bloguna karşılık gelecek bir başka değişken (**text**) kullanıyoruz. Yani komut, trump veri setinin **text** değişkeni içindeki tweetlerini sözcüklere bölüyor ve bu yeni çıktıyı **word** veya bizim belirleyeceğimiz bir ögeye kaydediyor.

```r
trumptidy <- trump %>%
  filter(!str_detect(text, '^"')) %>%
  mutate(text = str_replace_all(text, "https://t.co/[A-Za-
z\\d]+|&amp;", ""))%>%

  unnest_tokens(word, text) %>%
...
```

Dördüncü ve son aşamada ise gereksiz ifadelerden ve rakamlardan kurtulmak için yine filter komutunu kullanalım. Bu aşamada **stop\_words** denilen İngilizce gereksiz ifadelerden oluşan bir veri setini asıl veri setini temizlemek için kullanacağız. Bu veri [tidytext](https://www.rdocumentation.org/packages/tidytext/versions/0.2.2) paketiyle birlikte geliyor.

**Filter** içerisindeki ilk işlemde R’a **word** sütunundaki kelimeler içinde gereksiz ifadeler (**stop\_words)** olup olmadığını sorduk. **word** ögesinin önündeki ünlem **(!)** işareti bu işlemde eğer gereksiz ifadeler varsa ayıklanacağı anlamına geliyor. **Filter** komutu içerisindeki bir diğer işlemde ise dikkat ederseniz başında ünlem bulunmayan bir **str\_detect** fonksiyonu kullandık. **Str\_detect** içinde R’a sadece ve sadece harflerden oluşan ifadeleri tutmasını geri kalan (eğer kalmışsa) özel karakterler ve rakam içeren verileri ayıklamasını söyledik.

```r
trumptidy <- trump %>% 
  filter(!str_detect(text, '^"')) %>%
  mutate(text = str_replace_all(text, "https://t.co/[A-Za-z\\d]+|&amp;", ""))%>%
  unnest_tokens(word, text, token = "tweets") %>%

  filter(!word %in% stop_words$word,     

         str_detect(word, "[a-z]"))
```

Ve sonuç olarak aşağıdaki veriyi elde ettik: 3 bin tweetin 35.884 adet harfe bölündüğü bir veri seti. Bu aşamadan sonra hangi kelimenin ne sıklıkla kullanıldığını hesaplamak çok kolay. Artık elimizdeki veri setinin rakamlardan oluşan bir veriden herhangi bir farkı yok.

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/4.png)

Şimdi Trump’ın hangi kelimeleri ne kadar kullandığına göz atalım. **Count ()** komutu ile hesapladığımızda Trump’ın kendi ismi ve konumunu hariç tutarsak vatandaş, demokratlar, haber, ülke, sahte, medya ve Amerika gibi ifadeleri sıklıkla kullandığını görüyoruz.

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/5.png)

Trump’ın sık kullandığı tek bir ifadeden oluşan kelimeleri bulduk. Peki ya söz öbekleri, tamlamalar? Metin blogu sadece tek kelimelik ifadelerden oluşmuyor. Tidytext kütüphanesinin buna da bir çözümü var.

## **2a. N-gram ile sık kullanılan söz öbeklerini inceleyelim**

[N-gram yöntemi](https://www.tidytextmining.com/ngrams.html) ile arka arkaya gelen birden fazla ifadenin ne sıklıkla kullanıldığını bulabiliriz. Bu yöntem ile tweetlerde, siyasilerin konuşmalarında, basın açıklamalarında, kitaplarda vb. metinlerde tekrar eden metinsel bir örüntü yakalayabiliriz.

Aşağıdaki kod yığınında öncekine benzer ama biraz farklı bir işlemle söz öbeklerine de ulaşabiliyoruz. Ama bu işlem biraz daha zahmet istiyor. Söz öbeklerine ulaştığımızda onları temizlemek için iki ayrı sütun hâline getirmemiz ve gereksiz ifadeleri ayıkladıktan sonra tekrar birleştirmemiz gerekecek. Şimdi adım adım giderek öncelikle söz öbeklerine ulaşalım.

İlk iki adım önceki işlemlerle aynı görevi görüyor. Metin verisindeki tırnak işaretlerini ve link uzantılarını ayıklamamızı sağlıyor. Üçüncü adımda en önemli nokta **unnest\_tokens** komutu. Komut içinde “**token**” adında yeni bir argüman kullanıyoruz. **token**‘i **ngrams**‘a eşitleyerek R’a metin verisinde n-gram yöntemini kullanacağımız ve “**n**” argümanını da **2′**ye sabitleyerek iki kelimeden oluşacak söz öbeklerini elde etmek istediğimizi belirtiyoruz.

```r
trump_bigrams <- trump %>%
  filter(!str_detect(text, '^"')) %>%
  mutate(text = str_replace_all(text, "https://t.co/[A-Za-z\\d]+|&amp;", "")) %>%

  unnest_tokens(bigram, text, token = "ngrams", n = 2)
```

Eğer dilersek n değerini 3’e veya 4’e çıkarıp daha fazla öbekten oluşan ifadelere de ulaşabiliriz. Yukarıdaki işlemde tüm kodu **trump\_bigrams** adlı ögeye kaydettik, şimdi bu veri setine göz atalım.

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/6.png)

Görüldüğü üzere veri seti iki kelimelik söz öbeklerinden oluşuyor. **Trump\_bigrams’**daki söz öbeklerini **count()** komutu ile hesapladığımızda aşağıdaki görseldeki gibi bazı gerekesiz ifadeler göze çarpıyor. **N-gram** analizinde bu ifadeleri ayıklamak için öncelikle **bigram** sütununu her sözcük bir değişkene **(word1, word2)** karşılık gelecek şekilde ikiye ayıracağız.

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/7.png)

Aşağıdaki işlemde bir önceki kod yığınında olduğu gibi her işlem **zincir operatörü (%>%)** ile bir sonraki aşamaya geçiyor. Öncelikle Trump’ın söz öbeklerinde oluşan **trump\_bigrams** veri setini **trump\_bigrams\_tidy** olarak tanımlayalım ve işleme zincir operatörü ile başlayalım

```r
trump_bigrams_tidy <-  trump_bigrams %>%
...
```

İlk adımda **bigram** sütununundaki öbekleri sözcüklere ayırmak için **seperate** fonksiyonunu kullanacağız. **Seperate** fonksiyonu içerisinde önce ayırmak istediğimiz sütunun ismi (**bigram**) ve hemen sonrasında işlem sonrası ortaya çıkacak yeni sütunların ismini **c(“word1”, “word2”** ) ekliyoruz. Son olarak da **bigram** sütununu sözcükler arasındaki boşlukları kullanarak ayırmak istediğimiz için **sep** argümanını **boşluğa (” “)** eşitliyoruz. Eğer söz öbekleri arasında başka noktalama işareti bulunmuş olsaydı **sep** argümanını ona eşitleyecektik.

```r
trump_bigrams_tidy <-  trump_bigrams %>%

  separate(bigram, c("word1", "word2"), sep = " ") %>%
...
```

İkiye ayırma işlemi tamamlandı. İkinci adımda ise ortaya çıkan iki değişken veya sütundan (**word1 ve word2**) gereksiz ifadeleri, **stopwords** kullanarak temizleyeceğiz. Daha önceki işlemde olduğu gibi **filter** fonksiyonu içerisinde değişkenler içinde (**word1, word2**) gereksiz ifadeler olup olmadığını dahil operatörü ( **%in%)** ile sorguluyoruz. Tabii bunu yaparken değişken isimlerinin önüne **ünlem işareti (!)** ekliyoruz. Bu eğer değişkenlerde gereksiz ifadeler varsa filter fonksiyonu ile onları ayıkla anlamına geliyor.

```r
trump_bigrams_tidy <-  trump_bigrams %>%
  separate(bigram, c("word1", "word2"), sep = " ") %>% 

  filter(!word1 %in% stop_words$word) %>% 

  filter(!word2 %in% stop_words$word) %>% 
...
```

Değişkenlerimizi gereksiz ifadelerden temizledikten sonra yapmamız gereken bu iki sütunu birleştirmek. Bu işlemi **unite()** fonksiyonu ile gerçekleştireceğiz. **Unite ()** fonksiyonu **seperate()**‘in tam tersi. Birleştirme işlemine işlem sonrası ortaya çıkacak birleşik sütunun ismi **(bigram)** ile başlıyoruz. Hemen sonrasında birleştirilecek iki sütunu arka arkaya virgülle ayırarak ekliyoruz. Son olarak birleşik sütunda sözcükler arasında ne bulunmasını belirtmek için **sep** argümanını boşluğa **(” “)** eşitliyoruz. Evet artık işlem tamam.

```r
trump_bigrams_tidy <-  trump_bigrams %>%
  separate(bigram, c("word1", "word2"), sep = " ") %>%
  filter(!word1 %in% stop_words$word) %>%
  filter(!word2 %in% stop_words$word) %>%

  unite(bigram, word1, word2, sep = " ")%>%
```

Şimdi sıra kelime öbeklerini hesaplamakta, bakalım **trump\_bigrams**‘daki gereksiz ifadeleri ortadan kaldırdık mı? Bu işlemi yine bir zincir operatörü ve **count ()** fonksiyonu kullanarak yapalım. **Count** içinde hesaplamayı yapacağımız sütunun ismini ve sort argümanını TRUE’ya eşitleyerek gerçekleştirebiliriz. **Sort =TRUE** argümanı kelime sayısını çoktan aza doğru sıralamamızı sağlıyor.

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/8.png)

Sütundaki kelime öbeklerini hesapladığımızda hem gereksiz ifadelerden kurtulduğumuzu hem de Trump’ın sıklıkla kullandığı ifadeleri görebiliriz.

Sonuç olarak yaptığımız temizleme ve analiz işlemleriyle hem Trump’ın sıklıkla kullandığı kelimeleri (**trumptidy)** hem de söz öbeklerini (**trump\_bigrams\_tidy**) elde ettik.

## **2b. Türkçe metin verilerinin analizi**

Görselleştirme aşamasına geçmeden önce yazının başında içeri aktardığımız şiirdeki metin verilerini de analiz edelim. Hatırlarsak düz metin (txt) formatındaki dosyayı R’a aktarmış, şiirdeki dizeleri birbirine yapıştırarak **nh\_tablo** adında veri tablosu hâline getirmiştik. O hâlde Trump’ın tweetlerine yaptığımız gibi bu şiirde de sıklıkla kullanılan kelimelere ulaşalım.

Bu işlemde Trump’ın tweetlerini analiz ederken kullandığımız kodlara benzer ama daha sade bir işlem yapacağız. Benzer bir şekilde önce **nh\_tablo** verisini yeni bir ögeye (**nh\_veri**) tanımladık ve zincir operatörü (**%>%** ) ile işleme devam ettik. Önce metin verisindeki tırnak işaretlerinden kurtulduk. Bir sonraki adımda ise **unnest\_tokens** fonksiyonu yardımıyla şiirdeki cümleleri kelimeler hâline getirdik.

```r
nh_veri <- nh_tablo %>%
  
  filter(!str_detect(nh_tidy, '^"')) %>%
  
  unnest_tokens(word, nh_tidy) %>%

  filter(!word %in% stopwords(language ="tr",source ="stopwords-iso"))
```

Üçüncü adımda şiirdeki gereksiz ifadeleri ayıklayacağız. Bunlar Türkçede bir anlam ifade etmeyen **şey, ama** vb ifadeler. Mesele şu ki, tidytext paketi sadece İngilizce için üretilmiş bir metin madenciliği paketi. Bu nedenle Türkçe gereksiz ifadelerin yer aldığı bir “[stopwords](https://www.rdocumentation.org/packages/stopwords/versions/1.0)” kütüphanesi kullanacağız. Hatırlarsanız hazırlık kısmında bu paketi zaten aktif hâle getirmiştik (**library(stopwords**).

Bu son adımda **filter** fonksiyonu içerisinde **!word %in% stopwords(language =”tr”,source =”stopwords-iso”** bir kod kullanıyoruz. Bu ifade de Trump’ın tweetlerinin temizlenmesinde kullandığımız gibi **ünlemle (!)** başlıyor. Burada önemli fark stopwords() komutu içerisinde önce dil (language) ve kaynağı (source) ile ilgili ifadeleri.

```r
nh_veri <- nh_tablo %>%

  filter(!str_detect(nh_tidy, '^"')) %>%

  unnest_tokens(word, nh_tidy) %>%

  filter(!word %in% stopwords(language = "tr",source ="stopwords-iso"))
```

İşlem sonrası **nh\_veri**‘deki kelimeleri hesaplayalım. Görüldüğü üzere “**düşündü, yaşında, usta**” gibi kelimeler şiirde daha sık kullanılmış. Tabii şiir kısa bir metin olduğu için önemli çıktılar elde edemedik ama 300 sayfalık bir romandan muhtemelen daha zengin bulgular, trendler ortaya çıkacaktır.

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/9.png)

## 3\. Metin Verilerini Görselleştirelim

Buraya kadar olan işlemlerde metin bloklarını kelimeler hâline getirdik. Elimizde Trump’ın sıklıkla kullandığı kelimeler (**trumptidy**) ve söz öbekleri (**trump\_bigrams\_tidy**) var. Bu veri setlerini R ile görselleştirebilir veyahut dışarı aktarıp alternatif görselleştirme araçları kullanabiliriz.

R ekosisteminde bu verileri farklı şekillerde görselleştirebiliriz ama bu uygulamada temele bağlı kalarak verileri çubuk grafik ve kelime bulutu olarak görselleştirelim. Öncelikle **[ggplot2](https://www.rdocumentation.org/packages/ggplot2/versions/3.2.1)** ile hem söz öbeklerinin hem de kelimelerin kullanılma durumunu görselleştirelim. (ggplot2 yazımda bu kısmı ele aldığım için ayrıntılı koda yer vermeyeceğim ama aşağıdaki görsellerin detaylı koduna GitHub’a eklediğim [kod dosyasından](https://sadettindemirel.github.io/metin_veri_analizi/kodlar2.nb.html) ulaşabilirsiniz.)

Trump son 3 bin tweetinde en çok “halk, demokratlar, haber, ülke, sahte ve medya” gibi kelimeler kullanmış.

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/trump2.png)

N-gram yöntemiyle elde ettiğimiz söz öbeklerinde Trump’ın diline dair daha iyi bulgulara ulaşıyoruz.

Trump’ın en çok kullandığı söz öbekleri **fake news** – sahte haber. Sonrasında seçim kampanyasının Rusya ile ilişkisinin araştırıldığı dönemde sıklıkla kullandığı **witch hunt** – cadı avı ifadesi göze çarpıyor. Yine ABD’nin güney sınırına yapacağı duvar ve güneyden gelen göçmenlere dair kullandığı **southern border** (güney sınırı) ifadesi yer alıyor. Buna benzer olarak Joe Biden için **Sleepy Joe**, Hillary Clinton için ise **Crooked Hillary** ifadelerini kullandığını görüyoruz. Kısaca Trump’ın tweetlerinde ABD’de meydana gelen olayların yanı sıra (Hurricane Dorian) Trump’ın söylemsel diline ve politikalarına dair bulgular da yer alıyor

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/trump3.png)

Metin verisi söz konusu olunca çubuk grafiğe bir alternatif olarak R’da wordcloud2 kütüphanesini kullanarak kaliteli kelime bulutları da yapabiliriz. Bunun için öncelikle [wordcloud2](https://www.rdocumentation.org/packages/wordcloud2/versions/0.2.1) paketini kullanacağız.

Kelime bulutu oluşturmak için **[wordcloud2()](https://www.rdocumentation.org/packages/wordcloud2/versions/0.2.1)** fonksiyonu kullanacağız. Kullanacağımız verinin iki sütundan oluşması için sütunlardan ilkinin kelimeleri ikincisinin ise kelimelerin tekrar sayısını temsil etmesi gerekiyor. Wordcloud2 komutu kelimeyi tekrar edilme sayısına oranla kelime bulutunda görselleştiriyor.

Aşağıdaki ilk denememizde önce veri (**data**), sonra renk (**color**), arka plan (**backgroundColor**) ve metnin boyutunu (**size**) belirledik. Bu sayede alttaki kelime bulutunu elde ettik.

```r
wordcloud2(data = trump_tidy_count,
           color = "random-light", 
           backgroundColor = "grey25",
           size =0.6)
```

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/kb1.png)

Biraz karmaşık görünüyor olabilir. Wordcloud ile daha hoş kelime bulutları üretebiliriz. İlk kelime bulutunun karmaşık görünmesinin nedeni kelimelerin rotasyon açısından bir düzensizlik içinde olması. İkinci pratikte bunu değiştirelim.

Wordcloud2 komutu içerisinde renk ve arka plan ögelerini belirlemek zorunlu değil. Belirlenmediği durumlarda fonksiyon arka planı beyaz olarak alıyor. Renkleri ise belirli bir sebebe bağlı olmaksızın her işlemde yeniden atıyor. Bu işlemde en önemli nokta veri seti (data). Kelimelerin düzensiz rotasyonunu düzenlemek için **minRotation** ve **maxRotation** değerine tek bir ifadeye eşitlersek bu düzensizlikten kurtuluyoruz. (Bu arada -pi/6 yerine rakamlar da kullanılabilir. Aslında -pi/6 değeri de -0.52 değerine karşılık geliyor).

```r
wordcloud2(data = trump_tidy_count,
           minRotation = -pi/6, 
           maxRotation = -pi/6, 
           rotateRatio = 1, 
           size = 0.7)
```

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/kb2.png)

Aynı işlemi Trump’ın sıklıkla kullandığı söz öbeklerine uyguladığımızda hangi öğeleri ne sıklıkla kullandığı rahatlıkla görülebiliyor.

```r
wordcloud2(data = trump_wordcloud,
           minRotation = -pi/6, 
           maxRotation = -pi/6,
           rotateRatio = 1, 
           size = 0.7)
```

![](https://www.newslabturkey.org/wp-content/uploads/2019/10/fake_news.png)

Eğer R’ın sunduğu görselleştirme olanaklarından memnun değilsek elde ettiğimiz verileri daima dışarı aktarıp R dışında görselleştirme araçları da kullanabiliriz.

R ekosisteminde metin madenciliği nasıl yapılır konulu bu yazımda R kullanarak metin verilerinin nasıl ayıklanıp, analiz edilip, görselleştirilebileceğini anlatmaya çalıştım. Özellikle metin madenciliğine giriş niteliğinde, yüzeysel bir yazı oldu. Bir sonraki sefere metin verileri üzerinde duygu analizi meselesine eğilmeyi düşünüyorum.

* * *

Son olarak aşağıya eklediğim linklerden kullandığım kodlar, veri seti ve önemli kaynaklara ulaşabilirsiniz.

-   [Kullandığım R kodları](https://github.com/sadettindemirel/metin_veri_analizi)
    
-   [Trump’ın Tweetleri](https://github.com/sadettindemirel/metin_veri_analizi/blob/master/trumptweets.rds)
    
-   [Tidytext paketi ile metin madenciliği kitabı](https://www.tidytextmining.com/)
    
-   [Dillere göre gereksiz ifadeler listesi](http://stopwords.quanteda.io/)
    
-   Farklı formatlardaki verileri R’a aktarmak için hazırlanan [bir kılavuz.](https://cran.r-project.org/web/packages/readtext/vignettes/readtext_vignette.html)

---
title: "R ekosisteminde dplyr ile veri nasıl işlenir ve analiz edilir?"
date: 2018-10-27
author: Sadettin Demirel
excerpt: "R, bugün akademiden, şirketlere, istatikçilerden, gazetecilere birçok meslek alanında özellikle veri işleme ve analiz etme amaçlı olarak kullanılıyor. R yazılımını bu konuda özel kılan yegâne şey açık kaynak bir araç…"
thumbnail: https://cdn-images-1.medium.com/max/1024/0*Srg4Ex1b0eKt46QY
tags_display: "R Programming, Dplyr, Veri Analiz, Veri Gazeteciliği"
original_url: https://medium.com/verijurnali/r-ekosisteminde-veri-analizi-abdd3fc75493
original_source: Medium
---
R, bugün akademiden, şirketlere, istatikçilerden, gazetecilere birçok meslek alanında özellikle veri işleme ve analiz etme amaçlı olarak kullanılıyor. R yazılımını bu konuda özel kılan yegâne şey açık kaynak bir araç olduğu için kullanıcıları tarafından geliştirilen kapsamlı paketlere sahip olması. Bunlardan birisi olan [Dplyr](https://dplyr.tidyverse.org/), R evreninde veri işlemeyi ve veri analizi sürecini kolaylaştıran ve en çok kullanılan paketlerden birisi. Peki dplyr tam olarak nedir? Gazetecilerin hangi işine yarar? Veri işleme ve analizinde nasıl kullanılır?

Dplyr’i, sözlük anlamıyla “veri işlemenin temel prensipleri” veya “veri işleme grameri” olarak çevirebiliriz. Hadley Wickham tarafından geliştirilen R’da sıklıkla kullanılan paketlerin koleksiyonundan oluşan [tidyverse](https://www.tidyverse.org/) evreninin bir parçası.

![](https://cdn-images-1.medium.com/max/1024/0*FFT861xYMadRX-0_.png)

Veri biliminde ortak bir felsefe, dil ve veri yapısı geliştirmeyi amaçlayan bu paket, hem R kullanıcılarını önemli bir zahmetten kurtarıyor hem de R öğrenmeye yeni başlayanların kolaylıkla kavrayacağı yeni bir çalışma akışı sunuyor. Veri analizi ve veri işleme süreçlerinde bu çalışma akışının nasıl kullanıldığını daha önce kazıdığım “ [Cumhurbaşkanı Adaylarının Tweetleri](https://drive.google.com/open?id=1uYIXO73Evv9oSI7NBC8hqOnrIRJCWh-h) “ veri setini kullanarak göstermeye çalışacağım. Ama öncelikle RStudio’da veri setini nasıl içeri aktaracağımıza ve dplyr’ın temel prensiplerine bir göz atalım.

### RStudio’da Veri Setini İçeri Aktarma

Görseli net görüntüleyemiyorsanız, [şu linkten ulaşabilirsiniz.](https://gfycat.com/gifs/detail/PleasantGoodnaturedAmericanredsquirrel) Görselde görüldüğü üzere, veri seti içeri aktarıldığında R, cbs\_data isimli bir nesne olarak tanımladı. Bunu **<-** işareti ile gerçekleştirdik. **<-** sembolü R evreninde eşittir (**\=**) işareti anlamına geliyor. Tanımladığımız RStudio veri setini **View()** fonksiyonuyla tablo formatında önizleyebiliyoruz.

![](https://cdn-images-1.medium.com/max/906/0*wk4ok9TRrkkOEnBH.png)

Veri setini içeri aktardığımıza göre dplyr ve tidyverse paketlerini kurabiliriz.

```r
install.packages("dplyr")
install.packages("tidyverse")
library(dplyr)
library(tidyverse)
```

Ayrıca verideki değişkenleri tablo formatında değil de R konsolda gözlemlemek için **glimpse(cbs\_tweets)** kodunu kullanabilirsiniz.

R birçok veri formatını (csv, xls, spss, tsv) destekliyor. Bu verileri içeri aktarmak için birçok paket de mevcut ama konu başka bir yazının konusu olacak kadar kapsamlı. Veri setimizi içeri aktardığımıza göre R’da veri manipülasyonunun temel prensiplerine geçebiliriz.

## Dplyr’ın Temel Prensipleri

Dplyr’a gramer denmesinin sebebi, veri setlerinin düzenlenmesi, filtrelenmesi, sıralanması ve belirli değişkenlerin hesaplanmasını mümkün kılan 6 ayrı fiile (fonksiyona) sahip olması. Bunlar: select(), mutate(), filter(), arrange(), summarize() ve group\_by(). R programlama dilini öğrenmek bu fiilleri kullanmaktan geçiyor. Ama öncelikle veri tablosunun nelerden oluştuğuna bir göz atalım.

![](https://cdn-images-1.medium.com/max/1008/0*ZTpz7BbQ9y4iw8gS.png)

Üzerinde çalışacağımız veri seti:

![](https://cdn-images-1.medium.com/max/911/0*LOeNsYJ4U2_d_XGN.png)

Yukarıdaki model tabloyu referans alarak dplyr fiillerinin ne işine yaradığını adım adım elimizdeki CB adaylarının tweet verisini kullanarak keşfedelim.

### **select()**

select() fiili veri tablosundaki değişkenleri seçebilmemizi sağlıyor. Bazen veri tablosundaki tüm değişkenler işimize yaramayabiliyor. Bunu yapabilmek için öncelikle parantez içinde veri setinin tanımlı olduğu isim (cbs\_tweets) ve değişkenlerin isimlerini yazalım.

```r
select(cbs_tweets, aday, metin)
```

![](https://cdn-images-1.medium.com/max/795/0*dZQdhNt3IH_yqqZS.png)

Aynı işlemi değişkenlerin sütun numaralarını kullanarak da yapabilirdik, sonuç değişmezdi. Veri tablosunda aday değişkeni 1.sütunda, metin değişkeni ise 3. sütunda yer alıyor. O hâlde aşağıdaki kodda olduğu gibi select() ile değişken isimleri yerine sütun numaralarını kullanarak da işlem yapabiliriz.

```r
select(cbs_tweets, 1, 3)
```

Ayrıca değişkenlerin seçilmesinde sütun numaralarının yanı sıra sayı aralıkları da kullanılabiliyor.

```r
select(cbs_tweets, 1,4:6)
```

Şimdi gelelim her fiilin sonunda yapacağımız pratiğe:

**Pratik 1:** CB tweet verisinden sadece **aday**, **tarih**, **cihaz**, **beğenme**, **retweet** ve **takipçi sayısı** değişkenlerini seçelim.

```r
select(cbs_tweets, aday, tarih, cihaz, begenme, retweet, takipci_sayısı)
```

![](https://cdn-images-1.medium.com/max/720/0*_8qZ0moYU_SvQETw.png)

Bu arada önemli bir not: Buraya kadar yaptığımız işlemlerden hiçbiri ilk baştaki veri setini (cbs\_tweets) değiştirmiyor. Çünkü yaptığımız işlemi tanımlamadık. Eğer tanımlamak istersek yapmamız gereken şu:

```r
yeni_cbs_tweets <- select(cbs_tweets, aday, tarih, cihaz, begenme, retweet, takipci_sayısı)
```

### **mutate()**

Mutate() ile elimizdeki değişkenleri kullanarak yeni değişkenler oluşturuyoruz. Örneğin, CB adaylarının beğenme ve retweet sayılarını birbirinden çıkartalım. Yapmamız gereken select() fonksiyonunda dolduğu gibi önce veri setini, sonrasında eklemek istediğimiz değişken ve değişkenin tanımlı olduğu analizi ekliyoruz.

```r
mutate(cbs_tweets, fark = begenme - retweet)
```

Mutate’i kullanarak dört işlem kolaylıkla yapılabilir: toplama (+), çıkarma (-), çarpma (\*), bölme (/). R’ın istatistikçiler tarafından kullanıldığını hesaba katarsak bu işlemler buz dağındaki kar tanesi gibi kalıyor. Gelelim yapacağımız ikinci pratiğe.

**Pratik 2: yeni\_cbs\_tweets** veri setindeki tüm adayların **beğenme** ve **retweet** değerlerini toplayıp 2'ye bölelim ve çıkan sonucu **takipçi sayısına** bölerek etkileşim değerini hesaplayalım. Bu analiz kısaca Twitter’da takipçi sayısına oranla etkileşim değerinin artacağı korelasyonuna dayanıyor.

R’a dönersek, daha öncesinde **yeni\_cbs\_tweets** tanımlamıştık. **mutate()** ile aynı işlemi **yeni\_cb\_tweets** verisiyle tekrarlayalım ama bu sefer yaptığımız işlemi yine aynı isimle kaydedelim.

```r
yeni_cbs_tweets <- mutate(yeni_cbs_tweets, etkilesim_degeri = (begenme+retweet/2)/takipci_sayısı View(yeni_cbs_tweets)
```

![](https://cdn-images-1.medium.com/max/789/0*68jVIPMRcodMqn-q.png)

Kısaca mutate() fiili ile çeşitli hesaplamalar yaparak yeni değişkenler oluşturuyoruz.

### **filter()**

Filter() fiili adı üzerinde değişkenleri belirli kriterlere göre filtreliyor. Excel’in filtreleme özelliğinden bir farkı yok. Örneğin, **cbs\_tweets** veri setinde iPhone kullanılarak paylaşılan tweetleri görüntüleyelim.

```r
filter(cbs_tweets, cihaz == "iPhone")
```

![](https://cdn-images-1.medium.com/max/732/0*JetBQjlHcBIqYwvW.png)

Eğer filtreleyeceğimiz değişkendeki değerler sayısal bir veriden oluşmuyorsa tırnak(“”) eklemeliyiz. Eğer rakamsa buna gerek kalmıyor. Aynı zamanda büyüktür (>) ve küçüktür (<) sembolleriyle de filtreleme yapılabiliyor. Örneğin 100 binden fazla beğeni alan tweetlere göz atalım.

```r
filter(cbs_tweets, begenme >100000)
```

![](https://cdn-images-1.medium.com/max/740/0*0eZieS18z27nwLUC.png)

**Pratik 3: yeni\_cbs\_tweets** verisinden Temel Karamollaoğlu ve Doğu Perinçek’in tweetlerini çıkartalım.

Aday sütunundaki veriler karakter verisi olduğu için değişkende kalmasını istediğimiz değerleri tırnak içinde **c(*“aksener”, “demirtas”, “erdogan”, “ince”*)** filterfiilininiçine ekliyoruz. Bunu **%in%** dahil sembolünü kullanarak gerçekleştiriyoruz.

```r
yeni_cbs_tweets <- filter(yeni_cbs_tweets, aday %in% c("aksener", "demirtas", "erdogan", "ince"))
View(yeni_cbs_tweets)
```

![](https://cdn-images-1.medium.com/max/761/0*0CXlBOdEzgPMRiTK.png)

### **arrange ()**

Arrange fiili veri setindeki sütunların büyükten küçüğe, A’dan Z’ye veya tam tersi sıralamada kullanılıyor. Örneğin, siyasetçilerin tweetlerini beğeni alma durumuna göre sıralayalım.

```r
arrange(cbs_tweets, begenme)
```

**arrange()** fiili varsayılan olarak sayısal verileri küçükten büyüğe, karakter verilerini ise alfabetik olarak sıralıyor. Tam tersini yapmak için sıralamak istediğiniz değişkeni **desc()** argümanı içinde kullanmamız yeterli.

```r
arrange(cbs_tweets, desc(begenme))
```

**Pratik 4:** yeni\_cbs\_tweets verisindeki aday sütununu alfabetik olarak sıralayalım ve işlemi aynı veri setine kaydedelim.

```r
yeni_cbs_tweets <- arrange(yeni_cbs_tweets, aday)
View(yeni_cbs_tweets)
```

![](https://cdn-images-1.medium.com/max/669/0*8vCh6GjfNuYLFrWV.png)

### group\_by() ve summarize ()

Bu iki dplyr fiili genelde bu sıralamada beraber kullanılabiliyor. Diğer dplyr fiilleri gibi aynı mantıkta çalışan **group\_by()** tanımlandığı sütundaki değerleri grupluyor. Örneğin, sadece Akşener, Erdoğan ve İnce’nin tweetlerini gruplayalım.

```r
group_by(cbs_tweets, aday)
```

![](https://cdn-images-1.medium.com/max/736/0*K_q0H1HSAStsrl06.png)

Eğer veri setinde bir değişiklik görmemişseniz, paniğe gerek yok, group\_by’dan sonra **summarize()** kullanmadığımız için aslında pek de bir şey yapmadık. Peki **summarize()** ne işe yarıyor?

**summarize ()** bir sütundaki verileri tek bir değere indirgiyor, özetliyor. Bu değer bir değişkenin ortalaması (mean) olabilir veya alt (min) ve üst değeri (max) olabilir. Şimdi **group\_by()** ve **summarize()** beraber kullanarak CB adaylarının tweet paylaşımlarının aldığı ortalama beğeni sayısına bakalım. Öncelikle yukarıda olduğu gibi **cbs\_tweets** veri kümesindeki aday değişkenini gruplayalım ve işlemi **grupped\_cb\_aday** olarak tanımlayalım.

```r
grupped_cb_aday <- group_by(cbs_tweets, aday) summarise(grupped_cb_aday, mean(begenme))
```

![](https://cdn-images-1.medium.com/max/699/0*PMwP46N3n9QHm_ik.png)

Ve hemen sonrasında yukarıda olduğu gibi beğenme sayısının ortalamasını alalım. (Ortalama hesaplamalarında R’da **mean()** argümanı kullanılır.) Sonuç olarak analiz edilen tweetlerde İnce’nin en çok, Perinçek’in ise en az beğeni ortalamasına sahip olduğu görülüyor. Bu işlemde summarize fiili içinde mean(begenme) işlemine isim verebiliriz.

![](https://cdn-images-1.medium.com/max/657/0*uTvWamPeZ8OWl68P.png)

### Hadi şimdi bu yaptıklarımızın tek satır kodla bir seferde yapalım!

Geldik en eğlenceli kısma. Eğer her fiilin sonundaki **pratik (1,2,3,4)** kısımlarına dikkat ederseniz CB adaylarının tweet verilerini şu şekilde manipüle ettik:

*yeni\_cbs\_tweets <- (cbs\_tweets, aday, tarih, cihaz, begenme, retweet, takipci\_sayısı)*

*yeni\_cbs\_tweets <-* ***mutate****(yeni\_cbs\_tweets, etkilesim\_degeri = (begenme+retweet/2)/takipci\_sayısı*

*yeni\_cbs\_tweets <-* ***filter****(yeni\_cbs\_tweets, aday = c(“aksener”, “demirtas”, “erdogan”,”ince”))*

*yeni\_cbs\_tweets <- arrange(yeni\_cbs\_tweets, aday)*

Veriyi manipüle ederken her seferinde işlemleri **yeni\_cbs\_tweets** objesine kaydettik ve her işlemde fiillerin içerisinde veri setini kullandık. R’da bunun daha kolay bir yolu var. Dplyr’da fiillerini birbirine monte edebileceğimiz bir yol mevcut.

### Bağlantı Operatörü (pipe operator, %>%)

Bağlantı operatörü (**%>%**) kullandığımızda veri setini her seferde fiillerin içerisinde kullanmamız gerek kalmıyor. Örneğin, aşağıdaki işlemi bağlantı operatörü (%) ile yapalım.

```r
yeni_cbs_tweets <-select(cbs_tweets, aday, tarih)
```

```r
yeni_tweet_verisi <- cbs_tweets %>% select(aday, tarih)
```

Üstelik select() fiilinden sonra, filter(), mutate(), arrange(), group\_by(), summarise() fiillerinin hepsini bir zincir şeklinde ekleyerek yukarıdaki analizi bir kaç satır kodla gerçekleştirebiliriz.

```r
yeni_tweet_verisi2 <- cbs_tweets %>%
select(aday, tarih, cihaz, begenme, retweet, takipci_sayısı) %>%
mutate(etkilesim_degeri =(begenme+retweet/2)/takipci_sayısı) %>%
filter(aday %in% c("aksener", "demirtas", "erdogan","ince")) %>%
arrange(aday)
```

*Daha önceki veri setimiz* ***yeni\_cbs\_tweets*** *ve bağlantı operatörü ile yaptığımı ise* ***yeni\_tweet\_verisi2.*** Veri setlerini R’da karşılaştırırsak aynı sonuca ulaştığımızı görüyoruz.

Dplyr’ın bu yapısı özellikle zamandan tasarruf etmek isteyen veri gazetecileri, istatikçiler, veri bilimciler ve akademisyenler için bulunmaz nimet. Özellikle verilerin analizinde ve manipülasyonunda sezgisel bir dil kullanılması, kişisel tecrübemle söylüyorum, öğrenmeyi de kolaylaştırıyor. Tabi ki dplyr paketi sadece bu 6 fiilden/fonksiyondan ibaret değil, detaylı incelenirse veriyle çalışan kişilerin hayatını kolaylaştıracak düzinelerce kullanışlı işleve sahip.

Son olarak, veri setimizi manipüle ettik ve hazırladık artık hasat vakti: CB adaylarının tweet etkileşimlerini, aldıkları beğeni ve retweet sayılarını görselleştirelim. Aşağıdaki veri görselleştirmelerin kodlarına [**buradan**](https://rpubs.com/sadettind/dplyr) ulaşabilirsiniz.

### Twitter’da Adayların Beğeni & Retweet İstatistikleri

Beğeni ve retweet değerlerine baktığımızda İnce diğer adaylara göre daha yüksek değerlere sahip. İnce’yi Erdoğan, Akşener ve Demirtaş takip ediyor.

![](https://cdn-images-1.medium.com/max/1024/0*L6CcjEDksJoPiCYK.png)

Grafiği daha iyi incelemek için bu sefer alınan beğeni ve retweet sayısını adaylara göre ayrı ayrı yeniden görselleştirelim. Sıralama pek de değişmiyor. Ama bir sonraki grafikte tablo tamamen değişiyor gibi…

![](https://cdn-images-1.medium.com/max/1024/0*nz_O3mERRpRZPEJ8.png)

### CB adaylarının tweet etkileşim değerleri

Hatırlarsanız bu hesaplamayı (beğeni + retweet)/2/takipçi sayısı) mutate() fiili kullanarak yapmıştık. Sadede gelirsek tweet etkileşimlerinde oransal veriye baktığımızda İnce > Demirtaş > Akşener > Erdoğan sıralamasını elde ediyoruz. Bir önceki analizden farklı olarak siyasetçilerin takipçi sayılarını hesaba kattık.

![](https://cdn-images-1.medium.com/max/1024/0*3nYZbX-B4MPSeovF.png)

\* *R yazılımını ve RStudio’yu indirerek aşağıdaki veri seti ve kod dosyası ile bu analizi tekrarlayabilirsiniz.*

[*Analizde kullanılan kodlar Online*](https://rpubs.com/sadettind/dplyr) *veya* [*Pdf*](https://drive.google.com/open?id=1F0qLcTVmQKCtCPs0DLnniHjuPalHLLj4)

*Daha öncesinde ilk olarak şu adreste yayımlandı:* [*https://www.newslabturkey.org*](/blog/r-ekosisteminde-dplyr-ile-veri-nasil-islenir-ve/) *on October 27, 2018.*

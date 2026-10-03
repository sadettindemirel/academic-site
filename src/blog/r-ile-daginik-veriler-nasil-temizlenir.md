---
title: "R ile dağınık veriler nasıl temizlenir?"
date: 2019-03-06
author: Sadettin Demirel
excerpt: "Veri temizleme, veri haberciliği süreçlerinde gazetecilerin en çok mesai harcadıkları, zahmetli adımlardan bir tanesi. Günümüzde yapılandırılmış veri kaynakları giderek artıyor olsa da analize başlamadan önce veriyi…"
thumbnail: https://cdn-images-1.medium.com/max/1024/0*vV9TkFo9yQz5-WpF
tags_display: "Data Manipulation, Veri Temizleme, Rstats, Data Cleaning, R Programming"
original_url: https://medium.com/verijurnali/r-ekosisteminde-veri-temizleme-nasil-yapilir-f1d8e1575fba
original_source: Medium
---
*Veri temizleme, veri haberciliği süreçlerinde gazetecilerin en çok mesai harcadıkları, zahmetli adımlardan bir tanesi. Günümüzde yapılandırılmış veri kaynakları giderek artıyor olsa da analize başlamadan önce veriyi yayınlandığı formattan (bkz: TÜİK) kurtarmak ve derli hâle getirmek gerekiyor. Özellikle 7/24 haber akışı ve gazetecinin üzerindeki zaman baskısı düşünüldüğünde zaten zahmetli olan bu süreç daha da önemli oluyor. Bu noktada yapılan akademik araştırmalar da gazetecilerin veri haberciliği süreçlerinde en çok zaman yetmezliğinden şikâyet ettiklerini doğruluyor. Fakat bu zahmetli süreci birkaç satır R koduyla kolaylaştırarak zamandan tasarruf etmek mümkün. Peki nasıl? Bu yazıda R yazılımı ile dağınık verileri temizleme yollarını uygulamalı olarak anlatacağım.*

Öncelikle dağınık verilerin üstesinden gelmek için R yazılımına alternatif diller (python) ve yazılımlar (Open Refine) kullanılabilir. Özellikle dplyr, tidyr ve stringr gibi paketlerin varlığı, yazılım kısmında daha kararlı bir ekosisteme (Rstudio) sahip olması bence R’ı bu süreçte daha cazip kılıyor.

Uygulamaya geçmeden önce dağınık veri (dirty data veya messy data) nedir anlamamız çok önemli. Teşhisi koymadan tedaviye geçemeyiz. [Quartz’ın dağınık veri rehberi](https://github.com/Quartz/bad-data-guide) bu konuda zengin bir kaynak. Adeta veri seti ne derece kirli olabilir sorusuna cevap veriyor. Çalışacağımız veri seti üzerinden birkaç dağınık veri teşhisi koyabiliriz. [Veri setine şuradan ulaşabilirsiniz.](https://github.com/sadettindemirel/veRi_temizleme/blob/master/%C3%B6rnek_veri.xls)

#### 1\. Teşhis koyalım

![](https://cdn-images-1.medium.com/max/953/0*UhJ_NAtmPyqt8ph3.png)

Veri setini açtığımda gözüme takılan şeyler şunlar:

-   İlk satır boş ve değişkenler yerine başlık ve kısa bilgiler yer alıyor.
-   Değişken isimleri düzenli değil, büyüklü küçüklü harfler ve noktalama işaretleri içeriyor.
-   **Cinsiyet** ve **Satın Alma** sütunlarına ait hücrelerde verilerde boşluklar var ve yine büyüklü küçüklü veriler görülüyor.
-   Ayrıca bazı durumlarda aynı şeyi ifade eden terimler birlikte kullanılmış (**IOS / iPhone**).
-   Bazı hücrelerde **Kadın** yerine **K**, **Erkek** yerine **E** gibi kısaltmalar yer alıyor.
-   Son olarak sayısal veri olması gereken **Süre** sütunu metin verisi olarak yer alıyor.

Teşhisimizi koyduktan sonra yapmamız gerekenler satır ve sütunlardaki verileri gereksiz ifadelerden ve büyüklü küçüklü değerlerden kurtarmak, bazı durumlarda verinin türünü metinden sayısal veriye dönüştürmek, kısaltmaları ve aynı şeyi ifade eden terimleri düzenlemek. Öncelikle ihtiyaç duyacağımız paketleri yükleyerek başlayalım.

#### 2\. Gerekli paketleri yükleyelim

Bu alıştırmada excel (xlsx veya xls )formatında veriyi okumak için **readxl** paketini kullanacağız. **Tidyverse** paketi veri manipülasyonu süreçlerinde kullanılan **dplyr**, **stringr** gibi paketleri içerdiği için veri temizleme adımlarında işimizi kolaylaştıracak. **Janitor** paketini değişken isimlerini alternatif bir temizleme seçeneği olarak kullanacağız. **Readr** paketi ile temizlediğimiz veriyi csv formatında dışarı aktaracağız.

```r
install.packages("readxl")
install.packages("tidyverse")
install.packages("janitor")
install.packages("readr")
```

Paketleri yükledikten sonra library (paket ismi)komutu ile çağırıyoruz. Aksi takdirde kullanacağımız kodlar çalışmayabilir.

```r
library("readxl")
library("tidyverse")
library("janitor")
library("readr")
```

#### R ekosisteminde veri temizleme veriyi içeri aktarırken başlar

Elimizdeki veri Excel formatında olduğu için paketini kullanabilirdik. R’da veriyi içeri aktarırken **readxl** paketini kullanıyoruz. CSV (Coma Seperate Vlaue), TSV (Tab Seperated Value) veyahut başka formatlarda olsaydı veriyi okumak için **read\_excel( )** fonksiyonunu kullanacağız. Ve içeri aktardığımız veriye **anket** adını vereceğiz. Temizleme işlemine geçmeden R mobil oyun verisini nasıl okuyacak bir görelim.

Öncelikle aktaracağımız veriyi tamamlayacağımız bir ifade ile başlamalıyız. Aşağıdaki kodda olduğu gibi dağınık veriyi **anket\_kirli** ifadesine tanımladım. Bu (***<-*)** ifade R yazılımında bu tip işlemleri tanımlamak için kullanılıyor. Sonrasında **read\_excel()** fonksiyonu içerisinde veri seti cihazımda hangi klasörde bulunduğunu belirttim. **“~/downloads/örnek.veri.xls”** Örnek.veri adlı excel dosyasının indirilenler klasöründe olduğunu söylüyor. Bu işlem sonrası aktardığım veriyi önizleyebilmek için **View()** fonksiyonunu kullandım. Bundan sonraki işlemlerde de tanımladığım ifadeler değişse de bu yöntemi tekrar tekrar kullanacağım. Şimdi gelgelelim aktardığımız veri setine:

```r
anket_kirli <- read_excel("~/downloads/örnek_veri.xls") 
View(anket_kirli)
```

![Rstudio’da View() komutu sonrası oluşan önizleme penceresi](https://cdn-images-1.medium.com/max/690/0*I9BB-ec8URqhoPen.png)
*Rstudio’da View() komutu sonrası oluşan önizleme penceresi*

R yazılımı, üst satırda boşluk bırakıldığı için sütun numaralarını değişken olarak aldı. Üstelik veri içermeyen hücreleri de **NA (Not Applicaple)** yani eksik veri olarak tanımladı ve 3. satırdaki değişken isimlerini değer olarak algıladı. Bu durumu düzeltmek için **read\_excel( )** fonksiyonunun **“skip”** argümanını kullanarak R’a gereksiz satırları atlamasını belirteceğiz. Aşağıda **skip** argümanını **4′**e eşitledik çünkü üstteki ekran görüntüsünde görüleceği üzere değişken isimleri ile üst satır arasında 4 satırlık bir aralık vardı.

```r
anket_skip <- read_excel("~/downloads/örnek_veri.xls", 
              skip = 4) 

View(anket_skip)r
```

![](https://cdn-images-1.medium.com/max/707/0*9X2NbCq1dBCprGUe.png)

Değişken isimleri çok dağınık bir şekilde işlenmiş. Bunun üstesinden gelmek için veriyi R yazılımına aktarırken “ **col\_names** “ argümanını kullanarak değişken isimlerini istediğimiz gibi değiştirebiliriz. Bu argümanı kullanırken dikkat etmemiz gereken şey **skip = 5'e** eşitlemek. Çünkü kendi değişken isimlerimizi veriyoruz. O hâlde önceki satırdaki (4.) isimleri kaldırmalıyız. Aksi halde R \*?CinSiyet” Yaş-?/, “Sistem” başlayan değişken isimlerini değer olarak algılayacaktır.

```r
anket <- read_excel("~/downloads/örnek_veri.xls", skip = 5,              
col_names=c("cinsiyet","yaş_grubu","sistem","süre","satın_alma"), 
trim_ws = TRUE)

View(anket)
```

Ayrıca değerlerden önce yer alan boşlukları da ***trim\_ws = TRUE*** (trim whitespace) argümanıyla ortadan kaldırdık. Sonuç olarak değişken isimlerini veriyi içeri aktarırken değiştirdik.

![](https://cdn-images-1.medium.com/max/784/0*KO5oXZLjkEn61D-V.png)

Fakat her veri 5 değişkenden (sütundan) ibaret değil. 50 değişkenden oluşan bir veri setiyle çalıştığımızı düşünelim. 50 ayrı değişken ismini manuel olarak değiştirmek kabus gibi bir şey olurdu. **Janitor** paketini işte tam da bu yüzden bu pratiğe dahil ettim. Paketin **clean\_names()** fonksiyonu bizi gereksiz ifadelerden kurtaracak, ayrıca Türkçe karakterler var ise onları İngilizce olarak değiştirecek.

```r
anket_janitor <- read_excel("~/downloads/örnek_veri.xls", skip = 4)
anket_janitor <- clean_names(anket_janitor)

View(anket_janitor)
```

![](https://cdn-images-1.medium.com/max/730/0*vhLHlvtT9H-IUMJk.png)

Değişken isimlerini temizlediğimize göre şimdi daha derinlere inme zamanı. R’ın değişkenleri doğru tanımlaması bizim için çok önemli. O halde R’a veri setinin yapısını soralım. Bu noktada **str()**, **glimpse() ve count()** gibi komutlar kullanacağız.

![](https://cdn-images-1.medium.com/max/755/0*J2nCGzWEOdZtyCUh.png)

![](https://cdn-images-1.medium.com/max/695/0*woPjd3h841mGABQI.png)

Her iki komut sonucunda da **cinsiyet, yaş grubu, sistem, satın\_alma** değişkenleri < ***chr****\>* yani karakter, metin verisi olarak tanımlanmış. Fakat **süre** değişkeni sayı formatında olması gerekirken karakter, metin verisi olarak yer alıyor. Öte yandan daha da büyük sorunlarımız var: Büyüklü küçüklü ***EVET, Evet, Hayır, HAYIR*** değerleri, kısaltmalar ve son olarak ***IOS, iPhone, Apple ios*** gibi aynı şeyi ifade eden farklı yazılmış terimler. Daha öncesinde ekran görüntüsünde saydığım dağınık veri emarelerini teşhis etmiş olsak da R’da net bir şekilde görmek için **count()** komutunu kullanacağız.

Aşağıda görmüş olduğunuz üç ayrı komutta zincir operatörü ( %>%) kullanıldı. Bu operatör R kodunu daha akıcı ve okunabilir hâle getirmekle beraber, kodları birbirine bağlayabilmemizi de sağlıyor. Aşağıdaki kod, **count(anket, cinsiyet)** komutunun bir alternatifi. Bu arada count() komutu aşağıda olduğu gibi satırlardaki değerlerin sayısını hesaplıyor. **n** değeri de değişkenin toplam sayısını gösteriyor.

```r
anket %>% count(cinsiyet)

## # A tibble: 6 x 2 
## cinsiyet  n 
## <chr>   <int> 
## 1 E       12 
## 2 Erkek   59 
## 3 ERKEK   14 
## 4 K       6 
## 5 KADIN   5 
## 6 Kadın   5

anket %>% count(satın_alma)
## # A tibble: 4 x 2 
## satın_alma n 
## <chr>    <int> 
## 1 Evet     38 
## 2 EVET     2 
## 3 HAYIR    3 
## 4 Hayır    58

anket %>% count(sistem)
## # A tibble: 10 x 2 
## sistem       n 
## <chr>      <int> 
## 1 Android    52 
## 2 ANDROID    16 
## 3 Apple      15 
## 4 Apple IOS  6 
## 5 Huawei     1 
## 6 Ios        1 
## 7 IOS        7 
## 8 iphone     1 
## 9 ıOS        1 
## 10 Sony      1
```

Count() komutunu üç ayrı değişkende kullandık. Veri değerlerinin ne derece dağınık olduğu kolaylıkla görülebiliyor. Peki anket verisini temizlemek için şimdi ne yapmalıyız?

Bu noktada ilk olarak **Süre** verisini ***parse\_number*** komutu ile metin verisinden sayı verisine dönüştüreceğiz. Sonrasında **anket** veri setindeki ifadeleri küçük harfe çevireceğiz. Böylelikle kısaltmalar dışında temizleme işlemlerini tamamlamış olacağız. Bunu **stringr** paketinin **str\_to\_lower** komutu ve dplyr paketinin **mutate** fiiliyle gerçekleştireceğiz. dplyr ve mutate nedir diye merak edenlere daha önce NewsLabTurkey’de yayınlanmış olan [R ile Veri Manipülasyonu](/blog/r-ekosisteminde-dplyr-ile-veri-nasil-islenir-ve/) yazımı öneriyorum.

Basitçe açıklamak gerekirse önce anket veri setini zincir operatörü (**%>%**) ile mutate fiiline bağladık. Sonrasında **süre** değişkenini **parse\_number** argümanı ile sayı formatına dönüştürdük. Diğer üç karakter verisini ( **cinsiyet, sistem, satın\_alma**), **str\_to\_lower()** fonksiyonu ile küçük harfe çevirdik. Son olarak tüm bu işlemi kaydetmek için **anket\_küçük** ifadesine tanımladık.

```r
anket_küçük <- anket %>% 
               mutate(süre = parse_number(süre), 
                      cinsiyet = str_to_lower(cinsiyet), 
                      sistem =str_to_lower(sistem), 
                      satın_alma =str_to_lower(satın_alma)) 
View(anket_küçük)
```

![](https://cdn-images-1.medium.com/max/704/0*nUDxzMEfyhMNXPnv.png)

#### 3\. Değerleri yeniden kodlayalım

Yukarıdaki tabloda görüldüğü üzere tüm veri değerlerini küçük harfli hâle getirdik. Geriye kısaltmalar kaldı. Aşağıda **count** komutuyla yaptığımız hesaplamaya göre kısaltmalar sadece **cinsiyet** ve **sistem** değişkenlerinde yer alıyor.

```r
anket_küçük %>% count(cinsiyet)
## # A tibble: 5 x 2
##   cinsiyet     n
##   <chr>    <int>
## 1 e           12
## 2 erkek       73
## 3 k            6
## 4 kadin        5
## 5 kadın        5

anket_küçük %>% count(sistem)
## # A tibble: 8 x 2
##   sistem        n
##   <chr>     <int>
## 1 android      68
## 2 apple        15
## 3 apple ios     6
## 4 huawei        1
## 5 ios           8
## 6 iphone        1
## 7 ıos           1
## 8 sony          1
```

O hâlde Excel’deki bul ve değiştir (find and replace) komutuna benzer bir şekilde malum kısaltmaları veyahut benzer terimleri yeniden kodlayalım.

Kodlama işlemini **mutate( )** ve **recode( )** fiilleriyle gerçekleştireceğiz. Öncelikle en son tanımladığımız **anket\_küçük** veri setini zincir operatörü ile **mutate** fiiline bağlıyoruz. Sonrasında yeniden kodlayacağımız değişken ismini ( **cinsiyet**), **recode( )** komutuna eşitliyoruz. Bundan sonraki adım çok önemli! **recode** komutu içerisine önce temizlenecek değişkeni ekliyoruz, sonra tırnak içinde yeniden kodlanacak değeri(“ **e”** ve “ **k”**) istenilen ifadeye (“ **erkek”** veya “ **kadın”**) yine tırnak içinde eşitliyoruz. Bu kadar!

```r
anket_küçük %>% mutate(cinsiyet = 
                       recode(cinsiyet, "e"="erkek","k"="kadın"))
```

![](https://cdn-images-1.medium.com/max/708/0*kjoDOgFEI6qOmiiV.png)

Kısaca R’a istediğimiz ifadeleri bulmasını ve yeniden kodlamasını ( **recode**) belirttik. Yaptığımız işlemi yeni bir isme tanımlamalıyız. Bunu **<-** sembolü ile **derli anket** ifadesine eşitleyebiliriz.

```r
derli_anket <-anket_küçük %>% 
mutate(cinsiyet = recode(cinsiyet, "e" = "erkek","k"="kadın"))
```

Aynı işlemi farklı değerler kullanarak **sistem** değişkeni içinde gerçekleştirebiliriz. Tek fark düzeltilecek değerler değiştiriyoruz:

![](https://cdn-images-1.medium.com/max/639/0*NJhAurt7f3RrwRZS.png)

Son olarak yaptığımız işlemi **derli\_anket** verisine tanımlayarak anket verimizin temizleme işlemini tamamlamış oluyoruz.

![](https://cdn-images-1.medium.com/max/675/0*_o_E4QZgitSEhs65.png)

Bu arada iki adımda yaptığımız bu iki işlemi zincir operatörüyle (%>%) birbirine bağlayarak tek adımda yapabilir sadece 3 veya 4 satır kodla gereksiz değerlerden veri setimizi temizleyebiliriz.

```r
derli_anket <- anket_küçük %>% 
               mutate(
 cinsiyet =recode(cinsiyet, "e" = "erkek","k"="kadın"),
 sistem = recode(sistem, "iphone"="ios", "apple" = "ios", 
"apple ios"="ios","ıos" ="ios","huawei"="android","sony"="android"))
```

#### 4\. Veri setini dışarı aktarma

Temizlediğimiz veriyi dışarıya **csv** olarak aktarabiliriz. Bunu yapmak için öncelikle **readr** paketini kullanacağız. Sonrasında **write\_csv()** komutu içerisine önce tanımladığımız veri seti ismi ( **derli\_anket**), sonrasında kaydedilecek klasörü dosyanın uzantısı ile belirtiyoruz. Aşağıdaki işlemde veri setini masaüstüne kaydettim. Temizlenmiş veri setine [buradan](/blog/r-ekosisteminde-dplyr-ile-veri-nasil-islenir-ve/) ulaşılabilir.

```r
library(readr) 

write_csv(derli_anket, "derlianket.csv")
```

Tabii R ekosisteminde veri temizleme pratiği bu gösterdiklerimden ibaret değil. Bu yazıda yüzeysel olarak anlatmaya çalıştım. Eldeki verinin dağınık olma durumuna göre kullanacağınız çözümler de değişecektir. R ekosisteminde veri temizlemede belli bir ölçü yok. Değişkenin veri türünü belirlemeden, kendi özel fonksiyonunuzu yazarak da eldeki veri setini temizleyebilir, derli hâle getirebilirsiniz.

*Rstudio ve R yazılımını indirerek aşağıdaki dökümanlar yardımıyla bu pratiği kendi cihazınızda tekrarlayabilirsiniz.* [Kullanılan veri seti için tıklayınız.](https://github.com/sadettindemirel/veRi_temizleme/blob/master/%C3%B6rnek_veri.xls) [Kullanılan kodlar için tıklayınız.](https://github.com/sadettindemirel/veRi_temizleme)

*Originally published at* [*https://www.newslabturkey.org*](/blog/r-ile-daginik-veriler-nasil-temizlenir/)

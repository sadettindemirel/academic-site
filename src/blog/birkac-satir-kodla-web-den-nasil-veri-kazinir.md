---
title: "Birkaç satır kodla web’den nasıl veri kazınır?"
date: 2019-03-25
author: Sadettin Demirel
excerpt: "Veri çağında yaşıyoruz. Önümüz arkamız sağımız solumuz veri. Hükümetler, uluslararası kuruluşlar, haber merkezleri verilerini kullanıma açıyor, bu veriler, araştırma, geliştirme, gazetecilik vb amaçları için…"
thumbnail: https://cdn-images-1.medium.com/max/1024/0*PEtvz2XPky3csCtM
tags_display: "Veri Gazeteciliği, Data Scraping, Data Journalism, R Programming"
original_url: https://medium.com/verijurnali/birkac-sat%C4%B1r-kodla-r-ile-veri-kaz%C4%B1ma-8d03de279319
original_source: Medium
---
## Birkaç satır kodla Web’ten nasıl veri kazınır?

![Photo by Markus Spiske on Unsplash](https://cdn-images-1.medium.com/max/1024/0*PEtvz2XPky3csCtM)
*Photo by Markus Spiske on Unsplash*

Veri çağında yaşıyoruz. Önümüz arkamız sağımız solumuz veri. Hükümetler, uluslararası kuruluşlar, haber merkezleri verilerini kullanıma açıyor, bu veriler, araştırma, geliştirme, gazetecilik vb amaçları için kullanılıyor ve yeniden dağıtıma sokuluyor. Ama üretilen ve paylaşılan her veri indirilemiyor, indirilse dahi uygun formatta olmadığı için kullanılamıyor. Hâl böyle olunca web verisini kazımak tercih edilen en uygun seçeneklerden birisi olarak karşımıza çıkıyor. Veri gazeteciliği süreçlerinden biri olarak da kabul edilen veri kazıma işlemi, web tasarım dilini çözebilen, okuyabilen eklentiler ( [web scraper](https://www.webscraper.io/), [data scraper](https://chrome.google.com/webstore/detail/data-scraper-easy-web-scr/nndknepjnldbdbepjfgmncbggmopgden)) veya siteler ( [import.io](https://www.import.io/)) yardımıyla yapılabiliyor. Fakat bu işlemi üçüncü parti eklentilere veya sitelere ihtiyaç duymadan birkaç satır R koduyla yapmak mümkün. Peki nasıl? Bu yazıda R kullanarak uygulamalı olarak anlatacağım.

Anlatacağım yöntemle web sitelerindeki metin verileri (cümleler, paragraflar) de kazınabilir. Fakat bu pratikte web sayfalarına hapsedilmiş veri tablolarını kazıyacağız. Veri kazıma pratiği için iki ayrı web site adresinden yararlanacağız. İlki [Yök Tez Merkezi İstatistikleri.](https://tez.yok.gov.tr/UlusalTezMerkezi/IstatistikiBilgiler?islem=3)

![](https://cdn-images-1.medium.com/max/1024/0*RBTHebaY8tYGGEM1.png)

İkincisi [Maçkolik Süper Lig Gol istatistikleri](https://www.mackolik.com/puan-durumu/t%C3%BCrkiye-spor-toto-s%C3%BCper-lig/istatistik/482ofyysbdbeoxauk19yg7tdt).

![](https://cdn-images-1.medium.com/max/962/0*ADwL27q7DkERl8mB.png)

Her iki adresteki veriler de tablo formatında. O hâlde her biri için ayrı bir yöntem kullanarak, bu verileri kazıyalım.

### 1\. Kullanılacak paketler ve ön hazırlık

Veri kazıma pratiğinde [rvest](https://www.rdocumentation.org/packages/rvest/versions/0.3.2) paketini kullanacağız. Bunun yanı sıra **tidyverse** ve **janitor** paketleri de kazınan verinin düzenlenmesi ve görselleştirilmesi için işimize yarayacak.

```r
library("rvest")
library("tidyverse")
library("janitor")
```

Paketleri çağırdıktan sonra yapmamız gereken kazıyacağımız web sayfalarının adresilerini R’a aktarmak. **read\_html** fonksiyonu ile adresleri tanımlayarak bunu yapabiliriz. Bundan sonraki adımda tanımladığımız **yok\_link** ve **mackolik** ögeleriyle işlemler yapacağız.

```r
yok_link <- read_html("https://tez.yok.gov.tr/UlusalTezMerkezi/IstatistikiBilgiler?islem=3")mackolik <- read_html("https://www.mackolik.com/puan-durumu/t%C3%BCrkiye-spor-toto-s%C3%BCper-lig/istatistik/482ofyysbdbeoxauk19yg7tdt")
```

### 2\. Yök Tez Merkezi verilerini kazıyalım

Veri tablosu içeren html tabanlı tüm web sayfalarını **rvest** paketinin **html\_table()** fonksiyonuyla kazıyabiliriz. Aşağıdaki işlemde YÖK Tez Merkezi verilerinin bulunduğu adresi **html\_table** ile kazıdık. **fill = TRUE** argümanı sayesinde R, veri tablosunda eksik verileri NA, yani eksik veri olarak okuyor. Ayrıca, kazıdığımız verileri **yok\_tez** isimli yeni bir ögeye kaydettik, çünkü kazıdığımız veri henüz istediğimiz tablo formatında değil. **View(yok\_tez)** kodu ile verinin ne kadar dağınık olduğuna göz atabiliriz.

```r
yok_tez <- yok_link %>% html_table(fill = TRUE)
View(yok_tez)
```

Kazıdığımız veri **yok\_tez** şu an R’ın veri formatlarından biri olan liste formatında. Listedeki \[\[1\]\] ve \[\[2\]\] numaraları iki ayrı veri tablosundan oluştuğunu ifade ediyor. O hâlde her iki veri tablosuna göz atalım. Bakalım hangisi Yök tez verileri.

![](https://cdn-images-1.medium.com/max/845/1*KlAHz_xCD6on7UfEpOxTZw.png)

```r
yok_tez[[1]]
```

![](https://cdn-images-1.medium.com/max/809/0*M1uzTFIxrJ1e37wW.png)

Evet acayip kirli bir veri seti…

Birinci veri tablosu işimize yaramayacak (junk) veriler içeriyor. İkinci tabloda ise konulara ve derecelere göre tez sayılarını görebiliyoruz. Tek veri tablosu ismi ve sütun isimleri değer olarak yer alıyor.

```r
head(yok_tez[[2]])
```

![](https://cdn-images-1.medium.com/max/1024/1*U2eC7FDWMM_StHLwWqvJGQ.png)

```r
yok_tablo <- as.data.frame(yok_tez[[2]])
```

Yukarıdaki işlemle veri tablosunu **yok\_tablo** olarak kaydettik. Bu aşamadan sonra eğer isterseniz bu veriyi dışarı aktarıp Excel’de veya istediğiniz veri aracında temizleyerek kullanabilirsiniz. Dışarı aktarmak için aşağıdaki kodu kullanabilirsiniz.

```r
write_csv(yok_tablo, "~/desktop/yok_tablo1.csv")
```

Bir diğer yol “ [R ekosisteminde dağınık veriler nasıl temizlenir?](/blog/r-ile-daginik-veriler-nasil-temizlenir/)” yazımda ele aldığım gibi bu veri tablosunu temizleyebilir, derli hâle getirebiliriz. Fakat bu aşamada sütun isimlerini düzenlememiz yeterli olacaktır. Bunun için **dplyr** ve **janitor** paketlerini kullanacağız.

İlk olarak **select** komutuyla 1,4,5,10.’cu sütunları seçiyoruz. Sonrasında **row\_to\_names** fonksiyonu ile hangi satırın sütun ismi olarak seçeceksek **row\_number** argümanına belirtiyoruz. Bu veri setinde istediğimiz isimler 2. satırda. Diğer tanımladığımız argümanlar ise sütun isimleri olarak belirlediğimiz satırdaki verileri ( **remove\_row**) ve üst satırlardaki değerleri ( **remove\_rows\_above**) temizlememizi sağlıyor.

```r
yok_derli <- yok_tablo %>% select(1,4,5,10) %>% row_to_names(row_number = 2, remove_row = TRUE, remove_rows_above = TRUE)
View(yok_derli)
```

![](https://cdn-images-1.medium.com/max/735/0*9J6j_3aG86700kwr.png)

Kazıma işlemini tamamladık hatta kazıdığımız veriyi biraz temizledik. Şimdiye kadar anlattığım işlem uzun görünüyor olabilir. Ama kullandığım tüm kodları birbirine bağladığımızda sadece 4 satırda YÖK verilerini kazıyabiliyoruz.

![](https://cdn-images-1.medium.com/max/761/1*P_whgl6YK_4gc5eTRnAHFA.png)

Bundan sonraki adımda metin verisi olarak algılanan **Yüksek Lisans**, **Doktora** ve **Toplam** değişkenleri sayı verisine dönüştürülerek analiz devam ettirilebilir. Şimdi geçelim ikinci veri kazıma pratiğine.

### 3\. Maçkolik süperlig gol istatistiklerini kazıyalım

İkinci pratikte Maçkolik süperlig gol istatistiklerini yine **html\_table** ile çekebiliriz. Ama işimizi kolaylaştırmayalım. Gol istatistiklerini metin verisi olarak çekip R’da birleştirelim. Bazı durumlarda **html\_table()** fonksiyonu düzgün çalışmayabiliyor.

İkinci adım ilkine göre biraz meşakkatli. Bu adımda tablolardaki veriyi çekmek için sırasıyla **html\_node** ve **html\_text** komutlarını kullanacağız. Çünkü kazıyacağımız veriler, html ve css node’ları içerisinde web sayfasında görüntüleniyor. Veri tablosuna karşılık gelen **node’**ları daha kolay bulabilmek için bir tarayıcı eklentisi kullanacağız: [**selector gadget**](https://chrome.google.com/webstore/detail/selectorgadget/mhjhnkcfbdhnjickkkdbjoemdmbfginb?hl=en). Bu eklenti tarayıcılardaki inspect seçeneğiyle aynı görevi görüyor. Farkı veri tablolarına karşılık gelen **node** ‘u zaman kaybetmeden elde ediyoruz.

![](https://cdn-images-1.medium.com/max/1024/1*XLs0HkApOUvZAcZsU8BHxg.jpeg)

Mackolik.com’dan süper lig gol istatistiklerine açıyoruz ve eklenti ile oyuncu ismi üzerine tıklıyoruz. Sağ altta eklenti bize ilgili node’u verdi. Sonrasında node’u aşağıdaki olduğu gibi **html\_nodes()** komutu içerisine ekleyebiliriz. Ve son olarak **html\_text()** kullanarak node’daki verileri metin verisine dönüştürdük. Veriyi **oyuncu** ögesine kaydettik. Neyi kazıdığımızı görmek için R konsola oyuncu ögesini yazdırarak göz atabiliriz.

```r
oyuncu <- mackolik %>% html_nodes(".p0c-competition-player-ranking__player-name") %>% html_text(trim = TRUE)
```

![](https://cdn-images-1.medium.com/max/785/1*dGOebRKYaGT8VGlVLA4hXg.png)

Bundan sonraki adımlarda **takım** ve **gol\_sayısı** içinde gerekli node’ları seçtikten sonra aynı işlemi tekrarlayabiliriz. Bu arada *trim = TRUE* metin verisindeki gereksiz boş alanları kaldırıyor.

Her üç sütundaki değerleri kazıdık. Şimdi elimizdeki parçaları birleştirerek bir veri tablosu oluşturalım. Bu aşamada metin verisinden oluşan üç öğeyi **tibble** komutuyla tablo formatına dönüştürelim. **tibble**, **as.data.frame** komutunun modern hâli diyebiliriz. Ayrıca Yeni Zelanda İngilizcesinde **tablo** anlamına geliyor.

```r
mackolik_derli <- tibble(oyuncu, takım, gol_sayisi) 
```

```r
head(mackolik_derli)
```

![](https://cdn-images-1.medium.com/max/1024/1*VCWgsiVL4ZZZMrowIXJfPg.png)

Veri tablosunu oluşturduk ama **gol\_sayisi** metin verisi olarak algılanmış. **as.numeric** komutu ile gol\_sayısı değişkenini sayı formatına dönüştürelim.

```r
mackolik_derli$gol_sayisi <- as.numeric(mackolik_derli$gol_sayisi)

head(mackolik_derli)
```

![](https://cdn-images-1.medium.com/max/1024/1*ZvkKEqbm0TXIRqw68X7BdA.png)

```r
ggplot(mackolik_derli, aes(fct_reorder(oyuncu, gol_sayisi),gol_sayisi, fill = takım, label = gol_sayisi))+ geom_col(show.legend = FALSE)+ geom_text(check_overlap = TRUE, hjust = -0.2)+ scale_fill_manual(values = palette)+ labs(x="",y="",title = "Süper Ligin Golcüleri 2018/2019", subtitle ="Sadece 4 takımın oyuncuları için renk kullanılmıştır" ,caption = "@demirelsadettin / kaynak: maçkolik")+ coord_flip()+theme_custom1()
```

![](https://cdn-images-1.medium.com/max/1024/0*jyhsM--VBnwQsunL.png)

Bu pratikte ve grafikte kullandığım detaylı kodlara [buradan ulaşabilirsiniz](https://sadettindemirel.github.io/veRi_kazima/veri_kaz%C4%B1ma_pratik.html). Ayrıca temizlenen veri setleri ve kullanılan tüm kodları [GitHub’dan indirebilirsiniz](https://github.com/sadettindemirel/veRi_kazima).

*Bu yazı ilk olarak* [*https://www.newslabturkey.org*](/blog/birkac-satir-kodla-web-den-nasil-veri-kazinir/)*’da yayımlandı.*

---
title: "R ekosisteminde veri nasıl görselleştirilir?"
date: 2018-11-07
author: Sadettin Demirel
excerpt: "R istatistik dili, verinin elde edilmesinden görselleştirilmesine ve sunumuna kadar birçok süreçte işlevsel olarak kullanılan ender araçlardan birisi. Bunu, açık kaynak bir yazılım olması, canlı bir topluluğa sahip…"
thumbnail: https://cdn-images-1.medium.com/max/1024/0*FWi77i7RpFlhaGtf
tags_display: "Ggplot2, Veri Görselleştirme, Rstats, Data Visualization"
original_url: https://medium.com/verijurnali/r-ekosisteminde-veri-gorsellestirme-6d6065c7e3f6
original_source: Medium
---
![Photo by Luke Chesser on Unsplash](https://cdn-images-1.medium.com/max/1024/0*FWi77i7RpFlhaGtf)
*Photo by Luke Chesser on Unsplash*

## R Ekosisteminde Veri Nasıl Görselleştirilir?

R istatistik dili, verinin elde edilmesinden görselleştirilmesine ve sunumuna kadar birçok süreçte işlevsel olarak kullanılan ender araçlardan birisi. Bunu, açık kaynak bir yazılım olması, canlı bir topluluğa sahip olması ve kapsamlı paketlerine borçlu. Özellikle [ggplot2](https://ggplot2.tidyverse.org/index.html) şu anda R kullanıcıları tarafından en çok kullanılan paketlerden birisi. R ekosisteminin temel görselleştirme paketlerinin aksine zengin bir grafik kütüphanesine sahip ve veriyle çalışmayı kolaylaştıran tidyverse evreninin bir parçası. Bunun yanı sıra ggplot2 üçüncü parti eklentiler ( [plotly](https://plot.ly/ggplot2/), [highcharts](http://www.htmlwidgets.org/showcase_highcharts.html)) ve paketlerle ( [gganimate](http://www.ggplot2-exts.org/gganimate.html), [shiny](https://shiny.rstudio.com/)) interaktif ve animasyonlu görselleştirmeler oluşturma imkânı da sunuyor. Peki ggplot2 ile veri nasıl görselleştirilir ve ggplot2'nun püf noktaları nelerdir?

Her ne kadar ggplot2 kullanıcıyı sınırladığı için çalışmanın sunumunda pek tercih edilmese de özellikle verinin anlamlandırıldığı keşifçi veri analizinde (exploratory data analysis) sıklıkla kullanılan bir yazılım. Fakat birkaç satır kodla zahmete girerseniz basım kalitesinde görseller de elde edebilirsiniz. Nitekim The Washington Post, BuzzFeed, FiveThirtyEight gibi haber merkezleri çalışma akışlarında ggplot2'u sıklıkla kullanıyor.

Ggplot2 ile veri görselleştirmeye geçmeden önce veri setimizin hazır ve yapılandırılmış olması çok önemli. Bunun için R ekosisteminde hâlihazırda var olan ve veri paketi olarak indirebileceğimiz [Gapminder verilerini](https://www.gapminder.org/tools/#%24chart-type=bubbles) kullanacağız.

Kullanacağımız veri seti 1952–2007 yılları arasında 5 kıtayı, yüzlerce devleti ve bu devletlerin yaşam süresini, nüfusu, kişi başına düşen milli geliri içeriyor. Görselleştirmelerimizde kıtaları bu değişkenlere göre karşılaştıracağız. Bu arada bir hatırlatma, bu gapminder verilerini daha önceki [yazımda](/blog/r-ekosisteminde-dplyr-ile-veri-nasil-islenir-ve/) işlediğim dplyr fiilerini kullanarak manipüle edeceğiz. Bir göz atmanızı tavsiye ederim. Şimdi geçelim hazırlık aşamasına.

### 1\. Paketlerin yüklenmesi ve verinin hazırlanması

Öncelikle aşağıdaki paketleri kuralım.

```r
install.packages("dplyr") 
install.packages("ggplot2") 
install.packages("gapminder") 
library(dplyr) #veriyi manipüle ederken kullanacağız 
library(ggplot2) #veri görselleştirme de kullanacağımız paket library(gapminder) #Gapminder verilerinin bulunduğu veri paketi
```

Gapminder veri setine, konsola **View(gapminder)** komutunu girerek göz atabiliriz. Bu, gapminder verisinin içeri aktarıldığı ve lokal cihazımızdan kullanılabileceği anlamına geliyor.

![](https://cdn-images-1.medium.com/max/669/0*OhTR4rO-FumQRbFn.png)

Veri setine baktığımızda sütun isimlerinin İngilizce olduğunu görüyoruz. Kullanım rahatlığı için gapminder verisindeki değişkenleri Türkçeleştirelim. Öncelikle İngilizce sütun isimleri ile eşleşecek model sütun isimleri oluşturalım. Bunun için R konsolda aşağıda olduğu gibi **tr\_isim** adlı bir vektör oluşturalım. Ve sonrasında colnames() fonksiyonunu kullanarak gapminder veri setinin sütun isimlerini Türkçeleştirelim.

```r
tr_isim <-
c("ülke","kıta","yıl","yaşam_süresi","nüfus","kişi_başı_milli_gelir")
colnames(gapminder) <- tr_isim
View(gapminder)
```

![](https://cdn-images-1.medium.com/max/667/0*DD5-m-8X1rnDDVAk.png)

Son olarak 6 ülkenin (Türkiye, Canada, Brezilya, Mısır, İsveç ve Hindistan) Freedom House [Dünya Özgürlükler Raporu verilerini](https://drive.google.com/open?id=1daJXQv89gwbpMsEMWkuezlaHPKvanAIG) içeri aktaralım . Dosyanın nasıl içeri aktarılacağına dair hazırladığım [şu videodan](https://gfycat.com/gifs/detail/PleasantGoodnaturedAmericanredsquirrel) yardım alabilirsiniz. Bu veriyi ggplot2 ile çizgi grafik oluşturmada kullanacağız. Özgürlükler verisini “freedom” ismiyle içeri aktardım. Her iki veri setine de glimpse() fonksiyonu ile göz atalım.

![](https://cdn-images-1.medium.com/max/650/0*QKUNSlqly6OP28RZ.png)

### 2\. ggplot2'nun temel bileşenleri

![](https://cdn-images-1.medium.com/max/741/0*LCXs05H2k0LE1Wkr.jpg)

Ggplot2 ile veri görselleştirebilmemiz için önce grafik yapısını iyi tanımamız gerekiyor. Yatay eksen x ekseni, dikey eksen ise y ekseni olarak kabul ediliyor. Veri görselleştirmede **ggplot**() fonksiyonunu kullanıyoruz. ggplot() fonksiyonu içinde veri seti ismi ve **aes**() adlı estetik argümanına yatay ve dikey eksende kullanacağımız değişkenler (sütun isimleri) ile yer veriyoruz. Sonrasında, tercih edeceğimiz grafik tipine göre, geom fonksiyonlarından birini kullanacağız. Geom fonksiyonu grafik türüne göre değişiyor, ama tahmin etmesi hiç zor değil.

Unutmadan aes() içindeki x, x ekseninde kullanacağımız değişkeni, y ise y ekseninde kullanacağımız değişkeni temsil ediyor. Ayrıca buradaki grafikler haricinde birçok grafik çeşidi de ggplot2 paketiyle kullanılabilir ama bu yazı kapsamında bu üçünden yararlanacağız. Şimdi elimizdeki bu bilgiyi pratiğe dökelim.

### 3\. ggplot2 ile temel grafikler

a) Çubuk grafik, genelde iki veya daha fazla değişken arasında karşılaştırma yapmak için kullanılır. Çubuk grafik hakkında detaylı bilgiye argümanını [veri görselleştirme kataloğundan](https://datavizcatalogue.com/TR/yontemleri/cubuk_grafik.html) ulaşabilirsiniz. Şimdi elimizdeki gapminder verisiyle 5 kıtada 1952–2007 yılları arasındaki yaşam süresine bakalım. Daha önceki kodun haricinde grafiğe renk argümanı da ekleyelim. Kısaca aşağıdaki çalışmada ne yaptığımızı açıklarsak x eksenine (yatay eksen) yıl değişkenini, y eksenine yaşam süresini ekledik. Grafiğe renk eklemek için **fillkıtaya** eşitledik.

![](https://cdn-images-1.medium.com/max/700/0*AShWlBAgAnBJ3U0y.png)

Fakat bu grafikte bir gariplik var şöyle ki yaşam süresi değerlerini yığılı olarak topladı ve görselleştirdi. Bizim istediğimiz kıtaların yaşam sürelerini birbirleriyle ayrı ayrı görselleştirmek ve karşılaştırmaktı. Bu pürüzü geom\_col() fonksiyonu içerisine position =”dodge” argümanını ekleyerek ortadan kaldırabiliriz. Sonuç olarak 5 kıta içerisinde en kısa yaşam süresinin Afrika kıtasında olduğunu görüyoruz.

![](https://cdn-images-1.medium.com/max/700/0*rb2kcDAQA4HrmMql.png)

b) Çizgi grafik ise daha çok zamansal verileri görselleştirmemizde işimize yarıyor. Çizgi grafik hakkında detaylı bilgiye [buradan](https://datavizcatalogue.com/TR/yontemleri/cizgi_grafik.html) ulaşabilirsiniz. Bu grafik tipinde gapminder verisini kullanmayacağız çünkü yıl sütunundaki değerler devamlılık göstermiyor. Gapminder verisiyle anlamlı bir çalışma elde edemeyeceğimiz için onun yerine [Freedom House Dünya Özgürlükler Raporu verisini](https://drive.google.com/open?id=1daJXQv89gwbpMsEMWkuezlaHPKvanAIG) kullanacağız. Bu sefer çizgi grafik olduğu için geom\_line() kullanıyoruz. Çubuk grafikten tek farkı ise renk argümanı için **fill** yerine **color** kullanmamız.

![](https://cdn-images-1.medium.com/max/700/0*INFsDVlVMzuefZGV.png)

Çizgilerin kalınlığını artırarak daha estetik bir grafik elde edebiliriz. geom\_line fonksiyonu içerisinde line’ı 1.5'e eşitleyerek daha iyi bir görüntü elde ediyoruz.

iki değişken arasındaki ilişkiyi veya korelasyon değerini görselleştirmek için kullanılır. Dağılım grafiği hakkında detaylı bilgiye

![](https://cdn-images-1.medium.com/max/700/0*YYmEPR8sOzQDgrz6.png)

c) Dağılım grafiği, [buradan](https://datavizcatalogue.com/TR/yontemleri/dagilim_grafigi.html) ulaşabilirsiniz. Yapacağımız çalışmada 2007 yılında yaşam süresi ile kişi başına düşen milli gelir arasındaki ilişkiyi kıtalara göre görselleştireceğiz. Ama bunun öncesinde elimizdeki veriyi 2007 yılı kalacak şekilde filtreleyelim.

```r
gapminder_2007 <-filter(gapminder, yıl == 2007)
```

Artık ggplot fonksiyonunda veri seti olarak gapminder\_2007'yi kullanacağız. Aşağıdaki kodda görüldüğü gibi dağılım grafiğinde goem\_point() fonksiyonu ve renk için color argümanı kullanıyoruz.

```r
ggplot(gapminder_2007, aes(yaşam_süresi,kişi_başı_milli_gelir, color = kıta))+ geom_point()
```

![](https://cdn-images-1.medium.com/max/700/0*e6wn323X2ouZnUhC.png)

Yine daha iyi bir görsel için veri noktalarının büyüklüğünü arttıralım ve şeffaflık değerini ayarlayalım. Noktaların büyüklüğünü **size**, şeffaflığı ise **alpha** argümanları ile ayarlayacağız.

![](https://cdn-images-1.medium.com/max/734/0*qtNayj8DBc2gn3H1.png)

Şimdiye kadarki adımlar temel grafik tiplerinin görselleştirilmesine yönelikti. Şimdi bu grafiklere başlık, alt başlık ve veri kaynaklarını ekleyerek ortalama okurun anlayabileceği şekle getirelim. Bunu [**labs()**](https://www.rdocumentation.org/packages/ggplot2/versions/3.1.0/topics/labs) fonksiyonu ile yapacağız. Buraya kadar fark etmiş olacaksınız ki ggplot paketinde geom fonksiyonu da dahil ekleyeceğimiz tüm kodları **+** sembolüyle asıl koda iliştiriyoruz. **labs()** da bunlardan birisi. Labs fonksiyonu şu argümanları içeriyor:

```r
+labs(x = "x eksen ismi", y="y eksen ismi", title= "grafik başlığı", subtitle ="grafik altbaşlığı", caption ="grafiğin sağ altına eklenecek metin")
```

Hemen pratiğe dökelim:

```r
ggplot(gapminder_2007, aes(yaşam_süresi,kişi_başı_milli_gelir, color = kıta))+
geom_point(size = 4, alpha = 0.7) +
labs(x="yaşam süresi", y ="kişi başına düşen milli gelir", title = "5 Kıtada Yaşam Süresi ve Kişi Başına Düşen Milli Gelir İlişkisi", subtitle = "Veri Kaynağı: Gapminder, 2007", caption = "@demirelsadettin")
```

![](https://cdn-images-1.medium.com/max/700/0*UZMHSM6sAgLzXn3s.png)

### 4\. Renk seçimi

Şu ana kadar kullandığımız grafiklerde her ne kadar renk argümanlarını ( **fill**, **color**) biz belirlesek de R yazılımı renkleri varsayılan ayarlara ve verinin yapısına göre seçti. Renk seçimini manuel olarak da yapabiliriz. Bunun için öncelikle renk argümanına eşitleyeceğimiz değişkenin kaç ayrı değerden oluştuğunu bilmeliyiz. Son grafikte kıta değişkeni 5 ayrı değerden oluşuyor. O halde 5 ayrı renk seçmeliyiz. Kullanacağınız renkleri [Color Brewer sitesinden](http://colorbrewer2.org/#type=qualitative&scheme=Set1&n=5) veya hexcode destekleyen herhangi bir kaynaktan edinebilirsiniz. Öncelikle renklerimizi R konsolda kaydedelim.

```r
renk <- c("#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00")
```

R yazılımında renk artık bir değer olarak yer alıyor. Renkleri grafiğe yansıtmak için **+scale\_color\_manuel ()** fonksiyonu kullanacağız. Eğer Çubuk grafikte bunu yapıyor olsaydık **scale\_fill\_manuel()** kullanacaktık.

```r
ggplot(gapminder_2007, aes(yaşam_süresi, kişi_başı_milli_gelir, color = kıta))+
geom_point(size = 4, alpha = 0.7) + 
labs(x="yaşam süresi", y ="kişi başına düşen milli gelir", title = "5 Kıtada Yaşam Süresi ve Kişi Başına Düşen Milli Gelir İlişkisi", subtitle = "Veri Kaynağı: Gapminder, 2007", caption = "@demirelsadettin")+
scale_color_manual(values = renk)
```

### 5\. Facets ile birden fazla grafik oluşturalım

Ggplot2'daki facets özelliği ile bir değişkeni referans alarak tek seferde birden fazla grafik oluşturabilirsiniz. Facets özelliği sayesinde veri setini filtrelememize veya karmaşık bir şekilde görselleştirmemize gerek kalmayacak. Bunu asıl koda iliştireceğimiz [**facet\_wrap()**](https://www.rdocumentation.org/packages/ggplot2/versions/3.1.0/topics/facet_wrap) fonksiyonuyla yapacağız.

Facets özelliğini ilk olarak 5 kıtanın yaşam süresini görselleştirdiğimiz çubuk grafikte deneyelim. Dikkat ederseniz ilk iki satır ilk baştaki çubuk grafiğin kodu ile aynı kod, sadece grafiğe başlık ve alt başlık ekledik. Grafiğin renklerini değiştirdik ve facet özelliği ile tek bir grafikte göstermek yerine veriyi 5 ayrı grafikte görselleştirdik. Bunu yan yana 5 ayrı sütun şeklinde yapabilmek için **facet\_wrap()** içerisinde **ncol** argümanına yer verdik ve 5'e eşitledik.

```r
ggplot(gapminder, aes(yıl, yaşam_süresi, fill = kıta))+geom_col(position = "dodge")+labs(x ="yıl",y="yaşam süresi", title ="Son 50 yılda 5 kıtada yaşam süresinin değişimi", subtitle = "Gapminder, 1952 -2007", caption = "@demirelsadettin")+ scale_fill_manual(values = renk)+ facet_wrap(~kıta, ncol =5)
```

![](https://cdn-images-1.medium.com/max/1000/0*NSOUOv6vvXS8A6Oi.png)

Bu noktada dikkat etmemiz gereken şey, Kıta 5 ayrı değişkenden oluştuğu için 5 ayrı grafik elde ettik. **ncol** argümanı ise görselin yan yana 5 ayrı grafik olmasını sağladı. Dilersek 3 üstte ve 2 altta bir grafik de elde edebilirdik. Aşağıda olduğu gibi (sadece **+facet\_wrap(~kıta, ncol = 3**) kodunu kullandık.

![](https://cdn-images-1.medium.com/max/1000/0*QgO82Fz6DRs12xXM.png)

Son olarak hatırlarsanız dağılım grafiğini 2007 yılına göre filtrelemiştik bunun yerine facet özelliği sayesinde her yılı ayrı görselleştirelim.

```r
ggplot(gapminder, aes(yaşam_süresi, kişi_başı_milli_gelir, color = kıta))+
geom_point(size = 4, alpha = 0.7)+
labs(x="yaşam süresi", y ="kişi başına düşen milli gelir", title = "5 Kıtada Yaşam Süresi ve Kişi Başına Düşen Milli Gelir İlişkisi", subtitle = "Veri Kaynağı: Gapminder, 1952-2007", caption = "@demirelsadettin")+
scale_color_manual(values = renk)+
facet_wrap(~yıl, ncol = 6)
```

![](https://cdn-images-1.medium.com/max/1024/0*RiblwZ4AxAlHlpCW.png)

Açıkça görülüyor ki son 50 yılda hem milli gelir hem de yaşam süresi tüm kıtalarda artmış. Daha iyi görsel elde etmek için 1980 yılı sonrasına bakalım:

### 6\. Grafiğin temasını değiştirelim

Geldik dananın kuyruğunun koptuğu yere! Özellikle grafiğin arka planı, görselde kullanılan font tipi, font büyüklüğü gibi bir çok ögeyi de ggplot2 paketinde belirleyebiliyoruz. Özellikle tema kısmı için ggplot2 hâlihazırda var olan bir düzine temaya sahip. 2007 yılı Gapminder verisini 6 ayrı temada görselleştirdim. Tema seçiminde daha az dikkat dağıtıcı olduğu için ben genelde theme\_minimal() tercih ediyorum.

![](https://cdn-images-1.medium.com/max/1024/1*w6ux_N1Mf2d99Ces52YBPQ.jpeg)

Her seferinde tekrar uğraşmamak adına şu ana kadarki kodu **dagılım\_grafigi** olarak tanımlayalım.

```r
dagılım_grafigi <- ggplot(gapminder_2007, aes(yaşam_süresi, kişi_başı_milli_gelir, color = kıta))+geom_point(size = 4, alpha = 0.7) +labs(x="yaşam süresi", y ="kişi başına düşen milli gelir", title = "5 Kıtada Yaşam Süresi ve Kişi Başına Düşen Milli Gelir İlişkisi", subtitle = "Veri Kaynağı: Gapminder, 2007", caption = "@demirelsadettin")+scale_color_manual(values = renk)
```

Sonrasında +theme\_minimal() fonksiyonunu **dağılım\_grafigine** ekleyerek görselimizin temasını kolaylıkla değiştirebiliriz. Ayrıca grafiği daha iyi görüntüleyebilmek için lejand’ı **+theme(legend.position = “bottom”)** koduyla alta alabiliriz.

```r
dagılım_grafigi+theme_minimal()+theme(legend.position = "bottom")
```

Var olan temalar dışında kendi özel temamızı da oluşturabiliriz. Kendi fontumuzu seçebilir, grafik arka planını dilediğimiz fonda renklendirebiliriz. Basım kalitesinde görseller elde etmek için genelde özel temalar kullanılır. Özel tema olarak aşağıdaki kodu kullanacağız. Theme\_minimal üzerine bazı eklemeler yaparak orijinal bir tema oluşturdum. Font olarak roboto, arka plan rengi için de griyi kullanmanızı tavsiye ederim.

```r
theme_custom <- function() { theme_minimal() + theme( text = element_text(family = "Roboto", color = "gray25"), plot.title = element_text(face = "bold"), plot.subtitle = element_text(size = 11), plot.caption = element_text(color = "gray30"), plot.background = element_rect(fill = "gray95"), legend.position = "bottom", legend.title = element_blank() ) }
```

Bu kodu R konsolda çalıştırdıktan sonra, aşağıdaki kodla estetik ve bir görsel elde edebiliriz.

```r
dagılım _grafigi+theme_custom()
```

![](https://cdn-images-1.medium.com/max/1024/0*C7oLZfE_5RWULaJT.png)

Sonuç olarak görülüyor ki yaşam süresi ile kişi başına düşen milli gelir arasında pozitif korelasyon var. Çünkü yaşam süresi uzun olan ülkeler aynı zamanda yüksek milli gelire sahip. Kıtalar arasındaki gelişmişlik farkını da ayrıca not edelim.

Aşağıdaki uygulamaları ve kod & veri setini indirerek bu yazıdaki çalışmayı kendi cihazınızda tekrarlayabilirsiniz.

**İndirilecek yazılımlar**

*R yazılımı:* [*https://www.r-project.org/*](https://www.r-project.org/)

*R studio:* [*https://www.rstudio.com/products/rstudio/download/*](https://www.rstudio.com/products/rstudio/download/)

***Yazıda Kullanılan Kodlar*** [*Freedom House Dünya Özgürlükler Raporu Verisi*](https://drive.google.com/open?id=1daJXQv89gwbpMsEMWkuezlaHPKvanAIG)

*Daha öncesinde* [*https://www.newslabturkey.org*](/blog/r-ekosisteminde-veri-nasil-gorsellestirilir/)*’da yayımlanmıştır*

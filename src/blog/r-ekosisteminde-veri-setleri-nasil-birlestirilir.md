---
title: "R ekosisteminde veri setleri nasıl birleştirilir?"
date: 2019-07-10
author: Sadettin Demirel
excerpt: "Veri gazeteciliği genel olarak veriyi inceleyerek, tarayarak, analiz ederek ve görselleştirerek verideki ilişkiler ve çıktıların habercilik pratiklerinde kullanılması olarak tanımlanıyor. Kısaca gazetecilik faaliyetleri…"
thumbnail: https://www.newslabturkey.org/wp-content/uploads/2019/06/Collage_Fotor.jpg
tags_display: "Alet Çantası, Veri gazeteciliği, r programlama, rstat, veri gazeteciliği"
original_url: https://newslabturkey.org/2019/07/10/r-ekosisteminde-veri-setleri-nasil-birlestirilir/
original_source: NewsLabTurkey
---
Veri gazeteciliği genel olarak veriyi inceleyerek, tarayarak, analiz ederek ve görselleştirerek verideki ilişkiler ve çıktıların habercilik pratiklerinde kullanılması olarak tanımlanıyor. Kısaca gazetecilik faaliyetleri için verinin gücünden yararlanarak hikâyeler anlatmak da denebilir. Genellikle veri haberciliği pratiklerinde de gazetecilerden veri noktalarını birleştirerek,

karşılaştırarak, oranlayarak bir sonuca varmaları ve anlamlandırmaları bekleniyor. Bazı durumlarda zahmetli olabilen veri birleştirme sürecini R ekosisteminde nasıl gerçekleştirebileceğimizi bu yazıda anlatacağım.

**Neden veri birleştirme (data joining) işlemine ihtiyaç duyuyoruz?**

Veri setleri genelde belirli kategorilerde belli başlı değişkenlerle sunuluyor. Fakat her veri tablosunun istediğimiz tüm değişkenleri içermesi mümkün değil. Bu nedenle farklı değişkenler arasındaki ilişkileri inceleyebilmemiz ve belirli korelasyonlar elde edebilmemiz için veri setlerini ortak değişkenler yardımıyla birleştirmemiz gerekebiliyor. Örneğin, Türkiye’de iller bazında okuma-yazma oranının doğum oranları üzerine etkisini incelediğimizi düşünelim. Aynı veri tablosu içinde bu iki değişkeni bulamayacağımız için her iki değişkeni barındıran veri setini indirmeli, il sütunu yardımıyla birleştirme (join) işlemine başvurmalıyız. [Tabi ki bu işlemi ofis programları ve Tableau yazılımı ile de gerçekleştirebiliyoruz](/blog/veri-setlerini-birlestirmek-icin-pratik-3-yol/), ama R ekosisteminin sunduğu olanaklar bu işlemi kat be kat daha kolaylaştırıyor.

**Kullanılacak paketler ve veri setleri**

Veri birleştirme işleminde [“R Dplyr paketi ile veri nasıl işlenir ve analiz edilir?](/blog/r-ekosisteminde-dplyr-ile-veri-nasil-islenir-ve/)” yazımda ele aldığım veri işleme ve veri manipülasyonu pratiklerini kolaylaştıran dplyr paketini kullanacağım. Bu uygulamada 6 ayrı dplyr komutu ile eldeki veri setlerinin durumuna göre belirli işlemler yapacağız. Uygulamaya geçmeden önce kullanacağımız verilere göz atalım.

**23 Haziran İBB seçim verisi**

İlk veri setinde partilerin oy dağılımlarının bulunduğu değişkenleri bir tablodan diğerine aktaracağız. Bu işlemde left\_join ve right\_join gibi komutlar kullanacağız.

![23 Haziran İBB Seçimleri Oy Dağılımı (%)](https://www.newslabturkey.org/wp-content/uploads/2019/06/Collage_Fotor.jpg)
*23 Haziran İBB Seçimleri Oy Dağılımı (%)*

**Freedom House Dünya Özgürlükler Raporu ve Yolsuzluk Algısı Endeksi verileri**

İkinci veri setinde ise daha karmaşık veri setleriyle çalışacağız. Amacımız dünya özgürlük verileri ile yolsuzluk algısı arasındaki ilişkiyi bulmak. Bu nedenle Dünya özgürlük verileri ve yolsuzluk endeksi verilerini birleştirerek her iki veri tablosunda bulunan ülkelerin durumunu görselleştireceğiz.

![2018 yılı Yolsuzluk Algısı Endeksi verileri](https://www.newslabturkey.org/wp-content/uploads/2019/06/cpı.png)
*2018 yılı Yolsuzluk Algısı Endeksi verileri*

![2018 Yılı Freedom House Dünyada Özgürlükler Verisi](https://www.newslabturkey.org/wp-content/uploads/2019/06/fop.png)
*2018 Yılı Freedom House Dünyada Özgürlükler Verisi*

Veri birleştirme aşamasına geçmeden önce şunu hatırlamakta fayda var: Ancak ve ancak iki veri seti arasında ortak değişken veya değişkenler varsa bu işlem sonrası yapılan analiz anlamlı olur. Yukarıdaki veri setlerinde ilçe ve ülke sütunları veri setlerinde ortak değişken olarak göze çarpıyor.

## **1\. left\_join ve right\_join yardımıyla verileri birleştirme**

left\_join ve right\_join komutları veri setlerinin konumuna göre ortak bir değişken yardımıyla bir veri setindeki verileri bir diğerine aktarıyor. Ortak değişken bir nevi bu iki veri setini birleştirme sürecinde anahtar rolü görüyor Ortak değişkene sahip X ve Y adlı iki ayrı veri setimizin olduğunu düşünelim, bu iki veri setini birleştirmek için normalde kullanmamız gereken kod:

yeni\_veri <- **right\_join**(x,y, by =”ortak degişken”) *x’deki verileri y’ye aktarılıyor* yeni\_veri <- **left\_join**(x,y, by =”ortak degişken”) *y’deki veriler x’e aktarılıyor*

![Görsel: Garrick Aden-Buie](https://www.newslabturkey.org/wp-content/uploads/2019/06/right-join.gif)
*Görsel: Garrick Aden-Buie*

Ama bu işlemi aynı zamanda daha önceki yazılarımda da bahsettiğim gibi zincir operatörü (**%>%**) ile daha akıcı hâle getirebilir birçok işlemi birbirine bağlayabiliyoruz.

yeni\_veri <- x %>% right\_join(y, by=”ortak değişken”) yeni\_veri <- x %>% left\_join(y, by=”ortak değişken”)

Bu noktada önemli olan hangi veri setindeki değerleri hangisine aktaracağınız, ona göre **left\_join** ve **right\_join** komutları tercih edilebilir.

![Görsel: Garrick Aden-Buie](https://www.newslabturkey.org/wp-content/uploads/2019/06/left-join.gif)
*Görsel: Garrick Aden-Buie*

Yapacağımız veri birleştirme işlemine gelirsek: Akp ve Chp oy oranlarını bir tablodan diğerine aktaracağız. İlk işlemde Akp oy dağılımının bulunduğu sütunu Chp’nin oy oranlarının yer aldığı veri tablosuna taşıdık. Bu aşamada ilçe sütunu eşleştirici anahtar değişken görevi gördü.

![](https://www.newslabturkey.org/wp-content/uploads/2019/06/ibb_secim2.png)İkinci işlemde ise bu sefer left\_join komutunu kullanarak Chp’nin oy dağılımını Akp’nin oy oranlarının bulunduğu tabloya aktardık. Bu işlemleri animasyonlarda gösterildiği şekilde de yapabilirdik.

![](https://www.newslabturkey.org/wp-content/uploads/2019/06/ibb_secim1.png)

Son olarak partiler arası oy farkını yüzdelik olarak ilçe bazında görselleştirelim. Görüldüğü üzere İmamoğlu, Yıldırım’a en büyük farkı (%68) Beşiktaş’ta atarken Yıldırım lehine fark (%33) en fazla Sultanbeyli’de gerçekleşti.

![Görselleştirmenin kodlarına sayfanın en altındaki linkten ulaşabilirsiniz.](https://www.newslabturkey.org/wp-content/uploads/2019/06/fark.png)
*Görselleştirmenin kodlarına sayfanın en altındaki linkten ulaşabilirsiniz.*

Veri birleştirme işlemi basit bir işlem ama bazı durumlarda veri seti aynı sayıda ortak değere sahip olmayabilir. Bu pratikte İstanbul’un ilçelerini anahtar değişken olarak kullandık. Peki farklı araştırmalarda veya raporlardaki verileri nasıl birleştirebiliriz. Veri setlerinde bulunan ortak veya ortak olmayan değerlere nasıl ulaşabiliriz?

## 2\. Daha karmaşık veri setlerini birleştirme

İkinci veri birleştirme işleminde Freedom House 2018 Dünyada Özgürlükler Raporu ve 2018 yılı Yolsuzluk Algısı Endeksi verilerini kullanacağız. İşlem sonrası özgür ve demokratik ülkelerde yolsuzluk algısının nasıl seyrettiğini görselleştireceğiz. Bu iki veri seti İBB seçim verisine göre daha karmaşık çünkü ortak değişken aynı sayıda değil. Veri setlerini önizlersek yolsuzluk algısı endeksi 180, dünyada özgürlükler raporu ise 208 ülkeye dair veriler barındırıyor.

![](https://www.newslabturkey.org/wp-content/uploads/2019/06/veri_onizleme.png)

O hâlde ilk olarak bu iki araştırmanın veyahut veri setinin sahip olduğu ortak verileri bir araya getirelim. Bu işlemi inner\_join () komutu ile yapacağız. Çalışma mantığı left\_join ve right\_join fonksiyonlarında olduğu gibi çalışıyor. Fakat işlevi aşağıdaki animasyonda olduğu gibi iki veri setinde bulunan ortak değerleri anahtar değişken yardımıyla birleştirmek.

![Görsel: Garrick Aden-Buie](https://www.newslabturkey.org/wp-content/uploads/2019/06/inner-join.gif)
*Görsel: Garrick Aden-Buie*

İşlemi yine benzer bir şekilde gerçekleştirdik. Sol altta görülüyor ki her iki veri setindeki ülke sütununda 169 değer benzer.

![](https://www.newslabturkey.org/wp-content/uploads/2019/06/inner_join2.png)

Benzer veri noktalarına ulaştık. Peki ortak olmayan ne kadar değere sahipler? Bu işlemi ise inner\_join() komutunun zıttı olarak görebileceğimiz anti\_join() komutu ile gerçekleştireceğiz. Animasyonda görüldüğü üzere anti\_join() işlemde ilk kullanılan veri setindeki değerleri diğer veri setini kullanarak filtreliyor.

![Görsel: Garrick Aden-Buie](https://www.newslabturkey.org/wp-content/uploads/2019/06/anti-join.gif)
*Görsel: Garrick Aden-Buie*

Şimdi anti\_join yardımıyla Yolsuzluk Algısı Endeksinde bulunan ama Dünyada Özgürlükler Raporunda bulunmayan verileri filtreleyelim. Öyle görünüyor ki sadece 11 veri noktası uyuşmamış. Bu işlemi veri setlerinin kodda kullanılma sırasını değiştirerek Dünya Özgürlükler Raporunda bulunan ama Yolsuzluk Algısı Endeksine dahil edilmeyen ülkeleri de bulabiliriz.

![](https://www.newslabturkey.org/wp-content/uploads/2019/06/anti_join.png)

Kısacası inner\_join komutunu iki veri tablosundaki benzer değerleri, anti\_join’i ise farklı değerleri bulmak için kullanıyoruz. Peki iki veri setindeki tüm değerleri veri noktalarının aynı olup olmadığına bakmadan nasıl birleştirebiliriz. Bu aşamada full\_join() komutu imdada yetişiyor. Animasyonda olduğu gibi iki veri seti ortak olmayan bir değere sahip olsa da birleştirilebiliyor.

![Görsel: Garrick Aden-Buie](https://www.newslabturkey.org/wp-content/uploads/2019/06/full-join.gif)
*Görsel: Garrick Aden-Buie*

Görüldüğü üzere her iki veri setindeki veri noktalarını birleştirdik. Bu aşamada bir diğer önemli nokta şu: Her iki tablosunda benzer değerler olmadığı durumlarda değişken karşılığı olmayan satır NA (veri noktasının olmadığını ifade eden) değeri alır. Nitekim aşağıdaki görselde NA değerlerini görebilirsiniz.

![](https://www.newslabturkey.org/wp-content/uploads/2019/06/full_join2.png)

Son olarak birleştirdiğimiz veriyi Flourish ile interaktif bir şekilde görselleştirelim.

<div class="embed-container"><iframe src="https://flo.uri.sh/visualisation/452986/embed" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

**Ek komutlar ve kaynaklar**

Bu yazıda kullandığım veri birleştirme komutları sıklıkla kullanılan dplyr komutları arasında sayılabilir. Ama bunların dışında fonksiyonlar da var ve veri manipülasyonu&birleştirme işlemleri için esnek yollar sunabiliyor. Aşağıdaki cheatsheet yardımıyla bu komutlara göz atabilirsiniz.

![Tüm cheatsheet’lere ulaşmak için görsele tıklayınız.](https://www.newslabturkey.org/wp-content/uploads/2019/06/data-transformation-1.png)
*Tüm cheatsheet’lere ulaşmak için görsele tıklayınız.*

-   R’a dair Türkçe kaynak kitaplara göz atabilirsiniz: [Kaynak 1](https://bookdown.org/content/2096/), [Kaynak 2.](https://bookdown.org/burak2358/SARP-TR/)
-   Bu yazıda kullanılan [tüm kodlar](https://sadettindemirel.github.io/veRi_biRlestiRme/veri-birlestirme-kodlar.html) ve [veri setlerine](https://github.com/sadettindemirel/veRi_biRlestiRme) buradan ulaşabilirsiniz.
-   Dplyr komutlarına dair görseller [Garrick Aden-Buie’nin GitHub sayfasından](https://github.com/gadenbuie/tidyexplain) alınmıştır.

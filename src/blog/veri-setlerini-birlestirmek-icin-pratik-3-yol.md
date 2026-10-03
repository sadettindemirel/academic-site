---
title: "Veri Setlerini Birleştirmek İçin Pratik 3 Yol"
date: 2020-04-10
author: Sadettin Demirel
excerpt: "Verinin yapısı ve içeriği yapılan veri analizlerini ve görselleştirmeleri doğrudan etkiler. Çünkü yapılacak analizden veya görsel çalışmadan çıkan sonuç aslında eldeki ham verinin özelliklerine bağlıdır. Bu gibi…"
thumbnail: https://cdn-images-1.medium.com/max/1024/1*mu935PCFBOFIcjOfil0pSQ.jpeg
tags_display: "Dplyr, Data Manipulation, Tableau, Veri Gazeteciliği"
original_url: https://medium.com/verijurnali/veri-setlerini-birle%C5%9Ftirmek-i%CC%87%C3%A7in-en-pratik-3-yol-ee86db3c02c3
original_source: Medium
---
![](https://cdn-images-1.medium.com/max/1024/1*mu935PCFBOFIcjOfil0pSQ.jpeg)

Verinin yapısı ve içeriği yapılan veri analizlerini ve görselleştirmeleri doğrudan etkiler. Çünkü yapılacak analizden veya görsel çalışmadan çıkan sonuç aslında eldeki ham verinin özelliklerine bağlıdır. Bu gibi analizlerde farklı değişkenler eklenerek bu ilişkilerden çıktılar elde edilir. Bu ister sıralama, oranlama veya karşılaştırma olsun bazen değişkenler araştırmada veya veri toplamada dahil edilirken diğer durumlarda bu değişkenler denkleme analizi yapan tarafından eklenir. Bu işlem genel olarak veri manipülasyonu (data manipulation) olarak bilinse de veri birleştirmeyi kullanmak, basitleştirmek daha uygun geldi.

Veri setlerini birleştirmeye örnek olarak TÜİK, her yıl illere göre trafik kazası istatistiklerini yayınlıyor ama bu istatistiklerde toplam araç ve toplam sürücü sayısı eklenmeyebiliyor. Bahsedilen değişkenler eklenerek farklı analizler yapılabilir. Veya birbirinde iki farklı araştırmayı (Freedom House’ın Basın Özgürlüğü ve İnternet Özgürlüğü Raporlarını) birbirine ekleyerek ilgili hükümetlerin basın ve internet özgürlüğü skorları karşılaştırılabilir. Tabi bu işlemleri yapmak için belirli yöntemler var.

## Kullandığım üç yöntem:

-   *VLOOK Up (Google E-tablolar & MS Excel)*
-   *Tableau ile Veri Birleştirmek*
-   *R dplyr paketi ile veri birleştirme*

Şimdi bu üç veri birleştirme yöntemini TÜİK trafik kazaları ve Freedom House Basın Özgürlüğü ve İnternet Özgürlüğü verilerini kullanarak inceleyelim.

## 1) VLOOKUP formulü ile verileri birleştirme

Vlookup formulü, tablo formatında verilerin analizinde kullanılan Excel, Google E-tablolar ve Open Office’de kullanılıyor. Formül kısaca iki ayrı tablo arasında değişkenlerin bir tablodan diğerine aktarılmasına dayanıyor. Özellikle büyük boyutlu veri setlerinde zaman kaybını önleyen önemli ve pratik bir formül.

Elimizde kaza, sürücü ve taşıt olmak üzere 3 ayrı veri tablosu var. ilk tablo TÜİK 2016 yılı illere göre trafik kazası verileri. İllere göre sürücü sayısı verisi Trafik Genel Müdürlüğü’nden, taşıt sayısı yine TÜİK’in farklı bir araştırmasından elde edildi. İki veri tablosun da 2016 yılına ait veriler yer alıyor.

![Kaynak: Tüik Trafik Kazaları](https://cdn-images-1.medium.com/max/1024/0*cSdWOzCwpFEd-SnD.png)
*Kaynak: Tüik Trafik Kazaları*

Normalde **VLOOKUP** birbirine eklenecek tablolarda sıra no veya seri no eklenerek kullanılıyor. kullandığımız veri de ilk sütun benzer olduğu için sıra numarısını gerekli görmedim (Üşendim :)).

Uygulama kısmında aşağıdaki animasyondo görüleceği gibi “**Kaza**” ve **Sürücü**” olmak üzere iki ayrı tablo var. Amacımız sürücü sayısını illerde meydana gelen trafik kazalarının bulunduğu tabloya eklemek. Bunun için kullanılacak formül:

> \=VLOOOKUP(ilk tablonun 2. satırı; ikinci tablonun veri aralığı; ikinci tablodan eklenecek sütun sırası; FALSE)

> \=VLOOKUP(A2;Sürücü!A:B;2;FALSE)

İşlem sonrası değerin sağ alt köşesinde artı sembolüne çift tıklandığında (animasyonda olduğu gibi) **Sürücü** veri tablosundan Kaza veri tablosuna verileri transfer etmiş olduk.

## 2) Tableau joining fonksiyonu ile verileri birleştirme

Tableau, bir business intelligence (iş zekası) yazılımı. Veri analizi ve veri görselleştirme amaçlı kullanılıyor. Tableau interaktif bir veri görselleştirme aracı, ücretsiz sürümü Tableau Public aynı zamanda çalışmaların sunulduğu ve paylaşıldığı online bir platform. Detaylı bilgiyi daha önceki incelemelerimden yararlanılabilir:

[Tableau ile deprem verilerini görselleştirmek](/blog/tableau-ile-deprem-verilerini-gorsellestirmek/)

[*Tableau ile Türkiye’nin interakif haritasını çıkarmak*](/blog/tableau-ile-turkiye-nin-interaktif-haritasini-cikarmak/)

[*Ücretsiz veri görselleştirme araçları*](/blog/ucretsiz-veri-gorsellestirme-araclari/)

Tableau ile veri görselleştirme çalışmaları değil, aynı zamanda veri analizi ve veri manipülasyonu da yapılabiliyor. Özellikle joining olarak bilinen veri tablolarını birleştirme özelliği kullanıcıya verileri birbirine ekleme ve çıkarma esnekliği sunuyor.

![Tableau App Ekran Görüntüsü](https://cdn-images-1.medium.com/max/1024/0*1IeV7bVjOYfGlHFQ.png)
*Tableau App Ekran Görüntüsü*

Üstteki görselde alttaki görüldüğü üzere bir veri dosyası içindeki iki tablo belirtilen alana sürüklendiğinde tableau kullanıcıya 3 ayrı seçenek sunuyor:

> **Inner**: İki tabloda da ortak olan değerler

> **Left**: Sadece soldaki ver tablosunda olan değerler

> **Right**: Sadece sağdaki veri tablosunda olan

> **Full Outer**: İki tabloda yer alan, kesişen veya kesişmeyen tüm değerler

Eldeki veriye ve yapılmak istenen analize göre işlemlerden biri seçildikten sonra analize tableau’de devam edilebilir veya üst sekmede yer alan “***Data > Export data to csv”*** kısmından veri dışarı aktarılabilir.

## 3) R dplyr paketi ile verileri birleştirme

R açık kaynak, ücretsiz istatistik dili ve istatistik yazılımı. Dplyr ise R’ın yüzlerce paketlerinden bir tanesi. Hadley Wickam tarafından geliştirilen dplyr paketi R’da genellikle veri manipülasyonunda kullanılıyor. Bu paketle kullanıcı sadece verileri birleştirmekle kalmıyor aynı zamanda değerleri seçme, sıralama, filtreleme, ekleme, gruplama gibi bir çok işlemi gerçekleştirebiliyor.

Dplyr paketinin join fonksiyonları ve ortak bir değişken yardımıyla veri tablolarındaki sütunlar birbirine eklenebiliyor. Özellikle (yine Hadley Wickam tarafından yazılan) purrr paketiyle brlikte kullanıldığında 2'den fazla veri tablosunu sadece 3 satır kodla birleştirilebiliyor.

Üstteki görselde görüldüğü gibi R purrr ve dplyr paketleri ile 5 adımda 2 değişken kolaylıkla bir tabloda birleştirilebiliyor.

Animasyondaki kodun tamamı:

<a href="https://medium.com/media/e217c9412b379cb8b01a48d03ebc520e/href">https://medium.com/media/e217c9412b379cb8b01a48d03ebc520e/href</a>

Sonuç olarak bu saydığım üç yöntem de veri tablolarını birleştirmek için pratik çözümler sunuyor. Devasa veri setleri göz önüne alındığında kesinlikle hayat kurtarıcı ve zamandan tasarruf sağlıyor.

Veri manipülasyonu işlemi sonucu elde edilen verinin görselleştirilmesi:

[***Ülkelere Göre Basın ve İnternet Özgürlüğü Puanları***](http://public.tableau.com/views/lkelereGrenternetveBasnzgrlPuanlarFH2016/Dashboard1?:embed=y&:loadOrderID=0&:display_count=yes)

![](https://cdn-images-1.medium.com/max/809/1*oZX67u4FWdsBNVCgYiaZSA.png)

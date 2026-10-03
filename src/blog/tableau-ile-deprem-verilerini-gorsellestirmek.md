---
title: "Tableau ile deprem verilerini görselleştirmek"
date: 2020-04-10
author: Sadettin Demirel
excerpt: "Bu yazı tableau public aracı ile deprem verilerinin nasıl görselleştirilebileceğine dair bir inceleme yazısıdır. Bahsi geçen veriler AFAD verileridir. Şu adresten indirilebilir. Bu inceleme için kullandığım veri setine…"
thumbnail: https://cdn-images-1.medium.com/max/1024/1*2k9nqQMdYbasOGKLwiWWFw.png
tags_display: "Tableau, Data Visualization, Veri Gazeteciliği, Veri Görselleştirme, Tableau Public"
original_url: https://medium.com/verijurnali/tableau-public-ile-deprem-verilerini-g%C3%B6rselle%C5%9Ftirmek-6b621dbf3b25
original_source: Medium
---
![Görseldeki çalışma için tıklayınız](https://cdn-images-1.medium.com/max/1024/1*2k9nqQMdYbasOGKLwiWWFw.png)
*Görseldeki çalışma için tıklayınız*

## Tableau ile deprem verilerini görselleştirmek — (İnceleme)

*Bu yazı* [*tableau public*](https://public.tableau.com/en-us/s/) *aracı ile deprem verilerinin nasıl görselleştirilebileceğine dair bir inceleme yazısıdır. Bahsi geçen veriler AFAD verileridir.* [*Şu adresten*](http://www.deprem.gov.tr/) *indirilebilir. Bu inceleme için kullandığım veri setine ise* [*şuradan*](https://drive.google.com/open?id=0B4zBqf-mJbr1LXhCRFpRdnhPLXM) *ulaşılabilir.*

Türkiye Alp-Himalaya deprem kuşağı içinde yer alıyor. Bulunduğumuz bölge orta kuşağın tektonik olarak en hareketli bölgelerinden biri. Öyle ki bu yazıyı okuduğunuz dakikalar dahi ülke içinde veya çevresinde küçük çaplı depremler meydana geliyor. Bunları nasıl biliyorum. Başbakanlığa bağlı [AFAD (Afet ve Acil Durum Yönetimi Başkanlığı Deprem Dairesi Başkanlığı](http://www.deprem.gov.tr/tr/sondepremler) sayesinde. Bu kurum ülkenin dört bir yanında yer alan istasyonlar aracılığıyla son 1 ayda meydana gelen depremlerin kaydını alıyor ve verilerini yapılandırılmış *CSV, KML ve Sfile* formatlarında indirme olanağı sunuyor. [Deprem haritasına bu linkten ulaşabilirsiniz.](https://web.archive.org/web/20171115045351/http://www.deprem.gov.tr/tr/anasayfa)

![Türkiye güncel deprem haritası / 02.12.16](https://cdn-images-1.medium.com/max/1024/0*agTXfb66_XhtQVN5.png)
*Türkiye güncel deprem haritası / 02.12.16*

Ayrıca sayfayı biraz kurcalarsanız [1976'dan günümüze medyana gelmiş depremlerin verilerine](http://kyhdata.deprem.gov.tr/2K/kyhdata_v4.php?dst=TU9EVUxFX05BTUU9ZWFydGhxdWFrZSZNT0RVTEVfVEFTSz1zZWFyY2g%3D) ulaşabilirsiniz. Peki ne önemi var. Devlet kurumlarının bu verileri sağlaması zaten görevi değil mi?

Birincisi görevi olsa da topladığı verileri bu denli düzenli bir şekilde ve paylaşması konusunda Deprem Dairesi Başkanlığını kutlamak gerek. Aynı veriler bize pdf formatında da sunabilirdi ki bir çok devlet kurumu halen bu yolu izliyor.

İkincisi ise yaşadığımız coğrafya itibariyle deprem artık hayatımızın bir parçası ve deprem gibi hızlı bir doğa olayı karşısında bilginin hızlı bir şekilde yayılması ve gereken önlemlerin alınması için böyle bir teknoloji kullanılması gerekli.

Üçüncüsü ve bu yazının konusunu oluşturması nedeniyle bu tip verilerin paylaşılması; gazeteciler, araştırmacılar ve uzmanlar gibi kalifiye çalışanlar tarafından araştırmalarda ve haberlerde kullanılması, bir nevi ham veriden artı değer yaratılmasına olanak sağlar.

Bu yazıda son 1 ayda meydana gelmiş depremlerin [Tableau Public](https://en.wikipedia.org/wiki/Tableau_Software) aracıyla nasıl görselleştirileceğinden bahsedeceğim. Neden deprem verilerini kullanıyorum, çünkü deprem konusu, Türkiye’de bir elin parmağını geçmeyen yapılandırılmış veri kaynaklarına ulaşabileceğiniz alanlardan birisi.(bkz: [yapılandırılmış veri](https://brightplanet.com/2012/06/structured-vs-unstructured-data/))

## Tableau public nedir?

Tableau, bir business intelligence (iş zekası) yazılımı. Veri analizinde ve veri görselleştirme amaçlı kullanılabiliyor. [Tableua Public](https://public.tableau.com/) ise ücretli ve lisanslı olan hizmetin 10 gb limitli ücretsiz sürümü. Üye olarak bu platforma katılabilir ve yazılımdan faydalanabilirsiniz.

## Tableau public ile veri görselleştirme

İlk olarak görselleştirme için verimizi deprem.gov.tr adresinden indirelim.

![](https://cdn-images-1.medium.com/max/1024/0*eQSXjghLQ-b6aLS-.png)

## 1) Verini yükle ve kontrol et

-   Yazılımı başlattığımızda karşımıza böyle bir sayfa çıkıyor. Görüldüğü gibi bu kısımda elimizdeki veriyi yüklüyoruz. Elimizdeki dosya CSV formatında olduğu için metin (text file) seçeneğiyle verimizi yüklüyoruz.

![](https://cdn-images-1.medium.com/max/795/0*BSyt4UeTB4_97E5K.png)

-   Yüklediğimizde karşımıza böyle bir panel çıkıyor. Panelde görüldüğü üzere deprem verisi veri tablosu şeklinde gösteriliyor. Bu kısım aslında en önemli kısım. Çünkü verinin formatını belirleyeceğimiz kısım burası.
-   Ekran görüntüsünde yer alan veri tablosunda # işaret sayı, (📆 ) tarihler takvim formatında, coğrafi veriler ise (🌎 ) sembolü ile gösteriliyor. Fakat bu veri setinde enlem ve boylam sütunları sayı olarak algılanmış. Deprem verilerini haritalandıracağımız için verinin formatını sayıdan enlem ve boylama çevirmeliyiz.

![](https://cdn-images-1.medium.com/max/1024/0*H7_RTtwEBTXUacju.png)

-   Alttaki resimde görüldüğü gibi sembolün üzerine tıklayarak sütundaki verinin formatını kolayca değiştirebiliriz.

![](https://cdn-images-1.medium.com/max/1012/0*mxO99a8gh2DW9jZk.png)

-   Ayrıca istenmeyen sütunları saklayarak, göz önünde bulunmalarını engelleyebiliriz.

![](https://cdn-images-1.medium.com/max/1013/0*H6KE5xenCqoImICj.png)

-   Elimizdeki verinin formatını düzenledikten sonra alt menüde yer alan “***Sheet 1***” butonuna tıklayarak görselleştirme paneline ulaşıyoruz.

![](https://cdn-images-1.medium.com/max/887/0*mRoPscAQhDqLsSFl.png)

## 2) Verini Görselleştir

### a) Tableau public arayüzüne dair

Sayfa1 (sheet1) butonuna tıkladığımızda karşımıza aşağıdaki gibi bir panel çıkıyor. Karşınıza aşağıdaki ekran görüntüsündeki gibi bir panel çıkacak. (*ekran görüntüsü daha önceki bir sunumdan alınmıştır, bu yüzden eğer deprem verisini kullanmışsanız, sizdeki ekranda farklı* ***measures*** *ve* ***dimensions*** *öğeleri* *olacaktır*)

Aşağıdaki panel Tableu Public ile veriyi analiz edeceğimiz ve grafikler oluşturacağımız panel. Veri görselleştirmeye dair tüm zahmetli iş aslında bu adımda yer alıyor.

İlk kısım **Measure**s ve **Dimensions** başlıkları altında yer alan sayısal ve metinsel veriler. **Measures** daha çok ölçülebilen sayısal verileri içerirken, **Dimensions i**se metinsel ve lokasyon verilerini bünyesinde bulunduruyor. Ayrıca her sütun başlığından önce veri formatını gösteren sembolleri görmek mümkün.

İkinci kısım ise editör bölümü. Üretilen veri görselleştirme biçimi (sütun, pasta, çizgi grafik veya harita vb.) bu kısımda düzenleniyor. Renk, sembol biçimi, oranı, fare sembolün üzerinde ne geldiğinde ne gösterileceği bu bölümdeki (*color, size, text, detail ve tooltip*) öğeleriyle ayarlanıyor.

Üçüncü kısım grafiğin gösterildiği alan. 1. bölümdeki öğeler bu alana veya column (sütun), row (satır) kısmına sürüklenerek de kolayca görselleştirme yapılabilir.

![](https://cdn-images-1.medium.com/max/1024/0*Z2PrN57MKV4qJFFQ.png)

Dördüncü kısım ise veri görselleştirme tekniklerinin (biçimlerinin) bulunduğu yer. Daha çok bir kılavuz görevi görüyor. *Eğer 1. bölümden 3. kısıma öğeleri sürüklediğiniz de anlamlı bir grafik elde edememişseniz, 4. kısıma tıklayarak sürüklediğiniz veriyle hangi grafikler ve görseller üretilebilir yardım alabilirsiniz.* Ayrıca 1. kısımdaki öğelerden ikisini ctrl tuşuyla seçtikten sonra 4. kısıma tıklayarak da hızlı bir grafik elde edilebilir.

![](https://cdn-images-1.medium.com/max/1024/0*N0cV6z64I8znmXBS.png)

Beş ve altıncı kısımlar ise daha çok üst ve alt menü görevi görüyor. Üstteki menüden grafik alanının ölçüsü ayarlanabilir ve grafikteki öğeler sıralanabilirken, alt menü ise oluşturulan birden çok panel arasında gezinme işlevi görüyor.

![](https://cdn-images-1.medium.com/max/760/0*QklQew3mTP4613uL.png)

![](https://cdn-images-1.medium.com/max/549/0*4mE-8YhT-HEMrv9r.png)

Şekildeki gibi grafik 1 ve grafik 2 sayfaları görselleştirmelerin oluşturulduğu, *Dashboard 1* (gösterge tablosu) ve *story 1* (Hikaye1) ise üretilen görselleştirmelerin hangi biçimde yayınlanacağına yönelik alternatif yollar sunuyor.

### b) Tableau Public ile adım adım veri görselleştirme

Öncelikle veri görselleştirme teknikleri hakkında şu katalogdan detaylı bilgi alınabilir. Envai çeşit görselleştirme biçimlerinin tanıtıldığı veri görselleştirme kataloğu bu açıdan elverişli bir kaynak. Bu adımdan önce elimizdeki AFAD deprem verilerini Tableau’nun editörüyle düzenlediğimizi varsayalım.

**Adım 1: İnteraktif harita oluşturma**

Diyelim ki depremin büyüklük değerini illere ve ilçelere göre dağılışını gösteren bir harita oluşturmak istiyoruz. Bunun için ilk olarak “**measures”** kategorisi altında yer alan enlem ve boylam öğelerini birlikte seçiyoruz. Sonrasında “**show me**” paneline tıklıyoruz. Görüldüğü üzere araç zaten bize harita yöntemini öneriyor. Bu kısımda yapacağımız bir diğer değişiklik ise araç enlem ve boylam verilerinin averajını aldığı için sadece bir noktayı görüyoruz. Bunu düzeltmek için üstteki kısımdaki boylam ve enlem verilerini **“dimension”** formuna dönüştürüyoruz Bu şekilde deprem yaşanan noktalar ayrı ayrı görülebilir.

**Adım 2: Renk ve sembolleri düzenleme**

Harita sadece deprem olmuş noktaları gösteriyor. Noktaların üzerine gezinirsek sadece enlem ve boylam verileri görebiliriz. Yani henüz haritayı anlamdıran veriyi eklemedik. Haritamız depremin büyüklük değerini göstereceği için **“measures** kategorisindeki “**büyüklük”** öğesini hem *oran(size)* hem de *renk(color)* butonu üzerine sürükleyerek haritayı düzenliyoruz.

Ayrıca haritada deprem olmuş noktaları temsil eden sembolleri de kolayca değiştirebiliriz. Şuan kırmızı daire sembolü deprem olan bölgeleri temsil ediyor. Editör panelinde yer alan *otomatik (automatic)* butonuna tıklayıp *şekil (shape)* seçeneğini seçtiğimizde editörde şekil(shape) adı ile bir butan ortaya çıkıyor. Bu buton aracılığıyla istenilen sembol seçilebilir. Hatta kendi sembolümüzü de ekleyebiliriz.

**Adım 3: Veri ekleme, başlık düzenleme ve yeni sayfa oluşturma**

Harita şuan depremin büyüklüğünü ve deprem yaşanan bölgelerin lokasyon verilerini içeriyor. Bunu daha anlamlı hale getirmek için depremin olduğu bölgelerin il ve ilçe verilerini **“dimension”** kategorisindeki il, ilçe ve köy verilerini *“tooltip”* butonuna sürükle-bırak yapılması yeterli. Aşağıdaki gif’te de görüldüğü gibi şuan tüm noktalar depremin yaşandığı bölgeye dair bilgiler içeriyor. Bunu çeşitlendirebilir, tarih ve derinlik verilerini de ekleyebiliriz.

Son olarak oluşturulan görselleştirmeler onlara özgü başlıklar oluşturarak, daha anlamlı hale getirebilir. Tableau Public ile birden fazla görselleştirme oluşturulabilir. Alt panelden yeni bir sayfa(sheet) oluşturarak bir veri seti birden fazla grafikle analiz edilebilir.

**Adım 4: Dağılım grafiği oluşturma ve filtreleme**

Tableau’nin filtreleme özelliğini görmek adına ikinci bir grafik oluşturalım. Yaşanan depremlerin büyüklük ve derinlik değeri arasındaki ilişkiyi gösteren bir dağılım grafiğini (scatter plot) aşağıdaki gibi oluşturuyoruz. Sonrasında bu değerlerin ne zamana ve nereye ait olduğunu saptama için *ülke* ve t*arih* öğelerini editör bölümündeki **“filter(filtreleme)”** kısmına sürükle-bırak yapalım.

Öğeleri filtre bölümün eklememize rağmen grafikte bu değişimi göremiyoruz. Bunun sebebi filtrelerken tüm değerleri seçmemiz. Tüm ülkeler ve tarihler seçildiği için henüz grafiğe bir şey yansımış değil. Bunu yapmak içinse filtrelenen öğenin üzerine gelip *show filter(filtreyi gösteri)* seçiyoruz ve grafiğin sağ tarafında lejand şeklinde filtreler ortaya çıkıyor. Bu filtreleri ve filtre başlıklarını da kolayca düzenleyebiliriz.

**Adım 5: Görselleştirmenin ölçülerini belirleme**

İstediğimiz görselleştirmeleri (harita ve dağılım grafiği) oluşturduk. Bu grafikleri ayrı ayrı yayınlayabileceğimiz gibi alt alta veya yan yana ekleyerek birlikte de yayınlayabiliriz. Ayrı ayrı yayınlamak için ***file > save to tableau public*** yolu izlenebilir veya sol üst köşede yer alan **save(kaydet)** butonu ile çalışmalarınızı yayınlayabilirsiniz.

Birden fazla grafiği beraber yayınlamak için ise alt menüde yer alan *dashboard* simgesine tıklıyoruz. Yeni bir sayfa açılıyor. Sol tarafta yer alan menüden görselimizin ölçüsünü belirliyoruz. Ve yine sol tarafta hazır olarak bulunan grafiklerimizi alana boş panele sürüklüyoruz.

Grafiklerin ekrana tam olarak yayılması için sağ taraftaki bazı lejandları kaldırmalıyız (isteğe bağlı). Kaldırmak istemiyorsak lejandların sağ üst tarafındaki simgeye tıklayarak lejandlar *floating (hareketli)* hale getirilebilir. İstenilen noktaya sürüklenebilir.

## c) Yayınlama ve paylaşma

Görselleştirmeleri dashboard kısmında birleştirdikten sonra ***File > Save to Tableau Public*** seçeneğiyle veya sol üst köşedeki **S*ave (kaydet)*** simgesiyle çalışmamızı kaydedebiliriz. [Şu sayfadan](https://public.tableau.com/profile/sadettin#!/vizhome/Depremharitas/Dashboard1) alacağımız embed kod ile bu tip çalışmalarımıza web sayfalarımızda ve bloglarımızda paylaşabiliriz.

Medium, henüz tableau ile uyumlu olmadığı için örnek veri görselleştirmeye [şuradan](https://public.tableau.com/profile/sadettin#!/vizhome/Depremharitas/Dashboard1) ulaşabilirsiniz

Ayrıca araç hakkında detaylı bilgiye ve eğitim videolarına [şu linkten](https://public.tableau.com/en-us/s/resources) ulaşabilirsiniz. Aşağıdaki videoda ise tüm detayları ile Tableau Public anlatılıyor.

<div class="embed-container"><iframe src="https://www.youtube.com/embed/gIDVoPi47Ko?feature=oembed" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

\*[Bu incelemedeki veri setine ulaşmak için tıklayınız](https://drive.google.com/open?id=0B4zBqf-mJbr1LXhCRFpRdnhPLXM)

\*Bu yazıdaki ekran görüntüleri ve gifl’er tableau public aracına aittir

\*CSV: [Coma Separated Value](http://www.verigazeteciligi.com/veri-gazetecileri-icin-temel-veri-kavramlari-veri-nedir-turleri-nelerdir/)

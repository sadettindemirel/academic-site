---
title: "Tableau ile veri analizi ve görselleştirme"
date: 2018-11-11
author: Sadettin Demirel
excerpt: "Tableau, hem ücretsiz sürümü hem de zengin ve interaktif veri görselleştirme olanakları ile veri görselleştirmeyle ilgilenenler için vazgeçilmez araçlardan birisi. Bir business intelligence (iş zekâsı) yazılımı olarak…"
thumbnail: https://www.newslabturkey.org/wp-content/uploads/2018/11/Ekran-Resmi-2018-11-07-21.26.10.png
tags_display: "Alet Çantası, Veri gazeteciliği, tableau, veri gazeteciliği, veri görselleştirme"
original_url: https://newslabturkey.org/2018/11/12/tableau-ile-veri-nasil-analiz-edilir-ve-gorsellestirilir/
original_source: NewsLabTurkey
---
Tableau, hem ücretsiz sürümü hem de zengin ve interaktif veri görselleştirme olanakları ile veri görselleştirmeyle ilgilenenler için vazgeçilmez araçlardan birisi. Bir business intelligence (iş zekâsı) yazılımı olarak Tableau, özel şirketlerden kamu kuruluşlarına bir çok alanda veri analizi ve veri görselleştirme amaçlı kullanılıyor. Bu alanlardan birisi de kuşkusuz gazetecilik. Özellikle kod bilgisi gerektirmeyen arayüzü, zengin grafik kütüphanesi, interaktif yapısı ve ücretsiz “Public” sürümü ile veri gazeteciliği faaliyetleri için öğrenilmesi gereken araçların başında geliyor.

Tableau Public sürümü ile veri görselleştirme çalışmalarını internet ortamında paylaşabiliyoruz. Çalışmayı sitemize interaktif bir şekilde ekleyebilmemizin yanı sıra dilersek png, jpeg veya pdf formatlarında da indirebiliyoruz. Pratik kısmına geçmeden önce Tableau ile nasıl harikalar yaratılıyor, nasıl sanat eseri tadında veri görselleştirmeler elde ediliyor bir göz atalım.

[Maraton rekorlarının görselleştirildiği şu çalışma](https://public.tableau.com/en-us/s/gallery):

![](https://www.newslabturkey.org/wp-content/uploads/2018/11/Ekran-Resmi-2018-11-07-21.26.10.png)

[Son yüzyılda ABD temsilciler meclisinde kadın temsilcilerin değişimi](https://public.tableau.com/en-us/s/gallery):

![](https://www.newslabturkey.org/wp-content/uploads/2018/11/Ekran-Resmi-2018-11-07-21.29.28.png)

[Londra’da bisikletinizin çalınmasını nasıl engellersiniz?](https://public.tableau.com/profile/athan.mavrantonis#!/vizhome/StolenBikesinLondon/LondonStolenBikes):

![](https://www.newslabturkey.org/wp-content/uploads/2018/11/Ekran-Resmi-2018-11-07-21.34.18.png)

Bu üç görselleştirme de Tableau ile tasarlandı, karmaşık görünse de biraz pratikle [benzer çalışmalar](https://public.tableau.com/profile/sadettin#!/vizhome/OkumaYazmaOranArttkaDourganlkOranAzalyor/Dashboard1) oluşturabilirsiniz.

Tableau Public yazılımını şu [linkten](https://public.tableau.com/en-us/s/) indirebilirsiniz. Pratik kısmında [2016 yılı TÜİK Kitap ve Kütüphane İstatistiklerini](https://docs.google.com/spreadsheets/d/1-afs5mRGPj07GSLc000vWi-No4lUh8OCMpvsFZqGd0Q/edit?usp=sharing) kullanacağız. Öncesinde veri setimizin nelerden oluştuğuna bakalım. Her ne kadar veri TÜİK’den sağlansa da aşağıdaki değerler illeri nüfusa oranlayarak elde edildi.

**İl:** 81 adet şehir

**Halk kütüphanesi sayısı:** İllerde bulunan toplam halk kütüphanesi sayısı

**Yüz bine düşen kütüphane sayısı:** Her ilde 100 bin kişiye düşen kütüphane sayısı

**Yüz kişiye düşen kitap sayısı:** Her ilde 100 kişiye düşen kitap sayısı

**15+ Nüfus içinde kayıtlı üye oranı (%):** İllere göre kütüphanelere kayıt yaptıranların oranı

**Kütüphane kullanılma oranı (%):** İllere göre halk kütüphanelerinin kullanılma oranı

**Bölgeler:** İllerin bulunduğu 7 ayrı coğrafi bölge

## **1) Veri setini yükleyelim ve kontrol edelim**

Tableau yazılımını kurduktan sonra ilk olarak verinin formatına göre içeri aktaralım. Excel formatında olduğu için Microsoft Excel’i seçiyoruz. Veri dosyasını Tableau üzerine sürükle bırak yaparak bu zahmetten kurtulabilirsiniz.

![](https://www.newslabturkey.org/wp-content/uploads/2018/11/tableau1.png)

Verimizi yükledik, şimdi veri formatını kontrol edelim. Tableau otomatik olarak veri setindeki değerleri yapısına göre sayısal, zamansal ve coğrafi veri formatlarından biri olarak sınıflandırıyor. Kitap ve Kütüphane istatistiklerine bakarsak il verimiz dışında diğer veriler sayı verisi. İl verimiz hem kategorik veri hem de şehir isimlerinden oluştuğu için coğrafi veri. Veri setimizi içeri aktardığımızda Tableau sayı verilerini doğrudan sınıflandırmış ama il isimlerini “Abc” formatında kabul etmiş, yani sadece isim verisi olarak.

![](https://www.newslabturkey.org/wp-content/uploads/2018/11/t2.png)

Eğer veri setimizde il, ülke gibi değerler bulunuyorsa Tableau’ya bunların lokasyon verisi olduğunu belirtmeliyiz. Ancak bu sayede harita benzeri görsel çalışmalar yapabiliriz. O hâlde yapmamız gereken değişken isimlerinin üzerinde yer alan “**Abc”** sembolüne tıklayarak **Geographic Role** → **State/Province** ayarlarını seçmek. Eğer il değil de ülke verisi ile çalışıyor olsaydık, aynı menüden veri formatını **Country/Region** seçmeliydik.![](https://www.newslabturkey.org/wp-content/uploads/2018/11/t3.png)

Veri tablosundaki değerlerin formatını kontrol ettiğimize göre görselleştirme aşaması için hazırız. Bu aşamada rahat etmek için Tableau arayüzüne dair bir kaç şey öğrenelim.

## **2) Tableau arayüzünü inceleyelim**

Aşağıdaki panel Tableau ile veriyi analiz edeceğimiz ve grafikler oluşturacağımız panel. Veri görselleştirmeye dair tüm zahmetli iş aslında bu adımda yer alıyor.

![](https://www.newslabturkey.org/wp-content/uploads/2018/11/t4.png)

İlk kısım **Measures** ve **Dimensions** başlıkları altında yer alan sayısal ve metinsel veriler. **Measures** daha çok ölçülebilen sayısal ve zamansal verileri içerirken, **Dimensions** ise kategorik, metinsel ve lokasyon verilerini içeriyor. Ayrıca her sütun başlığından önce veri formatını gösteren sembolleri görmek mümkün.

İkinci kısım ise editör bölümü. Üretilen veri görselleştirme biçimi (çubuk, pasta, çizgi grafik veya harita vb.) bu kısımda düzenleniyor. Renk, veri noktalarının büyüklüğü, çalışmada kullanılan metin ve diğer detaylar (Color, Size, Text, Detail ve Tooltip) ögeleri yer alıyor. Bununla birlikte Measures ve Dimensions bölümündeki değişkenler bu butonların altına sürükle bırak yoluyla da taşınabilir.

Üçüncü kısım grafiğin gösterildiği alan. İlk bölümdeki ögeler bu alana veya **c****olumn (sütun), row (satır)** kısmına sürüklenerek kolaylıkla görselleştirme yapılabiliyor. Dördüncü kısım ise veri görselleştirme tekniklerinin (biçimlerinin) bulunduğu yer. Daha çok bir kılavuz görevi görüyor. Örneğin, 1. kısımdan 3. kısıma öğeleri sürüklediğinizde anlamlı bir grafik elde edememişseniz, 4. kısıma tıklayarak sürüklediğiniz veriyle hangi grafikler ve görseller üretilebilir yardım alabilirsiniz. Ayrıca 1. kısımdaki öğelerden ikisini CTRL tuşuyla seçtikten sonra 4. kısıma tıklayarak da hızlı bir grafik elde edilebilir.

Beş ve altıncı kısımlar ise daha çok üst ve alt menü görevi görüyor. Üstteki menüden grafik alanının ölçüsü ayarlanabilir ve grafikteki öğeler sıralanabilirken, alt menü oluşturulan birden çok sayfa ve panel arasında gezinme işlevi görüyor.

## **3) Hadi görselleştirelim**

Veri görselleştirme aşamasını kolaylaştırıcı olması açısından animasyonlu görsellerle açıklamaya çalışacağım. Metni okurken bir yandan da GIF görsellerine göz atmanızı tavsiye ederim. Hatta bu adımları Tableau Public’i indirerek kendi cihazınızda tekrarlamanız için sizi cesaretlendiriyorum.

**[Dolgu Haritası](https://datavizcatalogue.com/TR/yontemleri/koroplet_harita.html): İllere Göre Yüz Kişiye Düşen Kitap Sayısı**

İlk pratiğimizde il sınırlarını kapsayan bir veri haritası oluşturacağız. Öncelikle harita oluşturmak için aşağıdaki görselde olduğu gibi Dimensions bölümündeki “İl” değişkenini grafik alanına sürükleyip bırakıyoruz. İşlem sonrasında sadece illeri gösteren bir nokta harita oluştu. Henüz çalışmaya başka bir değişken eklemediğimiz için sadece şehir merkezlerini gösteriyor. “Yüz Kişiye Düşen Kitap Sayısı” değişkenini harita üzerine sürükle bırak yaparak haritayı anlamlı hâle getirebiliriz. Görselde görüldüğü gibi baloncuk haritası oluşturduk. Bunun yerine şehir sınırlarını kapsayan dolgu haritası oluşturalım. Bunun için “Show Me” butonuna tıklıyoruz ve dolgu haritasını seçiyoruz. Görselde de görüldüğü üzere dolgu haritası oluştu. Artık çalışmayı düzenlemeye başlayabiliriz.

Grafik seçimimizi yaptıktan sonra grafiğin başlığını “Sheet 1” yazısına çift tıklayarak değiştiriyoruz. Bu kısımda istediğimiz fontu ve font boyutunu kullanabiliriz. Bunun dışında editör bölümündeki butonlarla veri haritamızı düzenleyebiliriz. İlk görselleştirmemizi oluşturduk. Tableau’nun yerleşik coğrafi kodlama özelliği sayesinde enlem, boylam verilerine ihtiyaç duymadan sadece il isimleri ile illere göre yüz kişiye düşen kitap sayısını görselleştirdik.

İkinci bir grafik oluşturmak için alt menüden yeni bir sayfa açalım![](https://www.newslabturkey.org/wp-content/uploads/2018/11/Yeni_sayfa.png)

**[Çubuk Grafik](https://datavizcatalogue.com/TR/yontemleri/cubuk_grafik.html): İllere Göre Yüz Bin Kişiye Düşen Kütüphane Sayısı**

İkinci çalışmamızda illere göre yüz bin kişiye düşen kütüphane sayısını çubuk grafikle görselleştireceğiz. Bunu sürükle bırak yapmadan daha kısa yoldan yapmaya çalışacağız. Görselde görüldüğü gibi öncelikle “İl” değişkenine bir defa tıklıyoruz. Sonrasında CTRL tuşuna (Macbook kullanıyorsanız CMD tuşuna) basılı tutarak “Yüz Bine Düşen Kütüphane Sayısı” değişkenini seçiyoruz. Hemen sonrasında sağ üstteki “Show Me” butonuna tıklayıp çubuk grafiği seçiyoruz.  

Gördüğünüz gibi çubuk grafiği oluşturduk, şimdi geçelim düzenleme aşamasına. Grafiğin üzerindeki simgeye tıklayarak grafiği azdan çoğa veya tam tersi olarak sıralayabiliriz. Çalışmayı çoktan aza sıraladığımızda görüyoruz ki yüz bin kişi başına en çok kütüphane Nevşehir’de düşüyor. Sıralama dışında grafiğin başlığını belirleyebiliriz, editör bölümünden rengini değiştirebiliriz. Yukarıdaki görselde gördüğünüz gibi “Yüz Bine Düşen Kütüphane Sayısı” değişkenini Color (renk) butonu üzerine sürükleyerek grafiğin rengini değiştirdik.

**[Dağılım Grafiği](https://datavizcatalogue.com/TR/yontemleri/dagilim_grafigi.html): Kitap ve Kütüphane Sayılarının Bölgelere Dağılımı**

Son çalışmamızda önceki iki çalışmadaki iki değişkenin (yüz kişiye düşen kitap sayısı ve yüz bine düşen kütüphane sayısı) bölgelere göre dağılımını görselleştireceğiz.

İlk olarak çubuk grafiği pratiğinde olduğu gibi “İl”,“Yüz Kişiye Düşen Kitap Sayısı” ve “Yüz Bine Düşen Kütüphane Sayısı” değişkenlerini CTRL tuşuna basılı tutarak seçiyoruz. Sonrasında “Show Me” butonuna tıklayarak dağılım grafiğini (scatter plot) seçiyoruz. Gördüğünüz gibi grafiğimiz oluştu.

Grafiği daha iyi hâle getirmek için editör bölümündeki “size (boyut)” butonuna tıklayarak veri noktalarının boyutunu biraz büyütelim. Sonrasında “shape (şekil)” bölümünden grafikte kullandığımız çember sembolünü de nokta sembolü ile değiştirebiliriz. Ayrıca bir önceki çalışmada olduğu gibi “color (renk)” butonu ile grafiğin rengini değiştirebiliriz. Fakat sanki bir şeyi unutuyoruz. Grafik verinin bölgelere dağılımı göstermiyor. Bunu yapmak için “Bölgeler” değişkenini renk butonuna sürüklemeliyiz. İşlem sonrasında görselin sağındaki lejand’da görüldüğü üzere bu iki değişkenin bölgelere dağılımını görselleştirdik. İlk bakışta Karadeniz Bölgesi’nin daha çok sayıda kitap ve kütüphaneye sahip olduğunu söyleyebiliriz.

## **4) Dashboard oluşturalım**

Bir veri haritası ve 2 ayrı grafikten oluşan çalışmalarımızı görselleştirdik. Şimdi sıra bu üç görseli tek bir sayfada bir araya getirerek paylaşmakta. Bu tip tasarımlara genelde dashboard deniliyor. Dashboard oluşturmak için alt menüden pencereye benzeyen sembole tıklıyoruz.

![](https://www.newslabturkey.org/wp-content/uploads/2018/11/dashboard_sayfası.png)

Görselde de görüldüğü üzere öncelikle bu üç çalışmayı sergileyeceğimiz dashboard’un boyutunu belirlemeliyiz. Genelde çalışmaları 800 x 800 boyutunda oluşturuyorum. Eğer çalışmalarınızı web sitenizde sergilemek isterseniz 800x 800 en ideal ekran ölçülerinden birisi. Bunu yapmak için sol menüden sırasıyla “**Range → Fixed size → Custom → Web page embeded (800x 800)**” ayarlarını seçiyoruz.

Ekran ölçüsünü ayarladık. Şimdi sol menüde (sheets) yer alan görselleştirmelerimizi sayfaya sürükleyerek yerleştirelim. Üç çalışmayı da sürükledikten sonra önceki iki lejand pek işe yaramayacağı için kaldıralım. Çünkü hem harita hem de çubuk grafiğin başlıkları çalışmanın ne olduğunu açıklıyor. Dağılım grafiğinde 7 ayrı bölgenin durumunu görmek için lejand yani grafikteki renklerin açıklamalarına ihtiyacımız olacak. Sonrasında yukarıdaki görselde olduğu gibi grafiklerin boyutlarını istediğimiz gibi ayarlayabiliriz. Son olarak sol alttaki “Show Dashboard Title” kutusunu işaretleyerek bu üç grafiğe tek bir başlık ekleyelim.

## **6) Dashboard tasarımını düzenleyelim**

Görselleştirmelerimizi oluşturduk, bir dashboard’a ekledik. Şimdi çalışmamızın tasarımını biraz geliştirelim. Görselde görüldüğü gibi Dashboard sayfasında çalışmaların üzerine gelip sağ tıklayıp “Format” seçeneğine tıklayarak grafiklerimizin arka plan rengini ve kullanılan fontu değiştirebiliriz. Bu kısımda envai çeşit düzenleme yapılabilir. Son olarak dashboard’a eklediğimiz başlığı da düzenleyerek grafik başlıklarının arka planını da gri olarak ayarlayalım. Böylelikle öncekine nazaran daha estetik ve göze hoş gelen bir çalışmamız oldu.

## **7) Grafikler arasında etkileşim oluşturalım**

Tableau, interaktif grafiklerin yanı sıra grafikler arasında etkileşim oluşturmamızı da sağlıyor. Özellike insan makine etkileşimi açısından çok elverişli bir araç. Bu kısımda veri haritamıza etkileşim veya aksiyon özelliği ekleyerek haritada üzerinde durduğumuz ilin diğer grafiklerde daha iyi vurgulanmasını sağlayacağız. Öncelikle Dashboard menüsünden → Actions seçeneğine tıklıyoruz ve bir pencere açılıyor.

Pencerede çalışmaya etkileşim eklemek için “Add Action” butonuna tıklıyoruz ve “Highligh (Vurgula)” ayarını seçiyoruz. Sonrasında yeni bir sayfa açılıyor.

Sayfada “Source Sheets (Kaynak Sayfalar)” başlığı altında sadece dolgu grafiğini işaretliyoruz. Etkileşimi kullanıcının grafiğin üzerinde durarak yapabilmesi için “Hover” aksiyonu seçiyoruz. Son olarak “Target Sheet (Hedef Sayfalar)” başlığı altında dağılım grafiği ve çubuk grafiği işaretleyerek bu adımı tamamlıyoruz. Görselde olduğu gibi veri haritasında üzerinde durduğumuz ilin diğer grafiklerdeki durumunu vurgulu olarak görebiliyoruz.

## **8) Çalışmamızı mobil uyumlu yapalım**

Çalışmamızı yayınlamadan önce mobil cihazlar için uyumlu hâle getirelim. Bunu yapmak için sol menüden “Device Preview (Cihaz Önizleme)” butonuna tıklıyoruz. Görselde olduğu gibi üstte yeni bir menü açılıyor. Açılan menüden “Device Type (Cihaz tipi)” bölümünden “Phone (Telefon)” özelliğini seçiyoruz ve “Add Phone Layout (Telefon Düzeni Ekle)” butonuna tıklıyoruz. Böylelikle Tableau çalışmamızı mobil cihazların genişliğine uyumlu hâle getirdi. Bu özellik sayesinde web sitelerine gömdüğümüz interaktif çalışmalar mobilde de uyumlu bir şekilde görüntülenebilecek.

## **9) Veri görselleştirme çalışmamızı yayınlayalım**

Artık sol üst menüden kaydetme sembolüne tıklayarak çalışmamızı yayınlayabiliriz. Sonrasında e-posta ve şifre bilgilerini doldurarak çalışmamızı paylaşmış olacağız. Eğer hesabınız bulunmuyorsa bu adımda yeni bir hesap açmalısınız. ![](https://www.newslabturkey.org/wp-content/uploads/2018/11/Yayınlama.png)

![](https://www.newslabturkey.org/wp-content/uploads/2018/11/Yayınlama2.png)

Çalışmayı sitenize interaktif olarak embed edebilirsiniz. Her ne kadar Blogger’da Tableau embed kod çalışsa da bazen WordPress’le uyumlu olmayabiliyor. Böyle bir durumda çalışmanızı pdf veya png formatından indirebilir ve aşağıda olduğu gibi kullanabilirsiniz. Çalışmanın interaktif versiyonuna [ulaşmak için tıklayınız](https://public.tableau.com/profile/sadettin#!/vizhome/Pratik-KitapveKtphanestatistikleri2016/Dashboard1).

![](https://www.newslabturkey.org/wp-content/uploads/2018/11/Dashboard-1.png)

* * *

Tableau’yu daha fazla öğrenmek isteyenler programın sitesinde yer alan “[Nasıl Yapılır videolarından](https://public.tableau.com/en-us/s/resources)” yararlanabilir.

Bu çalışmada kullanılan veri setine [buradan](https://docs.google.com/spreadsheets/d/1-afs5mRGPj07GSLc000vWi-No4lUh8OCMpvsFZqGd0Q/edit?usp=sharing) ulaşabilirsiniz.

Yazılımı indirdikten sonra bu yazıda pratiğini yaptığım çalışmaya [şu dosyayı](https://drive.google.com/open?id=1ACpk86Zv3Sh_OFkAi8DImnD96u4s244p) indirip Tableau’da açarak göz atabilirsiniz.

---
title: "Koronavirüs verileri anlık ve günlük olarak nasıl takip edilir?"
date: 2020-05-16
author: Sadettin Demirel
excerpt: "Her gün sonunda Sağlık Bakanı Fahrettin Koca tarafından paylaşılan koronavirüs vaka, vefat sayılarını dinliyoruz. Gün sonunda günlük vaka, vefat, iyileşme sayılarının yanı sıra yoğun bakım ve entübe sayıları da…"
thumbnail: https://cdn-images-1.medium.com/max/1024/1*Fzj1RjPJ_Fu4HvHZU7cSiA.png
tags_display: "Veri Görselleştirme, Veri Gazeteciliği, Data Visualization, Covid19, Koronavirüsü"
original_url: https://medium.com/verijurnali/koronavir%C3%BCs-verileri-anl%C4%B1k-ve-g%C3%BCnl%C3%BCk-olarak-nas%C4%B1l-takip-edilir-5572620e32e1
original_source: Medium
---
*Her gün sonunda Sağlık Bakanı Fahrettin Koca tarafından paylaşılan koronavirüs vaka, vefat sayılarını dinliyoruz. Gün sonunda günlük vaka, vefat, iyileşme sayılarının yanı sıra yoğun bakım ve entübe sayıları da paylaşılıyor. Her ne kadar salgın başlangıcında sadece Fahrettin Koca’nın Twitter hesabından paylaşılan tweetlerle sağlanan bilgi akışı covid-19 sayfasıyla daha iyi hale getirilse de henüz toplu zaman serilerini içeren bir veri tabanına ve il bazında covid-19 verilerine ulaşabilmiş değiliz. Peki mevcut veri paylaşımı bu haldeyken gazeteciler ve sivil toplum kurumları bu süreçte koronavirüs verilerinin veya benzer başka bir krizde anlık ve günlük veriler nasıl toplar ve en azından günlük takibi nasıl yapabilir? Bu yazıda Veri Okuryazarlığı Derneği bünyesinde oluşturduğumuz Koronavirüs Takip Sayfası örneği üzerinden bu sorulara cevap vermeye çalışacağım.*

Türkiye’de henüz koronavirüs (covid19) vakası görülmemişken benzer verileri John Hopkins Üniversitesi, Dünya Sağlık Örgütü veya Avrupa Hastalık Kontrol Merkezi web sayfalarından takip ediyorduk. Türkiye’de vaka sayıları artmaya başladığında Sağlık Bakanlığı’da benzer bir çözüm yoluna başvurdu. Ama hazırlanan takip paneli salgının başından beri ortaya çıkan vaka, vefat ve iyileşen sayılarını zaman göre kapsamlı olarak sunmak yerine her gün sonunda ortaya çıkan günlük veriyi ve genel kümülatif verileri paylaşıyor. Salgın başlangıcında sadece Fahrettin Koca’nın Twitter hesabından paylaşılan tweetlerle karşılaştırıldığında sağlanan bilgi akışı covid-19 sayfasıyla daha iyi hale getirilmiş oldu ama daha iyisi yapılabilirdi. Özellikle Sağlık Bakanlığı basın toplantılarında paylaşılan görsellerde ve raporlarda yer alan haritalar halihazırda coğrafi verilerin var olduğunu gösteriyor ama bakanlık bu verileri paylaşmayı uygun görmemiş olacak ki ilk vakadan bu yana covid-19 sayfası güncellenen güne ve salgına dair kümülatif verileri paylaşmaya devam ediyor.

## VOYD Koronavirüs Takip Sayfası

![](https://cdn-images-1.medium.com/max/1024/1*0zYqMB6r3WKtktu7aRtNZA.png)

Veri Okuryazarlığı Derneği olarak Türkiye ve Dünya genelindeki vaka, vefat ve iyileşme sayılarını hem üyelerimize hem de takipçilerimize daha açık ve doğru bir şekilde aktarmak için Koronavirüs Takip Sayfası oluşturduk. Sayfa için dünya genelinde verileri [John Hopkins Üniversitesi’nin salgın için oluşturduğu GitHub sayfasından](https://github.com/CSSEGISandData/COVID-19), ülkemize dair verilerini ise Sağlık Bakanı’nın tweetleri ve sonrasında [hazırlanan covid19 sayfasından](https://covid19.saglik.gov.tr/) edindik. Her gün sonunda veya anlık olarak verilerin güncellenmesi gerektiği için Tableau ve Google Tablolar kombinasyonunu kullandık. Anlık veya günlük verilerin takibinde çeşitli ve daha gelişmiş yöntemler mevcut olsa da bu noktada hem ücretsiz hem de çalışma akışı bakımından pratik olması bu seçimimizde etkili oldu.

Hazırladığımız sayfada tasarım itibariyle vaka, vefat ve iyileşme verilerine yer verdik. Özellikle sağlıklı ve güvenilir verileri kullanmaya karar kıldık. Veri Bülteni sayfamızda yayınladığımız çeviride de uyardığı gibi salgına dair öngörüleri işin uzmanlarına bıraktık ve ulaşabileceğimiz resmi verilerle takipçi ve üyelerimizi bilgilendirmek önceliğimiz oldu. Peki koronavirüs verilerinin takibinde kullandığımız Tableau ve Google Tablolar nedir? Anlık verilerin takibinde nasıl kullanılabilir?

## Tableau ve Google Tablolar

Tableau veri analizi, görselleştirme ve raporlama hizmeti sunan bir analitik, iş zekası yazılımı. Google Tablolar ise Google’ın Microsoft Excel ile benzer nitelik taşıyan temel veri toplama, işleme ve analiz aracı. Her iki araca dair ayrıntılı bilgi almak ve öğrenmek isteyenler için [VOYD ve NLTR işbirliğiyle hazırlanan video derslerimiz de mevcut](https://veribulteni.voyd.org.tr/temel-veri-gazeteciligi-egitim-seti/). Ayrıca Tableau’nun ücretsiz sürümü olan Tableau Public’e dair incelemelerimden de yararlanabilirsiniz

-   [Tableau ile deprem verilerini görselleştirmek](/blog/tableau-ile-deprem-verilerini-gorsellestirmek/)
-   [Tableau ile Türkiye’nin interaktif haritasını çıkarmak](/blog/tableau-ile-turkiye-nin-interaktif-haritasini-cikarmak/)

Özetle her iki araçta verilerin analizi, görselleştirilmesi ve raporlanmasında kullanılabiliyor. Koronavirüs sayfasının hazırlanmasında Google Tablolar, verileri toplamak, Tableau’ü ise görselleştirmek için kullanıldı. Takip sayfasının hazırlanmasına ilk olarak John Hopkins’in GitHub ve Sağlık Bakanlığı’nın Covid19 sayfasındaki verileri Google Tablolara aktararak başlandı.

![](https://cdn-images-1.medium.com/max/1024/1*y5mSjp7tQgM7MwwIWDOicg.png)

## GitHub’tan ve Manuel Olarak Google Tablolara Verileri Ekleme

Ülkemize dair verileri her gün manuel olarak [Google tablolar dökümanına toplamaktayız](https://docs.google.com/spreadsheets/d/1SkOBdlcB3bsKOmuQIwPrxU52JQwqywzF1_zMaciPMaY/edit?usp=sharing). Sağlık Bakanlığı tarafından açıklanan veriler doğrultusunda günlük olarak güncelliyoruz.

![](https://cdn-images-1.medium.com/max/1024/1*YF3y7bn2yvRGm4CbM50YpA.png)

Dünya genelinde verileri ise John Jopkins’in GitHub sayfasından takip ediyoruz. Github sayfasından günlük covid19 verileri klasörüne gidip en son güncellenen dosyanın **“Raw”** linki aracılığıyla bu verileri doğrudan Google tablolara aktarıyoruz.

![Bu sayfadan “Raw” butonuna tıkladığınızda yeni bir sekme açılacak. O sekmeden csv verilerini içeren linki alabilirsiniz.](https://cdn-images-1.medium.com/max/1024/1*xL07jNhXhyLCmXYqWXiySw.jpeg)
*Bu sayfadan “Raw” butonuna tıkladığınızda yeni bir sekme açılacak. O sekmeden csv verilerini içeren linki alabilirsiniz.*

Google Tablolar’ın **\=IMPORTDATA (“raw link”)** komutu ile her gün sonunda dünya geneline dair verileri kolay bir şekilde güncelleyebiliyoruz. Dünya genelinde covid-19 verilerini topladığımız [Google tablolar dökümanına buradan ulaşabilir ihtiyaç halinde kopyasını oluşturabilirsiniz.](https://docs.google.com/spreadsheets/d/1_nAdMj7XuwGhV7UHaZjzGyCCkCJXvTKm8lgbmXzC8bg/edit?usp=sharing)

![](https://cdn-images-1.medium.com/max/1024/1*EU-0sm7Kc8CCypFrzjTEuw.png)

Özetle dünya geneline dair verileri bir komut aracılığıyla, ülkemize dair verileri ise (kapsamlı bir veri sağlayan kuruluş, panel olmadığı için) manuel olarak güncellemekteyiz. Covid19'a dair veri setlerimizi bu şekilde oluşturduk şimdi sıra Google Tabloları, Tableau’ya bağlamakta.

## Google Tabloları, Tableau’ya Bağlama & Verileri Güncelleme

Tableau yazılımı kendi içinde Google dökümanlarından verileri içeri aktarma hizmeti sağlıyor. Bu hizmete ulaşmak için Tableau’nün Connect başlığı altında More kısmına tıklayarak “Google Sheets” seçeneğine tıklıyoruz.

![](https://cdn-images-1.medium.com/max/1024/1*kFWVBPk3W42Gd7iI-t4vIQ.png)

Tıkladığımızda içeri aktaracağımız Google hesabını seçmemiz isteniyor. Mevcut veriler google drive’dan alınacağı için bu kısımda hesabımıza giriş yapıyoruz.

![](https://cdn-images-1.medium.com/max/1024/1*aEwGoC2UUa2kLJQOFm5vgw.png)

Hesaba giriş yaptıktan sonra üzerinde çalışacağımız covid-19 verilerini seçip Tableau ile görselleştirmelerimizi ve gösterge panelimizi hazırlıyoruz. Bu noktada hazırlayacağınız çalışma covid-19 kapsamında olmayabilir. Örneğin her ay güncellenen işsizlik verilerini içeren bir görsel çalışma da tasarlayabilir. Tüik verileri açıkladıkça çalışmanızı güncelleyebilirsiniz.

![](https://cdn-images-1.medium.com/max/1024/1*2Zok8RjISIoz0TNo5eUvHg.png)

Tableau ile veri analizi ve görselleştirmelerinizi tamamladınız. Bir sonraki aşama bu çalışmayı kaydetmekte. Kaydederken Tableau bize bu çalışmayı Google tablolar dökümanına bağlayayım mı diye soruyor. Bu verileri aktardığımız döküman güncellenirse görsel çalışmanın da otomatik olarak güncelleneceğine işaret ediyor. Bu nedenle üst sayfadaki kutucuğu işaretleyip çalışmamızı kaydediyoruz.

Son adımla beraber çalışmamızı kaydettik. Artık istediğimiz web sayfasına ekleyebilir veya statik çıktısını alabilir ve paylaşabiliriz. Bu noktada verileri güncellendikçe Tableau her gün sonunda görsel çalışmayı otomatik olarak güncelleyecek. Lakin topladığımız verileri günlük değil anlık olarak değişiyor olabilir. Örneğin farz edelim ki koronavirüs verilerini değil de doların gün içindeki değişimini kontrol ediyoruz, Tableau buna da bir çözüm getirmiş. Görsel çalışmayı yayınladığımız sayfanın altında **“Request Update”** butonu yer alıyor. Bu buton yardımıyla çalışmamızı her an güncel tutabiliriz.

![](https://cdn-images-1.medium.com/max/1024/1*v03-FBJv0lAGb7G4pLmU_Q.png)

Sonuç olarak koronavirüs salgınında olduğu gibi anlık, günlük olarak veya zamana göre değişen verileri Google ve Tableau’nün sunduğu hizmetlerle kolaylıkla toplayabilir, takip edebilir ve güncelleyebiliriz. Tüm bu söylediklerimin yanı sıra bu yöntem tamamen ücretsiz ve biraz tableau’dan anlamak takip panelleri oluşturmak için yeterli olabiliyor.

## Veriler Açık, Görselleştirmeyi Kullanabilirsiniz

Son olarak halihazırda yazı içinde paylaştım ama aşağıya da ekliyorum. Hem ülkemiz genelinde hem de dünya genelinde koronavirüs verilerini derlediğimiz dökümanlar herkesin kullanımına açık durumda.

-   [Türkiye Genelinde Covid19 Verileri](https://docs.google.com/spreadsheets/d/1SkOBdlcB3bsKOmuQIwPrxU52JQwqywzF1_zMaciPMaY/edit?usp=sharing)
-   [Dünya Genelinde Covid19 Verileri](https://docs.google.com/spreadsheets/d/1_nAdMj7XuwGhV7UHaZjzGyCCkCJXvTKm8lgbmXzC8bg/edit?usp=sharing)

Ayrıca hazırladığımız görsel çalışmaları da haberlerinizde, sayfalarınızda referans vererek kullanabilirsiniz [(Medyscope örneği)](https://medyascope.tv/2020/05/15/medyascope-infografik-turkiyede-ve-dunyada-koronaviruste-son-durum-15-mayis-2020/) Eğer çalışma web sayfanıza uyumlu değilse info@voyd.org.tr veya VOYD’un Twitter hesabından iletişime geçerseniz sayfanıza uygun olarak görsel ve embed kod sağlayabiliriz. Sağlıcakla…

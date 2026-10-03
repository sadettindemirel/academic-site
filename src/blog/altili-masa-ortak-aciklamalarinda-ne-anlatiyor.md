---
title: "Altılı masa ortak açıklamalarında ne anlatıyor?"
date: 2023-02-01
author: Sadettin Demirel
excerpt: "Cumhuriyet Halk Partisi, Demokrat Parti, Deva Partisi, Gelecek Partisi, İyi Parti ve Saadet Partisi’nden oluşan altılı masa ittifakı (Millet İttifakı) 12 Şubat 2022 tarihinden beri belirli aralıklarla bir araya gelerek…"
thumbnail: https://cdn-images-1.medium.com/max/1024/1*FAs7C9Ca49lO7eOGbmRdxw.png
tags_display: "Text Analysis, Millet İ̇ttifakı, Altılı Masa, Politika, Seçim"
original_url: https://medium.com/verijurnali/alt%C4%B1l%C4%B1-masa-ortak-a%C3%A7%C4%B1klamalar%C4%B1nda-ne-anlat%C4%B1yor-152675f4a308
original_source: Medium
---
*Cumhuriyet Halk Partisi, Demokrat Parti, Deva Partisi, Gelecek Partisi, İyi Parti ve Saadet Partisi’nden oluşan altılı masa ittifakı (Millet İttifakı) 12 Şubat 2022 tarihinden beri belirli aralıklarla bir araya gelerek kamuoyuna ortak açıklamalarda bulunuyor. Altılı masa, 2023 genel seçimlerinde iktidar olmayı ve cumhurbaşkanlığı seçimlerini de belirleyeceği ortak aday ile kazanmayı hedefliyor. Peki bugüne kadar 10 toplantı gerçekleştiren bu masa ortak açıklamalarında kamuoyuna ne söylüyor? Altılı masa bize ne anlatıyor? Bu yazıda bu sorulara altılı masanın ortak açıklamalarını niceliksel metin analizi teknikleriyle inceleyerek cevaplamaya çalışacağım.*

Bir feragatname ile başlayalım. Bu yazı altılı masanın (29 Ocak’ta yapılan son toplantı sonrası kullanılan isimle “Millet İttifakı”) ortak açıklamalarını niteliksel bir şekilde derinlemesine kelimesi kelimesine incelemiyor. Metne dair söylem analizinde bulunmuyor. Bu yazıda metine bir veri olarak (text as data) yaklaşılarak metinde sıklıkla kullanılan kelimeler, kelime öbekleri, kelimeleri kapsayan tema veya kategoriler ortaya konuluyor. Elde edilen çıktılar tamamen otomasyonel (automated) değil, bazı durumlarda sıklıkla kullanılan kelimelerin rafine edilmesinde, metin içinde araştırılacak kategorilerin ve bu kategorilerin kapsadığı anahtar kelimelerin seçilmesinde insan etkisi bulunuyor. Ek olarak bu analiz en son açıklanan mutabakat metnini içermiyor.

## Metinlerin okunabilirliği (readability) düşük seviyede

Ortak açıklamaların metinsel özellikleri incelendiğinde en uzun metin 29 Mayıs 2022 tarihli dördüncü toplantı sonrasında paylaşıldı. Masanın temel ilkelerini (kuvvetler ayrılığı, özgürlükçü kamu düzeni, ifade ve basın özgürlüğü, din ve vicdan özgürlüğü, sosyal devlet ve gelir adaleti, siyasi etik vb.) içeren döküman olduğundan dolayı metnin uzunluğu anlaşılabilir. Hem kelime, hem de cümle sayılarında kamuoyuyla paylaşılan ikinci en uzun metin ise 5 Ocak 2023'te gerçekleştirilen 10. toplantı sonrası paylaşıldı.

![](https://cdn-images-1.medium.com/max/1024/1*RP_uQaOc3gPtu_cZvJ-s3g.png)

Seçimler öncesi bu gibi metinlerin okunabilirliği ortalama seçmenin anlayabilmesi ve içselleştirmesi için kilit bir role sahip olabilir. Ortalama cümle uzunluğuna (*kelime sayısı/cümle sayısı*) göre hesaplanan okunabilirlik parametresine göre ortak açıklamalarda yer alan cümlelerde ortalama 20,9 kelime kullanıldı.(median = 19,9). Uzun cümlelerin okunabilirliği olumsuz etkilediği göz önüne alınırsa açıklamaların okunabilirliği bir hayli düşük. Üstteki grafikte görülebileceği gibi ortalama cümle uzunluğu (ort.cümle.uz) söz konusu olduğunda en okunabilir metin son toplantıdan sonra ( 29 Ocak 2023) paylaşılmış. O toplantıda kullanılan ortalama kelime sayısı 16,6.

Kullandığım [Quanteda R paketi](https://quanteda.io/) okunabilirliği hesaplama üzerine birçok yöntem sunuyor ama bu okunabilirlik yöntemleri genelde İngilizce metinler üzerinde ölçüldüğü ve uygulandığı için sadece cümle uzunluğuna odaklandım. Detaylı bilgi için: [*Quanteda metin okunabilirlik hesapları*](https://quanteda.io/reference/textstat_readability.html)

## Sıklıkla kullanılan kelimeler ve kelime öbekleri (bigrams)

Yapılan 11 toplantı sonrasında ortak açıklamalarda belirli kelimeler dikkat çekiyor. *“sistem”, “ortak”, “demokrasi”, “özgürlük”, “birlik”, “parlamenter”, “anayasa”, “hukuk”, “reform”, “mutabakat”* gibi kelimeler 2023 genel seçimleri için bir araya gelen ve seçim sonrası da ülkeyi yönetmeyi amaçlayan altılı masa ittifakının ajandasına dair kırıntılar içeriyor. En çok kullanılan ilk 20 kelimenin yer aldığı aşağıdaki grafik altılı masanın sistem odaklı gündemini ortaya koyuyor.

![](https://cdn-images-1.medium.com/max/1024/1*pINU8VqpyrlbOcE1PhZpyA.png)

Bu noktada kelime bulutu daha geniş bir bakış açısı sunuyor. Özellikle üstteki grafikten farklı olarak “anayasa”, “inşa”, “adalet”, “istişare”, “hak”, “uzlaşma” kelimeleri göze çarpıyor.

![Kelime Bulutu. Kırmızı kelimeler = 35 adet ve üzerinde kullanılan kelimeler.](https://cdn-images-1.medium.com/max/1024/1*E6T-16hlCfaQLFMnllTZXA.png)
*Kelime Bulutu. Kırmızı kelimeler = 35 adet ve üzerinde kullanılan kelimeler.*

Ayrıca ortak açıklamalarda kullanılan ikili ifadelere (bigrams) yani kelime öbeklerine bakarak da bu açıklamalara dair bir izlenim elde edebiliriz. Bu ifadeler metinde beraber kullanılan, birbirini takip eden kelimelerden oluşuyor. Açıkça görülüyor ki altı partinin seçimi kazandıklarında ülkeyi yönetmeyi planladıkları “parlementer sistem” bu açıklamalarda önemli bir yer kaplıyor. Bunun yanısıra “seçim güvenliği”, “temel hak” ve “temel ilkeler”, “hukuk devleti”, “yasal reformlar”, dikkat çeken diğer kelime öbekleri.

![](https://cdn-images-1.medium.com/max/1024/1*UDvXHNA-SJQnbzTJfwUIWA.png)

Ortak açıklamaların 2023 yılındaki genel seçimleri sonrasında inşa edilecek parlementer sisteme dair tasarılar içerdiği aşikar, ama bu metinlerde özellikle birçok seçmenin uzun zamandır beklediği “aday” kelimesinin sıklıkla geçmediği görülüyor. Zaten altı partinin genel başkanları da bu toplantılarda henüz aday meselesinin görüşülmediğini önceki açıklamalarında paylaşmıştı ama son iki ortak açıklama metninde “Aday” kelimesinin kullanımında bir artış gözleniyor.

## Son 2 toplantı sonrası açıklamada “Aday” kelimesi 10 defa kullanıldı.

Aday kelimesinin son iki toplantı sonrasında 10 defa kullanılması enteresan gelmeyebilir ama aşağıdaki tabloda görülebileceği gibi bugüne kadar yapılan tüm açıklamalarda kullanılma sayısı 17. Tablo’da görüleceği gibi “aday” kelimesi ve türevleri ilk defa 24 Nisan 2022'de yani üçüncü toplantı sonrasında 2 defa kullanılmış. Aday kelimesi ve versiyonları, 3 Temmuz’da 2 defa, 21 Ağustos, 2 Ekim ve 14 Kasım’daki ortak açıklamalarda 1 defa geçmiş. Seçime yaklaşırken kamuoyunda da artık adayın açıklanmasına yönelik baskı da artmış olacak ki son iki toplantıda aynı kelime 10 defa kullanılmış. En son toplantı da bu sayı 7.

Sayıları bir kenara bırakırsak bu kelimenin Millet İttifakı seçmeni için temsil ettiği şey kuşkusuz ortak açıklamalarda ne kadar kullanıldığından daha çok öneme sahip. Kelimenin metinlerde hangi bağlamda kullanıldığına bakılırsa 5 Ocak 2023'e kadar “bizim seçtiğimiz aday c.başkanı olacak” gibi taahüte rağmen adaylık tartışması planlanan parlementer sistemin yanından bir şekilde önemsizleştirilmeye çalışıldığı görülüyor. 5 Ocak 2023'teki açıklamayla beraber adaylık için istişarelere başlandığı bildiriliyor. En son yapılan toplantı sonrasında ise “aday” ifadesi sıklıkla geçiyor ama bu kullanım sadece Millet İttifakı’nın başkan adayına yönelik değil, Cumhurbaşkanı Erdoğan’ın gelecek seçimlerde aday olup olamayacağına dair altılı masanın pozisyonunu içeriyor.

![Aday sözcüğünün cümle bağlamında kullanımı (keyword in context)](https://cdn-images-1.medium.com/max/1024/1*P-5YAo6K8GVWLUHY0Ek8-A.png)
*Aday sözcüğünün cümle bağlamında kullanımı (keyword in context)*

## Ortak açıklamalarda “Sistem ve Seçim” meselesi ön planda

Metinlerin yapısına (uzunluk & okunabilirlik) ve metinlerde sıklıkla kullanılan kelimelere baktığımızda, Millet İttifakı’nın kamuoyuyla paylaştığı ortak açıklamalara dair belirli bir önizlenim elde etmiş olduk. Bu metinlerde ülkeyi seçim kazanıldığı takdirde beraber yönetecekleri bir parlamenter sistem tasarısından, gelecek seçimlere dair seçim güvenliği, aday meselesi gibi konulardan bahsedildiği anlaşılıyor. Şimdi bu metinleri belirli kategorilere sınıflandırmaya çalışalım.

[Sözlük yöntemi (dictionary method)](https://quanteda.io/reference/tokens_lookup.html?q=dictio#arguments) adı verilen yöntem, metinde geçebilecek kelime gruplarını belirli bir kategoriye atayarak, o kategorinin metinler üzerindeki ağırlığını ölçmeyi amaçlar. Genelde seçim dönemlerinde siyasilerin uzun konuşmaları üzerinde uygulanan bu yöntem, kelimelerin belirli temalar etrafında gruplanmasını kolaylaştırır ve konuşma metnine dair genel bir kanı elde edilmesini sağlar. Bu noktada öznel değerlendirmelerimle ekonomi, sistem, seçim, dış politika olmak üzere 4 ayrı kategori oluşturdum.

```r
ekonomi = c("ekonomi*","israf*", "piyasa*","dolar*","borsa*","kur",
"döviz*","faiz*","merkez banka*","IMF","finans","iktisat", "hayat paha*",
"tcmb*","mevduat*","fiyat*","refah", "enflasyon*","işsiz*","yoksul*", 
"kkm*","üretim*","istihdam*", "borç*", "tüketim*","yoksullu*",
"kur korumalı")

sistem = c("anayasa*","güçlendirilmiş parlamenter sistem*","siyasi etik",
"demokratik ilke+","geçiş dönem*","cumhurbaşkanlığı hükümet sistem*",
"reform*","kuvvetler ayrılı*","hukuk devleti*","özgürlük*",
"kurumsal reform*","parlament+","yönetim*")

seçim = c("seçim*","oy*", "seçim güvenli*","sandık*","aday*",
"cumhurbaşkan*","seçim kanun*")

dışpol = c("dış politik*","Rusya*","Ukrayna*","ABD*","İngiltere*",
"Yunanistan*","Suriye*","Putin*","Biden*","Avrupa Birli*","AB",
"Finlandiya*","İsveç*","Ukrayna-Rusya","Rusya-Ukrayna","Avrupa Konsey*",
"diplomasi*","diplomat*")
```

Oluşturduğum kategorilerin ortak metinlerde kullanılma durumlarına bakılırsa kelime kullanımlarında olduğu gibi “sistem” kategorisindeki kelimeler önemli bir yer kaplıyor. Özellikle sistem kategorisinin zirve yaptığı dönem 29 Mayıs 2022'de yapılan açıklamaya denk geliyor ki genel ilke ve hedeflerin paylaşıldığı açıklama ve sisteme ilişkin fazlaca kelime kullanılıyor. Dış politikaya dair az miktarda kelime kullanımı var ama ekonomi ile ilişkili kelimelerinde ortak açıklamalarda bir hayli yer kapladığı söylenebilir. Diğer yandan benim dikkatimi kategorilerin zamanla değişimi çekti. Planlanan sistem ile ilişkili kelimeler ağırlığını korurken seçim ile ilişkili ifadelerin son iki toplantı sonrası paylaşılan ortak metinlerde artışa geçtiği görülüyor. Özellikle seçim tarihinin neredeyse kesinleştiği göz önüne alınırsa, sonraki toplantılarda aday konusu gibi seçim ile ilişkili meselelerin Millet İttifakı’nın odak noktası haline geleceği anlaşılıyor.

![](https://cdn-images-1.medium.com/max/1024/1*fp9CGwfkefcysTYgZXreCw.png)

*Ortak açıklama metinleri, R kod dökümünü içeren* [*Github linki*](https://github.com/sadettindemirel/6masa_metinleri)

[R ve R studio yazılımları](https://posit.co/download/rstudio-desktop/)

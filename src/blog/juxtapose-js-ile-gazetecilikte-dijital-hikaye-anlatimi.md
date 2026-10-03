---
title: "Juxtapose JS ile Gazetecilikte Dijital Hikaye Anlatımı"
date: 2024-05-06
author: Sadettin Demirel
excerpt: "Dijitalleşmeyle beraber çoklu medya içeriklerin hikaye anlatımını zenginleştirmede kullanıldığını görüyoruz. Görsel, video, gifler, interaktif grafikler, kaydırma hikayeciliği (scrollytelling) derken metinden uzaklaşan…"
thumbnail: https://cdn-images-1.medium.com/max/640/1*jA_C6sBZxS51oYifpJZRCw.gif
original_url: https://medium.com/verijurnali/juxtapose-ile-gazetecilikte-dijital-hikaye-anlat%C4%B1m%C4%B1-ee2920b68a00
original_source: Medium
---
![](https://cdn-images-1.medium.com/max/640/1*jA_C6sBZxS51oYifpJZRCw.gif)

Dijitalleşmeyle beraber çoklu medya içeriklerin hikaye anlatımını zenginleştirmede kullanıldığını görüyoruz. Görsel, video, gifler, interaktif grafikler, kaydırma hikayeciliği (scrollytelling) derken metinden uzaklaşan bir habercilik pratiği de ortaya konuluyor. Bu durum her zaman haber metnini boyunduruğu altına alan bir çalışma pratiği oluşturacak değil. Bazı durumlarda metnin yerini almak yerine haber metnini zenginleştirme işlevi de bulunuyor. Bu örneklerden birisini Northwestern Universitesi bünyesinde bulunan Knight Lab’in geliştirdiği araçlardan Juxtapose ile yapmak mümkün. Juxtapose nedir? Gazetecilik pratiğinde nasıl kullanılabilir, nelere dikkat etmek gerekiyor bu yazıda anlatacağım.

***Ek not:*** *Bu yazıyı Üsküdar Üniversitesi’nde Gazetecilik bölümü öğrencilerine verdiğim İnternet Gazeteciliği dersi için de hazırlamaktayım. Başlangıç seviyesinde bilgiler içerebilir.*

## Juxtapose nedir ve nasıl kullanılır?

[JuxtaposeJS](https://juxtapose.knightlab.com/), Northwestern University Knight Lab tarafından geliştirilen bir araçtır. Bu araç, iki görsel arasında karşılaştırma yapmayı kolaylaştırır. Fotoğraflar, GIF’ler ve benzer medya öğeleri dahil olmak üzere, JuxtaposeJS, zaman içinde yavaş veya dramatik değişiklikleri vurgulamak için kullanılabilir

![Juxtapose JS ile hazırlanan bir örneğin ekran görüntüsü.](https://cdn-images-1.medium.com/max/1024/1*vfMOaW_BcZ2Yv2jjqnN9ng.png)
*Juxtapose JS ile hazırlanan bir örneğin ekran görüntüsü.*

Üstteki örnekte görüldüğü üzere JuxtaposeJS ile, kullanıcılar veya okur iki görüntü arasında bir slider kullanarak kontrolü sağlar. Ayrıca, GIF’ler olarak otomatik olarak animasyonu arasında görüntü arasında bir geçiş sağlar, bu da sosyal medya, sunumlar ve diğer belgelerde embed edilebilir.

## Juxtapose çalışması hazırlarken nelere dikkat etmeli?

İyi bir juxtaposeJS çalışması için kullanıcıların web kalitesinde görüntü export etmesi ve görüntü boyutlarının benzer olması gerekiyor. Aksi halde çalışma da görseller arası uyumluluk bozulabilir. Araç, şuan ücretsiz olarak sunuluyor, bu aracı geliştirmek isteyen geliştiriciler için GitHub sayfası da mevcut.

## Juxtapose öğrendik, peki uydu görselleri nereden ve nasıl bulunur?

Bir bölgenin havadan görüntülerine en kolay ulaşılabilecek yöntem Google’in [Google Earth Pro](https://www.google.com/earth/about/versions/) hizmeti. Bu hizmeti uygulamayı cihazınıza kurarak ücretsiz edinebiliyorsunuz.

Google Earth Pro’yu açtıktan sonra herhangi bir konuma yakınlaşıp, o konumun hem güncel hem de 10–15 yıl önceki havadan fotoğrafı elde edilebiliyor.

![Fikirtepe, Şubat 2024 | Üst menüdeki saat ikonu ile geçmiş fotoğraflara ulaşabilirsiniz.](https://cdn-images-1.medium.com/max/1024/1*5Oga-EL9hjjCfYteY5CLsA.png)
*Fikirtepe, Şubat 2024 | Üst menüdeki saat ikonu ile geçmiş fotoğraflara ulaşabilirsiniz.*

Üst menüdeki saat ikonu üzerinden geçmiş fotolara ulaştıktan sonra diğer tarihlerdeki fotoğrafları isteğinize göre tarayabilirsiniz. Bu noktada bazı gereksiz ayrıntıları kaldırmak için programın sol alt köşesindeki layerler yanındaki işaretleri kaldırabilirsiniz.

![](https://cdn-images-1.medium.com/max/1024/1*qnUiIy2Ac2249cNfPAHsfA.png)

İstediğimiz bölge ve tarihleri kararlaştırdıktan sonra saat ikonunun sağında yer alan görsel kaydetme ikonu ile görselin boyutlarına, içeriğine, ölçeğine karar verebilirsiniz. Bu noktada bilmekte fayda var görselin kalitesi çalışmanızımn yüklenmesini yavaşlatabilir. Dolayısıyla bu örneklerde ben 1080 HD çözünürlüğünü tercih ettim.

![](https://cdn-images-1.medium.com/max/1024/1*Krak9tYIIVu05Tb0CX-ibA.png)

![Haritadaki detaylar, ölçekler ve çözünürlük seçimi ve görselin kaydedilmesi](https://cdn-images-1.medium.com/max/1024/1*Zdo7FKKuCcnCspRYJVEZ6A.png)
*Haritadaki detaylar, ölçekler ve çözünürlük seçimi ve görselin kaydedilmesi*

Bu aşama sonrasında Juxtapose arayüzünde bu görsellerden iki ayrı çalışma üretebiliriz. Üstteki örnekte olduğu üzere bir slider kullanabiliriz veya çalışmayı tamamen GIF haline getirebiliriz.

![](https://cdn-images-1.medium.com/max/1024/1*sutf8rIDKoQcUmci9y2zRQ.png)

Önemli olan nokta şurası görselleri bu kısıma yüklemiyoruz. Görsellerin internet ortamındaki bağlantısını yapıştırıyoruz. Bu aşamada dropbox uygulamasını ve arayüzdeki dropbox butonlarını kullanmanızı öneriyorum. Bu işlem sonrası yüklediğiniz görsellerin önizleme versiyonlarını alt tarafta görebilirsiniz.

![](https://cdn-images-1.medium.com/max/1024/1*EBpNYenwMznivwaxHdP0Vg.png)

Çalışmayı Publish butonuna tıklayıp yayınlayabilirsiniz. Butonun altında kendi sayfanıza yer verebileceğiniz bağlantı ve embed kodu bulabilirsiniz.

![](https://cdn-images-1.medium.com/max/1024/1*gdVX7wfdRc9cPmstpXKIeQ.png)

Hadi şimdi yaptığım bazı çalışmaları görelim

## Örnek çalışma 1: Fikirtepe’nin 12 yılda değişimi

Eğer aşağıdaki embed edilmiş kısımdan göremiyorsanız [şuradan](https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=ce0bc5a4-0c5f-11ef-9396-d93975fe8866) ulaşabilirsiniz.

<div class="embed-container"><iframe src="https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=ce0bc5a4-0c5f-11ef-9396-d93975fe8866" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

## Örnek çalışma 2: Validebağ Korusu ve çevresinin 16 yıllık değişimi

Eğer aşağıdaki embed edilmiş kısımdan göremiyorsanız [şuradan](https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=35ceb394-0c61-11ef-9396-d93975fe8866) ulaşabilirsiniz. En üstte gif versiyonunu da görebilirsiniz.

<div class="embed-container"><iframe src="https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=35ceb394-0c61-11ef-9396-d93975fe8866" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

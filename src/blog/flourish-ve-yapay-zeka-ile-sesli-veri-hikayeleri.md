---
title: "Flourish ve Yapay Zeka ile Sesli Veri Hikayeleri Nasıl Hazırlanır?"
date: 2025-06-29
author: Sadettin Demirel
excerpt: "Metin, ses, görsel ve video üretebilen büyük dil modelleri (large language models), üretken yapay zekâ teknolojileri olarak hem iş hem de gündelik hayatımıza hızla nüfuz ediyor. Büyük ve karmaşık verilerden anlamlı…"
thumbnail: https://cdn-images-1.medium.com/max/1024/0*jaPgU6vGyuzi-ew2
tags_display: "Flourish, Data Storytelling, Data Visualization, Artificial İntelligence, Veri Görselleştirme"
original_url: https://medium.com/verijurnali/flourish-ve-yapay-zeka-ile-sesli-veri-hikayeleri-nas%C4%B1l-haz%C4%B1rlan%C4%B1r-e5ec839a6108
original_source: Medium
---
![Photo by Nick Brunner on Unsplash](https://cdn-images-1.medium.com/max/1024/0*jaPgU6vGyuzi-ew2)
*Photo by Nick Brunner on Unsplash*

Metin, ses, görsel ve video üretebilen büyük dil modelleri (large language models), üretken yapay zekâ teknolojileri olarak hem iş hem de gündelik hayatımıza hızla nüfuz ediyor. Büyük ve karmaşık verilerden anlamlı bulgular elde etmek için verilerin analizi ve görselleştirilmesinde de kullanımına şahit oluyoruz. Son tahlilde amaç tüm bu süreci otomasyonel hale getirerek yapay zeka modellerine devretmek. Ancak, bu yazı yapay zeka ile verilerden anlam çıkarma işini otomatik hale getirmek üzerine değil, hikayeleştirme işinde büyük dil modellerini nasıl entegre edebileceğimize odaklanıyor.

Hikaye yazmak, anlatmak, dinlemek insanın en has özelliklerinden birisi. Yüzyıllar boyu hiyeroglif fıkralarla, söylencelerle, destanlarla, türkülerle hikaye anlatıp duruyoruz. Şimdilerde bunu tweet zincirleriyle, TikTok videolarıyla yapıyoruz. Aynı şekilde veri görselleştirmeyle de bilgiyi, bulguyu hikayeleştirerek anlatmak mümkün. Bu yazı, üretken yapay zekâ öncesinde de var olan bazı teknolojilerin (TTS), büyük dil modelleriyle nasıl daha etkili veri hikayeleri oluşturabileceğini ele alıyor.

Başrolde [Flourish](https://flourish.studio/) var. Bir veri görselleştirme hizmeti sunan bu aracı, bu bloktaki [bir yazımda](/blog/haber-merkezleri-icin-ucretsiz-veri-gorsellestirme-araci-flourish/) ve [NewsLabTurkey’deki yazımda](/blog/gazeteciler-icin-gelistirilmis-gorsellestirme-araci-flourish/) anlatmıştım. Tamamen ücretsiz bir araç. Flourish’in veri grafiklerini birbiri arkasına ekleyerek bir hikayeleştirme imkanı sağlaması önemli özelliklerinden birisi. Örneğin aşağıdaki görselleştirme buna örnek. Biraz Tableau vb. araçların dashboard özelliğine benziyor ama daha fazlası var.

<div class="embed-container"><iframe src="https://flo.uri.sh/story/146411/embed" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

Veri hikayesi olarak adlandırılan bu özelliğinin öne çıkan bir yönü ise ses dosyası eklenerek grafiklerin eklenebilmesi. Yani çalışmanızı sadece okura veya hedef kitlenize göstermiyorsunuz aynı zamanda kelimenin tam anlamıyla anlatarak sunabiliyorsunuz. Verilerle hikaye anlatmak için tabi ki seslendirmeye gerek yok.

Sesli bir sunum olmadan da hedef kitlenin çalışma üzerinde kendi kendine keşfetmesi veya çalışmadaki yönlendirmeleri takip ederek istenen mesajı/enformasyonu alması mümkün. Ancak zamanın hızla aktığı günümüzde, kullanıcıların veri hikayelerini detaylı şekilde incelemesi pek gerçekçi görünmüyor. Ayrıca veri hikayelerinin okunması ve anlaşılması belirli seviye de bir veri / veri görselleştirme okuryazarlığı gerektirmekte. Bu noktada hedeflenen kitleye anlatılmak isteneni sesli veri görselleştirmelerle sunmak fayda sağlayabilir.

![Google AI Studio](https://cdn-images-1.medium.com/max/1024/1*ogCKkX02y37aLL2d7HmaAg.png)
*Google AI Studio*

İşte bu aşamada devreye yardımcı oyuncular yani büyük dil modelleri giriyor. Özellikle metinden ses üretebilen (TTS — Text to Speech) yapay zeka modelleri. Bu noktada tabi ki bu modelleri kullanmak zorunda değilsinizi, iyi bir ses kalitesine sahip bir mikrofon ve ses kayıt sisteminiz var ise bunu kendi sesinizle yapmak da mümkün. Ama [Google Yapay Zeka Stüdyosu](https://aistudio.google.com/) bu işi sizin için 2–3 dakikaya düşürebiliyor. Gemini 2.5-pro ve Gemini-2.5-flash modelleri üzerine kurulu olan bu araçla çoklu dillerde içeriğe göre uygun seslendirmeler (native speech generation) yapılabiliyor. Tabi ki TTS teknolojileri için alternatifler çok, Google AI Stüdyo erişim kolay olduğundan tercih ettim.

![Sadece seslendirme değil, iki kişi arasında geçen bir diyalog da kolaylıkla üretilebilir.](https://cdn-images-1.medium.com/max/1024/1*MIXf_W1ZJ0DakTBQTtNuDw.png)
*Sadece seslendirme değil, iki kişi arasında geçen bir diyalog da kolaylıkla üretilebilir.*

Bu araçla seslendirmek istediğiniz metni eklemeniz, metnin tonuna dair direktifler vermeniz veya sağ alttaki Voice seçeneğinden metne göre ses seçmeniz yeterli. Ama tabi bu aşama öncesinde Flourish ile veri grafikleri üretmeniz ve bu grafiklere dair üstteki görselde olduğu gibi metinler oluşturmalısınız. Metinleri seslendirme işlemi tamamlandıktan sonra, araç wav formatında ses dosyası sağlıyor. Ama Flourish’e yüklemek için [mp3 haline dönüştürmeniz](https://cloudconvert.com/wav-to-mp3) gerekmekte. Bu aşama da tamamsa iki adım kaldı.

![](https://cdn-images-1.medium.com/max/1024/1*HWCirwoXD4aZMbUsLNH5GQ.png)

İlk aşamada Flourish ile yukarıdaki gibi veri grafikleri üretmek, grafiklerden veri hikayesi oluşturmak ve ses dosyasını yüklemek. İkinci aşama ise PowerPoint sunumlarında olduğu gibi grafiğin gösterilme süresi (duration) ses dosyasıyla senkronize edilmeli. Çünkü grafikler otomatik olarak hareket etmekte, anlatıcıyla uyumlu hareket etmeleri iyi bir veri hikayesi için elzem. Sonuç olarak aşağıdaki gibi bir çalışma bu adımları gerçekleştirerek elde edilebilir.

<div class="embed-container"><iframe src="https://flo.uri.sh/story/3088681/embed" width="100%" height="500" frameborder="0" loading="lazy" allowfullscreen=""></iframe></div>

Üstteki örnek çalışma kusursuz bir çalışma değil, bu inceleme yazısı için hızlıca oluşturuldu. Ama anlatacaklarınızı doğru bir şekilde görselleştirdiğinizi, uygun noktaları sesli sunumda vurguladığınızı düşünün, yapay zeka teknolojilerinin var olan pratiklere bu şekilde entegre etmek veri hikayeleştirme pratiklerini bir üst aşamaya ulaştırabilir. Hem anlatıcı hem de hedef kitlenin deneyimlerini zenginleştirebilir. Bu olanaklara erişimin bu denli kolay olması cabası…

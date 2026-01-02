// VERSİYON KONTROLÜ: Her güncellemede buradaki sayıyı artır (v7, v8, v9...)
const CACHE_NAME = 'onikikapi-v7-agresif'; 

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 1. YÜKLEME (INSTALL): Eski bekleyenleri umursama, hemen yükle
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Bekleme yapma, hemen devreye gir!
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Yeni önbellek (v7) oluşturuluyor');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. AKTİFLEŞME (ACTIVATE): Eski sürüm varsa ACIMADAN SİL
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Eğer cache ismi bizim şu anki versiyonumuz değilse SİL
          if (cacheName !== CACHE_NAME) {
            console.log('Eski önbellek temizleniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Tüm açık sayfaların kontrolünü hemen ele al
    })
  );
});

// 3. İSTEK YAKALAMA (FETCH): Önce Network'e sor (Ağ Öncelikli Strateji)
// Bu strateji beyaz ekranı en aza indirir çünkü hep en güncelini internetten almaya çalışır.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // İnternetten yeni veriyi aldık, bir kopyasını da cache'e atalım
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        // İnternet yoksa cache'den ver (Offline modu)
        return caches.match(event.request);
      })
  );
});
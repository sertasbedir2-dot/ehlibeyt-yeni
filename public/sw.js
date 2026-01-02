// VERSİYON: v8 (Burası değiştikçe tarayıcı güncellemeyi zorunlu kılar)
const CACHE_NAME = 'onikikapi-v8-final'; 

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 1. YÜKLEME (INSTALL): Beklemeden hemen yükle
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Bekleme yapma, hemen devreye gir!
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🔥 YENİ VERSİYON YÜKLENİYOR:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. AKTİFLEŞME (ACTIVATE): Eski sürüm (v3, v7 vb.) ne varsa SİL
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eski çöp temizleniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Yeni versiyon kontrolü ele aldı!');
      return self.clients.claim();
    })
  );
});

// 3. İSTEK YAKALAMA (FETCH): Önce İnternet (Network First)
// Bu sayede dosyayı değiştirdiğin an tarayıcı yenisini görür.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // İnternet varsa yenisini al ve cache'i güncelle
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
        // İnternet yoksa mecburen cache'den ver
        return caches.match(event.request);
      })
  );
});
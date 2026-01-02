const CACHE_NAME = 'onikikapi-v3'; // GÜNCELLENDİ: v3 yaptık ki yeni Footer butonu hemen görünsün
const urlsToCache = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-96x96.png',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png'
];

// Yükleme: Yeni dosyaları önbelleğe al
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Yeni önbellek (v3) oluşturuluyor');
        return cache.addAll(urlsToCache);
      })
  );
});

// İstekleri Yakala: Cache'den veya Network'ten ver
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache'de varsa onu döndür, yoksa internete git
        return response || fetch(event.request);
      })
  );
});

// Güncelleme: Eski cache'leri (v1, v2) ve hatalı dosyaları temizle
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Eski önbellek temizleniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
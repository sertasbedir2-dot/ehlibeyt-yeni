const CACHE_NAME = 'onikikapi-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Yükleme: Önbelleğe al
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Önbellek açıldı');
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

// Güncelleme: Eski cache'leri temizle
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
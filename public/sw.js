const CACHE_NAME = 'onikikapi-v2'; // Versiyonu yükselttik
const urlsToCache = [
  '/',
  '/index.html',
  '/site.webmanifest',          // DÜZELTİLDİ: Artık manifest.json aranmayacak
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/web-app-manifest-192x192.png', // Yeni ikonlar eklendi
  '/web-app-manifest-512x512.png'  // Yeni ikonlar eklendi
];

// Yükleme: Önbelleğe al
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Yeni önbellek (v2) açıldı');
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

// Güncelleme: Eski cache'leri (v1) temizle
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Eski önbellek siliniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
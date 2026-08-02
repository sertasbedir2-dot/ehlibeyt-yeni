// VERSİYON: v10.0 (Tam Entegre PWA ve Çevrimdışı Kalkan)
const CACHE_NAME = 'onikikapi-v10.0-final'; 

// Önbelleğe alınacak ana kritik dosyalar (public klasöründeki gerçek dosyalar)
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-96x96.png',
  '/apple-touch-icon.png',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png',
  '/og-image.jpg'
];

// 1. YÜKLEME (INSTALL)
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🕌 Dijital Sanctuary: Kritik PWA dosyaları korumaya alınıyor...');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. AKTİFLEŞME (ACTIVATE) - Eski sürümleri anında yok eder
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eski sürüm kalıntıları temizleniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Yeni v10.0 PWA versiyonu tüm kapıları devraldı!');
      return self.clients.claim();
    })
  );
});

// 3. İSTEK YAKALAMA (FETCH) - Network First (Önce Ağ)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          if (event.request.url.startsWith('http')) {
            cache.put(event.request, responseToCache);
          }
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((matchedResponse) => {
          if (matchedResponse) {
            return matchedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});
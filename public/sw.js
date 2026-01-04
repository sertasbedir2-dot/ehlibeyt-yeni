// VERSİYON: v9.1 (Daha kapsamlı önbellekleme stratejisi)
const CACHE_NAME = 'onikikapi-v9.1-final'; 

// Önbelleğe alınacak ana kritik dosyalar
const urlsToCache = [
  '/',
  '/index.html',
  '/site.webmanifest', // manifest.json yerine site.webmanifest kullanıyorsanız bunu ekleyin
  '/favicon.ico',
  '/apple-touch-icon.png'
];

// 1. YÜKLEME (INSTALL)
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🕌 Dijital Sanctuary: Kritik dosyalar korumaya alınıyor...');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. AKTİFLEŞME (ACTIVATE)
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
      console.log('✅ Yeni versiyon tüm kapıları devraldı!');
      return self.clients.claim();
    })
  );
});

// 3. İSTEK YAKALAMA (FETCH) - Network First (Önce Ağ)
self.addEventListener('fetch', (event) => {
  // Sadece GET isteklerini cache'e alalım (API POST'larını veya harici servisleri bozmamak için)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Geçerli bir yanıt geldiyse cache'e kopyala
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // Dinamik verileri veya chrome-extension gibi istekleri süzerek kaydet
          if (event.request.url.startsWith('http')) {
            cache.put(event.request, responseToCache);
          }
        });

        return response;
      })
      .catch(() => {
        // İNTERNET YOKSA: Önbellekten bak
        return caches.match(event.request).then((matchedResponse) => {
          if (matchedResponse) {
            return matchedResponse;
          }
          
          // Eğer ana sayfa isteği ise ve internet yoksa index.html döndür (Offline SPA desteği)
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});
# 🏛️ THAQALAYN & ONİKİKAPI PROJE DURUM RAPORU
**Rapor Kodu:** THQ_MASTER_LOG_v1.0.7
**Son Güncelleme:** 12.01.2026
**Yayın Durumu:** ✅ Aktif (Vercel - Ready)
**Aktif Branch:** `main`

## 🎯 1. BÜYÜK VİZYON (HEDEF)
14 Masum'un hayatını, stratejilerini ve ilişkilerini; Neo4j (Grafik Veritabanı) tabanlı, interaktif ve yaşayan bir web arayüzünde sunmak. "Statik tarih" değil, "Dinamik Bağlantılar" (Knowledge Graph) göstermek.

## 🛠️ 2. TEKNİK ALTYAPI (TECH STACK)
- **Frontend (VİTRİN - Aktif):** React.js + Vite + PWA + TailwindCSS (Şu an üzerinde çalışılan katman).
- **Backend (KÖPRÜ - Beklemede):** Node.js + Express (Neo4j ile konuşacak API sunucusu).
- **Veritabanı (BEYİN - Hazır):** Neo4j (14 Masum verisi işlendi).
- **Sunucu:** Vercel (Frontend Hosting) + Render (Planlanan Backend Hosting).

## ✅ 3. TAMAMLANAN KRİTİK BAKIMLAR (Frontend - v1.0.7)
Son yapılan teknik müdahalelerle site stabilize edilmiştir:
1.  **Facebook Link Temizleyici:** URL sonuna eklenen `fbclid` parametresini temizleyen kod `App.jsx` içine eklendi.
2.  **Build Hataları Giderildi:**
    - `vite.config.js` içinden olmayan `mask-icon.svg` dosyası çıkarıldı.
    - `package-lock.json` silinip temiz kurulum yapıldı (Windows/Linux uyumsuzluğu giderildi).
    - Eksik `react-fast-compare` kütüphanesi manuel olarak eklendi.
3.  **Yazım Denetimi (Lint):** ESLint kuralları `package.json` üzerinden devre dışı bırakılarak gereksiz derleme hataları engellendi.

## 🔄 4. ŞU ANKİ AŞAMA (ROADMAP)
* [TAMAMLANDI] **Frontend Stabilizasyonu:** Site hataları giderildi, Vercel'de yeşil ışık yandı.
* [YAPILACAK] **GitHub Düzeni:** Varsayılan dal (default branch) `master`'dan `main`'e çekilecek.
* [YAPILACAK] **UX İyileştirmesi:** Backend uyanana kadar kullanıcıyı bekletmemek için "Skeleton UI" (Yükleniyor ekranı) yapılacak.
* [BEKLEMEDE] **Backend Bağlantısı:** Node.js sunucusu (server.js) mevcut proje klasöründe ayağa kaldırılacak.

## 📝 NOTLAR VE İPUÇLARI
- Projeye tekrar başlandığında `git pull` yaparak güncel kodun çekildiğinden emin olunmalı.
- Vercel'de "Build Failed" hatası alınırsa önce `vite.config.js` dosyasındaki dosya yolları kontrol edilmeli.
import React, { useState } from 'react';
import { RefreshCw, ShieldCheck, Heart, Info } from 'lucide-react';

export default function Footer() {
  const [isResetting, setIsResetting] = useState(false);

  // SİSTEMİ CERRAHİ HASSASİYETLE SIFIRLAYAN FONKSİYON
  const handleHardReset = async () => {
    const confirmReset = window.confirm(
      "Uygulama belleği temizlenip en güncel sürüm yüklenecek. Devam edilsin mi?"
    );

    if (confirmReset) {
      setIsResetting(true);
      try {
        // 1. LocalStorage ve SessionStorage Temizliği
        localStorage.clear();
        sessionStorage.clear();

        // 2. Service Worker'ları Kayıttan Düşür
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (let registration of registrations) {
            await registration.unregister();
          }
        }

        // 3. Cache Storage (Önbellek) Silme
        if ('caches' in window) {
          const names = await caches.keys();
          await Promise.all(names.map(name => caches.delete(name)));
        }

        // 4. Kısa bir bekleme (İşlemlerin tamamlandığından emin olmak için)
        await new Promise(resolve => setTimeout(resolve, 500));

        // 5. Sunucudan Taze Yükleme
        window.location.reload(true);
      } catch (error) {
        console.error("Sıfırlama sırasında bir hata oluştu:", error);
        window.location.reload();
      }
    }
  };

  return (
    <footer className="bg-turquoise-dark border-t border-gold/20 py-12 mt-auto relative z-10 overflow-hidden">
      {/* Estetik Arka Plan Süsü */}
      <div className="absolute inset-0 bg-gold/5 opacity-20 pointer-events-none transform -skew-y-6 translate-y-20"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center text-center space-y-6">
          
          {/* Hadis-i Şerif / Motto */}
          <div className="space-y-2">
            <p className="text-gold font-serif italic text-xl md:text-2xl drop-shadow-sm">
              "İlim şehri benim, Ali de onun kapısıdır."
            </p>
            <p className="text-turquoise-light text-[10px] tracking-[0.4em] uppercase font-bold">
              OnikiKapı • İlim ve Hikmet
            </p>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>

          {/* Alt Bilgiler */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-slate-400 text-xs font-medium">
              <span className="hover:text-gold transition-colors cursor-default flex items-center gap-1">
                <ShieldCheck size={14} className="text-gold/50" /> Güvenli Bağlantı
              </span>
              <span className="hover:text-gold transition-colors cursor-default flex items-center gap-1">
                <Heart size={14} className="text-red-500/50" /> Ehlibeyt Sevgisiyle
              </span>
            </div>

            <p className="text-slate-500 text-[11px] font-sans">
              © {new Date().getFullYear()} OnikiKapı. İlim şehri dijital külliyesi.
            </p>

            {/* TAMİR VE BAKIM BUTONU */}
            <div className="pt-4 flex flex-col items-center gap-2">
              <button 
                onClick={handleHardReset}
                disabled={isResetting}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all border
                  ${isResetting 
                    ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed' 
                    : 'bg-red-950/20 hover:bg-red-900/40 text-red-400 border-red-900/30 hover:border-red-500/50 active:scale-95'}
                `}
              >
                <RefreshCw size={12} className={isResetting ? 'animate-spin' : ''} />
                {isResetting ? 'Sistem Yenileniyor...' : 'Sistemi Onar / Güncelle'}
              </button>
              <p className="text-[9px] text-slate-600 italic flex items-center gap-1">
                <Info size={10} /> Sürüm uyumsuzluğu veya donma yaşarsanız kullanın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
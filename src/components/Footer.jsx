import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function Footer() {
  
  // TELEFONU ZORLA DÜZELTEN FONKSİYON
  const handleHardReset = () => {
    if (window.confirm("Uygulama verileri temizlenip yenilenecek. Onaylıyor musunuz?")) {
      // 1. Service Worker'ları sil
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          for(let registration of registrations) {
            registration.unregister();
          }
        });
      }
      // 2. Önbelleği (Cache) sil
      if (window.caches) {
        caches.keys().then(function(names) {
          for (let name of names) {
            caches.delete(name);
          }
        });
      }
      // 3. Yerel hafızayı sil
      localStorage.clear();
      sessionStorage.clear();
      
      // 4. Sayfayı sunucudan sıfırdan çek
      window.location.reload(true);
    }
  };

  return (
    <footer className="bg-turquoise-dark border-t border-gold/20 py-8 mt-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sand font-serif italic text-lg mb-4">
          "İlim şehri benim, Ali de onun kapısıdır."
        </p>
        <div className="flex flex-col items-center justify-center gap-4 text-slate-400 text-sm">
          <p>© 2024 OnikiKapı. Tüm hakları saklıdır.</p>
          
          {/* TAMİR BUTONU */}
          <button 
            onClick={handleHardReset}
            className="flex items-center gap-2 bg-red-900/30 hover:bg-red-900/50 text-red-200 px-3 py-1 rounded-full text-xs transition-colors border border-red-800/50"
          >
            <RefreshCw size={12} />
            Sorun mu var? Sistemi Yenile
          </button>
        </div>
      </div>
    </footer>
  );
}
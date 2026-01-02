import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Hata olduğunda durumu güncelle
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Hatayı konsola yazdır (Geliştirici görsün diye)
    console.error("Uygulama Hatası:", error, errorInfo);
  }

  // --- SİHİRLİ FONKSİYON: OTOMATİK TEMİZLİK ---
  handleHardReset = () => {
    // 1. Service Worker'ları sil
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
        }
      });
    }

    // 2. Cache'leri (Önbelleği) sil
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }

    // 3. Sayfayı sunucudan zorla yenile (Hard Reload)
    window.location.reload(true);
  };

  render() {
    if (this.state.hasError) {
      // --- HATA OLDUĞUNDA GÖZÜKECEK EKRAN ---
      return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-serif text-[#C5A059]">
          <div className="max-w-md w-full bg-[#1e293b] border border-[#C5A059]/30 rounded-2xl p-8 text-center shadow-2xl">
            
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-[#C5A059]/10 rounded-full animate-pulse">
                <AlertTriangle size={48} className="text-[#C5A059]" />
              </div>
            </div>

            <h1 className="text-xl font-bold mb-4 text-white">
              Yeni Bir Güncelleme Var!
            </h1>
            
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              Uygulamaya yeni özellikler eklendiği için cihazınızdaki eski verilerle çakışma yaşandı. Aşağıdaki butona basarak uygulamayı güncelleyebilirsiniz.
            </p>

            {/* Bu buton artık hem yeniliyor hem de tüm çöp verileri temizliyor */}
            <button 
              onClick={this.handleHardReset} 
              className="w-full bg-[#C5A059] hover:bg-[#b08d48] text-slate-900 font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <RefreshCw size={20} />
              Uygulamayı Güncelle ve Aç
            </button>

            <p className="mt-6 text-xs text-slate-500">
              Hata Kodu: OnikiKapı-System-HardReset
            </p>
          </div>
        </div>
      );
    }

    // Hata yoksa normal siteyi göster
    return this.props.children; 
  }
}

export default ErrorBoundary;
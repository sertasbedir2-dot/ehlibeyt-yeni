import React from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // UI'ı güncellemek için state'i değiştir
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Hata detaylarını logla
    console.error("⚠️ Kritik Uygulama Hatası:", error, errorInfo);
    this.setState({ errorInfo });
  }

  // --- GELİŞTİRİLMİŞ NÜKLEER TEMİZLİK ---
  handleHardReset = async () => {
    console.log("🧹 Nükleer Temizlik Başlatılıyor...");

    try {
      // 1. Önce LocalStorage ve SessionStorage'ı tamamen sil
      // (Versiyon Nöbetçisi'nin 'onikikapi_version' verisi dahil silinir, sistem sıfırlanır)
      localStorage.clear();
      sessionStorage.clear();

      // 2. Service Worker'ları Bekleyerek (Await) Sil
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }

      // 3. Cache Storage'ı (Önbellek) tamamen boşalt
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
      }

    } catch (error) {
      console.error("Temizlik sırasında hata oluştu ama yine de yenilenecek:", error);
    } finally {
      // 4. Her ne olursa olsun sayfayı sunucudan zorla yenile
      window.location.reload(true);
    }
  };

  render() {
    if (this.state.hasError) {
      // --- HATA EKRANI (KRİZ YÖNETİMİ) ---
      return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-serif text-[#C5A059]">
          <div className="max-w-md w-full bg-[#1e293b] border border-[#C5A059]/30 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(197,160,89,0.15)] animate-fade-in-up">
            
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-[#C5A059]/10 rounded-full animate-pulse relative">
                <AlertTriangle size={48} className="text-[#C5A059] relative z-10" />
                <div className="absolute inset-0 bg-[#C5A059]/20 rounded-full blur-xl"></div>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-3 text-white tracking-wide">
              Uygulama Yenileniyor
            </h1>
            
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              Daha iyi bir deneyim sunmak için yapılan güncellemeler cihazınızla uyumlanıyor. Lütfen "Onar ve Başlat" butonuna basarak hafızayı tazeleyin.
            </p>

            <button 
              onClick={this.handleHardReset} 
              className="group w-full bg-[#C5A059] hover:bg-[#b08d48] text-[#0f172a] font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
            >
              <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
              <span>Onar ve Başlat</span>
            </button>

            <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest flex items-center justify-center gap-2">
                  <Trash2 size={10} />
                  System Integrity Protocol v6.0
                </p>
            </div>
          </div>
        </div>
      );
    }

    // Hata yoksa normal akış devam etsin
    return this.props.children; 
  }
}

export default ErrorBoundary;
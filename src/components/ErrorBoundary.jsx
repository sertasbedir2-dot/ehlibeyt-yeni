import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

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
    console.error("Hata Yakalandı:", error, errorInfo);
  }

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

            <h1 className="text-2xl font-bold mb-4 text-white">
              Şu An Küçük Bir Bakımdayız
            </h1>
            
            <p className="text-slate-400 mb-8 leading-relaxed">
              İlim şehrinde bazen yeni kapılar açmak için kısa molalar veriyoruz. Veya tarayıcınız eski bir versiyonu hatırlıyor olabilir.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => window.location.reload()} 
                className="w-full bg-[#C5A059] hover:bg-[#b08d48] text-slate-900 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                Sayfayı Yenile
              </button>
              
              <button 
                onClick={() => {
                  // Önbelleği temizleyip ana sayfaya zorla yönlendir
                  if('caches' in window){
                    caches.keys().then((names) => {
                      names.forEach(name => {
                        caches.delete(name);
                      });
                    });
                  }
                  window.location.href = '/';
                }} 
                className="w-full bg-transparent border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059]/10 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Önbelleği Temizle ve Ana Sayfaya Dön
              </button>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Hata Kodu: OnikiKapı-System-Refresh
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
import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Sadece "Uygulamayı Yükle" olayını dinle
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Eğer uygulama zaten yüklü değilse butonu göster
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setShowInstallButton(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Eğer uygulama zaten yüklüyse butonu gizle
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  // Eğer yüklenecek bir durum yoksa hiçbir şey gösterme (Sıfır uyarı)
  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[9999] animate-fade-in md:bottom-6 md:left-auto md:right-6 md:w-auto">
      <div className="bg-turquoise-dark border border-gold/30 p-4 rounded-xl shadow-2xl flex items-center gap-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors"></div>
        
        <button 
          onClick={() => setShowInstallButton(false)} 
          className="absolute top-2 right-2 text-slate-400 hover:text-white p-1"
        >
          <X size={16} />
        </button>

        <div className="bg-gold/20 p-3 rounded-full shrink-0">
          <Download className="text-gold" size={24} />
        </div>
        
        <div className="flex-1 pr-6">
          <h4 className="text-sand font-bold text-sm">Uygulamayı Yükle</h4>
          <p className="text-slate-400 text-xs mt-0.5">Daha hızlı erişim için ana ekrana ekle.</p>
        </div>

        <button 
          onClick={handleInstallClick}
          className="bg-gold text-turquoise-dark px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors shadow-lg"
        >
          Yükle
        </button>
      </div>
    </div>
  );
}
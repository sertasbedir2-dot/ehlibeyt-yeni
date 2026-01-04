import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // 1. Varsayılan tarayıcı penceresini engelle
      e.preventDefault();
      // 2. Olayı sakla (daha sonra tetiklemek için)
      setDeferredPrompt(e);
      // 3. Kendi özel butonumuzu göster
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // --- KRİTİK DONMA ÖNLEYİCİ ---
    // React'in bu butonu ekrandan kaldırması için ona zaman veriyoruz.
    setIsVisible(false);
    
    // UI render edilsin diye 300ms bekletiyoruz (Yielding)
    await new Promise(resolve => setTimeout(resolve, 300));

    // Şimdi tarayıcının kendi penceresini açıyoruz
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Kullanıcı tercihi: ${outcome}`);
    
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-fade-in-up">
      <div className="bg-turquoise-dark border border-gold/30 text-sand p-4 rounded-xl shadow-[0_0_20px_rgba(0,128,128,0.4)] flex items-center gap-4 max-w-sm backdrop-blur-md">
        <div className="bg-white/10 p-2 rounded-full">
          <Download className="text-gold animate-pulse" size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm text-gold">Uygulamayı Yükle</h4>
          <p className="text-xs text-slate-300">İnternetsiz erişim için ana ekrana ekle.</p>
        </div>
        <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} className="text-slate-400" />
            </button>
            <button 
              onClick={handleInstallClick}
              className="px-3 py-1.5 bg-gold text-turquoise-dark font-bold text-xs rounded-lg hover:bg-white hover:scale-105 transition-all shadow-lg"
            >
              Yükle
            </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Cihaz iPhone mu kontrol et
    const iosCheck = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iosCheck);

    // 2. Android/PC için yükleme sinyalini dinle
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Uygulama yüklü değilse butonu aç
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setShowInstallButton(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Eğer zaten yüklüyse gizle
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    // A) Eğer Android/PC ise ve sinyal varsa
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallButton(false);
      }
      return;
    }

    // B) Eğer iPhone ise (iPhone otomatik butonu desteklemez)
    if (isIOS) {
      alert("iPhone'da uygulamayı yüklemek için:\n\n1. Aşağıdaki 'Paylaş' simgesine dokunun.\n2. Açılan menüden 'Ana Ekrana Ekle' seçeneğini seçin.");
      return;
    }

    // C) Eğer Android ama sinyal kayıpsa (Nadir durum)
    alert("Yükleme penceresi açılamadı. Tarayıcınızın menüsünden (üç nokta) 'Uygulamayı Yükle' veya 'Ana Ekrana Ekle' diyerek yükleyebilirsiniz.");
  };

  // Buton görünmesin istiyorsak gizle
  if (!showInstallButton && !isIOS) return null;
  // Not: iPhone'da her zaman göstermek istemiyorsanız yukarıdaki !isIOS kısmını silmeyin.
  // Ancak iPhone kullanıcısına buton göstermek isterseniz state yönetimi biraz daha farklı olmalı.
  // Şu anki mantıkta sadece 'beforeinstallprompt' gelirse (Android/PC) buton görünür.

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[9999] animate-fade-in md:bottom-6 md:left-auto md:right-6 md:w-auto">
      <div className="bg-turquoise-dark border border-gold/30 p-4 rounded-xl shadow-2xl flex items-center gap-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors"></div>
        
        <button 
          onClick={() => setShowInstallButton(false)} 
          className="absolute top-2 right-2 text-slate-400 hover:text-white p-1 z-20"
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
          className="bg-gold text-turquoise-dark px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors shadow-lg z-20 active:scale-95"
        >
          Yükle
        </button>
      </div>
    </div>
  );
}
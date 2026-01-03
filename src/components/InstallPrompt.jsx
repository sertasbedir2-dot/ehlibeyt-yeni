import React, { useState, useEffect } from 'react';
import { Download, Share, X, Phone } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 0. Önce "Daha önce reddetti mi?" kontrolü yapalım
    const isDismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (isDismissed) return; // Eğer reddettiyse hiç çalıştırma

    // 1. Android/Desktop için install eventini yakala
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // 5 saniye sonra göster
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 2. iOS Tespiti
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
      setTimeout(() => setShowPrompt(true), 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Kullanıcı kabul etti');
          // Kabul ettiyse de artık sormayalım
          localStorage.setItem('pwa_prompt_dismissed', 'true');
        }
        setDeferredPrompt(null);
        setShowPrompt(false);
      });
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
    // Kapatırsa "Bir daha sorma" diyoruz (İsterseniz bunu SessionStorage yapıp sadece o oturumda sormamasını sağlayabilirsiniz)
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[200] p-4 animate-fade-in">
      <div className="max-w-md mx-auto bg-[#162e45] border border-gold/30 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        
        {/* Kapatma Butonu */}
        <button 
          onClick={handleClose} 
          className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex gap-4 items-start">
          <div className="bg-turquoise p-3 rounded-xl shadow-lg shrink-0">
            <Phone className="text-white" size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gold font-sans mb-1">Maneviyatı Yanında Taşı</h3>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              Daha hızlı erişim ve çevrimdışı okuma için OnikiKapı'yı ana ekranına ekle.
            </p>

            {isIOS ? (
              // iOS YÖNERGESİ
              <div className="bg-midnight/50 p-3 rounded-lg border border-white/10 text-xs text-slate-300">
                <p className="flex items-center gap-2 mb-1">
                  1. Aşağıdaki <Share size={14} /> <strong>Paylaş</strong> butonuna basın.
                </p>
                <p className="flex items-center gap-2">
                  2. <strong>"Ana Ekrana Ekle"</strong> seçeneğini seçin.
                </p>
              </div>
            ) : (
              // ANDROID BUTONU
              <button 
                onClick={handleInstallClick}
                className="bg-gold text-turquoise-dark px-6 py-2.5 rounded-lg font-bold hover:bg-white transition-all flex items-center gap-2 w-full justify-center shadow-lg transform active:scale-95"
              >
                <Download size={20} /> Ana Ekrana Ekle
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
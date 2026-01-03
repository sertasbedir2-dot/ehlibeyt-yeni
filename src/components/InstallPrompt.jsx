import React, { useState, useEffect } from 'react';
import { Bell, Download, X } from 'lucide-react';

export default function InstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [promptType, setPromptType] = useState(null); // 'install' veya 'notification'
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // 1. Önce PWA Yükleme Kontrolü
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!localStorage.getItem('pwa_prompt_dismissed')) {
        setPromptType('install');
        // Mobilde hemen çıkmasın, sayfa tam yüklensin diye gecikme
        setTimeout(() => setIsVisible(true), 2000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 2. Bildirim Kontrolü
    const checkNotification = () => {
      if (!deferredPrompt && Notification.permission === 'default' && !localStorage.getItem('notification_prompt_dismissed')) {
        setPromptType('notification');
        setTimeout(() => setIsVisible(true), 3000);
      }
    };

    checkNotification();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [deferredPrompt]);

  const handleAccept = async () => {
    // ADIM 1: GÖRSEL KİLİDİ AÇ (Modalı Hemen Kapat)
    setIsVisible(false);

    // ADIM 2: GÜVENLİ GECİKME (500ms)
    // Telefonun ekranı tazelemesi için yarım saniye bekliyoruz.
    setTimeout(async () => {
      try {
        if (promptType === 'install' && deferredPrompt) {
          // Native PWA Yükleme Penceresini çağır
          await deferredPrompt.prompt(); // await eklendi
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            localStorage.setItem('pwa_prompt_dismissed', 'true');
          }
          setDeferredPrompt(null);
        } 
        else if (promptType === 'notification') {
          // Native Bildirim İzni Penceresini çağır
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            localStorage.setItem('notification_enabled', 'true');
            new Notification("Hoş Geldiniz", {
              body: "Sabah Virdiniz her sabah size ulaşacaktır.",
              icon: "/icon-192x192.png" 
            });
          }
          localStorage.setItem('notification_prompt_dismissed', 'true');
        }
      } catch (error) {
        // Hata olsa bile kullanıcı hissetmeyecek, sadece konsola yazılacak
        console.error("Native pencere hatası (Önemsiz):", error);
      }
      
    }, 500); // 500ms kritik gecikme (Daha güvenli)
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (promptType === 'install') {
      localStorage.setItem('pwa_prompt_dismissed', 'true');
    } else {
      localStorage.setItem('notification_prompt_dismissed', 'true');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0B1120] border-2 border-[#C5A059] w-full max-w-sm rounded-2xl p-6 shadow-2xl relative">
        
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-[#C5A059]/10 rounded-full border border-[#C5A059]/30 text-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.2)]">
            {promptType === 'install' ? <Download size={32} /> : <Bell size={32} />}
          </div>

          <h3 className="text-xl font-bold text-[#fdf6e3] font-serif">
            {promptType === 'install' ? 'Uygulamayı Yükle' : 'Sabah Virdi'}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            {promptType === 'install' 
              ? 'Daha hızlı erişim ve çevrimdışı kullanım için OnikiKapı\'yı ana ekranına ekle.' 
              : 'Her sabah günün hikmeti ve manevi görevini bildirim olarak almak ister misin?'}
          </p>

          <div className="flex gap-3 w-full mt-2">
            <button 
              onClick={handleDismiss}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-600 text-slate-300 font-bold text-sm hover:bg-white/5 transition-colors"
            >
              Daha Sonra
            </button>
            <button 
              onClick={handleAccept}
              className="flex-1 py-3 px-4 rounded-xl bg-[#C5A059] text-[#0B1120] font-bold text-sm hover:bg-[#b08d48] transition-colors shadow-lg active:scale-95 transform"
            >
              Evet, İsterim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
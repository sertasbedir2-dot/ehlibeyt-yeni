import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Moon, Sun, Info, ExternalLink, BookOpen, Sparkles, CheckCircle } from 'lucide-react';

export default function KitapOku() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('gece');
  
  // Hikmet Puanı (HP) Sistem State'leri
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hpClaimed, setHpClaimed] = useState(false);
  
  const { pdfPath, title } = location.state || { 
    pdfPath: "/dosyalar/kevserin_sirri.pdf", 
    title: "Seçili Eser" 
  };

  const themeStyles = {
    gece: {
      bg: "bg-[#0F2C45]",
      bar: "bg-[#162e45]",
      text: "text-[#C5A059]",
      filter: "mix-blend-multiply opacity-70 pointer-events-none absolute inset-0 bg-[#0F2C45]",
      progressColor: "bg-[#C5A059]"
    },
    gunduz: {
      bg: "bg-[#F4EFE0]",
      bar: "bg-[#C5A059]",
      text: "text-[#0F2C45]",
      filter: "mix-blend-multiply opacity-25 pointer-events-none absolute inset-0 bg-[#C5A059]",
      progressColor: "bg-[#0F2C45]"
    }
  };

  const current = themeStyles[theme];

  // Tefekkür (Odaklanma) Sayacı Hook'u
  useEffect(() => {
    if (hpClaimed || isCompleted) return;

    const totalTimeInSeconds = 30; // Test için 30 saniye. Canlıda artırılabilir.
    const interval = setInterval(() => {
      // Sadece kullanıcı bu sekmede ise (başka sekmeye geçmediyse) sayacı artır
      if (document.visibilityState === 'visible') {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsCompleted(true);
            return 100;
          }
          return prev + (100 / totalTimeInSeconds);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hpClaimed, isCompleted]);

  // HP Kazanma Fonksiyonu
  const handleClaimHP = () => {
    if (hpClaimed) return;
    const currentHP = parseInt(localStorage.getItem('hikmet_puani') || '0', 10);
    localStorage.setItem('hikmet_puani', (currentHP + 50).toString());
    
    // Navbar'ı anında haberdar et (Senkronizasyon)
    window.dispatchEvent(new Event('hp-updated'));
    setHpClaimed(true);
  };

  return (
    <div className={`flex flex-col h-[100vh] space-y-4 p-2 transition-colors duration-500 relative ${current.bg}`}>
      
      {/* Üst Tefekkür İlerleme Çubuğu */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-black/20 z-50">
        <div 
          className={`h-full transition-all duration-1000 ease-linear ${current.progressColor}`} 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Üst Panel */}
      <div className={`flex items-center justify-between p-4 mt-2 rounded-2xl border border-[#C5A059]/20 shadow-xl ${current.bar}`}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className={`p-2 rounded-full ${current.text}`}>
            <ArrowLeft size={24} />
          </button>
          <h1 className={`text-sm md:text-lg font-serif font-bold truncate max-w-[150px] md:max-w-none ${current.text}`}>
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
            <button onClick={() => setTheme('gece')} className={`p-1.5 rounded-lg ${theme === 'gece' ? 'bg-[#0F2C45] text-[#C5A059]' : 'text-gray-400'}`}><Moon size={16} /></button>
            <button onClick={() => setTheme('gunduz')} className={`p-1.5 rounded-lg ${theme === 'gunduz' ? 'bg-[#F4EFE0] text-[#0F2C45]' : 'text-gray-400'}`}><Sun size={16} /></button>
          </div>
        </div>
      </div>

      {/* Okuma Alanı */}
      <div className="flex-1 rounded-3xl border border-[#C5A059]/10 overflow-hidden shadow-2xl relative bg-white pb-20 md:pb-0">
        
        {/* BİLGİSAYAR GÖRÜNÜMÜ: Doğrudan PDF Gösterir */}
        <div className="hidden md:block w-full h-full relative">
            <object
                data={pdfPath}
                type="application/pdf"
                className="w-full h-full border-none"
            >
                <embed src={pdfPath} type="application/pdf" className="w-full h-full border-none" />
            </object>
            {/* Bilgisayarda filtre katmanı aktiftir */}
            <div className={current.filter}></div>
        </div>

        {/* MOBİL GÖRÜNÜM: Dışarı atılmayı engelleyen özel arayüz */}
        <div className="md:hidden flex flex-col items-center justify-center h-full p-8 text-center bg-[#162e45]">
          <div className="w-20 h-20 bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-6 relative">
             {/* Animasyonlu Halka */}
             <div className="absolute inset-0 rounded-full border-2 border-[#C5A059] border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
            <BookOpen size={40} className="text-[#C5A059]" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#C5A059] mb-4">Okumaya Hazır</h3>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed italic">
            Telefonunuzun yerleşik okuma modunda eseri görüntülemek için aşağıdaki butona dokunun.
          </p>
          
          <div className="flex flex-col w-full gap-4">
            <a 
              href={pdfPath} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setIsCompleted(true)} // Mobilde dışarı çıktığı an HP butonunu aktif et
              className="w-full bg-[#C5A059] text-[#0F2C45] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <ExternalLink size={20} /> Tam Ekran Oku
            </a>
            <a 
              href={pdfPath} 
              download 
              onClick={() => setIsCompleted(true)} // İndirdiğinde de HP butonunu aktif et
              className="w-full border border-[#C5A059]/50 text-[#C5A059] py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <Download size={18} /> Cihaza İndir
            </a>
          </div>
        </div>
      </div>

      {/* ÖDÜL BUTONU (Glassmorphism PWA Hissiyatı) */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-sm transition-all duration-700 z-50 ${isCompleted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        {!hpClaimed ? (
          <button 
            onClick={handleClaimHP}
            className="w-full bg-[#04151a]/90 backdrop-blur-xl border border-[#C5A059]/50 text-[#C5A059] p-4 rounded-2xl shadow-[0_0_20px_rgba(197,160,89,0.3)] flex items-center justify-between group active:scale-95 transition-transform"
          >
            <div className="flex flex-col items-start">
              <span className="font-bold text-lg">İlmi İçselleştir</span>
              <span className="text-xs opacity-70">Tefekkür süresi tamamlandı</span>
            </div>
            <div className="flex items-center gap-2 bg-[#C5A059]/20 px-3 py-1.5 rounded-lg group-hover:bg-[#C5A059]/30 transition-colors">
              <Sparkles size={18} className="animate-pulse" />
              <span className="font-bold">+50 HP</span>
            </div>
          </button>
        ) : (
          <div className="w-full bg-emerald-900/90 backdrop-blur-xl border border-emerald-500/50 text-emerald-400 p-4 rounded-2xl shadow-lg flex items-center justify-center gap-3">
            <CheckCircle size={24} />
            <span className="font-bold">Hikmet Puanı Eklendi</span>
          </div>
        )}
      </div>

    </div>
  );
}
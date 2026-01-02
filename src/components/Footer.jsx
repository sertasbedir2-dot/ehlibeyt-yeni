import React from 'react';
import { Link } from 'react-router-dom'; // YENİ: Sayfa yenilenmeden geçiş için

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Link Listesi: Yönetimi kolay olsun diye bir dizi (array) olarak tanımladık.
  const quickLinks = [
    { icon: "📚", label: "İlim ve Bilim", url: "/ilim" },
    { icon: "📿", label: "Tesbihat & Zikir", url: "/zikir" },
    { icon: "❤️", label: "Manevi Reçeteler", url: "/manevi-receteler" },
    { icon: "📖", label: "Kütüphane", url: "/library" },
    { icon: "🌟", label: "14 Masum", url: "/14-masum" },
    { icon: "📜", label: "Tarih ve Siyer", url: "/tarih" }, // Not: App.jsx'teki rotaya göre /tarih olarak güncelledim
    { icon: "⚖️", label: "Soru / Cevap", url: "/soru-cevap" },
    { icon: "🏆", label: "Yarışma (Quiz)", url: "/quiz" },
    { icon: "📩", label: "İletişim", url: "/iletisim" },
  ];

  // Paylaşım fonksiyonu
  const handleShare = async () => {
    const shareData = {
      title: 'OnikiKapı',
      text: 'İlim şehri OnikiKapı uygulamasını keşfetmeni tavsiye ederim:',
      url: 'https://onikikapi.vercel.app'
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Bağlantı kopyalandı!');
      }
    } catch (err) {
      console.log('Paylaşım iptal edildi:', err);
    }
  };

  return (
    <footer className="w-full bg-[#0B1120] border-t border-[#C5A059]/20 text-slate-300 pt-16 pb-8 mt-20 relative overflow-hidden font-serif">
      
      {/* Arka Plan Dekoru */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-60"></div>

      <div className="container mx-auto px-6">
        
        {/* --- 1. BÖLÜM: TAVSİYE KARTI --- */}
        <div className="bg-gradient-to-br from-slate-900 to-black border border-[#C5A059]/30 rounded-3xl p-8 mb-16 relative overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 bg-[#C5A059]/5 group-hover:bg-[#C5A059]/10 transition-colors duration-500"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#C5A059] mb-2 tracking-wide">
                Hayra Vesile Olmak İster misin?
              </h3>
              <p className="text-slate-300 text-lg">
                Sevdiklerini bu ilim yolculuğuna davet et.
              </p>
            </div>
            <button
              onClick={handleShare}
              className="bg-[#C5A059] hover:bg-[#b08d48] text-black font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 shadow-lg flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              <span>Uygulamayı Tavsiye Et</span>
            </button>
          </div>
        </div>

        {/* --- 2. BÖLÜM: LİNKLER VE SOSYAL MEDYA --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* KOLON 1: LOGO VE MİSYON */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#C5A059] flex items-center justify-center md:justify-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-[#C5A059] drop-shadow-md">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              Ehlibeyt Yolu
            </h3>
            <p className="text-base text-slate-400 leading-relaxed">
              İlim, hikmet ve irfan yolunda; Ehlibeyt'in nurlu izinden giderek hakikati arayanların dijital durağı.
            </p>
          </div>

          {/* KOLON 2: HIZLI ERİŞİM (GÜNCELLENDİ: GRID SİSTEMİ VE EMOJİLER) */}
          <div className="space-y-6 text-center">
            <h4 className="text-xl font-bold text-white border-b-2 border-[#C5A059] pb-2 inline-block">
              Hızlı Erişim
            </h4>
            
            {/* Link Listesi: 2 Kolonlu Grid Yapısı */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-left pl-4 sm:pl-0">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.url} 
                    className="group flex items-center gap-2 text-base text-slate-300 hover:text-[#E5C17C] transition-all duration-300"
                  >
                    <span className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="border-b border-transparent group-hover:border-[#E5C17C] pb-0.5">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLON 3: SOSYAL MEDYA */}
          <div className="space-y-6 text-center md:text-right">
            <h4 className="text-xl font-bold text-white border-b-2 border-[#C5A059] pb-2 inline-block">
              Bizi Takip Edin
            </h4>
            <p className="text-sm text-slate-400 mb-4">Sosyal medya hesaplarımızdan güncel içerikleri takip edebilirsiniz.</p>
            
            <div className="flex justify-center md:justify-end gap-5">
              
              {/* YOUTUBE */}
              <a href="http://www.youtube.com/@dunyaehlibeytplatformu" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-4 rounded-full transition-all duration-300 hover:bg-white hover:text-[#FF0000] hover:-translate-y-2 shadow-lg group">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>

              {/* INSTAGRAM */}
              <a href="https://www.instagram.com/dunya_ehlibeyt_platformu/?__pwa=1#" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-4 rounded-full transition-all duration-300 hover:bg-white hover:text-[#E1306C] hover:-translate-y-2 shadow-lg group">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* FACEBOOK */}
              <a href="https://www.facebook.com/share/1Bzqaux6JM/" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-4 rounded-full transition-all duration-300 hover:bg-white hover:text-[#1877F2] hover:-translate-y-2 shadow-lg group">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                 </svg>
              </a>

              {/* TIKTOK */}
              <a href="https://www.tiktok.com/@dnya.ehlibeyt.pla" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-4 rounded-full transition-all duration-300 hover:bg-white hover:text-[#FE2C55] hover:-translate-y-2 shadow-lg group">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>

            </div>
          </div>
        </div>

        {/* --- ALT TELİF ALANI --- */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">© {currentYear} Dar-ı Hakikat. Tüm hakları saklıdır.</p>
          <p className="mt-2 text-[#C5A059] text-sm opacity-80">
            Sevgi ve muhabbetle tasarlanmıştır.
          </p>
        </div>
      </div>
    </footer>
  );
}
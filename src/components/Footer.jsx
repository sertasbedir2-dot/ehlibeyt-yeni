import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Video } from 'lucide-react'; // Lucide ikonlarını import ettik (TikTok yerine Video ikonu kullandık, Lucide'de TikTok yoksa)

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Link Listesi
  const quickLinks = [
    { icon: "📚", label: "İlim ve Bilim", url: "/ilim" },
    { icon: "📿", label: "Tesbihat & Zikir", url: "/zikir" },
    { icon: "❤️", label: "Manevi Reçeteler", url: "/manevi-receteler" },
    { icon: "📖", label: "Kütüphane", url: "/library" },
    { icon: "🌟", label: "14 Masum", url: "/14-masum" },
    { icon: "📜", label: "Tarih ve Siyer", url: "/tarih" },
    { icon: "⚖️", label: "Soru / Cevap", url: "/soru-cevap" },
    { icon: "🏆", label: "Yarışma (Quiz)", url: "/quiz" },
    { icon: "📩", label: "İletişim", url: "/iletisim" },
  ];

  // GÜNCELLEME: Sosyal Medya Veri Yapısı (Devasa ve Renkli)
  const socialLinks = [
    { 
      name: "Youtube",
      icon: Youtube, // Lucide Component
      url: "http://www.youtube.com/@dunyaehlibeytplatformu",
      // Kırmızı Zemin, Beyaz İkon, Kırmızı Gölge
      style: "bg-[#FF0000] border-4 border-[#FF0000] text-white shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.8)] hover:bg-[#cc0000]"
    },
    { 
      name: "Instagram",
      icon: Instagram, 
      url: "https://www.instagram.com/dunya_ehlibeyt_platformu/?__pwa=1#",
      // Pembe Zemin, Beyaz İkon
      style: "bg-[#E1306C] border-4 border-[#E1306C] text-white shadow-[0_0_30px_rgba(225,48,108,0.4)] hover:shadow-[0_0_50px_rgba(225,48,108,0.8)] hover:bg-[#d62e65]"
    },
    { 
      name: "Facebook",
      icon: Facebook, 
      url: "https://www.facebook.com/share/1Bzqaux6JM/",
      // Mavi Zemin, Beyaz İkon
      style: "bg-[#1877F2] border-4 border-[#1877F2] text-white shadow-[0_0_30px_rgba(24,119,242,0.4)] hover:shadow-[0_0_50px_rgba(24,119,242,0.8)] hover:bg-[#166fe5]"
    },
    { 
      name: "TikTok",
      icon: Video, // Lucide'de TikTok yoksa Video ikonu kullandık (veya özel SVG eklenebilir)
      url: "https://www.tiktok.com/@dnya.ehlibeyt.pla",
      // Siyah/Kırmızı Zemin
      style: "bg-[#000000] border-4 border-[#FE2C55] text-white shadow-[0_0_30px_rgba(254,44,85,0.4)] hover:shadow-[0_0_50px_rgba(254,44,85,0.8)] hover:bg-[#1a1a1a]"
    }
  ];

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

          {/* KOLON 2: HIZLI ERİŞİM */}
          <div className="space-y-6 text-center">
            <h4 className="text-xl font-bold text-white border-b-2 border-[#C5A059] pb-2 inline-block">
              Hızlı Erişim
            </h4>
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

          {/* KOLON 3: SOSYAL MEDYA (DEVASA VE RENKLİ) */}
          <div className="space-y-6 text-center md:text-right">
            <h4 className="text-xl font-bold text-white border-b-2 border-[#C5A059] pb-2 inline-block">
              Bizi Takip Edin
            </h4>
            <p className="text-sm text-slate-400 mb-4">Sosyal medya hesaplarımızdan güncel içerikleri takip edebilirsiniz.</p>
            
            {/* Flex Wrap ile taşmayı önledik */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  // w-24 h-24 -> 96px (Devasa Kutu)
                  className={`
                    group flex items-center justify-center 
                    w-24 h-24 rounded-3xl 
                    transition-all duration-500 ease-out 
                    hover:scale-110 hover:-translate-y-2
                    ${social.style}
                  `}
                  aria-label={social.name}
                >
                  {/* w-12 h-12 -> 48px (Büyük İkon) */}
                  <social.icon 
                    className="w-12 h-12 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" 
                    strokeWidth={2.5}
                  />
                </a>
              ))}
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
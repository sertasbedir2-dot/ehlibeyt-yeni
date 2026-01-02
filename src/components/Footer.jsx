import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Paylaşım fonksiyonu (Aynen korundu)
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
        alert('Bağlantı kopyalandı! Arkadaşına yapıştırıp gönderebilirsin.');
      }
    } catch (err) {
      console.log('Paylaşım iptal edildi:', err);
    }
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 pt-12 pb-6 mt-16 relative overflow-hidden">
      
      {/* Hafif Üst Altın Işıltı Efekti */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent"></div>

      <div className="container mx-auto px-4">
        
        {/* ================================================================================== */}
        {/* YENİ EKLENEN: DİKKAT ÇEKİCİ "TAVSİYE ET" ALANI (EN ÜSTE ALINDI) */}
        {/* ================================================================================== */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-[#C5A059]/30 rounded-3xl p-8 mb-12 relative overflow-hidden shadow-[0_0_30px_rgba(197,160,89,0.1)] text-center md:text-left">
          
          {/* Arka plan dekorasyonu */}
          <div className="absolute -top-20 -right-20 text-[#C5A059]/5 pointer-events-none rotate-12">
             <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#C5A059] mb-3 font-serif tracking-wide">
                Bu İlim Hazinesini Paylaşarak Hayra Vesile Olun
              </h3>
              <p className="text-slate-300 text-base md:text-lg max-w-2xl">
                <span className="italic">"Hayra vesile olan, hayrı yapan gibidir."</span> — Hadis-i Şerif <br/>
                Sevdiklerinizi de bu manevi yolculuğa davet edin.
              </p>
            </div>
            
            {/* KOCAMAN YENİ BUTON */}
            <button
              onClick={handleShare}
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#C5A059] to-[#9c7c3f] hover:from-[#d4b36e] hover:to-[#a88748] text-slate-950 font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_5px_25px_rgba(197,160,89,0.4)] text-lg whitespace-nowrap"
            >
              <span className="absolute inset-0 rounded-full bg-white/20 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity"></span>
              {/* Paylaş İkonu SVG (Büyütüldü) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span className="relative z-10">Uygulamayı Tavsiye Et</span>
            </button>
          </div>
        </div>
        {/* ================================================================================== */}


        {/* Standart Linkler (Eski 3 Kolonlu Yapı - Biraz daha sönükleştirildi) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 opacity-75 hover:opacity-100 transition-opacity">
          
          {/* Kolon 1: Logo */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-bold text-[#C5A059] flex items-center justify-center md:justify-start gap-2">
              {/* Kalp İkonu (SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C5A059]">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              Ehlibeyt Yolu
            </h3>
            <p className="text-sm leading-relaxed">
              İlim, hikmet ve irfan yolunda; Ehlibeyt'in nurlu izinden giderek hakikati arayanların dijital durağı.
            </p>
          </div>

          {/* Kolon 2: Hızlı Linkler */}
          <div className="space-y-4 text-center">
            <h4 className="text-white font-semibold">Hızlı Erişim</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/ilim" className="hover:text-[#C5A059] transition-colors">İlim ve Bilim</a></li>
              <li><a href="/tarih" className="hover:text-[#C5A059] transition-colors">Tarih ve Siyer</a></li>
              <li><a href="/kutuphane" className="hover:text-[#C5A059] transition-colors">Kütüphane</a></li>
              <li><a href="/iletisim" className="hover:text-[#C5A059] transition-colors">İletişim</a></li>
            </ul>
          </div>

          {/* Kolon 3: Sosyal Medya (ESKİ BUTON BURADAN KALDIRILDI) */}
          <div className="space-y-4 text-center md:text-right">
            <h4 className="text-white font-semibold">Bizi Takip Edin</h4>
            <div className="flex justify-center md:justify-end gap-4">
              {/* Youtube İkonu */}
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-[#C5A059] hover:text-black transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
              {/* Instagram İkonu */}
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-[#C5A059] hover:text-black transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* Twitter (X) İkonu */}
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-[#C5A059] hover:text-black transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* Mail İkonu */}
              <a href="/iletisim" className="bg-slate-900 p-2 rounded-full hover:bg-[#C5A059] hover:text-black transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Alt Çizgi */}
        <div className="border-t border-slate-800 pt-6 text-center text-xs">
          <p>© {currentYear} Dar-ı Hakikat. Tüm hakları saklıdır.</p>
          <p className="mt-2 text-slate-600">
            Sevgi ve muhabbetle tasarlanmıştır.
          </p>
        </div>
      </div>
    </footer>
  );
}
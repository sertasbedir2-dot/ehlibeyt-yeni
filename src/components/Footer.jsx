import React from 'react';
import { Heart, Mail, Youtube, Instagram, Twitter, Share2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Paylaşım Fonksiyonu
  const handleShare = async () => {
    const shareData = {
      title: 'OnikiKapı',
      text: 'İlim şehri OnikiKapı uygulamasını keşfetmeni tavsiye ederim:',
      url: 'https://onikikapi.vercel.app'
    };

    try {
      if (navigator.share) {
        // Mobildeysen telefonun paylaşım menüsünü açar (WhatsApp vb.)
        await navigator.share(shareData);
      } else {
        // Masaüstündeysen veya desteklemiyorsa linki kopyalar
        await navigator.clipboard.writeText(shareData.url);
        alert('Bağlantı kopyalandı! Arkadaşına yapıştırıp gönderebilirsin.');
      }
    } catch (err) {
      console.log('Paylaşım iptal edildi veya hata oluştu:', err);
    }
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 pt-10 pb-6 mt-10">
      <div className="container mx-auto px-4">
        
        {/* Üst Kısım: 3 Kolon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Kolon 1: Logo ve Açıklama */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#C5A059] flex items-center gap-2">
              <Heart className="w-5 h-5 fill-current" />
              Ehlibeyt Yolu
            </h3>
            <p className="text-sm leading-relaxed">
              İlim, hikmet ve irfan yolunda; Ehlibeyt'in nurlu izinden giderek hakikati arayanların dijital durağı.
            </p>
          </div>

          {/* Kolon 2: Hızlı Linkler */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Hızlı Erişim</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/ilim" className="hover:text-[#C5A059] transition-colors">İlim ve Bilim</a></li>
              <li><a href="/tarih" className="hover:text-[#C5A059] transition-colors">Tarih ve Siyer</a></li>
              <li><a href="/kutuphane" className="hover:text-[#C5A059] transition-colors">Kütüphane</a></li>
              <li><a href="/iletisim" className="hover:text-[#C5A059] transition-colors">İletişim</a></li>
            </ul>
          </div>

          {/* Kolon 3: Sosyal Medya ve Paylaş Butonu */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Bizi Takip Edin</h4>
            
            {/* Sosyal İkonlar */}
            <div className="flex gap-4">
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-[#C5A059] hover:text-black transition-all">
                <Youtube size={20} />
              </a>
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-[#C5A059] hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-[#C5A059] hover:text-black transition-all">
                <Twitter size={20} />
              </a>
              <a href="/iletisim" className="bg-slate-900 p-2 rounded-full hover:bg-[#C5A059] hover:text-black transition-all">
                <Mail size={20} />
              </a>
            </div>

            {/* YENİ EKLENEN PAYLAŞ BUTONU */}
            <div className="pt-4">
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 bg-[#008080] hover:bg-[#006666] text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-[#008080]/20"
              >
                <Share2 size={18} />
                <span>Uygulamayı Tavsiye Et</span>
              </button>
            </div>

          </div>
        </div>

        {/* Alt Çizgi ve Telif */}
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
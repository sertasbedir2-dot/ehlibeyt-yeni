import React from 'react';
import { Heart, Mail, Youtube, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

          {/* Kolon 3: Sosyal Medya */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Bizi Takip Edin</h4>
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
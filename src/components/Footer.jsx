import React from 'react';
import { Link } from 'react-router-dom';
// İŞTE ÇÖKÜŞÜN SEBEBİ BUYDU. "Sparkles" EKLENDİ!
import { Facebook, Instagram, Youtube, BookOpen, MapPin, Mail, Phone, Globe, Sparkles } from 'lucide-react';

// Özel TikTok İkonu
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#04151a] border-t border-[#C5A059]/20 pt-16 pb-8 text-slate-300 font-serif relative z-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* Sol Bölüm: Marka ve Sosyal Medya */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-6 group">
             <div className="p-2 bg-[#09303a] rounded-lg text-[#C5A059] border border-[#C5A059]/30 group-hover:bg-[#C5A059] group-hover:text-[#09303a] transition-colors">
                <BookOpen size={24} />
             </div>
             <h2 className="text-2xl font-sans font-bold text-[#FDF6E3] tracking-wide">OnikiKapı</h2>
          </Link>
          <p className="text-sm leading-relaxed mb-8 opacity-80">
            Ehlibeyt mektebinin ilim ve hikmet pınarlarından süzülen hakikatleri, modern çağın idrakine sunan dijital bir külliye.
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="p-2.5 rounded-lg border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#09303a] hover:border-[#C5A059] transition-all transform hover:-translate-y-1">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2.5 rounded-lg border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#09303a] hover:border-[#C5A059] transition-all transform hover:-translate-y-1">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2.5 rounded-lg border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#09303a] hover:border-[#C5A059] transition-all transform hover:-translate-y-1">
              <TikTokIcon size={20} />
            </a>
            <a href="#" className="p-2.5 rounded-lg border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#09303a] hover:border-[#C5A059] transition-all transform hover:-translate-y-1">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Orta Bölüm: Keşfet (Hızlı Linkler) */}
        <div>
          <h3 className="text-lg font-bold text-[#FDF6E3] mb-6 flex items-center gap-2">
            <Sparkles size={18} className="text-[#C5A059]" /> KEŞFET
          </h3>
          <ul className="space-y-3">
            {[
              { name: 'Ana Sayfa', path: '/' },
              { name: 'Manevi Reçeteler', path: '/manevi-receteler' },
              { name: 'Kütüphane', path: '/library' },
              { name: 'Soru/Cevap', path: '/soru-cevap' },
              { name: '14 Masum', path: '/14-masum' },
              { name: 'Medya', path: '/medya' }
            ].map((link, idx) => (
              <li key={idx}>
                <Link to={link.path} className="hover:text-[#C5A059] transition-colors flex items-center gap-2 before:content-['•'] before:text-[#C5A059]">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sağ Bölüm: İletişim */}
        <div>
          <h3 className="text-lg font-bold text-[#FDF6E3] mb-6 flex items-center gap-2">
            <MapPin size={18} className="text-[#C5A059]" /> İLETİŞİM
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Mail className="text-[#C5A059]" size={18} />
              <a href="mailto:info@onikikapi.com" className="hover:text-[#FDF6E3] transition-colors">info@onikikapi.com</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-[#C5A059]" size={18} />
              <span>+90 555 000 00 00</span>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="text-[#C5A059]" size={18} />
              <span>İstanbul, Türkiye</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm opacity-60">
        <p>© {new Date().getFullYear()} OnikiKapı. Tüm hakları saklıdır.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/" className="hover:text-[#C5A059] transition-colors">Gizlilik Politikası</Link>
          <Link to="/" className="hover:text-[#C5A059] transition-colors">Kullanım Şartları</Link>
        </div>
      </div>
    </footer>
  );
}

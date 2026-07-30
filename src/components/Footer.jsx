import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, BookOpen, MapPin, Mail, Phone, Globe, Sparkles, Twitter, Send, MessageCircle, Users } from 'lucide-react';

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
    <footer className="bg-[#04151a] border-t border-[#C5A059]/20 pt-12 pb-8 text-slate-300 font-serif relative z-10 mt-10">
      
      {/* 1. KATMAN: MEGA FOOTER (AKSİYON VE DAVET MERKEZİ) */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Telegram İlim Halkası */}
          <a href="https://t.me/dunyaehlibeyt" target="_blank" rel="noopener noreferrer" className="group bg-[#09303a]/50 border border-[#C5A059]/20 rounded-2xl p-6 hover:-translate-y-2 hover:border-blue-500/50 hover:bg-[#09303a] transition-all duration-300 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Send size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#FDF6E3] mb-2 font-sans group-hover:text-blue-400 transition-colors">İlim Halkasına Katıl</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Telegram kanalımızda binlerce canla buluş, günlük hikmetlerden ve yeni içeriklerden anında haberdar ol.
            </p>
          </a>

          {/* İrfan Ağı İşbirliği Çağrısı */}
          <a href="https://wa.me/905553137021?text=Selam%C3%BCn%20Aleyk%C3%BCm.%20%C4%B0rfan%20A%C4%9F%C4%B1'na%20i%C3%A7erik%20%C3%BCreticisi%20olarak%20kat%C4%B1lmak%20istiyorum." target="_blank" rel="noopener noreferrer" className="group bg-[#09303a]/50 border border-[#C5A059]/30 rounded-2xl p-6 hover:-translate-y-2 hover:border-[#C5A059] hover:bg-[#09303a] transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.05)] hover:shadow-[0_0_30px_rgba(197,160,89,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full blur-3xl group-hover:bg-[#C5A059]/10 transition-colors"></div>
            <div className="w-12 h-12 bg-[#C5A059]/10 text-[#C5A059] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#FDF6E3] mb-2 font-sans group-hover:text-[#C5A059] transition-colors">İrfan Ağı'nda Yer Al</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Ehl-i Beyt yolunda üreten bir YouTube kanalınız, sayfanız veya kaleminiz mi var? İşbirliği için bize yazın, bu meclisi birlikte büyütelim.
            </p>
          </a>

          {/* WhatsApp Birebir İrşad / Soru Cevap */}
          <a href="https://wa.me/905553137021?text=Selam%C3%BCn%20Aleyk%C3%BCm.%20OnikiKap%C4%B1%20platformundan%20ula%C5%9F%C4%B1yorum." target="_blank" rel="noopener noreferrer" className="group bg-[#09303a]/50 border border-[#C5A059]/20 rounded-2xl p-6 hover:-translate-y-2 hover:border-emerald-500/50 hover:bg-[#09303a] transition-all duration-300 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#FDF6E3] mb-2 font-sans group-hover:text-emerald-400 transition-colors">Bize Ulaşın</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Aklınıza takılan sorular, manevi reçete talepleri veya teknik destek için doğrudan WhatsApp hattımızdan bize yazabilirsiniz.
            </p>
          </a>

        </div>
      </div>

      {/* 2. KATMAN: KLASİK VİTRİN VE SOSYAL MEDYA (AKTİF LİNKLER) */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* Sol Bölüm: Marka ve Sosyal Medya */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-6 group w-max">
             <div className="p-2 bg-[#09303a] rounded-lg text-[#C5A059] border border-[#C5A059]/30 group-hover:bg-[#C5A059] group-hover:text-[#09303a] transition-colors">
                <BookOpen size={24} />
             </div>
             <h2 className="text-2xl font-sans font-black text-[#FDF6E3] tracking-widest uppercase">OnikiKapı</h2>
          </Link>
          <p className="text-sm leading-relaxed mb-8 opacity-80">
            Ehlibeyt mektebinin ilim ve hikmet pınarlarından süzülen hakikatleri, modern çağın idrakine sunan dijital bir külliye.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <a href="https://x.com/SeFiNe12NoTlari/with_replies" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#09303a] hover:border-[#C5A059] transition-all transform hover:-translate-y-1" title="X (Twitter)">
              <Twitter size={20} />
            </a>
            <a href="https://www.instagram.com/dunyaehlibeytplatformu?igsh=NTYwM2Znamd0ZHQ=" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#09303a] hover:border-[#C5A059] transition-all transform hover:-translate-y-1" title="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/share/1EmkgtdVV2/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#09303a] hover:border-[#C5A059] transition-all transform hover:-translate-y-1" title="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://www.tiktok.com/@dnya.ehlibeyt.pla?_r=1&_t=ZS-98TKTSQmqYS" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#09303a] hover:border-[#C5A059] transition-all transform hover:-translate-y-1" title="TikTok">
              <TikTokIcon size={20} />
            </a>
            <a href="https://youtube.com/@dunyaehlibeytplatformu?si=G9OVoZw82IEghcat" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#09303a] hover:border-[#C5A059] transition-all transform hover:-translate-y-1" title="YouTube">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Orta Bölüm: Keşfet (Hızlı Linkler) */}
        <div>
          <h3 className="text-lg font-bold text-[#FDF6E3] mb-6 flex items-center gap-2 font-sans">
            <Sparkles size={18} className="text-[#C5A059]" /> KEŞFET
          </h3>
          <ul className="space-y-3 font-sans">
            {[
              { name: 'Ana Sayfa', path: '/' },
              { name: 'İlim Meydanı (Quiz)', path: '/quiz' },
              { name: 'Kütüphane', path: '/library' },
              { name: 'İrfan Ağı', path: '/irfan-agi' },
              { name: '14 Masum', path: '/14-masum' },
              { name: 'Manevi Reçeteler', path: '/manevi-receteler' }
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
          <h3 className="text-lg font-bold text-[#FDF6E3] mb-6 flex items-center gap-2 font-sans">
            <MapPin size={18} className="text-[#C5A059]" /> İLETİŞİM
          </h3>
          <ul className="space-y-4 font-sans">
            <li className="flex items-center gap-3">
              <Mail className="text-[#C5A059]" size={18} />
              <a href="mailto:info@onikikapi.com" className="hover:text-[#FDF6E3] transition-colors">info@onikikapi.com</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-[#C5A059]" size={18} />
              <a href="https://wa.me/905553137021" target="_blank" rel="noopener noreferrer" className="hover:text-[#FDF6E3] transition-colors">+90 555 313 70 21</a>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="text-[#C5A059]" size={18} />
              <span>İstanbul, Türkiye</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm opacity-60 font-sans">
        <p>© {new Date().getFullYear()} OnikiKapı. Tüm hakları saklıdır.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/" className="hover:text-[#C5A059] transition-colors">Gizlilik Politikası</Link>
          <Link to="/" className="hover:text-[#C5A059] transition-colors">Kullanım Şartları</Link>
        </div>
      </div>
    </footer>
  );
}
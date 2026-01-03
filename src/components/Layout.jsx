import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Sparkles, Search, Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import PrayerTimesWidget from './PrayerTimesWidget';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Manevi Reçeteler', href: '/manevi-receteler' },
    { name: 'Kütüphane', href: '/library' },
    { name: 'Soru/Cevap', href: '/soru-cevap' },
    { name: '14 Masum', href: '/14-masum' },
    { name: 'Zikirmatik', href: '/zikir' },
  ];

  // GÜNCELLEME: Canlı Renkler ve Stil Tanımları
  const socialLinks = [
    { 
      name: "Facebook",
      icon: Facebook, 
      href: "https://facebook.com", 
      // Marka Rengi: Mavi
      style: "text-blue-500 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500 hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]" 
    },
    { 
      name: "Twitter",
      icon: Twitter, 
      href: "https://twitter.com", 
      // Marka Rengi: Gökyüzü Mavisi
      style: "text-sky-400 border-sky-400/30 bg-sky-400/10 hover:bg-sky-400 hover:text-white hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]" 
    },
    { 
      name: "Instagram",
      icon: Instagram, 
      href: "https://instagram.com", 
      // Marka Rengi: Pembe/Mor
      style: "text-pink-500 border-pink-500/30 bg-pink-500/10 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]" 
    },
    { 
      name: "Youtube",
      icon: Youtube, 
      href: "https://youtube.com", 
      // Marka Rengi: Kırmızı
      style: "text-red-500 border-red-500/30 bg-red-500/10 hover:bg-red-500 hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]" 
    }
  ];

  return (
    <div className="min-h-screen bg-sand-light flex flex-col font-sans">
      {/* --- HEADER --- */}
      <header className="bg-turquoise-dark/95 backdrop-blur-md shadow-lg border-b border-gold/20 fixed w-full z-50 transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsMenuOpen(false)}>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-md group-hover:blur-lg transition-all"></div>
              <BookOpen size={32} className="text-gold relative z-10 drop-shadow-sm" />
            </div>
            <span className="text-2xl font-bold text-sand tracking-wider font-serif">OnikiKapı</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 relative group ${
                    isActive 
                      ? 'text-gold bg-white/10' 
                      : 'text-slate-300 hover:text-gold hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && <Sparkles size={14} className="animate-pulse" />}
                    {item.name}
                  </span>
                  {isActive && <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gold rounded-full shadow-[0_0_8px_rgba(255,215,0,0.5)]"></span>}
                </Link>
              );
            })}
             <button className="ml-4 p-2 text-slate-300 hover:text-gold bg-white/5 hover:bg-white/10 rounded-full transition-all" aria-label="Arama Yap">
               <Search size={20} />
             </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
             <button className="p-2 text-slate-300 hover:text-gold bg-white/5 hover:bg-white/10 rounded-full transition-all" aria-label="Arama Yap">
               <Search size={20} />
             </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-slate-300 hover:text-gold hover:bg-white/10 transition-colors focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Panel */}
        <div className={`md:hidden absolute w-full bg-turquoise-dark/95 backdrop-blur-md border-b border-gold/20 overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navigation.map((item) => {
               const isActive = location.pathname === item.href;
               return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    isActive 
                      ? 'text-gold bg-white/10 border-l-4 border-gold pl-3' 
                      : 'text-slate-300 hover:text-gold hover:bg-white/5'
                  }`}
                >
                   <span className="flex items-center gap-3">
                    {isActive && <Sparkles size={18} className="text-gold" />}
                    {item.name}
                  </span>
                </Link>
               );
            })}
             <div className="mt-4 px-2">
                 <PrayerTimesWidget />
             </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 z-10 relative">
        {children}
      </main>
      
      {/* --- FOOTER --- */}
      <footer className="bg-[#0F172A] text-slate-400 py-16 relative overflow-hidden border-t border-gold/10 animate-fade-in">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Marka Alanı */}
            <div className="col-span-1 md:col-span-2 space-y-6">
              <Link to="/" className="flex items-center space-x-3 group w-fit">
                  <div className="p-2 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors">
                    <BookOpen size={32} className="text-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]" />
                  </div>
                  <span className="text-3xl font-bold text-sand tracking-wider font-serif group-hover:text-gold transition-colors">OnikiKapı</span>
              </Link>
              <p className="text-slate-400 leading-relaxed pr-6 font-serif text-lg">
                Ehlibeyt mektebinin ilim ve hikmet pınarlarından süzülen hakikatleri, modern çağın idrakine sunan dijital bir külliye.
              </p>
              
              {/* --- YENİLENEN DEVASA & CANLI İKONLAR --- */}
              <div className="flex items-center gap-6 pt-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                        group relative flex items-center justify-center 
                        w-20 h-20 rounded-2xl border-2 
                        transition-all duration-300 ease-out 
                        hover:scale-110 hover:-translate-y-2
                        ${social.style}
                    `}
                    aria-label={social.name}
                  >
                    {/* Size prop'u kaldırıldı, yerine Tailwind classları verildi */}
                    <social.icon 
                        className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:rotate-6" 
                        strokeWidth={2.5} 
                    />
                  </a>
                ))}
              </div>

            </div>

            {/* Hızlı Linkler */}
            <div>
              <h4 className="text-sand font-bold text-lg mb-6 flex items-center gap-2 uppercase tracking-widest">
                <Sparkles size={16} className="text-gold" /> Keşfet
              </h4>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="hover:text-gold transition-colors flex items-center gap-2 text-base font-medium group">
                      <span className="w-1.5 h-1.5 bg-gold/50 rounded-full group-hover:bg-gold group-hover:scale-125 transition-all"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h4 className="text-sand font-bold text-lg mb-6 flex items-center gap-2 uppercase tracking-widest">
                 <MapPin size={16} className="text-gold" /> İletişim
              </h4>
              <ul className="space-y-4 text-base font-medium">
                <li className="flex items-start gap-3 group">
                    <Mail size={20} className="text-gold shrink-0 group-hover:scale-110 transition-transform" />
                    <a href="mailto:info@onikikapi.com" className="hover:text-gold transition-colors">info@onikikapi.com</a>
                </li>
                <li className="flex items-start gap-3 group">
                    <Phone size={20} className="text-gold shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="hover:text-gold transition-colors">+90 555 000 00 00</span>
                </li>
                <li className="flex items-start gap-3 group">
                    <Globe size={20} className="text-gold shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="hover:text-gold transition-colors">İstanbul, Türkiye</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Alt Çizgi */}
          <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-medium">
            <p>© {new Date().getFullYear()} OnikiKapı. Tüm hakları saklıdır. İlim ve hikmet yolunda hizmetinizde.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-gold transition-colors relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-px before:bg-gold before:transition-all hover:before:w-full">Gizlilik Politikası</Link>
              <Link to="/terms" className="hover:text-gold transition-colors relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-px before:bg-gold before:transition-all hover:before:w-full">Kullanım Şartları</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Sparkles, Search, Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Globe } from 'lucide-react';
import PrayerTimesWidget from './PrayerTimesWidget';
import InstallPrompt from './components/InstallPrompt'; 
import MusicPlayer from './MusicPlayer'; // Player Import Edildi

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

  const socialLinks = [
    { 
      name: "Facebook",
      icon: Facebook, 
      href: "https://facebook.com", 
      containerStyle: "!bg-[#1877F2] !border-[#1877F2] shadow-[0_0_30px_rgba(24,119,242,0.4)] hover:shadow-[0_0_50px_rgba(24,119,242,0.8)] hover:!bg-[#166fe5]",
      iconColor: "!text-white"
    },
    { 
      name: "Twitter",
      icon: Twitter, 
      href: "https://twitter.com", 
      containerStyle: "!bg-[#1DA1F2] !border-[#1DA1F2] shadow-[0_0_30px_rgba(29,161,242,0.4)] hover:shadow-[0_0_50px_rgba(29,161,242,0.8)] hover:!bg-[#1a91da]",
      iconColor: "!text-white"
    },
    { 
      name: "Instagram",
      icon: Instagram, 
      href: "https://instagram.com", 
      containerStyle: "!bg-[#E1306C] !border-[#E1306C] shadow-[0_0_30px_rgba(225,48,108,0.4)] hover:shadow-[0_0_50px_rgba(225,48,108,0.8)] hover:!bg-[#d62e65]",
      iconColor: "!text-white"
    },
    { 
      name: "Youtube",
      icon: Youtube, 
      href: "https://youtube.com", 
      containerStyle: "!bg-[#FF0000] !border-[#FF0000] shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.8)] hover:!bg-[#cc0000]",
      iconColor: "!text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-sand-light flex flex-col font-sans">
      
      {/* PWA Yükleme Butonu */}
      <InstallPrompt />

      {/* --- HEADER --- */}
      <header className="bg-turquoise-dark/95 backdrop-blur-md shadow-lg border-b border-gold/20 fixed w-full z-50 transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsMenuOpen(false)}>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-md group-hover:blur-lg transition-all"></div>
              <BookOpen size={32} className="text-gold relative z-10 drop-shadow-sm" />
            </div>
            <span className="text-2xl font-bold text-sand tracking-wider font-serif">OnikiKapı</span>
          </Link>

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

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 z-10 relative">
        {children}
      </main>
      
      {/* --- FOOTER --- */}
      <footer className="bg-[#0F172A] text-slate-400 py-16 relative overflow-hidden border-t border-gold/10 animate-fade-in">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Marka ve İkon Alanı */}
            <div className="col-span-1 md:col-span-2 space-y-8">
              <Link to="/" className="flex items-center space-x-3 group w-fit">
                  <div className="p-2 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors">
                    <BookOpen size={32} className="text-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]" />
                  </div>
                  <span className="text-3xl font-bold text-sand tracking-wider font-serif group-hover:text-gold transition-colors">OnikiKapı</span>
              </Link>
              <p className="text-slate-400 leading-relaxed pr-6 font-serif text-lg">
                Ehlibeyt mektebinin ilim ve hikmet pınarlarından süzülen hakikatleri, modern çağın idrakine sunan dijital bir külliye.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 pt-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                        group relative flex items-center justify-center 
                        !w-40 !h-40 rounded-3xl border-4 
                        transition-all duration-500 ease-out 
                        hover:scale-110 hover:-translate-y-2
                        ${social.containerStyle}
                    `}
                    aria-label={social.name}
                  >
                    <social.icon 
                        className={`!w-24 !h-24 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 ${social.iconColor}`}
                        strokeWidth={3.5} 
                    />
                  </a>
                ))}
              </div>

            </div>

            {/* Hızlı Linkler */}
            <div className="pt-4">
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
            <div className="pt-4">
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

          <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-medium">
            <p>© {new Date().getFullYear()} OnikiKapı. Tüm hakları saklıdır. İlim ve hikmet yolunda hizmetinizde.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-gold transition-colors relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-px before:bg-gold before:transition-all hover:before:w-full">Gizlilik Politikası</Link>
              <Link to="/terms" className="hover:text-gold transition-colors relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-px before:bg-gold before:transition-all hover:before:w-full">Kullanım Şartları</Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* GLOBAL MÜZİK ÇALAR - SABİT */}
      <MusicPlayer />
      
    </div>
  );
}
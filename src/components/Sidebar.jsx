import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, BookOpen, Sparkles, ChevronRight, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, navigation }) => {
  const location = useLocation();

  // Menü açıkken arka plandaki kaydırmayı (scroll) kilitle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Eğer navigasyon verisi gelmediyse hata vermesin diye boş dizi ata
  const navItems = navigation || [];

  return (
    <>
      {/* --- BACKDROP (KARARTMA PERDESİ) --- */}
      {/* Sadece açıkken görünür ve tıklayınca menüyü kapatır */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* --- SIDEBAR PANELİ --- */}
      <aside 
        className={`fixed top-0 left-0 h-full w-80 bg-turquoise-dark border-r border-gold/20 shadow-2xl z-[70] transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        
        {/* 1. BAŞLIK ALANI (HEADER) */}
        <div className="h-24 flex items-center justify-between px-6 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent">
          <Link to="/" onClick={onClose} className="flex items-center space-x-3 group">
            <div className="p-2 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-colors">
              <BookOpen size={24} className="text-gold" />
            </div>
            <span className="text-xl font-bold text-sand font-serif tracking-wide">OnikiKapı</span>
          </Link>
          
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all transform hover:rotate-90"
            aria-label="Menüyü Kapat"
          >
            <X size={24} />
          </button>
        </div>

        {/* 2. MENÜ LİNKLERİ (SCROLLABLE AREA) */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Menü</p>
          
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gold/10 text-gold border border-gold/20 shadow-[0_0_15px_rgba(197,160,89,0.1)]' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Aktifse yanıp sönen ikon, değilse sabit nokta */}
                  {isActive ? (
                    <Sparkles size={18} className="animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-gold transition-colors"></span>
                  )}
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                
                {isActive && <ChevronRight size={16} className="text-gold opacity-75" />}
              </Link>
            );
          })}
        </div>

        {/* 3. ALT BİLGİ (FOOTER) */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-turquoise-light/5 border border-white/5">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold to-amber-600 flex items-center justify-center text-xs font-bold text-white">
               OK
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-sand truncate">Misafir Kullanıcı</p>
               <p className="text-xs text-slate-400 truncate">Giriş yapılmadı</p>
             </div>
             <button className="text-slate-400 hover:text-gold transition-colors">
               <Settings size={18} />
             </button>
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium">
            <LogOut size={16} />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
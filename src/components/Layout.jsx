import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import SpecialDays from './SpecialDays';
import Footer from './Footer'; // <-- YENİ: Footer'ı içeri aldık

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-[#C5A059] selection:text-black">
      
      {/* Mobil Karartma (Overlay) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Yan Menü (Sidebar) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Ana İçerik Alanı */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        
        {/* Üst Bar (Header) */}
        <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg text-[#C5A059] transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-3">
            <h1 className="font-serif text-lg font-bold text-[#C5A059] hidden sm:block">
              Dar-ı Hakikat
            </h1>
          </div>

          {/* Dini Günler Sayacı (Masaüstü) */}
          <div className="hidden md:block">
            <SpecialDays />
          </div>
        </div>

        {/* Dini Günler (Mobil) */}
        <div className="md:hidden px-4 py-2 bg-slate-900/50 border-b border-slate-800">
          <SpecialDays />
        </div>

        {/* Sayfa İçerikleri */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden animate-fade-in">
          {children}
        </main>

        {/* 👇 YENİ: FOOTER BURAYA EKLENDİ */}
        <Footer />

      </div>

      {/* Müzik Çalar */}
      <MusicPlayer />
    </div>
  );
};

export default Layout;
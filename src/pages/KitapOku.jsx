import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Moon, Sun, Info, ExternalLink, BookOpen } from 'lucide-react';

export default function KitapOku() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('gece');
  
  const { pdfPath, title } = location.state || { 
    pdfPath: "/dosyalar/kevserin_sirri.pdf", 
    title: "Seçili Eser" 
  };

  const themeStyles = {
    gece: {
      bg: "bg-[#0F2C45]",
      bar: "bg-[#162e45]",
      text: "text-[#C5A059]",
      filter: "mix-blend-multiply opacity-70 pointer-events-none absolute inset-0 bg-[#0F2C45]"
    },
    gunduz: {
      bg: "bg-[#F4EFE0]",
      bar: "bg-[#C5A059]",
      text: "text-[#0F2C45]",
      filter: "mix-blend-multiply opacity-25 pointer-events-none absolute inset-0 bg-[#C5A059]"
    }
  };

  const current = themeStyles[theme];

  return (
    <div className={`flex flex-col h-[90vh] space-y-4 p-2 transition-colors duration-500 ${current.bg}`}>
      
      {/* Üst Panel */}
      <div className={`flex items-center justify-between p-4 rounded-2xl border border-[#C5A059]/20 shadow-xl ${current.bar}`}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className={`p-2 rounded-full ${current.text}`}>
            <ArrowLeft size={24} />
          </button>
          <h1 className={`text-sm md:text-lg font-serif font-bold truncate max-w-[150px] md:max-w-none ${current.text}`}>
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
            <button onClick={() => setTheme('gece')} className={`p-1.5 rounded-lg ${theme === 'gece' ? 'bg-[#0F2C45] text-[#C5A059]' : 'text-gray-400'}`}><Moon size={16} /></button>
            <button onClick={() => setTheme('gunduz')} className={`p-1.5 rounded-lg ${theme === 'gunduz' ? 'bg-[#F4EFE0] text-[#0F2C45]' : 'text-gray-400'}`}><Sun size={16} /></button>
          </div>
        </div>
      </div>

      {/* Okuma Alanı */}
      <div className="flex-1 rounded-3xl border border-[#C5A059]/10 overflow-hidden shadow-2xl relative bg-white">
        
        {/* BİLGİSAYAR GÖRÜNÜMÜ: Doğrudan PDF Gösterir */}
        <div className="hidden md:block w-full h-full relative">
            <object
                data={pdfPath}
                type="application/pdf"
                className="w-full h-full border-none"
            >
                <embed src={pdfPath} type="application/pdf" className="w-full h-full border-none" />
            </object>
            {/* Bilgisayarda filtre katmanı aktiftir */}
            <div className={current.filter}></div>
        </div>

        {/* MOBİL GÖRÜNÜM: Dışarı atılmayı engelleyen özel arayüz */}
        <div className="md:hidden flex flex-col items-center justify-center h-full p-8 text-center bg-[#162e45]">
          <div className="w-20 h-20 bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-6">
            <BookOpen size={40} className="text-[#C5A059]" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#C5A059] mb-4">Okumaya Hazır</h3>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed italic">
            Telefonunuzun yerleşik okuma modunda eseri görüntülemek için aşağıdaki butona dokunun.
          </p>
          
          <div className="flex flex-col w-full gap-4">
            <a 
              href={pdfPath} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full bg-[#C5A059] text-[#0F2C45] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95"
            >
              <ExternalLink size={20} /> Tam Ekran Oku
            </a>
            <a 
              href={pdfPath} 
              download 
              className="w-full border border-[#C5A059]/50 text-[#C5A059] py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <Download size={18} /> Cihaza İndir
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
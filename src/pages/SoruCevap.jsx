import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { HelpCircle, ExternalLink, Search, AlertCircle, ChevronDown, ChevronUp, BookOpen, CheckCircle, ShieldCheck, MessageCircle } from 'lucide-react';
import { sorularData } from '../data/sorularData'; // Yeni eklediğimiz veri dosyası

export default function SoruCevap() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  
  // Ödül sistemi için state (hangi sorular idrak edildi)
  const [awardedIds, setAwardedIds] = useState([]);

  // Sayfa yüklendiğinde daha önce idrak edilen soruları LocalStorage'dan çek
  useEffect(() => {
    try {
      const savedIds = JSON.parse(localStorage.getItem('idrak_edilenler') || '[]');
      setAwardedIds(savedIds);
    } catch (e) {
      console.error("Storage Error:", e);
    }
  }, []);

  // Dinamik Kategori Listesi Çıkarma
  const categories = useMemo(() => {
    const cats = sorularData.map(item => item.category);
    return ["Tümü", ...new Set(cats)];
  }, []);

  // Soruları Filtreleme
  const filteredFaqs = sorularData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Tümü" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // HP (Hikmet Puanı) Kazandırma Fonksiyonu
  const handleIdrak = (id, e) => {
    e.stopPropagation(); // Akordiyonun kapanmasını engelle
    
    if (awardedIds.includes(id)) return; // Zaten alınmışsa işlem yapma

    const newAwardedIds = [...awardedIds, id];
    setAwardedIds(newAwardedIds);
    
    try {
      localStorage.setItem('idrak_edilenler', JSON.stringify(newAwardedIds));
      
      // Ana HP puanını güncelle
      const currentHP = parseInt(localStorage.getItem('hikmet_puani') || '0', 10);
      localStorage.setItem('hikmet_puani', (currentHP + 10).toString());
      
      // Üst menüyü (Navbar) tetikle
      window.dispatchEvent(new Event('hp-updated'));
    } catch (err) {
      console.error("HP Update Error:", err);
    }
  };

  // Resmi Fetva Makamları Linkleri
  const authorities = [
    { name: "Ayetullah Uzma Sistani", url: "https://www.sistani.org/turkish/", color: "border-blue-500/30", hover: "hover:border-blue-500" },
    { name: "Ayetullah Uzma Hamaney", url: "https://www.leader.ir/tr", color: "border-[#C5A059]/30", hover: "hover:border-[#C5A059]" }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20 font-sans">
      <Helmet>
        <title>Soru & Cevap (Entelektüel Kalkan) | OnikiKapı</title>
        <meta name="description" content="Ehlibeyt inancı hakkında sık sorulan itikadi ve tarihi soruların cevapları." />
      </Helmet>

      {/* --- HERO BÖLÜMÜ --- */}
      <div className="text-center space-y-4 py-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-3xl -z-10"></div>
        <div className="mx-auto w-16 h-16 bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-4 border border-[#C5A059]/30">
          <HelpCircle className="text-[#C5A059]" size={32} />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FDF6E3] via-[#C5A059] to-[#FDF6E3] font-serif">
          Aklın Kapısı
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto font-serif text-lg leading-relaxed px-4">
          "İlim hazinedir, anahtarı ise sorudur." <br className="hidden md:block"/> 
          Aklınıza takılan itikadi ve tarihi düğümleri burada çözün.
        </p>
      </div>

      {/* --- YASAL/ŞERİ UYARI (DISCLAIMER) --- */}
      <div className="bg-[#09303a] border-l-4 border-red-500/70 p-6 rounded-r-2xl mx-auto max-w-4xl shadow-xl flex gap-4 items-start">
        <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={24} />
        <div className="space-y-2">
          <h3 className="text-red-200 font-bold text-lg">Önemli Hatırlatma (Burası Fetva Makamı Değildir)</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Burada yer alan bilgiler sadece genel kültür, tarih ve inanç esaslarına (Akaid) yöneliktir. Helal, haram, namaz, oruç gibi <strong>fıkhi (şeri) sorularınız</strong> ve özel durumlarınız için lütfen taklit ettiğiniz Merce-i Taklid'in ofislerine başvurunuz.
          </p>
        </div>
      </div>

      {/* --- MERCEİYET YÖNLENDİRME KARTLARI --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {authorities.map((auth, idx) => (
          <a 
            key={idx} 
            href={auth.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-4 bg-[#0b1b24] rounded-xl border ${auth.color} ${auth.hover} transition-all group shadow-lg`}
          >
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-slate-400 group-hover:text-white transition-colors" />
              <span className="font-bold text-[#FDF6E3]">{auth.name} Resmi Sitesi</span>
            </div>
            <ExternalLink size={16} className="text-slate-500 group-hover:text-[#C5A059] transition-colors" />
          </a>
        ))}
      </div>

      {/* --- FİLTRELEME VE ARAMA BÖLÜMÜ --- */}
      <div className="max-w-4xl mx-auto mt-12 space-y-6">
        
        {/* Arama Çubuğu */}
        <div className="relative sticky top-20 z-30 shadow-2xl">
           <input 
              type="text" 
              placeholder="Merak ettiğiniz konuyu arayın... (Örn: Gadir-i Hum, Kerbela)" 
              className="w-full bg-[#0b1b24]/90 backdrop-blur-xl border border-[#C5A059]/40 rounded-2xl py-4 px-14 text-[#FDF6E3] placeholder-slate-400 focus:outline-none focus:border-[#C5A059] transition-all shadow-lg text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
           />
           <Search className="absolute left-5 top-4 text-[#C5A059]" size={24} />
        </div>

        {/* Kategori Çipleri (PWA Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar hide-scrollbar">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full font-bold text-sm transition-all border ${
                activeCategory === cat 
                  ? 'bg-[#C5A059] text-[#04151a] border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.4)]' 
                  : 'bg-[#09303a]/50 text-slate-300 border-white/10 hover:border-[#C5A059]/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Soru Listesi (Akordiyon) */}
        <div className="space-y-4 pt-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isAwarded = awardedIds.includes(faq.id);
              const isOpen = openIndex === index;

              return (
                <div key={faq.id} className={`bg-[#0b1b24] border ${isOpen ? 'border-[#C5A059]/50' : 'border-white/10'} rounded-2xl overflow-hidden transition-all duration-300 shadow-lg`}>
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex flex-col gap-1 pr-4">
                      <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">{faq.category}</span>
                      <span className="font-bold text-lg md:text-xl text-[#FDF6E3] leading-snug group-hover:text-[#C5A059] transition-colors">{faq.question}</span>
                    </div>
                    <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-[#C5A059]/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                      {isOpen ? <ChevronUp className="text-[#C5A059]" /> : <ChevronDown className="text-slate-400" />}
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 md:p-6 pt-0 text-slate-300 leading-relaxed font-serif border-t border-white/5 animate-fade-in bg-black/20 text-[15px] md:text-lg">
                      <div className="mt-4 space-y-4">
                        <p>{faq.answer}</p>
                      </div>
                      
                      {/* --- GAMIFICATION KANCASI (İDRAK BUTONU) --- */}
                      <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                        <button
                          onClick={(e) => handleIdrak(faq.id, e)}
                          disabled={isAwarded}
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                            isAwarded 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                              : 'bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-[#04151a] shadow-lg hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] active:scale-95'
                          }`}
                        >
                          {isAwarded ? (
                            <>
                              <CheckCircle size={18} />
                              İdrak Edildi
                            </>
                          ) : (
                            <>
                              <ShieldCheck size={18} />
                              İkna Oldum / İdrak Ettim (+10 HP)
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-[#09303a]/50 rounded-2xl border border-white/10">
              <p className="text-slate-400 text-lg">Bu kategoride aradığınız kriterlere uygun soru bulunamadı.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- DARK SOCIAL VIRALITE (WHATSAPP/TELEGRAM CTA) --- */}
      <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-br from-[#09303a] to-[#04151a] border border-[#C5A059]/30 p-8 md:p-10 rounded-3xl text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#C5A059]/10 transition-colors"></div>
        <MessageCircle className="mx-auto text-[#C5A059] mb-4" size={48} />
        <h3 className="text-2xl font-bold text-[#FDF6E3] mb-3">Aradığınız Cevabı Bulamadınız mı?</h3>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          Eğer itikadi veya tarihi konularda daha derin bir sorunuz varsa, topluluğumuzla iletişime geçin. Doğru kaynağı bulmanıza yardımcı olalım.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/"905553137021 "_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2">
             WhatsApp'tan Sor
          </a>
          <a href="https://t.me/"dunyaehlibeyt"_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2">
             Telegram Grubumuza Katıl
          </a>
        </div>
      </div>

    </div>
  );
}
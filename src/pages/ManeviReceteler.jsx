import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronRight, X, Play, BookOpen, Clock, Activity, AlertCircle, CheckCircle2, Heart, Sparkles, Share2, Square, CheckSquare } from 'lucide-react';
import { categories, recipes, moods } from '../data/recetelerData';

export default function ManeviReceteler() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [checkedSteps, setCheckedSteps] = useState([false, false, false]);
  const [hpClaimed, setHpClaimed] = useState(false);

  useEffect(() => {
    if (selectedRecipe) {
      setCheckedSteps([false, false, false]);
      setHpClaimed(false);
    }
  }, [selectedRecipe]);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = activeCategory === 'all' || recipe.categoryId === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          recipe.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleMoodClick = (mood) => {
    setSelectedMood(mood.id);
    setActiveCategory(mood.targetCategory); 
    setSearchQuery(""); 
  };

  const toggleStep = (index) => {
    if (hpClaimed) return; 
    const newSteps = [...checkedSteps];
    newSteps[index] = !newSteps[index];
    setCheckedSteps(newSteps);
  };

  const handleClaimHP = () => {
    if (hpClaimed) return;
    const currentHP = parseInt(localStorage.getItem('hikmet_puani') || '0', 10);
    localStorage.setItem('hikmet_puani', (currentHP + 20).toString());
    window.dispatchEvent(new Event('hp-updated'));
    setHpClaimed(true);
  };

  // --- FACEBOOK VE SOSYAL MEDYA KESİN ÇÖZÜMÜ ---
  const handleShare = async () => {
    if (!selectedRecipe) return;

    const shareText = `
🌿 *${selectedRecipe.title}*
"${selectedRecipe.diagnosis}"

🤲 *Manevi İlaç:*
${selectedRecipe.cure.arabic}
(${selectedRecipe.cure.meaning})

💡 *Hikmeti:* ${selectedRecipe.wisdom}

📲 *OnikiKapı'dan Keşfet:*
https://www.onikikapi.com/manevi-receteler
    `.trim();

    // 1. Önce HER ZAMAN metni panoya (kopyala) alıyoruz. Facebook metni engellerse, kullanıcı yapıştırabilsin diye.
    try {
        await navigator.clipboard.writeText(shareText);
    } catch (e) {
        console.log("Pano erişimi reddedildi.");
    }

    // 2. Native Share'i Tetikliyoruz
    if (navigator.share) {
      try {
        // Facebook gibi platformlar "text"i silebilir, bu yüzden sadece URL verip, metni yapıştırmalarını hatırlatıyoruz.
        alert("Reçete metni hafızaya kopyalandı! Facebook veya başka bir platformda paylaşırken ekrana basılı tutup 'Yapıştır' diyerek metni ekleyebilirsiniz.");
        await navigator.share({
          title: `OnikiKapı: ${selectedRecipe.title}`,
          text: shareText, // WhatsApp/Telegram bunu alır
          url: 'https://www.onikikapi.com/manevi-receteler' // Facebook bunu alır
        });
      } catch (err) {
        console.log('Paylaşım iptal edildi');
      }
    } else {
      alert("Reçete başarıyla kopyalandı! Dilediğiniz uygulamada (Facebook, WhatsApp) 'Yapıştır' diyerek paylaşabilirsiniz.");
    }
  };

  const prescriptionSteps = [
    "Manevi arınma için abdest alıp kıbleye yöneldim.",
    "Reçetedeki ilahi kelamı (duayı) huşu ile okudum.",
    "Gözlerimi kapatıp, şifanın hikmetini tefekkür ettim."
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 animate-fade-in text-sand">
      <Helmet>
        <title>Dâru'ş-Şifa (Manevi Reçeteler) | OnikiKapı</title>
        <meta name="description" content="Ehl-i Beyt kaynaklı manevi reçeteler, dualar ve Tıbb-ı Rıza tavsiyeleri." />
      </Helmet>

      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex justify-center mb-4">
           <div className="p-4 bg-gold/10 rounded-full border border-gold/30 shadow-[0_0_15px_rgba(197,160,89,0.3)]">
             <Activity size={40} className="text-gold" />
           </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-sand font-serif mb-4 tracking-tight">Dâru'ş-Şifa</h1>
        <p className="text-slate-300 text-lg font-serif italic">
          "Biz Kur'an'dan, müminler için şifa ve rahmet olan şeyleri indiriyoruz." (İsra, 82)
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12 bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-sm">
        <p className="text-center text-turquoise-light font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-2">
          <Sparkles size={16} /> Bugün Kendini Nasıl Hissediyorsun?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${
                selectedMood === mood.id 
                  ? 'bg-gold text-midnight border-gold shadow-[0_0_20px_rgba(197,160,89,0.5)] font-bold' 
                  : 'bg-midnight/50 border-white/10 text-slate-300 hover:bg-white/10 hover:border-gold/50'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-sm">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-8 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-3 min-w-max justify-center sm:justify-center">
          <button
            onClick={() => { setActiveCategory('all'); setSelectedMood(null); }}
            className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${
              activeCategory === 'all' ? 'bg-turquoise-light text-midnight' : 'bg-midnight border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            TÜMÜ
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm transition-all ${
                activeCategory === cat.id ? 'bg-gold text-midnight' : 'bg-midnight border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <cat.icon size={16} />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto mb-10 relative group">
        <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Search className="absolute left-4 top-3.5 text-slate-400 group-hover:text-gold transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Hastalık, dert veya dua ara..." 
          className="w-full bg-midnight/80 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sand placeholder-slate-500 focus:outline-none focus:border-gold/50 transition-all relative z-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-gradient-to-b from-[#162e45] to-[#0F172A] border border-white/5 hover:border-gold/40 rounded-2xl p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <recipe.icon size={100} className="text-white" />
              </div>
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-gold/20 to-transparent rounded-xl text-gold border border-gold/10 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <recipe.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sand group-hover:text-gold transition-colors font-sans">{recipe.title}</h3>
                  <span className="text-[10px] text-turquoise-light font-bold uppercase tracking-wider bg-turquoise/10 px-2 py-0.5 rounded mt-1 inline-block">
                    {categories.find(c => c.id === recipe.categoryId)?.name}
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed border-l-2 border-white/10 pl-3 italic">
                "{recipe.diagnosis}"
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs text-slate-500 font-serif">Ehlibeyt Kaynaklı</span>
                <div className="flex items-center text-gold text-sm font-bold group/btn">
                  Reçeteyi Aç <ChevronRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-lg">Aradığınız kriterlere uygun şifa reçetesi bulunamadı.</p>
          </div>
        )}
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-[#fdf6e3] w-full max-w-2xl rounded-2xl shadow-2xl relative my-8 font-serif border-4 border-[#C5A059] overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-[#C5A059] p-6 flex justify-between items-start text-[#0B1120] relative overflow-hidden shrink-0">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold font-sans flex items-center gap-3">
                  <selectedRecipe.icon size={32} />
                  {selectedRecipe.title}
                </h2>
                <p className="text-sm font-bold opacity-80 mt-1 uppercase tracking-widest pl-1">Şifa Reçetesi</p>
              </div>
              <button onClick={() => setSelectedRecipe(null)} className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-colors z-10 text-[#0B1120]">
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#fdf6e3]">
              
              <div className="flex gap-4 items-start bg-red-50/50 p-4 rounded-xl border border-red-100">
                <div className="mt-1 bg-red-100 p-2 rounded-lg text-red-600"><AlertCircle size={24} /></div>
                <div>
                  <h4 className="font-bold text-red-700 uppercase text-sm tracking-wide mb-1">Manevi Teşhis</h4>
                  <p className="text-lg text-gray-800 italic leading-relaxed font-medium">
                    {selectedRecipe.diagnosis}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#C5A059]/30 p-6 rounded-xl shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]"></div>
                <h4 className="font-bold text-[#0B1120] uppercase text-sm tracking-wide mb-6 flex items-center justify-center gap-2">
                  <BookOpen size={18} /> Manevi İlaç (Dua)
                </h4>
                
                <p className="text-3xl md:text-4xl text-black mb-8 font-serif leading-loose px-2 select-text text-center" dir="rtl" style={{fontFamily: 'Amiri, serif'}}>
                  {selectedRecipe.cure.arabic}
                </p>
                
                <div className="text-left space-y-5 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Okunuş:</span>
                    <p className="text-gray-900 italic text-lg leading-relaxed font-medium">{selectedRecipe.cure.transliteration}</p>
                  </div>
                  <div className="border-t border-slate-300 pt-4">
                    <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Anlamı:</span>
                    <p className="text-black font-semibold text-lg leading-relaxed">{selectedRecipe.cure.meaning}</p>
                  </div>
                </div>
                
                <p className="text-xs font-bold text-[#C5A059] uppercase mt-4 pt-2 inline-block border-t border-[#C5A059]/20 px-4">
                  Kaynak: {selectedRecipe.cure.source}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-700 text-xs uppercase mb-2 flex items-center gap-2"><Sparkles size={16} /> Hikmeti</h4>
                  <p className="text-gray-800 text-base leading-relaxed font-medium">{selectedRecipe.wisdom}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <h4 className="font-bold text-orange-700 text-xs uppercase mb-2 flex items-center gap-2"><Clock size={16} /> Uygulama</h4>
                  <p className="text-gray-800 text-base leading-relaxed font-medium">{selectedRecipe.instruction}</p>
                </div>
              </div>

              {selectedRecipe.tibb_riza && (
                <div className="bg-green-50 p-5 rounded-xl border border-green-200 flex gap-4 items-start">
                  <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0"><CheckCircle2 size={24} /></div>
                  <div>
                    <h4 className="font-bold text-green-800 text-base mb-1">Tıbb-ı Rıza Tavsiyesi</h4>
                    <p className="text-green-900 text-base leading-relaxed font-medium">
                      {selectedRecipe.tibb_riza}
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-white border border-[#C5A059]/40 p-6 rounded-xl shadow-sm mt-4">
                 <h4 className="font-bold text-[#0B1120] uppercase text-sm tracking-wide mb-4 flex items-center gap-2">
                   <Activity size={18} className="text-[#C5A059]"/> Şifa Adımları (Dijital Riyazet)
                 </h4>
                 
                 <div className="space-y-3 mb-6">
                   {prescriptionSteps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleStep(idx)}
                        disabled={hpClaimed}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                          checkedSteps[idx] 
                            ? 'bg-emerald-50 border-emerald-200' 
                            : 'bg-slate-50 border-slate-200 hover:border-[#C5A059]/50 hover:bg-orange-50/50'
                        }`}
                      >
                        <div className={`${checkedSteps[idx] ? 'text-emerald-500' : 'text-slate-400'}`}>
                          {checkedSteps[idx] ? <CheckSquare size={20} /> : <Square size={20} />}
                        </div>
                        <span className={`text-sm md:text-base font-medium transition-all ${
                          checkedSteps[idx] ? 'text-slate-500 line-through opacity-70' : 'text-slate-700'
                        }`}>
                          {step}
                        </span>
                      </button>
                   ))}
                 </div>

                 {!hpClaimed ? (
                    <button
                      onClick={handleClaimHP}
                      disabled={!checkedSteps.every(Boolean)}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                        checkedSteps.every(Boolean) 
                          ? 'bg-[#C5A059] text-white shadow-[0_0_20px_rgba(197,160,89,0.4)] hover:scale-[1.02] active:scale-95 cursor-pointer' 
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Sparkles size={20} className={checkedSteps.every(Boolean) ? 'animate-pulse' : ''} />
                      {checkedSteps.every(Boolean) ? 'Şifayı İçselleştir (+20 HP)' : 'Ödül İçin Adımları Tamamla'}
                    </button>
                 ) : (
                    <div className="w-full bg-emerald-100 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center justify-center gap-2 shadow-inner">
                       <CheckCircle2 size={20} />
                       <span className="font-bold">Şifa Kaydedildi, İlim Yolculuğuna +20 HP Eklendi!</span>
                    </div>
                 )}
              </div>

              <button 
                onClick={handleShare}
                className="w-full bg-[#0B1120] text-[#C5A059] font-sans font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 border border-[#C5A059]/30"
              >
                <Share2 size={24} />
                Facebook / Whatsapp'ta Paylaş
              </button>

            </div>

            <div className="bg-[#f0eadd] p-4 text-center text-xs text-gray-600 border-t border-[#dcd6c9] shrink-0 font-medium">
              Şifa Allah'tandır. Bu reçeteler Ehl-i Beyt kaynaklarından derlenmiştir.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
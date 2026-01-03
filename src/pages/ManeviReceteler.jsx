import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronRight, X, Play, BookOpen, Clock, Activity, AlertCircle, CheckCircle2, Heart, Sparkles } from 'lucide-react';
// YENİ: Verileri oluşturduğumuz dosyadan çekiyoruz
import { categories, recipes, moods } from '../data/recetelerData';

export default function ManeviReceteler() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- FİLTRELEME MANTIĞI ---
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

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <Helmet>
        <title>Dâru'ş-Şifa (Manevi Reçeteler) | OnikiKapı</title>
        <meta name="description" content="Ehl-i Beyt kaynaklı manevi reçeteler, dualar ve Tıbb-ı Rıza tavsiyeleri." />
      </Helmet>

      {/* --- HERO HEADER --- */}
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

      {/* --- MOOD SELECTOR --- */}
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

      {/* --- KATEGORİLER --- */}
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

      {/* --- ARAMA --- */}
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

      {/* --- KARTLAR (GRID) --- */}
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
            <div className="inline-block p-4 bg-white/5 rounded-full mb-4"><Search size={32} className="text-slate-500" /></div>
            <p className="text-slate-400 text-lg">Aradığınız kriterlere uygun şifa reçetesi bulunamadı.</p>
          </div>
        )}
      </div>

      {/* --- DETAY MODALI --- */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-[#fdf6e3] text-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl relative my-8 font-serif border-4 border-[#C5A059] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="bg-[#C5A059] p-6 flex justify-between items-start text-[#0B1120] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold font-sans flex items-center gap-3">
                  <selectedRecipe.icon size={32} />
                  {selectedRecipe.title}
                </h2>
                <p className="text-sm font-bold opacity-80 mt-1 uppercase tracking-widest pl-1">Şifa Reçetesi</p>
              </div>
              <button onClick={() => setSelectedRecipe(null)} className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-colors z-10">
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              {/* 1. TANI */}
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-red-100 p-2 rounded-lg"><AlertCircle className="text-red-600" size={20} /></div>
                <div>
                  <h4 className="font-bold text-red-600 uppercase text-sm tracking-wide mb-1">Manevi Teşhis</h4>
                  <p className="text-lg text-slate-700 italic leading-relaxed">
                    {selectedRecipe.diagnosis}
                  </p>
                </div>
              </div>

              <hr className="border-slate-300/50" />

              {/* 2. İLAÇ (ARAPÇA & ANLAM) */}
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]"></div>
                <h4 className="font-bold text-[#0B1120] uppercase text-sm tracking-wide mb-4 flex items-center justify-center gap-2">
                  <BookOpen size={16} /> Manevi İlaç (Dua)
                </h4>
                
                <p className="text-3xl text-slate-800 mb-6 font-serif leading-loose px-4" dir="rtl" style={{fontFamily: 'Amiri, serif'}}>
                  {selectedRecipe.cure.arabic}
                </p>
                
                <div className="text-left space-y-3 bg-slate-50 p-4 rounded-lg">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Okunuş:</span>
                    <p className="text-slate-600 italic text-sm">{selectedRecipe.cure.transliteration}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Anlamı:</span>
                    <p className="text-slate-800 font-medium">{selectedRecipe.cure.meaning}</p>
                  </div>
                </div>
                
                <p className="text-xs font-bold text-[#C5A059] uppercase mt-4 border-t border-slate-100 pt-2">
                  Kaynak: {selectedRecipe.cure.source}
                </p>
              </div>

              {/* 3. HİKMET & TALİMAT (YAN YANA) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-600 text-xs uppercase mb-2 flex items-center gap-2"><Sparkles size={14} /> Hikmeti</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedRecipe.wisdom}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <h4 className="font-bold text-orange-600 text-xs uppercase mb-2 flex items-center gap-2"><Clock size={14} /> Uygulama</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedRecipe.instruction}</p>
                </div>
              </div>

              {/* 4. TIBB-I RIZA */}
              {selectedRecipe.tibb_riza && (
                <div className="mt-2 bg-green-50 p-5 rounded-xl border border-green-200 flex gap-4 items-start">
                  <div className="bg-green-100 p-2 rounded-full"><CheckCircle2 size={24} className="text-green-600" /></div>
                  <div>
                    <h4 className="font-bold text-green-800 text-base mb-1">Tıbb-ı Rıza Tavsiyesi</h4>
                    <p className="text-green-700 text-sm leading-relaxed">
                      {selectedRecipe.tibb_riza}
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="bg-slate-100 p-4 text-center text-xs text-slate-500 border-t border-slate-200">
              Şifa Allah'tandır. Bu reçeteler Ehlibeyt kaynaklarından derlenmiştir.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
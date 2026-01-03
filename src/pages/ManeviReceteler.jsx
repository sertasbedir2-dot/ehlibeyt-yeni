import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronRight, X, Play, BookOpen, Clock, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
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
    
    // Eğer mood seçiliyse, sadece o mood'un hedef kategorisindeki veya ilgili reçeteleri göster
    // (Basitlik için şimdilik mood seçilince o kategoriye otomatik geçiriyoruz, aşağıda handleMoodClick'e bakın)
    return matchesCategory && matchesSearch;
  });

  const handleMoodClick = (mood) => {
    setSelectedMood(mood.id);
    setActiveCategory(mood.targetCategory); // Mood'a uygun kategoriye git
    setSearchQuery(""); // Aramayı temizle
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <Helmet>
        <title>Manevi Reçeteler (Dâru'ş-Şifa) | OnikiKapı</title>
        <meta name="description" content="Ehl-i Beyt kaynaklı manevi reçeteler, dualar ve Tıbb-ı Rıza tavsiyeleri." />
      </Helmet>

      {/* --- HEADER --- */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex justify-center mb-4">
           <div className="p-3 bg-gold/10 rounded-full border border-gold/30">
             <Activity size={32} className="text-gold" />
           </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-sand font-serif mb-4">Dâru'ş-Şifa</h1>
        <p className="text-slate-300 text-lg">
          "Biz Kur'an'dan, müminler için şifa ve rahmet olan şeyleri indiriyoruz." (İsra, 82)
        </p>
      </div>

      {/* --- MOOD SELECTOR (RUH HALİM) --- */}
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-center text-turquoise-light font-bold uppercase tracking-widest text-sm mb-4">Bugün nasılsın?</p>
        <div className="flex flex-wrap justify-center gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 ${
                selectedMood === mood.id 
                  ? 'bg-gold text-midnight border-gold scale-105 shadow-[0_0_15px_rgba(197,160,89,0.4)]' 
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-gold/50'
              }`}
            >
              <span className="text-xl">{mood.emoji}</span>
              <span className="font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- KATEGORİ SEKMELERİ --- */}
      <div className="max-w-6xl mx-auto mb-8 overflow-x-auto pb-2 custom-scrollbar">
        <div className="flex gap-4 min-w-max justify-center sm:justify-center">
          <button
            onClick={() => { setActiveCategory('all'); setSelectedMood(null); }}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              activeCategory === 'all' ? 'bg-turquoise-light text-midnight' : 'bg-midnight border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Tümü
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${
                activeCategory === cat.id ? 'bg-gold text-midnight' : 'bg-midnight border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <cat.icon size={18} />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* --- ARAMA KUTUSU --- */}
      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
        <input 
          type="text" 
          placeholder="Hastalık, dert veya dua ara..." 
          className="w-full bg-black/20 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sand placeholder-slate-500 focus:outline-none focus:border-gold/50 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* --- REÇETE KARTLARI (GRID) --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-white/5 hover:border-gold/30 rounded-2xl p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <recipe.icon size={80} />
              </div>
              
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gold/10 rounded-xl text-gold group-hover:scale-110 transition-transform duration-300">
                  <recipe.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sand group-hover:text-gold transition-colors">{recipe.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">
                    {categories.find(c => c.id === recipe.categoryId)?.name}
                  </p>
                </div>
              </div>
              
              <p className="text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed border-l-2 border-white/10 pl-3 italic">
                "{recipe.diagnosis}"
              </p>

              <div className="flex items-center text-turquoise-light text-sm font-bold mt-auto group/btn">
                Reçeteyi Görüntüle 
                <ChevronRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-500">
            Aradığınız kriterlere uygun şifa reçetesi bulunamadı.
          </div>
        )}
      </div>

      {/* --- DETAY MODALI (REÇETE KAĞIDI) --- */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#fdf6e3] text-slate-800 w-full max-w-2xl rounded-xl shadow-2xl relative my-8 font-serif border-4 border-[#C5A059] overflow-hidden">
            
            {/* Modal Header (Reçete Başlığı) */}
            <div className="bg-[#C5A059] p-6 flex justify-between items-start text-[#0B1120]">
              <div>
                <h2 className="text-3xl font-bold font-sans flex items-center gap-3">
                  <selectedRecipe.icon size={28} />
                  {selectedRecipe.title}
                </h2>
                <p className="text-sm font-bold opacity-80 mt-1 uppercase tracking-widest">Manevi Reçete No: {selectedRecipe.id}</p>
              </div>
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              
              {/* 1. TANI */}
              <div className="flex gap-4">
                <div className="mt-1"><AlertCircle className="text-red-600" /></div>
                <div>
                  <h4 className="font-bold text-red-600 uppercase text-sm tracking-wide mb-1">Teşhis (Tanı)</h4>
                  <p className="text-lg text-slate-700 italic border-l-4 border-red-200 pl-4">
                    {selectedRecipe.diagnosis}
                  </p>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* 2. İLAÇ (DUA) */}
              <div className="flex gap-4">
                <div className="mt-1"><BookOpen className="text-[#0B1120]" /></div>
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-[#0B1120] uppercase text-sm tracking-wide">Manevi İlaç</h4>
                    <button className="flex items-center gap-1 text-xs bg-slate-200 px-3 py-1 rounded-full hover:bg-slate-300 transition">
                      <Play size={12} fill="currentColor" /> Dinle
                    </button>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm text-center">
                    <p className="text-2xl font-bold text-slate-800 mb-4 font-serif leading-relaxed" dir="rtl" lang="ar">
                      {selectedRecipe.cure.arabic}
                    </p>
                    <p className="text-slate-600 mb-2 italic">
                      "{selectedRecipe.cure.turkish}"
                    </p>
                    <p className="text-xs font-bold text-[#C5A059] uppercase">
                      — {selectedRecipe.cure.source}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. HİKMET (ETKEN MADDE) */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3">
                <Sparkles className="text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-600 text-xs uppercase mb-1">Hikmet (Etken Madde)</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedRecipe.wisdom}
                  </p>
                </div>
              </div>

              {/* 4. KULLANIM TALİMATI */}
              <div className="flex gap-4">
                <div className="mt-1"><Clock className="text-[#C5A059]" /></div>
                <div>
                  <h4 className="font-bold text-[#C5A059] uppercase text-sm tracking-wide mb-1">Kullanım Talimatı</h4>
                  <p className="text-slate-700">
                    {selectedRecipe.instruction}
                  </p>
                </div>
              </div>

              {/* 5. TIBB-I RIZA (FİZİKSEL DESTEK) */}
              {selectedRecipe.tibb_riza && (
                <div className="mt-4 bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={20} className="text-green-600" />
                    <h4 className="font-bold text-green-700">Tıbb-ı Rıza Tavsiyesi (Fiziksel Destek)</h4>
                  </div>
                  <p className="text-green-800 text-sm pl-7">
                    {selectedRecipe.tibb_riza}
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-4 text-center text-xs text-slate-500 border-t border-slate-200">
              Şifa Allah'tandır. Bu reçeteler Ehl-i Beyt kaynaklarından derlenmiştir.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
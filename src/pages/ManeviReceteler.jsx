import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, X, Play, Clock, Repeat, Sparkles, BookOpen, Volume2, Globe } from 'lucide-react';

// --- VERİ HAVUZU (GENİŞLETİLMİŞ) ---
const recipes = [
  {
    id: 1,
    title: "Rızık ve Bereket Duası",
    category: "Rızık",
    shortDesc: "Maddi sıkıntılardan kurtulmak ve bereket için.",
    // TEOLOJİK METADATA
    vakit: "Sabah namazından sonra",
    adet: "7 defa",
    fazilet: "Rızkın artması ve geçim sıkıntısının kalkması için tecrübe edilmiştir.",
    // İÇERİK
    arabic: "اللَّهُمَّ ارْزُقْنِي رِزْقًا وَاسِعًا حَلالاً طَيِّبًا مِنْ غَيْرِ كَدٍّ، وَاسْتَجِبْ دَعْوَتِي مِنْ غَيْرِ رَدٍّ",
    transliteration: "Allahummerzuknî rızkan vâsian helâlen tayyiben min ğayri keddin, vestecib dâvetî min ğayri raddin.",
    translation: "Allah'ım! Bana yorulmadan bol, helal ve temiz rızık ver. Duamı reddetmeden kabul eyle.",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Örnek ses dosyası
  },
  {
    id: 2,
    title: "Şifa Ayetleri",
    category: "Şifa",
    shortDesc: "Her türlü maddi ve manevi hastalık için.",
    vakit: "Hastalık anında veya şifa niyetine her gün",
    adet: "1 defa okunur ve suya üflenir",
    fazilet: "Manevi ve bedeni hastalıklara şifa olduğu bildirilmiştir.",
    arabic: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاء وَرَحْمَةٌ لِّلْمُؤْمِنِينَ",
    transliteration: "Ve nünezzilü minel kur'âni mâ hüve şifâun ve rahmetun lil mü'minîn.",
    translation: "Biz Kur'an'dan, müminler için şifa ve rahmet olan şeyleri indiriyoruz. (İsra, 82)",
    audio: ""
  },
  {
    id: 3,
    title: "Sıkıntı ve Keder Duası (Yunus a.s)",
    category: "Huzur",
    shortDesc: "Darda kalanların feraha çıkması için.",
    vakit: "Sıkıntılı anlarda",
    adet: "40 defa",
    fazilet: "Bu dua ile dua edenin sıkıntısının giderileceği müjdelenmiştir.",
    arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    transliteration: "Lâ ilâhe illâ ente subhâneke innî kuntu minez-zâlimîn.",
    translation: "Senden başka ilah yoktur. Seni tenzih ederim. Şüphesiz ben zalimlerden oldum. (Enbiya, 87)",
    audio: ""
  },
  {
    id: 4,
    title: "Nadi Ali Duası",
    category: "Hacet",
    shortDesc: "Zor işlerin kolaylaşması ve yardım için.",
    vakit: "Müşkül anlarda",
    adet: "7 veya 14 defa",
    fazilet: "Hz. Ali'nin (a.s) vesilesiyle Allah'tan yardım istemek için.",
    arabic: "نَادِ عَلِيّاً مَظْهَرَ الْعَجَائِبِ تَجِدْهُ عَوْناً لَكَ فِي النَّوَائِبِ",
    transliteration: "Nâdi Aliyyen mazharal acâib, tecidhü avnen leke fin-nevâib.",
    translation: "İnsanüstü hallerin mazharı olan Ali'yi çağır. Onu, sıkıntılı anlarında kendine yardımcı bulursun.",
    audio: ""
  }
];

export default function ManeviReceteler() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Helmet>
        <title>Manevi Reçeteler | OnikiKapı</title>
        <meta name="description" content="Ruhsal ve bedensel sıkıntılar için Ehlibeyt kaynaklı dualar ve manevi reçeteler." />
      </Helmet>

      {/* --- HERO SECTION --- */}
      <div className="text-center space-y-4 py-8 bg-gradient-to-b from-turquoise-dark to-[#162e45] rounded-b-3xl border-b border-gold/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <Heart className="absolute top-10 left-10 text-gold animate-pulse-slow" size={60} />
             <Sparkles className="absolute bottom-10 right-10 text-turquoise-light" size={40} />
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 mb-2 relative z-10">
          <Heart size={16} /> <span className="text-xs font-bold tracking-widest uppercase">Manevi Eczane</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand relative z-10">
          Manevi Reçeteler
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto font-serif text-lg leading-relaxed relative z-10">
          "Dua müminin silahı, dinin direği ve göklerin nurudur."
        </p>
      </div>

      {/* --- REÇETE LİSTESİ (GRID) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="group bg-[#162e45] rounded-2xl p-6 border border-white/5 hover:border-gold/40 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <BookOpen size={80} className="text-gold" />
            </div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="bg-turquoise/20 text-turquoise-light text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {recipe.category}
              </span>
              <Heart className="text-slate-500 group-hover:text-rose-500 transition-colors" size={20} />
            </div>
            
            <h3 className="text-xl font-bold text-sand font-sans mb-2 group-hover:text-gold transition-colors relative z-10">
              {recipe.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 relative z-10">
              {recipe.shortDesc}
            </p>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gold/80 font-bold relative z-10">
              <span className="flex items-center gap-1"><Clock size={12} /> {recipe.vakit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL (DETAY PENCERESİ) --- */}
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}

    </div>
  );
}

// --- RECIPE MODAL COMPONENT ---
function RecipeModal({ recipe, onClose }) {
  // Tab State: 'arabic' | 'reading' | 'meaning'
  const [activeTab, setActiveTab] = React.useState('arabic');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md animate-fade-in">
      <div className="bg-[#162e45] w-full max-w-2xl rounded-3xl shadow-2xl border border-gold/20 flex flex-col max-h-[90vh] overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-midnight/50">
          <h2 className="text-2xl font-bold text-gold font-sans">{recipe.title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition bg-white/5 p-2 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar p-6 space-y-6">
          
          {/* 3. AUDIO INTEGRATION */}
          <div className="bg-midnight/30 p-4 rounded-xl border border-white/5 flex items-center gap-4">
             <div className="bg-gold/10 p-3 rounded-full text-gold">
               <Volume2 size={24} />
             </div>
             <div className="flex-grow">
               <p className="text-xs text-slate-400 mb-1 uppercase tracking-widest font-bold">Dinle</p>
               {recipe.audio ? (
                 <audio controls className="w-full h-8 opacity-80" src={recipe.audio}>
                   Tarayıcınız ses elementini desteklemiyor.
                 </audio>
               ) : (
                 <p className="text-sm text-slate-500 italic">Ses dosyası hazırlanıyor...</p>
               )}
             </div>
          </div>

          {/* 4. THEOLOGICAL METADATA (REÇETE DETAYI) */}
          <div className="bg-turquoise/10 border border-turquoise/20 rounded-xl p-5">
            <h4 className="text-turquoise-light font-bold text-sm uppercase tracking-widest mb-3 border-b border-turquoise/20 pb-2 flex items-center gap-2">
              <Sparkles size={16} /> Manevi Reçete Detayı
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="text-gold mt-0.5 shrink-0" size={16} />
                <div>
                  <span className="block text-slate-400 text-xs font-bold uppercase">Vakit</span>
                  <span className="text-sand">{recipe.vakit}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Repeat className="text-gold mt-0.5 shrink-0" size={16} />
                <div>
                  <span className="block text-slate-400 text-xs font-bold uppercase">Adet</span>
                  <span className="text-sand">{recipe.adet}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:col-span-3 lg:col-span-1">
                <Heart className="text-gold mt-0.5 shrink-0" size={16} />
                <div>
                  <span className="block text-slate-400 text-xs font-bold uppercase">Fazilet</span>
                  <span className="text-sand">{recipe.fazilet}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. UI STRUCTURE - TABBED VIEW */}
          <div className="flex bg-midnight rounded-lg p-1 border border-white/5">
            <TabButton 
              label="Arapça" 
              icon={<BookOpen size={16} />} 
              isActive={activeTab === 'arabic'} 
              onClick={() => setActiveTab('arabic')} 
            />
            <TabButton 
              label="Okunuş" 
              icon={<Volume2 size={16} />} 
              isActive={activeTab === 'reading'} 
              onClick={() => setActiveTab('reading')} 
            />
            <TabButton 
              label="Anlamı" 
              icon={<Globe size={16} />} 
              isActive={activeTab === 'meaning'} 
              onClick={() => setActiveTab('meaning')} 
            />
          </div>

          {/* CONTENT DISPLAY */}
          <div className="min-h-[150px] flex items-center justify-center text-center p-4 bg-midnight/30 rounded-2xl border border-white/5 relative">
            
            {/* 1. ARABIC (Primary) */}
            {activeTab === 'arabic' && (
              <p className="text-3xl md:text-4xl text-sand font-serif leading-loose py-4 px-2" style={{ fontFamily: '"Amiri", serif' }}>
                {recipe.arabic}
              </p>
            )}

            {/* 2. TRANSLITERATION (Secondary) */}
            {activeTab === 'reading' && (
              <div className="space-y-2">
                 <p className="text-xl text-slate-300 italic font-serif leading-relaxed">
                   "{recipe.transliteration}"
                 </p>
                 <p className="text-xs text-slate-500 mt-4">(Latin harfleriyle okunuş)</p>
              </div>
            )}

            {/* 3. TRANSLATION (Tertiary) */}
            {activeTab === 'meaning' && (
              <div className="space-y-2">
                <p className="text-lg text-sand font-sans leading-relaxed">
                  {recipe.translation}
                </p>
                <p className="text-xs text-gold/70 mt-4 uppercase tracking-widest font-bold">Türkçe Meali</p>
              </div>
            )}

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-midnight/50 flex justify-between items-center text-xs text-slate-400">
           <span>* Abdestli okunması tavsiye edilir.</span>
           <button className="bg-gold text-midnight px-4 py-2 rounded-lg font-bold hover:bg-white transition">
             Okudum ({recipe.adet})
           </button>
        </div>

      </div>
    </div>
  );
}

// Yardımcı Tab Butonu
const TabButton = ({ label, icon, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all duration-300 ${
      isActive 
      ? 'bg-turquoise text-white shadow-lg' 
      : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon} {label}
  </button>
);
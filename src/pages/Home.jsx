import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenTool, Scale, Flower, ArrowRight, BookOpen, Sparkles, Search, Heart, HelpCircle, Sun, Gift, RefreshCw } from 'lucide-react';

export default function Home() {
  const [heroSearch, setHeroSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      alert("Detaylı arama sonuçları için üst menüdeki büyüteci kullanabilirsiniz.");
    }
  };

  return (
    <div className="space-y-16 animate-fade-in">
      
      {/* --- HERO (GİRİŞ) BÖLÜMÜ --- */}
      <div className="relative py-20 px-6 rounded-3xl overflow-hidden text-center border border-gold/20 shadow-2xl group min-h-[600px] flex flex-col justify-center">
        
        {/* Arka Plan ve Kontrast */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-turquoise-dark mix-blend-multiply"></div>

        {/* İçerik */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center mb-2">
            <div className="absolute inset-0 bg-gold/40 blur-2xl rounded-full animate-pulse-slow"></div>
            <Sparkles size={50} className="text-gold absolute opacity-60 animate-spin-slow" />
            <BookOpen size={40} className="text-gold relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand drop-shadow-sm leading-tight">
            OnikiKapı
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-serif leading-relaxed max-w-2xl">
            "İlim bir noktadır, onu cahiller çoğaltmıştır."
          </p>
          
          {/* Arama Çubuğu */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl relative mt-4 group/search">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Bir kavram, hadis veya soru arayın... (Örn: Adalet)" 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-sand placeholder-slate-300 rounded-full py-4 pl-8 pr-16 text-lg focus:outline-none focus:bg-white/20 focus:border-gold/50 transition-all shadow-lg"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
              />
              <button type="submit" className="absolute right-2 p-2 bg-gold/90 hover:bg-gold text-turquoise-dark rounded-full transition-colors shadow-md">
                <Search size={24} />
              </button>
            </div>
          </form>

          {/* Ruh Hali Seçici */}
          <div className="w-full max-w-3xl mt-6">
            <p className="text-sm text-turquoise-light uppercase tracking-widest font-bold mb-4">Bugün nasılsın?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <MoodChip label="Hüzünlü" icon={<Heart size={16} />} link="/manevi-receteler" color="hover:bg-rose-500/20 hover:border-rose-400 hover:text-rose-200" />
              <MoodChip label="Meraklı" icon={<HelpCircle size={16} />} link="/library" color="hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-200" />
              <MoodChip label="Şükür Dolu" icon={<Sun size={16} />} link="/zikir" color="hover:bg-yellow-500/20 hover:border-yellow-400 hover:text-yellow-200" />
              <MoodChip label="Kayıp Hissediyorum" icon={<Sparkles size={16} />} link="/14-masum" color="hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200" />
            </div>
          </div>

        </div>
      </div>

      {/* --- KARTLAR --- */}
      <div className="grid md:grid-cols-3 gap-8 relative px-4">
        <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
           <Flower size={300} className="text-turquoise-light rotate-12" />
        </div>

        <FeatureCard 
          icon={<Flower size={32} className="text-rose-300" />}
          title="Manevi Reçeteler ve Muhabbet"
          desc="Ruhsal dinginlik ve ilahi aşk için Ehlibeyt kaynaklı manevi şifa kapısı. Kalbinizi ferahlatacak dualar ve zikirler burada."
          link="/manevi-receteler"
        />
        <FeatureCard 
          icon={<PenTool size={32} className="text-gold" />}
          title="İlim ve Hikmet Kütüphanesi"
          desc="'Oku' emrinin izinde, kadim ve sahih kaynaklara açılan ilim kapısı. Binlerce yıllık mirasın dijital raflardaki yansıması."
          link="/library"
        />
        <FeatureCard 
          icon={<Scale size={32} className="text-turquoise-light" />}
          title="Adalet ve Hakikat Arayışı"
          desc="Evrensel adalet ilkesi ve hakikat üzerine Soru/Cevap kapısı. Aklınıza takılan sorulara usuli bakış açısıyla cevaplar."
          link="/soru-cevap"
        />
      </div>

      {/* --- YENİ EKLENEN: İNTERAKTİF GÜNÜN NASİBİ --- */}
      <GununNasibi />

    </div>
  );
}

// --- GÜNÜN NASİBİ BİLEŞENİ (YENİ) ---
function GununNasibi() {
  const [nasip, setNasip] = useState(null);
  const [loading, setLoading] = useState(false);

  // Nasip Havuzu
  const nasipler = [
    { text: "İnsanlar uykudadır, öldükleri zaman uyanırlar.", source: "Hz. Ali (a.s)" },
    { text: "Hiçbir süs, edep kadar güzel değildir.", source: "Hz. Ali (a.s)" },
    { text: "İlim bir hazinedir, anahtarı ise sorudur.", source: "Hz. Muhammed (s.a.a)" },
    { text: "Dua müminin silahı, dinin direği ve göklerin nurudur.", source: "Hz. Muhammed (s.a.a)" },
    { text: "Haksızlık karşısında susan dilsiz şeytandır.", source: "Hz. Muhammed (s.a.a)" },
    { text: "Komşusu açken tok yatan bizden değildir.", source: "Hz. Muhammed (s.a.a)" },
    { text: "Mazlumun zalimden öcünü alacağı gün, zalimin mazluma zulmettiği günden daha çetin olacaktır.", source: "Hz. Ali (a.s)" },
    { text: "Senin hakkında zannını güzel yapan kimsenin zannını, o işi yaparak gerçekleştir.", source: "Hz. Ali (a.s)" },
    { text: "Dünya, müminin zindanı ve kafirin cennetidir.", source: "Hadis-i Şerif" },
    { text: "En hayırlınız, ahlakı en güzel olanınızdır.", source: "Hz. Muhammed (s.a.a)" }
  ];

  const nasipCek = () => {
    setLoading(true);
    setNasip(null);
    // Rastgelelik ve Animasyon Hissi
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * nasipler.length);
      setNasip(nasipler[randomIndex]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-turquoise-dark p-10 rounded-3xl border border-gold/20 relative overflow-hidden shadow-xl mx-4 transition-all duration-500 hover:shadow-gold/10">
      
      {/* Dekoratif Arka Plan */}
      <div className="absolute -bottom-10 -left-10 p-4 opacity-5 rotate-12 pointer-events-none">
         <Gift size={200} className="text-gold" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
        
        <div className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-sm">
          <Sparkles size={16} /> Günün Nasibi
        </div>

        {nasip ? (
          <div className="space-y-6 animate-fade-in">
             <blockquote className="text-2xl md:text-4xl font-serif text-sand italic leading-relaxed drop-shadow-md">
              "{nasip.text}"
            </blockquote>
            <p className="text-turquoise-light font-bold text-lg">— {nasip.source}</p>
            
            <button 
              onClick={nasipCek}
              className="mt-4 flex items-center gap-2 mx-auto text-sm text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw size={14} /> Başka bir nasip çek
            </button>
          </div>
        ) : (
          <div className="py-8 space-y-4">
             <h3 className="text-2xl font-serif text-slate-200">
               {loading ? "Kalbinize doğan nasip aranıyor..." : "Bugün sizin için ayrılan manevi rızkı görmek ister misiniz?"}
             </h3>
             {!loading && (
               <button 
                onClick={nasipCek}
                className="bg-gold text-turquoise-dark px-8 py-3 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
               >
                 <Gift size={20} /> Niyet Et ve Nasibini Gör
               </button>
             )}
          </div>
        )}

      </div>
    </div>
  );
}

// --- DİĞER BİLEŞENLER ---

function MoodChip({ label, icon, link, color }) {
  return (
    <Link 
      to={link} 
      className={`flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sand text-sm font-medium transition-all duration-300 ${color}`}
    >
      {icon} {label}
    </Link>
  );
}

function FeatureCard({ icon, title, desc, link }) {
  return (
    <Link to={link} className="block group relative z-10 h-full">
      <div className="bg-turquoise p-8 rounded-2xl border border-white/10 h-full hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl bg-opacity-80 backdrop-blur-sm flex flex-col">
        <div className="mb-6 p-4 bg-turquoise-dark rounded-xl w-fit group-hover:scale-110 transition-transform border border-gold/20 group-hover:border-gold/50 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-sand mb-3 group-hover:text-gold transition-colors font-sans">{title}</h3>
        <p className="text-slate-200 text-base leading-relaxed font-serif line-clamp-3">
          {desc}
        </p>
      </div>
    </Link>
  );
}
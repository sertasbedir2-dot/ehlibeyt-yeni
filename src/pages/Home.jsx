import PrayerTimesWidget from '../components/PrayerTimesWidget';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenTool, Scale, Flower, BookOpen, Sparkles, Search, Heart, HelpCircle, Sun, RefreshCw, Volume2, Share2, Flame, Bell, X, Download, HandHeart, CheckCircle2, Star } from 'lucide-react';
import { wisdomData } from '../data/wisdomData';
import { globalSearchData } from '../data/siteData'; 
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';

const GOREVLER = [
  { text: "Bugün telefon rehberinden uzun süredir konuşmadığın bir akrabanı ara ve halini hatırını sor.", type: "Sıla-i Rahim" },
  { text: "Bugün karşılaştığın bir çocuğun başını okşa veya ona küçük bir çikolata ikram et.", type: "Merhamet" },
  { text: "Bugün bir sokak hayvanına (kedi/köpek/kuş) su veya mama ver.", type: "Şefkat" }
];

export default function Home() {
  const [heroSearch, setHeroSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]); 
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showSharePreview, setShowSharePreview] = useState(false);
  const wisdomSectionRef = useRef(null);

  // --- TİTANYUM ZIRHLI ARAMA MOTORU ---
  // globalSearchData bozuk veya tanımsız olsa bile ASLA çökmez.
  const safeSearch = (query) => {
    if (!query || !query.trim() || !globalSearchData || !Array.isArray(globalSearchData)) return [];
    
    const queryLower = query.toLowerCase();
    
    return globalSearchData.filter(item => {
      if (!item) return false;
      const tMatch = item.title ? String(item.title).toLowerCase().includes(queryLower) : false;
      const cMatch = item.category ? String(item.category).toLowerCase().includes(queryLower) : false;
      const kMatch = item.keywords ? String(item.keywords).toLowerCase().includes(queryLower) : false;
      return tMatch || cMatch || kMatch;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResults(safeSearch(heroSearch));
  };

  useEffect(() => {
    setSearchResults(safeSearch(heroSearch));
  }, [heroSearch]);
  // ----------------------------------------

  const dailyWisdom = useMemo(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return wisdomData[(dayOfYear - 1) % wisdomData.length] || wisdomData[0];
  }, []);

  const dailyTask = useMemo(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return GOREVLER[(dayOfYear - 1) % GOREVLER.length] || GOREVLER[0];
  }, []);

  return (
    <div className="space-y-16 animate-fade-in relative">
      {/* HERO SECTION */}
      <div className="relative py-20 px-6 rounded-3xl overflow-hidden text-center border border-gold/20 shadow-2xl group min-h-[600px] flex flex-col justify-center">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-turquoise-dark mix-blend-multiply"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center w-full">
          <div className="mb-4 animate-fade-in w-full max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300 z-20"><PrayerTimesWidget /></div>
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center mb-2">
            <div className="absolute inset-0 bg-gold/40 blur-2xl rounded-full animate-pulse-slow"></div>
            <Sparkles size={50} className="text-gold absolute opacity-60 animate-spin-slow" />
            <BookOpen size={40} className="text-gold relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand drop-shadow-sm leading-tight">OnikiKapı</h1>
          <p className="text-xl md:text-2xl text-slate-200 font-serif leading-relaxed max-w-2xl">"İlim bir noktadır, onu cahiller çoğaltmıştır."</p>
          
          {/* ÇALIŞAN BÜYÜK ARAMA ÇUBUĞU */}
          <div className="w-full max-w-2xl relative mt-4">
            <form onSubmit={handleSearch} className="relative flex items-center w-full z-30">
              <input 
                type="text" 
                placeholder="Bir kavram, hadis veya soru arayın..." 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-sand placeholder-slate-300 rounded-full py-4 pl-8 pr-16 text-lg focus:outline-none focus:bg-white/20 focus:border-gold/50 transition-all shadow-lg" 
                value={heroSearch} 
                onChange={(e) => setHeroSearch(e.target.value)} 
              />
              <button type="submit" className="absolute right-2 p-2 bg-gold/90 hover:bg-gold text-turquoise-dark rounded-full transition-colors shadow-md"><Search size={24} /></button>
            </form>
            
            {/* ARAMA SONUÇLARI DROPDOWN */}
            {heroSearch.trim() && (
              <div className="absolute top-20 left-0 w-full bg-turquoise-dark/95 backdrop-blur-xl border border-gold/30 rounded-xl overflow-hidden shadow-2xl z-40 max-h-80 overflow-y-auto text-left animate-fade-in custom-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <Link to={result.url} key={index} className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/10 transition-colors">
                      <div className="p-2 bg-turquoise rounded-lg text-gold">
                        {result.type === "Kitap" ? <Book size={20} /> : <Star size={20} />}
                      </div>
                      <div>
                        <h4 className="text-sand font-bold text-lg">{result.title}</h4>
                        <span className="text-xs text-turquoise-light uppercase tracking-wider">{result.type} • {result.category}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-300 italic">"{heroSearch}" ile ilgili sonuç bulunamadı. Lütfen "Ali" veya "Zikir" gibi anahtar kelimeler deneyin.</div>
                )}
              </div>
            )}
          </div>

          <div className="w-full max-w-3xl mt-6 z-20">
            <p className="text-sm text-turquoise-light uppercase tracking-widest font-bold mb-4">Bugün nasılsın?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <MoodChip label="Hüzünlü" icon={<Heart size={16} />} link="/manevi-receteler" color="hover:bg-rose-500/20 hover:border-rose-400 hover:text-rose-200" />
              <MoodChip label="Meraklı" icon={<HelpCircle size={16} />} link="/library" color="hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-200" />
              <MoodChip label="Şükür Dolu" icon={<Sun size={16} />} link="/zikir" color="hover:bg-yellow-500/20 hover:border-yellow-400 hover:text-yellow-200" />
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid md:grid-cols-3 gap-8 relative px-4 mt-8">
        <FeatureCard icon={<Flower size={32} className="text-rose-300" />} title="Manevi Reçeteler" desc="Ruhsal dinginlik ve ilahi aşk için Ehlibeyt kaynaklı manevi şifa kapısı." link="/manevi-receteler" />
        <FeatureCard icon={<PenTool size={32} className="text-gold" />} title="İlim ve Hikmet" desc="Kadim ve sahih kaynaklara açılan ilim kapısı." link="/library" />
        <FeatureCard icon={<Scale size={32} className="text-turquoise-light" />} title="Soru ve Cevap" desc="Evrensel adalet ilkesi ve hakikat arayışı." link="/soru-cevap" />
      </div>
    </div>
  );
}

function MoodChip({ label, icon, link, color }) { return (<Link to={link} className={`flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sand text-sm font-medium transition-all duration-300 ${color}`}>{icon} {label}</Link>); }
function FeatureCard({ icon, title, desc, link }) { return (<Link to={link} className="block group relative z-10 h-full"><div className="bg-turquoise p-8 rounded-2xl border border-white/10 h-full hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl bg-opacity-80 backdrop-blur-sm flex flex-col"><div className="mb-6 p-4 bg-turquoise-dark rounded-xl w-fit group-hover:scale-110 transition-transform border border-gold/20 shadow-[0_0_15px_rgba(0,0,0,0.2)]">{icon}</div><h3 className="text-2xl font-bold text-sand mb-3 group-hover:text-gold transition-colors font-sans">{title}</h3><p className="text-slate-200 text-base leading-relaxed font-serif line-clamp-3">{desc}</p></div></Link>); }

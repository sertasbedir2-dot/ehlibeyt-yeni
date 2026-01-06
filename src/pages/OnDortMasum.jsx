import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Calendar, Crown, X, Star, BookOpen, Swords, Sparkles, MessageCircle, Users } from 'lucide-react';
// YENİ: Veritabanı bağlantı dosyasını çağırıyoruz
import { fetchMasumlar } from '../lib/neo4j';

// --- GÖRSEL KATMAN (p5.js - Z-Index Düzeltilmiş) ---
const GeometricSanctuary = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    let myP5;
    const initP5 = async () => {
      try {
        const p5 = (await import('p5')).default;
        const sketch = (p) => {
          let t = 0;
          p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent(containerRef.current);
            p.noStroke();
            canvas.style('position', 'fixed');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1'); // Arkada kalması için
            canvas.style('pointer-events', 'none');
          };
          p.draw = () => {
            p.clear();
            t += 0.005; 
            const breath = (p.sin(t) + 1) / 2; 
            const gridSize = 150; 
            for (let x = 0; x < p.width; x += gridSize) {
              for (let y = 0; y < p.height; y += gridSize) {
                p.push();
                p.translate(x + gridSize / 2, y + gridSize / 2);
                p.rotate(p.TWO_PI * breath * 0.02);
                const scaleFactor = p.map(breath, 0, 1, 0.9, 1.1);
                p.scale(scaleFactor);
                p.fill(255, 215, 0, 15);
                p.stroke(255, 215, 0, 30);
                p.strokeWeight(1);
                let angle = p.TWO_PI / 8;
                let halfAngle = angle / 2.0;
                p.beginShape();
                for (let a = 0; a < p.TWO_PI; a += angle) {
                  let sx = 0 + p.cos(a) * 50;
                  let sy = 0 + p.sin(a) * 50;
                  p.vertex(sx, sy);
                  sx = 0 + p.cos(a + halfAngle) * 25;
                  sy = 0 + p.sin(a + halfAngle) * 25;
                  p.vertex(sx, sy);
                }
                p.endShape(p.CLOSE);
                p.pop();
              }
            }
          };
          p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
        myP5 = new p5(sketch);
      } catch (error) { console.error("p5 hatası:", error); }
    };
    initP5();
    return () => { if (myP5) myP5.remove(); };
  }, []);
  return <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none bg-[#0f3d3e]" />;
};

// --- ANA SAYFA ---
export default function OnDortMasum() {
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('ontology');
  
  // Veritabanı State'leri
  const [masumlar, setMasumlar] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sayfa açılınca Veritabanından Çek
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMasumlar();
      if (data && data.length > 0) {
        setMasumlar(data);
      } else {
        console.error("Veri çekilemedi veya veritabanı boş.");
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleCardClick = (id) => {
    setSelectedId(id);
    setActiveTab('ontology');
  };

  const resetSelection = () => {
    setSelectedId(null);
  };

  return (
    <div className="relative min-h-screen font-sans overflow-hidden bg-[#0f3d3e] text-sand-light pb-20">
      <Helmet>
        <title>14 Masum | Ehlibeyt Yolu</title>
      </Helmet>
      <GeometricSanctuary />

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 backdrop-blur-sm">
             <Crown size={16} /> <span className="text-xs font-bold tracking-widest uppercase">Neo4j Knowledge Graph</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand drop-shadow-sm">
             On Dört Masum-u Pak
           </h1>
        </div>

        {/* Yükleniyor Göstergesi */}
        {loading ? (
           <div className="flex justify-center items-center h-64 text-gold animate-pulse">
             <div className="text-xl font-serif">Bilgi Ağacı Yükleniyor...</div>
           </div>
        ) : (
          <motion.div 
              layout 
              className={`grid gap-6 transition-all duration-500 ${selectedId ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}
          >
            <AnimatePresence>
              {masumlar.map((masum) => {
                const isSelected = selectedId === masum.id;
                const isHidden = selectedId && !isSelected;

                if (isHidden) return null;

                return (
                  <motion.div
                    layoutId={`card-${masum.id}`}
                    key={masum.id}
                    onClick={() => !isSelected && handleCardClick(masum.id)}
                    className={`
                      group relative backdrop-blur-md rounded-2xl overflow-hidden
                      border border-gold/10 hover:border-gold/40
                      cursor-pointer transition-all duration-500
                      ${isSelected 
                          ? 'bg-[#0a2728]/95 h-auto cursor-default ring-1 ring-gold/30 shadow-2xl col-span-full' 
                          : 'bg-[#164e50]/40 hover:bg-[#1a5c5e]/60 h-72 flex flex-col justify-center items-center text-center hover:-translate-y-2 hover:shadow-xl'
                      }
                    `}
                  >
                    <div className="p-6 w-full h-full flex flex-col relative z-10">
                      
                      <div className={`flex ${isSelected ? 'items-start gap-6 border-b border-white/10 pb-6 mb-6' : 'flex-col items-center justify-center h-full'}`}>
                          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20 shrink-0">
                               <Star size={24} fill="currentColor" className="opacity-80" />
                          </div>
                          <div className={`${isSelected ? 'text-left' : 'text-center mt-4'}`}>
                              <h2 className="text-3xl font-serif text-gold/90">{masum.identity.name_ar}</h2>
                              <h3 className="text-xl font-bold text-white">{masum.identity.name_tr}</h3>
                              <p className="text-sm uppercase tracking-widest text-slate-400 mt-1">{masum.identity.role} | {masum.identity.dates}</p>
                          </div>
                           {isSelected && (
                              <button 
                                  onClick={(e) => { e.stopPropagation(); resetSelection(); }}
                                  className="ml-auto text-slate-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/5"
                              >
                                  <X size={24} />
                              </button>
                          )}
                      </div>

                      {isSelected && (
                          <motion.div 
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                              className="grid grid-cols-1 md:grid-cols-4 gap-6"
                          >
                              <div className="col-span-1 space-y-2">
                                  {[
                                      { id: 'ontology', label: 'Ontolojik Kimlik', icon: Sparkles },
                                      { id: 'network', label: 'İlim Ağı', icon: Users },
                                      { id: 'politics', label: 'Siyasi Duruş', icon: Swords },
                                      { id: 'liturgy', label: 'Maneviyat', icon: BookOpen },
                                      { id: 'contemporary', label: 'Bugüne Hitap', icon: MessageCircle },
                                  ].map(tab => (
                                      <button
                                          key={tab.id}
                                          onClick={(e) => { e.stopPropagation(); setActiveTab(tab.id); }}
                                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-gold text-[#0f3d3e] font-bold' : 'text-slate-300 hover:bg-white/5'}`}
                                      >
                                          <tab.icon size={18} />
                                          {tab.label}
                                      </button>
                                  ))}
                              </div>

                              <div className="col-span-1 md:col-span-3 bg-[#0f3d3e] rounded-xl p-6 border border-white/5 min-h-[300px]">
                                  {activeTab === 'ontology' && (
                                      <div className="space-y-4 animate-fade-in">
                                          <h4 className="text-gold font-serif text-2xl">Nur ve Hakikat</h4>
                                          <div className="p-4 bg-black/20 rounded-lg border-l-4 border-gold">
                                              <p className="text-lg italic text-slate-200">"{masum.ontology.quran}"</p>
                                          </div>
                                          <div className="grid grid-cols-2 gap-4 mt-4">
                                              <div>
                                                  <span className="text-xs text-slate-500 uppercase">Esma Tecellisi</span>
                                                  <p className="text-white text-lg">{masum.ontology.noor}</p>
                                              </div>
                                              <div>
                                                  <span className="text-xs text-slate-500 uppercase">Kozmik Konum</span>
                                                  <p className="text-white text-lg">{masum.ontology.cosmic}</p>
                                              </div>
                                          </div>
                                      </div>
                                  )}
                                  {activeTab === 'network' && (
                                      <div className="space-y-4 animate-fade-in">
                                          <h4 className="text-gold font-serif text-2xl">İlim Şehri</h4>
                                          <p className="text-slate-300">İlim Mirası: <span className="text-white font-bold">{masum.network.legacy}</span></p>
                                          <div>
                                              <span className="text-xs text-slate-500 uppercase block mb-2">Seçkin Ashabı</span>
                                              <div className="flex flex-wrap gap-2">
                                                {masum.network.companions && masum.network.companions.length > 0 ? (
                                                  masum.network.companions.map((comp, i) => (
                                                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm text-slate-200 border border-white/5">{comp}</span>
                                                  ))
                                                ) : <span className="text-slate-400">Veri yükleniyor...</span>}
                                              </div>
                                          </div>
                                      </div>
                                  )}
                                  {activeTab === 'politics' && (
                                      <div className="space-y-4 animate-fade-in">
                                          <h4 className="text-gold font-serif text-2xl">Siyasi Strateji</h4>
                                          <p className="text-slate-300 bg-red-900/20 p-3 rounded border border-red-900/30">
                                              <span className="text-red-400 font-bold">Mücadele:</span> {masum.politics.strategy}
                                          </p>
                                          <div className="space-y-2">
                                            {/* Olaylar dizisi veritabanında henüz boşsa hata vermesin */}
                                            {masum.politics.events && masum.politics.events.length > 0 && masum.politics.events.map((ev, i) => (
                                                  <div key={i} className="flex gap-4 items-center">
                                                      <span className="text-gold font-mono text-sm">{ev.date}</span>
                                                      <div className="h-px bg-white/10 flex-grow"></div>
                                                      <span className="text-white">{ev.event}</span>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  )}
                                  {activeTab === 'liturgy' && (
                                      <div className="space-y-4 animate-fade-in">
                                          <h4 className="text-gold font-serif text-2xl">Dua ve Ziyaret</h4>
                                          <ul className="list-disc list-inside text-slate-300 space-y-2">
                                            {masum.liturgy.duas && masum.liturgy.duas.length > 0 && masum.liturgy.duas.map((dua, i) => (
                                                  <li key={i}>{dua}</li>
                                              ))}
                                              <li className="text-gold/80">{masum.liturgy.ziyarat}</li>
                                          </ul>
                                      </div>
                                  )}
                                  {activeTab === 'contemporary' && (
                                      <div className="space-y-4 animate-fade-in">
                                          <h4 className="text-gold font-serif text-2xl">Bugüne Mesaj</h4>
                                          <div className="bg-gradient-to-r from-gold/20 to-transparent p-6 rounded-xl border border-gold/20">
                                              <p className="text-xl text-white font-serif leading-relaxed">"{masum.contemporary}"</p>
                                          </div>
                                      </div>
                                  )}
                              </div>
                          </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}
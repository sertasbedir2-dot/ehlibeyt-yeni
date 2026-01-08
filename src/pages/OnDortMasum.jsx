import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Crown, Star, Network, X, Search, ChevronDown, Info, Tag, Layers, Bot, Sparkles, Loader2 } from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';

// --- BU DOSYADA ARTIK "neo4j-driver" İMPORTU YOK! --- 

const InfoBox = ({ icon: Icon, title, content }) => {
  const [isOpen, setIsOpen] = useState(true);
  if (!content || typeof content === 'object') return null; 
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden mb-3">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-3 text-left outline-none hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-2 text-[#FFD700] font-bold text-sm capitalize">
          <Icon size={16} /> <span>{title.replace(/_/g, ' ')}</span>
        </div>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-3">
            <div className="pb-3 pt-1 border-t border-white/5 text-sm text-slate-300 leading-relaxed font-light">
              {String(content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AIBox = ({ content }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 border border-purple-500/50 rounded-xl p-4 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
    <div className="flex items-center gap-2 text-purple-200 mb-2 font-bold text-sm border-b border-purple-500/30 pb-2">
      <Bot size={18} /> <span>Yapay Zeka Analizi</span>
    </div>
    <p className="text-sm text-slate-100 leading-relaxed font-light">
      {content}
    </p>
  </motion.div>
);

export default function OnDortMasum() {
  const [viewMode, setViewMode] = useState('grid');
  const [tumVeriler, setTumVeriler] = useState([]); 
  const [graphData, setGraphData] = useState({ nodes: [], links: [] }); 
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null); 
  
  const [aramaMetni, setAramaMetni] = useState(""); 
  const [filtrelenmisMetin, setFiltrelenmisMetin] = useState("");

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const fgRef = useRef();

  // 🌍 API ADRESİ (Render'daki Yeni Linkiniz)
  const API_URL = "https://thaqalayn-api-9632.onrender.com";

  useEffect(() => {
    // ARTIK DOĞRUDAN NEO4J YOK, FETCH VAR:
    fetch(`${API_URL}/api/kisiler`)
      .then(res => res.json())
      .then(data => {
        setTumVeriler(data.nodes);
        setGraphData(data);
        setLoading(false);
      })
      .catch(err => { console.error("Hata:", err); setLoading(false); });
  }, []);

  useEffect(() => {
    const zamanlayici = setTimeout(() => {
      setFiltrelenmisMetin(aramaMetni);
    }, 300);
    return () => clearTimeout(zamanlayici);
  }, [aramaMetni]);

  const filteredNodes = useMemo(() => {
    if (!filtrelenmisMetin) return tumVeriler;
    const kucukHarfArama = filtrelenmisMetin.toLocaleLowerCase('tr');
    return tumVeriler.filter(node => 
      node.isim.toLowerCase().includes(kucukHarfArama) ||
      (node.unvan && node.unvan.toLowerCase().includes(kucukHarfArama))
    );
  }, [tumVeriler, filtrelenmisMetin]);

  useEffect(() => {
    if (!loading && filtrelenmisMetin.length >= 3 && filteredNodes.length === 0) {
      fetch(`${API_URL}/api/log-eksik-arama`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ terim: filtrelenmisMetin })
      })
      .then(() => console.log("Eksik arama raporlandı"))
      .catch(err => console.error("Raporlama hatası:", err));
    }
  }, [filtrelenmisMetin, filteredNodes, loading]);

  useEffect(() => {
    setAiResponse(null);
    setAiLoading(false);
  }, [selectedNode]);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    if(viewMode === 'graph' && fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(4, 2000);
    }
  };

  const handleAIAnalysis = async () => {
    if (!selectedNode) return;
    setAiLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/ai-analiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isim: selectedNode.isim, unvan: selectedNode.unvan })
      });
      const data = await response.json();
      setAiResponse(data.reply);
    } catch (error) {
      console.error("AI Hatası:", error);
      setAiResponse("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="relative h-screen bg-[#0f3d3e] text-white overflow-hidden flex flex-col">
      <Helmet><title>Thaqalayn Bilgi Ağı</title></Helmet>
      
      <style>{`
        .ozel-scroll::-webkit-scrollbar { width: 12px; }
        .ozel-scroll::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); border-radius: 8px; }
        .ozel-scroll::-webkit-scrollbar-thumb { background-color: #FFD700; border-radius: 8px; border: 3px solid rgba(0, 0, 0, 0.3); }
        .ozel-scroll::-webkit-scrollbar-thumb:hover { background-color: #e5c100; }
      `}</style>

      {/* --- ÜST BAR --- */}
      <header className="z-20 px-4 py-3 bg-[#0a2728]/90 backdrop-blur-md border-b border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-gold/10 p-2 rounded-full text-[#FFD700] border border-gold/20">
            <Network size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#f5deb3] leading-none">Thaqalayn</h1>
            <p className="text-xs text-slate-400">{filteredNodes.length} / {tumVeriler.length} Kayıt</p>
          </div>
        </div>

        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FFD700]" size={18} />
          <input 
            type="text" 
            placeholder="Ara: Ali, Bedir, Halife..." 
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FFD700]/50 transition-all placeholder:text-slate-500"
          />
        </div>
        
        <div className="flex bg-black/40 rounded-lg p-1 gap-1">
          <button onClick={() => setViewMode('grid')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${viewMode === 'grid' ? 'bg-[#FFD700] text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}>Liste</button>
          <button onClick={() => setViewMode('graph')} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${viewMode === 'graph' ? 'bg-[#FFD700] text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}>Harita</button>
        </div>
      </header>

      {/* --- İÇERİK --- */}
      <main className="flex-grow relative overflow-hidden bg-[#0f3d3e]">
        {loading ? (
          <div className="flex h-full items-center justify-center text-[#FFD700] animate-pulse">Veriler Yükleniyor...</div>
        ) : (
          <div className="h-full w-full relative">
            
            {viewMode === 'grid' ? (
              <div className="absolute inset-0 overflow-y-auto p-6 ozel-scroll">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 pb-40">
                  {filteredNodes.map(m => (
                    <div 
                      key={m.id} 
                      onClick={() => handleNodeClick(m)} 
                      className="p-4 bg-[#164e50]/40 border border-white/5 rounded-xl text-center cursor-pointer hover:bg-white/10 hover:border-gold/30 transition-all group relative overflow-hidden h-32 flex flex-col items-center justify-center"
                    >
                      <div className="absolute top-0 left-0 w-full h-1" style={{backgroundColor: m.color}}></div>
                      <div className="mb-2 flex justify-center text-slate-400 group-hover:text-white transition-colors">
                         {m.isMasum ? <Crown size={24} style={{color: m.color}}/> : <Star size={20} style={{color: m.color}}/>}
                      </div>
                      <h3 className="font-bold text-sm truncate w-full text-slate-200 group-hover:text-[#FFD700]">{m.isim}</h3>
                      <p className="text-[10px] text-slate-500 truncate w-full mt-1 uppercase tracking-wider">{m.unvan}</p>
                    </div>
                  ))}
                  {filteredNodes.length === 0 && <div className="col-span-full text-center text-slate-400 py-10">Kayıt bulunamadı.</div>}
                </div>
              </div>
            ) : (
              <div className="absolute inset-0">
                 <ForceGraph2D ref={fgRef} graphData={graphData} nodeColor={n => n.color} nodeLabel="isim" nodeRelSize={6} onNodeClick={handleNodeClick} linkColor={() => 'rgba(255,255,255,0.1)'} />
              </div>
            )}

            <AnimatePresence>
              {selectedNode && (
                <motion.div 
                  initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} 
                  transition={{ type: "spring", damping: 25, stiffness: 200 }} 
                  className="absolute top-0 right-0 w-full md:w-[450px] h-full bg-[#0a2728]/95 border-l border-gold/30 backdrop-blur-xl shadow-2xl z-50 flex flex-col"
                >
                  <div className="flex justify-end p-4 border-b border-white/10">
                    <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white bg-white/10 p-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto px-6 py-6 pb-20 ozel-scroll">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 border-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]" style={{backgroundColor: `${selectedNode.color}20`, borderColor: selectedNode.color}}>
                        {selectedNode.isMasum ? <Crown size={40} style={{color: selectedNode.color}}/> : <Star size={40} style={{color: selectedNode.color}}/>}
                      </div>
                      <h2 className="text-3xl font-serif text-white mb-1">{selectedNode.isim}</h2>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border" style={{borderColor: `${selectedNode.color}40`, color: selectedNode.color, backgroundColor: `${selectedNode.color}10`}}>
                        {selectedNode.unvan}
                      </span>
                    </div>

                    <div className="mb-6">
                        {!aiResponse && (
                          <button 
                            onClick={handleAIAnalysis}
                            disabled={aiLoading}
                            className="w-full py-3 bg-gradient-to-r from-purple-900 to-blue-900 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:border-[#FFD700] hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all group disabled:opacity-50"
                          >
                              {aiLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} className="text-[#FFD700] group-hover:animate-pulse" />}
                              <span className="text-sm font-bold text-slate-200">
                                {aiLoading ? "Yapay Zeka Düşünüyor..." : "Yapay Zeka ile Analiz Et"}
                              </span>
                          </button>
                        )}
                        {aiResponse && <AIBox content={aiResponse} />}
                    </div>

                    <div className="space-y-1">
                      {selectedNode.properties && Object.entries(selectedNode.properties).map(([key, value]) => {
                        if (['name', 'name_tr', 'id', 'color', 'unvan', 'x', 'y', 'index', 'vx', 'vy', 'fx', 'fy', 'elementId', 'ai_ozet'].includes(key)) return null;
                        if (!value) return null;
                        return <InfoBox key={key} icon={key.includes('role') ? Layers : Tag} title={key} content={value} />;
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
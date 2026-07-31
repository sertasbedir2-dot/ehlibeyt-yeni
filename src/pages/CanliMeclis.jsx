import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Users, Shield, Heart, HandHeart, Sparkles, Flame, PenTool } from 'lucide-react';

export default function DergahDefteri() {
  const [username, setUsername] = useState(localStorage.getItem('dergah_username') || '');
  const [newNote, setNewNote] = useState('');
  const [dailyVisitors, setDailyVisitors] = useState(0);
  
  // Şimdilik statik simülasyon datası. İleride Firebase'den çekilecek.
  const [notes, setNotes] = useState([
    {
      id: 1,
      author: "Talip_Ali",
      text: "Rabbim Ehlibeyt'in nurlu yolundan bizleri ayırmasın. Yarınki sınavım için dua beklerim canlar.",
      time: "Bugün 09:15",
      likes: 12,
      isLiked: false,
      color: "border-blue-500/30"
    },
    {
      id: 2,
      author: "Zehra_Ana",
      text: "Dünyanın dört bir yanındaki mazlumlara İmam Hüseyin (a.s) direnişi ilham olsun. Selametle.",
      time: "Dün 22:40",
      likes: 45,
      isLiked: false,
      color: "border-rose-500/30"
    },
    {
      id: 3,
      author: "Derviş_Can",
      text: "Ya Ali, medet. Bugün siteyi keşfettim, emeği geçenlerden Allah razı olsun.",
      time: "Dün 18:20",
      likes: 8,
      isLiked: false,
      color: "border-emerald-500/30"
    }
  ]);

  useEffect(() => {
    // Sunucuyu yormayan sahte ziyaretçi sayacı (Güne göre sabit bir sayı üretir)
    const today = new Date();
    const pseudoRandom = (today.getFullYear() + today.getMonth() + today.getDate()) * 13;
    setDailyVisitors((pseudoRandom % 300) + 142); // 142 ile 442 arası bir sayı
  }, []);

  const handleSendNote = (e) => {
    e.preventDefault();
    if (!username.trim() || !newNote.trim()) return;

    localStorage.setItem('dergah_username', username);

    const newNoteObj = {
      id: Date.now(),
      author: username,
      text: newNote,
      time: "Az önce",
      likes: 0,
      isLiked: false,
      color: "border-[#C5A059]/50" // Yeni eklenen not altın sarısı çerçeveli olur
    };

    setNotes([newNoteObj, ...notes]);
    setNewNote('');
  };

  const handleLike = (id) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          likes: note.isLiked ? note.likes - 1 : note.likes + 1,
          isLiked: !note.isLiked
        };
      }
      return note;
    }));
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-[85vh] animate-fade-in px-2 md:px-0">
      <Helmet>
        <title>Dergâh Defteri | Niyaz ve Dua | OnikiKapı</title>
        <meta name="description" content="Dergâha geldin, bir dua bırak, canların selamını al. Ziyaretçi defterimize notunu düş." />
        <meta property="og:title" content="Dergâh Defteri | Niyaz ve Dua | OnikiKapı" />
        <meta property="og:description" content="Dergâha geldin, bir dua bırak, canların selamını al. Ziyaretçi defterimize notunu düş." />
      </Helmet>

      {/* HEADER & SAYAÇ */}
      <div className="bg-[#0b1b24] border border-[#C5A059]/30 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C5A059]/10 transition-colors"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 bg-[#09303a] border border-[#C5A059] rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.2)]">
              <PenTool size={28} className="text-[#C5A059]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#FDF6E3] font-sans mb-1">Dergâh Defteri</h1>
              <p className="text-slate-400 text-sm font-serif">Niyazını, duanı veya selamını as, canlar şahit olsun.</p>
            </div>
          </div>

          {/* DİNAMİK ZİYARETÇİ SAYACI */}
          <div className="flex items-center gap-3 bg-[#04151a]/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-inner">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest">Bugün Dergâha Gelenler</span>
              <span className="text-[#FDF6E3] font-bold text-lg leading-tight">{dailyVisitors} Can</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SOL TARAF: YENİ NOT YAZMA FORMU */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-gradient-to-br from-[#09303a] to-[#04151a] border border-[#C5A059]/20 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <HandHeart size={20} className="text-[#C5A059]" />
              <h2 className="text-[#FDF6E3] font-bold text-lg font-sans">İz Bırak</h2>
            </div>

            <form onSubmit={handleSendNote} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Rumuz (İsim)</label>
                <input
                  type="text"
                  placeholder="Örn: Garip_Yolcu"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0b1b24] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] transition-colors text-sm"
                  maxLength={20}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Niyazın / Mesajın</label>
                <textarea
                  placeholder="Duanı, selamını veya derdini buraya yaz..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows="4"
                  className="w-full bg-[#0b1b24] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] transition-colors text-sm resize-none custom-scrollbar"
                  maxLength={280}
                  required
                ></textarea>
                <div className="text-right mt-1">
                  <span className={`text-[10px] ${newNote.length >= 280 ? 'text-rose-500' : 'text-slate-500'}`}>
                    {newNote.length} / 280
                  </span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={!newNote.trim() || !username.trim()}
                className="w-full bg-[#C5A059] text-[#04151a] font-bold py-3.5 rounded-xl hover:bg-white transition-all shadow-[0_0_15px_rgba(197,160,89,0.3)] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={18} /> Deftere Yaz
              </button>
            </form>

            <div className="mt-6 flex items-start gap-2 text-left bg-white/5 p-3 rounded-xl border border-white/5">
              <Shield size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400">Yazılanlar manevi hassasiyetlere uygun olmalıdır. Tartışma ve siyaset içeren notlar defterden silinir.</p>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: DUVAR (MASONRY BENZERİ KARTLAR) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2 px-2">
            <Sparkles size={18} className="text-[#C5A059]" />
            <h3 className="text-slate-300 font-bold text-sm uppercase tracking-wider">Son Bırakılan Niyazlar</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <div key={note.id} className={`bg-[#0b1b24]/80 backdrop-blur-md border ${note.color} rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between shadow-lg h-full`}>
                
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-bold text-[#FDF6E3] bg-[#04151a] px-3 py-1 rounded-full text-xs border border-white/10">
                      {note.author}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded-md">{note.time}</span>
                  </div>
                  
                  <p className="text-slate-200 text-sm font-serif leading-relaxed mb-6 whitespace-pre-wrap">
                    "{note.text}"
                  </p>
                </div>

                {/* ETKİLEŞİM BÖLÜMÜ (AMİN / DUA BUTONU) */}
                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-[10px] text-slate-500 italic">Cevaplara kapalıdır.</span>
                  
                  <button 
                    onClick={() => handleLike(note.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                      note.isLiked 
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/50' 
                        : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Heart size={14} className={note.isLiked ? 'fill-rose-400' : ''} />
                    <span>{note.likes} Amin</span>
                  </button>
                </div>
                
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6 text-slate-500 text-xs italic">
            <Flame size={14} className="inline-block mr-1 text-[#C5A059]" />
            Daha eski notlar arşivlenmiştir.
          </div>

        </div>
      </div>
    </div>
  );
}
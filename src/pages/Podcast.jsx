import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Headphones, PlayCircle, BookAudio, Mic2, Flame } from 'lucide-react';

export default function Podcast() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
      <Helmet>
        <title>Dinleti & Podcast | OnikiKapı</title>
        <meta name="description" content="Sesli dualar, mersiyeler, felsefi podcastler ve Ehl-i Beyt külliyatından sesli kitaplar." />
      </Helmet>

      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-[#C5A059]/10 rounded-full mb-2">
          <Headphones size={40} className="text-[#C5A059]" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#FDF6E3] font-sans">Dinleti Merkezi</h1>
        <p className="text-slate-400 font-serif max-w-xl mx-auto">
          Yolda, çalışırken veya dinlenirken... Ehl-i Beyt'in nurlu kelamları, sesli kitaplar ve felsefi sohbetler yakında burada yankılanacak.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kategori Kartı 1 */}
        <div className="bg-[#0b1b24] border border-white/10 rounded-3xl p-6 flex flex-col items-start hover:border-[#C5A059]/50 transition-colors group cursor-pointer">
          <Mic2 size={32} className="text-rose-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-[#FDF6E3] font-sans mb-2">Felsefe Sohbetleri</h3>
          <p className="text-sm text-slate-400 font-serif mb-6 flex-1">İrfan, adalet ve varlık üzerine derinlemesine analizler ve söyleşiler.</p>
          <span className="text-xs font-bold bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full flex items-center gap-2">
            <Flame size={12} className="animate-pulse" /> Çok Yakında
          </span>
        </div>

        {/* Kategori Kartı 2 */}
        <div className="bg-[#0b1b24] border border-white/10 rounded-3xl p-6 flex flex-col items-start hover:border-[#C5A059]/50 transition-colors group cursor-pointer">
          <PlayCircle size={32} className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-[#FDF6E3] font-sans mb-2">Sesli Dualar & Mersiyeler</h3>
          <p className="text-sm text-slate-400 font-serif mb-6 flex-1">Kumeyl, Cevşen-i Kebir ve Ehl-i Beyt mersiyelerinin stüdyo kalitesinde kayıtları.</p>
          <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">Yapım Aşamasında</span>
        </div>
      </div>
    </div>
  );
}
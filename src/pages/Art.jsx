import React from 'react';
import { Feather, PenTool, Music } from 'lucide-react';

export default function Art() {
  return (
    <div className="space-y-8 animate-fade-in text-[#F4EFE0]">
       <div className="text-center py-8">
          <Feather className="w-16 h-16 mx-auto text-[#C5A059] mb-4 opacity-80" />
          <h1 className="text-4xl font-serif font-bold text-[#C5A059]">Sanat ve Edebiyat</h1>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">"Sanat, hakikati aramanın en zarif yoludur."</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kart 1 */}
          <div className="bg-[#162e45] p-6 rounded-2xl border border-[#4A5D75]/30 hover:border-[#C5A059] transition text-center group">
             <div className="w-16 h-16 bg-[#0F2C45] rounded-full flex items-center justify-center mx-auto mb-4 text-pink-400 group-hover:scale-110 transition">
                <PenTool size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2">Hüsn-i Hat</h3>
             <p className="text-gray-400 text-sm">Kalemin ucundan dökülen ilahi ahenk. Geleneksel sanatlarımız.</p>
          </div>

           {/* Kart 2 */}
           <div className="bg-[#162e45] p-6 rounded-2xl border border-[#4A5D75]/30 hover:border-[#C5A059] transition text-center group">
             <div className="w-16 h-16 bg-[#0F2C45] rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400 group-hover:scale-110 transition">
                <Feather size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2">Divan Şiiri</h3>
             <p className="text-gray-400 text-sm">Fuzuli'den Şeyh Galip'e, aşkın ve irfanın dili.</p>
          </div>

           {/* Kart 3 */}
           <div className="bg-[#162e45] p-6 rounded-2xl border border-[#4A5D75]/30 hover:border-[#C5A059] transition text-center group">
             <div className="w-16 h-16 bg-[#0F2C45] rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 group-hover:scale-110 transition">
                <Music size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2">Musiki</h3>
             <p className="text-gray-400 text-sm">Ruhun gıdası, makamların şifası. Ney'in sırrı.</p>
          </div>
       </div>

       {/* Günün Beyiti */}
       <div className="bg-[#C5A059]/10 border border-[#C5A059]/30 p-8 rounded-2xl text-center italic font-serif">
          <p className="text-2xl text-[#C5A059] mb-4">"Aşk derdiyle hoşem el çek ilacımdan tabib,<br/>Kılma derman kim helakim zehri dermanındadır."</p>
          <span className="text-sm text-gray-400">- Fuzuli</span>
       </div>
    </div>
  );
}
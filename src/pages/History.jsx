import React from 'react';
import { Hourglass, Scroll, Landmark } from 'lucide-react';

export default function History() {
  const events = [
    { year: "622", title: "Hicret", desc: "Medeniyetin doğuşu ve İslam takviminin başlangıcı." },
    { year: "1071", title: "Malazgirt Zaferi", desc: "Anadolu'nun kapılarının açılması ve yeni bir çağ." },
    { year: "1299", title: "Osmanlı'nın Kuruluşu", desc: "Bir çınarın filizlenip cihan imparatorluğuna dönüşmesi." },
    { year: "1453", title: "İstanbul'un Fethi", desc: "Çağ kapatıp çağ açan kutlu fetih." },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-[#F4EFE0]">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-[#C5A059]/10 rounded-full text-[#C5A059] border border-[#C5A059]/30">
            <Hourglass size={32} />
        </div>
        <div>
            <h1 className="text-3xl font-serif font-bold text-[#C5A059]">Tarih ve Siyer</h1>
            <p className="text-gray-400">Kökü mazide olan ati.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Sol Sütun: Öne Çıkan Yazı */}
         <div className="bg-[#162e45] p-6 rounded-2xl border border-[#C5A059]/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Landmark size={150}/></div>
            <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase mb-2 block">Haftanın Konusu</span>
            <h2 className="text-2xl font-bold mb-4">Horasan Erenleri Kimdir?</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
                Ahmet Yesevi ocağında pişen, Anadolu'yu mayalayan gönül erleri... Sarı Saltuk'tan Hacı Bektaş'a uzanan irfan yolu.
            </p>
            <button className="bg-[#C5A059] text-[#0F2C45] px-6 py-2 rounded-lg font-bold hover:bg-white transition">Okumaya Başla</button>
         </div>

         {/* Sağ Sütun: Zaman Çizelgesi */}
         <div className="bg-[#162e45]/50 p-6 rounded-2xl border border-[#4A5D75]/30">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Scroll size={20}/> Tarih Şeridi</h3>
            <div className="space-y-6 border-l-2 border-[#C5A059]/20 ml-3 pl-6">
                {events.map((event, i) => (
                    <div key={i} className="relative">
                        <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#C5A059] border-4 border-[#0F2C45]"></span>
                        <span className="text-[#C5A059] font-bold text-sm">{event.year}</span>
                        <h4 className="font-bold text-lg">{event.title}</h4>
                        <p className="text-gray-500 text-sm">{event.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
}
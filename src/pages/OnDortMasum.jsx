import React from 'react';
import { ShieldCheck, Star, Heart, BookOpen } from 'lucide-react';

export default function OnDortMasum() {
  const masumlar = [
    { id: 1, ad: "Hz. Muhammed Mustafa (s.a.a)", unvan: "Hatemu'l Enbiya", aciklama: "Alemlere rahmet, son peygamber." },
    { id: 2, ad: "Hz. Fatıma-tüz Zehra (s.a)", unvan: "Sıddıka-i Kübra", aciklama: "Peygamberimizin kızı, Ehlibeyt'in nuru." },
    { id: 3, ad: "Hz. Ali el-Murtaza (a.s)", unvan: "Şah-ı Merdan", aciklama: "İlim şehrinin kapısı, müminlerin emiri." },
    { id: 4, ad: "Hz. Hasan el-Mücteba (a.s)", unvan: "Kerim-i Ehlibeyt", aciklama: "Ehlibeyt'in ikinci imamı." },
    { id: 5, ad: "Hz. Hüseyin es-Şehid (a.s)", unvan: "Seyyid-üş Şüheda", aciklama: "Hürriyet ve şehadet önderi." },
    { id: 6, ad: "Hz. Ali Zeynel Abidin (a.s)", unvan: "Saccad", aciklama: "İbadet edenlerin süsü." },
    { id: 7, ad: "Hz. Muhammed Bakır (a.s)", unvan: "Bakır'ul Ulum", aciklama: "İlimleri yaran, büyük alim." },
    { id: 8, ad: "Hz. Cafer Sadık (a.s)", unvan: "Sadık", aciklama: "Hakikat mektebinin kurucusu." },
    { id: 9, ad: "Hz. Musa Kazım (a.s)", unvan: "Kazım", aciklama: "Öfkesini yutan, sabır deryası." },
    { id: 10, ad: "Hz. Ali Rıza (a.s)", unvan: "Garib-ül Guraba", aciklama: "Razı olunmuş imam." },
    { id: 11, ad: "Hz. Muhammed Taki (a.s)", unvan: "Cevad", aciklama: "Cömertlik ve takva sahibi." },
    { id: 12, ad: "Hz. Ali Naki (a.s)", unvan: "Hadi", aciklama: "Hidayet rehberi." },
    { id: 13, ad: "Hz. Hasan Askeri (a.s)", unvan: "Zeki", aciklama: "Askeri şehrin nuru." },
    { id: 14, ad: "Hz. Muhammed Mehdi (a.f)", unvan: "Sahib-üz Zaman", aciklama: "Beklenen kurtarıcı, devranın sahibi." }
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20 text-[#F4EFE0]">
      {/* Başlık Kartı */}
      <div className="text-center bg-[#162e45] p-12 rounded-3xl border border-[#C5A059]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5"><Star size={120} /></div>
        <h1 className="text-4xl font-serif font-bold text-[#C5A059] mb-4">14 Masum-u Pak</h1>
        <p className="text-gray-400 max-w-2xl mx-auto italic text-lg leading-relaxed">
          "Onlar Allah’ın tertemiz kıldığı, ilim ve hikmet pınarlarıdır."
        </p>
      </div>

      {/* Masumlar Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {masumlar.map((masum) => (
          <div key={masum.id} className="bg-[#162e45] border border-[#4A5D75]/30 p-6 rounded-2xl hover:border-[#C5A059] transition-all group relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#0F2C45] transition-colors">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{masum.ad}</h3>
                <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest">{masum.unvan}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed border-t border-[#4A5D75]/20 pt-4 italic">
              {masum.aciklama}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
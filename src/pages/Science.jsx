import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Atom, Microscope, BookOpen, AlertTriangle, ChevronRight } from 'lucide-react';

export default function Science() {
  const articles = [
    {
      id: 1,
      title: "Embriyoloji ve Yaratılış Aşamaları",
      desc: "Müminun Suresi'nde geçen yaratılış safhalarının modern embriyoloji ışığında tefekkürü.",
      icon: <Microscope size={24} className="text-spiritual-light" />,
      tag: "Biyoloji"
    },
    {
      id: 2,
      title: "Dağların Jeolojik İşlevi",
      desc: "Nebe Suresi'ndeki 'kazık' benzetmesi ve izostasi teorisi üzerine bir inceleme.",
      icon: <BookOpen size={24} className="text-spiritual-light" />,
      tag: "Jeoloji"
    },
    {
      id: 3,
      title: "Evrenin Genişlemesi",
      desc: "Zariyat Suresi 47. ayet ve Big Bang teorisi bağlamında 'Genişleyen Evren' kavramı.",
      icon: <Atom size={24} className="text-spiritual-light" />,
      tag: "Kozmoloji"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <Helmet>
        <title>İlim ve Bilim | Ehlibeyt Yolu</title>
        <meta name="description" content="Kainat kitabı ile Kur'an ayetlerinin Usuli metodoloji ile tefekkürü." />
      </Helmet>

      {/* --- HERO BÖLÜMÜ --- */}
      <div className="bg-gradient-to-r from-primary-light to-primary p-8 rounded-3xl border border-gold/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5"><Atom size={120}/></div>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-gold mb-4">
          Akıl ve Vahiy Dengesi
        </h1>
        <p className="text-slate-300 max-w-2xl leading-relaxed font-serif text-lg">
          "İlim bir noktadır, onu cahiller çoğaltmıştır." — Hz. Ali (a.s)
          <br/><br/>
          Bu bölümde, kainatın ayetleri (bilim) ile vahyedilen ayetler (Kur'an) arasındaki ahengi, zorlama yorumlardan uzak durarak inceliyoruz.
        </p>
      </div>

      {/* --- TEOLOJİK FİLTRE UYARISI (USULİ METODU) --- */}
      <div className="bg-spiritual-dim/5 border-l-4 border-spiritual p-6 rounded-r-xl flex gap-4 items-start">
        <AlertTriangle className="text-spiritual flex-shrink-0 mt-1" size={24} />
        <div>
          <h3 className="text-spiritual font-bold font-sans mb-1">Metodolojik Uyarı</h3>
          <p className="text-sm text-slate-400 italic">
            Bilimsel teoriler zamanla değişebilir (yanlışlanabilirlik ilkesi), ancak Kur'an hakikati sabittir. 
            Burada yer alan bilgiler, ayetlerin "bilimsel ispatı" değil, güncel ilim ışığında yapılan "tefekkür çalışmalarıdır".
            Kur'an bir fizik kitabı değil, hidayet kitabıdır.
          </p>
        </div>
      </div>

      {/* --- MAKALELER GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item) => (
          <div key={item.id} className="bg-primary-light rounded-2xl p-6 border border-white/5 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-primary border border-white/10 group-hover:border-gold/20 transition-colors">
                {item.icon}
              </div>
              <span className="text-xs font-bold text-gold/80 px-2 py-1 rounded bg-gold/10 border border-gold/10">
                {item.tag}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-sand mb-2 font-sans group-hover:text-gold transition-colors">
              {item.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 font-serif">
              {item.desc}
            </p>

            <button className="text-spiritual-light text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              İncele <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* --- EKLENECEK İÇERİK NOTU --- */}
      <div className="text-center p-8 border-2 border-dashed border-slate-700 rounded-2xl opacity-50">
        <p className="text-slate-400">Yeni makaleler "Usuli Filtre" denetiminden geçtikten sonra eklenecektir.</p>
      </div>

    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Scale, Flower, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 animate-fade-in">
      
      {/* --- HERO (GİRİŞ) BÖLÜMÜ: SUYA YANSIYAN IŞIK --- */}
      <div className="relative py-24 px-6 rounded-3xl overflow-hidden text-center border border-gold/20 shadow-2xl group">
        
        {/* Arka Plan Görseli: Suya Yansıyan Işık */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop')` }} // Örnek su yansıması görseli
        ></div>
        {/* Turkuaz Gradyan Bindirme (Görselin üzerine) */}
        <div className="absolute inset-0 bg-gradient-to-t from-turquoise-dark via-turquoise/80 to-turquoise-dark/60 mix-blend-multiply"></div>

        {/* İçerik */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          
          {/* Büyük Logo: Nur Saçan Kitap */}
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-gold/40 blur-2xl rounded-full animate-pulse-slow"></div>
            <Sparkles size={60} className="text-gold absolute opacity-60 animate-spin-slow" />
            <BookOpen size={50} className="text-gold relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand drop-shadow-sm leading-tight">
            OnikiKapı
          </h1>
          <p className="text-xl md:text-3xl text-slate-200 font-serif leading-relaxed">
            "İlim bir noktadır, onu cahiller çoğaltmıştır."
          </p>
          <p className="text-sm text-turquoise-light tracking-[0.3em] uppercase font-bold">
            Adalet • İlim • Hikmet • Muhabbet
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link to="/library" className="bg-gold text-turquoise-dark px-8 py-4 rounded-full font-bold hover:bg-white transition flex items-center gap-2 shadow-lg hover:shadow-gold/50">
              İlim Şehrine Gir <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* --- KARTLAR (GÜL ve KALEM MOTİFLİ) --- */}
      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Arka Plan Süsü (Silik Gül Motifi) */}
        <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
           <Flower size={300} className="text-turquoise-light rotate-12" />
        </div>

        <FeatureCard 
          icon={<Flower size={32} className="text-rose-300" />} // GÜL MOTİFİ
          title="Manevi Reçeteler ve Muhabbet"
          desc="Ruhsal dinginlik ve ilahi aşk için Ehlibeyt kaynaklı manevi şifa kapısı."
          link="/manevi-receteler"
        />
        <FeatureCard 
          icon={<PenTool size={32} className="text-gold" />} // KALEM MOTİFİ (Kandil değil)
          title="İlim ve Hikmet Kütüphanesi"
          desc="'Oku' emrinin izinde, kadim ve sahih kaynaklara açılan ilim kapısı."
          link="/library"
        />
        <FeatureCard 
          icon={<Scale size={32} className="text-turquoise-light" />} // ADALET (Terazi)
          title="Adalet ve Hakikat Arayışı"
          desc="Evrensel adalet ilkesi ve hakikat üzerine Soru/Cevap kapısı."
          link="/soru-cevap"
        />
      </div>

      {/* --- GÜNÜN HİKMETİ --- */}
      <div className="bg-turquoise-dark p-10 rounded-3xl border border-gold/20 relative overflow-hidden shadow-xl">
        {/* Arka Plan Süsü (Silik Kalem Motifi) */}
        <div className="absolute -bottom-10 -right-10 p-4 opacity-10 rotate-45 pointer-events-none">
           <PenTool size={150} className="text-gold" />
        </div>
        <h3 className="text-gold font-bold font-sans mb-6 text-lg uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={18} /> Günün Hikmeti
        </h3>
        <blockquote className="text-2xl md:text-4xl font-serif text-sand italic leading-relaxed relative z-10">
          "Hiçbir süs, edep kadar güzel değildir."
        </blockquote>
        <p className="text-right text-lg text-turquoise-light mt-6 font-bold relative z-10">— Hz. Ali (a.s)</p>
      </div>

    </div>
  );
}

// Kart Bileşeni (Turkuaz uyumlu)
function FeatureCard({ icon, title, desc, link }) {
  return (
    <Link to={link} className="block group relative z-10">
      <div className="bg-turquoise p-8 rounded-2xl border border-white/10 h-full hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl bg-opacity-80 backdrop-blur-sm">
        <div className="mb-6 p-4 bg-turquoise-dark rounded-xl w-fit group-hover:scale-110 transition-transform border border-gold/20 group-hover:border-gold/50 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-sand mb-3 group-hover:text-gold transition-colors font-sans">{title}</h3>
        <p className="text-slate-200 text-base leading-relaxed font-serif">
          {desc}
        </p>
      </div>
    </Link>
  );
}
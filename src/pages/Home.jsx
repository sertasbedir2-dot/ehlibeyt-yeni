import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, Moon, ArrowRight, DoorOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16 animate-fade-in">
      
      {/* --- HERO (GİRİŞ) BÖLÜMÜ --- */}
      <div className="relative py-20 px-6 rounded-3xl overflow-hidden text-center border border-gold/10 bg-gradient-to-b from-midnight to-[#162e45]">
        
        {/* Arka Plan Efekti (Kapı Sütunları) */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10">
           <div className="w-16 h-full bg-gold/50 blur-3xl"></div>
           <div className="w-16 h-full bg-gold/50 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Logo İkonu - Büyük */}
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto border-2 border-gold/30 animate-pulse-slow">
            <DoorOpen size={40} className="text-gold" />
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand drop-shadow-sm">
            OnikiKapı
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 font-serif leading-relaxed">
            "Ben ilim şehriyim, Ali de onun kapısıdır."
          </p>
          <p className="text-sm text-spiritual-light tracking-widest uppercase font-bold">
            İlim • Hikmet • Marifet
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to="/library" className="bg-gold text-midnight px-8 py-3 rounded-full font-bold hover:bg-white transition flex items-center gap-2">
              Kütüphaneye Gir <ArrowRight size={20} />
            </Link>
            <Link to="/14-masum" className="bg-midnight border border-gold/30 text-gold px-8 py-3 rounded-full font-bold hover:bg-gold/10 transition">
              14 Masum'u Tanı
            </Link>
          </div>
        </div>
      </div>

      {/* --- KARTLAR --- */}
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Moon size={32} className="text-spiritual-light" />}
          title="Manevi Reçeteler"
          desc="Ruhsal sıkıntılar ve manevi dertler için Ehlibeyt kaynaklı şifa duaları."
          link="/manevi-receteler"
        />
        <FeatureCard 
          icon={<BookOpen size={32} className="text-gold" />}
          title="Dijital Kütüphane"
          desc="Tarih, fıkıh ve akaid alanında seçkin eserlere tek tıkla erişim."
          link="/library"
        />
        <FeatureCard 
          icon={<Star size={32} className="text-clay" />}
          title="Soru & Cevap"
          desc="İtikadi ve tarihi konularda merak edilen soruların güvenilir cevapları."
          link="/soru-cevap"
        />
      </div>

      {/* --- GÜNÜN HADİSİ --- */}
      <div className="bg-[#162e45] p-8 rounded-2xl border-l-4 border-gold relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <DoorOpen size={100} />
        </div>
        <h3 className="text-gold font-bold font-sans mb-4 text-lg">Günün Hikmeti</h3>
        <blockquote className="text-xl md:text-2xl font-serif text-sand italic leading-relaxed">
          "İnsanlar uykudadır, öldükleri zaman uyanırlar."
        </blockquote>
        <p className="text-right text-sm text-slate-400 mt-4 font-bold">— Hz. Ali (a.s)</p>
      </div>

    </div>
  );
}

function FeatureCard({ icon, title, desc, link }) {
  return (
    <Link to={link} className="block group">
      <div className="bg-primary-light p-6 rounded-2xl border border-white/5 h-full hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
        <div className="mb-4 p-3 bg-midnight rounded-xl w-fit group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-sand mb-2 group-hover:text-gold transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </Link>
  );
}
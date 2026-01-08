import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { HelpCircle, ExternalLink, Search, AlertCircle, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

export default function SoruCevap() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetva DEĞİL, Genel Kültür ve İtikad Soruları
  const faqs = [
    {
      id: 1,
      question: "Neden mühür (Kerbela toprağı) üzerine secde ediyoruz?",
      answer: "Ehlibeyt fıkhına göre secde, üzerine giyilmeyen ve yenilmeyen, yer cinsinden (toprak, taş, hasır) bir cisim üzerine yapılmalıdır. En faziletli toprak Hz. Hüseyin'in (a.s) şehit edildiği Kerbela toprağı olduğu için, manevi bağ kurmak adına bu tercih edilir. Bu bir şirk değil, Allah'a en alçakgönüllü yakarış biçimidir."
    },
    {
      id: 2,
      question: "Gadir-i Hum olayı nedir?",
      answer: "Hicretin 10. yılında Veda Haccı dönüşünde Hz. Muhammed'in (s.a.a), Allah'ın emriyle Hz. Ali'yi (a.s) kendisinden sonraki veli ve halife olarak tayin ettiği tarihi olaydır. 'Ben kimin mevlası isem, Ali de onun mevlasıdır' hadisi burada söylenmiştir."
    },
    {
      id: 3,
      question: "Ehlibeyt kimlerdir?",
      answer: "Ehlibeyt, Hz. Muhammed (s.a.a), kızı Hz. Fatıma (s.a), damadı Hz. Ali (a.s) ve torunları Hz. Hasan (a.s) ile Hz. Hüseyin (a.s) ve onların soyundan gelen 9 Masum İmam'ı kapsayan 'Ev Halkı'dır. Kur'an-ı Kerim'de Ahzab Suresi 33. ayet (Tathir Ayeti) ile tertemiz oldukları bildirilmiştir."
    },
    {
      id: 4,
      question: "Taklit (Merceiyet) neden gereklidir?",
      answer: "Dini konularda uzman olmayan bir kişinin (Mukallid), ömrünü ilme adamış bir müctehidin (Merce-i Taklid) fetvalarına uymasına taklit denir. Tıpkı hastalanınca doktora gitmek gibi, fıkhi konularda da uzmana başvurmak akılcı bir yoldur."
    }
  ];

  // Resmi Fetva Makamları Linkleri
  const authorities = [
    { name: "Ayetullah Uzma Sistani", url: "https://www.sistani.org/turkish/", color: "border-spiritual" },
    { name: "Ayetullah Uzma Hamaney", url: "https://www.leader.ir/tr", color: "border-gold" }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Helmet>
        <title>Soru & Cevap | Ehlibeyt Yolu</title>
        <meta name="description" content="Ehlibeyt inancı hakkında sık sorulan itikadi ve tarihi soruların cevapları." />
      </Helmet>

      {/* --- HERO BÖLÜMÜ --- */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-gold">Merak Ettikleriniz</h1>
        <p className="text-slate-300 max-w-2xl mx-auto font-serif text-lg">
          İtikadi, tarihi ve kültürel konularda sıkça sorulan soruların cevapları.
        </p>
      </div>

      {/* --- YASAL/ŞERİ UYARI (DISCLAIMER) - Düzeltildi: bg-[#162e45] --- */}
      <div className="bg-[#162e45] border-l-4 border-clay p-6 rounded-r-xl mx-auto max-w-4xl shadow-lg flex gap-4 items-start">
        <AlertCircle className="text-clay flex-shrink-0 mt-1" size={24} />
        <div className="space-y-2">
          <h3 className="text-clay font-bold font-sans text-lg">Önemli Hatırlatma</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Bu platform bir <strong>Fetva Makamı</strong> değildir. Burada yer alan bilgiler sadece genel kültür, tarih ve inanç esaslarına (Akaid) yöneliktir. 
            <br/><br/>
            Helal, haram, namaz, oruç, ticaret gibi fıkhi (şeri) sorularınız ve kişisel durumlarınız için lütfen taklit ettiğiniz <strong>Merce-i Taklid</strong>'in resmi ofislerine veya temsilcilerine başvurunuz.
          </p>
        </div>
      </div>

      {/* --- MERCEİYET YÖNLENDİRME KARTLARI --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {authorities.map((auth, idx) => (
          <a 
            key={idx} 
            href={auth.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-4 bg-midnight rounded-xl border ${auth.color} hover:bg-[#162e45] transition group`}
          >
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-slate-400 group-hover:text-gold transition-colors" />
              <span className="font-bold text-sand group-hover:text-white transition-colors">{auth.name} Resmi Sitesi</span>
            </div>
            <ExternalLink size={16} className="text-slate-500" />
          </a>
        ))}
      </div>

      {/* --- SIK SORULAN SORULAR (AKORDİYON) --- */}
      <div className="max-w-3xl mx-auto mt-12 space-y-4">
        <div className="relative mb-8">
             {/* Düzeltildi: bg-[#162e45] */}
             <input 
                type="text" 
                placeholder="Konu ara (Örn: Gadir-i Hum, Secde...)" 
                className="w-full bg-[#162e45] border border-gold/20 rounded-xl py-3 px-12 text-sand placeholder-slate-500 focus:outline-none focus:border-gold/50 transition"
                onChange={(e) => setSearchTerm(e.target.value)}
             />
             <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
        </div>

        {faqs
          .filter(faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((faq, index) => (
          /* Düzeltildi: bg-[#162e45] */
          <div key={faq.id} className="bg-[#162e45] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition"
            >
              <span className="font-bold text-lg text-sand font-sans pr-4">{faq.question}</span>
              {openIndex === index ? <ChevronUp className="text-gold" /> : <ChevronDown className="text-slate-500" />}
            </button>
            
            {openIndex === index && (
              <div className="p-5 pt-0 text-slate-300 leading-relaxed font-serif border-t border-white/5 animate-fade-in bg-midnight/30">
                <div className="mt-4">{faq.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
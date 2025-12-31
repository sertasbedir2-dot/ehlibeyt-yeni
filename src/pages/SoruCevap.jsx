import React, { useState } from 'react';
import { MessageSquare, Send, User, HelpCircle, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function SoruCevap() {
  const [formSent, setFormSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Örnek Cevaplanmış Sorular (İleride sorular.js gibi ayrı bir dosyaya alınabilir)
  const faqData = [
    {
      id: 1,
      soru: "Ehlibeyt sevgisinin imandaki yeri nedir?",
      cevap: "Ehlibeyt sevgisi, Peygamber efendimizin emanetine sahip çıkmak ve hidayet yolunda yürümektir. Hadis-i şerifte buyurulduğu üzere: 'Sizin aranızda iki ağır emanet bırakıyorum; biri Allah'ın kitabı, diğeri ise itretim olan Ehlibeytimdir.'",
      yazan: "Talip_01"
    },
    {
      id: 2,
      soru: "Zikir çekmenin manevi kalp üzerindeki etkisi nasıldır?",
      cevap: "Zikir, paslanmış olan kalbin cilasıdır. 'Kalpler ancak Allah'ı anmakla huzur bulur.' (Ra'd, 28) ayeti mucibince, düzenli zikir kalbi dünya kirlerinden arındırır.",
      yazan: "Derviş_Yolcu"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    // İleride buraya form verilerini bir e-posta servisine gönderme kodu eklenebilir
  };

  return (
    <div className="space-y-12 animate-fade-in text-[#F4EFE0] pb-20">
      
      {/* BAŞLIK PANELİ */}
      <div className="bg-[#162e45] p-10 rounded-3xl border border-[#C5A059]/20 text-center relative overflow-hidden">
        <HelpCircle size={150} className="absolute -top-10 -right-10 opacity-5 text-[#C5A059]" />
        <h1 className="text-4xl font-serif font-bold text-[#C5A059] mb-4 uppercase tracking-wider">İlim ve Hikmet Kapısı</h1>
        <p className="text-gray-400 max-w-2xl mx-auto italic leading-relaxed">
          "Bilmiyorsanız zikir ehline sorun." (Nahl, 43). Aklınıza takılan manevi, ilmi veya tarihi soruları çekinmeden bize yöneltebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* SOL: SORU GÖNDERME FORMU */}
        <div className="bg-[#162e45] p-8 rounded-3xl border border-[#C5A059]/10 shadow-2xl relative">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-[#C5A059]/20 pb-4">
            <MessageSquare className="text-[#C5A059]" /> Soru Gönder
          </h2>
          
          {formSent ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-fade-in text-center">
              <div className="bg-green-500/20 p-4 rounded-full">
                <CheckCircle size={50} className="text-green-500" />
              </div>
              <div>
                <p className="font-bold text-2xl text-white mb-2">Selamun Aleyküm!</p>
                <p className="text-gray-400 text-sm">Sorunuz ilmî heyetimize ulaşmıştır. Cevaplandığında bu sayfada anonim olarak yayınlanacaktır.</p>
              </div>
              <button 
                onClick={() => setFormSent(false)} 
                className="text-[#C5A059] font-bold underline decoration-dotted underline-offset-4 hover:text-white transition"
              >
                Yeni Bir Soru Daha Sor
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative group">
                <User size={18} className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#C5A059] transition" />
                <input 
                  type="text" 
                  required
                  placeholder="İsminiz veya Mahlasınız" 
                  className="w-full bg-[#0F2C45] border border-[#4A5D75] rounded-2xl p-4 pl-12 focus:border-[#C5A059] outline-none transition text-sm"
                />
              </div>
              <div className="relative">
                <textarea 
                  required
                  rows="6"
                  placeholder="Sorunuzu detaylıca buraya yazınız..."
                  className="w-full bg-[#0F2C45] border border-[#4A5D75] rounded-2xl p-4 focus:border-[#C5A059] outline-none transition resize-none text-sm leading-relaxed"
                ></textarea>
              </div>
              <button className="w-full bg-[#C5A059] text-[#0F2C45] font-bold py-4 rounded-2xl hover:bg-white transition flex items-center justify-center gap-2 shadow-lg transform active:scale-95">
                <Send size={18} /> Soruyu İlme Arz Et
              </button>
              <p className="text-[10px] text-gray-500 text-center italic">
                * Sorularınız gizlilik prensibi gereği kişisel bilgileriniz olmadan yayınlanır.
              </p>
            </form>
          )}
        </div>

        {/* SAĞ: CEVAPLANMIŞ SORULAR (FAQ) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 pl-2 border-l-4 border-[#C5A059]">
             Hikmet Havuzu
          </h2>
          
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-[#162e45] rounded-2xl border border-[#4A5D75]/20 overflow-hidden transition-all duration-300 shadow-lg"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#0F2C45] transition"
                >
                  <div className="flex gap-4 items-center">
                    <HelpCircle size={20} className="text-[#C5A059] shrink-0" />
                    <span className="font-bold text-sm leading-tight">{item.soru}</span>
                  </div>
                  {openFaq === index ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                </button>
                
                {openFaq === index && (
                  <div className="p-6 bg-[#0F2C45]/50 border-t border-[#4A5D75]/20 animate-slide-down">
                    <p className="text-sm text-gray-400 leading-relaxed mb-4 italic">
                      {item.cevap}
                    </p>
                    <div className="flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest border-t border-white/5 pt-3">
                      <span>Cevaplayan: Heyet-i İrfan</span>
                      <span>Soran: {item.yazan}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Manevi Hatırlatıcı */}
          <div className="mt-8 p-6 bg-gradient-to-br from-[#162e45] to-[#0F2C45] rounded-3xl border border-[#C5A059]/10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition"><Info size={60}/></div>
             <p className="text-xs text-gray-400 italic leading-relaxed">
               "İlim bir hazinedir, anahtarı ise sormaktır. Sorun ki Allah size merhamet etsin." (Hz. Muhammed s.a.a)
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}
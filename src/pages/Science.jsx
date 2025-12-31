import React, { useState } from 'react';
import { Microscope, Atom, Globe, ArrowRight, X } from 'lucide-react';

export default function Science() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    { 
        title: "Kainat Kitabını Okumak", 
        summary: "Bilim, yaratılışın şifrelerini çözen bir anahtardır. Fizikten metafiziğe yolculuk.", 
        content: "Kainat, Yaratıcı'nın sıfatlarının tecelli ettiği büyük bir kitaptır. Bir fizikçi atomu incelerken aslında ilahi sanatın detaylarına şahitlik eder. Modern bilim, 'Nasıl?' sorusuna cevap verirken, irfan geleneğimiz 'Niçin?' sorusunu da buna ekler. Bu denge kurulduğunda bilim, kuru bir bilgi yığını olmaktan çıkıp marifete dönüşür. Galilei'den Newton'a, İbn-i Heysem'den Biruni'ye kadar hakikati arayan herkes, aslında bu kitabın sayfalarını çevirmiştir.",
        icon: <Globe />, 
        color: "bg-blue-500" 
    },
    { 
        title: "Sibernetik ve El-Cezeri", 
        summary: "İslam altın çağının mühendislik harikaları ve günümüze etkileri.", 
        content: "Cizreli büyük mucit El-Cezeri (1136-1206), sibernetiğin ilk adımlarını atan dahi bir mühendistir. 'Kitab-ül Hiyel' adlı eserinde, su saatlerinden abdest alma otomatlarına kadar 50'den fazla harika makinenin çizimini yapmıştır. Onun yaptığı 'Fil Saati', sadece zamanı göstermekle kalmaz, aynı zamanda evrenselliği simgeler. Bugün kullandığımız robotik teknolojilerin temelleri, yüzyıllar önce bu topraklarda atılmıştır.",
        icon: <Atom />, 
        color: "bg-purple-500" 
    },
    { 
        title: "Akıl ve Kalp Dengesi", 
        summary: "Sadece akılla gidilen yol çorak, sadece kalple gidilen yol karanlıktır.", 
        content: "İnsan, tek kanatla uçamayan bir kuş gibidir. Bir kanadı akıl, diğer kanadı kalptir. Batı medeniyeti aklı yüceltip kalbi ihmal ederken, bazı mistik akımlar aklı tamamen devre dışı bırakmıştır. Hakikat medeniyeti ise bu ikisini 'tevhid' potasında eritir. Akıl ışık gibidir, yolu aydınlatır; kalp ise ayak gibidir, o yolda yürümenizi sağlar. Biri olmadan diğeri eksiktir.",
        icon: <Microscope />, 
        color: "bg-emerald-500" 
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-[#F4EFE0]">
      
      {/* Sayfa Başlığı */}
      <div className="bg-[#162e45] p-8 rounded-3xl border border-[#C5A059]/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
           <h1 className="text-4xl font-serif font-bold text-[#C5A059] mb-4">İlim ve Bilim</h1>
           <p className="text-lg text-gray-300 max-w-2xl">"İlim ilim bilmektir, ilim kendin bilmektir." düsturuyla madde ve mana arasındaki köprüyü kuruyoruz.</p>
        </div>
        <div className="absolute right-0 top-0 opacity-10 text-[#C5A059]">
            <Microscope size={200} />
        </div>
      </div>

      {/* Makale Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedArticle(item)} // Tıklayınca seçili yap
            className="bg-[#162e45] p-6 rounded-2xl border border-[#4A5D75]/30 hover:border-[#C5A059] hover:-translate-y-1 transition group cursor-pointer h-full flex flex-col"
          >
            <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white mb-4 shadow-lg`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#C5A059] transition-colors">{item.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.summary}</p>
            <div className="flex items-center text-[#C5A059] font-medium text-sm gap-1 mt-auto">
                Oku <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* --- OKUMA MODU (MODAL) --- */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedArticle(null)}>
            <div 
                className="bg-[#162e45] w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl border border-[#C5A059] shadow-2xl relative"
                onClick={(e) => e.stopPropagation()} // İçeriğe tıklayınca kapanmasın
            >
                {/* Kapat Butonu */}
                <button 
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 bg-[#0F2C45] text-gray-400 hover:text-white p-2 rounded-full transition hover:rotate-90"
                >
                    <X size={24}/>
                </button>

                {/* İçerik */}
                <div className="p-8">
                    <div className={`w-16 h-16 ${selectedArticle.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg mx-auto`}>
                        {React.cloneElement(selectedArticle.icon, { size: 32 })}
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#C5A059] mb-6 text-center">{selectedArticle.title}</h2>
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed text-justify">
                        {selectedArticle.content}
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-[#4A5D75]/30 text-center">
                        <button 
                            onClick={() => setSelectedArticle(null)}
                            className="px-8 py-3 bg-[#C5A059] text-[#0F2C45] font-bold rounded-xl hover:bg-white transition"
                        >
                            Okumayı Bitir
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}
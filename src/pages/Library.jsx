import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Book, Download, Eye, Filter, Search, BookOpen } from 'lucide-react';

export default function Library() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");

  // --- KİTAP VERİTABANI ---
  const books = [
    {
      id: 1,
      title: "Kur'an-ı Kerim ve Meali",
      author: "İlahi Kelam",
      category: "Kutsal Kitap",
      cover: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1000&auto=format&fit=crop",
      desc: "İnsanlığa son rehber, hidayet kaynağı Kur'an-ı Kerim'in Türkçe meali.",
      pages: 604,
      downloadLink: "#",
      readLink: "/kitap-oku" // Kitap okuma sayfasına yönlendirme (İleride yapılabilir)
    },
    {
      id: 2,
      title: "Nehсü'l Belâga",
      author: "Hz. Ali (a.s)",
      category: "Hadis & Hikmet",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop",
      desc: "Hz. Ali'nin hutbeleri, mektupları ve hikmetli sözlerinin derlendiği eşsiz eser.",
      pages: 480,
      downloadLink: "#",
      readLink: "#"
    },
    {
      id: 3,
      title: "Sahife-i Seccadiye",
      author: "İmam Zeynel Abidin (a.s)",
      category: "Dua & Münacat",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
      desc: "Ehl-i Beyt'in Zebur'u olarak bilinen, maneviyat dolu dualar hazinesi.",
      pages: 260,
      downloadLink: "#",
      readLink: "#"
    },
    {
      id: 4,
      title: "Kerbela Şehitleri",
      author: "Kolektif",
      category: "Tarih",
      cover: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000&auto=format&fit=crop",
      desc: "Aşura günü İmam Hüseyin ile şehadete yürüyen 72 yarenin hayatı.",
      pages: 320,
      downloadLink: "#",
      readLink: "#"
    },
    {
      id: 5,
      title: "Tevhid Dersleri",
      author: "Allame Tabatabai",
      category: "Akaid",
      cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop",
      desc: "İslam inancının temeli olan Tevhid inancının derinlemesine analizi.",
      pages: 210,
      downloadLink: "#",
      readLink: "#"
    },
    {
      id: 6,
      title: "Mafatih-ul Cinan",
      author: "Şeyh Abbas Kummi",
      category: "Dua & Münacat",
      cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop",
      desc: "Cennetlerin Anahtarları. Günlük dualar, zikirler ve ameller kitabı.",
      pages: 850,
      downloadLink: "#",
      readLink: "#"
    }
  ];

  // Kategoriler
  const categories = ["Tümü", "Kutsal Kitap", "Hadis & Hikmet", "Tarih", "Dua & Münacat", "Akaid"];

  // Filtreleme
  const filteredBooks = books.filter(book => {
    const matchCategory = activeCategory === "Tümü" || book.category === activeCategory;
    const matchSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Helmet>
        <title>Kütüphane | Ehlibeyt Yolu</title>
        <meta name="description" content="Ehlibeyt kaynaklı temel eserler, dualar ve tarih kitapları dijital kütüphanesi." />
      </Helmet>

      {/* --- HERO BÖLÜMÜ --- */}
      <div className="text-center space-y-4 py-8 bg-gradient-to-b from-midnight to-[#162e45] rounded-b-3xl border-b border-gold/10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 mb-2">
          <BookOpen size={16} /> <span className="text-xs font-bold tracking-widest uppercase">İlim Hazinesi</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand">
          Dijital Kütüphane
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto font-serif text-lg leading-relaxed">
          "Kitaplar, akılların bahçeleridir." <span className="text-gold text-sm">— Hz. Ali (a.s)</span>
        </p>

        {/* Arama Çubuğu */}
        <div className="max-w-md mx-auto relative mt-6">
          <input 
            type="text" 
            placeholder="Kitap veya yazar ara..." 
            className="w-full bg-[#162e45] border border-gold/20 rounded-xl py-3 px-12 text-sand placeholder-slate-500 focus:outline-none focus:border-gold/50 transition shadow-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-gold" size={20} />
        </div>
      </div>

      {/* --- KATEGORİ SEÇİMİ --- */}
      <div className="flex flex-wrap justify-center gap-3 px-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
              activeCategory === cat 
              ? "bg-gold text-midnight border-gold" 
              : "bg-midnight text-slate-400 border-white/5 hover:border-gold/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- KİTAP RAFLARI (GRID) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="group bg-[#162e45] rounded-2xl p-4 border border-white/5 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 shadow-xl flex flex-col h-full">
              
              {/* Kitap Kapağı */}
              <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4 shadow-lg mx-auto">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-mono">
                  {book.pages} Syf.
                </div>
              </div>

              {/* Kitap Bilgileri */}
              <div className="flex-grow space-y-2 text-center">
                <h3 className="text-xl font-bold text-sand font-sans group-hover:text-gold transition-colors">{book.title}</h3>
                <p className="text-sm text-spiritual-light font-bold uppercase tracking-wider">{book.author}</p>
                <p className="text-xs text-slate-400 font-serif leading-relaxed line-clamp-2 px-2">{book.desc}</p>
              </div>

              {/* Aksiyon Butonları */}
              <div className="mt-6 flex gap-2">
                <button className="flex-1 bg-white/5 hover:bg-gold hover:text-midnight text-sand py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-gold">
                  <Eye size={16} /> Oku
                </button>
                <button className="flex-1 bg-spiritual/20 hover:bg-spiritual hover:text-white text-spiritual-light py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 border border-spiritual/30">
                  <Download size={16} /> PDF
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-500">
            <Book size={48} className="mx-auto mb-4 opacity-50" />
            <p>Aradığınız kriterlere uygun kitap bulunamadı.</p>
          </div>
        )}
      </div>

    </div>
  );
}
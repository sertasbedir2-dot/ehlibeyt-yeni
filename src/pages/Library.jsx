import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Book, Download, Eye, Search, BookOpen } from 'lucide-react';

export default function Library() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");

  const books = [
    { id: 1, title: "Kur'an-ı Kerim ve Meali", author: "İlahi Kelam", category: "Kutsal Kitap", cover: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1000", desc: "İnsanlığa son rehber, hidayet kaynağı Kur'an-ı Kerim'in Türkçe meali.", pages: 604, downloadLink: "/pdfs/kuran.pdf", readLink: "/pdfs/kuran.pdf" },
    { id: 2, title: "Nehcü'l Belâga", author: "Hz. Ali (a.s)", category: "Hadis & Hikmet", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000", desc: "Hz. Ali'nin hutbeleri, mektupları ve hikmetli sözlerinin derlendiği eşsiz eser.", pages: 480, downloadLink: "/pdfs/nehcul-belaga.pdf", readLink: "/pdfs/nehcul-belaga.pdf" },
    { id: 3, title: "Sahife-i Seccadiye", author: "İmam Zeynel Abidin (a.s)", category: "Dua & Münacat", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000", desc: "Ehl-i Beyt'in Zebur'u olarak bilinen, maneviyat dolu dualar hazinesi.", pages: 260, downloadLink: "#", readLink: "#" },
    { id: 4, title: "Kerbela Şehitleri", author: "Kolektif", category: "Tarih", cover: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000", desc: "Aşura günü İmam Hüseyin ile şehadete yürüyen 72 yarenin hayatı.", pages: 320, downloadLink: "#", readLink: "#" },
    { id: 5, title: "Tevhid Dersleri", author: "Allame Tabatabai", category: "Akaid", cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000", desc: "İslam inancının temeli olan Tevhid inancının derinlemesine analizi.", pages: 210, downloadLink: "#", readLink: "#" },
    { id: 6, title: "Mafatih-ul Cinan", author: "Şeyh Abbas Kummi", category: "Dua & Münacat", cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000", desc: "Cennetlerin Anahtarları. Günlük dualar, zikirler ve ameller kitabı.", pages: 850, downloadLink: "#", readLink: "#" }
  ];

  const categories = ["Tümü", "Kutsal Kitap", "Hadis & Hikmet", "Tarih", "Dua & Münacat", "Akaid"];

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

      <div className="text-center space-y-4 py-8 bg-gradient-to-b from-[#0f172a] to-[#162e45] rounded-b-3xl border-b border-[#FFD700]/10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 mb-2">
          <BookOpen size={16} /> <span className="text-xs font-bold tracking-widest uppercase">İlim Hazinesi</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f5f5dc] via-[#FFD700] to-[#f5f5dc]">Dijital Kütüphane</h1>
        <p className="text-slate-300 max-w-2xl mx-auto font-serif text-lg leading-relaxed">"Kitaplar, akılların bahçeleridir." <span className="text-[#FFD700] text-sm">— Hz. Ali (a.s)</span></p>
        <div className="max-w-md mx-auto relative mt-6">
          <input type="text" placeholder="Kitap veya yazar ara..." className="w-full bg-[#162e45] border border-[#FFD700]/20 rounded-xl py-3 px-12 text-[#f5f5dc] placeholder-slate-500 focus:outline-none focus:border-[#FFD700]/50 transition shadow-lg" onChange={(e) => setSearchTerm(e.target.value)} />
          <Search className="absolute left-4 top-3.5 text-[#FFD700]" size={20} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 px-4">
        {categories.map((cat, idx) => (
          <button key={idx} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${activeCategory === cat ? "bg-[#FFD700] text-[#0f172a] border-[#FFD700]" : "bg-[#0f172a] text-slate-400 border-white/5 hover:border-[#FFD700]/30 hover:text-white"}`}>{cat}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="group bg-[#162e45] rounded-2xl p-4 border border-white/5 hover:border-[#FFD700]/40 transition-all duration-500 hover:-translate-y-2 shadow-xl flex flex-col h-full">
              <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4 shadow-lg mx-auto">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-mono">{book.pages} Syf.</div>
              </div>
              <div className="flex-grow space-y-2 text-center">
                <h3 className="text-xl font-bold text-[#f5f5dc] font-sans group-hover:text-[#FFD700] transition-colors">{book.title}</h3>
                <p className="text-sm text-[#93c5fd] font-bold uppercase tracking-wider">{book.author}</p>
                <p className="text-xs text-slate-400 font-serif leading-relaxed line-clamp-2 px-2">{book.desc}</p>
              </div>
              <div className="mt-6 flex gap-2">
                <a href={book.readLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/5 hover:bg-[#FFD700] hover:text-[#0f172a] text-[#f5f5dc] py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-[#FFD700]">
                  <Eye size={16} /> Oku
                </a>
                <a href={book.downloadLink} download className="flex-1 bg-[#60a5fa]/20 hover:bg-[#60a5fa] hover:text-white text-[#93c5fd] py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 border border-[#60a5fa]/30">
                  <Download size={16} /> PDF
                </a>
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

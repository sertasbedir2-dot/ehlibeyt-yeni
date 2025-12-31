import React from 'react';
import { BookOpen, Download, Book, Eye } from 'lucide-react'; // Eye ikonu eklendi
import { useNavigate } from 'react-router-dom'; // navigate eklendi

export default function Library() {
  const navigate = useNavigate(); // Yönlendirme için tanımladık

  const books = [
    {
      id: 1000,
      title: "Kevser'in Sırrı: Yok Oluşa Karşı",
      author: "Dar-ı Hakikat Özel",
      category: "Özel Yayın",
      desc: "Varlık ve hiçlik arasında, yok oluşa karşı hakikatin sırrına ermek isteyenler için bir yol haritası.",
      fileUrl: "/dosyalar/kevserin_sirri.pdf",
      coverUrl: "/dosyalar/kevser_kapak.jpg",
      isNew: true,
    },
    { id: 1, title: "Mesnevi-i Şerif", author: "Mevlana", category: "Tasavvuf", color: "bg-emerald-800", desc: "Aşkın ve hikmetin şaheseri.", fileUrl: "#" },
    { id: 2, title: "Makalat", author: "Hacı Bektaş Veli", category: "Tasavvuf", color: "bg-blue-900", desc: "Dört kapı kırk makam öğretisi.", fileUrl: "#" },
    { id: 3, title: "Safahat", author: "Mehmet Akif Ersoy", category: "Şiir", color: "bg-red-900", desc: "Bir milletin hürriyet haykırışı.", fileUrl: "#" },
    { id: 4, title: "Nutuk", author: "Mustafa Kemal Atatürk", category: "Tarih", color: "bg-slate-800", desc: "Türkiye Cumhuriyeti'nin kuruluş belgesi.", fileUrl: "#" },
    { id: 5, title: "Divan-ı Hikmet", author: "Hoca Ahmet Yesevi", category: "Hikmet", color: "bg-indigo-900", desc: "Türk tasavvufunun pınarı.", fileUrl: "#" }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-[#F4EFE0]">
      <div className="text-center bg-[#162e45] p-10 rounded-3xl border border-[#C5A059]/20 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-5"><Book size={100}/></div>
         <h1 className="text-4xl font-serif font-bold text-[#C5A059] mb-4">Gönül Kütüphanesi</h1>
         <p className="text-gray-400 max-w-2xl mx-auto italic">
            "Oku" emriyle başlayan medeniyetimizin seçkin eserleri ve özel yayınlarımız.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
              <div key={book.id} className="bg-[#162e45] rounded-2xl overflow-hidden border border-[#4A5D75]/30 hover:border-[#C5A059] transition shadow-lg flex flex-col group relative">
                  {book.isNew && (
                      <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10 animate-pulse shadow-lg">
                          YENİ ÇIKTI
                      </div>
                  )}

                  <div className="h-48 relative overflow-hidden">
                    {book.coverUrl ? (
                        <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-500" />
                    ) : (
                        <div className={`w-full h-full ${book.color || 'bg-gray-800'} flex items-center justify-center group-hover:scale-105 transition duration-500`}>
                            <BookOpen size={48} className="text-white/80"/>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#162e45] via-transparent to-transparent opacity-60"></div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 relative z-10 bg-[#162e45]">
                      <div className="text-[#C5A059] text-xs font-bold mb-1 uppercase tracking-wider">{book.category}</div>
                      <h3 className="text-xl font-bold text-white mb-1 leading-tight">{book.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{book.author}</p>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 italic">
                          {book.desc}
                      </p>

                      {/* --- OKUMA BUTONU GÜNCELLENDİ --- */}
                      <button 
                        onClick={() => navigate('/kitap-oku', { state: { pdfPath: book.fileUrl, title: book.title } })}
                        className="w-full bg-[#C5A059] text-[#0F2C45] py-3 rounded-xl hover:bg-white transition font-bold flex items-center justify-center gap-2 shadow-md active:scale-95"
                      >
                          <Eye size={18}/> Şimdi Oku
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
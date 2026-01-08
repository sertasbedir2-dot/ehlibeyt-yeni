import React, { useState } from 'react';
import { BookOpen, Video, FileText, PenTool, GraduationCap, CheckCircle, Play, Download, Users, Lock } from 'lucide-react';

export default function Courses() {
  const [activeTab, setActiveTab] = useState('arapca'); // Varsayılan sekme
  const [showForm, setShowForm] = useState(false);

  // KURS VERİLERİ
  const courses = {
    arapca: [
      { id: 1, title: "Pratik Arapça - Başlangıç", instructor: "Mehmet Hoca", progress: 60, lessons: 12, students: 120, status: "active" },
      { id: 2, title: "Kuran Arapçası ve Gramer", instructor: "İlahiyat Fakültesi", progress: 30, lessons: 24, students: 85, status: "active" },
    ],
    ingilizce: [
      { id: 3, title: "Akademik Okuma (Reading)", instructor: "Dr. Sarah Smith", progress: 0, lessons: 10, students: 200, status: "locked" },
      { id: 4, title: "Daily Conversation", instructor: "Yabancı Dil Enst.", progress: 0, lessons: 15, students: 150, status: "locked" },
    ],
    farsca: [
      { id: 5, title: "Mesnevi Okumaları", instructor: "Prof. Dr. Cihan Okuyucu", progress: 10, lessons: 18, students: 300, status: "active" },
      { id: 6, title: "Farsça Şiir ve Edebiyat", instructor: "İran Edebiyatı Mrk.", progress: 0, lessons: 8, students: 90, status: "locked" },
    ]
  };

  // Ders İçeriği Örneği (Aktif olan kurs için)
  const currentLessons = [
    { title: "Ders 1: Harfler ve Mahreçler", duration: "14:20", type: "video" },
    { title: "Ders 1 Notları (PDF)", size: "2.4 MB", type: "doc" },
    { title: "1. Ünite Tarama Sınavı", questions: 20, type: "quiz" },
    { title: "Ders 2: Kelime Yapısı", duration: "18:45", type: "video" },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-[#F4EFE0]">
      
      {/* ÜST BANNER */}
      <div className="bg-[#162e45] rounded-3xl border border-[#C5A059]/30 p-8 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
         <h1 className="text-4xl font-serif font-bold text-[#C5A059] mb-4 flex items-center justify-center gap-3">
            <GraduationCap size={40}/> Dar-ı Hakikat Akademisi
         </h1>
         <p className="text-gray-400 max-w-2xl mx-auto">
            "Beşikten mezara kadar ilim öğreniniz." düsturuyla; klasik dilleri ve modern ilimleri harmanlıyoruz.
         </p>
         
         <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-[#C5A059] text-[#0F2C45] px-6 py-3 rounded-xl font-bold hover:bg-white transition shadow-lg flex items-center gap-2"
            >
               <Users size={20}/> Canlı Kursa Kayıt Ol
            </button>
            <button className="bg-[#0F2C45] border border-[#C5A059] text-[#C5A059] px-6 py-3 rounded-xl font-bold hover:bg-[#C5A059] hover:text-[#0F2C45] transition flex items-center gap-2">
               <CheckCircle size={20}/> Sertifika Sorgula
            </button>
         </div>
      </div>

      {/* DİL SEKMELERİ */}
      <div className="flex justify-center gap-4 border-b border-[#4A5D75]/30 pb-1">
         {['arapca', 'ingilizce', 'farsca'].map((lang) => (
            <button 
               key={lang}
               onClick={() => setActiveTab(lang)}
               className={`px-6 py-3 rounded-t-xl font-bold transition capitalize ${activeTab === lang ? 'bg-[#C5A059] text-[#0F2C45]' : 'text-gray-400 hover:text-white hover:bg-[#162e45]'}`}
            >
               {lang === 'arapca' ? 'Arapça' : lang === 'ingilizce' ? 'İngilizce' : 'Farsça'}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* SOL: KURS LİSTESİ */}
         <div className="lg:col-span-1 space-y-4">
            <h3 className="font-bold text-[#C5A059] mb-4">Müfredat & Kurslar</h3>
            {courses[activeTab].map((course) => (
               <div key={course.id} className={`p-4 rounded-xl border transition cursor-pointer group ${course.status === 'locked' ? 'bg-[#162e45]/50 border-gray-700 opacity-70' : 'bg-[#162e45] border-[#C5A059]/50 hover:border-[#C5A059]'}`}>
                  <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-lg">{course.title}</h4>
                     {course.status === 'locked' ? <Lock size={16} className="text-gray-500"/> : <Play size={16} className="text-[#C5A059]"/>}
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{course.instructor}</p>
                  
                  {/* İlerleme Çubuğu */}
                  <div className="w-full bg-[#0F2C45] h-2 rounded-full overflow-hidden">
                     <div className="bg-[#C5A059] h-full" style={{width: `${course.progress}%`}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                     <span>%{course.progress} Tamamlandı</span>
                     <span>{course.lessons} Ders</span>
                  </div>
               </div>
            ))}
         </div>

         {/* SAĞ: DERS İÇERİĞİ (VİDEO & DOKÜMAN) */}
         <div className="lg:col-span-2 bg-[#162e45] rounded-3xl border border-[#4A5D75]/30 p-6">
            <div className="mb-6 border-b border-[#4A5D75]/30 pb-4">
               <h2 className="text-2xl font-bold mb-2">Pratik Arapça - 1. Hafta</h2>
               <p className="text-gray-400 text-sm">Bu bölümde harflerin çıkış yerlerini ve temel okuma kurallarını öğreneceğiz.</p>
            </div>

            <div className="space-y-4">
               {currentLessons.map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between bg-[#0F2C45] p-4 rounded-xl hover:bg-[#1f3b55] transition group">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lesson.type === 'video' ? 'bg-red-900/30 text-red-400' : lesson.type === 'quiz' ? 'bg-purple-900/30 text-purple-400' : 'bg-blue-900/30 text-blue-400'}`}>
                           {lesson.type === 'video' ? <Video size={20}/> : lesson.type === 'quiz' ? <PenTool size={20}/> : <FileText size={20}/>}
                        </div>
                        <div>
                           <h4 className="font-bold">{lesson.title}</h4>
                           <span className="text-xs text-gray-500">
                              {lesson.type === 'video' ? `Video • ${lesson.duration}` : lesson.type === 'quiz' ? `Sınav • ${lesson.questions} Soru` : `PDF • ${lesson.size}`}
                           </span>
                        </div>
                     </div>
                     <button className="bg-[#162e45] px-4 py-2 rounded-lg text-sm font-bold border border-[#4A5D75]/50 group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition">
                        {lesson.type === 'video' ? 'İzle' : lesson.type === 'quiz' ? 'Sınava Başla' : 'İndir'}
                     </button>
                  </div>
               ))}
            </div>

            {/* Canlı Ders Alanı */}
            <div className="mt-8 bg-gradient-to-r from-green-900/20 to-[#0F2C45] p-6 rounded-2xl border border-green-500/30">
               <h3 className="text-green-400 font-bold flex items-center gap-2 mb-2"><Users/> Canlı Soru & Cevap</h3>
               <p className="text-sm text-gray-300 mb-4">Her Cumartesi 21:00'da Mehmet Hoca ile canlı pratik yapıyoruz.</p>
               <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-500 transition">
                  Yayına Katıl (Zoom)
               </button>
            </div>
         </div>
      </div>

      {/* KAYIT FORMU MODALI (Basit Gösterim) */}
      {showForm && (
         <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-[#162e45] p-8 rounded-3xl border border-[#C5A059] max-w-md w-full relative">
               <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">X</button>
               <h2 className="text-2xl font-bold text-[#C5A059] mb-4">Ön Kayıt Formu</h2>
               <form className="space-y-4">
                  <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-[#0F2C45] border border-gray-600 p-3 rounded-xl focus:border-[#C5A059] outline-none"/>
                  <input type="email" placeholder="E-posta Adresiniz" className="w-full bg-[#0F2C45] border border-gray-600 p-3 rounded-xl focus:border-[#C5A059] outline-none"/>
                  <select className="w-full bg-[#0F2C45] border border-gray-600 p-3 rounded-xl focus:border-[#C5A059] outline-none">
                     <option>Arapça Pratik</option>
                     <option>Farsça Şiir</option>
                     <option>İngilizce Okuma</option>
                  </select>
                  <button className="w-full bg-[#C5A059] text-[#0F2C45] font-bold py-3 rounded-xl hover:bg-white transition">Kaydı Tamamla</button>
               </form>
            </div>
         </div>
      )}

    </div>
  );
}
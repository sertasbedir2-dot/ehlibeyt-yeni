import React, { useState, useEffect } from 'react';
import { Award, RefreshCcw, CheckCircle, ArrowRight, Info, User, Trophy, Timer, Heart, Book, Shield, Star } from 'lucide-react';
import { soruHavuzu } from '../data/sorular';

export default function Quiz() {
  const [userName, setUserName] = useState(localStorage.getItem('quiz_user_name') || '');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ehlibeyt'); // Varsayılan
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [leaderboard, setLeaderboard] = useState(JSON.parse(localStorage.getItem('quiz_leaderboard')) || []);

  const allQuestions = soruHavuzu;

  // Kategori Bilgileri ve İkonları
  const categoryMeta = {
    ehlibeyt: { name: "Ehlibeyt", icon: <Heart size={20} />, desc: "İmamlar ve Siyer" },
    fikih: { name: "Fıkıh", icon: <Book size={20} />, desc: "İbadet ve Hükümler" },
    tarih: { name: "Tarih", icon: <Shield size={20} />, desc: "İslam ve Ehlibeyt Tarihi" },
    masumlar: { name: "14 Masum", icon: <Star size={20} />, desc: "Hayatları ve Hikmetleri" }
  };

  const getRank = (finalScore) => {
    const total = allQuestions[activeCategory].length;
    const ratio = finalScore / total;
    if (ratio === 1) return { title: "Arif-i Billah", color: "text-yellow-400" };
    if (ratio >= 0.7) return { title: "Talip", color: "text-blue-400" };
    return { title: "Muhib", color: "text-green-400" };
  };

  useEffect(() => {
    if (isGameStarted && timeLeft > 0 && !isAnswered && !showScore) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswerOptionClick(false);
    }
  }, [timeLeft, isAnswered, showScore, isGameStarted]);

  const handleStartGame = (e) => {
    e.preventDefault();
    if (userName.trim() && activeCategory) {
      localStorage.setItem('quiz_user_name', userName);
      setIsGameStarted(true);
    }
  };

  const handleAnswerOptionClick = (isCorrect) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(isCorrect);
    if (isCorrect) setScore(score + 1);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setTimeLeft(30);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < allQuestions[activeCategory].length) {
      setCurrentQuestion(nextQuestion);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const rankData = getRank(score);
    const newEntry = {
      name: userName,
      score: score,
      category: categoryMeta[activeCategory].name,
      rank: rankData.title,
      date: new Date().toLocaleDateString()
    };
    const updatedLeaderboard = [...leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 5);
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('quiz_leaderboard', JSON.stringify(updatedLeaderboard));
    setShowScore(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false);
    setTimeLeft(30);
    setIsGameStarted(false); // Başa, kategori seçimine döndür
  };

  // --- GİRİŞ EKRANI: İSİM VE KATEGORİ SEÇİMİ ---
  if (!isGameStarted) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-[#162e45] rounded-3xl border border-[#C5A059]/30 shadow-2xl">
        <div className="text-center mb-10">
          <Trophy size={60} className="mx-auto text-[#C5A059] mb-4" />
          <h2 className="text-3xl font-serif font-bold text-[#C5A059]">Kendini Sına</h2>
          <p className="text-gray-400 mt-2 italic text-sm">İlmini seç, yolculuğa başla.</p>
        </div>

        <form onSubmit={handleStartGame} className="space-y-8">
          {/* İsim Girişi */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2 flex items-center gap-2">
              <User size={14}/> Kimliğiniz
            </label>
            <div className="relative">
              <input 
                type="text" 
                required
                placeholder="Adınız veya Mahlasınız" 
                className="w-full bg-[#0F2C45] border border-[#4A5D75] rounded-2xl p-4 pl-6 text-white outline-none focus:border-[#C5A059] transition-all"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          {/* Kategori Seçimi */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Yarışma Alanı Seçiniz</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(allQuestions).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                    activeCategory === cat 
                    ? 'bg-[#C5A059] border-[#C5A059] text-[#0F2C45]' 
                    : 'bg-[#0F2C45] border-[#4A5D75]/30 text-gray-400 hover:border-[#C5A059]/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${activeCategory === cat ? 'bg-[#0F2C45] text-[#C5A059]' : 'bg-[#162e45]'}`}>
                    {categoryMeta[cat]?.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm uppercase tracking-tight">{categoryMeta[cat]?.name}</div>
                    <div className={`text-[10px] ${activeCategory === cat ? 'text-[#0F2C45]/70' : 'text-gray-500'}`}>{categoryMeta[cat]?.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#C5A059] text-[#0F2C45] font-black py-5 rounded-2xl hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-xl uppercase tracking-widest"
          >
            İlim Yolculuğuna Başla
          </button>
        </form>
      </div>
    );
  }

  // --- OYUN EKRANI (Mevcut yapınızın üzerine inşa edildi) ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in text-[#F4EFE0] pb-12">
      <div className="lg:col-span-2 space-y-6">
        {/* Üst Bilgi Barı */}
        <div className="bg-[#162e45] p-6 rounded-2xl border border-[#C5A059]/20 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-[#C5A059] p-2 rounded-lg text-[#0F2C45]"><User size={20}/></div>
            <div>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Yarışmacı</p>
               <span className="font-bold">{userName}</span>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-6 py-2 rounded-xl border-2 ${timeLeft < 10 ? 'border-red-500 text-red-500 animate-pulse' : 'border-[#C5A059]/30 text-[#C5A059]'}`}>
            <Timer size={18} /> <span className="font-mono font-bold">{timeLeft}s</span>
          </div>
        </div>

        {/* Soru Kartı */}
        <div className="bg-[#162e45] p-8 rounded-3xl border border-[#C5A059]/20 shadow-2xl min-h-[500px] flex flex-col">
          {showScore ? (
            <div className="text-center space-y-8 my-auto py-10">
              <Award size={100} className="mx-auto text-[#C5A059] animate-bounce" />
              <div>
                <h2 className={`text-5xl font-serif font-black mb-2 ${getRank(score).color}`}>{getRank(score).title}</h2>
                <p className="text-xl text-gray-400">"{categoryMeta[activeCategory].name}" Alanındaki Başarın:</p>
                <div className="text-6xl font-black text-white mt-4">{score} <span className="text-2xl text-gray-600">/ {allQuestions[activeCategory].length}</span></div>
              </div>
              <button onClick={resetQuiz} className="px-12 py-5 bg-[#C5A059] text-[#0F2C45] font-black rounded-2xl hover:bg-white transition-all mx-auto flex items-center gap-3 shadow-2xl uppercase tracking-tighter">
                <RefreshCcw size={20} /> Kategori Değiştir / Yeniden Dene
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-2 px-3 py-1 bg-[#0F2C45] rounded-lg border border-[#C5A059]/20">
                    <span className="text-[#C5A059]">{categoryMeta[activeCategory].icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">{categoryMeta[activeCategory].name}</span>
                 </div>
                 <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Soru {currentQuestion + 1} / {allQuestions[activeCategory].length}</div>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-10 leading-relaxed text-center">
                {allQuestions[activeCategory][currentQuestion].questionText}
              </h2>

              <div className="grid gap-4 mt-auto">
                {allQuestions[activeCategory][currentQuestion].options.map((option, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleAnswerOptionClick(option.isCorrect)} 
                    disabled={isAnswered} 
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex justify-between items-center ${
                      isAnswered 
                        ? option.isCorrect 
                            ? 'border-green-500 bg-green-900/30 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                            : 'border-red-900 bg-red-900/10 opacity-40' 
                        : 'border-[#4A5D75]/50 hover:border-[#C5A059] hover:bg-[#0F2C45] hover:scale-[1.01]'
                    }`}
                  >
                    <span className="font-medium">{option.answerText}</span>
                    {isAnswered && option.isCorrect && <CheckCircle className="text-green-500" size={24} />}
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div className="mt-8 p-6 bg-blue-900/20 border-2 border-blue-500/30 rounded-2xl animate-fade-in">
                  <div className="flex gap-2 text-blue-400 mb-2 items-center text-xs font-bold uppercase tracking-widest">
                    <Info size={16} /> Hikmet Notu
                  </div>
                  <p className="text-sm text-gray-300 italic font-medium leading-relaxed">"{allQuestions[activeCategory][currentQuestion].info}"</p>
                  <button onClick={handleNextQuestion} className="w-full mt-6 py-4 bg-[#C5A059] text-[#0F2C45] font-black rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-transform active:scale-95 shadow-xl">
                    {currentQuestion === allQuestions[activeCategory].length - 1 ? "Sınavı Bitir" : "Sıradaki Hikmet"} <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Sağ Panel: Liderlik Kürsüsü */}
      <div className="space-y-6">
        <div className="bg-[#162e45] p-6 rounded-3xl border border-[#C5A059]/20 shadow-xl sticky top-24">
          <h3 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2 font-serif border-b border-[#C5A059]/10 pb-4">
            <Trophy size={24} /> Liderlik Kürsüsü
          </h3>
          <div className="space-y-4">
            {leaderboard.length === 0 ? (
              <p className="text-gray-500 text-sm text-center italic py-4">Henüz kayıtlı derece yok.</p>
            ) : (
              leaderboard.map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-[#0F2C45] rounded-2xl border border-[#4A5D75]/20 hover:border-[#C5A059]/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${idx === 0 ? 'bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'bg-[#162e45] text-gray-400'}`}>{idx + 1}</span>
                    <div>
                      <p className="text-sm font-black leading-none">{entry.name}</p>
                      <p className="text-[9px] text-[#C5A059] mt-1.5 uppercase tracking-tighter font-black opacity-80">{entry.rank} - {entry.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-mono font-black text-xl">{entry.score}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
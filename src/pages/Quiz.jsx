import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Trophy, Heart, Clock, Flame, Zap, HelpCircle, 
  ArrowRight, RefreshCw, Check, X 
} from 'lucide-react';
// DİKKAT: Veriyi quizData dosyasından çekiyoruz
import { quizQuestions } from '../data/quizData';

export default function Quiz() {
  // --- OYUN STATE'LERİ ---
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing', 'finished'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(15);
  
  // --- CEVAP VE JOKER STATE'LERİ ---
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [jokers, setJokers] = useState({ fifty: true, hint: true });
  const [eliminatedOptions, setEliminatedOptions] = useState([]); // %50 jokeri için
  const [showHint, setShowHint] = useState(false);

  // Ses Efektleri (Opsiyonel)
  const playSound = (type) => {
    // Ses dosyaları eklenirse buraya kod yazılır
  };

  // --- ZAMANLAYICI MOTORU ---
  useEffect(() => {
    let interval;
    if (gameState === 'playing' && !isAnswered && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !isAnswered) {
      handleWrongAnswer(); // Süre bitti
    }
    return () => clearInterval(interval);
  }, [timer, gameState, isAnswered]);

  // --- OYUN MANTIĞI ---
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setCurrentQIndex(0);
    resetTurn();
  };

  const resetTurn = () => {
    setTimer(15);
    setIsAnswered(false);
    setSelectedOption(null);
    setEliminatedOptions([]);
    setShowHint(false);
  };

  const handleAnswer = (index) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    setSelectedOption(index);
    // Veri güvenliği kontrolü
    if (!quizQuestions || !quizQuestions[currentQIndex]) return;

    const correctIndex = quizQuestions[currentQIndex].correct;

    if (index === correctIndex) {
      // DOĞRU
      setScore(score + (10 * (1 + streak * 0.1))); // Streak bonusu
      setStreak(streak + 1);
      playSound('correct');
    } else {
      // YANLIŞ
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    setStreak(0);
    setLives((prev) => prev - 1);
    setIsAnswered(true);
    playSound('wrong');

    if (lives - 1 <= 0) {
      setTimeout(() => setGameState('finished'), 1500);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
      resetTurn();
    } else {
      setGameState('finished');
    }
  };

  // --- JOKERLER ---
  const useFiftyFifty = () => {
    if (!jokers.fifty || isAnswered) return;
    
    const correctIndex = quizQuestions[currentQIndex].correct;
    const allOptions = [0, 1, 2, 3];
    const wrongOptions = allOptions.filter(i => i !== correctIndex);
    
    // Rastgele 2 yanlış şık seçip ele
    const shuffledWrong = wrongOptions.sort(() => 0.5 - Math.random());
    const toEliminate = shuffledWrong.slice(0, 2);
    
    setEliminatedOptions(toEliminate);
    setJokers({ ...jokers, fifty: false });
  };

  const useHint = () => {
    if (!jokers.hint || isAnswered) return;
    setShowHint(true);
    setJokers({ ...jokers, hint: false });
  };

  // --- RENDER ---
  const currentQ = quizQuestions[currentQIndex];
  
  // Hata önleyici yükleme ekranı
  if (!currentQ && gameState === 'playing') return <div className="text-white text-center p-10">Soru Yükleniyor...</div>;

  const progressPercent = ((currentQIndex) / quizQuestions.length) * 100;

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 animate-fade-in relative overflow-hidden">
      <Helmet>
        <title>Bilgi Yarışması | OnikiKapı</title>
      </Helmet>

      {/* Arka Plan Efekti */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-900/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-xl w-full max-w-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative z-10">
        
        {/* --- OYUN GİRİŞİ --- */}
        {gameState === 'intro' && (
          <div className="p-12 text-center space-y-6">
            <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse border-2 border-amber-500/30">
              <Trophy size={48} className="text-amber-500" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">
              Bilgini Sına
            </h1>
            <p className="text-slate-300 text-lg">
              Ehlibeyt kültürü ve tarihi üzerine bilginizi test etmeye hazır mısınız?
            </p>
            <div className="flex justify-center gap-4 text-sm text-slate-400">
               <span className="flex items-center gap-1"><Clock size={16} className="text-blue-400"/> 15 Saniye</span>
               <span className="flex items-center gap-1"><Heart size={16} className="text-red-400"/> 3 Can</span>
               <span className="flex items-center gap-1"><Zap size={16} className="text-yellow-400"/> Jokerler</span>
            </div>
            <button onClick={startGame} className="bg-amber-500 text-slate-900 px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-400">
              Yarışmaya Başla
            </button>
          </div>
        )}

        {/* --- OYUN EKRANI --- */}
        {gameState === 'playing' && (
          <div className="p-6 md:p-8">
            {/* Üst Bar: Can, Skor, Süre */}
            <div className="flex justify-between items-center mb-6 bg-slate-800/50 p-3 rounded-2xl border border-white/5">
                <div className="flex items-center gap-1 text-red-500">
                    {[...Array(lives)].map((_, i) => <Heart key={i} size={24} fill="currentColor" />)}
                    {[...Array(3 - lives)].map((_, i) => <Heart key={i} size={24} className="opacity-20" />)}
                </div>
                
                <div className="flex flex-col items-center">
                    <div className={`text-2xl font-bold font-mono ${timer <= 5 ? 'text-red-500 animate-pulse' : 'text-amber-100'}`}>
                        {timer}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">Saniye</div>
                </div>

                <div className="flex items-center gap-2">
                    {streak > 1 && (
                        <div className="flex items-center gap-1 text-orange-500 font-bold animate-bounce">
                            <Flame size={20} fill="currentColor" /> x{streak}
                        </div>
                    )}
                    <div className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-lg font-bold">
                        {Math.floor(score)} P
                    </div>
                </div>
            </div>

            {/* İlerleme Barı */}
            <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
               <div className="h-full bg-amber-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${progressPercent}%` }}></div>
            </div>

            {/* Soru */}
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-8 font-sans leading-relaxed min-h-[80px]">
              {currentQ.question}
            </h2>

            {/* İpucu Alanı */}
            {showHint && (
                <div className="mb-6 p-4 bg-blue-900/30 border-l-4 border-blue-400 text-blue-200 text-sm rounded-r-lg animate-fade-in flex gap-3 items-start">
                    <HelpCircle className="shrink-0 mt-0.5" size={18} />
                    <p>{currentQ.hint}</p>
                </div>
            )}

            {/* Şıklar Grid */}
            <div className="grid gap-3">
              {currentQ.options.map((option, index) => {
                if (eliminatedOptions.includes(index)) return null; // %50 ile elenenleri gizle

                let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-amber-500/30";
                
                if (isAnswered) {
                   if (index === currentQ.correct) btnClass = "bg-green-500/20 border-green-500 text-green-200";
                   else if (index === selectedOption) btnClass = "bg-red-500/20 border-red-500 text-red-200";
                   else btnClass = "opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${btnClass}`}
                  >
                    <span className="font-serif text-lg text-slate-200">{option}</span>
                    {isAnswered && index === currentQ.correct && <Check size={20} className="text-green-400" />}
                    {isAnswered && index === selectedOption && index !== currentQ.correct && <X size={20} className="text-red-400" />}
                  </button>
                )
              })}
            </div>

            {/* Alt Kontroller (Jokerler & İleri) */}
            <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-3">
                    <button 
                        onClick={useFiftyFifty}
                        disabled={!jokers.fifty || isAnswered}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${jokers.fifty ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 hover:bg-purple-500/40' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'}`}
                        title="%50 Joker"
                    >
                        <span className="font-mono">%50</span>
                    </button>
                    <button 
                        onClick={useHint}
                        disabled={!jokers.hint || isAnswered}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${jokers.hint ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 hover:bg-blue-500/40' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'}`}
                        title="İpucu"
                    >
                        <HelpCircle size={16} /> İpucu
                    </button>
                </div>

                {isAnswered && (
                    <button onClick={nextQuestion} className="bg-amber-500 text-slate-900 px-6 py-2 rounded-xl font-bold hover:bg-white transition flex items-center gap-2 animate-bounce shadow-lg">
                        Sonraki <ArrowRight size={18} />
                    </button>
                )}
            </div>
          </div>
        )}

        {/* --- SONUÇ EKRANI --- */}
        {gameState === 'finished' && (
          <div className="p-12 text-center space-y-6 animate-fade-in">
             <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping"></div>
                <div className="relative bg-slate-900 border-4 border-amber-500 rounded-full w-full h-full flex items-center justify-center">
                    <Trophy size={60} className="text-amber-500" />
                </div>
             </div>
             
             <div>
                <h2 className="text-3xl font-bold text-amber-100 mb-2">Oyun Bitti!</h2>
                <p className="text-slate-400">Toplam Skor</p>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-700 font-mono my-2 drop-shadow-lg">
                    {Math.floor(score)}
                </div>
                <div className="flex justify-center gap-4 text-sm text-slate-400 mt-4">
                    <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                        <span className="block text-green-400 font-bold text-lg">{score > 0 ? Math.floor(score / 10) : 0}</span>
                        Doğru
                    </div>
                    <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                        <span className="block text-red-400 font-bold text-lg">{3 - lives}</span>
                        Yanlış
                    </div>
                </div>
             </div>

             <button onClick={startGame} className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 mt-4">
                 <RefreshCw size={20} /> Yeniden Oyna
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
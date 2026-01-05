import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Trophy, Heart, Clock, Flame, Zap, HelpCircle, 
  ArrowRight, RefreshCw, Check, X, Share2, Download 
} from 'lucide-react';
import { quizQuestions } from '../data/quizData';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';

export default function Quiz() {
  // --- OYUN STATE'LERİ ---
  const [gameState, setGameState] = useState('intro');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(15);

  // --- CEVAP VE JOKER STATE'LERİ ---
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [jokers, setJokers] = useState({ fifty: true, hint: true });
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  
  // --- PAYLAŞIM STATE'LERİ ---
  const [isSharing, setIsSharing] = useState(false);
  const resultCardRef = useRef(null);

  // --- ZAMANLAYICI MOTORU ---
  useEffect(() => {
    let interval;
    if (gameState === 'playing' && !isAnswered && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !isAnswered) {
      handleWrongAnswer();
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
    
    // Veri kontrolü (Mobil çökmesini önler)
    if (!quizQuestions || !quizQuestions[currentQIndex]) return;

    const correctIndex = quizQuestions[currentQIndex].correct;
    
    if (index === correctIndex) {
      setScore(score + (10 * (1 + streak * 0.1)));
      setStreak(streak + 1);
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    setStreak(0);
    setLives((prev) => prev - 1);
    setIsAnswered(true);
    
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

  // --- PAYLAŞIM MOTORU (MOBİL OPTİMİZE) ---
  const handleShare = async () => {
    setIsSharing(true);
    if (resultCardRef.current) {
      try {
        // Mobilde aşırı yüksek çözünürlük çökmeye neden olabilir, scale ayarı
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        const canvas = await html2canvas(resultCardRef.current, {
            backgroundColor: "#0f172a", 
            scale: isMobile ? 1.5 : 2, // Mobilde performansı koru
            useCORS: true // Resimlerin yüklenmesini bekle
        });
        
        const image = canvas.toDataURL("image/png");

        if (navigator.share) {
            const blob = await (await fetch(image)).blob();
            const file = new File([blob], "onikikapi-skor.png", { type: "image/png" });
            await navigator.share({
                title: 'OnikiKapı Bilgi Yarışması',
                text: `Ehlibeyt bilgi yarışmasında ${Math.floor(score)} puan aldım! Sen de dene:`,
                files: [file],
                url: 'https://www.onikikapi.com/'
            });
        } else {
            const link = document.createElement('a');
            link.href = image;
            link.download = 'onikikapi-skor.png';
            link.click();
        }
      } catch (error) {
        console.error("Paylaşım hatası:", error);
        alert("Paylaşım sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
    setIsSharing(false);
  };

  // --- RENDER HAZIRLIK ---
  const currentQ = quizQuestions[currentQIndex];

  // Veri yüklenmediyse güvenli çıkış
  if (!currentQ && gameState === 'playing') return <div className="text-white text-center p-10">Soru Yükleniyor...</div>;

  const progressPercent = ((currentQIndex) / quizQuestions.length) * 100;

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 animate-fade-in relative overflow-hidden bg-[#0f172a] text-slate-200 font-sans">
      <Helmet>
        <title>Bilgi Yarışması | OnikiKapı</title>
      </Helmet>

      {/* --- GİRİŞ EKRANI (INTRO) --- */}
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
          <button onClick={startGame} className="bg-amber-500 text-slate-900 px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-400">
            Yarışmaya Başla
          </button>
        </div>
      )}

      {/* --- OYUN EKRANI (PLAYING) --- */}
      {gameState === 'playing' && (
        <div className="p-6 md:p-8 w-full max-w-2xl">
          {/* Üst Bar */}
          <div className="flex justify-between items-center mb-6 bg-slate-800/50 p-3 rounded-2xl border border-white/5">
              <div className="flex items-center gap-1 text-red-500">
                  {[...Array(lives)].map((_, i) => <Heart key={i} size={24} fill="currentColor" />)}
                  {[...Array(3 - lives)].map((_, i) => <Heart key={`lost-${i}`} size={24} className="opacity-20" />)}
              </div>
              <div className="flex flex-col items-center">
                  <div className={`text-2xl font-bold font-mono ${timer <= 5 ? 'text-red-500 animate-pulse' : 'text-amber-100'}`}>{timer}</div>
              </div>
              <div className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-lg font-bold">{Math.floor(score)} P</div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
             <div className="h-full bg-amber-500 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
          </div>

          {/* Soru */}
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-8 font-sans leading-relaxed min-h-[80px]">
            {currentQ.question}
          </h2>

          {/* İpucu */}
          {showHint && (
              <div className="mb-6 p-4 bg-blue-900/30 border-l-4 border-blue-400 text-blue-200 text-sm rounded-r-lg animate-fade-in flex gap-3 items-start">
                  <HelpCircle className="shrink-0 mt-0.5" size={18} />
                  <p>{currentQ.hint}</p>
              </div>
          )}

          {/* Şıklar */}
          <div className="grid gap-3">
            {currentQ.options.map((option, index) => {
              if (eliminatedOptions.includes(index)) return null;
              
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

          {/* Alt Kontroller */}
          <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-3">
                  <button 
                    onClick={useFiftyFifty} 
                    disabled={!jokers.fifty || isAnswered} 
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${jokers.fifty ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 hover:bg-purple-500/40' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'}`}
                  >
                    %50
                  </button>
                  <button 
                    onClick={useHint} 
                    disabled={!jokers.hint || isAnswered} 
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${jokers.hint ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 hover:bg-blue-500/40' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'}`}
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

      {/* --- SONUÇ EKRANI (FINISHED) --- */}
      {gameState === 'finished' && (
        <div className="p-12 text-center space-y-6 animate-fade-in max-w-md w-full relative z-20">
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
           </div>

           <div className="flex gap-4 justify-center">
               <button onClick={startGame} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2">
                   <RefreshCw size={20} /> Tekrar
               </button>
               <button onClick={handleShare} disabled={isSharing} className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg">
                   {isSharing ? 'Hazırlanıyor...' : navigator.share ? <><Share2 size={20} /> Paylaş</> : <><Download size={20} /> İndir</>}
               </button>
           </div>

           {/* --- GİZLİ PAYLAŞIM KARTI (Kullanıcı Görmez) --- */}
           <div style={{ position: 'absolute', top: 0, left: 0, zIndex: -50, opacity: 0, pointerEvents: 'none' }}>
               <div ref={resultCardRef} className="w-[600px] h-[800px] bg-[#0f172a] p-10 flex flex-col items-center justify-between border-8 border-amber-500/30 relative overflow-hidden">
                   {/* Arkaplan Efekti */}
                   <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                   <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-amber-500/20 rounded-full blur-[100px]"></div>
                   
                   {/* Logo & Başlık */}
                   <div className="text-center z-10 mt-8">
                       <h1 className="text-5xl font-bold text-amber-500 mb-2 font-sans tracking-tight">OnikiKapı</h1>
                       <p className="text-2xl text-slate-300 tracking-[0.3em] uppercase">İlim Şehri</p>
                   </div>

                   {/* Skor */}
                   <div className="text-center z-10 bg-white/5 w-full py-8 rounded-3xl border border-white/10">
                       <p className="text-slate-400 text-xl mb-2">BİLGİ YARIŞMASI SKORU</p>
                       <div className="text-8xl font-bold text-white font-mono">{Math.floor(score)}</div>
                       <div className="flex justify-center gap-8 mt-6 text-2xl">
                           <div className="text-green-400 font-bold">{Math.floor(score / 10)} Doğru</div>
                           <div className="text-red-400 font-bold">{3 - lives} Yanlış</div>
                       </div>
                   </div>

                   {/* Footer & QR */}
                   <div className="flex items-center gap-6 z-10 bg-black/30 p-6 rounded-2xl border border-white/5 w-full">
                       <div className="bg-white p-2 rounded-lg">
                           <QRCodeSVG value="https://www.onikikapi.com/" size={100} />
                       </div>
                       <div className="text-left">
                           <p className="text-2xl font-bold text-white mb-1">Sen de Katıl!</p>
                           <p className="text-amber-500 text-xl font-mono">www.onikikapi.com</p>
                       </div>
                   </div>
               </div>
           </div>

        </div>
      )}
    </div>
  );
}
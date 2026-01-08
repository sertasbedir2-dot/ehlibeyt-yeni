import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Trophy, Heart, Clock, Flame, Zap, HelpCircle, 
  ArrowRight, RefreshCw, Check, X, Share2, Download 
} from 'lucide-react';
import { quizQuestions } from '../data/quizData';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';

export default function Quiz() {
  const [gameState, setGameState] = useState('intro'); 
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(15);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [jokers, setJokers] = useState({ fifty: true, hint: true });
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  
  // MODAL KONTROLÜ
  const [showShareModal, setShowShareModal] = useState(false);

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

  const currentQ = quizQuestions[currentQIndex];
  if (!currentQ && gameState === 'playing') return <div className="text-white text-center p-10">Soru Yükleniyor...</div>;
  const progressPercent = ((currentQIndex) / quizQuestions.length) * 100;

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 animate-fade-in relative overflow-hidden">
      <Helmet>
        <title>Bilgi Yarışması | OnikiKapı</title>
      </Helmet>

      {/* --- PAYLAŞIM PENCERESİ (MODAL) --- */}
      {showShareModal && (
        <QuizShareModal 
            score={score} 
            correct={Math.floor(score / 10)} 
            wrong={3 - lives}
            onClose={() => setShowShareModal(false)} 
        />
      )}

      {/* Arka Plan */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-900/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-xl w-full max-w-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative z-10">
        
        {/* --- GİRİŞ --- */}
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

        {/* --- OYUN --- */}
        {gameState === 'playing' && (
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 bg-slate-800/50 p-3 rounded-2xl border border-white/5">
                <div className="flex items-center gap-1 text-red-500">
                    {[...Array(lives)].map((_, i) => <Heart key={i} size={24} fill="currentColor" />)}
                    {[...Array(3 - lives)].map((_, i) => <Heart key={i} size={24} className="opacity-20" />)}
                </div>
                <div className="flex flex-col items-center">
                    <div className={`text-2xl font-bold font-mono ${timer <= 5 ? 'text-red-500 animate-pulse' : 'text-amber-100'}`}>{timer}</div>
                </div>
                <div className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-lg font-bold">{Math.floor(score)} P</div>
            </div>

            <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
               <div className="h-full bg-amber-500 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-8 font-sans leading-relaxed min-h-[80px]">
              {currentQ.question}
            </h2>

            {showHint && (
                <div className="mb-6 p-4 bg-blue-900/30 border-l-4 border-blue-400 text-blue-200 text-sm rounded-r-lg animate-fade-in flex gap-3 items-start">
                    <HelpCircle className="shrink-0 mt-0.5" size={18} />
                    <p>{currentQ.hint}</p>
                </div>
            )}

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
                  <button key={index} onClick={() => handleAnswer(index)} disabled={isAnswered} className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${btnClass}`}>
                    <span className="font-serif text-lg text-slate-200">{option}</span>
                    {isAnswered && index === currentQ.correct && <Check size={20} className="text-green-400" />}
                    {isAnswered && index === selectedOption && index !== currentQ.correct && <X size={20} className="text-red-400" />}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-3">
                    <button onClick={useFiftyFifty} disabled={!jokers.fifty || isAnswered} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${jokers.fifty ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 hover:bg-purple-500/40' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'}`}>%50</button>
                    <button onClick={useHint} disabled={!jokers.hint || isAnswered} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${jokers.hint ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 hover:bg-blue-500/40' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'}`}><HelpCircle size={16} /> İpucu</button>
                </div>
                {isAnswered && (
                    <button onClick={nextQuestion} className="bg-amber-500 text-slate-900 px-6 py-2 rounded-xl font-bold hover:bg-white transition flex items-center gap-2 animate-bounce shadow-lg">Sonraki <ArrowRight size={18} /></button>
                )}
            </div>
          </div>
        )}

        {/* --- SONUÇ EKRANI --- */}
        {gameState === 'finished' && (
          <div className="p-12 text-center space-y-6 animate-fade-in relative z-20">
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
                 <button 
                    onClick={() => setShowShareModal(true)} 
                    className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg"
                 >
                     <Share2 size={20} /> Skoru Paylaş
                 </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SKOR KARTI BİLEŞENİ (YENİLENMİŞ - DEVASA PUNTO) ---
function ScoreCardContent({ score, correct, wrong }) {
    return (
        <div className="w-[1080px] h-[1920px] bg-[#0F172A] flex flex-col items-center justify-between text-center relative overflow-hidden font-sans">
            {/* Arka Plan */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]"></div>
            
            {/* Üst Kısım: Logo ve İsim - BÜYÜTÜLDÜ */}
            <div className="z-10 mt-40 flex flex-col items-center w-full px-12">
                <div className="p-10 border-[8px] border-amber-500 rounded-full mb-10 bg-[#0F172A] shadow-[0_0_60px_rgba(245,158,11,0.4)]">
                    <Trophy size={160} className="text-amber-500" />
                </div>
                {/* İSİM BURADA PATLIYOR */}
                <h3 className="text-amber-500 text-[7rem] font-black tracking-[0.15em] uppercase mb-4 drop-shadow-2xl leading-tight">
                    OnikiKapı
                </h3>
                <p className="text-slate-300 text-4xl tracking-[0.5em] uppercase font-light">Bilgi Yarışması</p>
            </div>

            {/* Orta Kısım: Skor */}
            <div className="z-10 flex flex-col items-center justify-center w-full px-12">
                <div className="bg-white/5 border-[6px] border-amber-500/30 rounded-[4rem] p-20 w-full max-w-4xl backdrop-blur-md shadow-2xl">
                    <p className="text-slate-300 text-5xl mb-8 uppercase tracking-widest font-bold">Toplam Puan</p>
                    <h1 className="text-[14rem] font-black text-white leading-none mb-12 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                        {Math.floor(score)}
                    </h1>
                    <div className="flex justify-center gap-16 border-t-4 border-white/10 pt-12">
                        <div className="text-center">
                            <p className="text-7xl font-bold text-green-400 mb-4">{correct}</p>
                            <p className="text-3xl text-slate-400 uppercase tracking-wider font-bold">Doğru</p>
                        </div>
                        <div className="w-2 bg-white/10 rounded-full"></div>
                        <div className="text-center">
                            <p className="text-7xl font-bold text-red-400 mb-4">{wrong}</p>
                            <p className="text-3xl text-slate-400 uppercase tracking-wider font-bold">Yanlış</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alt Kısım: QR ve Footer */}
            <div className="z-10 mb-40 w-full px-12 flex flex-col items-center gap-12">
                <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-[10px] border-amber-500">
                    <QRCodeSVG value="https://www.onikikapi.com/" size={250} />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-5xl font-bold text-white mb-4">Sen de Katıl!</p>
                    <p className="text-4xl text-amber-500 font-mono font-bold tracking-wider">www.onikikapi.com</p>
                </div>
            </div>
        </div>
    );
}

// --- PAYLAŞIM MODALI (Popup) ---
function QuizShareModal({ score, correct, wrong, onClose }) {
    const captureRef = useRef(null); 
    const [downloading, setDownloading] = useState(false);
  
    const handleDownload = async () => {
      if (captureRef.current && !downloading) {
        setDownloading(true);
        try {
          await document.fonts.ready;
          const dataUrl = await toPng(captureRef.current, {
            cacheBust: true,
            width: 1080,
            height: 1920,
            style: {
              transform: 'scale(1)',
              transformOrigin: 'top left',
              opacity: '1',
              visibility: 'visible',
              display: 'flex'
            }
          });
  
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `OnikiKapi_Skor_${Math.floor(score)}.png`;
          link.click();
        } catch (err) {
          console.error("Hata:", err);
          alert("Resim indirilemedi. Lütfen tekrar deneyin.");
        } finally {
          setDownloading(false);
        }
      }
    };
  
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 animate-fade-in backdrop-blur-md overflow-hidden">
        <div className="relative w-full max-w-lg flex flex-col items-center gap-4">
          
          {/* Başlık ve Kapatma */}
          <div className="flex justify-between items-center w-full text-white px-2">
              <h3 className="text-lg font-bold text-amber-500">Skor Kartı</h3>
              <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><X size={24} /></button>
          </div>
          
          {/* Önizleme Alanı */}
          <div className="relative overflow-hidden shadow-2xl rounded-xl border-4 border-amber-500/30">
               <div style={{ transform: "scale(0.3)", transformOrigin: "top left", width: "1080px", height: "1920px", marginBottom: "-1344px" }}>
                  <ScoreCardContent score={score} correct={correct} wrong={wrong} />
               </div>
          </div>
          
          {/* Gizli Kart (Resim çekmek için - Kullanıcı Görmez ve Sayfayı Bozmaz) */}
          <div style={{ position: "fixed", top: 0, left: 0, width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}>
              <div ref={captureRef}>
                  <ScoreCardContent score={score} correct={correct} wrong={wrong} />
              </div>
          </div>
          
          {/* İndir Butonu */}
          <button 
              onClick={handleDownload}
              disabled={downloading}
              className="w-full bg-amber-500 text-slate-900 font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
              {downloading ? <RefreshCw className="animate-spin" /> : <Download />}
              {downloading ? "Hazırlanıyor..." : "Resmi İndir"}
          </button>
          <p className="text-white/50 text-xs text-center">İndirdikten sonra Instagram veya WhatsApp'ta paylaşabilirsiniz.</p>
        </div>
      </div>
    );
  }
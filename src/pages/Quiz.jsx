import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Trophy, Heart, Clock, Flame, Zap, HelpCircle, 
  ArrowRight, RefreshCw, Check, X, Share2, Download, ShieldCheck 
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
  
  // MODAL VE SİSTEM KONTROLÜ
  const [showShareModal, setShowShareModal] = useState(false);
  const [hpAwarded, setHpAwarded] = useState(false); // YENİ: Puanın birden fazla kez eklenmesini önleyen kilit

  // SÜRE KONTROLÜ
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

  // YENİ: OYUN BİTTİĞİNDE HİKMET PUANI (HP) SENKRONİZASYONU
  useEffect(() => {
    if (gameState === 'finished' && !hpAwarded && score > 0) {
      const earnedHP = Math.floor(score);
      const currentHP = parseInt(localStorage.getItem('hikmet_puani') || '0', 10);
      
      // Skoru ana platforma kaydet
      localStorage.setItem('hikmet_puani', (currentHP + earnedHP).toString());
      
      // Navbar'ı anında tetikle
      window.dispatchEvent(new Event('hp-updated'));
      
      // Kilidi kapat, böylece bu oyun için tekrar puan eklenmez
      setHpAwarded(true);
    }
  }, [gameState, hpAwarded, score]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setCurrentQIndex(0);
    setHpAwarded(false); // Kilidi yeni oyun için aç
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
    <div className="min-h-[85vh] flex items-center justify-center p-4 animate-fade-in relative overflow-hidden font-sans">
      <Helmet>
        <title>İlim Meydanı (Bilgi Yarışması) | OnikiKapı</title>
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
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#09303a]/50 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="bg-[#0b1b24]/90 backdrop-blur-xl w-full max-w-2xl rounded-3xl shadow-2xl border border-[#C5A059]/20 overflow-hidden relative z-10">
        
        {/* --- GİRİŞ --- */}
        {gameState === 'intro' && (
          <div className="p-12 text-center space-y-6">
            <div className="w-24 h-24 bg-[#C5A059]/20 rounded-full flex items-center justify-center mx-auto animate-pulse border-2 border-[#C5A059]/40">
              <Trophy size={48} className="text-[#C5A059]" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f5f5dc] via-[#C5A059] to-[#f5f5dc] font-serif">
              İlim Meydanı
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Ehl-i Beyt kültürü, fıkhı ve tarihi üzerine bilginizi sınayın. Doğru bildiğiniz her soru size <strong className="text-[#C5A059]">Hikmet Puanı (HP)</strong> olarak dönecektir.
            </p>
            <button onClick={startGame} className="bg-[#C5A059] text-[#04151a] px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:bg-[#d4b271] mt-4">
              Meydana Çık
            </button>
          </div>
        )}

        {/* --- OYUN --- */}
        {gameState === 'playing' && (
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 bg-black/40 p-3 rounded-2xl border border-white/5 shadow-inner">
                <div className="flex items-center gap-1 text-red-500">
                    {[...Array(lives)].map((_, i) => <Heart key={i} size={24} fill="currentColor" />)}
                    {[...Array(3 - lives)].map((_, i) => <Heart key={i} size={24} className="opacity-20" />)}
                </div>
                <div className="flex flex-col items-center">
                    <div className={`text-2xl font-bold font-mono ${timer <= 5 ? 'text-red-500 animate-pulse scale-110 transition-transform' : 'text-[#f5f5dc]'}`}>{timer}</div>
                </div>
                <div className="bg-[#C5A059]/20 text-[#C5A059] px-3 py-1 rounded-lg font-bold border border-[#C5A059]/30">
                  {Math.floor(score)} HP
                </div>
            </div>

            <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
               <div className="h-full bg-gradient-to-r from-yellow-600 to-[#C5A059] transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-[#FDF6E3] mb-8 font-serif leading-relaxed min-h-[80px]">
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
                let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#C5A059]/40 text-slate-300";
                if (isAnswered) {
                   if (index === currentQ.correct) btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50";
                   else if (index === selectedOption) btnClass = "bg-red-500/20 border-red-500 text-red-200 animate-shake";
                   else btnClass = "opacity-40";
                }
                return (
                  <button key={index} onClick={() => handleAnswer(index)} disabled={isAnswered} className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between group min-h-[64px] ${btnClass}`}>
                    <span className="font-medium text-[15px] md:text-lg">{option}</span>
                    {isAnswered && index === currentQ.correct && <Check size={20} className="text-emerald-400 shrink-0 ml-2" />}
                    {isAnswered && index === selectedOption && index !== currentQ.correct && <X size={20} className="text-red-400 shrink-0 ml-2" />}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-3">
                    <button onClick={useFiftyFifty} disabled={!jokers.fifty || isAnswered} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${jokers.fifty ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 hover:bg-purple-500/40' : 'bg-black/40 text-slate-600 cursor-not-allowed border border-white/5'}`}>%50</button>
                    <button onClick={useHint} disabled={!jokers.hint || isAnswered} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${jokers.hint ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 hover:bg-blue-500/40' : 'bg-black/40 text-slate-600 cursor-not-allowed border border-white/5'}`}><HelpCircle size={16} /> İpucu</button>
                </div>
                {isAnswered && (
                    <button onClick={nextQuestion} className="bg-[#C5A059] text-[#04151a] px-6 py-2 rounded-xl font-bold hover:bg-white transition-colors flex items-center gap-2 animate-bounce shadow-[0_0_15px_rgba(197,160,89,0.4)]">
                      Sonraki <ArrowRight size={18} />
                    </button>
                )}
            </div>
          </div>
        )}

        {/* --- SONUÇ EKRANI --- */}
        {gameState === 'finished' && (
          <div className="p-12 text-center space-y-6 animate-fade-in relative z-20">
             <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 bg-[#C5A059]/20 rounded-full animate-ping"></div>
                <div className="relative bg-[#04151a] border-4 border-[#C5A059] rounded-full w-full h-full flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                    <Trophy size={60} className="text-[#C5A059]" />
                </div>
             </div>
             
             <div>
                <h2 className="text-3xl font-bold text-[#FDF6E3] mb-2 font-serif">Meydan Tamamlandı!</h2>
                <p className="text-slate-400">Toplanan Hikmet Puanı</p>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-[#C5A059] font-mono my-3 drop-shadow-lg">
                    {Math.floor(score)}
                </div>
                
                {/* YENİ: HP KAZANIM BİLDİRİMİ */}
                {score > 0 && (
                  <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold animate-fade-in mt-2">
                    <ShieldCheck size={18} />
                    +{Math.floor(score)} HP İlim Yolculuğuna Eklendi!
                  </div>
                )}
             </div>

             <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                 <button onClick={startGame} className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                     <RefreshCw size={20} /> Tekrar Çöz
                 </button>
                 <button 
                    onClick={() => setShowShareModal(true)} 
                    className="bg-[#C5A059] hover:bg-[#d4b271] text-[#04151a] px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto active:scale-95"
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
        <div className="w-[1080px] h-[1920px] bg-[#04151a] flex flex-col items-center justify-between text-center relative overflow-hidden font-sans">
            {/* Arka Plan */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#04151a] via-[#09303a] to-[#04151a]"></div>
            
            {/* Üst Kısım: Logo ve İsim */}
            <div className="z-10 mt-40 flex flex-col items-center w-full px-12">
                <div className="p-10 border-[8px] border-[#C5A059] rounded-full mb-10 bg-[#04151a] shadow-[0_0_60px_rgba(197,160,89,0.4)]">
                    <Trophy size={160} className="text-[#C5A059]" />
                </div>
                <h3 className="text-[#C5A059] text-[7rem] font-black tracking-[0.15em] uppercase mb-4 drop-shadow-2xl leading-tight">
                    OnikiKapı
                </h3>
                <p className="text-slate-300 text-4xl tracking-[0.5em] uppercase font-light">İlim Meydanı</p>
            </div>

            {/* Orta Kısım: Skor */}
            <div className="z-10 flex flex-col items-center justify-center w-full px-12">
                <div className="bg-white/5 border-[6px] border-[#C5A059]/30 rounded-[4rem] p-20 w-full max-w-4xl backdrop-blur-md shadow-2xl">
                    <p className="text-slate-300 text-5xl mb-8 uppercase tracking-widest font-bold">Kazanılan HP</p>
                    <h1 className="text-[14rem] font-black text-white leading-none mb-12 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                        {Math.floor(score)}
                    </h1>
                    <div className="flex justify-center gap-16 border-t-4 border-white/10 pt-12">
                        <div className="text-center">
                            <p className="text-7xl font-bold text-emerald-400 mb-4">{correct}</p>
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
                <div className="bg-[#FDF6E3] p-8 rounded-[3rem] shadow-2xl border-[10px] border-[#C5A059]">
                    <QRCodeSVG value="https://www.onikikapi.com/" size={250} fgColor="#04151a" />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-5xl font-bold text-[#FDF6E3] mb-4">İlim Şehrine Katıl</p>
                    <p className="text-4xl text-[#C5A059] font-mono font-bold tracking-wider">www.onikikapi.com</p>
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
          link.download = `OnikiKapi_Hikmet_Skoru_${Math.floor(score)}.png`;
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
              <h3 className="text-lg font-bold text-[#C5A059]">Skor Kartı</h3>
              <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X size={24} /></button>
          </div>
          
          {/* Önizleme Alanı */}
          <div className="relative overflow-hidden shadow-2xl rounded-xl border-4 border-[#C5A059]/30">
               <div style={{ transform: "scale(0.3)", transformOrigin: "top left", width: "1080px", height: "1920px", marginBottom: "-1344px" }}>
                  <ScoreCardContent score={score} correct={correct} wrong={wrong} />
               </div>
          </div>
          
          {/* Gizli Kart (Resim çekmek için - Kullanıcı Görmez) */}
          <div style={{ position: "fixed", top: 0, left: 0, width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}>
              <div ref={captureRef}>
                  <ScoreCardContent score={score} correct={correct} wrong={wrong} />
              </div>
          </div>
          
          {/* İndir Butonu */}
          <button 
              onClick={handleDownload}
              disabled={downloading}
              className="w-full bg-[#C5A059] text-[#04151a] font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
              {downloading ? <RefreshCw className="animate-spin" /> : <Download />}
              {downloading ? "Hazırlanıyor..." : "Resmi İndir"}
          </button>
          <p className="text-white/50 text-xs text-center">İndirdikten sonra Instagram veya WhatsApp'ta gururla paylaşabilirsiniz.</p>
        </div>
      </div>
    );
  }
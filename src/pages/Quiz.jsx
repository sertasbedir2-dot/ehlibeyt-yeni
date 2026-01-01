import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Trophy, CheckCircle, XCircle, ArrowRight, RefreshCw, Brain } from 'lucide-react';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // --- SORU HAVUZU ---
  const questions = [
    {
      question: "Hz. Muhammed (s.a.a) Gadir-i Hum'da kimin velayetini ilan etmiştir?",
      options: ["Hz. Ebubekir", "Hz. Ömer", "Hz. Ali (a.s)", "Hz. Osman"],
      correct: 2 // 0, 1, 2, 3 (Index)
    },
    {
      question: "Kur'an-ı Kerim'de Ehlibeyt'in tertemiz olduğunu bildiren ayet hangisidir?",
      options: ["Ayet-el Kürsi", "Tathir Ayeti (Ahzab 33)", "Mübahale Ayeti", "Velayet Ayeti"],
      correct: 1
    },
    {
      question: "Kerbela'da İmam Hüseyin (a.s) ile birlikte şehit olan sancaktar kimdir?",
      options: ["Hz. Ali Ekber", "Hz. Abbas (a.s)", "Hz. Kasım", "Habib b. Mezahir"],
      correct: 1
    },
    {
      question: "On İki İmam'ın sonuncusu ve 'Beklenen Kurtarıcı' kimdir?",
      options: ["İmam Mehdi (a.f)", "İmam Hasan Askeri", "İmam Cafer-i Sadık", "İmam Rıza"],
      correct: 0
    },
    {
      question: "Nehсü'l Belâga hangi imamın hutbe, mektup ve hikmetli sözlerini içerir?",
      options: ["Hz. Muhammed (s.a.a)", "İmam Zeynel Abidin", "Hz. Ali (a.s)", "İmam Hüseyin"],
      correct: 2
    }
  ];

  const handleAnswerClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in">
      <Helmet>
        <title>Bilgi Yarışması | Ehlibeyt Yolu</title>
        <meta name="description" content="Ehlibeyt kültürü ve tarihi bilginizi test edin." />
      </Helmet>

      <div className="bg-[#162e45] w-full max-w-2xl rounded-3xl shadow-2xl border border-gold/20 overflow-hidden relative">
        
        {/* Dekoratif Arka Plan */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Brain size={150} />
        </div>

        {showScore ? (
          // --- SONUÇ EKRANI ---
          <div className="p-12 text-center space-y-6">
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gold animate-bounce">
              <Trophy size={48} className="text-gold" />
            </div>
            <h2 className="text-3xl font-sans font-bold text-sand">Tebrikler!</h2>
            <p className="text-slate-300 text-lg">
              Toplam <span className="text-gold font-bold">{questions.length}</span> soruda <span className="text-spiritual-light font-bold text-2xl">{score}</span> doğru yaptınız.
            </p>
            
            <div className="pt-6">
              <button 
                onClick={resetQuiz}
                className="bg-gold text-midnight px-8 py-3 rounded-xl font-bold hover:bg-white transition flex items-center gap-2 mx-auto"
              >
                <RefreshCw size={20} /> Tekrar Yarış
              </button>
            </div>
          </div>
        ) : (
          // --- SORU EKRANI ---
          <div className="p-6 md:p-10">
            
            {/* Üst Bilgi (İlerleme) */}
            <div className="flex justify-between items-center mb-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Soru {currentQuestion + 1} / {questions.length}</span>
              <span>Puan: {score}</span>
            </div>

            {/* İlerleme Çubuğu */}
            <div className="w-full h-2 bg-midnight rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-spiritual to-gold transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Soru */}
            <h2 className="text-xl md:text-2xl font-bold text-sand mb-8 font-sans leading-relaxed">
              {questions[currentQuestion].question}
            </h2>

            {/* Şıklar */}
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => {
                // Renk Mantığı
                let optionStyle = "bg-midnight border-white/5 hover:border-gold/50";
                if (isAnswered) {
                  if (index === questions[currentQuestion].correct) {
                    optionStyle = "bg-green-900/50 border-green-500 text-green-200"; // Doğru Cevap
                  } else if (index === selectedOption) {
                    optionStyle = "bg-red-900/50 border-red-500 text-red-200"; // Yanlış Seçim
                  } else {
                    optionStyle = "bg-midnight opacity-50"; // Diğerleri
                  }
                } else if (selectedOption === index) {
                   optionStyle = "bg-gold text-midnight border-gold"; // Seçili (Henüz cevaplanmadıysa)
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${optionStyle}`}
                  >
                    <span className="font-serif text-lg">{option}</span>
                    
                    {/* İkonlar (Cevaplandıysa göster) */}
                    {isAnswered && index === questions[currentQuestion].correct && <CheckCircle size={20} className="text-green-400" />}
                    {isAnswered && index === selectedOption && index !== questions[currentQuestion].correct && <XCircle size={20} className="text-red-400" />}
                  </button>
                );
              })}
            </div>

            {/* Sonraki Soru Butonu */}
            {isAnswered && (
              <div className="mt-8 flex justify-end animate-fade-in">
                <button 
                  onClick={handleNextQuestion}
                  className="bg-spiritual text-white px-6 py-3 rounded-xl font-bold hover:bg-spiritual-light transition flex items-center gap-2"
                >
                  {currentQuestion + 1 === questions.length ? "Sonucu Gör" : "Sonraki Soru"} <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
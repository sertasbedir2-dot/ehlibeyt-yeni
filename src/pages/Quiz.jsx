import React, { useState, useEffect } from &#39;react&#39;;
import { Helmet } from &#39;react-helmet-async&#39;;
import { 
  Trophy, Heart, Clock, Flame, Zap, HelpCircle, 
  ArrowRight, RefreshCw, Check, X 
} from &#39;lucide-react&#39;;
import { quizQuestions } from &#39;../data/quizData&#39;;

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

// Ses Efektleri (Opsiyonel: Dosyalar varsa çalışır, yoksa hata vermez)
const playSound = (type) =\> {
// Gelecekte ses dosyaları eklenirse buraya kod yazılır
};

// --- ZAMANLAYICI MOTORU ---
useEffect(() =\> {
let interval;
if (gameState === 'playing' && \!isAnswered && timer \> 0) {
interval = setInterval(() =\> {
setTimer((prev) =\> prev - 1);
}, 1000);
} else if (timer === 0 && \!isAnswered) {
handleWrongAnswer(); // Süre bitti
}
return () =\> clearInterval(interval);
}, [timer, gameState, isAnswered]);

// --- OYUN MANTIĞI ---
const startGame = () =\> {
setGameState('playing');
setScore(0);
setLives(3);
setCurrentQIndex(0);
resetTurn();
};

const resetTurn = () =\> {
setTimer(15);
setIsAnswered(false);
setSelectedOption(null);
setEliminatedOptions([]);
setShowHint(false);
};

const handleAnswer = (index) =\> {
if (isAnswered) return;
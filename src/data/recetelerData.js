// src/data/recetelerData.js

import { Brain, Heart, Moon, Shield, Zap, Home, Users, Eye, Feather, Activity } from 'lucide-react';

export const categories = [
  { id: 'psych', name: 'Ruh Sağlığı & Zihin', icon: Brain, desc: "Vesvese, öfke, uyku ve hafıza sorunları için manevi destek." },
  { id: 'family', name: 'Aile & Sosyal Hayat', icon: Home, desc: "Huzur, muhabbet, evlat terbiyesi ve nazar korunması." },
  { id: 'spiritual', name: 'Seyr-ü Süluk (Maneviyat)', icon: Feather, desc: "Kalp katılığı, günah yükü ve ibadette huşu arayanlar için." },
  { id: 'physical', name: 'Bedensel Şifa (Tıbb-ı Rıza)', icon: Activity, desc: "Halsizlik ve ağrılar için Ehl-i Beyt tıbbından tavsiyeler." }
];

export const moods = [
  { id: 'sad', label: 'Hüzünlü', emoji: '😔', targetCategory: 'psych' },
  { id: 'angry', label: 'Öfkeli', emoji: '😠', targetCategory: 'psych' },
  { id: 'anxious', label: 'Kaygılı', emoji: '😨', targetCategory: 'psych' },
  { id: 'tired', label: 'Yorgun', emoji: '😴', targetCategory: 'physical' },
  { id: 'confused', label: 'Kararsız', emoji: '🤔', targetCategory: 'spiritual' },
  { id: 'lonely', label: 'Yalnız', emoji: '🥀', targetCategory: 'spiritual' }
];

export const recipes = [
  // --- PSİKOLOJİK ---
  {
    id: 1,
    categoryId: 'psych',
    title: "Vesvese ve Evham",
    icon: Shield,
    diagnosis: "Zihni kemiren takıntılar, yersiz korkular ve şeytani fısıltılar.",
    cure: {
      arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
      turkish: "La havle ve la kuvvete illa billahil aliyyil azim.",
      source: "İmam Sadık (a.s)"
    },
    wisdom: "Bu zikir, insanın acizliğini kabul edip mutlak gücü Allah'a teslim etmesidir. Şeytan, teslim olmuş bir kalbe vesvese veremez.",
    instruction: "Sabah ve akşam namazlarından sonra 7 veya 70 defa okunur. Ayrıca Nas ve Felak sureleri ile desteklenmelidir.",
    tibb_riza: "İmam Rıza (a.s) vesvese için 'Nar' (Nar meyvesi) yemeyi tavsiye etmiştir. Nar, kalbi aydınlatır ve şeytanı 40 gün uzaklaştırır."
  },
  {
    id: 2,
    categoryId: 'psych',
    title: "Öfke Kontrolü",
    icon: Zap,
    diagnosis: "Ani parlamalar, sinir krizleri ve sonrasında gelen pişmanlık hissi.",
    cure: {
      arabic: "اَللّٰهُمَّ أَذْهِبْ عَنِّي غَيْظَ قَلْبِي",
      turkish: "Allahumme ezhib anni ğayza kalbi.",
      source: "İmam Musa Kazım (a.s)"
    },
    wisdom: "Öfke, aklın ışığını söndüren bir ateştir. Bu dua, o ateşe su serper.",
    instruction: "Öfke anında ayaktaysanız oturun, oturuyorsanız yatın. Mümkünse soğuk su ile abdest alın.",
    tibb_riza: null
  },
  {
    id: 3,
    categoryId: 'psych',
    title: "Uykusuzluk ve Kabus",
    icon: Moon,
    diagnosis: "Uykuya dalamama, sık uyanma veya korkulu rüyalar görme.",
    cure: {
      arabic: "Tesbihat-ı Zehra ve Ayetel Kürsi",
      turkish: "34 Allahu Ekber, 33 Elhamdulillah, 33 Subhanallah",
      source: "Hz. Fatıma (s.a)"
    },
    wisdom: "Uyku, küçük ölümdür. Ruhun bu yolculuğa temiz ve korunaklı çıkması gerekir.",
    instruction: "Yatağa abdestli girin. Sağ tarafınıza yatın ve Tesbihat-ı Zehra'yı çekin.",
    tibb_riza: "Yatmadan önce ağır yemekten kaçının. Bir kaşık bal şerbeti içmek sinirleri yatıştırır."
  },

  // --- AİLE & SOSYAL ---
  {
    id: 4,
    categoryId: 'family',
    title: "Aile Huzuru ve Muhabbet",
    icon: Heart,
    diagnosis: "Eşler arası soğukluk, evde sebepsiz gerginlik ve huzursuzluk.",
    cure: {
      arabic: "Ya Vedûd (1001 Kere)",
      turkish: "Ya Vedûd",
      source: "Esma-ül Hüsna"
    },
    wisdom: "Vedûd ismi, ilahi sevgiyi ve şefkati celb eder. Kalpleri birbirine ısındırır.",
    instruction: "Eşler, birbirlerinin yüzüne bakarak tebessüm etmeli ve bu ismi zikretmelidir. Yemeklere okunması tesiri artırır.",
    tibb_riza: "Evde üzerlik tohumu (yabani sedef otu) yakmak, negatif enerjiyi ve nazarı temizler."
  },
  {
    id: 5,
    categoryId: 'family',
    title: "Hayırlı Evlat & Terbiye",
    icon: Users,
    diagnosis: "Çocuk sahibi olma isteği veya evladın ıslahı.",
    cure: {
      arabic: "رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ",
      turkish: "Rabbi la tezerni ferden ve ente hayrul varisin.",
      source: "Hz. Zekeriya'nın Duası (Enbiya, 89)"
    },
    wisdom: "Bu dua, yalnızlığı gidermek ve soyun devamını hayırlı bir şekilde talep etmektir.",
    instruction: "Seher vakitlerinde ve secde anında ısrarla okunmalıdır. Çocuklar için Sahife-i Seccadiye'deki dua okunmalıdır.",
    tibb_riza: null
  },
  {
    id: 6,
    categoryId: 'family',
    title: "Nazar ve Göz Değmesi",
    icon: Eye,
    diagnosis: "Sebepsiz halsizlik, işlerin ters gitmesi, ani hastalıklar.",
    cure: {
      arabic: "Ve in yekâdullezîne keferû...",
      turkish: "Kalem Suresi 51-52. Ayetler",
      source: "Kur'an-ı Kerim"
    },
    wisdom: "Nazar haktır ve deveyi kazana, insanı mezara sokar. Bu ayetler ilahi bir kalkan oluşturur.",
    instruction: "Evden çıkarken ve kalabalık ortamlara girerken mutlaka okunmalıdır.",
    tibb_riza: null
  },

  // --- MANEVİ ---
  {
    id: 7,
    categoryId: 'spiritual',
    title: "Kalp Katılığı",
    icon: Activity,
    diagnosis: "İbadetten tat alamama, gözyaşı dökememe, merhamet eksikliği.",
    cure: {
      arabic: "Münacat-ı Hamse-i Aşere (Şekva)",
      turkish: "Allah'ım! Sana, durmadan kötülüğü emreden nefsimden şikayet ediyorum...",
      source: "İmam Zeynelabidin (a.s)"
    },
    wisdom: "Kalp, günahlarla kirlendikçe katılaşır. Bu münacat, kalbin pasını silen bir ciladır.",
    instruction: "Gece namazından sonra veya Cuma günleri hüzünlü bir sesle okunmalıdır.",
    tibb_riza: "Mercimek yemek kalbi yumuşatır ve gözyaşını artırır (Hadis)."
  },
  {
    id: 8,
    categoryId: 'spiritual',
    title: "Tevbe ve Arınma",
    icon: Feather,
    diagnosis: "Günahların ağırlığı altında ezilmek, ümitsizlik.",
    cure: {
      arabic: "Dua-i Kumeyl",
      turkish: "Allah'ım! İffet perdesini yırtan günahlarımı bağışla...",
      source: "Hz. Ali (a.s)"
    },
    wisdom: "Kumeyl duası, günahkar bir kulun Rabbiyle en samimi dertleşmesidir.",
    instruction: "Perşembe geceleri (Cuma akşamı) okunması çok faziletlidir.",
    tibb_riza: null
  }
];
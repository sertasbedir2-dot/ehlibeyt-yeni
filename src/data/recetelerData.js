import { Brain, Heart, Moon, Shield, Zap, Home, Users, Eye, Feather, Activity, Wallet, Sun } from 'lucide-react';

// --- KATEGORİLER ---
export const categories = [
  { id: 'psych', name: 'Ruh Sağlığı & Zihin', icon: Brain, desc: "Vesvese, öfke, uyku ve hafıza sorunları için manevi destek." },
  { id: 'family', name: 'Aile & Sosyal Hayat', icon: Home, desc: "Huzur, muhabbet, evlat terbiyesi ve nazar korunması." },
  { id: 'spiritual', name: 'Seyr-ü Süluk (Manevi)', icon: Feather, desc: "Kalp katılığı, tevbe ve manevi arınma." },
  { id: 'physical', name: 'Bedensel Şifa', icon: Activity, desc: "Halsizlik ve ağrılar için Ehl-i Beyt tıbbından tavsiyeler." }
];

// --- RUH HALİ (MOODS) ---
export const moods = [
  { id: 'sad', label: 'Hüzünlü', emoji: '😔', targetCategory: 'spiritual' },
  { id: 'angry', label: 'Öfkeli', emoji: '😠', targetCategory: 'psych' },
  { id: 'anxious', label: 'Kaygılı', emoji: '😨', targetCategory: 'psych' },
  { id: 'tired', label: 'Yorgun', emoji: '😴', targetCategory: 'physical' },
  { id: 'poor', label: 'Darda', emoji: '💸', targetCategory: 'family' }, 
  { id: 'sick', label: 'Hasta', emoji: '🤒', targetCategory: 'physical' }
];

// --- REÇETELER LİSTESİ (TAM METİN) ---
export const recipes = [
  // --- PSİKOLOJİK ---
  {
    id: 1,
    categoryId: 'psych',
    title: "Vesvese ve Evham",
    icon: Shield,
    diagnosis: "Zihni kemiren takıntılar, yersiz korkular ve şeytani fısıltılar.",
    cure: {
      arabic: "بِسْمِ اللَّهِ وَ بِاللَّهِ مُحَمَّدٌ رَسُولُ اللَّهِ وَ لَا حَوْلَ وَ لَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
      transliteration: "Bismillahi ve billahi Muhammedun Resulullah ve la havle ve la kuvvete illa billahil aliyyil azim.",
      meaning: "Allah'ın adıyla ve Allah ile... Muhammed Allah'ın elçisidir. Güç ve kuvvet ancak yüce ve ulu Allah'tandır.",
      source: "İmam Cafer Sadık (a.s)"
    },
    wisdom: "Vesvese kalbi sıktığında elin göğse konularak 7 defa okunması tavsiye edilir.",
    instruction: "Vesvese anında elinizi göğsünüze koyun ve 7 kere okuyun.",
    tibb_riza: "İmam Ali (a.s): 'Vesvese çoğaldığında oruç tutun veya az yiyin; tokluk vesveseyi artırır.'"
  },
  {
    id: 2,
    categoryId: 'psych',
    title: "Öfke Kontrolü",
    icon: Zap,
    diagnosis: "Ani parlamalar, sinir krizleri ve sonrasında gelen pişmanlık hissi.",
    cure: {
      arabic: "اَللّهُمَّ اَذْهِبْ عَنِّي غَيْظَ قَلْبِي",
      transliteration: "Allahumme izhib annî ğayza kalbî.",
      meaning: "Allah'ım, kalbimin öfkesini (kinini) benden gider.",
      source: "İmam Muhammed Bakır (a.s)"
    },
    wisdom: "Öfke, aklın ışığını söndüren bir ateştir. Bu dua o ateşe su serper.",
    instruction: "Öfke anında ayaktaysanız oturun, oturuyorsanız uzanın.",
    tibb_riza: "Hz. Peygamber (s.a.a): 'Öfkelendiğinizde ayaktaysanız oturun, oturuyorsanız uzanın.' (Kan dolaşımını yavaşlatır)."
  },
  {
    id: 3,
    categoryId: 'psych',
    title: "Uykusuzluk ve Kabus",
    icon: Moon,
    diagnosis: "Uykuya dalamama, sık uyanma veya korkulu rüyalar görme.",
    cure: {
      arabic: "يَا مُشْبِعَ الْبُطُونِ الْجَائِعَةِ وَ يَا كَاسِيَ الْجُيُوبِ الْعَارِيَةِ وَ يَا مُسَكِّنَ الْعُرُوقِ الضَّارِبَةِ وَ يَا مُنَوِّمَ الْعُيُونِ السَّاهِرَةِ سَكِّنْ عُرُوقِيَ الضَّارِبَةَ وَ أْذَنِ لِعَيْنِي نَوْماً عَاجِلًا",
      transliteration: "Ya muşbi'al butunel caiy'a ve ya kasiyel cuyubil ariy'a ve ya müsekkinel urugid daribe ve ya münevvimel uyunis sahira, sekkin urugiyed daribe ve'zen li-ayniy nevmen acila.",
      meaning: "Ey aç karınları doyuran, çıplak bedenleri giydiren, atan damarları sakinleştiren ve uykusuz gözleri uyutan! Damarlarımı sakinleştir ve gözüme acil bir uyku ver.",
      source: "Hz. Fatıma (s.a)"
    },
    wisdom: "Hz. Peygamber'in kızı Hz. Fatıma'ya öğrettiği özel uyku duasıdır.",
    instruction: "Yatağa abdestli girin ve sağ tarafınıza yatarak okuyun.",
    tibb_riza: "Yatmadan önce ağır yemekten kaçının. Bir kaşık bal şerbeti içmek sinirleri yatıştırır."
  },
  {
    id: 10,
    categoryId: 'psych',
    title: "Zihin Açıklığı ve Hafıza",
    icon: Sun,
    diagnosis: "Unutkanlık, derslerde zorlanma, odaklanma sorunu.",
    cure: {
      arabic: "سُبْحَانَكَ لَا عِلْمَ لَنَا إِلَّا مَا عَلَّمْتَنَا ۖ إِنَّكَ أَنتَ الْعَلِيمُ الْحَكِيمُ",
      transliteration: "Subhaneke la ilme lena illa ma allemtena inneke entel alimul hakim.",
      meaning: "Seni tenzih ederiz, senin bize öğrettiğinden başka ilmimiz yoktur. Şüphesiz sen her şeyi hakkıyla bilen, her şeyi hikmetle yapansın.",
      source: "Bakara Suresi, 32"
    },
    wisdom: "İlim Allah'ın nurudur. Bu ayet, o nuru talep etmektir.",
    instruction: "Sabah namazlarından sonra veya derse başlarken okunur.",
    tibb_riza: "Aç karnına 21 adet kuru üzüm yemek hafızayı güçlendirir (Tıbb-ı Rıza)."
  },

  // --- AİLE & SOSYAL ---
  {
    id: 4,
    categoryId: 'family',
    title: "Aile Huzuru ve Muhabbet",
    icon: Heart,
    diagnosis: "Eşler arası soğukluk, evde sebepsiz gerginlik ve huzursuzluk.",
    cure: {
      arabic: "يَا وَدُودُ",
      transliteration: "Ya Vedûd (1001 Kere)",
      meaning: "Ey (kullarını) çok seven ve sevilmeye en layık olan.",
      source: "Esma-ül Hüsna"
    },
    wisdom: "Vedûd ismi, ilahi sevgiyi ve şefkati celb eder. Kalpleri birbirine ısındırır.",
    instruction: "Tatlı bir yiyeceğe okunup eşler tarafından yenmesi tavsiye edilir.",
    tibb_riza: "Hz. Peygamber (s.a.a): 'Kişinin eşine Seni seviyorum demesi, kadının kalbinden asla silinmez.'"
  },
  {
    id: 5,
    categoryId: 'family',
    title: "Hayırlı Evlat & Terbiye",
    icon: Users,
    diagnosis: "Çocuk sahibi olma isteği veya evladın ıslahı.",
    cure: {
      arabic: "اللَّهُمَّ وَ مُنَّ عَلَيَّ بِبَقَاءِ وُلْدِي وَ بِإِصْلَاحِهِمْ لِي و بِإِمْتَاعِي بِهِمْ",
      transliteration: "Allahumme ve menne aleyye bi-bekai vuldi ve bi-ıslahihim li ve bi-imta'i bihim.",
      meaning: "Allah'ım! Çocuklarımı hayatta bırakarak, onları benim için ıslah ederek ve onlardan faydalanmamı sağlayarak bana lütufta bulun.",
      source: "İmam Zeynelabidin (a.s)"
    },
    wisdom: "Sahife-i Seccadiye'deki bu dua, hem evlat istemek hem de ahlakını güzelleştirmek içindir.",
    instruction: "Çocukların hidayeti için seher vakitlerinde okunur.",
    tibb_riza: "Çocuklarınıza sevgi gösterin ve onlara Ehlibeyt'in hayatından hikayeler anlatın."
  },
  {
    id: 6,
    categoryId: 'family',
    title: "Nazar ve Göz Değmesi",
    icon: Eye,
    diagnosis: "Sebepsiz halsizlik, işlerin ters gitmesi, ani hastalıklar.",
    cure: {
      arabic: "وَإِن يَكَادُ الَّذِينَ كَفَرُوا لَيُزْلِقُونَكَ بِأَبْصَارِهِمْ لَمَّا سَمِعُوا الذِّكْرَ وَيَقُولُونَ إِنَّهُ لَمَجْنُونٌ وَمَا هُوَ إِلَّا ذِكْرٌ لِّلْعَالَمِينَ",
      transliteration: "Ve in yekâdullezîne keferû le-yuzlikûneke bi-ebsârihim lemmâ semiûz-zikra ve yekûlûne innehû le-mecnûn. Ve mâ huve illâ zikrun lil-âlemîn.",
      meaning: "O inkâr edenler Zikr'i (Kur'an'ı) işittikleri zaman, neredeyse seni gözleriyle devireceklerdi. Ve diyorlar ki: 'O, gerçekten bir delidir.' Oysa o (Kur'an), alemler için bir zikirden (öğütten) başka bir şey değildir.",
      source: "Kalem Suresi 51-52"
    },
    wisdom: "Nazar haktır. Bu ayetler ve Ayete'l-Kürsi ilahi bir kalkan oluşturur.",
    instruction: "Evden çıkarken ve kalabalık ortamlara girerken okunmalıdır.",
    tibb_riza: "Evden çıkarken Ayete'l-Kürsi okumak en büyük koruyucudur."
  },
  {
    id: 9,
    categoryId: 'family',
    title: "Rızık ve Bereket",
    icon: Wallet,
    diagnosis: "Geçim sıkıntısı, borçlar ve bereketin azalması.",
    cure: {
      arabic: "يَا خَيْرَ مَدْعُوٍّ وَ يَا خَيْرَ مَسْئُولٍ وَ يَا أَوْسَعَ مَنْ أَعْطَى وَ يَا خَيْرَ مُرْتَجًى اُرْزُقْنِي وَ أَوْسِعْ عَلَيَّ مِنْ رِزْقِكَ",
      transliteration: "Ya hayra med'uvvin ve ya hayra mes'ulin ve ya evsea men a'ta ve ya hayra murtaca, urzuknî ve evsi' aleyye min rızkike.",
      meaning: "Ey çağrılanların en hayırlısı, ey istenilenlerin en hayırlısı, ey verenlerin en cömerdi! Beni rızıklandır ve rızkını bana genişlet.",
      source: "İmam Sadık (a.s)"
    },
    wisdom: "İmam Sadık'tan (a.s) rızkın artması için öğretilen özel duadır.",
    instruction: "Namazlardan sonra, özellikle secdede okunması tavsiye edilir.",
    tibb_riza: "Her gece Vakıa Suresi okumak fakirliği önler."
  },

  // --- MANEVİ ---
  {
    id: 7,
    categoryId: 'spiritual',
    title: "Kalp Katılığı",
    icon: Activity,
    diagnosis: "İbadetten tat alamama, gözyaşı dökememe, merhamet eksikliği.",
    cure: {
      arabic: "يَا فَتَّاحُ",
      transliteration: "Ya Fettâh (70 Kere)",
      meaning: "Ey her türlü hayır kapısını açan.",
      source: "Esma-ül Hüsna"
    },
    wisdom: "Elini kalbinin üzerine koyup bu esmayı zikretmek kalbi yumuşatır.",
    instruction: "Sabah namazından sonra el kalbin üzerindeyken okunur.",
    tibb_riza: "İmam Ali (a.s): 'Bir yetimin başını okşamak ve aç birini doyurmak kalbi yumuşatır.'"
  },
  {
    id: 8,
    categoryId: 'spiritual',
    title: "Tevbe ve Arınma",
    icon: Feather,
    diagnosis: "Günahların ağırlığı altında ezilmek, ümitsizlik.",
    cure: {
      arabic: "اَسْتَغْفِرُ اللهَ الَّذي لا اِلهَ اِلاّ هُوَ الْحَيُّ الْقَيُّومُ الرَّحْمنُ الرَّحيمُ ذُو الْجَلالِ وَ الاِْكْرامِ وَ اَتُوبُ اِلَيْهِ",
      transliteration: "Estağfirullahe'llezi la ilahe illa huve, el-Hayyu'l-Kayyum, er-Rahmanu'r-Rahim, zu'l-celali ve'l-ikram ve etubu ileyh.",
      meaning: "Kendisinden başka ilah olmayan, Diri, Kayyum, Rahman, Rahim, Celal ve İkram sahibi Allah'tan mağfiret diler ve O'na tövbe ederim.",
      source: "Mefatihu'l-Cinan"
    },
    wisdom: "Uyumadan önce okuyanın günahları denizlerin köpüğü kadar olsa da bağışlanır.",
    instruction: "Her gece yatmadan önce samimiyetle okunmalıdır.",
    tibb_riza: "Sadaka vermek, günahın izlerini siler ve belaları defeder."
  },

  // --- BEDENSEL (TIBB-I RIZA) ---
  {
    id: 11,
    categoryId: 'physical',
    title: "Şifa ve Hastalık",
    icon: Activity,
    diagnosis: "Fiziksel ağrılar, kronik rahatsızlıklar ve şifa arayışı.",
    cure: {
      arabic: "يَا مَنِ اسْمُهُ دَوَاءٌ وَ ذِكْرُهُ شِفَاءٌ وَ طَاعَتُهُ غِنًى اِرْحَمْ مَنْ رَأْسُ مَالِهِ الرَّجَاءُ وَ سِلاَحُهُ الْبُكَاءُ",
      transliteration: "Ya menismuhu deva ve zikruhu şifa ve taatuhu ğina! İrham men re'su malihir-reca ve silahuhul buka.",
      meaning: "Ey ismi deva, zikri şifa ve itaati zenginlik olan! Sermayesi ümit ve silahı ağlamak olan (bu kuluna) merhamet et.",
      source: "Dua-i Kumeyl"
    },
    wisdom: "Kumeyl duasının bu bölümü, hem ruha hem bedene şifadır.",
    instruction: "Hastalık anında ve şifa niyetine suya okunup içilebilir.",
    tibb_riza: "Bir bardak suya 70 kere Fatiha Suresi okuyup içmek şifadır."
  }
];
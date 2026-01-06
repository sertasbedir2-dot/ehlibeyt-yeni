// src/data/masumDeepData.js

export const MASUM_DEEP_DATA = [
  {
    id: 1,
    identity: {
      name_ar: "مُحَمَّد",
      name_tr: "Hz. Muhammed (s.a.a)",
      title: "Hâtemü'l-Enbiyâ",
      role: "Peygamber",
      dates: "571 - 632",
      burial: "Medine-i Münevvere",
      desc: "Alemlere rahmet, dinin tebliğcisi."
    },
    // VEKTÖR A: ONTOLOJİ
    ontology: {
      noor: "El-Evvel ve El-Ahir",
      quran: "Biz seni alemlere rahmet olarak gönderdik. (Enbiya, 107)",
      cosmic: "Yaratılış nurunun kaynağı."
    },
    // VEKTÖR B: İLİM AĞI
    network: {
      companions: ["İmam Ali (a.s)", "Selman-ı Farisi", "Ebu Zer", "Mikdad", "Ammar"],
      legacy: "Kuran-ı Kerim ve Sünnet"
    },
    // VEKTÖR C: SİYASET VE STRATEJİ
    politics: {
      oppressors: ["Ebu Cehil", "Ebu Süfyan"],
      events: [
        { date: "622", event: "Hicret (Stratejik Çekilme)" },
        { date: "624", event: "Bedir Savaşı (İlk Zafer)" },
        { date: "630", event: "Mekke'nin Fethi (Kansız Devrim)" }
      ],
      strategy: "Tevhid inancını yerleştirirken tedricilik (aşamalı) ve yumuşak güç kullanımı."
    },
    // VEKTÖR D: MANEVİYAT
    liturgy: {
      duas: ["Cevşen-i Kebir", "Münacat-ı Şabaniye"],
      ziyarat: "Ziyaret-i Resulullah"
    },
    // VEKTÖR E: GÜNCEL MESAJ
    contemporary: "Irkçılığa karşı Veda Hutbesi'ndeki evrensel insan hakları beyannamesi."
  },
  {
    id: 2,
    identity: {
      name_ar: "عَلِيّ",
      name_tr: "Hz. Ali (a.s)",
      title: "Emîrü'l-Mü'minîn",
      role: "1. İmam",
      dates: "600 - 661",
      burial: "Necef",
      desc: "İlim şehrinin kapısı, velayetin şahı."
    },
    ontology: {
      noor: "El-Aliyy (Yüce)",
      quran: "Sizin veliniz ancak Allah, Resulü ve rüku ederken zekat veren müminlerdir. (Maide, 55)",
      cosmic: "Nübüvvet ilminin varisi."
    },
    network: {
      companions: ["Malik Eşter", "Ammar bin Yasir", "Meysem-i Temmar"],
      legacy: "Nehcü'l Belaga (Belagat Yolu)"
    },
    politics: {
      oppressors: ["Muaviye", "Hariciler"],
      events: [
        { date: "656", event: "Cemel Savaşı (Fitneyle Mücadele)" },
        { date: "657", event: "Sıffin Savaşı (Adalet Savaşı)" }
      ],
      strategy: "Sessizlik döneminde (25 yıl) Kuran'ı toplama, Hilafet döneminde ise tavizsiz adalet."
    },
    liturgy: {
      duas: ["Kumeyl Duası", "Sabah Duası"],
      ziyarat: "Ziyaret-i Eminullah"
    },
    contemporary: "Yöneticilerin şeffaflığı ve halkın denetim hakkı (Malik Eşter'e Emirname)."
  },
  // ... (Diğer İmamlar buraya aynı formatta eklenebilir)
  // Örnek olması için İmam Hüseyin'i ekleyelim:
  {
    id: 5,
    identity: {
      name_ar: "الْحُسَيْن",
      name_tr: "İmam Hüseyin (a.s)",
      title: "Seyyidü'ş-Şüheda",
      role: "3. İmam",
      dates: "626 - 680",
      burial: "Kerbela",
      desc: "Özgürlüğün evrensel sembolü."
    },
    ontology: {
      noor: "Eş-Şehid",
      quran: "Ey mutmain olmuş nefis! Dön Rabbine... (Fecr, 27-30)",
      cosmic: "Aşk ve fedakarlık zirvesi."
    },
    network: {
      companions: ["Hz. Abbas", "Ali Ekber", "Habib b. Mezahir", "Züheyr b. Kayn"],
      legacy: "Aşura Kıyamı"
    },
    politics: {
      oppressors: ["Yezid", "İbn Ziyad"],
      events: [
        { date: "680", event: "Kerbela Savaşı (Kıyam)" }
      ],
      strategy: "Zillete boyun eğmektense izzetli ölümü seçmek (Heyhat mine'z zille)."
    },
    liturgy: {
      duas: ["Arefe Duası"],
      ziyarat: "Ziyaret-i Aşura"
    },
    contemporary: "Haksızlığa karşı sivil itaatsizlik ve direnç kültürü."
  }
];
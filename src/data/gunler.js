// src/data/gunler.js
export const ozelGunler = [
  {
    date: '2025-03-21',
    title: "Sultan Nevruz",
    desc: "Hz. Ali'nin doğumu ve baharın müjdecisi. Yeni gün, yeni umut.",
    isMatem: false
  },
  {
    date: '2025-05-06',
    title: "Hıdırellez",
    desc: "Hızır ve İlyas'ın buluştuğu, darda kalanların feraha erdiği gün.",
    isMatem: false
  },
  {
    date: '2025-06-15',
    title: "Gadir-i Hum Bayramı",
    desc: "Velayet tacının Hz. Ali'ye giydirildiği, dinin kemale erdiği büyük gün.",
    isMatem: false
  },
  {
    date: '2025-07-06',
    title: "Aşura ve Matem",
    desc: "Kerbela'da Hz. Hüseyin ve yarenlerinin hakikat uğruna şehadeti. Yas ve tefekkür günü.",
    isMatem: true
  },
  {
    date: new Date().toISOString().split('T')[0], // Bugün için test verisi
    title: "Haftalık Sohbet Meclisi",
    desc: "Bu akşam Cemhane'de birlik cemi ve muhabbet meclisi kurulacaktır.",
    isMatem: false
  }
];
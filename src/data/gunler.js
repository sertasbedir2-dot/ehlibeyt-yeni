/**
 * ONİKİKAPI - ÖZEL GÜNLER VERİ SETİ (2026)
 * Not: Hicri takvim Ay'ın hareketlerine göre değiştiği için 
 * her yıl bu Miladi tarihlerin güncellenmesi zaruridir.
 */

export const ozelGunler = [
  {
    id: "sultan-nevruz-2026",
    date: '2026-03-21',
    title: "Sultan Nevruz",
    desc: "Hz. Ali'nin (a.s) mübarek doğumu ve baharın müjdecisi. İlim şehrinin kapısının aralandığı, kainatın nefes aldığı gün.",
    isMatem: false,
    category: "Veladet"
  },
  {
    id: "hidirellez-2026",
    date: '2026-05-06',
    title: "Hıdırellez",
    desc: "Hızır (a.s) ve İlyas (a.s) peygamberlerin buluştuğu, darda kalanların dualarının kabul olduğu rahmet günü.",
    isMatem: false,
    category: "Mübarek Gün"
  },
  {
    id: "gadir-i-hum-2026",
    date: '2026-06-04', // 2026 tahmini Gadir-i Hum tarihi
    title: "Gadir-i Hum Bayramı",
    desc: "Velayet tacının İmam Ali'ye giydirildiği, 'Ben kimin mevlası isem, Ali de onun mevlasıdır' buyruğunun ilan edildiği en büyük bayram.",
    isMatem: false,
    category: "Bayram"
  },
  {
    id: "asura-2026",
    date: '2026-07-25', // 2026 tahmini 10 Muharrem tarihi
    title: "Aşura ve Matem",
    desc: "Kerbela'da Hz. İmam Hüseyin (a.s) ve yarenlerinin susuz ve mazlumca şehadeti. Hakikat ile batılın ayrıldığı büyük yas günü.",
    isMatem: true,
    category: "Matem"
  },
  {
    id: "test-bugun",
    date: new Date().toLocaleDateString('en-CA'), // Tarayıcı dilinden bağımsız YYYY-MM-DD verir
    title: "Günlük Tefekkür Meclisi",
    desc: "Bugün kalbinizi ferahlatacak bir dua okumayı veya bir yetimi sevindirmeyi niyet ediniz.",
    isMatem: false,
    category: "Hatırlatma"
  }
];
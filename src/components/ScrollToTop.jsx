import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sayfa değiştiğinde (pathname değiştiğinde)
    // Tarayıcıyı anında en tepeye (0, 0) koordinatına at.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Bu bileşen ekranda görünmez, sadece görevini yapar.
}
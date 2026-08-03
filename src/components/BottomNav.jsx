import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, HeartPulse, ShoppingBag } from 'lucide-react';

export default function BottomNav() {
  // Navigasyon rotaları ve ikonları
  const navItems = [
    { path: '/', icon: Home, label: 'Dergâh' },
    { path: '/hakikat', icon: Search, label: 'Hakikat' },
    { path: '/sifa', icon: HeartPulse, label: 'Şifa' },
    { path: '/bazaar', icon: ShoppingBag, label: 'Çarşı' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f12]/80 backdrop-blur-lg border-t border-[#1a2f35]">
      <div className="max-w-md mx-auto px-6 h-16 flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              // NavLink'in aktif olup olmamasına göre dinamik class yönetimi
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${
                  isActive 
                    ? 'text-[#C5A059] scale-110' // Aktif: Altın Sarısı ve hafif büyüme
                    : 'text-gray-500 hover:text-gray-300' // İnaktif: Soluk gri
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                    {/* Aktif menü öğesinin altında parlayan zümrüt nokta efekti */}
                    {isActive && (
                      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C5A059] rounded-full shadow-[0_0_10px_rgba(197,160,89,0.8)]"></span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium tracking-wide mt-1">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
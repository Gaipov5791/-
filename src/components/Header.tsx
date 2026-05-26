/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Globe, Search, Calculator, ShieldCheck } from 'lucide-react';
import { Language } from '../types.ts';
import { LOCALIZATION } from '../data.ts';

interface HeaderProps {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  onOpenSearch: () => void;
}

export default function Header({
  currentLanguage,
  setLanguage,
  activeScreen,
  setActiveScreen,
  onOpenSearch,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  const menuItems = [
    { id: 'projects', label: t('nav_projects') },
    { id: 'financing', label: t('nav_financing') },
    { id: 'directions', label: t('directions_title') },
    { id: 'partners', label: t('nav_partners') },
    { id: 'news', label: t('nav_news') },
    { id: 'calc', label: t('nav_calc'), icon: Calculator },
    { id: 'admin', label: t('nav_admin'), icon: ShieldCheck },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'RU', label: 'Русский (RU)' },
    { code: 'KG', label: 'Кыргызча (KG)' },
    { code: 'EN', label: 'English (EN)' },
    { code: 'CN', label: '中文 (CN)' },
  ];

  const handleNavClick = (screenId: string) => {
    setActiveScreen(screenId);
    setMobileMenuOpen(false);
    // Smooth scroll to element if on home page
    if (['projects', 'financing', 'directions', 'partners', 'news'].includes(screenId)) {
      setTimeout(() => {
        const element = document.getElementById(screenId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-primary/95 text-white shadow-xl backdrop-blur-md border-b border-brand-secondary/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="flex items-center gap-3">
            <img
              alt="National Investment Fund Logo"
              className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
              src="https://lh3.googleusercontent.com/aida/ADBb0ui2VsYsPYlGMncv6d-npf5gkSvRQzMbpiZc5vBz_zaQ3R_iZn8jK_50rufWaAaPmFY6s6do0TqIIhE89a4cFPdqEjt2NRIu7G6xnBFjanpLZMPZ6-rzI3wG4fnQBnrQwfNKTrWyAux04vse5PlOZlM6TKiiWOjSDUkWsUP9xYBvA4LGPRrcKYEK3rOWHN3p-6XA8ShXUhshtcnGzap7A3J0wSsGGR-4o6nBsF0l8sTDUqgvXY1-xepM7xA"
              referrerPolicy="no-referrer"
            />
            <div className="hidden lg:block text-left max-w-xs border-l border-white/20 pl-3">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-sky">
                НАЦИОНАЛЬНЫЙ ИНВЕСТИЦИОННЫЙ ФОНД
              </span>
              <span className="block text-[9px] text-white/70 font-medium uppercase tracking-[0.05em] leading-none">
                Кыргызской Республики
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md font-medium text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-brand-sky bg-white/5 border-b-2 border-brand-sky'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Operations Panel */}
        <div className="hidden xl:flex items-center space-x-4">
          
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-white/80 hover:text-brand-sky hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            title="Поиск"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Language Toggle Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-white/5 text-xs font-bold uppercase tracking-wider cursor-pointer border border-white/10"
            >
              <Globe className="w-3.5 h-3.5 text-brand-sky" />
              <span>{currentLanguage}</span>
            </button>

            {langDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)}></div>
                <div id="language-dropdown" className="absolute right-0 mt-2 w-48 bg-brand-primary border border-brand-secondary/35 rounded-lg shadow-2xl py-1 z-20 animate-fade-in">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors block cursor-pointer ${
                        currentLanguage === lang.code ? 'text-brand-sky font-bold bg-white/5' : 'text-white/80'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Core Apply CTA */}
          <button
            onClick={() => handleNavClick('apply')}
            className="px-4 py-2.5 bg-brand-secondary hover:bg-brand-secondary/85 text-white rounded font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-[0.97] hover:shadow-brand-secondary/20 cursor-pointer"
          >
            {t('cta_apply')}
          </button>
        </div>

        {/* Mobile menu trigger + responsive details */}
        <div className="flex xl:hidden items-center space-x-3">
          {/* Quick Lang Switcher directly as badge */}
          <div className="flex gap-1 text-[11px] font-bold">
            {['RU', 'KG', 'EN'].map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l as Language)}
                className={`px-1.5 py-1 rounded transition-colors ${
                  currentLanguage === l ? 'bg-brand-secondary text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenSearch}
            className="p-2 text-white/80 hover:text-brand-sky rounded-full"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/90 hover:text-white rounded-md hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-brand-primary/98 border-t border-brand-secondary/20 py-4 px-4 space-y-3 shadow-2xl animate-slide-down">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2.5 px-3 rounded-md font-medium text-xs uppercase tracking-wider flex items-center gap-2 ${
                    activeScreen === item.id ? 'text-brand-sky bg-white/10' : 'text-white/85 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-brand-sky" />}
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => handleNavClick('apply')}
              className="w-full py-3 bg-brand-secondary hover:bg-brand-secondary/90 text-white rounded font-bold text-xs uppercase tracking-wider text-center"
            >
              {t('cta_apply')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

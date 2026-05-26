/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, PhoneCall, MapPin, Globe, Shield, CreditCard } from 'lucide-react';
import { Language } from '../types.ts';
import { LOCALIZATION } from '../data.ts';

interface FooterProps {
  currentLanguage: Language;
  onNavigate: (screen: string) => void;
}

export default function Footer({ currentLanguage, onNavigate }: FooterProps) {
  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  return (
    <footer className="bg-brand-dark text-white/80 pt-16 pb-8 border-t border-brand-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo/Info Col */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <img
                alt="NIF Logo Footer"
                className="h-12 w-auto object-contain brightness-0 invert opacity-90"
                src="https://lh3.googleusercontent.com/aida/ADBb0ui2VsYsPYlGMncv6d-npf5gkSvRQzMbpiZc5vBz_zaQ3R_iZn8jK_50rufWaAaPmFY6s6do0TqIIhE89a4cFPdqEjt2NRIu7G6xnBFjanpLZMPZ6-rzI3wG4fnQBnrQwfNKTrWyAux04vse5PlOZlM6TKiiWOjSDUkWsUP9xYBvA4LGPRrcKYEK3rOWHN3p-6XA8ShXUhshtcnGzap7A3J0wSsGGR-4o6nBsF0l8sTDUqgvXY1-xepM7xA"
              />
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-medium">
              ОАО «Национальный инвестиционный фонд Кыргызской Республики» — государственный локомотив инфраструктурной модернизации и привлечения капитала.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-secondary text-white hover:text-white transition-all duration-300 border border-white/5"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:office@nif.kg"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-secondary text-white hover:text-white transition-all duration-300 border border-white/5"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Address Col */}
          <div className="space-y-4">
            <h4 id="footer-address-header" className="text-white font-bold text-xs uppercase tracking-wider text-brand-sky flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t('footer_address_title')}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              {t('footer_address_val')}
            </p>
          </div>

          {/* Contact Phones Col */}
          <div className="space-y-4">
            <h4 id="footer-phones-header" className="text-white font-bold text-xs uppercase tracking-wider text-brand-sky flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              Контакты
            </h4>
            <ul className="space-y-3 text-xs font-sans text-white/70">
              <li>
                <span className="block text-white/50 text-[10px] uppercase font-bold tracking-wider mb-0.5">Ресепшн / Приемная</span>
                <a href="tel:+996312886668" className="hover:text-brand-sky font-semibold text-white transition-colors">
                  +996 312 88 66 68
                </a>
              </li>
              <li>
                <span className="block text-white/50 text-[10px] uppercase font-bold tracking-wider mb-0.5">Для инвесторов</span>
                <a href="tel:+996880000430" className="hover:text-brand-sky font-semibold text-white transition-colors">
                  +996 880 00 04 30
                </a>
              </li>
              <li className="pt-2 border-t border-white/5">
                <span className="block text-brand-sky text-[10px] uppercase font-bold tracking-wider mb-0.5 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-brand-red animate-pulse" />
                  {t('trust_phone')}
                </span>
                <a href="tel:+996990003055" className="hover:text-brand-red font-semibold text-brand-red font-bold transition-colors">
                  +996 990 00 30 55
                </a>
              </li>
            </ul>
          </div>

          {/* Useful links Col */}
          <div className="space-y-4">
            <h4 id="footer-links-header" className="text-white font-bold text-xs uppercase tracking-wider text-brand-sky flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              {t('footer_links_title')}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <a href="#" className="hover:text-brand-sky transition-colors flex items-center gap-1.5">
                  📁 Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-sky transition-colors flex items-center gap-1.5">
                  📜 Уставные документы фонда
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-sky transition-colors flex items-center gap-1.5">
                  📈 Финансовая отчетность
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calc')}
                  className="hover:text-brand-sky text-left transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  🧮 Кредитный симулятор
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-brand-sky text-left transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  ⚙️ Панель рецензирования
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Copyright Row */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-widest text-white/40 uppercase">
          <p>© {new Date().getFullYear()} OJSC National Investment Fund of the Kyrgyz Republic. All rights reserved.</p>
          <p className="flex items-center gap-1 font-sans">
            Разработано <span className="text-white text-xs font-bold tracking-normal uppercase bg-brand-secondary/30 px-2.5 py-1 rounded">Yorc</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

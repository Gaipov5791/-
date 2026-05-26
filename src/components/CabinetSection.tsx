/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileText, ArrowUpRight, Scale } from 'lucide-react';
import { Language } from '../types.ts';
import { LOCALIZATION } from '../data.ts';

interface CabinetSectionProps {
  currentLanguage: Language;
}

export default function CabinetSection({ currentLanguage }: CabinetSectionProps) {
  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  return (
    <section className="py-20 bg-brand-surface relative overflow-hidden border-b border-brand-outline-variant/20">
      {/* Abstract Grid Backdrop */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Legal Mandate Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-secondary">
              <Scale className="w-5 h-5 text-brand-sky" />
              <p className="font-bold text-xs uppercase tracking-widest leading-none">
                {t('cabinet_subtitle')}
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary leading-tight font-sans">
              {t('cabinet_title')}
            </h2>

            <div className="h-1 w-20 bg-brand-secondary"></div>

            <p className="text-sm sm:text-base text-brand-on-surface-variant font-medium leading-relaxed max-w-3xl">
              {t('cabinet_desc')}
            </p>

            <div className="pt-2">
              <a
                href="https://cbd.minjust.gov.kg"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 group font-bold text-xs uppercase tracking-wider text-brand-secondary hover:text-brand-primary transition-colors cursor-pointer"
              >
                <span>Электронная правовая база Минюста КР</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-brand-sky" />
              </a>
            </div>
          </div>

          {/* Abstract Logo Backdrop Container Column */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="aspect-square bg-brand-surface-low rounded-2xl flex items-center justify-center p-12 border border-brand-outline-variant/35 shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-300">
              <div className="relative text-center space-y-4">
                <img
                  alt="NIF Emblem"
                  className="w-40 mx-auto object-contain select-none opacity-15"
                  src="https://lh3.googleusercontent.com/aida/ADBb0ui2VsYsPYlGMncv6d-npf5gkSvRQzMbpiZc5vBz_zaQ3R_iZn8jK_50rufWaAaPmFY6s6do0TqIIhE89a4cFPdqEjt2NRIu7G6xnBFjanpLZMPZ6-rzI3wG4fnQBnrQwfNKTrWyAux04vse5PlOZlM6TKiiWOjSDUkWsUP9xYBvA4LGPRrcKYEK3rOWHN3p-6XA8ShXUhshtcnGzap7A3J0wSsGGR-4o6nBsF0l8sTDUqgvXY1-xepM7xA"
                />
                <span className="block text-[10px] uppercase font-semibold text-brand-on-surface-variant/40 tracking-widest font-mono">
                  УСТАВНЫЙ КАПИТАЛ ГОСУДАРСТВА
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

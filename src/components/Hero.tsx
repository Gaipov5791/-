/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Download, ChevronRight, Calculator, Landmark } from 'lucide-react';
import { Language } from '../types.ts';
import { LOCALIZATION } from '../data.ts';

interface HeroProps {
  currentLanguage: Language;
  onNavigate: (screen: string) => void;
}

export default function Hero({ currentLanguage, onNavigate }: HeroProps) {
  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  return (
    <section className="relative h-[95vh] min-h-[680px] flex items-center overflow-hidden bg-brand-primary">
      {/* Background with beautiful overlay parallax-simulate */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Kyrgyzstan Landscape"
          className="w-full h-full object-cover scale-105 select-none pointer-events-none"
          src="https://lh3.googleusercontent.com/aida/ADBb0uglpZe2oI35NIcjyWfCEyu-LCRM7Csn1_WhIeUeiCkIjWFS3WaZNYcnV4WWrRvQAgXSsWjZ6eLHAbAqMicoxKuvWwIYufzuqD_erfMOKoUVKwSwG_7lIFDGEVESLi3BQAGbH7qHyM3OQSE8RlosxoAuCexZQLoBKKzm4gBLAQZgmReOFadoS3G4NywMfKKRETGkDlfGs3-JBXEjk3AJqFOJpSrbsZ-72TGLEUZd7kbb3kG8AhseMAkQ_M8"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 via-transparent to-brand-primary/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl">
          {/* Animated Flag Strip */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-sky/15 rounded border border-brand-sky/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand-sky animate-ping"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-sky">
              Государственный институт развития КР
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight uppercase font-sans mb-6"
          >
            {t('hero_title_1')}{' '}
            <span className="block text-brand-sky font-semibold normal-case text-3xl sm:text-4xl lg:text-5xl pt-1">
              {t('hero_title_2')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-10 font-medium"
          >
            {t('hero_tagline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => onNavigate('apply')}
              className="px-6 py-4 rounded font-bold text-xs uppercase tracking-wider bg-brand-secondary hover:bg-brand-secondary/85 transition-all text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-secondary/20"
            >
              <Landmark className="w-4 h-4 text-brand-sky" />
              <span>{t('cta_apply')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('calc')}
              className="px-6 py-4 rounded font-bold text-xs uppercase tracking-wider border border-white/30 bg-white/5 hover:bg-white/10 transition-all text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-brand-sky" />
              <span>Финансовый Калькулятор</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Slide Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
        <span className="text-[9px] uppercase font-bold tracking-widest text-white">Прокрутите вниз</span>
        <div className="w-1 h-5 bg-white/10 rounded-full relative">
          <div className="w-1 h-2.5 bg-brand-sky rounded-full absolute top-0 left-0 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}

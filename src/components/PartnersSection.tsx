/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, Shield, ArrowUpRight } from 'lucide-react';
import { Language } from '../types.ts';
import { LOCALIZATION, PARTNERS } from '../data.ts';

interface PartnersSectionProps {
  currentLanguage: Language;
}

export default function PartnersSection({ currentLanguage }: PartnersSectionProps) {
  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  return (
    <section className="py-20 bg-brand-surface border-b border-brand-outline-variant/20" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header Elements */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 text-brand-secondary">
            <Users className="w-5 h-5 text-brand-sky" />
            <span className="font-bold text-xs uppercase tracking-widest leading-none">
              СТРАТЕГИЧЕСКИЕ АЛЬЯНСЫ
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-sans">
            {t('partners_title')}
          </h2>

          <div className="h-1 w-20 bg-brand-secondary mx-auto"></div>

          <p className="text-sm sm:text-base text-brand-on-surface-variant font-medium leading-relaxed">
            {t('partners_text')}
          </p>
        </div>

        {/* Corporate Grayscale grid matching style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-brand-outline-variant/20 rounded-xl overflow-hidden shadow-sm">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="aspect-[3/2] border-r border-b border-brand-outline-variant/20 bg-white flex flex-col justify-center items-center p-6 group transition-all duration-300 hover:bg-brand-surface-low relative"
            >
              <div className="partner-logo text-base sm:text-lg font-black uppercase text-brand-on-surface-variant/70 tracking-widest select-none font-sans group-hover:text-brand-primary">
                {partner.name}
              </div>

              <span className="text-[9px] uppercase font-bold text-brand-secondary tracking-wider mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {partner.type}
              </span>

              {/* Little corner link ornament */}
              <div className="absolute top-2 right-2 text-brand-sky/20 group-hover:text-brand-sky translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Audit Compliance Notice */}
        <div className="mt-8 p-4 bg-brand-surface-low rounded-xl inline-flex items-center gap-3 text-xs font-semibold text-brand-on-surface-variant border border-brand-outline-variant/15 text-left max-w-2xl mx-auto">
          <Shield className="w-5 h-5 text-brand-secondary flex-shrink-0" />
          <span>
            Все сделки соинвестирования подлежат обязательному международному аудиту «Big Four» (Большой четверки) до окончательного принятия решения наблюдательным советом.
          </span>
        </div>

      </div>
    </section>
  );
}

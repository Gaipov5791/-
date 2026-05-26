/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Factory, Truck, Zap, Compass, GraduationCap, HeartPulse, Building2, TrendingUp, CheckCircle, Eye } from 'lucide-react';
import { Language, Sector } from '../types.ts';
import { LOCALIZATION, SECTORS } from '../data.ts';

interface DirectionsSectionProps {
  currentLanguage: Language;
  onSelectSector: (sectorId: string) => void;
  selectedSectorId: string | null;
}

export default function DirectionsSection({
  currentLanguage,
  onSelectSector,
  selectedSectorId,
}: DirectionsSectionProps) {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  const getIcon = (iconName: string, active: boolean) => {
    const className = `w-6 h-6 transition-all duration-300 ${
      active ? 'text-white scale-110' : 'text-brand-secondary group-hover:scale-110'
    }`;
    switch (iconName) {
      case 'Factory':
        return <Factory className={className} />;
      case 'Truck':
        return <Truck className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'HeartPulse':
        return <HeartPulse className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  // Simulated metrics for each sector to display on hover
  const sectorStats: Record<string, { funding: string; count: number; efficiency: string }> = {
    industry: { funding: '45.2 млн USD', count: 18, efficiency: '+12.4% год' },
    logistics: { funding: '35.0 млн USD', count: 11, efficiency: '+8.9% год' },
    energy: { funding: '88.4 млн USD', count: 9, efficiency: '+15.2% год' },
    tourism: { funding: '14.5 млн USD', count: 24, efficiency: '+22.1% год' },
    education: { funding: '8.2 млн USD', count: 14, efficiency: '+5.7% год' },
    healthcare: { funding: '11.8 млн USD', count: 8, efficiency: '+10.4% год' },
  };

  return (
    <section className="py-24 bg-brand-surface border-b border-brand-outline-variant/20" id="directions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dual Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: 6 Sectors Cards */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SECTORS.map((sector) => {
                const isActive = selectedSectorId === sector.id;
                const isHovered = hoveredSector === sector.id;
                const stats = sectorStats[sector.id];

                return (
                  <div
                    key={sector.id}
                    onClick={() => {
                      onSelectSector(isActive ? '' : sector.id);
                      // Scroll to project list
                      const projectSection = document.getElementById('project-explorer');
                      if (projectSection) {
                        projectSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    onMouseEnter={() => setHoveredSector(sector.id)}
                    onMouseLeave={() => setHoveredSector(null)}
                    className={`p-5 rounded-xl border text-left transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[160px] relative overflow-hidden ${
                      isActive
                        ? 'bg-brand-primary text-white border-brand-primary shadow-xl scale-[1.01]'
                        : 'bg-brand-surface border-brand-outline-variant/30 hover:border-brand-secondary/40 hover:shadow-md'
                    }`}
                  >
                    {/* Background Sector Accent Pill on Hover */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-brand-secondary/5 rounded-full -translate-y-6 translate-x-6 group-hover:scale-125 transition-transform duration-300 ${isActive ? 'bg-white/5' : ''}`}></div>

                    {/* Top Row: Icon + Label */}
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'bg-brand-secondary' : 'bg-brand-surface-low group-hover:bg-brand-secondary/10'
                        }`}>
                          {getIcon(sector.icon, isActive)}
                        </div>
                        <h4 className={`text-sm sm:text-base font-bold font-sans ${isActive ? 'text-white' : 'text-brand-primary'}`}>
                          {sector.name[currentLanguage]}
                        </h4>
                      </div>

                      <p className={`text-xs leading-relaxed ${isActive ? 'text-white/80' : 'text-brand-on-surface-variant'}`}>
                        {sector.description[currentLanguage]}
                      </p>
                    </div>

                    {/* Bottom Row: Dynamic stats shown on Hover or Selection */}
                    <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] uppercase font-bold tracking-wider transition-all duration-300 relative z-10 ${
                      isActive ? 'border-white/10 text-brand-sky' : 'border-brand-outline-variant/15 text-brand-secondary'
                    }`}>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{stats.funding}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[9px] ${isActive ? 'bg-white/10 text-white' : 'bg-brand-surface-low text-brand-on-surface-variant'}`}>
                        {stats.count} проектов
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Helper Filter Notice */}
            <div className="mt-4 text-xs text-brand-on-surface-variant flex items-center gap-1.5 justify-end">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>* Нажмите на сектор, чтобы мгновенно просмотреть профильные инвест-проекты ниже</span>
            </div>
          </div>

          {/* Right Column: Beautiful vertical typography badge as designed */}
          <div className="lg:col-span-4 text-right space-y-2 order-1 lg:order-2">
            <h5 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-secondary select-none">
              {t('directions_header')}
            </h5>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-brand-primary uppercase tracking-tighter leading-none select-none">
              {t('directions_title')}
            </h2>
            <div className="w-24 h-1.5 bg-brand-secondary ml-auto mt-4 rounded"></div>
            <p className="text-xs font-semibold text-brand-on-surface-variant/75 pt-3 max-w-xs ml-auto leading-relaxed">
              НИФ концентрирует государственные активы вокруг секторов, закладывающих технологическую и логистическую основу завтрашнего дня Кыргызской Республики.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Building2, MapPin, TrendingUp, Coins, Users, Calendar, ArrowUpRight, SlidersHorizontal, Check } from 'lucide-react';
import { Language, ProjectItem } from '../types.ts';
import { LOCALIZATION, PROJECT_ITEMS, SECTORS } from '../data.ts';

interface ProjectExplorerProps {
  currentLanguage: Language;
  selectedSectorId: string | null;
  onClearSectorFilter: () => void;
}

export default function ProjectExplorer({
  currentLanguage,
  selectedSectorId,
  onClearSectorFilter,
}: ProjectExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>(selectedSectorId || 'all');

  // Synchronize when parent changes selectedSectorId (e.g. from clicking NIF Directions card)
  const currentSectorVal = selectedSectorId || selectedSector;

  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  const filteredProjects = PROJECT_ITEMS.filter((proj) => {
    const matchesSearch =
      proj.title[currentLanguage].toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.description[currentLanguage].toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || proj.region === selectedRegion;
    const matchesSector = currentSectorVal === 'all' || proj.sectorId === currentSectorVal;

    return matchesSearch && matchesRegion && matchesSector;
  });

  const getSectorBadge = (sectorId: string) => {
    return SECTORS.find(s => s.id === sectorId)?.name[currentLanguage] ?? sectorId;
  };

  const getProjectImage = (id: string) => {
    switch (id) {
      case 'proj-1':
        return 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80';
      case 'proj-2':
        return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80';
      case 'proj-3':
        return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=80';
      default:
        return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80';
    }
  };

  return (
    <section className="py-24 bg-white border-b border-brand-outline-variant/20" id="project-explorer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left space-y-4 mb-16">
          <h5 className="text-xs font-bold uppercase tracking-widest text-brand-secondary">
            ПОРТФЕЛЬ НАЦИОНАЛЬНЫХ АКТИВОВ
          </h5>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-sans">
            Инвестиционный реестр проектов
          </h2>
          <div className="h-1 w-20 bg-brand-secondary rounded"></div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-brand-surface border border-brand-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-6 mb-12 text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4.5 w-4.5 text-brand-on-surface-variant/40" />
              </div>
              <input
                type="text"
                placeholder="Поиск по названию или описанию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary text-brand-on-surface"
              />
            </div>

            {/* Region Dropdown filter */}
            <div className="md:col-span-3 flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-on-surface-variant/60">Регион:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-brand-outline-variant/25 rounded text-brand-on-surface font-semibold focus:ring-1 focus:ring-brand-secondary"
              >
                <option value="all">Все области КР</option>
                <option value="chuy">Чуйская область</option>
                <option value="batken">Баткенская область</option>
                <option value="osh">Ошская область</option>
                <option value="jalalabad">Джалал-Абадская область</option>
                <option value="naryn">Нарынская область</option>
                <option value="issyk-kul">Иссык-Кульская область</option>
                <option value="talas">Таласская область</option>
              </select>
            </div>

            {/* Sector Dropdown filter */}
            <div className="md:col-span-4 flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-on-surface-variant/60">Сектор:</span>
              <select
                value={currentSectorVal}
                onChange={(e) => {
                  setSelectedSector(e.target.value);
                  if (selectedSectorId) onClearSectorFilter(); // coordinate clean
                }}
                className="w-full px-3 py-2 text-xs bg-white border border-brand-outline-variant/25 rounded text-brand-on-surface font-semibold focus:ring-1 focus:ring-brand-secondary"
              >
                <option value="all">Все приоритетные отрасли</option>
                {SECTORS.map(sec => (
                  <option key={sec.id} value={sec.id}>
                    {sec.name[currentLanguage]}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Active filter badges display */}
          {(selectedRegion !== 'all' || currentSectorVal !== 'all' || searchTerm) && (
            <div className="pt-4 border-t border-brand-outline-variant/15 flex flex-wrap gap-2 items-center text-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-brand-on-surface-variant/50">Фильтры:</span>
              
              {selectedRegion !== 'all' && (
                <span className="px-2.5 py-1 bg-brand-primary/10 text-brand-primary rounded font-semibold text-[10px] uppercase flex items-center gap-1">
                  <span>Регион: {selectedRegion.toUpperCase()}</span>
                  <button onClick={() => setSelectedRegion('all')} className="hover:text-brand-red font-bold font-sans cursor-pointer pl-1">×</button>
                </span>
              )}

              {currentSectorVal !== 'all' && (
                <span className="px-2.5 py-1 bg-brand-secondary/15 text-brand-secondary rounded font-semibold text-[10px] uppercase flex items-center gap-1">
                  <span>Отрасль: {getSectorBadge(currentSectorVal)}</span>
                  <button onClick={() => {
                    setSelectedSector('all');
                    onClearSectorFilter();
                  }} className="hover:text-brand-red font-bold font-sans cursor-pointer pl-1">×</button>
                </span>
              )}

              {searchTerm && (
                <span className="px-2.5 py-1 bg-brand-on-surface-variant/10 text-brand-on-surface-variant rounded font-semibold text-[10px] uppercase flex items-center gap-1">
                  <span>Поиск: "{searchTerm}"</span>
                  <button onClick={() => setSearchTerm('')} className="hover:text-brand-red font-bold font-sans cursor-pointer pl-1">×</button>
                </span>
              )}
            </div>
          )}

        </div>

        {/* Dynamic portfolio results grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-brand-outline-variant/20 rounded-2xl max-w-2xl mx-auto space-y-3">
            <Building2 className="w-16 h-16 text-brand-on-surface-variant/20 mx-auto" />
            <h4 className="font-extrabold text-brand-primary text-base">Инвестиционные проекты не найдены</h4>
            <p className="text-xs text-brand-on-surface-variant max-w-sm mx-auto leading-relaxed">
              Попробуйте сбросить фильтры по областям КР или переключить отраслевой диапазон запросов.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-brand-outline-variant/25 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform flex flex-col justify-between group"
              >
                {/* Image panel with live indicator */}
                <div className="h-52 w-full overflow-hidden relative">
                  <img
                    alt={project.title[currentLanguage]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={getProjectImage(project.id)}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-brand-primary/90 text-white font-bold tracking-wider rounded text-[9px] uppercase px-2.5 py-1 backdrop-blur-xs">
                    {getSectorBadge(project.sectorId)}
                  </div>
                  
                  {/* Blinking actual GPS radar */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded text-white text-[9px] font-bold backdrop-blur-xs">
                    <span className="w-1.5 h-1.5 bg-brand-sky rounded-full animate-ping"></span>
                    <span>Регион: {project.region[currentLanguage].toUpperCase()}</span>
                  </div>
                </div>

                {/* Info Text panel */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-extrabold text-brand-primary group-hover:text-brand-secondary transition-colors font-sans leading-snug">
                      {project.title[currentLanguage]}
                    </h3>
                    <p className="text-xs text-brand-on-surface-variant/85 leading-relaxed line-clamp-4">
                      {project.description[currentLanguage]}
                    </p>
                  </div>

                  {/* Operational stats values */}
                  <div className="pt-4 border-t border-brand-outline-variant/15 space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-[11px]">
                      <div className="space-y-0.5">
                        <span className="text-brand-on-surface-variant font-medium uppercase block">Инвест-бюджет:</span>
                        <span className="font-extrabold text-brand-primary flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5 text-brand-secondary/80" />
                          <span>${project.totalCost.toLocaleString()}</span>
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-brand-on-surface-variant font-medium uppercase block">Рабочие места:</span>
                        <span className="font-extrabold text-brand-primary flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-brand-secondary/80" />
                          <span>+{project.jobsCreated} сотрудников</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-brand-on-surface-variant/50 pt-2 border-t border-dashed border-brand-outline-variant/20">
                      <span className="flex items-center gap-1 font-semibold text-brand-secondary uppercase">
                        <TrendingUp className="w-3.5 h-3.5 text-brand-sky" />
                        <span>Код квоты</span>
                      </span>
                      <span className="font-bold font-mono text-brand-secondary">NIF-PROJ-{project.id.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

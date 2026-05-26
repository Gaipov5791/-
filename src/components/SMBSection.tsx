/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Map, MapPin, Users, Coins, CheckSquare, PlusCircle, ArrowUpRight } from 'lucide-react';
import { Language } from '../types.ts';
import { LOCALIZATION } from '../data.ts';

interface SMBSectionProps {
  currentLanguage: Language;
}

interface RegionDetail {
  id: string;
  name: Record<Language, string>;
  projectsCount: number;
  totalGovCapital: string;
  jobsCreated: number;
  mainSector: Record<Language, string>;
}

export default function SMBSection({ currentLanguage }: SMBSectionProps) {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('chuy');

  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  const regions: RegionDetail[] = [
    {
      id: 'chuy',
      name: { RU: 'Чуйская область', KG: 'Чүй облусу', EN: 'Chuy Region', CN: '楚河州' },
      projectsCount: 42,
      totalGovCapital: '18.4 млн USD',
      jobsCreated: 1250,
      mainSector: { RU: 'Транспорт, логистика и машиностроение', KG: 'Транспорт, логистика жана машина куруу', EN: 'Transport, Logistics & Manufacturing', CN: '交通物流与装备制造' },
    },
    {
      id: 'batken',
      name: { RU: 'Баткенская область', KG: 'Баткен облусу', EN: 'Batken Region', CN: '巴特肯州' },
      projectsCount: 19,
      totalGovCapital: '6.5 млн USD',
      jobsCreated: 480,
      mainSector: { RU: 'Переработка плодово-ягодных культур', KG: 'Мөмө-жемиш өсүмдүктөрүн кайра иштетүү', EN: 'Agri-processing & Apricots Export', CN: '特色林果杏果生态深加工' },
    },
    {
      id: 'osh',
      name: { RU: 'Ошская область', KG: 'Ош облусу', EN: 'Osh Region', CN: '奥什州' },
      projectsCount: 28,
      totalGovCapital: '11.2 млн USD',
      jobsCreated: 850,
      mainSector: { RU: 'Легкая промышленность и текстиль', KG: 'Жеңил өнөр жайы жана текстиль', EN: 'Textiles & Consumer Light Industry', CN: '轻工纺织和服饰制造工艺' },
    },
    {
      id: 'jalalabad',
      name: { RU: 'Джалал-Абадская область', KG: 'Жалал-Абад облусу', EN: 'Jalal-Abad Region', CN: '贾拉拉巴德州' },
      projectsCount: 15,
      totalGovCapital: '22.0 млн USD',
      jobsCreated: 720,
      mainSector: { RU: 'Малая гидроэнергетика и деревообработка', KG: 'Чакан гидроэнергетика жана жыгач иштетүү', EN: 'Small Hydropower Plants (SHP)', CN: '中小水电开发与矿产利用' },
    },
    {
      id: 'naryn',
      name: { RU: 'Нарынская область', KG: 'Нарын облусу', EN: 'Naryn Region', CN: '纳aryn州' },
      projectsCount: 8,
      totalGovCapital: '4.8 млн USD',
      jobsCreated: 210,
      mainSector: { RU: 'Животноводство и хладокомбинаты', KG: 'Мал чарбачылыгы жана муздаткыч комбинаттар', EN: 'Meat Processing & Cold Storage Facilities', CN: '高寒牧草与现代化冷链屠宰' },
    },
    {
      id: 'issyk-kul',
      name: { RU: 'Иссык-Кульская область', KG: 'Ысык-Көл облусу', EN: 'Issyk-Kul Region', CN: '伊塞克湖州' },
      projectsCount: 21,
      totalGovCapital: '9.4 млн USD',
      jobsCreated: 540,
      mainSector: { RU: 'Эко-туризм и пищевая промышл.', KG: 'Эко-туризм жана тамак-аш өнөр жайы', EN: 'Eco-Tourism Infrastructure & Food Production', CN: '湖滨康养文旅与高端生态度假区' },
    },
    {
      id: 'talas',
      name: { RU: 'Таласская область', KG: 'Талас облусу', EN: 'Talas Region', CN: '塔拉斯州' },
      projectsCount: 6,
      totalGovCapital: '3.1 млн USD',
      jobsCreated: 180,
      mainSector: { RU: 'Фасолевые кластеры и логистика', KG: 'Төө бурчак кластерлери жана логистика', EN: 'Legumes Sortation & Organic Agronomy', CN: '高氮蚕豆豆类出口精选初加工' },
    },
  ];

  const currentRegion = regions.find(r => r.id === selectedRegionId) || regions[0];

  return (
    <section className="py-24 bg-brand-surface-low border-b border-brand-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Descriptions and Stats Counter */}
          <div className="space-y-8 text-left">
            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-brand-secondary">
                РЕГИОНАЛЬНОЕ РАЗВИТИЕ
              </h5>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary leading-tight font-sans">
                {t('smb_title')}
              </h2>
              <div className="h-1 w-20 bg-brand-secondary rounded"></div>
            </div>

            <div className="space-y-5 text-sm sm:text-base text-brand-on-surface-variant font-medium leading-relaxed">
              <p>{t('smb_text')}</p>
              <p className="text-xs text-brand-on-surface-variant/80 border-l-2 border-brand-secondary pl-3">
                Реализуемые инициативы напрямую способствуют увеличению добавленной стоимости сельскохозяйственной продукции, расширению локальных рынков сбыта и выравниванию уровня жизни в регионах нашей страны.
              </p>
            </div>

            {/* Structured counters panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div id="smb-counter" className="p-6 bg-white border border-brand-outline-variant/20 rounded-xl shadow-sm flex items-start gap-4">
                <div className="p-3 bg-brand-sky/15 text-brand-secondary rounded-lg">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-brand-primary leading-none">
                    {t('smb_counter_num')}
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-brand-secondary tracking-wider mt-1.5">
                    {t('smb_counter_desc')}
                  </p>
                </div>
              </div>

              <div id="smb-jobs-counter" className="p-6 bg-white border border-brand-outline-variant/20 rounded-xl shadow-sm flex items-start gap-4">
                <div className="p-3 bg-brand-sky/15 text-brand-secondary rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-brand-primary leading-none">
                    4,200+
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-brand-secondary tracking-wider mt-1.5">
                    Создано новых рабочих мест
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-brand-secondary/5 border border-brand-secondary/15 rounded-xl text-xs font-medium text-brand-on-surface flex items-center gap-3">
              <CheckSquare className="w-5 h-5 text-brand-secondary flex-shrink-0" />
              <span>{t('smb_support_card')}</span>
            </div>
          </div>

          {/* Right Column: Dynamic Region Map Dashboard */}
          <div className="bg-white border border-brand-outline-variant/30 rounded-2xl p-8 shadow-sm flex flex-col justify-between min-h-[460px] relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-brand-outline-variant/20 pb-4">
                <h4 className="font-extrabold text-brand-primary text-base font-sans flex items-center gap-2">
                  <Map className="w-5 h-5 text-brand-sky" />
                  <span>Интерактивная карта областей</span>
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary bg-brand-surface-low px-2 py-1 rounded">
                  7 областей КР
                </span>
              </div>

              {/* Grid of Regions selector buttons */}
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => {
                  const isSelected = region.id === selectedRegionId;
                  return (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegionId(region.id)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer ${
                        isSelected
                          ? 'bg-brand-primary text-white font-bold'
                          : 'bg-brand-surface-low text-brand-on-surface-variant hover:bg-brand-secondary/10 hover:text-brand-primary'
                      }`}
                    >
                      {region.name[currentLanguage].replace(' область', '').replace(' облусу', '').replace(' Region', '')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Region Details Display Frame */}
            <div className="my-8 p-6 bg-brand-surface border border-brand-outline-variant/25 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-brand-secondary/5 scale-150 pointer-events-none">
                <MapPin className="w-24 h-24" />
              </div>

              <div className="space-y-4 relative z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary">Текущий регион:</span>
                  <h5 className="text-xl font-extrabold text-brand-primary font-sans mt-0.5">
                    {currentRegion.name[currentLanguage]}
                  </h5>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-[10px] font-medium text-brand-on-surface-variant uppercase block">Выделено Капитала:</span>
                    <span className="text-base font-bold text-brand-primary">{currentRegion.totalGovCapital}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium text-brand-on-surface-variant uppercase block">Новые рабочие места</span>
                    <span className="text-base font-bold text-brand-primary">+{currentRegion.jobsCreated} мест</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-brand-outline-variant/15">
                  <span className="text-[10px] font-medium text-brand-on-surface-variant uppercase block">Основной вектор поддержки:</span>
                  <span className="text-xs font-semibold text-brand-secondary block mt-0.5">
                    {currentRegion.mainSector[currentLanguage]}
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated blinking radar map representing GPS co-invest */}
            <div className="flex items-center justify-between text-xs text-brand-on-surface-variant font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></span>
                <span>Статус мониторинга: Активный аудит</span>
              </span>
              <span className="font-mono text-[10px] uppercase font-bold text-brand-secondary">
                NIF.{currentRegion.id.toUpperCase()}.GPS // 2026
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

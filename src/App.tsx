/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Search, X, FileText, CheckCircle, HelpCircle } from 'lucide-react';
import { Language, FinancingApplication } from './types.ts';
import { LOCALIZATION } from './data.ts';

// Main subcomponents
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import CabinetSection from './components/CabinetSection.tsx';
import FinancingSection from './components/FinancingSection.tsx';
import DirectionsSection from './components/DirectionsSection.tsx';
import SMBSection from './components/SMBSection.tsx';
import PartnersSection from './components/PartnersSection.tsx';
import NewsSection from './components/NewsSection.tsx';
import ProjectExplorer from './components/ProjectExplorer.tsx';
import Calculator from './components/Calculator.tsx';
import ApplicationForm from './components/ApplicationForm.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import Footer from './components/Footer.tsx';

// Pre-populated applications catalog for simulation
const INITIAL_APPLICATIONS: FinancingApplication[] = [
  {
    id: 'app-9u2k',
    companyName: 'ОсОО «Кыргыз Логистик Групп»',
    inn: '20102199043215',
    contactName: 'Садыков Алмаз Эсенович',
    email: 'almaz@logistic.kg',
    phone: '+996 550 44 33 22',
    sectorId: 'logistics',
    projectTitle: 'Строительство оптово-распределительного холодильного хаба в Чуйской области',
    projectDescription: 'Создание энергоэффективного терминала класса А для хранения и пакетирования плодоовощной продукции на экспорт.',
    totalBudget: 450000,
    requestedFunding: 300000,
    expectedJobs: 45,
    region: 'chuy',
    status: 'APPROVED',
    createdAt: '2026-05-18',
  },
  {
    id: 'app-5k1m',
    companyName: 'ЗАО «Кадамжай Сухофрукт Ко.»',
    inn: '21512199876543',
    contactName: 'Абдыразаков Нурбек Капарович',
    email: 'nurbek@kadamfruit.kg',
    phone: '+996 772 15 15 15',
    sectorId: 'industry',
    projectTitle: 'Запуск линии шоковой заморозки и сушки миндаля и абрикосов',
    projectDescription: 'Приобретение современных турецких сушильных пекарных шкафов для кооперативов Баткенской области.',
    totalBudget: 150000,
    requestedFunding: 100000,
    expectedJobs: 24,
    region: 'batken',
    status: 'PENDING',
    createdAt: '2026-05-25',
  }
];

export default function App() {
  const [currentLanguage, setLanguage] = useState<Language>('RU');
  const [activeScreen, setActiveScreen] = useState<string>('home'); // home, apply, calc, admin
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);
  
  // Applications management state
  const [applications, setApplications] = useState<FinancingApplication[]>(() => {
    const cached = localStorage.getItem('nif_applications');
    return cached ? JSON.parse(cached) : INITIAL_APPLICATIONS;
  });

  // Global search overlay toggle
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Success Application Popup model
  const [successApp, setSuccessApp] = useState<FinancingApplication | null>(null);

  useEffect(() => {
    localStorage.setItem('nif_applications', JSON.stringify(applications));
  }, [applications]);

  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  const handleApplySuccess = (newApp: FinancingApplication) => {
    setApplications(prev => [newApp, ...prev]);
    setSuccessApp(newApp);
    setActiveScreen('home');
  };

  const handleUpdateAppStatus = (id: string, newStatus: FinancingApplication['status']) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  return (
    <div className="min-h-screen bg-brand-surface font-sans antialiased text-brand-on-surface flex flex-col justify-between selection:bg-brand-secondary/30 selection:text-brand-primary">
      
      {/* Scroll to Top element on load */}
      <Header
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Container spacing since Header is fixed */}
      <main className="flex-grow pt-20">

        {/* Dynamic Screen Routing */}
        {activeScreen === 'home' && (
          <div className="space-y-0">
            <Hero currentLanguage={currentLanguage} onNavigate={setActiveScreen} />
            <CabinetSection currentLanguage={currentLanguage} />
            <FinancingSection currentLanguage={currentLanguage} onNavigate={setActiveScreen} />
            
            <DirectionsSection
              currentLanguage={currentLanguage}
              selectedSectorId={selectedSectorId}
              onSelectSector={setSelectedSectorId}
            />
            
            <ProjectExplorer
              currentLanguage={currentLanguage}
              selectedSectorId={selectedSectorId}
              onClearSectorFilter={() => setSelectedSectorId(null)}
            />
            
            <SMBSection currentLanguage={currentLanguage} />
            <PartnersSection currentLanguage={currentLanguage} />
            <NewsSection currentLanguage={currentLanguage} />
          </div>
        )}

        {activeScreen === 'apply' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <ApplicationForm
              currentLanguage={currentLanguage}
              onSubmitSuccess={handleApplySuccess}
              onCancel={() => setActiveScreen('home')}
            />
          </div>
        )}

        {activeScreen === 'calc' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Calculator currentLanguage={currentLanguage} />
          </div>
        )}

        {activeScreen === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <AdminDashboard
              currentLanguage={currentLanguage}
              applications={applications}
              onUpdateStatus={handleUpdateAppStatus}
            />
          </div>
        )}

        {/* General section navigation anchors */}
        {['projects', 'financing', 'directions', 'partners', 'news'].includes(activeScreen) && (
          <div className="space-y-0">
            <Hero currentLanguage={currentLanguage} onNavigate={setActiveScreen} />
            <CabinetSection currentLanguage={currentLanguage} />
            <FinancingSection currentLanguage={currentLanguage} onNavigate={setActiveScreen} />
            
            <DirectionsSection
              currentLanguage={currentLanguage}
              selectedSectorId={selectedSectorId}
              onSelectSector={setSelectedSectorId}
            />
            
            <ProjectExplorer
              currentLanguage={currentLanguage}
              selectedSectorId={selectedSectorId}
              onClearSectorFilter={() => setSelectedSectorId(null)}
            />
            
            <SMBSection currentLanguage={currentLanguage} />
            <PartnersSection currentLanguage={currentLanguage} />
            <NewsSection currentLanguage={currentLanguage} />
          </div>
        )}

      </main>

      {/* Unified footer */}
      <Footer currentLanguage={currentLanguage} onNavigate={setActiveScreen} />

      {/* GLOBAL SEARCH OVERLAY POPUP */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-10 pt-[15vh]">
          {/* Backdrop screen filter */}
          <div
            className="fixed inset-0 bg-brand-primary/80 backdrop-blur-md"
            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
          ></div>

          {/* Search container card */}
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-brand-outline-variant/30 shadow-2xl relative z-10 p-6 sm:p-8 flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-brand-outline-variant/20 pb-4">
              <h4 className="font-extrabold text-brand-primary text-base font-sans flex items-center gap-2">
                <Search className="w-5 h-5 text-brand-sky" />
                <span>Глобальный реестровый поиск НИФ КР</span>
              </h4>
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="p-1 text-brand-on-surface-variant/70 hover:text-brand-red rounded-full hover:bg-brand-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              placeholder="Введите запрос, например, 'абрикос', 'Чуй', 'субсидии'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary bg-brand-surface-low"
            />

            {/* Quick search helpers */}
            <div className="space-y-4 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant/40 block">Результаты экспресс-поиска</span>
              
              {searchQuery.trim().length === 0 ? (
                <div className="text-xs text-brand-on-surface-variant/65 flex items-center gap-2 bg-brand-surface border border-brand-outline-variant/15 p-3 rounded">
                  <HelpCircle className="w-4 h-4 text-brand-secondary" />
                  <span>Поиск сканирует ведомости инвестиционных проектов, пресс-релизы и региональные инициативы.</span>
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-3 custom-scrollbar">
                  {/* Filter elements on the fly */}
                  {searchQuery.length > 1 && (
                    <div className="p-3 bg-brand-secondary/5 rounded border border-brand-secondary/10 hover:bg-brand-secondary/10 transition-colors">
                      <span className="text-[9px] font-bold uppercase text-brand-secondary tracking-wider block">Детектор совпадений</span>
                      <p className="text-xs text-brand-primary font-bold mt-1">Реестровые совпадения по ключу "{searchQuery}"</p>
                      <button
                        onClick={() => {
                          setIsSearchOpen(false);
                          setActiveScreen('home');
                          // Scroll to projects explorer
                          setTimeout(() => {
                            const explorerEl = document.getElementById('project-explorer');
                            if (explorerEl) explorerEl.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="text-[11px] font-bold text-brand-secondary hover:text-brand-primary underline transition-colors mt-2 text-left cursor-pointer"
                      >
                        Применить фильтрацию к каталогу проектов →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* APPLICATION SUBMISSION SUCCESS MODAL */}
      {successApp && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-brand-primary/75 backdrop-blur-md"></div>
          
          <div className="bg-white rounded-2xl max-w-md w-full border border-brand-sky/20 shadow-2xl relative z-10 p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-brand-primary font-sans">Заявление подписано!</h4>
              <p className="text-xs text-brand-on-surface-variant leading-relaxed font-semibold">
                Кредитный соинвестиционный кейс Вашего юридического лица зарегистрирован в автоматизированном государственном комитете ОАО «НИФ КР».
              </p>
            </div>

            {/* Document details box */}
            <div className="p-4 bg-brand-surface-low border border-brand-outline-variant/20 rounded-xl space-y-2 text-xs font-mono text-left">
              <div className="flex justify-between">
                <span className="text-brand-on-surface-variant/60 uppercase">Организация:</span>
                <span className="font-bold text-brand-primary">{successApp.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-on-surface-variant/60 uppercase">Шифр КР:</span>
                <span className="font-bold text-brand-secondary uppercase">{successApp.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-on-surface-variant/60 uppercase">Заявка (USD):</span>
                <span className="font-bold text-brand-primary">${successApp.requestedFunding.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSuccessApp(null)}
              className="w-full py-3 bg-brand-primary hover:bg-brand-secondary text-white rounded font-bold text-xs uppercase tracking-wider text-center shadow-lg cursor-pointer"
            >
              Завершить сессию
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

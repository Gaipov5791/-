/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShieldAlert, CreditCard, Users, Landmark, FileText, Check, X, ShieldCheck, HelpCircle, Activity, BarChart2 } from 'lucide-react';
import { Language, FinancingApplication } from '../types.ts';
import { LOCALIZATION, SECTORS } from '../data.ts';

interface AdminDashboardProps {
  currentLanguage: Language;
  applications: FinancingApplication[];
  onUpdateStatus: (id: string, newStatus: FinancingApplication['status']) => void;
}

export default function AdminDashboard({
  currentLanguage,
  applications,
  onUpdateStatus,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'PENDING' | 'APPROVED' | 'REJECTED'>('all');

  const filteredApps = applications.filter(app => {
    if (activeTab === 'all') return true;
    return app.status === activeTab;
  });

  const getStatusStyle = (status: FinancingApplication['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'APPROVED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: FinancingApplication['status']) => {
    switch (status) {
      case 'PENDING': return 'В очереди';
      case 'APPROVED': return 'Одобрено';
      case 'REJECTED': return 'Отклонено';
      case 'UNDER_REVIEW': return 'Рецензия';
    }
  };

  // Dashboard calculations
  const totalFundingRequested = applications.reduce((sum, app) => sum + app.requestedFunding, 0);
  const totalJobsExpected = applications.reduce((sum, app) => sum + app.expectedJobs, 0);
  const approvedApps = applications.filter(app => app.status === 'APPROVED');
  const sumApprovedCapital = approvedApps.reduce((sum, app) => sum + app.requestedFunding, 0);

  // Sector stats representation for dynamic bar indicators
  const sectorCounts: Record<string, number> = {};
  applications.forEach(app => {
    sectorCounts[app.sectorId] = (sectorCounts[app.sectorId] || 0) + app.requestedFunding;
  });

  const getSectorName = (id: string) => {
    return SECTORS.find(s => s.id === id)?.name[currentLanguage] || id;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 my-12 text-left px-4 sm:px-6">
      
      {/* Dashboard Top Title with Shield status */}
      <div className="bg-brand-primary text-white p-8 rounded-2xl border border-brand-secondary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-sans flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-brand-sky" />
            <span>Панель рецензирования заявлений НИФ КР</span>
          </h3>
          <p className="text-xs text-brand-sky mt-1 font-semibold">
            Регламент служебного доступа // Проверка благонадежности ИНН субъектов и финансовый комплаенс
          </p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/15">
            <Activity className="w-3.5 h-3.5 text-brand-sky animate-pulse" />
            <span>Аудит: Активен</span>
          </span>
        </div>
      </div>

      {/* Metric counters row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div id="metric-apps" className="p-6 bg-white border border-brand-outline-variant/30 rounded-xl shadow-sm space-y-1">
          <span className="block text-[10px] uppercase font-bold text-brand-on-surface-variant/50 tracking-wider">Всего заявлений КР</span>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-brand-primary">{applications.length} заявок</span>
            <FileText className="w-5 h-5 text-brand-secondary/40" />
          </div>
        </div>

        <div id="metric-requested" className="p-6 bg-white border border-brand-outline-variant/30 rounded-xl shadow-sm space-y-1">
          <span className="block text-[10px] uppercase font-bold text-brand-on-surface-variant/50 tracking-wider">Всего запрошено</span>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-brand-primary">${totalFundingRequested.toLocaleString()}</span>
            <CreditCard className="w-5 h-5 text-brand-secondary/40" />
          </div>
        </div>

        <div id="metric-approved" className="p-6 bg-white border border-brand-outline-variant/30 rounded-xl shadow-sm space-y-1">
          <span className="block text-[10px] uppercase font-bold text-brand-on-surface-variant/50 tracking-wider">Одобрено бюджетом</span>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-emerald-600">${sumApprovedCapital.toLocaleString()}</span>
            <Landmark className="w-5 h-5 text-emerald-500/40" />
          </div>
        </div>

        <div id="metric-jobs" className="p-6 bg-white border border-brand-outline-variant/30 rounded-xl shadow-sm space-y-1">
          <span className="block text-[10px] uppercase font-bold text-brand-on-surface-variant/50 tracking-wider">Прогноз рабочих квот</span>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-brand-primary">+{totalJobsExpected} мест</span>
            <Users className="w-5 h-5 text-brand-secondary/40" />
          </div>
        </div>
      </div>

      {/* Visual Analytics layout */}
      {applications.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-8 border border-brand-outline-variant/25 rounded-xl shadow-sm">
          
          <div className="lg:col-span-8 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-primary border-b border-brand-outline-variant/15 pb-2 flex items-center gap-1.5">
              <BarChart2 className="w-4.5 h-4.5 text-brand-sky" />
              <span>Распределение финансирования по секторам хозяйства</span>
            </h4>

            {/* Custom SVG/CSS bar graph representing requested funding share */}
            <div className="space-y-4.5 pt-2">
              {SECTORS.map((sector) => {
                const amount = sectorCounts[sector.id] || 0;
                const percent = totalFundingRequested > 0 ? (amount / totalFundingRequested) * 100 : 0;
                return (
                  <div key={sector.id} className="space-y-1.5 text-xs text-brand-on-surface-variant">
                    <div className="flex justify-between font-semibold">
                      <span>{sector.name[currentLanguage]}</span>
                      <span className="font-bold text-brand-primary">${amount.toLocaleString()} ({Math.round(percent)}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-brand-surface-low rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-secondary rounded-full transition-all duration-500"
                        style={{ width: `${percent || 2}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 p-5 bg-brand-surface border border-brand-outline-variant/20 rounded-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-red">
                <ShieldAlert className="w-4 h-4" />
                <span>Комплаенс регламент КР</span>
              </div>
              <h5 className="text-sm font-extrabold text-brand-primary font-sans leading-snug">
                Категоризация рисков ИНН
              </h5>
              <p className="text-[11px] text-brand-on-surface-variant leading-relaxed font-semibold">
                Каждое отправленное на соискание досье автоматически сопоставляется с реестром банкротств Минюста КР и базой налоговой задолженности.
              </p>
            </div>
            <div className="pt-4 border-t border-brand-outline-variant/15 text-[10px] text-brand-on-surface-variant font-mono">
              * Записи защищены сквозным криптографическим протоколом.
            </div>
          </div>

        </div>
      )}

      {/* Main Table Interface */}
      <div className="bg-white border border-brand-outline-variant/30 rounded-2xl shadow-sm overflow-hidden text-xs">
        
        {/* Table Tab buttons */}
        <div className="px-6 py-4 bg-brand-surface-low border-b border-brand-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {(['all', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'bg-white text-brand-on-surface-variant border border-brand-outline-variant/20 hover:bg-brand-surface-high'
                }`}
              >
                {tab === 'all' ? 'Все заявки' : getStatusLabel(tab as FinancingApplication['status'])}
              </button>
            ))}
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-on-surface-variant/60 font-mono">
            Очередь: {filteredApps.length} записей выведено
          </span>
        </div>

        {/* Dynamic List */}
        {filteredApps.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <HelpCircle className="w-16 h-16 text-brand-on-surface-variant/20 mx-auto" />
            <div className="space-y-1">
              <h5 className="font-extrabold text-brand-primary text-sm font-sans">
                Очередь верификации пуста
              </h5>
              <p className="text-[11px] text-brand-on-surface-variant/65">
                Нет поданных заявлений соответствующего статуса. Попробуйте отправить тестовое заявление на финансирование!
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-brand-outline-variant/25">
              <thead className="bg-brand-surface">
                <tr className="text-left text-[10px] uppercase font-bold text-brand-on-surface-variant tracking-wider">
                  <th className="px-6 py-4">Организация и ИНН</th>
                  <th className="px-6 py-4">Проект и Сектор</th>
                  <th className="px-6 py-4 text-left">Запрос финансирования (USD)</th>
                  <th className="px-6 py-4">Дата</th>
                  <th className="px-6 py-4">Статус</th>
                  <th className="px-6 py-4 text-right">Экспертные действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-outline-variant/15 font-medium text-brand-on-surface">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-brand-surface-low transition-colors">
                    
                    {/* Company Cell */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="block font-bold text-brand-primary text-xs">{app.companyName}</span>
                        <span className="block text-[10px] text-brand-on-surface-variant/60 font-mono">ИНН: {app.inn} // {app.region.toUpperCase()}</span>
                      </div>
                    </td>

                    {/* Project & Sector Cell */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 max-w-xs">
                        <span className="block font-semibold truncate leading-normal" title={app.projectTitle}>
                          {app.projectTitle}
                        </span>
                        <span className="block text-[10px] text-brand-secondary font-bold uppercase">
                          {getSectorName(app.sectorId)}
                        </span>
                      </div>
                    </td>

                    {/* Budget Requested */}
                    <td className="px-6 py-4 text-left font-mono text-xs">
                      <div className="space-y-0.5">
                        <span className="block font-black text-brand-primary">${app.requestedFunding.toLocaleString()}</span>
                        <span className="block text-[9px] text-brand-on-surface-variant/50">Доля: {Math.round((app.requestedFunding / app.totalBudget) * 100)}% от сметобъема</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 font-mono text-brand-on-surface-variant/75 text-[11px]">
                      {app.createdAt}
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border ${getStatusStyle(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        {app.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => {
                                onUpdateStatus(app.id, 'APPROVED');
                                alert(`Заявка ОсОО "${app.companyName}" официально одобрена к софинансированию бюджетом ОАО «НИФ КР»!`);
                              }}
                              className="p-1 px-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded font-bold text-[10px] uppercase flex items-center gap-1 cursor-pointer transition-transform"
                              style={{ padding: '4px 8px' }}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Одобрить</span>
                            </button>
                            <button
                              onClick={() => {
                                onUpdateStatus(app.id, 'REJECTED');
                                alert(`Заявка субъекта "${app.companyName}" отклонена ввиду несоответствия кредитным лимитам.`);
                              }}
                              className="p-1 px-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded font-bold text-[10px] uppercase flex items-center gap-1 cursor-pointer transition-transform"
                              style={{ padding: '4px 8px' }}
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Отклонить</span>
                            </button>
                          </>
                        )}
                        {app.status !== 'PENDING' && (
                          <span className="text-[10px] font-bold font-mono text-brand-on-surface-variant/50 uppercase">Решение вынесено</span>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}

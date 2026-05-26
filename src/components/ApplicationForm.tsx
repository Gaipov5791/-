/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Building, Briefcase, Coins, CheckCircle, ArrowRight, ArrowLeft, AlertCircle, Phone, Mail, FileText } from 'lucide-react';
import { Language, Sector, FinancingApplication } from '../types.ts';
import { LOCALIZATION, SECTORS } from '../data.ts';

interface ApplicationFormProps {
  currentLanguage: Language;
  onSubmitSuccess: (application: FinancingApplication) => void;
  onCancel: () => void;
}

export default function ApplicationForm({
  currentLanguage,
  onSubmitSuccess,
  onCancel,
}: ApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Form states matching standard business registration criteria
  const [companyName, setCompanyName] = useState('');
  const [inn, setInn] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('chuy');
  
  const [projectTitle, setProjectTitle] = useState('');
  const [sectorId, setSectorId] = useState('industry');
  const [projectDescription, setProjectDescription] = useState('');
  const [expectedJobs, setExpectedJobs] = useState(10);
  
  const [totalBudget, setTotalBudget] = useState(100000);
  const [requestedFunding, setRequestedFunding] = useState(50000);

  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  const validateStep1 = () => {
    if (!companyName.trim()) return 'Укажите официальное юрид. название компании';
    if (inn.length !== 14 || isNaN(Number(inn))) return 'ИНН должен состоять ровно из 14 цифр';
    if (!contactName.trim()) return 'Укажите ФИО контактного лица / директора';
    if (!email.includes('@')) return 'Введите корректный рабочий e-mail';
    if (!phone.trim()) return 'Укажите контактный номер телефона владельца';
    return null;
  };

  const validateStep2 = () => {
    if (!projectTitle.trim()) return 'Укажите название инвестиционного проекта';
    if (projectDescription.length < 30) return 'Пожалуйста, опишите суть проекта более подробно (мин. 30 символов)';
    if (expectedJobs <= 0) return 'Количество создаваемых рабочих мест должно быть больше нуля';
    return null;
  };

  const validateStep3 = () => {
    if (totalBudget <= 0) return 'Общий бюджет проекта должен быть положительным';
    if (requestedFunding <= 0) return 'Запрашиваемый объем софинансирования должен быть положительным';
    if (requestedFunding > totalBudget) return 'Запрошенный капитал НИФ не может превышать общий бюджет проекта';
    // Max funding threshold limit check (e.g. 70% max co-funding for regulatory compliance)
    if (requestedFunding > totalBudget * 0.7) {
      return 'Законодательный лимит: Государственное участие НИФ не может превышать 70% от сметы проекта';
    }
    return null;
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      const err = validateStep1();
      if (err) { setError(err); return; }
      setStep(2);
    } else if (step === 2) {
      const err = validateStep2();
      if (err) { setError(err); return; }
      setStep(3);
    }
  };

  const handleBack = () => {
    setError(null);
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const err = validateStep3();
    if (err) { setError(err); return; }

    const newApplication: FinancingApplication = {
      id: 'app-' + Math.random().toString(36).substr(2, 9),
      companyName,
      inn,
      contactName,
      email,
      phone,
      sectorId,
      projectTitle,
      projectDescription,
      totalBudget: Number(totalBudget),
      requestedFunding: Number(requestedFunding),
      expectedJobs: Number(expectedJobs),
      region,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSubmitSuccess(newApplication);
  };

  const stepsMeta = [
    { title: 'Юридическое лицо', icon: Building },
    { title: 'Инвест-Проект', icon: Briefcase },
    { title: 'Финансы и сметы', icon: Coins },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white border border-brand-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden my-12 text-left">
      
      {/* Visual Header Strip with current progress bar */}
      <div className="bg-brand-primary text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-sans flex items-center gap-2">
            <FileText className="w-6 h-6 text-brand-sky" />
            <span>Заявление на государственное софинансирование</span>
          </h3>
          <p className="text-xs text-white/70 mt-1 font-medium">
            Интерактивный портал ОАО «Национальный инвестиционный фонд Кыргызской Республики»
          </p>
        </div>

        <button
          onClick={onCancel}
          className="text-xs font-semibold text-brand-sky hover:text-white underline cursor-pointer"
        >
          Вернуться на главную
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="bg-brand-surface border-b border-brand-outline-variant/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6 w-full max-w-2xl mx-auto">
          {stepsMeta.map((item, index) => {
            const Icon = item.icon;
            const stepNum = index + 1;
            const isCompleted = step > stepNum;
            const isActive = step === stepNum;
            return (
              <div key={stepNum} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isActive
                      ? 'bg-brand-secondary text-white'
                      : 'bg-brand-surface-high text-brand-on-surface-variant'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : stepNum}
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-wider hidden sm:block ${
                  isActive ? 'text-brand-secondary' : 'text-brand-on-surface-variant/60'
                }`}>
                  {item.title}
                </span>
                {index < 2 && <div className="h-0.5 bg-brand-outline-variant/30 flex-1 hidden md:block"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Validation Errors Box */}
      {error && (
        <div className="m-6 p-4 bg-brand-red/10 border border-brand-red/20 rounded-xl text-xs font-semibold text-brand-red flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Structured Multi-step application inputs */}
      <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
        
        {/* Step 1: Legal Entity Profile */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-secondary border-b border-brand-outline-variant/15 pb-2">
              Профиль организации-заявителя
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                  Полное наименование компании (ООО/ЗАО/ОАО/ИП) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ОсОО «Кыргыз АгроПром»"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 text-xs border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                  ИНН налогоплательщика КР (14 цифр) *
                </label>
                <input
                  type="text"
                  maxLength={14}
                  required
                  placeholder="20101199345672"
                  value={inn}
                  onChange={(e) => setInn(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-2 text-xs border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                  ФИО Директора / Представителя *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Аманов Бакыт Кубанычбекович"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-2 text-xs border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                  Регион регистрации бизнеса *
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-2 text-xs border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low font-semibold text-brand-on-surface"
                >
                  <option value="chuy">Чуйская область (Бишкек)</option>
                  <option value="batken">Баткенская область </option>
                  <option value="osh">Ошская область (Ош)</option>
                  <option value="jalalabad">Джалал-Абадская область</option>
                  <option value="naryn">Нарынская область</option>
                  <option value="issyk-kul">Иссык-Кульская область</option>
                  <option value="talas">Таласская область</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                  Рабочий Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-brand-on-surface-variant/40" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="amanov@company.kg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                  Мобильный Телефон *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-brand-on-surface-variant/40" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="+996 555 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Project Parameters */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-secondary border-b border-brand-outline-variant/15 pb-2">
              Описание Инвестиционной Инициативы
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8">
                <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                  Название Финансируемого Проекта *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Запуск перерабатывающей упаковочной фабрики органических соков"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-4 py-2 text-xs border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                  Отраслевой сектор *
                </label>
                <select
                  value={sectorId}
                  onChange={(e) => setSectorId(e.target.value)}
                  className="w-full px-4 py-2 text-xs border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low font-semibold text-brand-on-surface"
                >
                  {SECTORS.map(sec => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name[currentLanguage]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                Подробная Суть Проекта (Мин. 30 слов/символов) *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Проект нацелен на закупку оборудования итальянского производства для пастеризации и вакуумного соколитейного разлива. Запуск позволит закупать у фермеров области до 200 тонн фасованной сельхозпродукции в год, создавая устойчивый экспортоориентированный канал..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full px-4 py-3 text-xs border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low custom-scrollbar"
              ></textarea>
            </div>

            <div className="max-w-xs">
              <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                Создаваемые новые рабочие места (активная квота КР) *
              </label>
              <input
                type="number"
                min={1}
                required
                value={expectedJobs}
                onChange={(e) => setExpectedJobs(Number(e.target.value))}
                className="w-full px-4 py-2 text-xs border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low font-mono"
              />
            </div>
          </div>
        )}

        {/* Step 3: Financial metrics */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-secondary border-b border-brand-outline-variant/15 pb-2">
              Финансовый план и софинансирование НИФ КР
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Financial calculations */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                    Общий бюджет реализации проекта (USD) *
                  </label>
                  <input
                    type="number"
                    min={5000}
                    required
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-full px-4 py-24 border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low font-mono text-base font-bold text-brand-primary"
                    style={{ padding: '12px' }}
                  />
                  <span className="text-[10px] text-brand-on-surface-variant mt-1.5 block">
                    * Включает собственные средства и банковские займы.
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-brand-on-surface-variant mb-1">
                    Запрашиваемый объем софинансирования НИФ (USD) *
                  </label>
                  <input
                    type="number"
                    min={1000}
                    required
                    value={requestedFunding}
                    onChange={(e) => setRequestedFunding(Number(e.target.value))}
                    className="w-full px-4 py-24 border border-brand-outline-variant/30 rounded focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-brand-surface-low font-mono text-base font-bold text-brand-primary"
                    style={{ padding: '12px' }}
                  />
                  <span className="text-[10px] text-brand-secondary mt-1.5 block font-semibold">
                    * Максимально доступно (70%): {Math.floor(totalBudget * 0.7).toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Dynamic compliance alert widget */}
              <div className="p-6 bg-brand-surface rounded-xl border border-brand-outline-variant/20 flex flex-col justify-between">
                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-brand-primary border-b border-brand-outline-variant/15 pb-2 mb-3">
                    Сводная смета баланса
                  </h5>
                  <ul className="space-y-2.5 text-xs text-brand-on-surface-variant">
                    <li className="flex justify-between">
                      <span>Собственная доля участника (мин. 30%):</span>
                      <span className="font-bold text-brand-primary">
                        {Math.round((1 - requestedFunding / totalBudget) * 100)}%
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Собственный капитал заявителя в USD:</span>
                      <span className="font-semibold text-brand-primary">
                        {(totalBudget - requestedFunding).toLocaleString()} USD
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Участие бюджета фонда (до 70%):</span>
                      <span className="font-semibold text-brand-secondary">
                        {Math.round((requestedFunding / totalBudget) * 100)}%
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-brand-outline-variant/15">
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded text-[10px] font-semibold flex items-center gap-1.5 leading-normal">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Показатели удовлетворяют критериям устава ОАО «НИФ КР».</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Form Controls / Buttons Navigation */}
        <div className="pt-6 border-t border-brand-outline-variant/20 flex justify-between items-center">
          <button
            type="button"
            onClick={step === 1 ? onCancel : handleBack}
            className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-brand-on-surface-variant hover:text-brand-primary hover:bg-brand-surface-low transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад</span>
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-brand-primary hover:bg-brand-secondary text-white rounded font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer shadow-md transition-transform active:scale-[0.98]"
            >
              <span>Продолжить</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-8 py-3 bg-brand-secondary hover:bg-brand-secondary/85 text-white rounded font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-brand-secondary/20 transition-transform active:scale-[0.98]"
            >
              <span>Подписать и Отправить</span>
              <CheckCircle className="w-4 h-4 text-brand-sky" />
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

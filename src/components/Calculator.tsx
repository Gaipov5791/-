/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sliders, HelpCircle, Info, Coins, Calculator as CalcIcon, Percent, TrendingUp, ShieldAlert, Landmark } from 'lucide-react';
import { Language } from '../types.ts';
import { LOCALIZATION } from '../data.ts';

interface CalculatorProps {
  currentLanguage: Language;
}

export default function Calculator({ currentLanguage }: CalculatorProps) {
  const [totalCost, setTotalCost] = useState(500000); // Default $500k USD
  const [nifSharePercent, setNifSharePercent] = useState(60); // Default 60%
  const [years, setYears] = useState(5); // Default 5 years
  const [interestRate, setInterestRate] = useState(5); // Default 5%

  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  // Financial Computations
  const nifShareAmount = Math.round(totalCost * (nifSharePercent / 100));
  const ownShareAmount = totalCost - nifShareAmount;
  
  // Monthly Annuity Formula: A = P * ( r * (1+r)^n ) / ( (1+r)^n - 1 )
  const r = (interestRate / 100) / 12; // monthly rate
  const n = years * 12; // number of months
  const monthlyPaymentObj = r > 0 
    ? nifShareAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    : nifShareAmount / n;
  
  const monthlyPayment = Math.round(monthlyPaymentObj);
  const totalRepayment = monthlyPayment * n;
  const totalInterest = Math.max(0, totalRepayment - nifShareAmount);

  // Economic Multipliers: State guidelines suggest 1 jobs created per $15,000 NIF funding approx
  const jobsCreatedSim = Math.max(1, Math.round(nifShareAmount / 15000));

  // Dynamic strategic policy advisory output
  const getStrategicRecommendation = () => {
    if (nifShareAmount >= 3000000) {
      return {
        strategy: 'Пакет прямого вхождения в Капитал / СП',
        desc: 'Для проектов масштаба более 3 млн USD Нацфонд формирует совместное предприятие с вводом ESG-стандартов КР и аудитом.',
        color: 'border-amber-400 text-amber-700 bg-amber-500/10'
      };
    } else if (nifShareAmount >= 600000) {
      return {
        strategy: 'Соинвестирование и Кредитное Обеспечение',
        desc: 'Подходит для классического синдицированного кредитования с коммерческими банками КР с покрытием рисков до 50%.',
        color: 'border-brand-secondary text-brand-secondary bg-brand-secondary/5'
      };
    } else {
      return {
        strategy: 'Льготные займы малого и среднего предпринимательства',
        desc: 'Оптимально в качестве целевых грантовых инвестиций развития регионального бизнеса во всех областях Кыргызстана.',
        color: 'border-emerald-500 text-emerald-700 bg-emerald-500/10'
      };
    }
  };

  const advice = getStrategicRecommendation();

  return (
    <div className="max-w-5xl mx-auto bg-white border border-brand-outline-variant/30 rounded-2xl shadow-xl overflow-hidden my-12 text-left">
      
      {/* Visual Header */}
      <div className="bg-brand-primary text-white p-8 border-b border-brand-secondary/15">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-secondary/40 rounded-lg text-brand-sky">
            <CalcIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-sans">
              Калькулятор инвестиционных проектов НИФ
            </h3>
            <p className="text-xs text-white/70 mt-1 font-medium">
              Определите соответствие вашего проекта лимитам софинансирования КР и спроецируйте амортизационные графики
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Slider Widgets */}
      <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Interactive Sliders Col */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-secondary border-b border-brand-outline-variant/15 pb-2 flex items-center gap-1.5 mb-6">
              <Sliders className="w-4 h-4 text-brand-sky" />
              <span>Параметры сметы проекта</span>
            </h4>

            {/* Slider 1: Total Cost */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-brand-on-surface-variant uppercase">Общий бюджет (USD):</span>
                <span className="text-brand-primary font-extrabold text-sm">{totalCost.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min={20000}
                max={5000000}
                step={10000}
                value={totalCost}
                onChange={(e) => setTotalCost(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-surface-high rounded-lg appearance-none cursor-pointer accent-brand-secondary"
              />
              <div className="flex justify-between text-[10px] text-brand-on-surface-variant/50 font-mono font-bold">
                <span>$20К</span>
                <span>$2.5М</span>
                <span>$5М (Макс лимит)</span>
              </div>
            </div>

            {/* Slider 2: NIF Share */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-brand-on-surface-variant uppercase flex items-center gap-1">
                  <span>Доля госучастия (НИФ):</span>
                  <div className="group relative cursor-help">
                    <HelpCircle className="w-3.5 h-3.5 text-brand-on-surface-variant/40" />
                    <span className="absolute hidden group-hover:block bg-brand-primary text-white text-[10px] p-2 rounded-lg w-48 shadow-lg z-20 -translate-y-12">
                      По уставу у соинвестора должно быть не менее 30% собственного капитала. Лимит фонда - до 70%.
                    </span>
                  </div>
                </span>
                <span className="text-brand-secondary font-extrabold text-sm">{nifSharePercent}%</span>
              </div>
              <input
                type="range"
                min={30}
                max={70}
                step={5}
                value={nifSharePercent}
                onChange={(e) => setNifSharePercent(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-surface-high rounded-lg appearance-none cursor-pointer accent-brand-secondary"
              />
              <div className="flex justify-between text-[10px] text-brand-on-surface-variant/50 font-mono font-bold">
                <span>30% (Мин)</span>
                <span>50% (Паритет)</span>
                <span>70% (Предел КР)</span>
              </div>
            </div>

            {/* Slider 3: Term */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-brand-on-surface-variant uppercase">Срок договора (лет):</span>
                <span className="text-brand-primary font-extrabold text-sm">{years} лет</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-surface-high rounded-lg appearance-none cursor-pointer accent-brand-secondary"
              />
              <div className="flex justify-between text-[10px] text-brand-on-surface-variant/50 font-mono font-bold">
                <span>1 год</span>
                <span>5 лет</span>
                <span>10 лет (Предел)</span>
              </div>
            </div>

            {/* Slider 4: Interest Rate */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-brand-on-surface-variant uppercase">Льготная ставка (% годовых):</span>
                <span className="text-brand-red font-extrabold text-sm">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                step={0.5}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-1.5 bg-brand-surface-high rounded-lg appearance-none cursor-pointer accent-brand-red"
              />
              <div className="flex justify-between text-[10px] text-brand-on-surface-variant/50 font-mono font-bold">
                <span>3.0% (Минимум)</span>
                <span>7.5%</span>
                <span>12.0% (Рыночная)</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Outputs & Strategic Advisory Panel Col */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="bg-brand-surface-low border border-brand-outline-variant/20 rounded-xl p-6 space-y-4">
            <h4 id="calc-outputs-header" className="text-xs font-extrabold text-brand-primary uppercase tracking-widest border-b border-brand-outline-variant/15 pb-2 flex items-center gap-1.5">
              <Coins className="w-4.5 h-4.5 text-brand-sky" />
              <span>Расчет долей и амортизации</span>
            </h4>

            {/* Output details rows */}
            <div className="space-y-3 text-xs text-brand-on-surface-variant">
              <div className="flex justify-between items-center">
                <span>Инвестиции Фонда ({nifSharePercent}%):</span>
                <span className="font-extrabold text-brand-primary text-sm">{nifShareAmount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Собственное участие ({100 - nifSharePercent}%):</span>
                <span className="font-bold text-brand-on-surface-variant">{ownShareAmount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between items-center sm:text-sm text-brand-primary font-bold border-t border-brand-outline-variant/15 pt-2.5">
                <span>Аннуитетный ежемесячный платеж:</span>
                <span className="text-brand-secondary font-extrabold text-base">{monthlyPayment.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-brand-on-surface-variant/80">
                <span>Всего переплата по процентам:</span>
                <span className="font-semibold text-brand-red">{totalInterest.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-emerald-600 font-bold border-t border-dashed border-brand-outline-variant/25 pt-2.5">
                <span>Индикатор рабочих мест (прогноз):</span>
                <span className="flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-700">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+{jobsCreatedSim} рабочих мест</span>
                </span>
              </div>
            </div>
          </div>

          {/* Strategic recommendation advisor widget */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between min-h-[140px] ${advice.color}`}>
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                <Landmark className="w-4 h-4" />
                <span>Рекомендация по уставу фонда</span>
              </div>
              <h5 className="text-sm font-extrabold font-sans leading-snug">
                {advice.strategy}
              </h5>
              <p className="text-[11px] leading-relaxed opacity-90 font-medium">
                {advice.desc}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Calculator Bottom terms advisory strip */}
      <div className="bg-brand-surface-low border-t border-brand-outline-variant/20 px-8 py-4 text-[10px] text-brand-on-surface-variant/65 flex items-center gap-1.5 leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-brand-secondary flex-shrink-0" />
        <span>
          Расчет калькулятора является предварительной финансовой симуляцией и не обязывает ОАО «Национальный инвестиционный фонд Кыргызской Республики» осуществлять финансирование на указанных точно условиях. Каждое заявление рассматривается кредитным комитетом индивидуально.
        </span>
      </div>

    </div>
  );
}

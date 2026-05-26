/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Handshake, Briefcase, Wrench, PieChart, Info, Check, ArrowRight } from 'lucide-react';
import { Language } from '../types.ts';
import { LOCALIZATION, PROGRAMS } from '../data.ts';

interface FinancingSectionProps {
  currentLanguage: Language;
  onNavigate: (screen: string) => void;
}

export default function FinancingSection({ currentLanguage, onNavigate }: FinancingSectionProps) {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Handshake':
        return <Handshake className="w-12 h-12 text-brand-sky group-hover:scale-105 transition-transform" />;
      case 'Briefcase':
        return <Briefcase className="w-12 h-12 text-brand-sky group-hover:scale-105 transition-transform" />;
      case 'Wrench':
        return <Wrench className="w-12 h-12 text-brand-sky group-hover:scale-105 transition-transform" />;
      case 'PieChart':
        return <PieChart className="w-12 h-12 text-brand-sky group-hover:scale-105 transition-transform" />;
      default:
        return <Handshake className="w-12 h-12 text-brand-sky" />;
    }
  };

  const programDetails: Record<string, {
    eligibility: Record<Language, string[]>;
    terms: Record<Language, string[]>;
  }> = {
    'co-investment': {
      eligibility: {
        RU: ['Наличие одобренного бизнес-плана компании', 'Подтвержденное софинансирование от коммерческого банка (не менее 50%)', 'Срок окупаемости проекта до 10 лет'],
        KG: ['Компаниянын жактырылган бизнес-планынын болушу', 'Коммерциялык банктан кошо каржылоонун тастыкталышы (кеминде 50%)', 'Долбоордун өзүн-өзү актоо мөөнөтү 10 жылга чейин'],
        EN: ['Pre-approved detailed institutional business plan', 'Verified financial match from an accredited commercial bank (min 50%)', 'Maximum estimated payback horizon within 10 years'],
        CN: ['具备经专业机构合规申报的可行性商业计划书', '商业银行或多边贷款配套意向函（注资占比不低于50%）', '综合投资回收期预测不超过10年'],
      },
      terms: {
        RU: ['Процентная ставка: от 4% до 6% годовых в валюте проекта', 'Срок кредитования: до 8 лет с льготным периодом до 3 лет'],
        KG: ['Пайыздык чен: долбоордун валютасында жылдык 4% дан 6% чейин', 'Насыялоо мөөнөтү: 3 жылга чейин жеңилдетилген мөөнөт менен 8 жылга чейин'],
        EN: ['Low-interest start rates: 4% to 6% APR', 'Flexible terms: Up to 8 years maturity with 3 years grace period'],
        CN: ['综合优惠基准利息：年化4% – 6%（按项目核定币种）', '最长放款周期：不超过8年，最长含3年还本宽限期'],
      }
    },
    'joint-ventures': {
      eligibility: {
        RU: ['Проекты государственного или национального масштаба', 'Наличие иностранного стратегического партнера или инвестора', 'Локализация производства на территории Кыргызской Республики'],
        KG: ['Мамлекеттик же улуттук масштабдагы долбоорлор', 'Чет өлкөлүк стратегиялык өнөктөштүн же инвестордун болушу', 'Кыргыз Республикасынын аймагында өндүрүштү локалдаштыруу'],
        EN: ['Strategic projects of national and municipal infrastructure weight', 'Binding participation of an expert international strategic co-sponsor', 'Physical facility localization verified in Kyrgyzstan'],
        CN: ['属于国家重点鼓励类、先导类或高耗能低碳替代战略级项目', '必须引入世界500强企业或高技术海外产业巨头作为联合技术/资本赞助方', '必须实现在吉尔吉斯共和国境内的实质性本土就业与生产替代比'],
      },
      terms: {
        RU: ['Паритетная или миноритарная доля Фонда (до 49%)', 'Внедрение международных стандартов корпоративного управления'],
        KG: ['Фонддун үлүшү (49% чейин)', 'Эл аралык корпоративдик башкаруу стандарттарын киргизүү'],
        EN: ['NIF equity participation up to 49% (minority board seats)', 'Structured implementation of global institutional board governance standards'],
        CN: ['国家投资基金权益比例上限为49%（不控股安全结构）', '全面派驻代表董事，注入国际化上市公司ESG与合规审计标准'],
      }
    },
    'support-instruments': {
      eligibility: {
        RU: ['Соответствие приоритетным направлениям развития КР', 'Отсутствие налоговой задолженности и хорошая кредитная история', 'Экологическая безопасность класса Е&S по стандартам МФК'],
        KG: ['КР өнүктүрүүнүн артыкчылыктуу багыттарына шайкеш келүү', 'Салык карызынын жоктугу жана жакшы насыя тарыхы', 'Экологиялык коопсуздуктун болушу'],
        EN: ['Match with state sectors of green growth and local sustainability', 'Zero tax defaults and pristine localized credit score reports', 'E&S ecological safeguard approvals (IFC benchmark equivalent)'],
        CN: ['符合绿色小额制造、区域减贫和农业高质化转型的国家指引', '申请主体财务指标良好，无税款逾期或司法重组诉讼记录', '环评通过国家乙级及以上安全准入基准（等同IFC生态标准）'],
      },
      terms: {
        RU: ['Предоставление гарантийного обеспечения до 50% от суммы займа', 'Частичное субсидирование процентной ставки коммерческих банков КР'],
        KG: ['Насыянын суммасынын 50% чейин кепилдик берүү', 'КР коммерциялык банктарынын пайыздык чендерин жарым-жартылай субсидиялоо'],
        EN: ['Collateral guarantee support covering up to 50% of outstanding loan principal', 'Direct interest subsidies matching regional commercial bank credits'],
        CN: ['直接出具信用等值保函，分担信贷坏账敞口上限至50%', '财政直接贴息对口商业银行（按当年折算基准汇率一次性拨付）'],
      }
    },
    'equity-investment': {
      eligibility: {
        RU: ['Проекты с высоким потенциалом масштабирования и долгосрочной устойчивостью', 'Прозрачная финансовая отчетность компании (подтвержденная аудиторами)', 'Высокое качество управленческой команды'],
        KG: ['Келечектүү долбоорлор', 'Прозрадуу финансылык отчеттуулук', 'Жогорку квалификациялуу башкаруу тобу'],
        EN: ['High-growth enterprises showing reliable financial scaling models', 'Validated audited historic balance sheets (Big 4 or local equivalent approval)', 'Experienced professional c-suite execution personnel at the helm'],
        CN: ['在所在垂直行业具备护城河或关键发明专利，成长潜力巨大', '完整的近三年历史纳税报表及独立会计师审计报告（四大或指定伙伴）', '团队骨干具备十年以上全球同类产业复合营运经验，股权权属清晰'],
      },
      terms: {
        RU: ['Долговременное партнерство (горизонт 5–7 лет)', 'Право вето по ключевым стратегическим вопросам компании'],
        KG: ['Узак мөөнөттүү өнөктөштүк (5-7 жылдык горизонт)', 'Негизги стратегиялык маселелер боюнча вето укугу'],
        EN: ['Patient strategic growth capital (5 to 7 years harvest exit timeline)', 'Sovereign veto power strictly reserved over landmark capital sales, restructuring, or mergers'],
        CN: ['耐心政府引导资本跟进（估值锁定，投资退出周期划定为5 – 7年）', '在重大战略资产变卖、反向收购以及合并中保留国家特权一票否决权'],
      }
    }
  };

  return (
    <section className="py-20 bg-brand-surface-low border-b border-brand-outline-variant/20" id="financing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-sans">
              {t('financing_title')}
            </h2>
            <p className="text-sm sm:text-base text-brand-on-surface-variant font-medium leading-relaxed">
              {t('financing_text')}
            </p>
          </div>

          <button
            onClick={() => onNavigate('apply')}
            className="inline-flex items-center gap-2 group font-bold text-xs uppercase tracking-wider text-brand-secondary hover:text-brand-primary transition-colors cursor-pointer"
          >
            <span>{t('cta_apply')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((program) => {
            const isSelected = selectedProgram === program.id;
            return (
              <div
                key={program.id}
                onClick={() => setSelectedProgram(isSelected ? null : program.id)}
                className={`bg-white p-8 border rounded-xl transition-all duration-300 transform cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'border-brand-secondary ring-2 ring-brand-secondary/30 scale-[1.01] shadow-xl'
                    : 'border-brand-outline-variant/30 hover:border-brand-secondary/40 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="mb-6">{getIcon(program.icon)}</div>
                  <h3 className="text-lg font-extrabold text-brand-primary mb-3 font-sans group-hover:text-brand-secondary transition-colors">
                    {program.title[currentLanguage]}
                  </h3>
                  <p className="text-xs text-brand-on-surface-variant leading-relaxed line-clamp-4">
                    {program.description[currentLanguage]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-outline-variant/20 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-secondary group-hover:text-brand-primary">
                  <span>{isSelected ? 'Свернуть' : 'Подробнее'}</span>
                  <Info className={`w-4 h-4 text-brand-sky transition-transform ${isSelected ? 'rotate-180 text-brand-secondary' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Eligibility & Details section */}
        <AnimatePresence>
          {selectedProgram && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 overflow-hidden"
            >
              <div id="criteria-box" className="bg-brand-primary text-white rounded-xl p-8 sm:p-10 border border-brand-secondary/35 shadow-2xl relative">
                <div className="absolute top-5 right-5 text-brand-sky/20">
                  {selectedProgram === 'co-investment' && <Handshake className="w-24 h-24" />}
                  {selectedProgram === 'joint-ventures' && <Briefcase className="w-24 h-24" />}
                  {selectedProgram === 'support-instruments' && <Wrench className="w-24 h-24" />}
                  {selectedProgram === 'equity-investment' && <PieChart className="w-24 h-24" />}
                </div>

                <h4 className="text-xl font-extrabold text-brand-sky mb-6 flex items-center gap-2">
                  <span>Критерии отбора и детальные условия:</span>
                  <span className="text-white/80 text-sm font-medium">({PROGRAMS.find(p => p.id === selectedProgram)?.title[currentLanguage]})</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  
                  {/* Eligibility Column */}
                  <div className="space-y-4">
                    <h5 className="font-bold text-xs uppercase tracking-widest text-brand-sky border-b border-white/10 pb-2">
                      Регламент допуска КР (Облигаторно)
                    </h5>
                    <ul className="space-y-3">
                      {programDetails[selectedProgram]?.eligibility[currentLanguage]?.map((item, i) => (
                        <li key={i} className="text-xs text-white/90 leading-relaxed flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand-sky flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Financial Terms Column */}
                  <div className="space-y-4">
                    <h5 className="font-bold text-xs uppercase tracking-widest text-brand-sky border-b border-white/10 pb-2">
                      Параметры финансирования НИФ
                    </h5>
                    <ul className="space-y-3">
                      {programDetails[selectedProgram]?.terms[currentLanguage]?.map((item, i) => (
                        <li key={i} className="text-xs text-white/90 leading-relaxed flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand-sky flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Submitting CTA inside description */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-white/60">
                    * Вы можете подать заявление через интерактивную форму на этом портале.
                  </p>
                  <button
                    onClick={() => onNavigate('apply')}
                    className="px-5 py-2.5 bg-brand-secondary hover:bg-brand-secondary/90 text-white rounded font-bold text-xs uppercase tracking-wider flex items-center gap-2 self-end shadow-md transition-transform active:scale-[0.98] cursor-pointer"
                  >
                    <span>Перейти к заполнению заявки</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sector, InvestmentProgram, NewsItem, ProjectItem, Partner, Language } from './types.ts';

export const SECTORS: Sector[] = [
  {
    id: 'industry',
    name: {
      RU: 'Промышленность и переработка',
      KG: 'Өндүрүш жана кайра иштетүү',
      EN: 'Industry & Processing',
      CN: '工业与加工业',
    },
    icon: 'Factory',
    description: {
      RU: 'Поддержка индустриальных парков, модернизация заводов и расширение производства местных товаров.',
      KG: 'Индустриалдык парктарды колдоо, заводдорду модернизациялоо жана жергиликтүү товарларды өндүрүүнү кеңейтүү.',
      EN: 'Support for industrial parks, plant modernization, and expanding local manufacturing output.',
      CN: '支持工业园区、工厂现代化建设以及扩大本地商品生产规模。',
    },
  },
  {
    id: 'logistics',
    name: {
      RU: 'Транспорт и логистика',
      KG: 'Транспорт жана логистика',
      EN: 'Transport & Logistics',
      CN: '交通与物流',
    },
    icon: 'Truck',
    description: {
      RU: 'Строительство современных торгово-логистических центров и улучшение транзитного потенциала КР.',
      KG: 'Заманбап соода-логистикалык борборлорду куруу жана КР транзиттик потенциалын жогорулатуу.',
      EN: 'Construction of state-of-the-art trade & logistics centers and improving the transit corridor potential.',
      CN: '建设现代化贸易物流中心，提升吉尔吉斯共和国的过境运输潜力。',
    },
  },
  {
    id: 'energy',
    name: {
      RU: 'Энергетика и инфраструктура',
      KG: 'Энергетика жана инфраструктура',
      EN: 'Energy & Infrastructure',
      CN: '能源与基础设施',
    },
    icon: 'Zap',
    description: {
      RU: 'Инвестиции в малые ГЭС, солнечные и ветряные станции для укрепления энергетической независимости.',
      KG: 'Энергетикалык көз карандысыздыкты бекемдөө үчүн чакан ГЭСтерге, күн жана шамал станцияларына инвестициялар.',
      EN: 'Investments in small hydro, solar, and wind plants to fortify national green energy independence.',
      CN: '投资于小型水电站、太阳能和风能电站，以增强能源自主性。',
    },
  },
  {
    id: 'tourism',
    name: {
      RU: 'Туризм',
      KG: 'Туризм',
      EN: 'Tourism & Hospitality',
      CN: '旅游服务业',
    },
    icon: 'Compass',
    description: {
      RU: 'Развитие экологических и этнокурортов, создание инфраструктуры вокруг ключевых достопримечательностей.',
      KG: 'Экологиялык жана этно-курортторду өнүктүрүү, негизги кооз жерлердин айланасында инфраструктура түзүү.',
      EN: 'Developing eco-friendly and ethno-resorts, improving amenities around iconic destination landmarks.',
      CN: '发展生态与民族特色度假村，在核心景区周边建设基础设施。',
    },
  },
  {
    id: 'education',
    name: {
      RU: 'Образование',
      KG: 'Билим берүү',
      EN: 'Education',
      CN: '教育事业',
    },
    icon: 'GraduationCap',
    description: {
      RU: 'Финансирование образовательных ИТ-хабов, лабораторий и инновационных центров опережающего развития.',
      KG: 'Билим берүүчү ИТ-хабдарды, лабораторияларды жана инновациялык борборлорду каржылоо.',
      EN: 'Funding educational IT accelerators, technical laboratories, and high-tech pioneering research schools.',
      CN: '资助设立IT教育中心、实验室和高科技创新中心，推动超前发展。',
    },
  },
  {
    id: 'healthcare',
    name: {
      RU: 'Здравоохранение',
      KG: 'Саламаттыкты сактоо',
      EN: 'Healthcare & Pharma',
      CN: '医疗卫生与制药',
    },
    icon: 'HeartPulse',
    description: {
      RU: 'Аппаратная модернизация медицинских клиник, закупка высокотехнологичного оборудования.',
      KG: 'Медициналык клиникаларды клиникалык аппаруралар менен камсыздоо, жогорку технологиялык жабдууларды сатып алуу.',
      EN: 'Equipment modernization of clinical health facilities and purchasing cutting-edge digital diagnostics.',
      CN: '推动医疗机构硬件设施提升，采购高技术医疗设备与诊断系统。',
    },
  },
];

export const PROGRAMS: InvestmentProgram[] = [
  {
    id: 'co-investment',
    title: {
      RU: 'Соинвестирование',
      KG: 'Биргелешип инвестициялоо',
      EN: 'Co-Investment',
      CN: '联合投资',
    },
    icon: 'Handshake',
    description: {
      RU: 'Финансирование крупных приоритетных проектов совместно с коммерческими банками и международными институтами развития.',
      KG: 'Коммерциялык банктар жана эл аралык өнүктүрүү институттары менен биргеликте ири артыкчылыктуу долбоорлорду каржылоо.',
      EN: 'Joint financing of large-scale priority projects side-by-side with commercial lenders and global financial agencies.',
      CN: '与商业银行及国际多边金融机构一起，共同为大型关键优先项目提供资金支持。',
    },
  },
  {
    id: 'joint-ventures',
    title: {
      RU: 'Совместные предприятия',
      KG: 'Биргелешкен ишканалар',
      EN: 'Joint Ventures',
      CN: '合资企业',
    },
    icon: 'Briefcase',
    description: {
      RU: 'Создание новых проектных компаний и СП совместно с зарубежными суверенными фондами и стратегическими инвесторами.',
      KG: 'Чет өлкөлүк суверендүү фонддор жана стратегиялык инвесторлор менен биргеликте жаңы өнүктүрүү долбоорлорун түзүү.',
      EN: 'Establishing new project special-purpose vehicles and ventures in synergy with foreign wealth funds and industry leaders.',
      CN: '与海外主权财富基金及行业战略投资者合作，成立新的项目开发实体及合资公司。',
    },
  },
  {
    id: 'support-instruments',
    title: {
      RU: 'Инструменты поддержки',
      KG: 'Колдоо инструменттери',
      EN: 'Support Instruments',
      CN: '政策与融资支持',
    },
    icon: 'Wrench',
    description: {
      RU: 'Предоставление целевых займов, банковских гарантий, субсидирование процентных ставок для снижения кредитной нагрузки.',
      KG: 'Насыялык жүктү азайтуу үчүн максаттуу заемдорду, банктык кепилдиктерди берүү жана пайыздарды субсидиялоо.',
      EN: 'Issuance of targeted soft loans, high-value bank guarantees, and interest rate subsidies to mitigate credit risk.',
      CN: '向重点项目提供定向优惠贷款、银行保函支持以及利息部分贴息，减轻债务压力。',
    },
  },
  {
    id: 'equity-investment',
    title: {
      RU: 'Инвестиции в капитал',
      KG: 'Капиталга инвестициялар',
      EN: 'Equity Investments',
      CN: '股权直投',
    },
    icon: 'PieChart',
    description: {
      RU: 'Прямое вхождение Фонда в акционерный капитал перспективных компаний с приобретением доли и внедрением стандартов ESG.',
      KG: 'Фонддун келечектүү компаниялардын акционердик капиталына түз катышуусу, үлүшүн сатып алуу жана ESG стандарттарын киргизүү.',
      EN: 'Direct equity participation of the Fund in promising enterprises, providing growth capital and institutionalizing governance.',
      CN: '投资基金直接注入有溢价潜力的公司股权，持股经营，并协助导入现代化ESG治理机制。',
    },
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: {
      RU: 'Объявление о привлечении управляющей компании / гостиничного консультанта',
      KG: 'Башкаруучу компанияны / мейманкана консультантын тартуу жөнүндө кулактандыруу',
      EN: 'Announcement: Solicitation for Professional International Hotel Management Operators',
      CN: '招商公告：公开选聘国际级酒店资产管理方与运营顾问服务机构',
    },
    summary: {
      RU: 'ОАО «Национальный инвестиционный фонд Кыргызской Республики» объявляет о привлечении квалифицированных специалистов для управления гостиничными активами премиум-класса.',
      KG: '«Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК премиум-класстагы мейманкана активдерин башкаруу үчүн квалификациялуу адистерди тартууну жарыялайт.',
      EN: 'NIF of the Kyrgyz Republic opens public tenders for qualified hospitality operations consultancies to steward upcoming premium-class resort and leisure portfolios.',
      CN: '吉尔吉斯共和国国家投资总基金面向全球公开选聘专业酒店顾问，以运营并提档升级国家直属的多家高端文旅度假区及五星级配套物业。',
    },
    content: {
      RU: 'В рамках реализации государственной программы по повышению эффективности государственного имущества и стимулированию туристической отрасли, ОАО «Национальный инвестиционный фонд Кыргызской Республики» приступает к поиску первоклассного партнера. Задачей выбранного оператора станет внедрение мировых стандартов сервиса, оптимизация расходов и максимизация доходности вверяемого гостиничного комплекса. Заявки с пакетом квалификационных документов принимаются в течение 30 календарных дней.',
      KG: 'Мамлекеттик мүлктүн натыйжалуулугун жогорулатуу жана туристтик тармакты стимулдаштыруу боюнча мамлекеттик программаны ишке ашыруунун алкагында, «Кыргыз Республикасынын Улуттук инвестициялык фонду» ААК биринчи класстагы өнөктөштү издөөгө киришет. Тандалган оператордун милдети - сервистин дүйнөлүк стандарттарын киргизүү, чыгымдарды оптималдаштыруу жана мейманкана комплексинин кирешелүүлүгүн жогорулатуу болуп саналат.',
      EN: 'As part of the master strategic state asset-optimization directive and the tourism catalytic blueprint, we seek a world-class hospitality manager. The chosen operator will implement global service standards, enhance supply-chain efficiencies, and maximize revenues for the country’s landmark luxury assets. Request for Proposals (RFP) documentation packages must be uploaded via our application workflow within 30 days.',
      CN: '为落实国家关于优化中央直属资产利用效率、全面激活本国四季旅游消费的指导方针，吉尔吉斯国家投资总基金现全面启动该文旅综合体招募工作。入选运营商需全面对接国际最高水准的管理模型，实施精细化成本控制并提高运营收益。合格报审文件请在30个自然日内通过线上信箱或本平台业务系统提交。',
    },
    date: '2026-05-18',
    image: 'https://lh3.googleusercontent.com/aida/ADBb0ugw-QEhOOcXtKg5C9r3Tyik4XTDfcE2YJZ2OBpk3lAHXbd68abDVu9MZvcJirVbAGgvIvizX3r9Wi5hzNB7-6A1DqFUXZEgRn8bD8Zoqzd0F5FJNuFnA-tqPlBMoPwu7rsJlUL5irxcc28Z95Pn1BzY27FXHhKrrrprMNj_vGt3pt7T8TxqK7zWT6jZdCz5vrI8-rUnDcH4y4HdrIOifM34u1Csrz7SYyVSxvHcA8qBMnuZlxV22QH0fvU',
    views: 1245,
  },
  {
    id: 'news-2',
    title: {
      RU: 'Объявление о запуске новых инвестиционных программ по регионам',
      KG: 'Аймактар боюнча жаңы инвестициялык программалардын ишке кириши жөнүндө кулактандыруу',
      EN: 'Launch of New Regional Small and Medium Business Investment Catalysts',
      CN: '区域经济振兴计划：国家投资总基金正式启动中小微（MSB）扶持信贷项目',
    },
    summary: {
      RU: 'Старт приема проектных предложений во всех семи областях республики с беспрецедентными условиями долгосрочного софинансирования от 3% годовых.',
      KG: 'Республиканын бардык жети облусунда жылдык 3% баштап со-каржылоо шарттары менен долбоордук сунуштарды кабыл алуу башталды.',
      EN: 'NIF begins nationwide application acceptance across all seven regions, offering highly concessional long-term funding start rates from 3% APR.',
      CN: '吉全国七大州同步开启首期项目投产申请，国家财政直接联动，年化利息补贴及再融资低至3%起，着力提振县域和乡镇实体经济。',
    },
    content: {
      RU: 'Для обеспечения сбалансированного территориального развития, Фонд запускает целевую программу поддержки бизнеса в отдаленных районах Кыргызстана. Программа ориентирована на переработку сельскохозяйственной продукции, легкую промышленность, сборку технологичных узлов и швейный сектор. Льготный период кредитования по льготным инструментам составит до 5 лет. Подача документов возможна в электронном виде непосредственно через Личный кабинет заявителя на данном веб-портале.',
      KG: 'Аймактардын тең салмактуу өнүгүүсүн камсыз кылуу үчүн, Фонд Кыргызстандын чеет жакаларындагы бизнести колдоонун максаттуу программасын баштайт. Программа айыл чарба продукциясын кайра иштетүүгө, жеңил өнөр жайга, тигүү секторуна багытталган. Насыя берүүнүн жеңилдетилген мөөнөтү 5 жылга чейин түзөт. Документтерди электрондук түрдө ушул веб-портал аркылуу түз берүүгө болот.',
      EN: 'In order to foster equitable economic development, the Fund has inaugurated a bespoke investment package for decentralized and remote regions. The priority focuses involve organic agri-processing, light machinery, manufacturing component assembly, and modern textiles. Grace periods extend up to 5 years, with low-interest equity support structures. Proposals can be instantly configured and uploaded via the central corporate submission module.',
      CN: '为解决区域经济布局不均难题，本基金特别设立偏远地区专项扶植政策。重点覆盖：高附加值农副产品深加工、轻工纺织服饰、机电零部件装配及循环利用等绿色减贫民生项目。宽限期最长可达5年。企业登录本系统“融资申请”终端，在线填报并实时预审，极大压缩传统审批流程。',
    },
    date: '2026-05-24',
    image: 'https://lh3.googleusercontent.com/aida/ADBb0uhJLUcU2aQdsstUitoMzawr-Y4IBK0OZlxpuj9bdVyhsB3hNOn5lAfQ3rc5uHlZsEjGXcru3rz4YfZM1A78W0r52tgIjS79OewyGSSkR3VhVjD_4-7sPy5CcvsxUxQ8jdHhg7pIgh8Hcpnd0BeJcPbrRX-yVQK08wQpDFiXhZ_Phke3BWseRFCojbxZp6M_Dsmh1PdGduJg42b1OMC7DkZqov9KUBOsRNyxI-xrC_GoJxvjtHZUbuxvsns',
    views: 2891,
  },
];

export const PROJECT_ITEMS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: {
      RU: 'Агропромышленный кластер по переработке абрикоса «Баткен Органик»',
      KG: 'Өрүктү кайра иштетүү боюнча «Баткен Органик» агроөнөр жай кластери',
      EN: 'Agribusiness Deep Apricot Processing Cluster "Batken Organic"',
      CN: '“巴特肯有机杏”现代农业深加工作业示范园区',
    },
    sectorId: 'industry',
    region: {
      RU: 'Баткенская область',
      KG: 'Баткен облусу',
      EN: 'Batken Region',
      CN: '巴特肯州',
    },
    description: {
      RU: 'Строительство современного сублимационного завода, упаковочной линии и склада шоковой заморозки для экспорта в ЕС и Азию.',
      KG: 'Евробиримдикке жана Азияга экспорттоо үчүн заманбап сублимациялык заводду, таңгактоочу линияны жана шок тоңдуруучу кампаны куруу.',
      EN: 'Building a vacuum freeze-drying plant, modern shock-freeze warehouses, and automated branding lines to access high-margin EU & Asian retail chains.',
      CN: '建设一座现代化无菌真空冻干加工厂、超低温速冻仓储中心和全套智能分装生产线，主要对接欧盟及亚洲中高端健康食品市场。',
    },
    totalCost: 3400000,
    fundingStage: {
      RU: 'Стадия реализации (Выделено софинансирование)',
      KG: 'Ишке ашырылууда (Биргелешип каржылоо бөлүнгөн)',
      EN: 'Under Implementation (NIF co-funding disbursed)',
      CN: '在建阶段（首笔配套资金已拨付到位）',
    },
    jobsCreated: 240,
  },
  {
    id: 'proj-2',
    title: {
      RU: 'Мультимодальный сухой порт и логистический хаб «Чуй-Транзит»',
      KG: '«Чүй-Транзит» мультимодалдык кургак порту жана логистикалык хабы',
      EN: 'Multimodal Dry Port & Terminal Hub "Chuy-Transit"',
      CN: '“楚河过境”多式联运大通道无水港与智能现代物流枢纽公铁联运配套项目',
    },
    sectorId: 'logistics',
    region: {
      RU: 'Чуйская область',
      KG: 'Чүй облусу',
      EN: 'Chuy Region',
      CN: '楚河州',
    },
    description: {
      RU: 'Создание крупного распределительного терминала класса А с железнодорожными подъездными путями на границе для таможенного оформления.',
      KG: 'Бажылык тариздөө үчүн темир жол катнаштары бар А классындагы ири бөлүштүрүүчү терминалды түзүү.',
      EN: 'Establishing a premium Class-A container terminal with integrated rail cargo customs processing on the northern cross-border economic artery.',
      CN: '于边境主干道上，依规建设占地逾百亩的高标准A级保税海外仓、智能堆场以及公铁专用线，承接中亚大宗集装箱货物快速报关中转。',
    },
    totalCost: 12500000,
    fundingStage: {
      RU: 'Архитектурное проектирование и долевые взносы',
      KG: 'Архитектуралык долбоорлоо жана үлүштүк салымдар',
      EN: 'Planning & Permitting (Equity structure closed)',
      CN: '规划报审阶段（股本化协议已签署）',
    },
    jobsCreated: 450,
  },
  {
    id: 'proj-3',
    title: {
      RU: 'Каскад малых ГЭС «Кара-Куль» мощностью 18 МВт',
      KG: 'Кубаттуулугу 18 МВт «Кара-Көл» чакан ГЭСтер каскады',
      EN: 'Small Hydro Power Cascade "Kara-Kul" (18 Megawatts)',
      CN: '“卡拉库尔”中小型梯级绿色水电站能源保障工程（总装机18兆瓦）',
    },
    sectorId: 'energy',
    region: {
      RU: 'Джалал-Абадская область',
      KG: 'Жалал-Абад облусу',
      EN: 'Jalal-Abad Region',
      CN: '贾拉拉巴德州',
    },
    description: {
      RU: 'Финансирование трех русловых гидроэлектростанций на базе экологически безопасных деривационных каналов для выработки зеленой энергии.',
      KG: 'Жашыл энергияны өндүрүү үчүн экологиялык жактан коопсуз деривациялык каналдардын базасында үч ГЭСти каржылоо.',
      EN: 'Catalyzing the construction of three run-of-river green power plants implementing low-impact diversion canals with zero ecological displacement.',
      CN: '投资兴建三座高效河床式径流引水电站，引入低环境影响水流分道，为周边高科技民生制造基地输送全天候无污染廉价清洁电能。',
    },
    totalCost: 18700000,
    fundingStage: {
      RU: 'Начальный этап строительства (СП сформировано)',
      KG: 'Курулуштун баштапкы этабы (Биргелешкен ишкана түзүлдү)',
      EN: 'Early Construction (Joint Venture incorporated)',
      CN: '土建初期阶段（合资法人已注册组建）',
    },
    jobsCreated: 180,
  },
];

export const PARTNERS: Partner[] = [
  { id: 'p1', name: 'Baker Tilly', type: 'Финансовый аудит' },
  { id: 'p2', name: 'Kreston KR', type: 'Консалтинг и оценка' },
  { id: 'p3', name: 'Ernst & Young (EY)', type: 'Стратегический партнер' },
  { id: 'p4', name: 'Kyrgyzstan Bank', type: 'Банк-партнер' },
  { id: 'p5', name: 'HCK', type: 'Инвестиционный консорциум' },
  { id: 'p6', name: 'Sakbol Group', type: 'Дью-дилидженс' }
];

export const LOCALIZATION: Record<string, Record<Language, string>> = {
  // Navigation
  nav_projects: {
    RU: 'Проекты',
    KG: 'Долбоорлор',
    EN: 'Projects',
    CN: '开发项目',
  },
  nav_financing: {
    RU: 'Финансирование',
    KG: 'Каржылоо',
    EN: 'Financing',
    CN: '业务模式',
  },
  nav_partners: {
    RU: 'Партнеры',
    KG: 'Өнөктөштөр',
    EN: 'Partners',
    CN: '合作伙伴',
  },
  nav_news: {
    RU: 'Новости',
    KG: 'Жаңылыктар',
    EN: 'News',
    CN: '新闻动态',
  },
  nav_about: {
    RU: 'О Фонде',
    KG: 'Фонд жөнүндө',
    EN: 'About NIF',
    CN: '关于我们',
  },
  nav_calc: {
    RU: 'Калькулятор',
    KG: 'Калькулятор',
    EN: 'Calculator',
    CN: '投融资计算器',
  },
  nav_admin: {
    RU: 'Админ-панель',
    KG: 'Админка',
    EN: 'Admin Board',
    CN: '申办看板',
  },
  cta_apply: {
    RU: 'Заявка на финансирование',
    KG: 'Каржылоого билдирме',
    EN: 'Apply for Funding',
    CN: '递交融通申请书',
  },
  hero_title_1: {
    RU: 'Инвестиции',
    KG: 'Инвестициялар',
    EN: 'Capital Assets',
    CN: '投资中国际资本',
  },
  hero_title_2: {
    RU: 'в проекты будущего',
    KG: 'келечектин долбоорлоруна',
    EN: 'for Projects of the Future',
    CN: '构筑未来黄金增长级',
  },
  hero_tagline: {
    RU: 'Открытое акционерное общество «Национальный инвестиционный фонд Кыргызской Республики» — государственный институт развития, созданный для эффективного управления активами и привлечения долгосрочных инвестиций.',
    KG: '«Кыргыз Республикасынын Улуттук инвестициялык фонду» ачык акционердик коому — мамлекеттик өнүктүрүү институту, активдерди натыйжалуу башкаруу жана узак мөөнөттүү инвестицияларды тартуу үчүн түзүлгөн.',
    EN: 'OJSC "National Investment Fund of the Kyrgyz Republic" is a state-owned development institution established to secure asset growth and attract cross-border strategic investments to fuel prosperity.',
    CN: '吉尔吉斯共和国国家投资总基金（股份公司）是经中央特许设立的国家级开发性金融与投资运营机构，专责优化配置国有金融资本。',
  },
  cabinet_subtitle: {
    RU: 'ФОНД УЧРЕЖДЕН ПОСТАНОВЛЕНИЕМ',
    KG: 'ФОНД ТОКТОМ МЕНЕН УЮШТУРУЛГАН',
    EN: 'FOUNDED BY EXECUTIVE ORDER OF THE',
    CN: '根据下列机关批准及条例决议设立',
  },
  cabinet_title: {
    RU: 'Кабинета Министров Кыргызской Республики',
    KG: 'Кыргыз Республикасынын Министрлер Кабинети',
    EN: 'Cabinet of Ministers of the Kyrgyz Republic',
    CN: '吉尔吉斯共和国部长会议（内阁）',
  },
  cabinet_desc: {
    RU: 'от 5 ноября 2024 года № 666 во исполнение Закона Кыргызской Республики «О Национальном инвестиционном фонде Кыргызской Республики» и Указа Президента Кыргызской Республики № 155 от 14 июня 2024 года.',
    KG: '2024-жылдын 5-ноябрындагы № 666 токтому менен «Кыргыз Республикасынын Улуттук инвестициялык фонду жөнүндө» Кыргыз Республикасынын Мыйзамын жана Кыргыз Республикасынын Президентинин 2024-жылдын 14-июнундагы № 155 Жарлыгын аткаруу максатында.',
    EN: 'effective Nov 5, 2024, No. 666, pursuant to the Law of the Kyrgyz Republic "On the National Investment Fund" and Presidential Decree No. 155 dated June 14, 2024.',
    CN: '系遵照2024年6月14日第155号总统令，并依照2024年11月5日内阁直达第666号法规，全面落实确立其吉国金融支柱地位。',
  },
  btn_more: {
    RU: 'ПОДРОБНЕЕ',
    KG: 'КЕНЕНИРЕЭК',
    EN: 'LEARN MORE',
    CN: '深度查阅',
  },
  financing_title: {
    RU: 'Финансирование проектов',
    KG: 'Долбоорлорду каржылоо',
    EN: 'Project Co-Financing',
    CN: '投融资总览',
  },
  financing_text: {
    RU: 'Фонд предоставляет гибкие финансовые ресурсы, направленные на разработку, масштабирование и диверсификацию приоритетных отраслей хозяйства страны.',
    KG: 'Фонд өлкөнүн чарбасынын артыкчылыктуу тармактарын өнүктүрүүгө, масштабдоого жана диверсификациялоого багытталган ийкемдүү финансылык ресурстарды берет.',
    EN: 'The Fund structures robust asset allocations and customized support models targeting vital real-sector upgrades, production expansions, and regional balance.',
    CN: '基金为旨在优化国家重要支柱产业结构、推动企业自主创新及绿色生态循环链条的优质项目，量身提供多元资助组合。',
  },
  directions_header: {
    RU: 'Перспективные',
    KG: 'Келечектүү',
    EN: 'Catalytic Focus',
    CN: '战略规划重点',
  },
  directions_title: {
    RU: 'Направления',
    KG: 'Багыттары',
    EN: 'Sectors of Growth',
    CN: '核心投资版图',
  },
  smb_title: {
    RU: 'Проекты МСБ',
    KG: 'Чакан жана орто бизнес долбоорлору',
    EN: 'MSB Partnerships',
    CN: '推动民企与中小企业（MSB）腾飞',
  },
  smb_text: {
    RU: 'Фонд уделяет особое внимание малому и среднему предпринимательству в регионах. Мы помогаем создавать рабочие места, повышаем добавленную стоимость локального экспорта и закладываем основу долгосрочного экономического развития.',
    KG: 'Фонд аймактардагы чакан жана орто ишкердикке өзгөчө көңүл бурат. Биз жумуш орундарын түзүүгө, жергиликтүү экспорттун кошумча наркын жогорулатууга жардам беребиз.',
    EN: 'The Fund directs priority development quotas specifically to MSBs in rural valleys and border areas. We co-finance agricultural processing, job growth engines, and small machinery implementations across our beautiful provinces.',
    CN: '我们专注于扶持中小微、妇女及青年双创、县域龙头产业。整合技术、智力和财政直通路径，极大巩固本土资源溢价能力，增加就业，激发内生增长动力。',
  },
  smb_counter_num: {
    RU: '120+',
    KG: '120+',
    EN: '120+',
    CN: '120余个',
  },
  smb_counter_desc: {
    RU: 'Проектов по всей стране',
    KG: 'Өлкө боюнча долбоорлор',
    EN: 'Active regional projects',
    CN: '在库培育与跟投项',
  },
  smb_support_card: {
    RU: 'Активная поддержка предпринимательства во всех областях страны',
    KG: 'Өлкөнүн бардык облустарында ишкердүүлүктү жигердүү колдоо',
    EN: 'Intense entrepreneurial assistance in all 7 constituent provinces',
    CN: '强力金融扶持覆盖全国所有边疆省份',
  },
  partners_title: {
    RU: 'Наши Партнеры',
    KG: 'Биздин Өнөктөштөр',
    EN: 'Global Alliances',
    CN: '全球及本土合作组织',
  },
  partners_text: {
    RU: 'Мы верим в синергию и взаимодействуем со всемирно известными аудиторскими, юридическими фирмами и банками Кыргызстана ради соблюдения принципов прозрачности и надежности.',
    KG: 'Биз синергияга ишенебиз жана ачык-айкындуулук жана ишенимдүүлүк принциптерин сактоо үчүн белгилүү аудитордук, юридикалык фирмалар жана Кыргызстандын банктары менен кызматташабыз.',
    EN: 'To protect investor dividends and guarantee absolute transparency, NIF partners with trusted global auditors, sovereign counterparties, and national clearinghouses.',
    CN: '在资金运行、合规背调及ESG穿透中，我们遵循国际化作业水准，与头部第三方评估、审计和金融网点建立深度交叉机制。',
  },
  news_title: {
    RU: 'Новости и События',
    KG: 'Жаңылыктар жана Окуялар',
    EN: 'Media & Announcements',
    CN: '新闻发布与政策速递',
  },
  btn_all_news: {
    RU: 'Все новости',
    KG: 'Бардык жаңылыктар',
    EN: 'See All News',
    CN: '历史发布归档',
  },
  footer_tagline: {
    RU: 'Государственный институт развития для управления активами и привлечения инвестиций Кыргызской Республики.',
    KG: 'Кыргыз Республикасынын активдерин башкаруу жана инвестицияларды тартуу боюнча мамлекеттик өнүктүрүү институту.',
    EN: 'The official vanguard sovereign development vehicle of corporate restructuring and multi-sector investment implementation in Kyrgyzstan.',
    CN: '吉尔吉斯共和国政府法定直属开发银行与战略资产投资总调度平台。',
  },
  footer_address_title: {
    RU: 'Адрес головного офиса',
    KG: 'Башкы кеңсенин дареги',
    EN: 'NIF Headquarters Address',
    CN: '总行级总部地址',
  },
  footer_address_val: {
    RU: 'Кыргызская Республика, 720001, г. Бишкек, ул. Токтогула, 125/1, БЦ «Авангард», Башня "А", 8 этаж, правое крыло.',
    KG: 'Кыргыз Республикасы, 720001, Бишкек ш., Токтогул көч., 125/1, «Авангард» ББ, А-мунарасы, 8-кабат, оң канат.',
    EN: 'Tower "A", 8th Floor (Right Wing), "Avangard" Business Center, 125/1 Toktogul Street, Bishkek, 720001, Kyrgyz Republic.',
    CN: '吉尔吉斯共和国，比什凯克市，Toktogul大街125/1号，Avangard高级写字楼A座，8层（右侧）。',
  },
  footer_links_title: {
    RU: 'Полезные ссылки',
    KG: 'Пайдалуу шилтемелер',
    EN: 'Information Resources',
    CN: '公众服务与条例',
  },
  trust_phone: {
    RU: 'Телефон доверия',
    KG: 'Ишеним телефону',
    EN: 'Anti-Corruption Hotline',
    CN: '廉政举报与信访电话',
  },
};

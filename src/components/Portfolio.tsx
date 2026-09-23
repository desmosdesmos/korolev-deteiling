import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  car: string;
  category: 'film' | 'tinting' | 'detailing' | 'protection' | 'sound';
  tag: string;
  image: string;
  localImage?: string;
  desc: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Оклейка передней части кузова в бронепленку',
    car: 'Geely Monjaro',
    category: 'film',
    tag: 'Зоны риска',
    image: 'https://avatars.mds.yandex.net/get-altay/17677530/2a0000019ddd6382a85a6dc9281df6712699/L_height',
    localImage: './photo/korton/korton_2.jpg',
    desc: 'Надежная защита передней ударной части кузова самовосстанавливающимся полиуретаном толщиной 200 мкм с глубоким подворотом всех кромок.',
  },
  {
    id: 'p2',
    title: 'Тонирование автостёкол задней полусферы',
    car: 'Премиальный кроссовер',
    category: 'tinting',
    tag: 'Тонировка по ГОСТ',
    image: 'https://avatars.mds.yandex.net/get-altay/19539707/2a0000019ddd63dc11ae6fa05b0ed1440e3a/L_height',
    localImage: './photo/korton/korton_1.jpg',
    desc: 'Качественная тонировка задней полусферы американской металлизированной пленкой: защита от выгорания салона, без пыли и пузырей.',
  },
  {
    id: 'p3',
    title: 'Тонировка лобового «хамелеон» + атермалка',
    car: 'Городской седан',
    category: 'tinting',
    tag: 'Тонер Хамелеон',
    image: 'https://avatars.mds.yandex.net/get-altay/18101536/2a0000019cb27e41b5069132aa189c214db0/L_height',
    localImage: './photo/korton/korton_7.jpg',
    desc: 'Защита от нагрева и палящего солнца специальной атермальной пленкой и стильным затемнением с фиолетовым переливом.',
  },
  {
    id: 'p4',
    title: 'Детейлинг-полировка и нанесение керамики 9H',
    car: 'Внедорожник SUV',
    category: 'detailing',
    tag: 'Керамика 9H',
    image: 'https://avatars.mds.yandex.net/get-altay/15417312/2a00000196d84efeab71205f951868b3f658/L_height',
    localImage: './photo/korton/korton_4.jpg',
    desc: 'Многоэтапное удаление царапин и паутинки, зеркальный карамельный блеск кузова и мощная гидрофобная защита от грязи.',
  },
  {
    id: 'p5',
    title: 'Полная оклейка кузова полиуретановой бронепленкой',
    car: 'Новый автомобиль',
    category: 'film',
    tag: 'Полная броня',
    image: 'https://avatars.mds.yandex.net/get-altay/14813057/2a00000195d161d881242187243bceb41612/L_height',
    localImage: './photo/korton/korton_3.jpg',
    desc: 'Комплексная консервация заводского лака глянцевым полиуретаном. Машина защищена от гравия, веток и химии на долгие годы.',
  },
  {
    id: 'p6',
    title: 'Глубокая химчистка салона и озонирование',
    car: 'Интерьер автомобиля',
    category: 'detailing',
    tag: 'Химчистка & Озон',
    image: 'https://avatars.mds.yandex.net/get-altay/15289836/2a00000196d8448393adf981bf666951b99b/L_height',
    localImage: './photo/korton/korton_5.jpg',
    desc: 'Полная деликатная чистка сидений, ковролина, пластика и потолка гипоаллергенной премиум-химией с устранением запахов.',
  },
  {
    id: 'p7',
    title: 'Комплексная шумоизоляция кузова и арок',
    car: 'Салон и двери',
    category: 'sound',
    tag: 'Шумоизоляция',
    image: 'https://avatars.mds.yandex.net/get-altay/16341471/2a0000019cb27f0849a5ac6dcd7541676e2c/L_height',
    localImage: './photo/korton/korton_6.jpg',
    desc: 'Снижение дорожного гула и вибраций в салоне на 70%, многослойные вибродемпферы и звукопоглотители Comfortmat.',
  },
  {
    id: 'p8',
    title: 'Антикоррозийная обработка днища и арок',
    car: 'Защита днища',
    category: 'sound',
    tag: 'Антикор',
    image: 'https://avatars.mds.yandex.net/get-altay/15457874/2a000001963845c45dc418061bb83885fafe/L_height',
    localImage: './photo/korton/korton_8.jpg',
    desc: 'Надежная консервация скрытых полостей, порогов и днища специализированными составами для защиты от соли и реагентов.',
  },
  {
    id: 'p9',
    title: 'Антихром оконных молдингов и решеток',
    car: 'Black Edition',
    category: 'protection',
    tag: 'Антихром',
    image: 'https://avatars.mds.yandex.net/get-altay/19082209/2a0000019cc1df0f1b3dbfef7996a846bade/L_height',
    localImage: './photo/korton/korton_9.jpg',
    desc: 'Оклейка хромированных элементов в глубокий черный глянец: защита от помутнения и стильный спортивный силуэт.',
  },
  {
    id: 'p10',
    title: 'Полировка и бронирование фар полиуретаном',
    car: 'Оптика автомобиля',
    category: 'protection',
    tag: 'Бронь фар',
    image: 'https://avatars.mds.yandex.net/get-altay/18141736/2a0000019cb27d2b7d152604308de12b179f/L_height',
    localImage: './photo/korton/korton_10.jpg',
    desc: 'Восстановление прозрачности фар и последующая оклейка самозатягивающимся полиуретаном для защиты от камней.',
  },
  {
    id: 'p11',
    title: 'Бронирование капота и передних крыльев',
    car: 'Кроссовер',
    category: 'film',
    tag: 'Skinxars PPF',
    image: 'https://avatars.mds.yandex.net/get-altay/17677530/2a0000019ddd6382a85a6dc9281df6712699/L_height',
    localImage: './photo/korton/korton_2.jpg',
    desc: 'Оклейка наиболее нагруженных деталей кузова самовосстанавливающейся пленкой с идеальной оптической гладкостью.',
  },
  {
    id: 'p12',
    title: 'Комплексная подготовка автомобиля к сезону',
    car: 'Бизнес-седан',
    category: 'detailing',
    tag: 'Детейлинг под ключ',
    image: 'https://avatars.mds.yandex.net/get-altay/15417312/2a00000196d84efeab71205f951868b3f658/L_height',
    localImage: './photo/korton/korton_4.jpg',
    desc: 'Химчистка, полировка кузова, гидрофобное покрытие стекол «антидождь» и тонирование задней полусферы.',
  },
];

interface StudioZone {
  id: string;
  stepNumber: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  desc: string;
  equipment: string[];
  badges: string[];
  image: string;
  localImage?: string;
}

const STUDIO_ZONES: StudioZone[] = [
  {
    id: 'zone-film',
    stepNumber: 'Зона 01',
    shortLabel: 'Бокс оклейки & Бронирования',
    title: 'Чистый бокс оклейки и бронирования кузова',
    subtitle: 'Нанесение антигравийных и тонировочных пленок в чистой зоне',
    desc: 'Специализированный бокс студии «КорТон» с ярким инспекционным светом и контролируемой температурой для безупречной адгезии полиуретановых пленок.',
    equipment: ['Инспекционный свет 5500K', 'Профессиональные тепловые фены', 'Обеспыленный чистый бокс'],
    badges: ['Полиуретан 200 мкм', 'Без пыли и пузырей', 'Официальная гарантия'],
    image: 'https://avatars.mds.yandex.net/get-altay/19539707/2a0000019ddd63dc11ae6fa05b0ed1440e3a/L_height',
    localImage: './photo/korton/korton_1.jpg',
  },
  {
    id: 'zone-tint',
    stepNumber: 'Зона 02',
    shortLabel: 'Пост тонирования стекол',
    title: 'Пост тонирования автостекол и бронирования фар',
    subtitle: 'Высокоточная формовка и оклейка оригинальными пленками',
    desc: 'Стенды с оригинальными рулонами пленки, стол раскроя и профессиональный инструмент для тонирования стекол и бронирования оптики.',
    equipment: ['Премиальные пленки по ГОСТ', 'Раскроечные столы', 'Высокоточная термоформовка'],
    badges: ['Защита от нагрева', 'Хамелеон & Атермалка', 'Ювелирный подворот'],
    image: 'https://avatars.mds.yandex.net/get-altay/18101536/2a0000019cb27e41b5069132aa189c214db0/L_height',
    localImage: './photo/korton/korton_7.jpg',
  },
  {
    id: 'zone-detailing',
    stepNumber: 'Зона 03',
    shortLabel: 'Полировка & Химчистка',
    title: 'Зона детейлинг-полировки и глубокой химчистки',
    subtitle: 'Восстановление первозданной чистоты кузова и салона',
    desc: 'Многоэтапная полировка лака, нанесение керамических составов 9H, профессиональная экстракторная химчистка салона и озонирование.',
    equipment: ['Полировальные машинки Rupes', 'Экстракторы и торнадоры', 'Озонаторы воздуха'],
    badges: ['Керамика 9H', 'Гипоаллергенно', 'Зеркальный глянец'],
    image: 'https://avatars.mds.yandex.net/get-altay/15417312/2a00000196d84efeab71205f951868b3f658/L_height',
    localImage: './photo/korton/korton_4.jpg',
  },
  {
    id: 'zone-exterior',
    stepNumber: 'Зона 04',
    shortLabel: 'Студия в Королёве',
    title: 'Студия «КорТон» на ул. М.К. Тихонравова, 4Б',
    subtitle: 'Удобный подъезд в мкр. Юбилейный, охраняемая территория',
    desc: 'Студия расположена в Королёве (Юбилейный). Закрытая охраняемая территория, удобная парковка и комфортная зона для клиентов.',
    equipment: ['г. Королёв, ул. М.К. Тихонравова, 4Б', 'Охраняемая парковка', 'Пн–Сб 09:00–19:00'],
    badges: ['Рейтинг 5.0 ★ Яндекс Карты', 'Удобный заезд', '125+ отзывов'],
    image: 'https://avatars.mds.yandex.net/get-altay/14813057/2a00000195d161d881242187243bceb41612/L_height',
    localImage: './photo/korton/korton_3.jpg',
  },
];

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeZoneIndex, setActiveZoneIndex] = useState<number>(0);
  const [isZonePaused, setIsZonePaused] = useState<boolean>(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance through zones every 6.5 seconds
  useEffect(() => {
    if (isZonePaused) return;
    const timer = setInterval(() => {
      setActiveZoneIndex((prev) => (prev + 1) % STUDIO_ZONES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isZonePaused]);

  const filteredItems = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  // Auto-scroll through projects
  useEffect(() => {
    if (isPaused || filteredItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % filteredItems.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, filteredItems.length]);

  return (
    <section id="portfolio" className="py-28 px-4 md:px-10 bg-black/75 backdrop-blur-sm text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight lowercase">
              наши работы
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-neutral-400 font-light lowercase">
            каждый автомобиль в студии «КорТон» — это проект с бескомпромиссным вниманием к каждой детали
          </p>
        </div>

        {/* Virtual Panorama: 4 Studio Zones in Action */}
        <div
          className="mb-24"
          onMouseEnter={() => setIsZonePaused(true)}
          onMouseLeave={() => setIsZonePaused(false)}
        >
          {/* Subheader */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Студия «КорТон» в действии</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>г. Королёв, мкр. Юбилейный, ул. М.К. Тихонравова, 4Б</span>
            </div>
          </div>

          {/* Zone Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4">
            {STUDIO_ZONES.map((zone, idx) => {
              const isActive = idx === activeZoneIndex;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZoneIndex(idx)}
                  className={`relative p-3.5 md:p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden border outline-none focus:outline-none ${
                    isActive
                      ? 'bg-neutral-900 border-white/50 shadow-lg shadow-white/5'
                      : 'bg-neutral-950/80 border-neutral-800/80 hover:border-neutral-700 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      {zone.stepNumber}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <div className="text-xs md:text-sm font-medium text-white line-clamp-1">
                    {zone.shortLabel}
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white via-white/80 to-transparent" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Zone Display Card */}
          {(() => {
            const curZone = STUDIO_ZONES[activeZoneIndex];
            return (
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                  {/* Left Column: Visual Media with subtle zoom */}
                  <div className="lg:col-span-7 relative h-72 lg:h-full overflow-hidden bg-neutral-900 group">
                    <img
                      src={curZone.image}
                      alt={curZone.title}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedLocal && curZone.localImage) {
                          target.dataset.triedLocal = 'true';
                          target.src = curZone.localImage;
                        }
                      }}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent lg:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-neutral-950 hidden lg:block" />

                    {/* Floating badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{curZone.stepNumber}</span>
                      <span className="text-neutral-400">/ 0{STUDIO_ZONES.length}</span>
                    </div>
                  </div>

                  {/* Right Column: Zone Details */}
                  <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium block mb-2">
                        {curZone.subtitle}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-4">
                        {curZone.title}
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-light mb-6">
                        {curZone.desc}
                      </p>

                      {/* Equipment tags */}
                      <div className="mb-6">
                        <span className="text-[11px] uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                          оснащение и условия:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {curZone.equipment.map((eq, i) => (
                            <span
                              key={i}
                              className="text-xs px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300"
                            >
                              {eq}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer badges */}
                    <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
                      {curZone.badges.map((b, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-light"
                        >
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Filter categories & controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            {[
              { id: 'all', label: 'все работы' },
              { id: 'film', label: 'оклейка и бронь' },
              { id: 'tinting', label: 'тонирование' },
              { id: 'detailing', label: 'полировка и химчистка' },
              { id: 'sound', label: 'шумоизоляция & антикор' },
              { id: 'protection', label: 'защита оптики' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentSlideIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-normal transition-all duration-200 whitespace-nowrap lowercase cursor-pointer select-none outline-none focus:outline-none focus-visible:outline-none ${
                  activeCategory === cat.id
                    ? 'bg-white text-black font-medium shadow-md shadow-white/10'
                    : 'bg-neutral-900/90 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)}
              className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-white transition-all active:scale-95 hover:bg-neutral-800 cursor-pointer outline-none focus:outline-none"
              aria-label="Предыдущий проект"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % filteredItems.length)}
              className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-white transition-all active:scale-95 hover:bg-neutral-800 cursor-pointer outline-none focus:outline-none"
              aria-label="Следующий проект"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {filteredItems.map((item, idx) => {
            const isCurrent = idx === currentSlideIndex;
            return (
              <div
                key={item.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`group rounded-3xl overflow-hidden bg-neutral-950/85 backdrop-blur-md border transition-all duration-500 flex flex-col cursor-pointer hover:-translate-y-2 select-none ${
                  isCurrent
                    ? 'border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.1)]'
                    : 'border-neutral-800/80 hover:border-neutral-600/80 opacity-90 hover:opacity-100 hover:shadow-2xl'
                }`}
              >
                <div className="relative h-64 overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedLocal && item.localImage) {
                        target.dataset.triedLocal = 'true';
                        target.src = item.localImage;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur text-xs text-white border border-white/10 lowercase shadow">
                    {item.tag}
                  </span>
                  <span className="absolute bottom-4 left-4 font-medium text-sm text-white drop-shadow bg-black/60 px-3 py-1 rounded-full backdrop-blur">
                    {item.car}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-medium text-white mb-2 group-hover:text-neutral-200">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

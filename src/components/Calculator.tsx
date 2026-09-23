import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Check, Car, Truck, Zap, Clock } from 'lucide-react';

interface CarClassOption {
  id: string;
  name: string;
  sub: string;
  multiplier: number;
  icon: React.ReactNode;
}

const CAR_CLASSES: CarClassOption[] = [
  {
    id: 'sedan',
    name: 'Седан / Хэтчбек',
    sub: 'BMW 3/5, Camry, Octavia, Audi A4',
    multiplier: 1.0,
    icon: <Car className="w-5 h-5" />,
  },
  {
    id: 'crossover',
    name: 'Кроссовер',
    sub: 'Geely Monjaro, Tiguan, RAV4, BMW X3',
    multiplier: 1.15,
    icon: <Car className="w-5 h-5" />,
  },
  {
    id: 'suv',
    name: 'Внедорожник / Minivan',
    sub: 'Tank 500, LC 200/300, BMW X5/X7',
    multiplier: 1.3,
    icon: <Truck className="w-5 h-5" />,
  },
  {
    id: 'luxury',
    name: 'Премиум / Li / Zeekr',
    sub: 'Li L7/L9, Zeekr 001, Porsche, Voyah',
    multiplier: 1.35,
    icon: <Zap className="w-5 h-5" />,
  },
];

interface ServiceCalcOption {
  id: string;
  name: string;
  desc: string;
  basePrice: number;
  days: number;
  category: string;
}

const CALC_SERVICES: ServiceCalcOption[] = [
  {
    id: 'film-risk',
    name: 'Оклейка зон риска (полиуретан 200 мкм)',
    desc: 'Капот, бампер, фары, крылья, зеркала, стойки',
    basePrice: 55000,
    days: 2,
    category: 'Защита',
  },
  {
    id: 'film-full',
    name: 'Полная оклейка кузова полиуретаном',
    desc: 'Глянец или матовый сатин, подворот всех кромок',
    basePrice: 185000,
    days: 4,
    category: 'Защита',
  },
  {
    id: 'tinting',
    name: 'Тонирование автостекол (задняя полусфера / круг)',
    desc: 'Качественная пленка по ГОСТ, без пузырей и пыли',
    basePrice: 6500,
    days: 0.3,
    category: 'Стекла',
  },
  {
    id: 'tinting-chameleon',
    name: 'Тонировка лобового «хамелеон» / атермальная',
    desc: 'Защита от нагрева салона и ультрафиолета с переливом',
    basePrice: 8500,
    days: 0.3,
    category: 'Стекла',
  },
  {
    id: 'polishing',
    name: 'Детейлинг-полировка кузова & керамика',
    desc: 'Удаление царапин, голограмм + защитный слой 9H',
    basePrice: 16000,
    days: 1.5,
    category: 'Детейлинг',
  },
  {
    id: 'interior',
    name: 'Глубокая химчистка салона и озонирование',
    desc: 'Торпедо, сиденья, ковролин, потолок, багажник',
    basePrice: 12000,
    days: 1,
    category: 'Детейлинг',
  },
  {
    id: 'headlights',
    name: 'Бронирование и полировка фар',
    desc: 'Защитный прозрачный или притемненный полиуретан',
    basePrice: 5000,
    days: 0.2,
    category: 'Оптика',
  },
  {
    id: 'soundproofing',
    name: 'Шумоизоляция салона и колесных арок',
    desc: 'Премиальные вибро- и звукопоглощающие материалы',
    basePrice: 28000,
    days: 1.5,
    category: 'Комфорт',
  },
  {
    id: 'anticor',
    name: 'Антикоррозийная обработка днища и арок',
    desc: 'Защита от соли, реагентов и предотвращение коррозии',
    basePrice: 18000,
    days: 1,
    category: 'Защита',
  },
  {
    id: 'antichrome',
    name: 'Антихром оконных молдингов и решеток',
    desc: 'Оклейка хромированных элементов в черный глянец',
    basePrice: 14000,
    days: 1,
    category: 'Стайлинг',
  },
];

interface CalculatorProps {
  onBookWithEstimate: (details: {
    carClass: string;
    services: string[];
    totalPrice: number;
  }) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onBookWithEstimate }) => {
  const [selectedClass, setSelectedClass] = useState<string>('crossover');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'film-risk',
    'tinting',
  ]);
  const [isPriceAnimating, setIsPriceAnimating] = useState<boolean>(false);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentClass = CAR_CLASSES.find((c) => c.id === selectedClass) || CAR_CLASSES[0];

  const rawSum = selectedServices.reduce((sum, sId) => {
    const s = CALC_SERVICES.find((item) => item.id === sId);
    if (!s) return sum;
    return sum + Math.round(s.basePrice * currentClass.multiplier);
  }, 0);

  // Discount rule: 2 services = 5%, 3+ services = 10%
  const discountPercent = selectedServices.length >= 3 ? 10 : selectedServices.length === 2 ? 5 : 0;
  const discountAmount = Math.round((rawSum * discountPercent) / 100);
  const finalPrice = rawSum - discountAmount;

  // Trigger animation on price change
  useEffect(() => {
    setIsPriceAnimating(true);
    const timer = setTimeout(() => setIsPriceAnimating(false), 350);
    return () => clearTimeout(timer);
  }, [finalPrice, selectedClass]);

  const totalDays = Math.max(
    1,
    selectedServices.reduce((acc, sId) => {
      const s = CALC_SERVICES.find((item) => item.id === sId);
      return acc + (s ? s.days : 0);
    }, 0)
  );

  const isGiftEligible = finalPrice >= 30000;

  const handleBook = () => {
    const serviceNames = selectedServices.map(
      (id) => CALC_SERVICES.find((s) => s.id === id)?.name || id
    );
    onBookWithEstimate({
      carClass: currentClass.name,
      services: serviceNames,
      totalPrice: finalPrice,
    });
  };

  return (
    <section id="calculator" className="py-28 px-4 md:px-10 bg-black/80 backdrop-blur-sm text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight lowercase mb-4">
            калькулятор стоимости
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light lowercase">
            выберите класс вашего автомобиля и нужные услуги. точный предварительный расчет
          </p>
        </div>

        {/* Step 1: Car Class selector */}
        <div className="mb-12">
          <label className="text-xs uppercase tracking-wider text-neutral-400 block mb-4 font-medium">
            1. класс автомобиля
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAR_CLASSES.map((car) => {
              const isSelected = selectedClass === car.id;
              return (
                <button
                  key={car.id}
                  onClick={() => setSelectedClass(car.id)}
                  className={`p-5 rounded-3xl border text-left transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 border-white text-white shadow-xl shadow-white/5 ring-1 ring-white/20'
                      : 'bg-neutral-950/70 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`${isSelected ? 'text-white' : 'text-neutral-500'}`}>
                      {car.icon}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="font-medium text-base text-white mb-1 lowercase">
                    {car.name}
                  </div>
                  <div className="text-xs text-neutral-500 leading-relaxed font-light">
                    {car.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Services selector + Summary card */}
        <div>
          <label className="text-xs uppercase tracking-wider text-neutral-400 block mb-4 font-medium">
            2. выберите услуги и комплекс
          </label>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Services Checklist */}
            <div className="lg:col-span-8 space-y-3">
              {CALC_SERVICES.map((s) => {
                const isChecked = selectedServices.includes(s.id);
                const currentPrice = Math.round(s.basePrice * currentClass.multiplier);

                return (
                  <div
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer ${
                      isChecked
                        ? 'bg-neutral-900 border-white/40 shadow-lg'
                        : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                          isChecked
                            ? 'bg-white border-white text-black'
                            : 'border-neutral-700 bg-neutral-900'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm md:text-base text-white">
                            {s.name}
                          </h4>
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 hidden sm:inline-block">
                            {s.category}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 font-light mt-0.5">
                          {s.desc}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm md:text-base font-medium text-white tracking-tight">
                        {currentPrice.toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-[11px] text-neutral-500 font-light">
                        ~{s.days >= 1 ? `${s.days} дн.` : `${Math.round(s.days * 8)} ч.`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Summary Card */}
            <div className="lg:col-span-4 bg-neutral-950 p-6 md:p-8 rounded-3xl border border-neutral-800 sticky top-28 shadow-2xl">
              <h3 className="text-lg font-medium text-white mb-6 lowercase">
                расчет вашей сметы
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Класс:</span>
                  <span className="text-white font-medium">{currentClass.name}</span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Выбрано услуг:</span>
                  <span className="text-white font-medium">{selectedServices.length} шт.</span>
                </div>

                {/* Badges / Extras */}
                <div className="pt-4 border-t border-neutral-800 space-y-2.5">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" /> Примерный срок
                    </span>
                    <span className="text-white font-medium">
                      {selectedServices.length > 0 ? `до ${Math.ceil(totalDays)} дн.` : '—'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-neutral-400" /> Гарантия на работы
                    </span>
                    <span className="text-white font-medium">до 5 лет</span>
                  </div>

                  {isGiftEligible && (
                    <div className="flex items-center justify-between text-emerald-400 bg-emerald-500/10 px-2.5 py-1.5 rounded-xl border border-emerald-500/20">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Подарок от студии
                      </span>
                      <span className="font-medium">«Антидождь»</span>
                    </div>
                  )}
                </div>

                {/* Discount calculation */}
                {discountAmount > 0 && (
                  <div className="pt-4 flex justify-between text-sm text-emerald-400">
                    <span>Скидка за комплекс ({discountPercent}%):</span>
                    <span>-{discountAmount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}

                {/* Total */}
                <div className="pt-4 flex items-baseline justify-between">
                  <span className="text-sm text-neutral-400 lowercase">итог к оплате:</span>
                  <div className="text-right">
                    {discountAmount > 0 && (
                      <span className="text-xs text-neutral-500 line-through mr-2">
                        {rawSum.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                    <span
                      className={`text-3xl font-medium tracking-tight inline-block transition-all duration-300 ${
                        isPriceAnimating
                          ? 'scale-110 text-emerald-300 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]'
                          : 'scale-100 text-white'
                      }`}
                    >
                      {finalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button
                  onClick={handleBook}
                  disabled={selectedServices.length === 0}
                  className="w-full py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-white/10 lowercase cursor-pointer"
                >
                  записаться по этой смете
                </button>
                <span className="text-[11px] text-center block text-neutral-500 mt-2 lowercase">
                  точная сумма фиксируется в заказ-наряде без скрытых доплат
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;

import React, { useState } from 'react';
import { CATEGORIES, SERVICES, ServiceItem } from '../data/services';
import { Clock, ShieldCheck, Check, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="relative py-28 px-4 md:px-10 bg-black/75 backdrop-blur-sm text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight lowercase">
              услуги и прайс
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-neutral-400 font-light lowercase">
            профессиональное тонирование, бронирование кузова, полировка и детейлинг в студии «КорТон» Королёв
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-normal transition-all whitespace-nowrap lowercase cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-black font-medium shadow-lg shadow-white/10'
                  : 'bg-neutral-900/90 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-neutral-950/85 backdrop-blur-md rounded-3xl border border-neutral-800/80 overflow-hidden hover:border-neutral-600/80 transition-all duration-500 flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.06)] hover:-translate-y-2"
            >
              {/* Image banner */}
              <div className="relative h-60 w-full overflow-hidden bg-neutral-950 rounded-t-3xl">
                <img
                  src={service.image}
                  alt={service.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedLocal && service.localImage) {
                      target.dataset.triedLocal = 'true';
                      target.src = service.localImage;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 transform-gpu will-change-transform block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />
                <div className="absolute -bottom-1 left-0 right-0 h-6 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
                
                {service.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neutral-900/90 backdrop-blur text-xs font-medium text-white border border-white/20 lowercase shadow-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {service.badge}
                  </span>
                )}

                <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs text-white/80 bg-black/70 backdrop-blur px-2.5 py-1 rounded-full border border-white/10 shadow">
                  <Clock className="w-3.5 h-3.5 text-white/70" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white mb-2 group-hover:text-neutral-100 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Feature bullets */}
                  <div className="space-y-2 mb-6 border-t border-neutral-900 pt-4">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="border-t border-neutral-800/80 pt-4 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[11px] text-neutral-400 uppercase tracking-wider block font-normal">стоимость</span>
                    <span className="text-xl font-medium text-white tracking-tight">
                      от {service.priceFrom.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectService(service);
                        const calcElem = document.getElementById('calculator');
                        calcElem?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="p-3 rounded-full bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                      title="Рассчитать точную стоимость"
                    >
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectService(service);
                        onOpenBooking();
                      }}
                      className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-all duration-300 active:scale-95 lowercase cursor-pointer shadow-lg hover:shadow-white/20"
                    >
                      записаться
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-white lowercase">контроль качества и гарантия</h4>
              <p className="text-sm text-neutral-400 lowercase font-light">
                бесплатный контрольный осмотр через 14 дней после оклейки и официальная гарантия на работы
              </p>
            </div>
          </div>
          <a
            href="tel:+79250647783"
            className="px-6 py-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium border border-neutral-700 transition-colors whitespace-nowrap lowercase"
          >
            консультация мастера
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;

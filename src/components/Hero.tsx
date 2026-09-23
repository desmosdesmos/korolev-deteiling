import React, { useState, useEffect } from 'react';
import {
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Play,
  X,
  MapPin,
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

const slides = [
  {
    id: 'slide-1',
    rating: '5.0 ★ Яндекс Карты (125+ оценок)',
    duration: 'Официальная гарантия',
    releaseDate: 'Сезон 2026',
    title: 'Студия детейлинга и тонирования «КорТон» в Королёве.',
    description: 'Профессиональное тонирование автостёкол, оклейка полиуретановой бронепленкой зон риска и кузова, детейлинг-полировка, химчистка и шумоизоляция в мкр. Юбилейный.',
  },
  {
    id: 'slide-2',
    rating: 'По ГОСТ и спецсерии',
    duration: 'Атермальная & Хамелеон',
    releaseDate: 'Сезон 2026',
    title: 'Тонирование автостёкол и защита от перегрева.',
    description: 'Оригинальные металлизированные и керамические пленки, защита салона от ультрафиолета и выгорания, идеальная посадка без пыли и заломов.',
  },
  {
    id: 'slide-3',
    rating: '100% броня кузова',
    duration: 'Полиуретан 200 мкм',
    releaseDate: 'Сезон 2026',
    title: 'Оклейка зон риска и кузова бронепленкой.',
    description: 'Надежный щит от сколов, гравия, пескоструя и реагентов с самовосстанавливающимся слоем от нагрева и подворотом всех кромок.',
  },
  {
    id: 'slide-4',
    rating: 'Идеальный результат',
    duration: 'Керамика 9H & Озон',
    releaseDate: 'Сезон 2026',
    title: 'Полировка, химчистка, антикор и шумоизоляция.',
    description: 'Восстановительная полировка до зеркального глянца, деликатная химчистка салона, антибактериальное озонирование и комплексная шумоизоляция.',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isWatchModalOpen, setIsWatchModalOpen] = useState(false);

  const currentSlide = slides[currentSlideIndex];

  // Auto-advance slides slowly every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [currentSlideIndex]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden text-white flex flex-col justify-end select-none">
      {/* BALANCED CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 bg-black/35 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent z-[2] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-[2] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent z-[2] pointer-events-none" />

      {/* HERO CONTENT */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          {/* Left Side */}
          <div className="flex-1 max-w-3xl" key={currentSlide.id}>
            {/* Metadata row with smooth transition */}
            <div className="flex items-center flex-wrap gap-2.5 sm:gap-4 mb-4 md:mb-6 text-xs sm:text-sm animate-slide-content">
              {/* Star rating */}
              <a
                href="https://yandex.ru/maps/org/korton/46634651770/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md shadow-black/40 hover:border-amber-400/50 transition-colors"
              >
                <Star className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-amber-400 text-amber-400 shrink-0" />
                <span className="font-medium text-white">{currentSlide.rating}</span>
              </a>

              {/* Clock / Experience */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-200 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-md shadow-black/40">
                <Clock className="w-4 h-4 shrink-0 text-white" />
                <span>{currentSlide.duration}</span>
              </div>

              {/* Address tag */}
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 text-neutral-200 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-md shadow-black/40">
                <MapPin className="w-4 h-4 shrink-0 text-red-400" />
                <span>г. Королёв, мкр. Юбилейный</span>
              </div>
            </div>

            {/* Title with smooth slide/fade animation */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] mb-4 md:mb-6 text-white leading-[1.1] animate-slide-content drop-shadow-xl">
              {currentSlide.title}
            </h1>

            {/* Description with smooth slide/fade animation */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 mb-6 md:mb-10 max-w-2xl font-light leading-relaxed animate-slide-content drop-shadow-md">
              {currentSlide.description}
            </p>

            {/* CTA buttons */}
            <div className="flex items-center flex-wrap gap-3 sm:gap-4">
              {/* "Записаться" */}
              <button
                onClick={onOpenBooking}
                className="bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer shadow-xl shadow-white/20"
              >
                <span>Записаться</span>
                <ArrowUpRight size={18} className="text-black" />
              </button>

              {/* "Наши услуги" */}
              <button
                onClick={handleScrollToServices}
                className="rounded-full font-medium liquid-glass text-white px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all cursor-pointer shadow-md shadow-black/40"
              >
                <span>Наши услуги</span>
              </button>

              {/* "О студии" */}
              <button
                onClick={() => setIsWatchModalOpen(true)}
                className="rounded-full liquid-glass text-white/90 px-4 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-white/10 active:scale-95 transition-all cursor-pointer text-sm shadow-md shadow-black/40"
              >
                <Play size={16} className="fill-white" />
                <span>О студии</span>
              </button>
            </div>
          </div>

          {/* Right Side: Navigation arrows + Slide Progress indicator */}
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 shrink-0 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 shadow-xl shadow-black/50">
            {/* Slide indicators / dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Перейти к слайду ${idx + 1}`}
                />
              ))}
            </div>

            <span className="text-xs font-mono text-neutral-400">
              0{currentSlideIndex + 1} / 0{slides.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevSlide}
                aria-label="Предыдущий слайд"
                title="Предыдущий слайд"
                className="w-9 h-9 rounded-full liquid-glass text-white flex items-center justify-center active:scale-90 transition-transform cursor-pointer hover:bg-white/15"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={handleNextSlide}
                aria-label="Следующий слайд"
                title="Следующий слайд"
                className="w-9 h-9 rounded-full liquid-glass text-white flex items-center justify-center active:scale-90 transition-transform cursor-pointer hover:bg-white/15"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal / About studio */}
      {isWatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-slide-content">
          <div className="relative w-full max-w-2xl liquid-glass rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl bg-black/95">
            <button
              onClick={() => setIsWatchModalOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Студия «КорТон» Королёв
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3">{currentSlide.title}</h3>
            <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
              {currentSlide.description} Студия детейлинга и тонирования «КорТон» расположена в г. Королёв, микрорайон Юбилейный, ул. М.К. Тихонравова, 4Б. Мы используем сертифицированные пленки и составы от ведущих производителей. Рейтинг 5.0 на Яндекс Картах на основании более 125 оценок и отзывов довольных автовладельцев.
            </p>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400 mb-6 flex-wrap">
              <span>⭐️ 5.0 на Яндекс Картах</span>
              <span>•</span>
              <span>ул. М.К. Тихонравова, 4Б</span>
              <span>•</span>
              <span>Пн–Сб: 09:00 – 19:00</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsWatchModalOpen(false);
                  onOpenBooking();
                }}
                className="bg-white text-black px-6 py-2.5 rounded-full font-medium text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Записаться на консультацию
              </button>
              <button
                onClick={() => setIsWatchModalOpen(false)}
                className="rounded-full liquid-glass px-6 py-2.5 text-sm font-medium text-white cursor-pointer hover:bg-white/10"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

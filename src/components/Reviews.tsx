import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, CheckCircle, ExternalLink, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const DURATION = 5000; // 5 seconds per review
  const INTERVAL_STEP = 50; // update progress every 50ms

  // Smooth progress bar and auto-advance
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % REVIEWS.length);
          return 0;
        }
        return prev + (INTERVAL_STEP / DURATION) * 100;
      });
    }, INTERVAL_STEP);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSelectReview = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    setProgress(0);
  };

  const review = REVIEWS[currentIndex];

  return (
    <section id="reviews" className="py-28 px-4 md:px-10 bg-black/75 backdrop-blur-sm text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight lowercase">
              отзывы клиентов
            </h2>
          </div>

          {/* Yandex Maps Rating Badge */}
          <div className="flex items-center gap-4 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-4 md:px-6 shadow-xl">
            <div className="text-3xl md:text-4xl font-semibold text-white tracking-tight flex items-center gap-1">
              5.0
              <Star className="w-6 h-6 fill-amber-400 text-amber-400 animate-pulse" />
            </div>
            <div className="border-l border-neutral-800 pl-4">
              <div className="text-xs text-white/90 font-medium">Рейтинг на Яндекс Картах</div>
              <div className="text-[11px] text-neutral-400">125 оценок · 87 подробных отзывов</div>
            </div>
            <a
              href="https://yandex.ru/maps/org/korton/46634651770/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white/80 hover:text-white transition-all hover:scale-105"
              aria-label="Открыть карточку в Яндекс Картах"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5 bg-neutral-900/70 border border-neutral-800/80 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <span
              className={`inline-block w-2 h-2 rounded-full transition-colors ${
                isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping'
              }`}
            />
            <span className="text-xs text-neutral-400 lowercase">
              {isPaused ? 'пауза (наведение курсора)' : 'автоматическое листание'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-500">
              0{currentIndex + 1} / 0{REVIEWS.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white active:scale-95 transition-all cursor-pointer"
                aria-label="Предыдущий отзыв"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white active:scale-95 transition-all cursor-pointer"
                aria-label="Следующий отзыв"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Review Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-neutral-950/90 border border-neutral-800/90 rounded-3xl p-6 md:p-10 shadow-2xl transition-all duration-500 overflow-hidden"
        >
          {/* Progress bar line at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900">
            <div
              className="h-full bg-gradient-to-r from-neutral-200 to-white transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side: Review content */}
            <div className={review.carPhoto ? 'lg:col-span-7 space-y-6' : 'lg:col-span-12 space-y-6'}>
              {/* Header: Author + Rating */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-white text-black font-semibold flex items-center justify-center text-lg shrink-0 shadow-lg">
                    {review.avatarLetter}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base md:text-lg font-medium text-white">
                        {review.author}
                      </h4>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xs text-neutral-400 font-light">
                      {review.level ? review.level : 'Клиент студии'} · {review.car}
                    </div>
                  </div>
                </div>

                {/* Rating stars & Yandex badge */}
                <div className="flex flex-col items-end gap-1">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-500">Яндекс верифицирован</span>
                </div>
              </div>

              {/* Service badge */}
              <div>
                <span className="text-xs px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 lowercase inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  {review.service}
                </span>
              </div>

              {/* Review text with decorative quote */}
              <div className="relative pl-6 border-l-2 border-white/20">
                <Quote className="w-6 h-6 text-neutral-700 absolute -top-3 -left-3 rotate-180 opacity-60" />
                <p className="text-base md:text-xl text-neutral-200 font-light leading-relaxed tracking-wide">
                  «{review.text}»
                </p>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                <span>{review.date}</span>
                <span className="text-neutral-400 lowercase">Королёв · Студия «КорТон»</span>
              </div>
            </div>

            {/* Right side: Studio car photo */}
            {review.carPhoto && (
              <div className="lg:col-span-5">
                <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-neutral-800 group shadow-2xl bg-neutral-950">
                  <img
                    src={review.carPhoto}
                    alt={review.car}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedLocal && review.localPhoto) {
                        target.dataset.triedLocal = 'true';
                        target.src = review.localPhoto;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/10 text-white/90">
                      {review.car}
                    </span>
                    <span className="text-white/60 text-[11px]">
                      фото из студии КорТон Королёв
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Selector / Navigation Dots */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {REVIEWS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleSelectReview(i)}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? 'bg-white text-black font-medium shadow-lg shadow-white/10 scale-105'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <span>0{i + 1}</span>
              <span className="hidden sm:inline lowercase text-[11px] truncate max-w-[100px]">
                {item.car}
              </span>
            </button>
          ))}
        </div>

        {/* Yandex CTA card */}
        <div className="mt-12 text-center">
          <a
            href="https://yandex.ru/maps/org/korton/46634651770/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 text-sm text-white transition-all lowercase hover:scale-105 shadow-xl"
          >
            <span>читать все 87 отзывов на яндекс картах</span>
            <ExternalLink className="w-4 h-4 text-neutral-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

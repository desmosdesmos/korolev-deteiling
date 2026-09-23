import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/85 backdrop-blur-md text-white border-t border-white/10 py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-lg font-medium tracking-tight uppercase">
              КОРТОН ДЕТЕЙЛИНГ СТУДИЯ
            </span>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm lowercase font-light">
            студия тонирования, оклейки и детейлинга в королёве. полиуретановая бронепленка, тонирование по гост, полировка, химчистка, шумоизоляция и антикор.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400 lowercase">
          <a href="#services" className="hover:text-white transition-colors">
            услуги
          </a>
          <a href="#calculator" className="hover:text-white transition-colors">
            калькулятор
          </a>
          <a href="#portfolio" className="hover:text-white transition-colors">
            портфолио
          </a>
          <a href="#reviews" className="hover:text-white transition-colors">
            отзывы
          </a>
          <a href="#contacts" className="hover:text-white transition-colors">
            контакты
          </a>
        </div>

        <div className="flex flex-col md:items-end gap-1 text-xs text-neutral-500">
          <div>© {new Date().getFullYear()} КорТон Королёв. Все права защищены.</div>
          <div>Оценка 5.0 на Яндекс Картах · г. Королёв, мкр. Юбилейный, ул. М.К. Тихонравова, 4Б</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

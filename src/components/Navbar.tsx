import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

const navLinks = [
  { title: 'услуги', href: '#services' },
  { title: 'калькулятор', href: '#calculator' },
  { title: 'наши работы', href: '#portfolio' },
  { title: 'отзывы', href: '#reviews' },
  { title: 'контакты', href: '#contacts' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 px-4 sm:px-6 md:px-12 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.9)]'
            : 'pt-5 pb-8 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-black/90 via-black/60 to-transparent'
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Left: Text logo */}
          <a
            href="#"
            className="h-9 md:h-10 flex items-center gap-2 animate-blur-fade-up select-none group bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-md shadow-black/50"
            style={{ animationDelay: '0ms' }}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
            <span className="text-base md:text-lg font-semibold tracking-wider text-white group-hover:text-red-400 transition-colors uppercase">
              КОРТОН
            </span>
            <span className="hidden sm:inline-block text-[10px] text-neutral-400 border-l border-white/20 pl-2 ml-1 lowercase font-light">
              королёв
            </span>
          </a>

          {/* Center: Navigation pills */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-xl shadow-black/60">
            {navLinks.map((link, idx) => (
              <a
                key={link.title}
                href={link.href}
                className="text-sm text-neutral-200 hover:text-white hover:bg-white/15 transition-all duration-200 px-4 py-1.5 rounded-full font-medium lowercase active:scale-95"
                style={{ animationDelay: `${100 + idx * 50}ms` }}
              >
                {link.title}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Кнопка "Записаться" */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:flex items-center gap-2 rounded-full liquid-glass bg-white/10 hover:bg-white/20 px-5 md:px-6 py-2 text-sm font-medium text-white animate-blur-fade-up cursor-pointer active:scale-95 transition-all shadow-md shadow-black/40"
              style={{ animationDelay: '350ms' }}
            >
              <span>записаться</span>
            </button>

            {/* Кнопка "Позвонить" */}
            <a
              href="tel:+79250647783"
              title="+7 (925) 064-77-83 — Позвонить"
              aria-label="Позвонить в студию КорТон"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full liquid-glass bg-white/10 hover:bg-white/20 text-white animate-blur-fade-up cursor-pointer active:scale-95 transition-all shadow-md shadow-black/40"
              style={{ animationDelay: '400ms' }}
            >
              <Phone size={18} />
            </a>

            {/* Кнопка WhatsApp */}
            <a
              href="https://wa.me/79250647783"
              target="_blank"
              rel="noopener noreferrer"
              title="Написать в WhatsApp"
              aria-label="Написать в WhatsApp"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full liquid-glass bg-white/10 hover:bg-white/20 text-white animate-blur-fade-up cursor-pointer active:scale-95 transition-all shadow-md shadow-black/40"
              style={{ animationDelay: '450ms' }}
            >
              <svg className="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.048-2.222-.578-1.745-.714-2.87-2.484-2.957-2.599-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.058.376-.058c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.214.606 4.29 1.664 6.075l-1.772 6.471 6.643-1.742c1.725.968 3.712 1.522 5.834 1.522 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* Кнопка VK */}
            <a
              href="https://vk.ru/id1113067211"
              target="_blank"
              rel="noopener noreferrer"
              title="Группа ВКонтакте"
              aria-label="ВКонтакте"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full liquid-glass bg-white/10 hover:bg-white/20 text-white animate-blur-fade-up cursor-pointer active:scale-95 transition-all shadow-md shadow-black/40"
              style={{ animationDelay: '500ms' }}
            >
              <span className="text-xs font-bold text-sky-400">VK</span>
            </a>

            {/* Hamburger menu button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Меню навигации"
              className="lg:hidden w-10 h-10 rounded-full liquid-glass bg-black/60 flex items-center justify-center relative animate-blur-fade-up cursor-pointer active:scale-95 text-white border border-white/20"
              style={{ animationDelay: '350ms' }}
            >
              <Menu
                className={`w-5 h-5 absolute transition-all duration-500 ease-out ${
                  mobileMenuOpen
                    ? 'opacity-0 rotate-180 scale-50'
                    : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`w-5 h-5 absolute transition-all duration-500 ease-out ${
                  mobileMenuOpen
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 -rotate-180 scale-50'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden fixed left-0 right-0 top-[76px] z-40 bg-neutral-950/95 backdrop-blur-2xl border-t border-b border-neutral-800 shadow-2xl transition-all duration-500 ease-out px-4 sm:px-6 md:px-12 py-5 ${
          mobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((link, idx) => (
            <a
              key={link.title}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 rounded-lg hover:bg-neutral-800/80 transition-all duration-300 text-base font-medium text-neutral-200 hover:text-white lowercase border-b border-neutral-900 last:border-none"
              style={{
                transitionDelay: mobileMenuOpen ? `${idx * 50}ms` : '0ms',
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-12px)',
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Mobile action buttons */}
        <div className="border-t border-neutral-800 pt-4 mt-3 flex items-center justify-between gap-2.5">
          <button
            onClick={() => {
              onOpenBooking();
              setMobileMenuOpen(false);
            }}
            className="flex-1 rounded-full liquid-glass bg-white/10 hover:bg-white/20 py-2.5 text-sm font-medium text-white cursor-pointer active:scale-95 text-center"
          >
            записаться
          </button>
          <a
            href="tel:+79250647783"
            className="w-10 h-10 rounded-full liquid-glass bg-white/10 flex items-center justify-center shrink-0 cursor-pointer active:scale-95 text-white"
            title="Позвонить"
            aria-label="Позвонить"
          >
            <Phone size={18} />
          </a>
          <a
            href="https://wa.me/79250647783"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full liquid-glass bg-white/10 flex items-center justify-center shrink-0 cursor-pointer active:scale-95 text-emerald-400"
            title="WhatsApp"
            aria-label="WhatsApp"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.048-2.222-.578-1.745-.714-2.87-2.484-2.957-2.599-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.058.376-.058c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.214.606 4.29 1.664 6.075l-1.772 6.471 6.643-1.742c1.725.968 3.712 1.522 5.834 1.522 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://vk.ru/id1113067211"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full liquid-glass bg-white/10 flex items-center justify-center shrink-0 cursor-pointer active:scale-95 text-white"
            title="VK"
            aria-label="VK"
          >
            <span className="text-xs font-bold text-sky-400">VK</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

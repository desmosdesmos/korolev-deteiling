import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Navigation, ExternalLink } from 'lucide-react';

interface ContactsProps {
  onOpenBooking: () => void;
}

export const Contacts: React.FC<ContactsProps> = ({ onOpenBooking }) => {
  return (
    <section id="contacts" className="py-28 px-4 md:px-10 bg-black/75 backdrop-blur-sm text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight lowercase mb-4">
            контакты студии
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light lowercase">
            ждем вас в гости на бесплатный осмотр кузова, подбор пленок и точный расчет сметы
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address */}
            <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">адрес</span>
                <p className="text-base font-medium text-white leading-snug">
                  Московская область, г. Королёв, мкр. Юбилейный, ул. М.К. Тихонравова, 4Б
                </p>
                <span className="text-xs text-neutral-400 mt-1 block">Удобный подъезд · Охраняемая парковка</span>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">телефон</span>
                <a
                  href="tel:+79250647783"
                  className="text-xl font-medium text-white hover:text-neutral-300 transition-colors block"
                >
                  +7 (925) 064-77-83
                </a>
                <span className="text-xs text-neutral-400 mt-1 block">Звонки и WhatsApp для консультаций</span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">режим работы</span>
                <p className="text-base font-medium text-white">
                  Пн–Сб: с 09:00 до 19:00
                </p>
                <span className="text-xs text-neutral-400 mt-1 block">Воскресенье: по предварительной записи</span>
              </div>
            </div>

            {/* Messengers & Social buttons */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <a
                href="https://wa.me/79250647783"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-white transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs lowercase"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>whatsapp</span>
              </a>

              <a
                href="https://vk.ru/id1113067211"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-sky-500/50 hover:bg-sky-950/20 text-white transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs lowercase"
              >
                <span className="font-bold text-sky-400 text-sm">VK</span>
                <span>вконтакте</span>
              </a>

              <a
                href="https://yandex.ru/maps/org/korton/46634651770/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 hover:bg-amber-950/20 text-white transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs lowercase"
              >
                <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
                <span>яндекс карты</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors shadow-xl shadow-white/10 lowercase cursor-pointer"
              >
                записаться онлайн на удобный день
              </button>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-7 bg-neutral-950 rounded-3xl border border-neutral-800/80 overflow-hidden relative min-h-[420px] flex flex-col justify-between">
            {/* Embedded interactive map iframe using OpenStreetMap centered on Korolev coords: 55.938924, 37.835825 */}
            <div className="w-full h-full min-h-[380px] relative">
              <iframe
                title="Карта КорТон Королёв"
                className="w-full h-full min-h-[380px] border-0 filter invert-[0.9] hue-rotate-180 contrast-125"
                src="https://www.openstreetmap.org/export/embed.html?bbox=37.8200%2C55.9300%2C37.8500%2C55.9450&amp;layer=mapnik&amp;marker=55.938924%2C37.835825"
                loading="lazy"
              />

              {/* Map Floating Card */}
              <div className="absolute top-4 left-4 right-4 md:right-auto bg-black/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">Детейлинг и тонирование «КорТон»</div>
                    <div className="text-xs text-neutral-400">г. Королёв, мкр. Юбилейный, ул. М.К. Тихонравова, 4Б</div>
                  </div>
                </div>
              </div>

              {/* Route buttons overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <a
                  href="https://yandex.ru/maps/org/korton/46634651770/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-black/90 backdrop-blur text-xs font-medium text-white border border-white/20 hover:bg-white hover:text-black transition-colors flex items-center gap-1.5 shadow-lg"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>маршрут в яндекс картах</span>
                </a>
                <a
                  href="https://wa.me/79250647783"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-black/90 backdrop-blur text-xs font-medium text-white border border-white/20 hover:bg-white hover:text-black transition-colors flex items-center gap-1.5 shadow-lg"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>написать в whatsapp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;

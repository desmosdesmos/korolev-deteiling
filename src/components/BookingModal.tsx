import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Car, Phone, User, MessageCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEstimate?: {
    carClass: string;
    services: string[];
    totalPrice: number;
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialEstimate,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [carModel, setCarModel] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialEstimate?.carClass && !carModel) {
      setCarModel(initialEstimate.carClass);
    }
  }, [initialEstimate, carModel]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const servicesText = initialEstimate?.services?.length
      ? `Услуги: ${initialEstimate.services.join(', ')} (Смета ~${initialEstimate.totalPrice.toLocaleString('ru-RU')} ₽)`
      : comment || 'Консультация по услугам детейлинга';

    const message = `Здравствуйте! Хочу записаться в студию «КорТон» (Королёв).\nИмя: ${name || 'Клиент'}\nАвто: ${carModel || 'Автомобиль'}\nЖелаемая дата: ${date || 'Ближайшая'}\n${servicesText}`;

    window.open(`https://wa.me/79250647783?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs text-white/50 lowercase tracking-wider block mb-1">
                онлайн-запись в «КорТон» Королёв
              </span>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight lowercase">
                забронировать визит
              </h3>
              <p className="text-xs text-neutral-400 mt-1 lowercase font-light">
                мастер свяжется с вами в течение 10 минут для согласования времени
              </p>
            </div>

            {/* Pre-filled estimate tag */}
            {initialEstimate && initialEstimate.services.length > 0 && (
              <div className="mb-6 p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs">
                <div className="flex justify-between font-medium text-white mb-1">
                  <span>Расчет калькулятора:</span>
                  <span>{initialEstimate.totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="text-neutral-400 text-[11px] truncate">
                  {initialEstimate.services.join(' • ')}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-400 lowercase mb-1.5">
                  ваше имя *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Александр"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 lowercase mb-1.5">
                  номер телефона *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 lowercase mb-1.5">
                    марка и модель авто
                  </label>
                  <div className="relative">
                    <Car className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Geely Monjaro / BMW"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 lowercase mb-1.5">
                    желаемая дата
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 lowercase mb-1.5">
                  пожелания или доп. вопросы
                </label>
                <textarea
                  rows={2}
                  placeholder="Например: тонировка хамелеон, оклейка зон риска, удобнее в первой половине дня"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors shadow-xl shadow-white/10 lowercase cursor-pointer mt-2"
              >
                подтвердить заявку
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-medium text-white mb-2 lowercase">
              заявка успешно принята!
            </h4>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto mb-6 lowercase font-light">
              мы забронировали для вас предварительное время в студии «КорТон». мастер свяжется с вами в течение 10 минут.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleWhatsAppSend}
                className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer lowercase"
              >
                <MessageCircle className="w-4 h-4" />
                <span>написать напрямую в whatsapp</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs lowercase transition-colors"
              >
                закрыть окно
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;

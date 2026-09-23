import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Calculator } from './components/Calculator';
import { Portfolio } from './components/Portfolio';
import { Reviews } from './components/Reviews';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceItem } from './data/services';

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeEstimate, setActiveEstimate] = useState<{
    carClass: string;
    services: string[];
    totalPrice: number;
  } | null>(null);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectServiceFromCatalog = (service: ServiceItem) => {
    setActiveEstimate({
      carClass: 'Кроссовер',
      services: [service.title],
      totalPrice: service.priceFrom,
    });
    setIsBookingOpen(true);
  };

  const handleBookWithEstimate = (details: {
    carClass: string;
    services: string[];
    totalPrice: number;
  }) => {
    setActiveEstimate(details);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black relative">
      {/* ========================================================= */}
      {/* GLOBAL FIXED BACKGROUND VIDEO (Across Entire Website) */}
      {/* ========================================================= */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="./hero-video.mp4" type="video/mp4" />
          <source src="./фон.mp4" type="video/mp4" />
          <source src="./новый%20фон.mp4" type="video/mp4" />
          <source src="./новый фон.mp4" type="video/mp4" />
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/фон.mp4" type="video/mp4" />
        </video>
        {/* Subtle global dark tint for crisp readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Global Interactive Content Layer */}
      <div className="relative z-10">
        {/* Global Fixed Header with Cinematic Liquid Glass */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Services and Catalog */}
        <Services
          onSelectService={handleSelectServiceFromCatalog}
          onOpenBooking={handleOpenBooking}
        />

        {/* Price Calculator */}
        <Calculator onBookWithEstimate={handleBookWithEstimate} />

        {/* Portfolio Showcase */}
        <Portfolio />

        {/* Yandex Reviews */}
        <Reviews />

        {/* Contacts & Map */}
        <Contacts onOpenBooking={handleOpenBooking} />

        {/* Footer */}
        <Footer />

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialEstimate={activeEstimate}
        />
      </div>
    </div>
  );
};

export default App;

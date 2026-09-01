import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const PARTNERS = [
  {
    name: "OB",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
      <rect width="80" height="60" x="10" y="10" fill="white" rx="8" />
      <circle cx="50" cy="40" r="15" fill="black" />
      <text x="100" y="55" fill="white" font-size="50" font-weight="900" font-family="sans-serif">B</text>
    </svg>`
  },
  {
    name: "KITES",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 80" width="250" height="80">
      <circle cx="40" cy="40" r="25" fill="white" />
      <path d="M25 50 L40 25 L50 35" fill="none" stroke="black" stroke-width="4" />
      <text x="80" y="52" fill="white" font-size="45" font-weight="900" font-family="sans-serif" font-style="italic" letter-spacing="2">KITES</text>
    </svg>`
  },
  {
    name: "Rapid Access",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" width="300" height="80">
      <path d="M10 20 L30 40 L10 60 M30 20 L50 40 L30 60" fill="none" stroke="white" stroke-width="6" />
      <text x="60" y="45" fill="white" font-size="38" font-weight="800" font-family="sans-serif">Rapid Access</text>
      <text x="60" y="65" fill="white" font-size="14" font-weight="600" font-family="sans-serif">A LOXAM Company</text>
    </svg>`
  },
  {
    name: "CAT",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
      <text x="100" y="55" fill="white" font-size="45" font-weight="900" font-family="sans-serif" text-anchor="middle">CAT</text>
      <polygon points="50,60 150,60 100,70" fill="%23FFB800" />
    </svg>`
  },
  {
    name: "JCB",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
      <rect width="140" height="50" x="30" y="15" fill="%23FFB800" rx="4" />
      <text x="100" y="52" fill="black" font-size="40" font-weight="900" font-family="sans-serif" text-anchor="middle">JCB</text>
    </svg>`
  }
];

const EquipmentPartnersSection = () => {
  const swiperRef = useRef(null);

  return (
    <section className="w-full bg-white text-black py-24 select-none overflow-hidden" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col h-full">
        
        {/* Header Row */}
        <div className="flex flex-row justify-between items-end mb-12 w-full">
          
          {/* Title on the right */}
          <div className="flex-1">
            <SectionTitle title="شركاء المعدات المعتمدين" theme="light" />
          </div>

          {/* Navigation Buttons on the left */}
          <div className="flex flex-row gap-4 hidden sm:flex">
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
              aria-label="Next Slide"
            >
              <ChevronRight size={24} />
            </button>
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Black Horizontal Band for Logos */}
      <div className="w-full bg-[#0a0a0a] py-10 sm:py-14 shadow-lg border-y border-[#222]">
        <div className="w-full px-4">
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            modules={[Autoplay, Navigation]}
            loop={true}
            dir="rtl"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={'auto'}
            spaceBetween={50}
            breakpoints={{
              640: { spaceBetween: 60 },
              1024: { spaceBetween: 80 },
              1440: { spaceBetween: 100 }
            }}
            className="w-full flex items-center"
          >
            {PARTNERS.concat(PARTNERS).map((partner, index) => (
              <SwiperSlide key={index} className="!w-auto flex items-center justify-center">
                <div className="h-16 sm:h-20 flex items-center justify-center px-4 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-auto max-w-[200px] sm:max-w-[280px] object-contain"
                    loading="lazy"
                    draggable="false"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Mobile Navigation Buttons */}
      <div className="flex flex-row justify-center gap-6 mt-8 sm:hidden">
        <button 
          onClick={() => swiperRef.current?.slideNext()}
          className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 active:bg-black active:text-white"
        >
          <ChevronRight size={24} />
        </button>
        <button 
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 active:bg-black active:text-white"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

    </section>
  );
};

export default EquipmentPartnersSection;

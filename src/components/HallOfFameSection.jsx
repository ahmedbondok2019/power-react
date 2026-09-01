import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SectionTitle from './ui/SectionTitle';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

const clients = [
  {
    name: "مجموعة السدحان",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 70" width="140" height="70">
      <circle cx="70" cy="26" r="22" fill="none" stroke="%230B5AA8" stroke-width="4.5" />
      <path d="M62 18 C68 10 78 14 72 22 C66 30 76 36 78 36" fill="none" stroke="%230B5AA8" stroke-width="4.5" stroke-linecap="round" />
      <text x="70" y="62" fill="%230B5AA8" font-size="12" font-weight="700" font-family="sans-serif" text-anchor="middle">مجموعة السدحان</text>
    </svg>`
  },
  {
    name: "Amazon",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 60" width="160" height="60">
      <text x="80" y="38" fill="%23111111" font-size="38" font-weight="900" font-family="sans-serif" text-anchor="middle" letter-spacing="-1">amazon</text>
      <path d="M35 46 Q80 62 125 47" fill="none" stroke="%23FF9900" stroke-width="4.5" stroke-linecap="round" />
      <path d="M121 41 L130 47 L121 52 Z" fill="%23FF9900" />
    </svg>`
  },
  {
    name: "Max",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60">
      <text x="50" y="48" fill="%23005A9E" font-size="50" font-weight="900" font-style="italic" font-family="sans-serif" text-anchor="middle">ma</text>
      <text x="105" y="48" fill="%23E31B23" font-size="50" font-weight="900" font-style="italic" font-family="sans-serif" text-anchor="middle">x</text>
    </svg>`
  },
  {
    name: "TBC",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60">
      <text x="50" y="48" fill="%23009688" font-size="48" font-weight="900" font-family="sans-serif" text-anchor="middle">TB</text>
      <text x="105" y="48" fill="%23009688" font-size="48" font-weight="900" font-family="sans-serif" text-anchor="middle">C</text>
      <polygon points="76,24 88,34 76,44" fill="%23FFC107" />
    </svg>`
  },
  {
    name: "BACS",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 65" width="150" height="65">
      <path d="M50 12 C65 12 80 18 85 24 L100 24 C90 14 70 12 55 12 Z" fill="%23006699" />
      <path d="M45 20 L100 20 L90 34 L40 34 Z" fill="%23006699" />
      <text x="75" y="58" fill="%23006699" font-size="24" font-weight="900" font-family="sans-serif" text-anchor="middle" letter-spacing="2">BACS</text>
    </svg>`
  },
  {
    name: "MAERSK",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 60" width="160" height="60">
      <rect x="10" y="14" width="32" height="32" rx="4" fill="%2342B0D5" />
      <text x="26" y="38" fill="%23FFFFFF" font-size="26" font-weight="900" text-anchor="middle">★</text>
      <text x="100" y="40" fill="%23111111" font-size="28" font-weight="900" font-family="sans-serif" text-anchor="middle" letter-spacing="1">MAERSK</text>
    </svg>`
  },
  {
    name: "Alfanar",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60" width="150" height="60">
      <circle cx="28" cy="34" r="14" fill="%23CC0000" />
      <text x="92" y="42" fill="%23CC0000" font-size="30" font-weight="800" font-family="sans-serif" text-anchor="middle">alfanar</text>
    </svg>`
  },
  {
    name: "Almarai",
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 60" width="140" height="60">
      <text x="70" y="32" fill="%23003366" font-size="22" font-weight="900" font-family="sans-serif" text-anchor="middle">المراعي</text>
      <text x="70" y="52" fill="%23003366" font-size="16" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">Almarai</text>
    </svg>`
  }
];

const HallOfFameSection = ({ title = "قاعة المشاهير" }) => {
  return (
    <section className="py-16 sm:py-20 bg-white text-[#111312] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-right">
        {/* Section Heading */}
        <SectionTitle title={title} theme="light" />
      </div>

      {/* Horizontal Continuous Logo Slider Track with Tall Band & Tight Gaps */}
      <div className="w-full bg-[#E5E5E5] py-6 sm:py-8 shadow-sm border-y border-[#DCDCDC] relative">
        <div className="w-full px-2">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            dir="rtl"
            speed={2500}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              reverseDirection: false,
            }}
            slidesPerView={'auto'}
            spaceBetween={18}
            className="w-full flex items-center pointer-events-none select-none"
          >
            {clients.concat(clients).concat(clients).map((client, index) => (
              <SwiperSlide key={index} className="!w-auto flex items-center justify-center">
                <div className="h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center px-2 sm:px-3">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] object-contain brightness-95 contrast-105"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HallOfFameSection;

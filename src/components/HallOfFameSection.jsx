import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SectionTitle from './ui/SectionTitle';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

const HallOfFameSection = ({
  data,
  title = '',
  subtitle = '',
  clients = [],
}) => {
  const sectionTitle = data?.header?.title || title;
  const rawClients = data?.clients || clients || [];

  const displayClients = rawClients.map((c) => ({
    name: c.title || c.name,
    logo: c.image || c.logo,
  }));

  if (displayClients.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white text-[#111312] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-right">
        {/* Section Heading */}
        <SectionTitle title={sectionTitle} theme="light" />
      </div>

      {/* Horizontal Continuous Logo Slider Track with Tall Band & Tight Gaps */}
      <div className="w-full bg-[#E5E5E5] py-6 sm:py-8 shadow-sm border-y border-[#DCDCDC] relative">
        <style>{`
          .continuous-slider .swiper-wrapper {
            transition-timing-function: linear !important;
          }
        `}</style>
        <div className="w-full px-2">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            dir="rtl"
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              reverseDirection: false,
            }}
            allowTouchMove={false}
            slidesPerView={'auto'}
            spaceBetween={18}
            className="continuous-slider w-full flex items-center pointer-events-none select-none"
          >
            {displayClients.concat(displayClients).concat(displayClients).map((client, index) => (
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

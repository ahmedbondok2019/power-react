import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import 'swiper/css';

const CERTIFICATES = [
  {
    id: 1,
    title: "رخصة الاستثمار",
    image: "https://placehold.co/800x1000/f8fafc/94a3b8?text=Investment+License"
  },
  {
    id: 2,
    title: "ترخيص نظام الحريق",
    image: "https://placehold.co/800x1000/f8fafc/94a3b8?text=Fire+System+License"
  },
  {
    id: 3,
    title: "شهادة تصنيف المقاولين",
    image: "https://placehold.co/800x1000/f8fafc/94a3b8?text=Contractor+Classification"
  },
  {
    id: 4,
    title: "شهادة الآيزو 9001",
    image: "https://placehold.co/800x1000/f8fafc/94a3b8?text=ISO+9001"
  }
];

const CertificatesSection = () => {
  const swiperRef = useRef(null);

  return (
    <section className="relative w-full bg-[#F3F4F6] text-black py-24 select-none overflow-hidden" dir="rtl">
      <div className="max-w-9xl mx-auto px-6 lg:px-12 flex flex-col h-full">

        {/* Header Row */}
        <div className="flex flex-row justify-between items-end mb-16 w-full">

          {/* Title on the right */}
          <div className="flex-1">
            <SectionTitle title="شهادات" theme="light" />
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

        {/* Swiper Slider */}
        <div className="w-full relative pb-10">
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1.1}
            dir="rtl"
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1440: {
                slidesPerView: 2,
                spaceBetween: 50,
              }
            }}
            className="w-full"
          >
            {CERTIFICATES.map((cert) => (
              <SwiperSlide key={cert.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col items-center border border-gray-100"
                >
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-8 text-center tracking-wide">
                    {cert.title}
                  </h3>
                  <div className="w-full flex-1 rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile Navigation Buttons (shown only on very small screens if needed) */}
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

      </div>
    </section>
  );
};

export default CertificatesSection;

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

const OurPresenceSection = () => {
  return (
    <section className="w-full bg-[#141615] text-white pt-10 pb-6 select-none overflow-hidden" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-end text-right">

        {/* Header */}
        <div className="flex flex-col items-start w-full mb-12">
          <SectionTitle title="وجودنا" theme="dark" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-white tracking-wide">
            خبرة تمتد عبر المملكة
          </h3>
          <p className="text-white/80 text-lg sm:text-xl lg:text-[22px] font-medium leading-[2.2]">
            تظهر مشاريع الشركة وانتشارها في عدد من المدن والمواقع الرئيسية في المملكة العربية السعودية، بما في ذلك الرياض، جدة، مكة، المدينة، الدمام، القصيم، جازان، نجران، نيوم وغيرها. كما يتضمن سجل المشاريع مواقع ومشاريع بارزة مثل Al Murabaa و KAFD و Qiddiya و Trojena و Oxagon و Sindalah و Riyadh Front.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default OurPresenceSection;

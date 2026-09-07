import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftCircle } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const EASE = [0.22, 1, 0.36, 1];

const services = [
  { title: 'HOSPITALITY\n& RESORTS',    arabic: 'الضيافة والمنتجعات',    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop' },
  { title: 'HEALTHCARE\n& MEDICAL',     arabic: 'الرعاية الصحية',        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop' },
  { title: 'RESIDENTIAL\nDEVELOPMENT', arabic: 'التطوير السكني',        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop' },
  { title: 'COMMERCIAL\n& RETAIL',      arabic: 'التجزئة والتجاري',      image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=1000&auto=format&fit=crop' },
  { title: 'INFRASTRUCTURE\n& CIVIL',   arabic: 'البنية التحتية والمدني', image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1000&auto=format&fit=crop' },
  { title: 'INDUSTRIAL\nFACILITIES',   arabic: 'المنشآت الصناعية',      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop' },
  { title: 'EDUCATION\n& CAMPUSES',    arabic: 'التعليم والحرم الجامعي', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop' },
];

/*
 * Grid has 4 columns on lg, 3 on md, 2 on sm, 1 on xs.
 * Uses staggerChildren for smooth scrolling group animation.
 */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.85, ease: EASE }
  }
};
const ServicesSection = () => (
  <section id="خدماتنا" className="min-h-screen py-24 bg-[#111312] text-white relative overflow-hidden">

    {/* ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FFB800]/5 blur-[140px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6">

      {/* Header — title on right, link on left (in RTL, first element is on the right) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        
        {/* Title — FIRST in DOM, so it appears on the RIGHT in RTL */}
        <motion.div
          className="text-right"
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <SectionTitle title="خدماتنا" theme="dark" />
        </motion.div>

        {/* Link — SECOND in DOM, so it appears on the LEFT in RTL */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <a href="#خدماتنا" className="group flex items-center gap-2.5 text-white/80 hover:text-[#FFB800] transition-colors duration-300 text-sm font-medium">
            <span>مزيد من الخدمات</span>
            <ArrowLeftCircle className="w-5 h-5 group-hover:-translate-x-1 transition-all duration-300 stroke-[1.8]" />
          </a>
        </motion.div>

      </div>

      {/* Description — from right */}
      <motion.div
        className="text-right mb-14"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
      >
        <p className="typography-paragraph-main text-white/90 max-w-4xl ml-auto leading-relaxed">
          نقدم مجموعة واسعة من خدمات المقاولات من المقاولات الجزئية إلى المقاولات العامة مع تغطية لعدة قطاعات.
        </p>
      </motion.div>

      {/* Cards — bottom → top stagger */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1, margin: '0px 0px -100px 0px' }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center max-w-7xl mx-auto"
      >
        {services.map((svc, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="w-full flex justify-center"
          >
            <motion.div
              className="relative w-full max-w-[305px] h-[363px] rounded-[22px] overflow-hidden cursor-pointer group border border-white/10 bg-[#1E201E] shadow-xl"
              whileHover={{ scale: 1.04, y: -10, transition: { duration: 0.3, ease: 'easeOut' } }}
            >
              <img
                src={svc.image}
                alt={svc.arabic}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 z-10 text-left">
                <p className="text-[#FFB800] text-[10px] font-semibold tracking-widest uppercase mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {svc.arabic}
                </p>
                <h3 className="text-white font-sans text-[18px] sm:text-[20px] leading-snug tracking-normal font-medium uppercase whitespace-pre-line drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1">
                  {svc.title}
                </h3>
                <div className="w-0 group-hover:w-16 h-[3px] bg-[#FFB800] mt-3 rounded-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  </section>
);

export default ServicesSection;

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './ui/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

const GroupStructureSection = ({
  data,
  title = '',
  subtitle = '',
  mainLogo = '',
  sisterCompaniesTitle = '',
  sisterCompanies = [],
  partnersTitle = '',
  partners = [],
}) => {
  const containerRef = useRef(null);
  const animatedLogoRef = useRef(null);

  // Resolve values either from data prop or direct props
  const sectionTitle = data?.header?.title || title;
  const sectionSubtitle = data?.header?.subtitle || subtitle;
  const sectionMainLogo = data?.header?.image || mainLogo;
  const sCompaniesTitle = data?.sister_companies_title || sisterCompaniesTitle;
  const rawSisterCompanies = data?.sister_companies || sisterCompanies || [];
  const pPartnersTitle = data?.partners_title || partnersTitle;
  const rawPartners = data?.partners || partners || [];

  // Normalize data
  const finalSisterCompanies = rawSisterCompanies.map((item) => ({
    name: item.title || item.name,
    src: item.image || item.src,
  }));

  const finalPartners = rawPartners.map((item) => ({
    name: item.title || item.name,
    src: item.image || item.src,
  }));

  return (
    <section
      id="هيكل-المجموعة"
      ref={containerRef}
      className="relative bg-[#111312] text-white min-h-screen w-full flex flex-col justify-center overflow-hidden py-16 lg:py-20"
    >
      {/* Ambient breathing glow */}
      <motion.div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, #FFB800 0%, transparent 55%)' }}
        animate={{ opacity: [0.05, 0.10, 0.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* ── Top bar: title RIGHT, logo slot LEFT ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative">
          {/* Title — from right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-right"
          >
            <SectionTitle title={sectionTitle} theme="dark" />
            {sectionSubtitle && (
              <p className="text-white/80 text-sm md:text-base mt-2 max-w-xl">
                {sectionSubtitle}
              </p>
            )}
          </motion.div>

          {/* Main logo slot (Left side in RTL) */}
          <motion.div
            ref={animatedLogoRef}
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex items-center justify-center cursor-pointer hover:opacity-95 transition-opacity"
          >
            {sectionMainLogo && (
              <img
                src={sectionMainLogo}
                alt="Power Preparation"
                className="w-[280px] sm:w-[380px] md:w-[460px] lg:w-[520px] h-auto max-h-[219px] object-contain drop-shadow-[0_0_25px_rgba(255,184,0,0.15)]"
              />
            )}
          </motion.div>
        </div>

        {/* ── Remaining content (2-column grid) ── */}
        <div className="w-full">
          {/* 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Sister companies */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="text-right space-y-8"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 pb-3 border-b border-white/10 inline-block">
                {sCompaniesTitle}
              </h3>
              <div className="flex flex-wrap items-center justify-start gap-10 sm:gap-14">
                {finalSisterCompanies.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1, filter: 'brightness(1.2)', y: -5, transition: { duration: 0.3 } }}
                    className="cursor-pointer"
                  >
                    <img src={item.src} alt={item.name} className="h-28 sm:h-36 md:h-40 w-auto object-contain drop-shadow-md" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Distributors */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="text-right space-y-8"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 pb-3 border-b border-white/10 inline-block">
                {pPartnersTitle}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                {finalPartners.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.12, filter: 'brightness(1.2)', y: -5, transition: { duration: 0.3 } }}
                    className="cursor-pointer"
                  >
                    <img src={item.src} alt={item.name} className="h-24 sm:h-28 md:h-32 w-auto object-contain drop-shadow-md" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupStructureSection;

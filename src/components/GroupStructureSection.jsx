import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './ui/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

const GroupStructureSection = () => {
  const containerRef = useRef(null);
  const animatedLogoRef = useRef(null);

  const sisterCompanies = [
    {
      name: 'POWER DUCT',
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="280" height="180"><g transform="translate(100, 15) rotate(-10)"><rect x="0" y="0" width="28" height="28" rx="6" fill="%23FFFFFF" /><rect x="36" y="0" width="28" height="28" rx="6" fill="%23DDDDDD" /><rect x="0" y="36" width="28" height="28" rx="6" fill="%23AAAAAA" /><rect x="36" y="36" width="28" height="28" rx="6" fill="%23FFFFFF" /></g><text x="140" y="125" fill="%23FFFFFF" font-size="22" font-weight="900" font-family="sans-serif" text-anchor="middle" letter-spacing="2">POWER DUCT</text><rect x="30" y="140" width="220" height="32" rx="16" fill="%23333333" /><text x="140" y="161" fill="%23EEEEEE" font-size="11" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">DUCTS FACTORY &amp; MANUFACTURE</text></svg>`,
    },
    {
      name: 'KIENZLER',
      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="280" height="180"><path d="M 70 50 Q 140 25 210 50" stroke="%23FFFFFF" stroke-width="4" fill="none" stroke-linecap="round" /><circle cx="215" cy="52" r="3" fill="%23FFFFFF" /><text x="140" y="95" fill="%23FFFFFF" font-size="22" font-weight="800" font-family="sans-serif" text-anchor="middle" letter-spacing="3">KIENZLER</text><text x="140" y="115" fill="%23AAAAAA" font-size="10" font-weight="600" font-family="sans-serif" text-anchor="middle" letter-spacing="2">TEXTILE VENTILATION</text><rect x="45" y="138" width="190" height="32" rx="16" fill="%23333333" /><text x="140" y="159" fill="%23EEEEEE" font-size="11" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">FABRIC DUCT FACTORY</text></svg>`,
    },
  ];

  const distributors = [
    { name: 'KSB',      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170" width="200" height="170"><rect x="70" y="15" width="60" height="50" rx="14" fill="%230091FF" /><path d="M 90 30 L 90 52 M 90 42 Q 110 42 110 52 Q 110 62 90 62" stroke="%23FFFFFF" stroke-width="5" fill="none" stroke-linecap="round" /><text x="100" y="98" fill="%230091FF" font-size="26" font-weight="900" font-family="sans-serif" text-anchor="middle" letter-spacing="2">KSB</text><rect x="15" y="120" width="170" height="30" rx="15" fill="%23333333" /><text x="100" y="139" fill="%23EEEEEE" font-size="10" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">PUMP MANUFACTURE</text></svg>` },
    { name: 'TSSC',     src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170" width="200" height="170"><circle cx="100" cy="45" r="32" stroke="%234CAF50" stroke-width="3" fill="none" /><text x="100" y="52" fill="%234CAF50" font-size="14" font-weight="800" font-family="sans-serif" text-anchor="middle">TSSC</text><rect x="25" y="120" width="150" height="30" rx="15" fill="%23333333" /><text x="100" y="139" fill="%23EEEEEE" font-size="10" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">INSULATION</text></svg>` },
    { name: 'TRANE',    src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 170" width="220" height="170"><circle cx="170" cy="45" r="22" fill="%23FF4500" /><rect x="152" y="42" width="36" height="6" fill="%23111312" /><text x="75" y="53" fill="%23FF4500" font-size="28" font-weight="900" font-style="italic" font-family="sans-serif" text-anchor="middle" letter-spacing="2">TRANE</text><rect x="25" y="120" width="170" height="30" rx="15" fill="%23333333" /><text x="110" y="139" fill="%23EEEEEE" font-size="10" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">HVAC SYSTEMS</text></svg>` },
    { name: 'ICE',      src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 170" width="200" height="170"><text x="70" y="52" fill="%23FFD700" font-size="34" font-weight="900" font-family="sans-serif" text-anchor="middle">i</text><text x="125" y="52" fill="%2300E5FF" font-size="34" font-weight="900" font-family="sans-serif" text-anchor="middle">CE</text><text x="100" y="78" fill="%23FFFFFF" font-size="9" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">WATER MANAGEMENT</text><rect x="20" y="120" width="160" height="30" rx="15" fill="%23333333" /><text x="100" y="139" fill="%23EEEEEE" font-size="10" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">WATER TREATMENT</text></svg>` },
    { name: 'Kingspan', src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 170" width="220" height="170"><path d="M 50 40 Q 60 20 75 35 Q 85 20 95 38 Q 80 50 65 48 Z" fill="%23FFA000" /><text x="110" y="55" fill="%231E88E5" font-size="28" font-weight="900" font-family="sans-serif" text-anchor="middle" letter-spacing="1">Kingspan</text><rect x="25" y="120" width="170" height="30" rx="15" fill="%23333333" /><text x="110" y="139" fill="%23EEEEEE" font-size="10" font-weight="700" font-family="sans-serif" text-anchor="middle" letter-spacing="1">DUCT MANUFACTURE</text></svg>` },
  ];

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
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-right"
          >
            <SectionTitle title="هيكل المجموعة" theme="dark" />
          </motion.div>

          {/* Main logo slot (Left side in RTL) */}
          <motion.div
            ref={animatedLogoRef}
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex items-center justify-center cursor-pointer hover:opacity-95 transition-opacity"
          >
            <img
              src="/logo2.png"
              alt="Power Preparation"
              className="w-[280px] sm:w-[380px] md:w-[460px] lg:w-[520px] h-auto max-h-[219px] object-contain drop-shadow-[0_0_25px_rgba(255,184,0,0.15)]"
            />
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
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="text-right space-y-8"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 pb-3 border-b border-white/10 inline-block">
                شركات شقيقة
              </h3>
              <div className="flex flex-wrap items-center justify-start gap-10 sm:gap-14">
                {sisterCompanies.map((item, idx) => (
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
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="text-right space-y-8"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 pb-3 border-b border-white/10 inline-block">
                اتفاقيات موزعي Power Preparation
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {distributors.map((item, idx) => (
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

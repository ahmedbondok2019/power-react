import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowLeftCircle, ChevronDown } from 'lucide-react';

// ── Animated Counter ─────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, duration = 2 }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => ctrl.stop();
  }, [inView, target, duration]);

  return <span ref={ref}>+{value}</span>;
};

// ── Shared easing ────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1];

const Hero = ({
  id = 'الرئيسية',
  badge,
  title = (<>نبني ما يصنع <br /> مستقبل المملكة</>),
  subtitle,
  buttonText = 'استكشف مشاريعنا',
  buttonLink = '#مشاريعنا',
  bgImage = '/hero-bg.jpg',
  showVisionLogo = true,
  mediaType = 'image',
  scrollTarget = '#من-نحن',
  showStatsCards = false,
  stats = [
    { number: 16, label: 'عاماً من الخبرة' },
    { number: 50, label: 'مشروعاً مكتمل' },
    { number: 10, label: 'مدن رئيسية' },
  ],
}) => {
  return (
    <section
      id={id}
      className="relative min-h-[760px] md:min-h-[820px] lg:h-[108vh] max-h-[1200px] w-full flex flex-col justify-between rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl overflow-hidden"
    >
      {/* ── Background image: cinematic reveal on load ── */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        initial={{ 
          scale: 1.4, 
          opacity: 0,
          filter: "blur(20px) brightness(1.5)",
          clipPath: "inset(20% 20% 20% 20% round 150px)" 
        }}
        animate={{ 
          scale: 1.03, 
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          clipPath: "inset(0% 0% 0% 0% round 0px)" 
        }}
        transition={{ 
          duration: 2.8, 
          ease: [0.19, 1, 0.22, 1] // Ultra smooth easing
        }}
      >
        {/* slow breathe after initial entrance */}
        <motion.div
          className="w-full h-full"
          animate={{ scale: [1.03, 1.08, 1.03] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-black/15 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 z-10 pointer-events-none" />
          {mediaType === 'video' ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={bgImage} />
          ) : (
            <img src={bgImage} alt="Hero Background" className="w-full h-full object-cover" />
          )}
        </motion.div>
      </motion.div>

      {/* ── Overlay flash on load (cinematic) ── */}
      <motion.div
        className="absolute inset-0 z-10 bg-white pointer-events-none"
        initial={{ opacity: 0.18 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-start text-right pt-28 sm:pt-32 my-auto">

        {/* Vision 2030 logo — falls from top */}
        {showVisionLogo && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="mb-3 sm:mb-4 opacity-95"
          >
            <motion.img
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              src="/Vision2030.png"
              alt="Vision 2030"
              className="h-12 md:h-16 object-contain brightness-0 invert drop-shadow-xl"
            />
          </motion.div>
        )}

        {/* Badge — from right */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mb-2 w-full text-right"
            style={{
              fontFamily: "'Tajawal', sans-serif",
              fontWeight: 700,
              fontSize: '32px',
              lineHeight: '78px',
              textAlign: 'right'
            }}
          >
            {badge}
          </motion.div>
        )}

        {/* Main headline — from right, big movement */}
        <motion.h1
          initial={{ opacity: 0, x: 120, skewX: -6 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          className="text-white drop-shadow-2xl mb-4 w-full text-right"
          style={{
            fontFamily: "'HSN Shahd Bold', 'HSN Shahd', sans-serif",
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: '78px',
            textAlign: 'right'
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle — from left (opposite) */}
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.75, ease: EASE }}
            className="text-white mb-4 max-w-3xl w-full text-right"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '15px',
              lineHeight: '38px',
              textAlign: 'right'
            }}
          >
            {subtitle}
          </motion.div>
        )}

        {/* CTA button — rises from bottom */}
        {buttonText && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.95, ease: EASE }}
            className="pt-4 flex w-full justify-start"
            dir="rtl"
          >
            <a
              href={buttonLink}
              className="group relative inline-flex items-center gap-4 text-white transition-all duration-300 hover:-translate-x-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '36px',
                lineHeight: '109px',
                textAlign: 'center'
              }}
            >
              <span>{buttonText}</span>
              {/* Arrow icon is placed after text so in RTL it appears on the left */}
              <ArrowLeftCircle className="w-10 h-10 md:w-12 md:h-12 group-hover:-translate-x-2 transition-transform duration-300 stroke-[1.5]" />
            </a>
          </motion.div>
        )}
      </div>

      {/* ── Stats Cards (other pages) ── */}
      {showStatsCards && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8, ease: EASE }}
          className="relative z-30 max-w-7xl mx-auto px-6 w-full translate-y-1/2 flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
            {stats.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.9 + idx * 0.15, ease: EASE }}
                whileHover={{ scale: 1.05, y: -6, transition: { duration: 0.25 } }}
                style={{ width: '253px', height: '221px' }}
                className="bg-[#2A2B2A]/90 hover:bg-[#343534] backdrop-blur-2xl border border-white/20 rounded-3xl flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer shrink-0"
              >
                <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFB800] mb-2 tracking-tight drop-shadow-md">
                  <AnimatedCounter target={item.number} />
                </span>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wide">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Scroll indicator — from bottom ── */}
      {!showStatsCards && (
        <motion.a
          href={scrollTarget}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.6, duration: 0.8 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
          className="relative z-20 mx-auto mb-6 flex flex-col items-center gap-1.5 text-white/80 hover:text-[#FFB800] transition-colors cursor-pointer group"
        >
          <span className="text-[11px] tracking-widest uppercase font-bold text-white/90 group-hover:text-[#FFB800] transition-colors">
            اسحب للأسفل
          </span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.a>
      )}
    </section>
  );
};

export default Hero;

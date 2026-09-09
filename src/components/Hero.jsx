import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowLeftCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  data,
  id = 'الرئيسية',
  badge = '',
  title = '',
  subtitle = '',
  buttonText = 'استكشف مشاريعنا',
  buttonLink = '/projects',
  bgImage = '',
  visionLogo = '',
  showVisionLogo = true,
  mediaType = 'image',
  scrollTarget = '#من-نحن',
  scrollText = '',
  showStatsCards = false,
  stats = [],
}) => {
  // Resolve values either from data prop (e.g. data={heroData}) or direct props
  const heroBadge = data?.badge ?? badge;
  const heroTitle = data?.title ?? title;
  const heroSubtitle = data?.subtitle ?? subtitle;
  const heroBgImage = data?.image ?? bgImage;
  const heroVisionLogo = data?.vision_logo ?? visionLogo ?? '/Vision2030.png';
  const heroMediaType = data?.media_type ?? mediaType ?? 'image';
  const heroScrollText = data?.scroll_text ?? scrollText ?? 'اسحب للأسفل';

  return (
    <section
      id={id}
      className={`relative min-h-[760px] md:min-h-[820px] lg:h-[108vh] max-h-[1200px] w-full flex flex-col justify-between rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl ${showStatsCards ? 'overflow-visible' : 'overflow-hidden'}`}
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
          {heroMediaType === 'video' ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={heroBgImage} />
          ) : (
            <img src={heroBgImage} alt="Hero Background" className="w-full h-full object-cover" />
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
      <div
        className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-start text-right pt-28 sm:pt-32 my-auto"
        dir="rtl"
      >

        {/* Vision 2030 logo — falls from top */}
        {showVisionLogo && heroVisionLogo && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="mb-8 sm:mb-10 opacity-100 flex justify-start w-full"
          >
            <motion.img
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              src={heroVisionLogo}
              alt="Vision 2030"
              className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto object-contain brightness-0 invert drop-shadow-xl origin-right"
            />
          </motion.div>
        )}

        {/* Badge — from right */}
        {heroBadge && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mb-4 inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg"
          >
            <span className="text-white text-sm md:text-base font-bold tracking-wide" style={{ fontFamily: "'Tajawal', sans-serif" }}>
              {heroBadge}
            </span>
          </motion.div>
        )}

        {/* Main headline — from right, big movement */}
        <motion.h1
          initial={{ opacity: 0, x: 120, skewX: -6 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          className="text-white drop-shadow-2xl mb-6 max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-extrabold leading-[1.2] lg:leading-[1.1]"
          style={{
            fontFamily: "'HSN Shahd Bold', 'HSN Shahd', sans-serif",
            textAlign: 'right'
          }}
        >
          {heroTitle}
        </motion.h1>

        {/* Subtitle — from left (opposite) */}
        {heroSubtitle && (
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.75, ease: EASE }}
            className="text-white/90 mb-10 max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-medium"
            style={{
              fontFamily: "'Inter', 'Tajawal', sans-serif",
              textAlign: 'right'
            }}
          >
            {heroSubtitle}
          </motion.div>
        )}
        {buttonText && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.95, ease: EASE }}
            className="flex w-full justify-start"
            dir="rtl"
          >
            {buttonLink.startsWith('/') ? (
              <Link
                to={buttonLink}
                className="inline-flex items-center justify-center gap-3 bg-[#EAB308] hover:bg-[#D4E128] text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(234,179,8,0.3)] group"
                style={{ fontFamily: "'Inter', 'Tajawal', sans-serif" }}
              >
                <span>{buttonText}</span>
                <ArrowLeftCircle className="w-6 h-6 group-hover:-translate-x-1.5 transition-transform duration-300 text-black/80" />
              </Link>
            ) : (
              <a
                href={buttonLink}
                className="inline-flex items-center justify-center gap-3 bg-[#EAB308] hover:bg-[#D4E128] text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(234,179,8,0.3)] group"
                style={{ fontFamily: "'Inter', 'Tajawal', sans-serif" }}
              >
                <span>{buttonText}</span>
                <ArrowLeftCircle className="w-6 h-6 group-hover:-translate-x-1.5 transition-transform duration-300 text-black/80" />
              </a>
            )}
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
            {heroScrollText}
          </span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.a>
      )}
    </section>
  );
};

export default Hero;

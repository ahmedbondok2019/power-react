import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './ui/SectionTitle';
import { useSettingsData } from '../hooks/useSettingsData';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const stageRef = useRef(null);
  const slotRef = useRef(null);
  const animatedLogoRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const raysRef = useRef(null);

  const { data: settingsData } = useSettingsData();

  // Resolve values either from data prop or direct props
  const sectionTitle = data?.header?.title || title || 'هيكل المجموعة';
  const sectionSubtitle = data?.header?.subtitle || subtitle || 'تكامل في الخدمات عبر شركاتنا الشقيقة وشراكاتنا الاستراتيجية والتحالفات المعتمدة';
  const sectionMainLogo = data?.header?.image || mainLogo || settingsData?.data?.logo || '/logo.png';
  const sCompaniesTitle = data?.sister_companies_title || sisterCompaniesTitle || 'شركات شقيقة';
  const rawSisterCompanies = data?.sister_companies || sisterCompanies || [];
  const pPartnersTitle = data?.partners_title || partnersTitle || 'اتفاقيات موزعي Power Preparation';
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

  useGSAP(() => {
    if (!containerRef.current || !stageRef.current) return;

    const mm = gsap.matchMedia();

    // DESKTOP: Full cinematic scroll-scrub sequence
    mm.add('(min-width: 1024px)', () => {
      if (!animatedLogoRef.current || !slotRef.current) return;

      // Function to calculate exact relative offset from stage center to slot center
      const getTargetOffset = () => {
        if (!stageRef.current || !slotRef.current) return { x: 0, y: 0 };
        const stageRect = stageRef.current.getBoundingClientRect();
        const slotRect = slotRef.current.getBoundingClientRect();

        const slotCenterX = (slotRect.left - stageRect.left) + slotRect.width / 2;
        const slotCenterY = (slotRect.top - stageRect.top) + slotRect.height / 2;

        const stageCenterX = stageRect.width / 2;
        const stageCenterY = stageRect.height / 2;

        return {
          x: slotCenterX - stageCenterX,
          y: slotCenterY - stageCenterY,
        };
      };

      // Set initial centered and hidden states
      gsap.set(animatedLogoRef.current, {
        x: 0,
        y: 0,
        scale: 1.55,
        opacity: 1,
      });

      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, x: 70 });
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 0, y: 60 });
      if (raysRef.current) gsap.set(raysRef.current, { opacity: 0.12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // 0. Hold centered logo briefly on entry (0.00 -> 0.10)
      tl.to({}, { duration: 0.10 });

      // 1. Logo travels smoothly from screen center to header slot (0.10 -> 0.48)
      tl.to(
        animatedLogoRef.current,
        {
          x: () => getTargetOffset().x,
          y: () => getTargetOffset().y,
          scale: 1,
          ease: 'power2.inOut',
          duration: 0.38,
        },
        0.10
      );

      // Rays gently fade as logo moves (0.10 -> 0.35)
      if (raysRef.current) {
        tl.to(
          raysRef.current,
          {
            opacity: 0.03,
            ease: 'power1.out',
            duration: 0.25,
          },
          0.10
        );
      }

      // 2. Title reveals from right as logo arrives (0.46 -> 0.68)
      if (titleRef.current) {
        tl.to(
          titleRef.current,
          {
            opacity: 1,
            x: 0,
            ease: 'power2.out',
            duration: 0.22,
          },
          0.46
        );
      }

      // 3. Details (sister companies & partners) reveal (0.64 -> 0.92)
      if (contentRef.current) {
        tl.to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.28,
          },
          0.64
        );
      }

      // 4. Resting buffer at the bottom before unpinning (0.92 -> 1.00)
      tl.to({}, { duration: 0.08 });
    });

    // MOBILE / TABLET: Natural flow without sticky lock
    mm.add('(max-width: 1023px)', () => {
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, x: 0 });
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, y: 0 });
      if (raysRef.current) gsap.set(raysRef.current, { opacity: 0.04 });
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [sectionMainLogo, finalSisterCompanies.length, finalPartners.length] });

  return (
    <section
      id="هيكل-المجموعة"
      ref={containerRef}
      className="relative bg-[#111312] text-white w-full select-none lg:h-[300vh]"
    >
      {/* Sticky Fullscreen Inner Container for Desktop / Regular flow on Mobile */}
      <div
        ref={stageRef}
        className="relative lg:sticky top-0 min-h-screen lg:h-screen w-full flex flex-col justify-center overflow-hidden py-12 sm:py-16"
      >
        {/* Ambient breathing glow */}
        <motion.div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 50%, #FFB800 0%, transparent 55%)' }}
          animate={{ opacity: [0.05, 0.10, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Radiating architectural rays behind center */}
        <div
          ref={raysRef}
          className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0"
          style={{ opacity: 0.12 }}
        >
          <svg
            className="w-[120vmax] h-[120vmax] text-[#FFB800]"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="rays-grad" cx="500" cy="500" r="450" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                <stop offset="40%" stopColor="currentColor" stopOpacity="0.25" />
                <stop offset="80%" stopColor="#ffffff" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const x2 = 500 + 500 * Math.cos(rad);
              const y2 = 500 + 500 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1="500"
                  y1="500"
                  x2={x2}
                  y2={y2}
                  stroke="url(#rays-grad)"
                  strokeWidth="1.2"
                  strokeDasharray={i % 2 === 0 ? "none" : "6 6"}
                />
              );
            })}
            <circle cx="500" cy="500" r="160" stroke="url(#rays-grad)" strokeWidth="0.8" strokeDasharray="4 4" />
            <circle cx="500" cy="500" r="280" stroke="url(#rays-grad)" strokeWidth="0.8" strokeDasharray="8 8" />
          </svg>
        </div>

        {/* ── DESKTOP ANIMATED LOGO: Starts at absolute screen center, flies to slotRef ── */}
        <div
          ref={animatedLogoRef}
          className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-center will-change-transform"
        >
          {sectionMainLogo && (
            <img
              src={sectionMainLogo}
              alt="Power Preparation"
              className="w-[280px] sm:w-[360px] md:w-[420px] lg:w-[480px] h-auto max-h-[140px] md:max-h-[170px] object-contain drop-shadow-[0_0_35px_rgba(255,184,0,0.22)]"
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          {/* ── Top bar: title RIGHT, logo slot LEFT ── */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 sm:mb-14 gap-8 relative">
            {/* Title — from right (hidden initially on desktop) */}
            <div ref={titleRef} className="text-right will-change-transform">
              <SectionTitle title={sectionTitle} theme="dark" />
              {sectionSubtitle && (
                <p className="text-white/80 text-sm md:text-base mt-2 max-w-xl">
                  {sectionSubtitle}
                </p>
              )}
            </div>

            {/* Main logo target slot (Left side in RTL) */}
            <div
              ref={slotRef}
              className="flex items-center justify-center w-[280px] sm:w-[360px] md:w-[420px] lg:w-[480px] h-[90px] sm:h-[110px] md:h-[130px]"
            >
              {/* Visible ONLY on mobile where floating logo is hidden */}
              {sectionMainLogo && (
                <img
                  src={sectionMainLogo}
                  alt="Power Preparation"
                  className="lg:hidden w-full h-auto max-h-[110px] object-contain drop-shadow-[0_0_25px_rgba(255,184,0,0.18)]"
                />
              )}
            </div>
          </div>

          {/* ── Remaining content (2-column grid - hidden initially on desktop) ── */}
          <div ref={contentRef} className="w-full will-change-transform">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
              {/* Sister companies */}
              <div className="text-right space-y-6 sm:space-y-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 pb-3 border-b border-white/10 inline-block">
                  {sCompaniesTitle}
                </h3>
                <div className="flex flex-wrap items-center justify-start gap-8 sm:gap-12">
                  {finalSisterCompanies.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.1, filter: 'brightness(1.2)', y: -5, transition: { duration: 0.3 } }}
                      className="cursor-pointer"
                    >
                      <img src={item.src} alt={item.name} className="h-20 sm:h-28 md:h-32 w-auto object-contain drop-shadow-md" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Distributors */}
              <div className="text-right space-y-6 sm:space-y-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 pb-3 border-b border-white/10 inline-block">
                  {pPartnersTitle}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                  {finalPartners.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.12, filter: 'brightness(1.2)', y: -5, transition: { duration: 0.3 } }}
                      className="cursor-pointer"
                    >
                      <img src={item.src} alt={item.name} className="h-16 sm:h-22 md:h-26 w-auto object-contain drop-shadow-md" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupStructureSection;

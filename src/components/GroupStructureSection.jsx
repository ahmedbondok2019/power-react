import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './ui/SectionTitle';
import { useSettingsData } from '../hooks/useSettingsData';
import { Building2, Handshake, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Resilient Logo Badge with fallback for broken or missing images
const CompanyLogoItem = ({ item, isSister = false }) => {
  const [imageError, setImageError] = useState(false);
  const name = item?.name || 'شريك معتمد';

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.25 } }}
      className={`relative group flex items-center justify-center rounded-2xl p-4 transition-all duration-300 w-full`}
    >
      {!imageError && item?.src ? (
        <img
          src={item.src}
          alt={name}
          onError={() => setImageError(true)}
          className={`w-full h-auto object-contain transition-all duration-300 filter group-hover:brightness-110 drop-shadow-md`}
        />
      ) : (
        <div className="flex items-center gap-2 text-center px-2">
          {isSister ? (
            <Building2 className="w-5 h-5 text-[#FFB800] flex-shrink-0" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-white/50 flex-shrink-0 group-hover:text-[#FFB800] transition-colors" />
          )}
          <span className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white transition-colors tracking-wide line-clamp-2">
            {name}
          </span>
        </div>
      )}
    </motion.div>
  );
};

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

      // Calculate offset from stage center to slot center
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

      // Initial states — all hidden
      gsap.set(animatedLogoRef.current, { x: 0, y: 0, scale: 1.35, opacity: 0 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, x: 50 });
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 0, y: 40 });
      if (raysRef.current) gsap.set(raysRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',        // starts when section top hits viewport top (pinned)
          end: 'bottom bottom',    // ends when section bottom hits viewport bottom
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Step 0: Fade in logo + rays as soon as the section is pinned (0 → 0.08)
      tl.to(animatedLogoRef.current, { opacity: 1, scale: 1.35, duration: 0.08, ease: 'none' }, 0);
      if (raysRef.current) {
        tl.to(raysRef.current, { opacity: 0.12, duration: 0.08, ease: 'none' }, 0);
      }

      // Step 1: Hold logo at center while user is "on" the section (0.08 → 0.30)
      tl.to({}, { duration: 0.22 }, 0.08);

      // Step 2: Logo flies from center to slot (0.30 → 0.62)
      tl.to(
        animatedLogoRef.current,
        {
          x: () => getTargetOffset().x,
          y: () => getTargetOffset().y,
          scale: 1,
          ease: 'power2.inOut',
          duration: 0.32,
        },
        0.30
      );

      // Rays fade out as logo moves (0.30 → 0.55)
      if (raysRef.current) {
        tl.to(raysRef.current, { opacity: 0.03, ease: 'power1.out', duration: 0.25 }, 0.30);
      }

      // Step 3: Title reveals (0.55 → 0.78)
      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, x: 0, ease: 'power2.out', duration: 0.23 }, 0.55);
      }

      // Step 4: Content reveals (0.68 → 0.90)
      if (contentRef.current) {
        tl.to(contentRef.current, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.22 }, 0.68);
      }

      // Step 5: Rest before un-pinning (0.90 → 1.00)
      tl.to({}, { duration: 0.10 }, 0.90);
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
      // clip-path clips overflow WITHOUT breaking position:sticky (unlike overflow:hidden)
      style={{ clipPath: 'inset(0)' }}
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
          style={{ opacity: 0 }}
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

        {/* ── DESKTOP ANIMATED LOGO: starts centered, flies to slot via scrub ── */}
        <div
          ref={animatedLogoRef}
          style={{ opacity: 0 }}
          className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-center will-change-transform"
        >
          {sectionMainLogo && (
            <img
              src={sectionMainLogo}
              alt="Power Preparation"
              className="w-[320px] sm:w-[400px] md:w-[460px] lg:w-[520px] h-auto max-h-[120px] sm:max-h-[140px] object-contain drop-shadow-[0_0_40px_rgba(255,184,0,0.28)]"
            />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

          {/* ── Top bar: Title (Right in RTL), Logo Slot (Left in RTL) ── */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 sm:mb-32 lg:mb-44 gap-8 relative">

            {/* Title — from right */}
            <div ref={titleRef} className="text-right will-change-transform max-w-2xl">
              <SectionTitle title={sectionTitle} theme="dark" />
              {sectionSubtitle && (
                <p className="text-white/70 text-sm md:text-base mt-2.5 leading-relaxed">
                  {sectionSubtitle}
                </p>
              )}
            </div>

            {/* Main logo target slot (invisible on desktop — logo flies here via GSAP) */}
            <div
              ref={slotRef}
              className="flex items-center justify-center w-[240px] sm:w-[290px] md:w-[330px] lg:w-[360px] h-[85px] sm:h-[95px] flex-shrink-0"
            >
              {/* Visible ONLY on mobile where floating logo is hidden */}
              {sectionMainLogo && (
                <img
                  src={sectionMainLogo}
                  alt="Power Preparation"
                  className="lg:hidden w-full h-auto max-h-[85px] object-contain drop-shadow-[0_0_20px_rgba(255,184,0,0.18)]"
                />
              )}
            </div>

          </div>

          {/* ── Lower Grid Content: Sister Companies & Partners ── */}
          <div ref={contentRef} className="w-full will-change-transform">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

              {/* Sister Companies Card (Right 5 Cols in RTL) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="text-right space-y-5">
                  <div className="flex items-center justify-between pb-3.5">
                    <span className="text-xs font-semibold text-[#FFB800] bg-[#FFB800]/10 px-3 py-1 rounded-full">
                      الشركات التابعة
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <Building2 className="w-5 h-5 text-[#FFB800]" />
                      <span>{sCompaniesTitle}</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {finalSisterCompanies.length > 0 ? (
                      finalSisterCompanies.map((item, idx) => (
                        <CompanyLogoItem key={idx} item={item} isSister={true} />
                      ))
                    ) : (
                      <div className="col-span-full py-8 text-center text-xs text-white/40">
                        لا توجد بيانات متاحة حالياً
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Partners / Distributors Card (Left 7 Cols in RTL) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="text-right space-y-5">
                  <div className="flex items-center justify-between pb-3.5">
                    <span className="text-xs font-semibold text-white/60 bg-white/5 px-3 py-1 rounded-full">
                      وكالات وتوزيع معتمد
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <Handshake className="w-5 h-5 text-[#FFB800]" />
                      <span>{pPartnersTitle}</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                    {finalPartners.length > 0 ? (
                      finalPartners.map((item, idx) => (
                        <CompanyLogoItem key={idx} item={item} isSister={false} />
                      ))
                    ) : (
                      <div className="col-span-full py-8 text-center text-xs text-white/40">
                        لا توجد بيانات متاحة حالياً
                      </div>
                    )}
                  </div>
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

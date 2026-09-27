import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const SlideNavigator = () => {
  const { t, isRTL } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const slides = useMemo(() => [
    {
      id: 'hero',
      aliases: ['hero', 'الرئيسية', 'home', 'main-hero'],
      label: t?.slideNavigator?.home || (isRTL ? 'الرئيسية' : 'Home'),
    },
    {
      id: 'من-نحن',
      aliases: ['من-نحن', 'about', 'about-us'],
      label: t?.slideNavigator?.about || (isRTL ? 'من نحن' : 'About Us'),
    },
    {
      id: 'خدماتنا',
      aliases: ['خدماتنا', 'services', 'our-services'],
      label: t?.slideNavigator?.services || (isRTL ? 'خدماتنا' : 'Services'),
    },
    {
      id: 'هيكل-المجموعة',
      aliases: ['هيكل-المجموعة', 'group-structure', 'structure'],
      label: t?.slideNavigator?.groupStructure || (isRTL ? 'هيكل المجموعة' : 'Group Structure'),
    },
    {
      id: 'مشاريعنا',
      aliases: ['مشاريعنا', 'projects', 'featured-projects'],
      label: t?.slideNavigator?.projects || (isRTL ? 'مشاريعنا' : 'Projects'),
    },
  ], [t, isRTL]);

  const findSectionElement = (slide) => {
    if (slide.aliases) {
      for (const alias of slide.aliases) {
        const el = document.getElementById(alias);
        if (el) return el;
      }
    }
    return document.getElementById(slide.id);
  };

  useEffect(() => {
    const handleScroll = () => {
      // If at or near the top of the page, always activate the first slide (Hero / Home)
      if (window.scrollY < 120) {
        setActiveSlide(0);
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      const sectionElements = slides.map(s => findSectionElement(s));

      // Check sections in order
      let matchedIndex = 0;
      sectionElements.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = window.scrollY + rect.top;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            matchedIndex = index;
          }
        }
      });

      setActiveSlide(matchedIndex);
    };

    handleScroll(); // initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slides]);

  const scrollToSlide = (slide, index) => {
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = findSectionElement(slide);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Presentation Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#FFB800] z-50 origin-right pointer-events-none"
        style={{ scaleX }}
      />

      {/* Floating Presentation Slide Deck Indicator (Side Navigation) */}
      <div className={`fixed ${isRTL ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-5 pointer-events-auto`}>
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;
          return (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(slide, index)}
              className="group relative flex items-center gap-3 cursor-pointer focus:outline-none"
              aria-label={slide.label}
            >
              {/* Tooltip / Label */}
              <span className={`absolute ${isRTL ? 'right-7' : 'left-7'} px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 pointer-events-none shadow-lg ${
                isActive 
                  ? 'opacity-100 translate-x-0 text-[#FFB800]' 
                  : `opacity-0 ${isRTL ? 'translate-x-2' : '-translate-x-2'} group-hover:opacity-100 group-hover:translate-x-0 text-white`
              }`}>
                {slide.label}
              </span>

              {/* Dot / Slide Indicator */}
              <motion.div 
                animate={{
                  scale: isActive ? 1.35 : 1,
                  backgroundColor: isActive ? '#FFB800' : 'rgba(255, 255, 255, 0.25)',
                  boxShadow: isActive ? '0 0 16px rgba(255, 184, 0, 0.6)' : 'none'
                }}
                transition={{ duration: 0.3 }}
                className="w-2.5 h-2.5 rounded-full border border-white/20 group-hover:bg-[#FFB800] transition-colors"
              />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default SlideNavigator;

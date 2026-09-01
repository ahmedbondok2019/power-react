import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const slides = [
  { id: 'الرئيسية', label: 'الرئيسية' },
  { id: 'من-نحن', label: 'من نحن' },
  { id: 'خدماتنا', label: 'خدماتنا' },
  { id: 'هيكل-المجموعة', label: 'هيكل المجموعة' },
  { id: 'مشاريعنا', label: 'مشاريعنا' },
];

const SlideNavigator = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sectionElements = slides.map(s => document.getElementById(s.id) || document.getElementById(s.label));

      sectionElements.forEach((el, index) => {
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSlide(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (id, label) => {
    const el = document.getElementById(id) || document.getElementById(label);
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

      {/* Floating Presentation Slide Deck Indicator (Right-side / Side Navigation) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-5 pointer-events-auto">
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;
          return (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(slide.id, slide.label)}
              className="group relative flex items-center gap-3 cursor-pointer focus:outline-none"
              aria-label={slide.label}
            >
              {/* Tooltip / Label */}
              <span className={`absolute left-7 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 pointer-events-none ${
                isActive ? 'opacity-100 translate-x-0 text-[#FFB800]' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-white'
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

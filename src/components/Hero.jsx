import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowLeftCircle, ChevronDown } from 'lucide-react';

// Animated Counter component
const AnimatedCounter = ({ target, duration = 1.8 }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, target, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => setValue(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [inView, target, duration]);

  return <span ref={ref}>+{value}</span>;
};

const Hero = ({
  id = "الرئيسية",
  badge,
  title = (
    <>
      نبني ما يصنع <br />
      مستقبل المملكة
    </>
  ),
  subtitle,
  buttonText = "استكشف مشاريعنا",
  buttonLink = "#مشاريعنا",
  bgImage = "/hero-bg.jpg",
  showVisionLogo = true,
  mediaType = 'image',
  scrollTarget = "#من-نحن",
  showStatsCards = false,
  stats = [
    { number: 16, label: "عاماً من الخبرة" },
    { number: 50, label: "مشروعاً مكتمل" },
    { number: 10, label: "مدن رئيسية" }
  ]
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id={id} className="relative min-h-[760px] md:min-h-[820px] lg:h-[108vh] max-h-[1200px] w-full flex flex-col justify-between rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl">

      {/* Background Image / Video with Cinematic Zoom and contained overflow */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <motion.div
            animate={{ scale: [1.02, 1.07, 1.02] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {/* Soft Lighter Gradients allowing the bright image and engineers to shine through */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/30 to-black/15 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10"></div>

            {mediaType === 'video' ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src={bgImage}
              />
            ) : (
              <img
                src={bgImage}
                alt="Hero Background"
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Top & Middle Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-start text-right pt-28 sm:pt-32 my-auto">

        {/* Vision 2030 Logo if enabled */}
        {showVisionLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 sm:mb-4 opacity-95"
          >
            <motion.img
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="/Vision2030.png"
              alt="Vision 2030"
              className="h-12 md:h-16 object-contain brightness-0 invert drop-shadow-xl"
            />
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3 sm:space-y-4 max-w-3xl perspective-[1000px]"
        >
          {/* Optional Badge / Tag (e.g. من نحن) */}
          {badge && (
            <motion.div variants={lineVariants} className="text-lg sm:text-xl font-bold text-[#EAB308]">
              {badge}
            </motion.div>
          )}

          {/* Main Hero Heading */}
          <motion.h1
            variants={lineVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] drop-shadow-2xl font-sans"
          >
            {title}
          </motion.h1>

          {/* Subtitle / Paragraph */}
          {subtitle && (
            <motion.div
              variants={lineVariants}
              className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl text-right font-medium"
            >
              {subtitle}
            </motion.div>
          )}

          {/* CTA Button */}
          {buttonText && (
            <motion.div variants={buttonVariants} className="pt-2 flex justify-start">
              <a
                href={buttonLink}
                className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#FFB800] backdrop-blur-md border border-white/20 hover:border-[#FFB800] text-white hover:text-[#1E201E] font-bold text-base md:text-lg transition-all duration-400 shadow-xl hover:shadow-[0_0_30px_rgba(255,184,0,0.5)] hover:-translate-x-1"
              >
                <ArrowLeftCircle className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-x-1.5 transition-transform duration-300 stroke-[2]" />
                <span>{buttonText}</span>
              </a>
            </motion.div>
          )}
        </motion.div>

      </div>

      {/* Bottom Floating Stats Cards Section (Positioned half-in half-out on the hero edge) */}
      {showStatsCards && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.5 }
            }
          }}
          className="relative z-30 max-w-7xl mx-auto px-6 w-full translate-y-1/2 flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
            {stats.map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -6 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '253px',
                  height: '221px',
                  paddingTop: '26px',
                  paddingBottom: '26px',
                  paddingRight: '13px',
                  paddingLeft: '13px',
                  opacity: 1,
                  transform: 'rotate(0deg)'
                }}
                className="bg-[#2A2B2A]/90 hover:bg-[#343534] backdrop-blur-2xl border border-white/20 rounded-3xl flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group cursor-pointer shrink-0"
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

      {/* Presentation Scroll Down Indicator */}
      {!showStatsCards && (
        <motion.a
          href={scrollTarget}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.4, duration: 0.8 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          className="relative z-20 mx-auto mb-6 flex flex-col items-center gap-1.5 text-white/80 hover:text-[#FFB800] transition-colors cursor-pointer group"
          aria-label="Scroll Down"
        >
          <span className="text-[11px] tracking-widest uppercase font-bold text-white/90 group-hover:text-[#FFB800] transition-colors">اسحب للأسفل</span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.a>
      )}
    </section>
  );
};

export default Hero;

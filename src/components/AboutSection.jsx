import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from './ui/SectionTitle';

// Animated Counter component that counts up when visible
const AnimatedCounter = ({ target, duration = 1.8 }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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

const AboutSection = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="من-نحن" className="relative bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        
        {/* Right Side in RTL: Text Content (1st in DOM) */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-right space-y-6"
        >
          <SectionTitle title="من نحن" theme="light" />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="typography-paragraph-main text-[#374151] max-w-xl"
          >
            شركة مقاولات سعودية رائدة متخصصة في تقديم حلول هندسية متكاملة عالية الجودة، من المقاولات العامة إلى أعمال الكهروميكانيكا (MEP)، بخبرة تمتد منذ عام 2008.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-2"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111312] text-white hover:bg-[#FFB800] hover:text-black font-bold text-sm transition-all duration-300 shadow-md group"
            >
              <span>المزيد عن شركتنا ورؤيتنا</span>
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Left Side in RTL: Stats Cards (2nd in DOM) with Staggered Entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex justify-center lg:justify-end items-center gap-4 sm:gap-6"
        >
          {/* Stacked Cards (+16 and +10) */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Card +16 */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-[#EDEDED] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-w-[150px] sm:min-w-[200px] lg:min-w-[240px] text-center shadow-sm cursor-pointer transition-colors hover:bg-[#E5E7EB]"
            >
              <span className="stat-number text-[#FFB800] mb-1">
                <AnimatedCounter target={16} />
              </span>
              <span className="stat-label text-[#1F2937]">عاماً من الخبرة</span>
            </motion.div>

            {/* Card +10 */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-[#EDEDED] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-w-[150px] sm:min-w-[200px] lg:min-w-[240px] text-center shadow-sm cursor-pointer transition-colors hover:bg-[#E5E7EB]"
            >
              <span className="stat-number text-[#FFB800] mb-1">
                <AnimatedCounter target={10} />
              </span>
              <span className="stat-label text-[#1F2937]">مدن رئيسية</span>
            </motion.div>
          </div>

          {/* Single Card (+50) */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-[#EDEDED] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-w-[150px] sm:min-w-[200px] lg:min-w-[240px] text-center shadow-sm cursor-pointer transition-colors hover:bg-[#E5E7EB]"
          >
            <span className="stat-number text-[#FFB800] mb-1">
              <AnimatedCounter target={50} />
            </span>
            <span className="stat-label text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">مشروعاً مكتمل</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from './ui/SectionTitle';

const EASE = [0.22, 1, 0.36, 1];

const Counter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return () => ctrl.stop();
  }, [inView, target, duration]);
  return <span ref={ref}>+{count}</span>;
};

const AboutSection = () => (
  <section id="من-نحن" className="relative bg-white py-20 lg:py-28 overflow-hidden">

    {/* subtle background grid */}
    <div
      className="absolute inset-0 opacity-[0.025] pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(#111 1px,transparent 1px),linear-gradient(90deg,#111 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />

    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

      {/* ── RIGHT column (RTL = left on screen): slides in from RIGHT ── */}
      <motion.div
        className="text-right space-y-6"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 1.0, ease: EASE }}
      >
        <SectionTitle title="من نحن" theme="light" />

        <motion.p
          className="typography-paragraph-main text-[#374151] max-w-xl"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          شركة مقاولات سعودية رائدة متخصصة في تقديم حلول هندسية متكاملة
          عالية الجودة، من المقاولات العامة إلى أعمال الكهروميكانيكا (MEP)،
          بخبرة تمتد منذ عام 2008.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.28, ease: EASE }}
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

      {/* ── LEFT column (RTL = right on screen): slides in from LEFT ── */}
      <motion.div
        className="flex justify-center lg:justify-end items-center gap-4 sm:gap-6"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 1.0, ease: EASE }}
      >
        {/* Stacked smaller cards — rise from bottom inside the column */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {[
            { target: 16, label: 'عاماً من الخبرة', delay: 0.1 },
            { target: 10, label: 'مدن رئيسية',      delay: 0.25 },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.9, delay: stat.delay, ease: EASE }}
              whileHover={{ scale: 1.06, y: -6, transition: { duration: 0.25 } }}
              className="bg-[#EDEDED] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-w-[150px] sm:min-w-[200px] lg:min-w-[240px] text-center shadow-sm cursor-pointer hover:bg-[#E5E7EB] transition-colors"
            >
              <span className="stat-number text-[#FFB800] mb-1"><Counter target={stat.target} /></span>
              <span className="stat-label text-[#1F2937]">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Big card — rises from bottom, larger delay */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.82 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 1.1, delay: 0.38, ease: EASE }}
          whileHover={{ scale: 1.06, y: -8, transition: { duration: 0.25 } }}
          className="bg-[#111312] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-w-[150px] sm:min-w-[200px] lg:min-w-[240px] text-center shadow-lg cursor-pointer"
        >
          <span className="stat-number text-[#FFB800] mb-1"><Counter target={50} /></span>
          <span className="stat-label text-white">مشروعاً مكتمل</span>
        </motion.div>
      </motion.div>

    </div>
  </section>
);

export default AboutSection;

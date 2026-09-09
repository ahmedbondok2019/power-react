import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from './ui/SectionTitle';

const EASE = [0.22, 1, 0.36, 1];

const Counter = ({ target = 0, duration = 2 }) => {
  const numericTarget = typeof target === 'number' ? target : parseInt(String(target).replace(/[^\d]/g, ''), 10) || 0;
  const [count, setCount] = useState(numericTarget);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!numericTarget) {
      setCount(0);
      return;
    }
    if (!inView) {
      setCount(numericTarget); // Display target directly until animation triggers
      return;
    }
    const ctrl = animate(0, numericTarget, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return () => ctrl.stop();
  }, [inView, numericTarget, duration]);

  return <span ref={ref}>{count}+</span>;
};

const AboutSection = ({
  data,
  title = '',
  subtitle,
  description = '',
  statistics = [],
}) => {
  // Support either data prop (data={aboutData}) or individual props
  const sectionTitle = data?.title || title;
  const sectionSubtitle = data?.subtitle || subtitle;
  const sectionDesc = data?.description || description;
  const allStats = data?.statistics || statistics || [];

  const smallStats = allStats.slice(0, 2);
  const bigStat = allStats[2] || allStats.find(s => s.target >= 50 || s.key === 'stat_projects');

  return (
    <section id="من-نحن" className="relative bg-white py-20 lg:py-28 overflow-hidden">

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#111 1px,transparent 1px),linear-gradient(90deg,#111 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <motion.div
          className="text-right space-y-6"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          <SectionTitle title={sectionTitle} theme="light" />

          {sectionSubtitle && (
            <h4 className="text-xl font-bold text-[#111312]">
              {sectionSubtitle}
            </h4>
          )}

          <motion.p
            className="typography-paragraph-main text-[#374151] max-w-xl"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            {sectionDesc}
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
          <div className="flex flex-col gap-4 sm:gap-6">
            {smallStats.map((stat, i) => (
              <motion.div
                key={stat.id || i}
                initial={{ opacity: 0, y: 60, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.15, ease: EASE }}
                whileHover={{ scale: 1.06, y: -6, transition: { duration: 0.25 } }}
                className="bg-[#EDEDED] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-w-[150px] sm:min-w-[200px] lg:min-w-[240px] text-center shadow-sm cursor-pointer hover:bg-[#E5E7EB] transition-colors"
              >
                <span className="stat-number text-[#FFB800] mb-1">
                  <Counter target={stat.target || parseInt(stat.title, 10) || 0} />
                </span>
                <span className="stat-label text-[#1F2937]">{stat.label || stat.subtitle}</span>
              </motion.div>
            ))}
          </div>

          {/* Big card — rises from bottom, larger delay */}
          {bigStat && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.82 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 1.1, delay: 0.38, ease: EASE }}
              whileHover={{ scale: 1.06, y: -8, transition: { duration: 0.25 } }}
              className="bg-[#111312] rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-w-[150px] sm:min-w-[200px] lg:min-w-[240px] text-center shadow-lg cursor-pointer"
            >
              <span className="stat-number text-[#FFB800] mb-1">
                <Counter target={bigStat.target ?? parseInt(String(bigStat.title || '').replace(/[^\d]/g, ''), 10) ?? 50} />
              </span>
              <span className="stat-label text-white">{bigStat.label || bigStat.subtitle}</span>
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;

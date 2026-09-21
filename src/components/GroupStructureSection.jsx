import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './ui/SectionTitle';
import { useSettingsData } from '../hooks/useSettingsData';
import { useLanguage } from '../contexts/LanguageContext';
import { Building2, ShieldCheck } from 'lucide-react';

// ── Company Logo Card with 100% <img> Rendering Directly from API ──
const CompanyCard = ({ item, isSister = false }) => {
  const [imgError, setImgError] = useState(false);
  const name = item?.name || '';

  return (
    <div className="group flex items-center justify-center p-2 sm:p-3 transition-transform duration-200 ease-out hover:scale-105 hover:-translate-y-1 w-full cursor-pointer">
      {/* ── Image Container: Generously sized for bold, crisp visibility ── */}
      <div className="h-28 sm:h-32 lg:h-36 w-full flex items-center justify-center">
        {!imgError && item?.src ? (
          <img
            src={item.src}
            alt={name}
            onError={() => setImgError(true)}
            className="h-full w-auto max-w-full max-h-28 sm:max-h-32 lg:max-h-36 object-contain filter group-hover:brightness-120 drop-shadow-xl transition-all duration-200"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center gap-2 text-center px-2">
            {isSister ? (
              <Building2 className="w-10 h-10 text-[#FFB800] shrink-0" />
            ) : (
              <ShieldCheck className="w-10 h-10 text-white/50 shrink-0 group-hover:text-[#FFB800] transition-colors" />
            )}
            {name && (
              <span className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFB800] transition-colors">
                {name}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
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
  const { data: settingsData } = useSettingsData();
  const { lang } = useLanguage();

  // Resolve values directly from backend API
  const sectionTitle = data?.header?.title || title || (lang === 'en' ? 'Group Structure' : 'هيكل المجموعة');
  const sectionSubtitle =
    data?.header?.subtitle ||
    subtitle ||
    (lang === 'en'
      ? 'Comprehensive services through our sister companies, strategic partnerships, and certified alliances.'
      : 'تكامل في الخدمات عبر شركاتنا الشقيقة وشراكاتنا الاستراتيجية والتحالفات المعتمدة');
  const sectionMainLogo = data?.header?.image || mainLogo || settingsData?.data?.logo || '/logo.png';

  const sCompaniesTitle =
    data?.sister_companies_title ||
    sisterCompaniesTitle ||
    (lang === 'en' ? 'Sister Companies' : 'شركات شقيقة');

  const rawSisterCompanies =
    data?.sister_companies ||
    data?.items ||
    sisterCompanies ||
    [];

  const pPartnersTitle =
    data?.partners_title ||
    partnersTitle ||
    (lang === 'en' ? 'Power Preparation Distributor Agreements' : 'اتفاقيات موزعي Power Preparation');

  const rawPartners =
    data?.partners ||
    data?.distributors ||
    data?.alliances ||
    partners ||
    [];

  // Normalize data purely from API without static mock fallbacks
  const finalSisterCompanies = rawSisterCompanies.map((item, idx) => ({
    id: item.id || idx,
    name: item.title || item.name || '',
    src: item.image || item.src || item.logo || item.photo || item.icon || '',
  }));

  const finalPartners = rawPartners.map((item, idx) => ({
    id: item.id || idx,
    name: item.title || item.name || '',
    src: item.image || item.src || item.logo || item.photo || item.icon || '',
  }));

  return (
    <section
      id="هيكل-المجموعة"
      className="relative bg-[#111312] text-white w-full py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Ambient lightweight glow */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, #FFB800 0%, transparent 60%)' }}
      />

      {/* Radiating architectural rays background */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0"
        style={{ opacity: 0.10 }}
      >
        <svg
          className="w-[110vmax] h-[110vmax] text-[#FFB800]"
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
                strokeDasharray={i % 2 === 0 ? 'none' : '6 6'}
              />
            );
          })}
          <circle cx="500" cy="500" r="160" stroke="url(#rays-grad)" strokeWidth="0.8" strokeDasharray="4 4" />
          <circle cx="500" cy="500" r="280" stroke="url(#rays-grad)" strokeWidth="0.8" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full relative z-10 flex flex-col justify-start gap-8 sm:gap-10 lg:gap-12">

        {/* ── Top Bar: Title & Main Logo (Enters from Left & Right on Scroll) ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 relative w-full">

          {/* Title & Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'en' ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-start flex-1 max-w-2xl"
          >
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white relative z-10 select-none pb-1 flex items-center gap-2">
                <span className="relative inline-block px-1">
                  {sectionTitle}
                  <span className="absolute bottom-0 right-0 left-0 h-3.5 sm:h-4 lg:h-5 bg-[#FFB800] -z-10 rounded-sm" />
                </span>
              </h2>
            </div>
            {sectionSubtitle && (
              <p className="text-white/70 text-sm sm:text-base lg:text-lg mt-2 sm:mt-2.5 leading-relaxed max-w-xl">
                {sectionSubtitle}
              </p>
            )}
          </motion.div>

          {/* Main Logo on the other side */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'en' ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-end w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px] h-[80px] sm:h-[95px] lg:h-[110px] flex-shrink-0"
          >
            {sectionMainLogo && (
              <img
                src={sectionMainLogo}
                alt="Power Preparation"
                className="w-full h-auto max-h-[85px] sm:max-h-[100px] lg:max-h-[115px] object-contain drop-shadow-[0_0_20px_rgba(255,184,0,0.22)]"
              />
            )}
          </motion.div>

        </div>

        {/* ── Lower Gallery: Tightly Clustered Large Logos Entering from Right & Left ── */}
        <div className="w-full">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 w-full">

            {/* ── Section 1: Sister Companies (شركات شقيقة) - Enters from its side ── */}
            {finalSisterCompanies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: lang === 'en' ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-start w-full lg:w-auto"
              >
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 text-start">
                  {sCompaniesTitle}
                </h3>

                {/* 2-Column Gallery for Sister Companies */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px]">
                  {finalSisterCompanies.map((item, idx) => (
                    <CompanyCard key={idx} item={item} isSister={true} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Section 2: Distributor Agreements (اتفاقيات موزعي Power Preparation) - Enters from opposite side ── */}
            {finalPartners.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: lang === 'en' ? 80 : -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-start w-full lg:w-auto"
              >
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 text-start">
                  {pPartnersTitle}
                </h3>

                {/* 3-Column Gallery for Distributor Agreements */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[560px]">
                  {finalPartners.map((item, idx) => (
                    <CompanyCard key={idx} item={item} isSister={false} />
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default GroupStructureSection;

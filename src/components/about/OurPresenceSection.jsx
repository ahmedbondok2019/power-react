import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { useLanguage } from '../../contexts/LanguageContext';

const OurPresenceSection = ({ data }) => {
  const { lang } = useLanguage();

  const title = data?.title || '';
  const subtitle = data?.subtitle || '';
  const description = data?.description || '';

  if (!title && !description) return null;

  return (
    <section className="w-full bg-[#141615] text-white pt-10 pb-6 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-start text-start">

        {/* Header */}
        <div className="flex flex-col items-start w-full mb-12">
          <SectionTitle title={title} theme="dark" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {subtitle && (
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-white tracking-wide">
              {subtitle}
            </h3>
          )}
          {description && (
            <p className="text-white/80 text-lg sm:text-xl lg:text-[22px] font-medium leading-[2.2]">
              {description}
            </p>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default OurPresenceSection;

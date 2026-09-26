import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const StrategiesSection = () => {
  const { t } = useLanguage();
  return (
    <section id="strategies" className="min-h-screen py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient">{t.strategy?.heroTitle?.split('\n')[0] || t.nav?.strategy}</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {t.strategy?.heroSubtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StrategiesSection;

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const FinancialSection = () => {
  const { lang } = useLanguage();
  return (
    <section id="financial-reports" className="min-h-[80vh] py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {lang === 'en' ? 'Financial Reports' : 'التقارير المالية'}
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Transparency in financial performance and the strength of our financial position.'
              : 'شفافية الأداء المالي وقوة المركز المالي لشركتنا.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinancialSection;

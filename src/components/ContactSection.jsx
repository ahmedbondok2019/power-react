import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section id="contact-cta" className="min-h-[80vh] py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact?.heroTitle?.split('\n')[0] || t.nav?.contact}
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {t.contact?.heroSubtitle}
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#EAB308] text-black font-extrabold text-sm shadow-lg hover:scale-105 transition-all"
          >
            {t.contact?.startConversation}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

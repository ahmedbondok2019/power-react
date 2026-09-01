import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section id="اتصل-بنا" className="min-h-[80vh] py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            تواصل <span className="text-gradient">معنا</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتك ومناقشة سبل التعاون.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

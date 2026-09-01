import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ 
  title, 
  children,
  theme = "light", // "light" for white backgrounds (dark text), "dark" for dark backgrounds (white text)
  className = "" 
}) => {
  const isLight = theme === "light";
  const textColor = isLight ? "text-[#1E201E]" : "text-white";
  const content = title || children;

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`typography-heading-main ${textColor} relative z-10 select-none pb-1`}
      >
        <span className="relative inline-block px-1">
          {content}
          {/* Solid Yellow Highlight Bar anchored at the baseline */}
          <motion.span 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-0 right-0 left-0 h-3.5 sm:h-4 md:h-5 bg-[#FFB800] -z-10 rounded-sm origin-right"
          />
        </span>
      </motion.h2>
    </div>
  );
};

export default SectionTitle;

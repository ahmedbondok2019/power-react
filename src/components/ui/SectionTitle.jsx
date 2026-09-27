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
    <div className={`relative inline-block max-w-full ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`typography-heading-main ${textColor} relative z-10 select-none pb-1 leading-snug sm:leading-tight`}
      >
        <span 
          className="inline px-1 py-0.5 rounded-sm"
          style={{
            background: 'linear-gradient(to top, #FFB800 0%, #FFB800 38%, transparent 38%)',
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
          }}
        >
          {content}
        </span>
      </motion.h2>
    </div>
  );
};

export default SectionTitle;

import React from 'react';
import { motion } from 'framer-motion';

const ImageOverlayCard = ({ 
  imageSrc, 
  title, 
  subtitle, 
  textPosition = "left", 
  delay = 0, 
  className = "" 
}) => {
  const isRight = textPosition === "right";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ 
        duration: 0.7, 
        delay, 
        ease: [0.25, 1, 0.5, 1] 
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.35, ease: "easeOut" } 
      }}
      className={`group relative rounded-[18px] overflow-hidden cursor-pointer w-full border border-white/10 bg-[#1E201E] shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] hover:border-[#FFB800]/40 transition-colors duration-500 ${className}`}
    >
      {/* Background Image */}
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:brightness-105"
      />
      
      {/* Multi-layered cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
      <div className={`absolute inset-0 ${isRight ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-black/60 via-transparent to-transparent opacity-70`}></div>
      
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>

      {/* Content */}
      <div className={`absolute bottom-6 sm:bottom-8 lg:bottom-10 left-6 sm:left-8 lg:left-10 right-6 sm:right-8 lg:right-10 z-10 ${isRight ? 'text-right' : 'text-left'}`}>
        {subtitle && (
          <p className="text-white font-bold text-[20px] sm:text-[28px] lg:text-[36px] leading-[30px] sm:leading-[40px] lg:leading-[49px] tracking-normal mb-1 font-sans drop-shadow-md">
            {subtitle}
          </p>
        )}

        <motion.h3 
          className={`text-white font-sans drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1 ${
            isRight 
              ? 'font-bold text-[24px] sm:text-[32px] lg:text-[40px] leading-[34px] sm:leading-[42px] lg:leading-[49px] tracking-normal' 
              : 'font-medium text-[20px] sm:text-[22px] lg:text-[24px] uppercase tracking-normal leading-[30px] lg:leading-[34px]'
          }`}
        >
          {title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              <span className="block">{line}</span>
            </React.Fragment>
          ))}
        </motion.h3>
        
        {/* Subtle decorative gold line that expands on hover */}
        <div className={`w-0 group-hover:w-16 h-[3px] bg-[#FFB800] mt-3 rounded-full transition-all duration-500 ease-out ${isRight ? 'mr-0 ml-auto' : ''}`}></div>
      </div>
    </motion.div>
  );
};

export default ImageOverlayCard;

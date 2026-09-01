import React from 'react';
import { motion } from 'framer-motion';

const VisionMissionSection = () => {
  return (
    <section 
      id="رؤيتنا-ورسالتنا" 
      className="relative w-full bg-[#141615] text-white py-28 px-6 lg:px-12 overflow-hidden border-b border-white/5 select-none"
    >
      {/* Background Radial Geometric Web (from target design) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 1920 1080" className="w-full h-full object-cover" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Faint straight radiating lines */}
          <line x1="0" y1="0" x2="1920" y2="1080" stroke="#888" strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="0" y1="1080" x2="1920" y2="0" stroke="#888" strokeWidth="0.5" strokeOpacity="0.3" />
          <line x1="960" y1="0" x2="960" y2="1080" stroke="#888" strokeWidth="0.5" strokeOpacity="0.1" />
          <line x1="0" y1="540" x2="1920" y2="540" stroke="#888" strokeWidth="0.5" strokeOpacity="0.1" />
          
          <line x1="480" y1="0" x2="1440" y2="1080" stroke="#888" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="1440" y1="0" x2="480" y2="1080" stroke="#888" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="0" y1="270" x2="1920" y2="810" stroke="#888" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="0" y1="810" x2="1920" y2="270" stroke="#888" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      </div>

      {/* Main Content Layout */}
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ========================================================
              RIGHT COLUMN: 'رؤيتنا' and 'رسالتنا' Rows with Connected Glowing Dots
             ======================================================== */}
          <div className="lg:col-span-7 space-y-16 lg:space-y-20 order-2 lg:order-1 relative">
            
            {/* Main Horizontal Line (Shoots left from the trunk to the Logo) */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[calc(100%+2rem)] xl:right-[calc(100%+3rem)] w-[50vw] h-[1.5px] bg-[#555] -z-20" />

            {/* ROW 1: رؤيتنا (Our Vision) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 text-right relative z-10"
            >
              {/* Title: رؤيتنا */}
              <div className="shrink-0 self-start md:self-center">
                <h2 className="text-5xl sm:text-6xl lg:text-[70px] font-black text-white tracking-tight leading-none drop-shadow-md">
                  رؤيتنا
                </h2>
              </div>

              {/* Paragraphs with the Glowing Yellow Indicator on the left */}
              <div className="relative flex-1 flex items-center gap-5">
                
                {/* Vision Text Content */}
                <div className="space-y-2.5 text-[#B0B0B0] text-sm sm:text-base md:text-[16px] leading-[1.8] font-normal">
                  <p>
                    أن نكون المقاول الرائد في المملكة العربية السعودية، والمعروف بالابتكار والتميز والجودة التي لا تضاهى في كل مشروع.
                  </p>
                  <p>
                    الرؤية الرسمية للشركة تركز على بناء مكانة قيادية في قطاع المقاولات السعودي، مع جعل الابتكار والتميز والجودة عناصر أساسية في كل مشروع.
                  </p>
                </div>

                {/* Glowing Yellow Connected Dot (Left side, vertically centered) */}
                <div className="hidden lg:flex items-center justify-center shrink-0 ml-1 relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EBFB38] shadow-[0_0_12px_3px_rgba(235,251,56,0.5)] z-10 relative" />
                  
                  {/* Dynamic CSS Bracket Lines */}
                  {/* Branch Left */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-full w-8 xl:w-12 h-[1.5px] bg-[#555] -z-10" />
                  {/* Trunk Down */}
                  <div className="absolute top-1/2 right-[calc(100%+2rem)] xl:right-[calc(100%+3rem)] w-[1.5px] h-[50vh] bg-[#555] -z-10" />
                </div>
              </div>
            </motion.div>

            {/* ROW 2: رسالتنا (Our Mission) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 text-right relative z-10"
            >
              {/* Title: رسالتنا */}
              <div className="shrink-0 self-start md:self-center">
                <h2 className="text-5xl sm:text-6xl lg:text-[70px] font-black text-white tracking-tight leading-none drop-shadow-md">
                  رسالتنا
                </h2>
              </div>

              {/* Paragraphs with the Glowing Yellow Indicator on the left */}
              <div className="relative flex-1 flex items-center gap-5">
                
                {/* Mission Text Content */}
                <div className="space-y-2.5 text-[#B0B0B0] text-sm sm:text-base md:text-[16px] leading-[1.8] font-normal">
                  <p>
                    تقديم خدمات مقاولات استثنائية تركز على الجودة والسلامة ودقة التنفيذ، مع توفير حلول متكاملة في التطوير والاستشارات وتحليل التصميم وهندسة القيمة لتجاوز توقعات العملاء.
                  </p>
                  <p>
                    نعمل على تحقيق ذلك من خلال الجمع بين الخبرة التنفيذية والحلول المتخصصة، بما يساعد على تلبية احتياجات المشاريع وتحقيق مستويات عالية من رضا العملاء.
                  </p>
                </div>

                {/* Glowing Yellow Connected Dot (Left side, vertically centered) */}
                <div className="hidden lg:flex items-center justify-center shrink-0 ml-1 relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EBFB38] shadow-[0_0_12px_3px_rgba(235,251,56,0.5)] z-10 relative" />
                  
                  {/* Dynamic CSS Bracket Lines */}
                  {/* Branch Left */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-full w-8 xl:w-12 h-[1.5px] bg-[#555] -z-10" />
                  {/* Trunk Up */}
                  <div className="absolute bottom-1/2 right-[calc(100%+2rem)] xl:right-[calc(100%+3rem)] w-[1.5px] h-[50vh] bg-[#555] -z-10" />
                </div>
              </div>
            </motion.div>

          </div>

          {/* ========================================================
              LEFT COLUMN: POWER PREPARATION Logo & Connected Branch Wire
             ======================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative order-1 lg:order-2">
            
            <div className="relative flex items-center justify-center lg:justify-end w-full lg:pl-10">
              
              {/* The Official Styled Power Preparation Logo */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center z-10 bg-[#141615] py-4 px-2"
              >
                {/* Logo Icon */}
                <div className="w-44 sm:w-52 md:w-60 h-auto mb-4">
                  <svg viewBox="0 0 200 230" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Top Gray / Silver Chevron */}
                    <path 
                      d="M 32 60 L 100 18 L 168 60" 
                      stroke="#C5C7CA" 
                      strokeWidth="16" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    
                    {/* Bottom Gold / Yellow Chevron */}
                    <path 
                      d="M 32 98 L 100 56 L 168 98" 
                      stroke="#FFB800" 
                      strokeWidth="16" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    
                    {/* 5 Vertical Staggered Pillars */}
                    <rect x="54" y="118" width="12" height="58" rx="6" fill="#8E9297" />
                    <rect x="74" y="118" width="12" height="86" rx="6" fill="#8E9297" />
                    <rect x="94" y="118" width="12" height="114" rx="6" fill="#8E9297" />
                    <rect x="114" y="118" width="12" height="86" rx="6" fill="#8E9297" />
                    <rect x="134" y="118" width="12" height="58" rx="6" fill="#8E9297" />
                  </svg>
                </div>

                {/* Arabic Company Name with Trademark */}
                <div className="flex items-start justify-center gap-1 text-white font-extrabold text-lg sm:text-xl tracking-normal font-sans">
                  <span>شركة قوة الاعداد المحدودة</span>
                  <span className="text-[10px] font-normal text-white/70 mt-1">®</span>
                </div>

                {/* English Company Name with Trademark */}
                <div className="flex items-start justify-center text-white/90 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mt-1">
                  <span className="text-[9px] lowercase mr-0.5 mt-0.5 text-white/70">®</span>
                  <span>POWER PREPARATION</span>
                </div>
              </motion.div>

              {/* SVG Connectors removed in favor of flawless CSS overlap method attached directly to text dots */}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;

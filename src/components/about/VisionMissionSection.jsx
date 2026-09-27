import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const VisionMissionSection = ({ data }) => {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const { lang, t, isRTL } = useLanguage();

  const visionTitle = (lang === 'en' ? (data?.vision?.title_en || data?.vision?.title) : null) 
    || t?.about?.visionTitle 
    || (isRTL ? "رؤيتنا" : "Our Vision");

  const visionParagraphs = (lang === 'en' && data?.vision?.paragraphs_en && data.vision.paragraphs_en.length > 0 ? data.vision.paragraphs_en : null)
    || data?.vision?.paragraphs 
    || [
        t?.about?.visionP1 || (isRTL ? "أن نكون المقاول الرائد في المملكة العربية السعودية، والمعروف بالابتكار والتميز والجودة التي لا تضاهى في كل مشروع." : "To be the premier contractor in the Kingdom of Saudi Arabia, renowned for innovation, excellence, and unmatched quality across all projects."),
        t?.about?.visionP2 || (isRTL ? "الرؤية الرسمية للشركة تركز على بناء مكانة قيادية في قطاع المقاولات السعودي، مع جعل الابتكار والتميز والجودة عناصر أساسية في كل مشروع." : "The company's official vision focuses on building a leadership position in the Saudi contracting market, making innovation, excellence, and quality foundational pillars.")
      ];

  const missionTitle = (lang === 'en' ? (data?.mission?.title_en || data?.mission?.title) : null)
    || t?.about?.missionTitle 
    || (isRTL ? "رسالتنا" : "Our Mission");

  const missionParagraphs = (lang === 'en' && data?.mission?.paragraphs_en && data.mission.paragraphs_en.length > 0 ? data.mission.paragraphs_en : null)
    || data?.mission?.paragraphs
    || [
        t?.about?.missionP1 || (isRTL ? "تقديم خدمات مقاولات استثنائية تركز على الجودة والسلامة ودقة التنفيذ، مع توفير حلول متكاملة في التطوير والاستشارات وتحليل التصميم وهندسة القيمة لتجاوز توقعات العملاء." : "Delivering exceptional contracting services driven by safety, precision execution, and integrated engineering solutions across development, consultancy, BIM analysis, and value engineering."),
        t?.about?.missionP2 || (isRTL ? "نعمل على تحقيق ذلك من خلال الجمع بين الخبرة التنفيذية والحلول المتخصصة، بما يساعد على تلبية احتياجات المشاريع وتحقيق مستويات عالية من رضا العملاء." : "We achieve this by uniting executive expertise and specialized capabilities to fulfill project objectives and secure high client satisfaction.")
      ];

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Logo animation: starts in center, moves to side (left in RTL, right in LTR)
  const logoXDesktop = useTransform(
    scrollYProgress, 
    [0, 0.3], 
    [isRTL ? "25vw" : "-25vw", "0vw"]
  );
  const logoScaleDesktop = useTransform(scrollYProgress, [0, 0.3], [1.3, 1]);
  
  const logoX = isDesktop ? logoXDesktop : "0vw";
  const logoScale = isDesktop ? logoScaleDesktop : 1;

  // 2. Vision section slides in while pinned
  const visionOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const visionX = useTransform(
    scrollYProgress, 
    [0.3, 0.6], 
    [isRTL ? 50 : -50, 0]
  );

  // 3. Mission section slides in while pinned
  const missionOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const missionX = useTransform(
    scrollYProgress, 
    [0.6, 0.9], 
    [isRTL ? 50 : -50, 0]
  );

  // Main horizontal line appears with vision
  const lineOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section 
      id="رؤيتنا-ورسالتنا" 
      ref={containerRef}
      className="relative w-full h-[250vh] bg-[#141615] text-white select-none border-b border-white/5"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 lg:px-12 py-10">
        
        {/* Background Radial Geometric Web */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
        >
          <svg viewBox="0 0 1920 1080" className="w-full h-full object-cover" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="1920" y2="1080" stroke="#888" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="0" y1="1080" x2="1920" y2="0" stroke="#888" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="960" y1="0" x2="960" y2="1080" stroke="#888" strokeWidth="0.5" strokeOpacity="0.1" />
            <line x1="0" y1="540" x2="1920" y2="540" stroke="#888" strokeWidth="0.5" strokeOpacity="0.1" />
            
            <line x1="480" y1="0" x2="1440" y2="1080" stroke="#888" strokeWidth="0.5" strokeOpacity="0.2" />
            <line x1="1440" y1="0" x2="480" y2="1080" stroke="#888" strokeWidth="0.5" strokeOpacity="0.2" />
            <line x1="0" y1="270" x2="1920" y2="810" stroke="#888" strokeWidth="0.5" strokeOpacity="0.2" />
            <line x1="0" y1="810" x2="1920" y2="270" stroke="#888" strokeWidth="0.5" strokeOpacity="0.2" />
          </svg>
        </motion.div>

        {/* Main Content Layout */}
        <div className="relative max-w-7xl mx-auto w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* ========================================================
                TEXT COLUMN: 'رؤيتنا' and 'رسالتنا' (Our Vision & Our Mission)
               ======================================================== */}
            <div className="lg:col-span-7 space-y-12 sm:space-y-16 lg:space-y-20 order-2 lg:order-1 relative">
              
              {/* Main Horizontal Connecting Trunk Line */}
              <motion.div 
                style={{ opacity: lineOpacity }}
                className={`hidden lg:block absolute top-1/2 -translate-y-1/2 ${
                  isRTL 
                    ? 'right-[calc(100%+2rem)] xl:right-[calc(100%+3rem)]' 
                    : 'left-[calc(100%+2rem)] xl:left-[calc(100%+3rem)]'
                } w-[50vw] h-[1.5px] bg-[#555] -z-20`} 
              />

              {/* ROW 1: رؤيتنا (Our Vision) */}
              <motion.div 
                style={{ opacity: visionOpacity, x: visionX }}
                className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 ${
                  isRTL ? 'text-right' : 'text-left'
                } relative z-10`}
              >
                {/* Title */}
                <div className="shrink-0 self-start md:self-center min-w-[170px] lg:min-w-[210px]">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md">
                    {visionTitle}
                  </h2>
                </div>

                {/* Paragraphs + Connected Dot */}
                <div className="relative flex-1 flex items-center gap-5">
                  <div className={`space-y-2.5 text-[#B0B0B0] text-sm sm:text-base leading-[1.8] font-normal ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}>
                    {visionParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {/* Glowing Yellow Connected Dot & Trunk Line */}
                  <div className={`hidden lg:flex items-center justify-center shrink-0 ${isRTL ? 'ml-1' : 'mr-1'} relative`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EBFB38] shadow-[0_0_12px_3px_rgba(235,251,56,0.5)] z-10 relative" />
                    
                    {/* Horizontal line from dot to vertical line */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? 'right-full' : 'left-full'
                    } w-8 xl:w-12 h-[1.5px] bg-[#555] -z-10`} />
                    
                    {/* Vertical line going down */}
                    <div className={`absolute top-1/2 ${
                      isRTL 
                        ? 'right-[calc(100%+2rem)] xl:right-[calc(100%+3rem)]' 
                        : 'left-[calc(100%+2rem)] xl:left-[calc(100%+3rem)]'
                    } w-[1.5px] h-[140px] bg-[#555] -z-10`} />
                  </div>
                </div>
              </motion.div>

              {/* ROW 2: رسالتنا (Our Mission) */}
              <motion.div 
                style={{ opacity: missionOpacity, x: missionX }}
                className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 ${
                  isRTL ? 'text-right' : 'text-left'
                } relative z-10`}
              >
                {/* Title */}
                <div className="shrink-0 self-start md:self-center min-w-[170px] lg:min-w-[210px]">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md">
                    {missionTitle}
                  </h2>
                </div>

                {/* Paragraphs + Connected Dot */}
                <div className="relative flex-1 flex items-center gap-5">
                  <div className={`space-y-2.5 text-[#B0B0B0] text-sm sm:text-base leading-[1.8] font-normal ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}>
                    {missionParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {/* Glowing Yellow Connected Dot & Trunk Line */}
                  <div className={`hidden lg:flex items-center justify-center shrink-0 ${isRTL ? 'ml-1' : 'mr-1'} relative`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EBFB38] shadow-[0_0_12px_3px_rgba(235,251,56,0.5)] z-10 relative" />
                    
                    {/* Horizontal line from dot to vertical line */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? 'right-full' : 'left-full'
                    } w-8 xl:w-12 h-[1.5px] bg-[#555] -z-10`} />
                    
                    {/* Vertical line going up */}
                    <div className={`absolute bottom-1/2 ${
                      isRTL 
                        ? 'right-[calc(100%+2rem)] xl:right-[calc(100%+3rem)]' 
                        : 'left-[calc(100%+2rem)] xl:left-[calc(100%+3rem)]'
                    } w-[1.5px] h-[140px] bg-[#555] -z-10`} />
                  </div>
                </div>
              </motion.div>

            </div>

            {/* ========================================================
                LOGO COLUMN: POWER PREPARATION Logo
               ======================================================== */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative order-1 lg:order-2 mb-10 lg:mb-0">
              <div className={`relative flex items-center justify-center ${isRTL ? 'lg:justify-end lg:pl-10' : 'lg:justify-start lg:pr-10'} w-full`}>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8 }}
                  style={{ x: logoX, scale: logoScale }}
                  className="flex flex-col items-center text-center z-10 bg-[#141615] py-4 px-2 will-change-transform"
                >
                  {/* Logo Icon */}
                  <div className="w-40 sm:w-48 md:w-56 h-auto mb-4">
                    <svg viewBox="0 0 200 230" className="w-full h-full drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 32 60 L 100 18 L 168 60" stroke="#C5C7CA" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M 32 98 L 100 56 L 168 98" stroke="#FFB800" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="54" y="118" width="12" height="58" rx="6" fill="#8E9297" />
                      <rect x="74" y="118" width="12" height="86" rx="6" fill="#8E9297" />
                      <rect x="94" y="118" width="12" height="114" rx="6" fill="#8E9297" />
                      <rect x="114" y="118" width="12" height="86" rx="6" fill="#8E9297" />
                      <rect x="134" y="118" width="12" height="58" rx="6" fill="#8E9297" />
                    </svg>
                  </div>
                  <div className="flex items-start justify-center gap-1 text-white font-extrabold text-lg sm:text-xl tracking-normal font-sans">
                    <span>{isRTL ? "شركة قوة الاعداد المحدودة" : "POWER PREPARATION CO. LTD."}</span>
                    <span className="text-[10px] font-normal text-white/70 mt-1">®</span>
                  </div>
                  <div className="flex items-start justify-center text-white/90 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase mt-1">
                    <span className="text-[9px] lowercase mr-0.5 mt-0.5 text-white/70">®</span>
                    <span>{isRTL ? "POWER PREPARATION" : "شركة قوة الاعداد المحدودة"}</span>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;

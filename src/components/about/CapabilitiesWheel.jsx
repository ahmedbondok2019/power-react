import React, { useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from '../ui/SectionTitle';
import { useSettingsData } from '../../hooks/useSettingsData';
import { useLanguage } from '../../contexts/LanguageContext';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, useGSAP);

const STAGES_AR = [
  {
    id: 0,
    number: "01",
    nodeTitle: "المقاولات\nالجزئية",
    heading: "المقاولات الجزئية والأعمال المتخصصة (MEP)",
    category: "الحلول الهندسية التخصصية",
    description: "تنفيذ نطاقات متخصصة ضمن المشاريع وفق احتياجات العميل ونطاق العمل المعتمد، مع التركيز على الأعمال الكهروميكانيكية، التكييف والتهوية، والأنظمة الدقيقة.",
    details: [
      "تنفيذ شبكات ومجاري الهواء بالتعاون مع مصانعنا المتخصصة",
      "أعمال الكهروميكانيكا الدقيقة وأنظمة مكافحة الحريق والإنذار",
      "تجهيز المنشآت الطبية والمنتجعات بأحدث أنظمة التبريد والعزل"
    ],
  },
  {
    id: 1,
    number: "02",
    nodeTitle: "المقاولات\nالعامة",
    heading: "المقاولات العامة والإنشاءات المتكاملة",
    category: "نطاق التنفيذ الشامل",
    description: "تنفيذ وإدارة نطاقات المشاريع وفق أعلى متطلبات الجودة والسلامة والالتزام بالجداول الزمنية، مع تقديم حلول إنشائية متطورة لكبرى المشاريع التنموية والتجارية في المملكة.",
    details: [
      "إدارة المواقع والعمليات الإنشائية المعقدة بأحدث البرمجيات",
      "تطبيق منظومة دقيقة لضبط الجودة ومطابقة المواصفات القياسية",
      "حلول متكاملة للمشاريع السكنية، التجارية، والمباني التعليمية والطبية"
    ],
  },
  {
    id: 2,
    number: "03",
    nodeTitle: "التطوير",
    heading: "التطوير والابتكار الهندسي",
    category: "تطوير الحلول والمشاريع",
    description: "المساهمة في تطوير الحلول والمشاريع بما يتوافق مع متطلبات المشروع وأحدث تقنيات البناء الحديث، لضمان استدامة الأصول وخفض التكلفة التشغيلية.",
    details: [
      "دراسة وتطوير النماذج الهندسية لرفع كفاءة استهلاك الطاقة",
      "ابتكار حلول تدفق الهواء وأنظمة التهوية القماشية الذكية",
      "مواكبة المعايير البيئية العالمية وممارسات الأبنية الخضراء"
    ],
  },
  {
    id: 3,
    number: "04",
    nodeTitle: "الاستشارات",
    heading: "الاستشارات الفنية وإدارة المشاريع",
    category: "الاستشارات والتحليل الفني",
    description: "تقديم الاستشارات الفنية المتخصصة وإدارة مراحل المشروع لضمان أعلى درجات الموثوقية وتطبيق أفضل الممارسات الهندسية الدولية.",
    details: [
      "تقديم الاستشارات الفنية في مراحل التخطيط والتنفيذ",
      "إدارة المخاطر والسلامة الإنشائية ومطابقة الأكواد السعودية",
      "حلول هندسية متكاملة لربط كافة أطراف المشروع بكفاءة"
    ],
  },
  {
    id: 4,
    number: "05",
    nodeTitle: "تحليل\nالتصميم",
    heading: "تحليل التصميم والمحاكاة الهندسية",
    category: "الدراسات والنمذجة المتقدمة",
    description: "دراسة وتدقيق المخططات والتصاميم الإنشائية والكهروميكانيكية باستخدام أدوات المحاكاة ونمذجة معلومات المباني (BIM) لتفادي التعارضات الميدانية.",
    details: [
      "المراجعة الدقيقة للتصاميم المعمارية والإنشائية والـ MEP",
      "استخدام تقنيات BIM المتقدمة لكشف وتلافي التعارضات قبل التنفيذ",
      "تحسين كفاءة التشغيل وتوزيع الأحمال الحرارية والميكانيكية"
    ],
  },
  {
    id: 5,
    number: "06",
    nodeTitle: "هندسة\nالقيمة",
    heading: "هندسة القيمة (Value Engineering)",
    category: "تحسين التكلفة والجودة",
    description: "إعادة تقييم وهندسة العناصر الإنشائية والمعدات لتحقيق أعلى أداء بأقل تكلفة ممكنة مع الحفاظ التام على الجودة والمعايير المعتمدة.",
    details: [
      "تحليل التكلفة الإنشائية وتقديم بدائل تقنية مجدية اقتصادياً",
      "الحفاظ على جودة المشروع ورفع عمره الافتراضي مع تقليل الهدر",
      "تحقيق التوازن المثالي بين كفاءة الطاقة والإنفاق الرأسمالي"
    ],
  }
];

const STAGES_EN = [
  {
    id: 0,
    number: "01",
    nodeTitle: "Sub-\nContracting",
    heading: "Specialized Sub-Contracting & MEP Works",
    category: "Specialized Engineering Solutions",
    description: "Executing specialized project scopes adhering to rigorous engineering standards, focusing on MEP, HVAC ducting, and critical mechanical infrastructure.",
    details: [
      "Fabrication and installation of air duct networks with specialized facilities",
      "Precision electromechanical works, fire-fighting, and alarm systems",
      "Equipping medical and hospitality projects with advanced HVAC and insulation"
    ],
  },
  {
    id: 1,
    number: "02",
    nodeTitle: "General\nContracting",
    heading: "General Contracting & Turnkey Construction",
    category: "Comprehensive Execution Scope",
    description: "Executing and managing comprehensive project scopes with the highest quality and safety standards, delivering advanced structural solutions across Saudi Arabia.",
    details: [
      "Advanced site management and engineering workflows",
      "Strict quality control matching Saudi and international codes",
      "Integrated solutions for residential, commercial, and institutional projects"
    ],
  },
  {
    id: 2,
    number: "03",
    nodeTitle: "Development",
    heading: "Development & Engineering Innovation",
    category: "Solutions & Project Development",
    description: "Developing modern engineering solutions aligned with advanced construction techniques to ensure asset sustainability and lower operational costs.",
    details: [
      "Engineering models designed for maximum energy efficiency",
      "Innovative airflow and smart fabric ducting technologies",
      "Full compliance with green building and sustainability standards"
    ],
  },
  {
    id: 3,
    number: "04",
    nodeTitle: "Consultancy",
    heading: "Technical Consultancy & Project Management",
    category: "Consultancy & Technical Advisory",
    description: "Providing specialized technical advisory and phase-by-phase project management to ensure maximum reliability and engineering integrity.",
    details: [
      "Expert advisory across project planning and execution phases",
      "Risk management, structural safety, and SBC compliance",
      "Integrated solutions bridging clients, consultants, and teams"
    ],
  },
  {
    id: 5,
    number: "05",
    nodeTitle: "Design\nAnalysis",
    heading: "Design Analysis & BIM Simulation",
    category: "Advanced Modeling & Studies",
    description: "In-depth review of architectural and MEP designs utilizing advanced BIM modeling to eliminate on-site clashes and optimize performance.",
    details: [
      "Rigorous review of architectural, structural, and MEP drawings",
      "Advanced clash detection and 3D simulation prior to execution",
      "Thermal and mechanical load optimization for operational efficiency"
    ],
  },
  {
    id: 5,
    number: "06",
    nodeTitle: "Value\nEngineering",
    heading: "Value Engineering & Cost Optimization",
    category: "Cost & Quality Optimization",
    description: "Re-evaluating materials and systems to achieve peak performance at optimal costs while strictly preserving quality and specifications.",
    details: [
      "Life-cycle cost analysis and viable technical alternatives",
      "Waste reduction and structural longevity enhancement",
      "Balanced capital expenditure with long-term energy savings"
    ],
  }
];

const CapabilitiesWheel = ({ data }) => {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const { lang, t, isRTL } = useLanguage();
  const { data: settingsData } = useSettingsData();
  const logoUrl = settingsData?.data?.logo || '/logo.png';

  const baseStagesList = useMemo(() => {
    return isRTL ? STAGES_AR : STAGES_EN;
  }, [isRTL]);

  // Dynamic baseAngles for RTL (180 deg focal point) vs LTR (0 deg focal point)
  const baseAngles = useMemo(() => {
    return isRTL
      ? [180, 120, 60, 0, 300, 240]
      : [0, 300, 240, 180, 120, 60];
  }, [isRTL]);

  const stages = useMemo(() => {
    const rawList = data && data.length > 0 ? data : baseStagesList;
    return rawList.map((item, idx) => {
      const fallback = baseStagesList[idx] || baseStagesList[0];
      return {
        ...fallback,
        ...item,
        id: idx,
        number: item.number || fallback.number,
        nodeTitle: (lang === 'en' ? (item.nodeTitle_en || item.node_title_en || item.title_en) : null) || item.nodeTitle || item.node_title || item.title || fallback.nodeTitle,
        heading: (lang === 'en' ? (item.heading_en || item.title_en) : null) || item.heading || item.title || fallback.heading,
        category: (lang === 'en' ? (item.category_en || item.subtitle_en) : null) || item.category || item.subtitle || fallback.category,
        description: (lang === 'en' ? (item.description_en) : null) || item.description || fallback.description,
        details: (lang === 'en' && item.details_en && item.details_en.length > 0 ? item.details_en : (item.details || fallback.details || [])),
        baseAngle: baseAngles[idx] ?? 0
      };
    });
  }, [data, baseStagesList, baseAngles, lang]);

  useGSAP(() => {
    const totalStages = stages.length;

    // Master ScrollTrigger Scene
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentStage = Math.min(Math.floor(progress * totalStages), totalStages - 1);
          setActiveStageIndex(currentStage);
        }
      }
    });

    // Rotate the wheel forward
    tl.to(wheelRef.current, {
      rotation: (totalStages - 1) * 60,
      ease: "none",
      duration: 1
    }, 0);

    // Counter-rotate the stage nodes so text is ALWAYS upright
    cardsRef.current.forEach((nodeEl) => {
      if (nodeEl) {
        tl.to(nodeEl, {
          rotation: -(totalStages - 1) * 60,
          ease: "none",
          duration: 1
        }, 0);
      }
    });

  }, { scope: containerRef, dependencies: [stages, isRTL] });

  const sectionTitle = t?.capabilitiesWheel?.title || (isRTL ? 'قدراتنا' : 'Our Capabilities');
  const sectionBadge = t?.capabilitiesWheel?.badge || (isRTL ? 'عملية متكاملة' : 'Integrated Process');
  const sectionSubtitle = t?.capabilitiesWheel?.subtitle || (isRTL 
    ? 'تمتد خبراتنا إلى ما هو أبعد من التنفيذ التقليدي؛ نوفر منظومة هندسية وتنفيذية متكاملة من 6 قدرات أساسية.' 
    : 'Our expertise extends beyond conventional execution; we provide an integrated engineering and execution framework of 6 core capabilities.');
  const currentStageLabel = t?.capabilitiesWheel?.currentStage || (isRTL ? 'المرحلة الحالية' : 'Current Stage');

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#141615] text-white select-none"
      style={{ height: `calc(100vh + ${stages.length * 600}px)` }}
    >
      {/* Sticky Inner Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Background Atmosphere */}
        <div className={`absolute inset-0 ${isRTL ? 'bg-[radial-gradient(circle_at_85%_50%,rgba(235,251,56,0.08),transparent_60%)]' : 'bg-[radial-gradient(circle_at_15%_50%,rgba(235,251,56,0.08),transparent_60%)]'} pointer-events-none`} />
        <div className={`absolute top-1/2 ${isRTL ? 'right-[10%]' : 'left-[10%]'} w-[500px] h-[500px] bg-[#EBFB38]/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2`} />

        {/* Main Container */}
        <div className="relative w-full h-full max-w-7xl mx-auto px-6 flex flex-col justify-between pt-16 sm:pt-20 pb-6 z-10">

          {/* Top Header: Section Title & Step Counter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-3 shrink-0 w-full">

            {/* Title & Subtitle */}
            <div className={`${isRTL ? 'text-right' : 'text-left'} space-y-1.5 max-w-2xl`}>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 justify-start">
                <SectionTitle title={sectionTitle} theme="dark" className="whitespace-nowrap" />
                <span className="px-3 py-1 rounded-full bg-[#EBFB38]/15 border border-[#EBFB38]/30 text-[#EBFB38] text-xs font-bold tracking-wider whitespace-nowrap">
                  {sectionBadge}
                </span>
              </div>
              <p className={`text-white/70 text-xs sm:text-sm leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {sectionSubtitle}
              </p>
            </div>

            {/* Step Tracker */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2 rounded-2xl shrink-0">
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <span className="text-[10px] text-white/50 block font-semibold">{currentStageLabel}</span>
                <span className="text-sm font-bold text-white tracking-wide">
                  {stages[activeStageIndex]?.category}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#EBFB38] font-sans">
                {stages[activeStageIndex]?.number}
                <span className="text-xs text-white/40 font-normal ml-1">/ {String(stages.length).padStart(2, '0')}</span>
              </div>
            </div>

          </div>

          {/* Middle Body: Wheel & Details Content (mirrored cleanly for RTL / LTR) */}
          <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[400px] my-auto py-2">

            {/* ========================================================
                The Giant Circular Wheel
                - In RTL: on Right side (col 5) with translate-x-[50%], laser pin on left
                - In LTR: on Left side (col 5) with -translate-x-[50%], laser pin on right
               ======================================================== */}
            <div className={`lg:col-span-5 relative flex items-center ${isRTL ? 'justify-end order-1' : 'justify-start order-1'} h-full`}>

              {/* Focal Point Indicator (Orange Laser Pin pointing to active stage at front) */}
              <div className={`absolute ${isRTL ? '-left-4 sm:left-0 md:left-2 lg:left-[-24px]' : '-right-4 sm:right-0 md:right-2 lg:right-[-24px]'} top-1/2 -translate-y-1/2 z-40 flex items-center pointer-events-none`}>
                <div className={`relative flex items-center justify-center ${!isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FF5722] to-[#E64A19] border-2 border-white shadow-[0_0_25px_rgba(255,87,34,0.9)] flex items-center justify-center text-white font-black text-base sm:text-xl">
                    {stages[activeStageIndex]?.number}
                  </div>
                  {/* Laser Line connecting the focal node to the content */}
                  <div className={`hidden sm:block w-12 lg:w-20 h-[2px] ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent to-[#FF5722]`} />
                </div>
              </div>

              {/* Overflow Mask Container holding the half-wheel */}
              <div className={`relative w-[320px] sm:w-[420px] md:w-[500px] lg:w-[560px] h-[320px] sm:h-[420px] md:h-[500px] lg:h-[560px] ${isRTL ? 'translate-x-[48%] sm:translate-x-[50%]' : '-translate-x-[48%] sm:-translate-x-[50%]'} flex items-center justify-center`}>

                {/* Inner Fixed Center Hub with Company Logo */}
                <div className="absolute z-10 w-[68%] h-[68%] rounded-full bg-gradient-to-br from-[#222524] to-[#121413] border-4 border-white/10 shadow-[inset_0_0_35px_rgba(0,0,0,0.85),0_0_50px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none select-none">
                  <div className="w-[88%] h-[88%] rounded-full bg-[#161817] border border-white/15 flex flex-col items-center justify-center p-3 sm:p-5 text-center shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,251,56,0.12),transparent_70%)] pointer-events-none" />
                    
                    <img
                      src={logoUrl}
                      alt="Power Preparation"
                      className="w-full h-full max-w-[120px] sm:max-w-[160px] md:max-w-[190px] max-h-[120px] sm:max-h-[160px] md:max-h-[190px] object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] brightness-110 contrast-105 z-10"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Circular Rotating Wheel Container */}
                <div
                  ref={wheelRef}
                  className="w-full h-full rounded-full relative flex items-center justify-center will-change-transform"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  {/* Outer Circular Neon Yellow Glowing Ring */}
                  <div className="absolute inset-0 rounded-full border-[20px] sm:border-[26px] md:border-[34px] border-[#EBFB38] shadow-[0_0_70px_rgba(235,251,56,0.3)]" />

                  {/* Circular Nodes Placed Equidistantly along the Ring */}
                  {stages.map((stage, idx) => {
                    const isActive = activeStageIndex === idx;

                    const radiusPercent = 48;
                    const angleRad = (stage.baseAngle * Math.PI) / 180;
                    const leftPos = 50 + radiusPercent * Math.cos(angleRad);
                    const topPos = 50 + radiusPercent * Math.sin(angleRad);

                    return (
                      <div
                        key={stage.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto cursor-pointer"
                        style={{
                          left: `${leftPos}%`,
                          top: `${topPos}%`,
                        }}
                      >
                        {/* GSAP Counter-Rotation Wrapper */}
                        <div ref={(el) => (cardsRef.current[idx] = el)} className="will-change-transform">
                          <div
                            className={`rounded-full flex items-center justify-center text-center transition-all duration-500 ${isActive
                              ? "w-28 h-28 sm:w-34 sm:h-34 md:w-38 md:h-38 bg-white text-black font-extrabold shadow-[0_15px_40px_rgba(0,0,0,0.85)] border-4 sm:border-6 border-[#FF5722] scale-110"
                              : "w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 bg-[#262827] text-white/80 font-bold border-2 border-white/20 hover:border-[#EBFB38] hover:text-white opacity-80"
                              }`}
                            style={{ aspectRatio: "1 / 1" }}
                          >
                            <span className={`leading-tight whitespace-pre-line px-1.5 ${isActive
                              ? "text-xs sm:text-sm md:text-sm font-black text-black"
                              : "text-[9px] sm:text-[11px] md:text-xs font-bold text-white/80"
                              }`}>
                              {stage.nodeTitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

            {/* ========================================================
                Active Stage Details Display
                - In RTL: on Left side (col 7), text-right, pl-4 lg:pl-8
                - In LTR: on Right side (col 7), text-left, pr-4 lg:pr-8
               ======================================================== */}
            <div className={`lg:col-span-7 ${isRTL ? 'text-right pl-2 lg:pl-8 order-2' : 'text-left pr-2 lg:pr-8 order-2'} relative min-h-[340px] flex flex-col justify-center z-20`}>
              {stages.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <div
                    key={stage.id}
                    className={`transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto relative z-10"
                      : "opacity-0 translate-y-8 pointer-events-none absolute inset-0 -z-10"
                      }`}
                    style={{
                      clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)"
                    }}
                  >
                    {/* Category Accent Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#EBFB38]/20 text-[#EBFB38] text-sm font-bold mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EBFB38] animate-pulse" />
                      <span>{stage.category}</span>
                    </div>

                    {/* Stage Main Heading */}
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight mb-4 tracking-tight">
                      {stage.heading}
                    </h3>

                    {/* Stage Detailed Description */}
                    <p className="text-white/80 text-sm sm:text-base md:text-lg leading-[1.7] mb-6 font-medium max-w-2xl">
                      {stage.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-3.5 border-t border-white/10 pt-5">
                      {stage.details.map((bullet, bIdx) => (
                        <li key={bIdx} className={`flex items-start gap-3 ${isRTL ? 'justify-start' : 'justify-start'} text-sm sm:text-base md:text-lg text-white/90`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EBFB38] mt-2 shrink-0 shadow-[0_0_8px_rgba(235,251,56,0.8)]" />
                          <span className="font-medium">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Interactive Indicator */}
          <div className="flex items-center justify-between pt-3 text-xs text-white/60 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EBFB38]" />
            </div>

            <div className="flex items-center gap-2">
              {stages.map((s, i) => (
                <div
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${activeStageIndex === i ? "w-8 bg-[#EBFB38]" : "w-2 bg-white/20"
                    }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CapabilitiesWheel;

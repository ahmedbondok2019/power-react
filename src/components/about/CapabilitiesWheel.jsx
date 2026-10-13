import React, { useRef, useState, useMemo, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { lang, t, isRTL } = useLanguage();
  const { data: settingsData } = useSettingsData();
  const logoUrl = settingsData?.data?.logo || '/logo.png';

  const baseStagesList = useMemo(() => {
    return isRTL ? STAGES_AR : STAGES_EN;
  }, [isRTL]);

  // Dynamic baseAngles:
  // - Mobile (< 768px): Vertical layout, active stage is at the BOTTOM (90 deg), right above the description card
  // - Desktop (>= 768px): Horizontal layout, active stage faces the card (180 deg in RTL, 0 deg in LTR)
  const baseAngles = useMemo(() => {
    if (isMobile) {
      return [90, 30, 330, 270, 210, 150];
    }
    return isRTL
      ? [180, 120, 60, 0, 300, 240]
      : [0, 300, 240, 180, 120, 60];
  }, [isMobile, isRTL]);

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

  }, { scope: containerRef, dependencies: [stages, isRTL, isMobile] });

  const sectionTitle = t?.capabilitiesWheel?.title || (isRTL ? 'قدراتنا' : 'Our Capabilities');
  const sectionBadge = t?.capabilitiesWheel?.badge || (isRTL ? 'عملية متكاملة' : 'Integrated Process');
  const sectionSubtitle = t?.capabilitiesWheel?.subtitle || (isRTL
    ? 'تمتد خبراتنا إلى ما هو أبعد من التنفيذ التقليدي؛ نوفر منظومة هندسية وتنفيذية متكاملة من 6 قدرات أساسية.'
    : 'Our expertise extends beyond conventional execution; we provide an integrated engineering and execution framework of 6 core capabilities.');
  const currentStageLabel = t?.capabilitiesWheel?.currentStage || (isRTL ? 'المرحلة الحالية' : 'Current Stage');

  const goToStage = (idx) => {
    setActiveStageIndex(idx);
    if (!containerRef.current) return;
    const startY = containerRef.current.offsetTop;
    const scrollPerStage = isMobile ? 400 : 600;
    const totalScroll = stages.length * scrollPerStage;
    const targetY = startY + (idx / Math.max(1, stages.length - 1)) * totalScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#141615] text-white select-none"
      style={{ height: `calc(100vh + ${stages.length * (isMobile ? 400 : 600)}px)` }}
    >
      {/* Sticky Inner Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Background Atmosphere */}
        <div className={`absolute inset-0 ${isRTL ? 'bg-[radial-gradient(circle_at_85%_50%,rgba(235,251,56,0.08),transparent_60%)]' : 'bg-[radial-gradient(circle_at_15%_50%,rgba(235,251,56,0.08),transparent_60%)]'} pointer-events-none`} />
        <div className={`absolute top-1/2 ${isRTL ? 'right-[10%]' : 'left-[10%]'} w-[500px] h-[500px] bg-[#EBFB38]/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2`} />

        {/* Main Container */}
        <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-between pt-2 sm:pt-6 md:pt-14 lg:pt-20 pb-2 sm:pb-6 z-10">

          {/* Top Header: Section Title & Step Counter (Desktop / Tablet only) */}
          <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2.5 sm:gap-4 border-b border-white/10 pb-2.5 sm:pb-3 shrink-0 w-full">

            {/* Title & Subtitle */}
            <div className={`${isRTL ? 'text-right' : 'text-left'} space-y-1 max-w-2xl`}>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 justify-start">
                <SectionTitle title={sectionTitle} theme="dark" className="whitespace-nowrap text-xl sm:text-3xl" />
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#EBFB38]/15 border border-[#EBFB38]/30 text-[#EBFB38] text-[10px] sm:text-xs font-bold tracking-wider whitespace-nowrap">
                  {sectionBadge}
                </span>
              </div>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                {sectionSubtitle}
              </p>
            </div>
          </div>

          {/* Middle Body: Wheel & Details Content (mirrored cleanly for RTL / LTR) */}
          <div className="relative flex-1 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 md:gap-8 lg:gap-12 items-center my-auto py-1 sm:py-2">

            {/* ========================================================
                The Circular Wheel
                - Mobile: Located on top, with the active node positioned at the BOTTOM (90 deg)
                - Desktop: Located on the side (col-span-5)
               ======================================================== */}
            <div className={`md:col-span-5 relative flex items-center justify-center ${isRTL ? 'md:justify-end order-1' : 'md:justify-start order-1'} h-[225px] sm:h-[265px] md:h-full pt-3 sm:pt-4 md:pt-0`}>

              {/* Overflow Mask Container holding the wheel */}
              <div className={`relative w-[190px] sm:w-[260px] md:w-[420px] lg:w-[560px] h-[190px] sm:h-[260px] md:h-[420px] lg:h-[560px] ${isRTL ? 'md:translate-x-[48%] lg:translate-x-[50%]' : 'md:-translate-x-[48%] lg:-translate-x-[50%]'} flex items-center justify-center shrink-0`}>

                {/* Inner Fixed Center Hub with Company Logo */}
                <div className="absolute z-10 w-[62%] h-[62%] rounded-full bg-gradient-to-br from-[#1E2220] via-[#141615] to-[#0D0F0E] border-2 sm:border-4 border-white/15 shadow-[inset_0_0_35px_rgba(0,0,0,0.85),0_0_40px_rgba(0,0,0,0.7)] flex items-center justify-center pointer-events-none select-none">
                  <div className="w-[88%] h-[88%] rounded-full bg-[#161817] border border-white/15 flex flex-col items-center justify-center p-2 sm:p-5 text-center shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.14),transparent_70%)] pointer-events-none" />

                    <img
                      src={logoUrl}
                      alt="Power Preparation"
                      className="w-full h-full max-w-[65px] sm:max-w-[120px] md:max-w-[160px] lg:max-w-[190px] max-h-[65px] sm:max-h-[120px] md:max-h-[160px] lg:max-h-[190px] object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] brightness-110 contrast-105 z-10"
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
                  {/* Outer Circular Neon Golden Glowing Ring */}
                  <div className="absolute inset-0 rounded-full border-[8px] sm:border-[16px] md:border-[24px] lg:border-[30px] border-[#EAB308] shadow-[0_0_45px_rgba(234,179,8,0.35),inset_0_0_20px_rgba(234,179,8,0.15)]" />

                  {/* Concentric Subtle Orbit Line */}
                  <div className="absolute -inset-2 sm:-inset-4 rounded-full border border-dashed border-white/10 pointer-events-none" />

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
                        onClick={() => goToStage(idx)}
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
                              ? "w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-gradient-to-br from-white via-[#FFFDE8] to-[#FEF3C7] text-black font-black shadow-[0_0_35px_rgba(234,179,8,0.7),0_10px_25px_rgba(0,0,0,0.85)] border-2 sm:border-4 border-[#EAB308] scale-110 z-30"
                              : "w-11 h-11 sm:w-16 sm:h-16 md:w-22 md:h-22 lg:w-26 lg:h-26 bg-[#161917]/95 text-white/90 font-bold border border-white/20 hover:border-[#EAB308]/70 hover:scale-105 hover:text-white"
                              }`}
                            style={{ aspectRatio: "1 / 1" }}
                          >
                            <span className={`leading-tight whitespace-pre-line px-1 select-none ${isActive
                              ? "text-[8px] sm:text-[11px] md:text-sm font-black text-[#111312]"
                              : "text-[7px] sm:text-[9px] md:text-xs font-bold text-white/80"
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
                - Luxury Card Container placed immediately below the wheel on mobile with a small gap
               ======================================================== */}
            <div className={`md:col-span-7 ${isRTL ? 'text-right pl-1 md:pl-4 lg:pl-8 order-2' : 'text-left pr-1 md:pr-4 lg:pr-8 order-2'} relative min-h-[210px] sm:min-h-[250px] md:min-h-[340px] flex flex-col justify-center z-20 w-full`}>
              {stages.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <div
                    key={stage.id}
                    className={`transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto relative z-10"
                      : "opacity-0 translate-y-6 pointer-events-none absolute inset-0 -z-10"
                      }`}
                    style={{
                      clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)"
                    }}
                  >
                    {/* High-End Glassmorphism Card */}
                    <div className="mt-[20px] w-full bg-[#181B19]/90 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                      {/* Card Top Row: Category Badge + Stage Counter */}
                      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/30 text-[#EAB308] text-[11px] sm:text-xs font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse" />
                          <span>{stage.category}</span>
                        </div>
                        <span className="text-[11px] sm:text-sm font-black text-[#EAB308] font-mono tracking-wider bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                          {stage.number} / {String(stages.length).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Stage Main Heading */}
                      <h3 className="text-base sm:text-2xl md:text-3xl font-black text-white leading-snug mb-1.5 sm:mb-2 tracking-tight">
                        {stage.heading}
                      </h3>

                      {/* Stage Detailed Description */}
                      <p className="text-white/75 text-[11px] sm:text-sm md:text-base leading-relaxed mb-2.5 sm:mb-3 font-normal">
                        {stage.description}
                      </p>

                      {/* Feature Bullet Points as Luxury Tiles */}
                      <div className="space-y-1.5 sm:space-y-2 border-t border-white/10 pt-2 sm:pt-2.5">
                        {stage.details.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 p-1.5 sm:p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] sm:text-sm text-white/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] mt-1 shrink-0 shadow-[0_0_8px_rgba(234,179,8,0.9)]" />
                            <span className="font-medium leading-relaxed">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Interactive Indicator (Desktop / Tablet only) */}
          <div className="hidden md:flex items-center justify-between pt-2 sm:pt-3 text-xs text-white/60 shrink-0 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goToStage(Math.max(0, activeStageIndex - 1))}
                disabled={activeStageIndex === 0}
                className="p-1 sm:p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-colors text-white"
                aria-label="Previous capability stage"
              >
                <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${!isRTL ? 'rotate-180' : ''}`} />
              </button>
              <button
                type="button"
                onClick={() => goToStage(Math.min(stages.length - 1, activeStageIndex + 1))}
                disabled={activeStageIndex === stages.length - 1}
                className="p-1 sm:p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-colors text-white"
                aria-label="Next capability stage"
              >
                <ChevronLeft className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${!isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {stages.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToStage(i)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 cursor-pointer ${activeStageIndex === i ? "w-6 sm:w-8 bg-[#EBFB38]" : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  aria-label={`Go to stage ${i + 1}`}
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

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from '../ui/SectionTitle';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, useGSAP);

const STAGES = [
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
    // Position on circle in degrees
    baseAngle: 180 // Starts directly at Front Focal Position (Leftmost edge at 180 deg)
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
    baseAngle: 120 // Top-left on the visible arc
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
    baseAngle: 60
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
    baseAngle: 0
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
    baseAngle: 300
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
    baseAngle: 240 // Bottom-left on the visible arc
  }
];

const CapabilitiesWheel = () => {
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useGSAP(() => {
    const totalStages = STAGES.length; // 6

    // Master ScrollTrigger Scene
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalStages * 1100}`, // Ample scroll distance for 6 stages
        pin: true,
        scrub: 1, // Smooth mechanical scrub
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Calculate active stage that is exactly at the front 180° focal point
          const rawStage = progress * (totalStages - 1);
          const currentStage = Math.min(Math.round(rawStage), totalStages - 1);
          setActiveStageIndex(currentStage);
        }
      }
    });

    // Rotate the wheel counter-clockwise (positive in standard math orientation or 60 deg each step)
    // so Stage 0 -> Stage 1 (from 120° to 180°) -> Stage 2 (from 60° to 180°) ... arrive perfectly to front focal position
    tl.to(wheelRef.current, {
      rotation: (totalStages - 1) * 60, // Rotates forward through all 6 stages
      ease: "none",
      duration: 1
    }, 0);

    // Counter-rotate the stage nodes so Arabic text is ALWAYS upright
    cardsRef.current.forEach((nodeEl) => {
      if (nodeEl) {
        tl.to(nodeEl, {
          rotation: -(totalStages - 1) * 60,
          ease: "none",
          duration: 1
        }, 0);
      }
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#141615] text-white overflow-hidden select-none"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(235,251,56,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 right-[10%] w-[500px] h-[500px] bg-[#EBFB38]/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      {/* Main Container */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-6 flex flex-col justify-between pt-16 sm:pt-20 pb-6 z-10">

        {/* Top Header: Section Title (Far Right in RTL) & Step Counter (Left) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-3 shrink-0 w-full">

          {/* Right Side in RTL: Section Title & Subtitle */}
          <div className="text-right space-y-1.5 max-w-xl">
            <div className="flex items-center gap-3 justify-start">
              <SectionTitle title="قدراتنا" theme="dark" />
              <span className="px-3 py-1 rounded-full bg-[#EBFB38]/15 border border-[#EBFB38]/30 text-[#EBFB38] text-xs font-bold tracking-wider">
                عملية متكاملة
              </span>
            </div>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed text-right">
              تمتد خبراتنا إلى ما هو أبعد من التنفيذ التقليدي؛ نوفر منظومة هندسية وتنفيذية متكاملة من 6 قدرات أساسية.
            </p>
          </div>

          {/* Left Side in RTL: Step Tracker */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2 rounded-2xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-white/50 block font-semibold">المرحلة الحالية</span>
              <span className="text-sm font-bold text-white tracking-wide">
                {STAGES[activeStageIndex].category}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#EBFB38] font-sans">
              {STAGES[activeStageIndex].number}
              <span className="text-xs text-white/40 font-normal ml-1">/ 06</span>
            </div>
          </div>

        </div>

        {/* Middle Body: Wheel on Right + Details Content on Left (Centered Vertically) */}
        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[400px] my-auto py-2">

          {/* ========================================================
              RIGHT SIDE (in RTL): The Giant Circular Wheel
              Positioned on the right, exactly half of the wheel is off-screen!
             ======================================================== */}
          <div className="lg:col-span-5 relative flex items-center justify-end h-full order-1 lg:order-1">

            {/* Focal Point Indicator (Orange Laser Pin pointing to the active node at the front) */}
            <div className="absolute -left-4 sm:left-0 md:left-2 lg:left-[-24px] top-1/2 -translate-y-1/2 z-40 flex items-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FF5722] to-[#E64A19] border-2 border-white shadow-[0_0_25px_rgba(255,87,34,0.9)] flex items-center justify-center text-white font-black text-base sm:text-xl">
                  {STAGES[activeStageIndex].number}
                </div>
                {/* Laser Line connecting the focal node to the content */}
                <div className="hidden sm:block w-12 lg:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#FF5722]" />
              </div>
            </div>

            {/* Overflow Mask Container holding the half-wheel */}
            <div className="relative w-[320px] sm:w-[420px] md:w-[520px] lg:w-[600px] h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px] translate-x-[48%] sm:translate-x-[50%] flex items-center justify-center">

              {/* Perfectly Circular Rotating Wheel Container (width === height) */}
              <div
                ref={wheelRef}
                className="w-full h-full rounded-full relative flex items-center justify-center will-change-transform"
                style={{ aspectRatio: "1 / 1" }}
              >
                {/* Outer Circular Neon Yellow Glowing Ring */}
                <div className="absolute inset-0 rounded-full border-[22px] sm:border-[30px] md:border-[38px] border-[#EBFB38] shadow-[0_0_70px_rgba(235,251,56,0.3)]" />

                {/* Inner Dark Hub */}
                <div className="absolute inset-[32px] sm:inset-[44px] md:inset-[56px] rounded-full bg-[#181A19] border-4 border-white/10 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#111312] border border-white/20 flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] text-[#EBFB38] font-black tracking-widest uppercase">POWER</span>
                    <span className="text-[7px] text-white/50 font-bold">PROCESS</span>
                  </div>
                </div>

                {/* 6 Circular Nodes Placed Equidistantly along the Ring (Every 60°) */}
                {STAGES.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;

                  // Trig calculation for exact circular placement
                  const radiusPercent = 48; // Centers on the yellow ring border
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
                      {/* Circular Stage Label Node: Active Stage is Dominant in Size & Contrast at the Center-Front */}
                      <div
                        ref={(el) => (cardsRef.current[idx] = el)}
                        className={`rounded-full flex items-center justify-center text-center transition-all duration-500 will-change-transform ${isActive
                          ? "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-white text-black font-extrabold shadow-[0_15px_40px_rgba(0,0,0,0.85)] border-4 sm:border-6 border-[#FF5722] scale-110"
                          : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[#262827] text-white/80 font-bold border-2 border-white/20 hover:border-[#EBFB38] hover:text-white opacity-80"
                          }`}
                        style={{ aspectRatio: "1 / 1" }}
                      >
                        <span className={`leading-tight whitespace-pre-line px-1 ${isActive
                          ? "text-xs sm:text-sm md:text-base font-black text-black"
                          : "text-[9px] sm:text-xs md:text-xs font-bold text-white/80"
                          }`}>
                          {stage.nodeTitle}
                        </span>
                      </div>
                    </div>
                  );
                })}

              </div>

            </div>

          </div>

          {/* ========================================================
              LEFT SIDE (in RTL): Active Stage Details Display
              Matches the Active Stage perfectly synchronized!
             ======================================================== */}
          <div className="lg:col-span-6 text-right relative min-h-[340px] flex flex-col justify-center pl-2 lg:pl-6 z-20 order-2 lg:order-2">
            {STAGES.map((stage, idx) => {
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EBFB38]/20 text-[#EBFB38] text-xs font-bold mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#EBFB38] animate-pulse" />
                    <span>{stage.category}</span>
                  </div>

                  {/* Stage Main Heading */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3 tracking-tight">
                    {stage.heading}
                  </h3>

                  {/* Stage Detailed Description */}
                  <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed mb-5 font-normal max-w-xl">
                    {stage.description}
                  </p>

                  {/* Distinct Bullet Points */}
                  <ul className="space-y-2.5 border-t border-white/10 pt-4">
                    {stage.details.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 justify-start text-xs sm:text-sm text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EBFB38] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(235,251,56,0.8)]" />
                        <span className="font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Interactive Scroll Indicator */}
        <div className="flex items-center justify-between pt-3  text-xs text-white/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EBFB38]" />
          </div>

          <div className="flex items-center gap-2">
            {STAGES.map((s, i) => (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-500 ${activeStageIndex === i ? "w-8 bg-[#EBFB38]" : "w-2 bg-white/20"
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CapabilitiesWheel;

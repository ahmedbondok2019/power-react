import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import {
  Users,
  Wrench,
  Package,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Clock,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';

const TIMELINE_STAGES = [
  {
    id: 'planning',
    number: '01',
    stageName: 'PLANNING',
    stageSubtitle: 'Resource planning',
    resourceTag: 'RESOURCE 01 · PEOPLE',
    resourceSubtitle: 'Right expertise at the right stage',
    icon: Users,
    titleAr: 'تخطيط الموارد وجدولة الاحتياج',
    description: 'تحديد دقيق لحجم الكفاءات والمعدات والمواد المطلوبة لكل مرحلة زمنية، وتوزيعها بناءً على محطات العمل المحددة لمنع تكدس العمالة ورفع الإنتاجية.',
    progressPct: 15,
    progressLabel: '15% اكتمال التخطيط',
    metric: '95% كفاءة استغلال الكوادر',
    deliverables: [
      'تقدير احتياج العمالة المتخصصة وتوقيت استدعائها الميداني',
      'برمجة طلبيات المواد طويلة الأجل (Long-Lead Items)',
      'وضع مصفوفة تسعير تنافسية خالية من تكاليف الاحتفاظ الزائد'
    ]
  },
  {
    id: 'design',
    number: '02',
    stageName: 'DESIGN',
    stageSubtitle: 'Technical capacity',
    resourceTag: 'RESOURCE 03 · MATERIALS',
    resourceSubtitle: 'Availability managed around milestones',
    icon: Package,
    titleAr: 'التصميم الفني والهندسة القيمة',
    description: 'إشراك مهندسي التصميم ونمذجة BIM لتحسين المواصفات وتحديد المواد والمعدات المناسبة لاحتياجات المشروع الفعلية مع تفادي أي تعارضات.',
    progressPct: 40,
    progressLabel: '40% الهندسة والتوريد',
    metric: 'صفر هدر في المواد وسلاسل الإمداد',
    deliverables: [
      'تحديد مواصفات المواد المعيارية المعتمدة ومطابقتها للكود',
      'فحص تعارضات المخططات التنفيذية عبر نمذجة BIM ثلاثية الأبعاد',
      'جدولة تصنيع مجاري الهواء وموزعات التكييف بمصانعنا التابعة'
    ]
  },
  {
    id: 'execution',
    number: '03',
    stageName: 'EXECUTION',
    stageSubtitle: 'Field deployment',
    resourceTag: 'RESOURCE 02 · EQUIPMENT',
    resourceSubtitle: 'Capacity aligned with site demand',
    icon: Wrench,
    titleAr: 'التنفيذ والانتشار الميداني المرن',
    description: 'استدعاء الفرق الهندسية وتوريد الآلات والمعدات الثقيلة في موعد العمل المباشر لتجنب فترات التعطيل والهدر المالي مع تشغيل المعدات بكامل طاقتها.',
    progressPct: 80,
    progressLabel: '80% التنفيذ الميداني',
    metric: '40% خفض في تكاليف المعدات',
    deliverables: [
      'تشغيل الآلات والمعدات التخصصية بطاقة استيعابية 100%',
      'استلام المواد وتوريدها مباشرة إلى خطوط التركيب (Just-in-Time)',
      'توجيه الفرق التخصصية بين قطاعات المشروع بمرونة وسرعة'
    ]
  },
  {
    id: 'delivery',
    number: '04',
    stageName: 'DELIVERY',
    stageSubtitle: 'Close-out',
    resourceTag: 'PROJECT CLOSE-OUT',
    resourceSubtitle: 'Testing, Commissioning & Handover',
    icon: ShieldCheck,
    titleAr: 'التشغيل والتسليم النهائي (Close-out)',
    description: 'إجراء الاختبارات التشغيلية الشاملة وإعادة توزيع الموارد وسحب المعدات الميدانية فور إتمام الأعمال لتقليل تكاليف الإغلاق والتسليم في الموعد.',
    progressPct: 100,
    progressLabel: '100% التسليم المعتمد',
    metric: 'تسليم معتمد بنسبة 100%',
    deliverables: [
      'إجراء اختبارات الفحص والتشغيل التجريبي (Testing & Commissioning)',
      'تسليم المشروع وفق معايير الجودة والمواصفات المعتمدة',
      'تحرير المعدات والفرق الهندسية للمشاريع التنموية التالية'
    ]
  }
];

const AgileResourcingSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const isWheelingRef = useRef(false);

  const activeStage = TIMELINE_STAGES[activeIdx];

  // Wheel scroll handler (بكرة الماوس للتنقل السلس بين الخطوات)
  const handleWheel = (e) => {
    if (isWheelingRef.current) return;

    if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
      const direction = (e.deltaY > 0 || e.deltaX > 0) ? 1 : -1;
      const nextIdx = activeIdx + direction;

      if (nextIdx >= 0 && nextIdx < TIMELINE_STAGES.length) {
        e.preventDefault();
        e.stopPropagation();
        isWheelingRef.current = true;
        setActiveIdx(nextIdx);

        setTimeout(() => {
          isWheelingRef.current = false;
        }, 500);
      }
    }
  };

  const handleNext = () => {
    if (activeIdx < TIMELINE_STAGES.length - 1) {
      setActiveIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      setActiveIdx(prev => prev - 1);
    }
  };

  return (
    <section 
      id="التوزيع-المرن-للموارد"
      className="relative w-full bg-[#111312] text-white py-24 sm:py-32 overflow-hidden select-none border-b border-white/5"
      dir="rtl"
    >
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[#D4E128]/5 rounded-full blur-[180px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#2A352F]/35 rounded-full blur-[180px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header & Strategic Context (Exact text from design) */}
        <div className="mb-14 sm:mb-20 text-right space-y-6 max-w-4xl">
          <SectionTitle title="التوزيع المرن للموارد" theme="dark" />

          <div className="space-y-4 text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            <p>
              التوزيع المرن للموارد هو طريقة لحساب موارد المشروع بناءً على الطلب في الوقت المناسب. مما يعني أنه ليس من الضروري أن تكون جميع الموارد متواجدة في الموقع طوال مدة المشروع.
            </p>
            <p>
              يتيح هذا تخصيص القوى العاملة بشكل جزئي أثناء المشاريع، وشراء المعدات والمواد بناءً على الاحتياج والطلب فقط.
            </p>
            <p className="text-[#D4E128] font-bold">
              يمنح هذا شركة Power Preparation Ltd ميزة كبيرة في التسعير مع الحفاظ على مستوى الجودة المطلوب من قبل عملائنا.
            </p>
          </div>
        </div>

        {/* Main Interactive Timeline & Cards Slider Container */}
        <div 
          ref={containerRef}
          onWheel={handleWheel}
          data-lenis-prevent="true"
          className="rounded-3xl sm:rounded-[2.5rem] bg-[#141715]/95 border border-white/10 p-6 sm:p-10 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.85)]"
        >
          {/* Header with Title and Slider Controls */}
          <div className="flex items-center justify-between mb-8 sm:mb-12" dir="ltr">
            <div className="space-y-1">
              <span className="text-xs font-mono font-black tracking-widest text-[#D4E128] uppercase">
                PROJECT DELIVERY TIMELINE
              </span>
              <p className="text-[11px] font-mono text-white/50 hidden sm:block">
                Scroll with mouse wheel or use controls to step through stages
              </p>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={activeIdx === 0}
                aria-label="Previous step"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  activeIdx === 0
                    ? 'border-white/10 text-white/20 cursor-not-allowed'
                    : 'border-white/20 bg-white/5 text-white hover:bg-[#D4E128] hover:text-black hover:border-[#D4E128]'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                disabled={activeIdx === TIMELINE_STAGES.length - 1}
                aria-label="Next step"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  activeIdx === TIMELINE_STAGES.length - 1
                    ? 'border-white/10 text-white/20 cursor-not-allowed'
                    : 'border-white/20 bg-white/5 text-white hover:bg-[#D4E128] hover:text-black hover:border-[#D4E128]'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Timeline Rail at Top */}
          <div className="relative mb-12 sm:mb-16 px-4 sm:px-8 hidden md:block" dir="ltr">
            {/* Background Rail Line */}
            <div className="absolute top-[18px] left-8 right-8 h-1 bg-white/10 rounded-full" />
            
            {/* Active Glowing Progress Rail Line */}
            <motion.div
              className="absolute top-[18px] left-8 h-1 bg-gradient-to-r from-[#D4E128] to-[#EAB308] rounded-full shadow-[0_0_12px_rgba(212,225,40,0.8)]"
              animate={{ 
                width: `${(activeIdx / (TIMELINE_STAGES.length - 1)) * 92 + 8}%` 
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />

            {/* 4 Interactive Timeline Milestone Nodes */}
            <div className="relative flex items-start justify-between z-10">
              {TIMELINE_STAGES.map((stage, idx) => {
                const isActive = idx === activeIdx;
                const isPassed = idx <= activeIdx;

                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveIdx(idx)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    {/* Glowing Circular Milestone Dot */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#D4E128] ring-4 ring-[#D4E128]/30 shadow-[0_0_20px_rgba(212,225,40,0.9)] scale-125 text-black'
                          : isPassed
                          ? 'bg-[#D4E128] text-black shadow-md'
                          : 'bg-[#222724] border-2 border-white/20 text-white/50 group-hover:border-[#D4E128]'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-black' : isPassed ? 'bg-black/60' : 'bg-white/30'}`} />
                    </div>

                    {/* Milestone Titles & Subtitle matching the diagram */}
                    <div className="mt-3.5 text-center space-y-0.5">
                      <h5 className={`text-xs sm:text-sm font-black font-sans tracking-wider transition-colors uppercase ${
                        isActive ? 'text-[#D4E128]' : 'text-white/80 group-hover:text-white'
                      }`}>
                        {stage.stageName}
                      </h5>
                      <p className="text-[11px] font-mono text-white/50">
                        {stage.stageSubtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Step Selector Pills */}
          <div className="md:hidden grid grid-cols-2 gap-2.5 mb-8" dir="rtl">
            {TIMELINE_STAGES.map((stage, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-3 rounded-2xl text-right transition-all flex items-center justify-between border ${
                    isActive
                      ? 'bg-[#D4E128]/15 border-[#D4E128] text-white shadow-lg'
                      : 'bg-black/30 border-white/10 text-white/60'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#D4E128] block">{stage.number}</span>
                    <span className="text-xs font-bold font-sans uppercase">{stage.stageName}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#D4E128]' : 'bg-white/20'}`} />
                </button>
              );
            })}
          </div>

          {/* 4 Slider Cards Grid (Active card prominently highlighted, non-active dimmed) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" dir="ltr">
            {TIMELINE_STAGES.map((stage, idx) => {
              const isActive = idx === activeIdx;
              const IconComp = stage.icon;

              return (
                <motion.div
                  key={stage.id}
                  onClick={() => setActiveIdx(idx)}
                  animate={{
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1.02 : 0.96,
                    y: isActive ? -4 : 0
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left select-none border ${
                    isActive
                      ? 'bg-[#1C201D] border-[#D4E128] shadow-[0_0_35px_rgba(212,225,40,0.25)] ring-1 ring-[#D4E128]'
                      : 'bg-[#161817]/80 border-white/10 hover:border-white/30 hover:opacity-75'
                  }`}
                >
                  <div>
                    {/* Top Resource Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-mono font-black tracking-wider uppercase ${
                        isActive ? 'text-[#D4E128]' : 'text-white/60'
                      }`}>
                        {stage.resourceTag}
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#D4E128] text-black shadow-md' : 'bg-white/5 text-white/60'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Stage Titles */}
                    <div className="space-y-1 mb-3">
                      <h4 className="text-base sm:text-lg font-black font-sans tracking-wide text-white uppercase leading-snug">
                        {stage.stageName}
                      </h4>
                      <p className="text-[11px] text-white/50 font-medium">
                        {stage.resourceSubtitle}
                      </p>
                    </div>

                    {/* Arabic Title & Context Description */}
                    <div className="space-y-2 mb-5" dir="rtl">
                      <h5 className={`text-sm font-bold transition-colors ${
                        isActive ? 'text-[#D4E128]' : 'text-white/90'
                      }`}>
                        {stage.titleAr}
                      </h5>
                      <p className="text-xs text-white/75 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>

                    {/* Deliverables Checklist (Shown cleanly) */}
                    <div className="space-y-2 pt-3 border-t border-white/10 mb-4" dir="rtl">
                      {stage.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-[11px] text-white/80">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isActive ? 'text-[#D4E128]' : 'text-white/40'
                          }`} />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Metric Pill */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs" dir="rtl">
                    <div className={`flex items-center gap-1.5 font-bold ${
                      isActive ? 'text-[#D4E128]' : 'text-white/50'
                    }`}>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-mono">{stage.metric}</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">
                      {stage.progressLabel}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Interactive Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TIMELINE_STAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                aria-label={`Go to step ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIdx ? 'w-8 bg-[#D4E128]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AgileResourcingSection;

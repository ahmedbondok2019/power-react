import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import {
  Users,
  Wrench,
  Package,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const sectionRef = useRef(null);
  const pinnedContentRef = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);
  const isWheelingRef = useRef(false);

  // GSAP ScrollTrigger Pin to lock the viewport and scrub through stages
  useGSAP(() => {
    const totalStages = TIMELINE_STAGES.length; // 4

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${totalStages * 800}`, // Scroll distance for 4 stages
      pin: pinnedContentRef.current,
      pinSpacing: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const rawStage = progress * (totalStages - 1);
        const currentStage = Math.min(Math.round(rawStage), totalStages - 1);
        setActiveIdx(currentStage);
      }
    });

    scrollTriggerInstanceRef.current = st;

    return () => {
      st.kill();
    };
  }, { scope: sectionRef });

  // Direct wheel stepping to smoothly lock & flip between timeline stages
  const handleWheel = (e) => {
    if (isWheelingRef.current) return;

    if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
      const isDown = e.deltaY > 0 || e.deltaX > 0;
      
      // If scrolling down and haven't reached last stage, or scrolling up and haven't reached first stage
      if ((isDown && activeIdx < TIMELINE_STAGES.length - 1) || (!isDown && activeIdx > 0)) {
        e.preventDefault();
        e.stopPropagation();
        
        isWheelingRef.current = true;
        const nextIdx = isDown ? activeIdx + 1 : activeIdx - 1;
        goToStage(nextIdx);

        setTimeout(() => {
          isWheelingRef.current = false;
        }, 400);
      }
    }
  };

  const goToStage = (idx) => {
    setActiveIdx(idx);
    if (scrollTriggerInstanceRef.current) {
      const st = scrollTriggerInstanceRef.current;
      const targetProgress = idx / (TIMELINE_STAGES.length - 1);
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="التوزيع-المرن-للموارد"
      onWheel={handleWheel}
      className="relative w-full bg-[#111312] text-white overflow-hidden select-none border-b border-white/5"
      dir="rtl"
    >
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#D4E128]/5 rounded-full blur-[180px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-[650px] h-[650px] bg-[#2A352F]/35 rounded-full blur-[180px] pointer-events-none -z-0" />

      {/* Pinned Full Viewport Container (Takes full width, no container box or outer borders) */}
      <div 
        ref={pinnedContentRef}
        className="w-full min-h-screen flex flex-col justify-center py-12 sm:py-16 px-4 sm:px-8 lg:px-12 relative z-10"
      >
        <div className="max-w-7xl mx-auto w-full">

          {/* Section Header & Strategic Context */}
          <div className="mb-10 sm:mb-14 text-right space-y-4 max-w-4xl">
            <SectionTitle title="التوزيع المرن للموارد" theme="dark" />

            <div className="space-y-3 text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed font-medium">
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

          {/* Timeline Label */}
          <div className="mb-8 text-left" dir="ltr">
            <span className="text-xs font-mono font-black tracking-widest text-[#D4E128] uppercase">
              PROJECT DELIVERY TIMELINE
            </span>
          </div>

          {/* Full-Width Interactive Timeline Rail */}
          <div className="relative mb-12 sm:mb-16 px-4 sm:px-8 hidden md:block" dir="ltr">
            {/* Background Base Rail Line */}
            <div className="absolute top-[18px] left-8 right-8 h-1 bg-white/10 rounded-full" />
            
            {/* Active Glowing Progress Line */}
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
                    onClick={() => goToStage(idx)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    {/* Glowing Circular Milestone Node */}
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

                    {/* Milestone Titles & Subtitle */}
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
                  onClick={() => goToStage(idx)}
                  className={`p-3.5 rounded-2xl text-right transition-all flex items-center justify-between border ${
                    isActive
                      ? 'bg-[#D4E128]/15 border-[#D4E128] text-white shadow-lg'
                      : 'bg-black/40 border-white/10 text-white/60'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#D4E128] block">{stage.number}</span>
                    <span className="text-xs font-bold font-sans uppercase">{stage.stageName}</span>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#D4E128]' : 'bg-white/20'}`} />
                </button>
              );
            })}
          </div>

          {/* Full-Width 4 Cards Grid (Seamlessly on background without bounding box) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" dir="ltr">
            {TIMELINE_STAGES.map((stage, idx) => {
              const isActive = idx === activeIdx;
              const IconComp = stage.icon;

              return (
                <motion.div
                  key={stage.id}
                  onClick={() => goToStage(idx)}
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    scale: isActive ? 1.02 : 0.96,
                    y: isActive ? -4 : 0
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left select-none border ${
                    isActive
                      ? 'bg-[#181C19] border-[#D4E128] shadow-[0_0_35px_rgba(212,225,40,0.25)] ring-1 ring-[#D4E128]'
                      : 'bg-[#141715]/80 border-white/10 hover:border-white/30 hover:opacity-70'
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
                    <div className="space-y-2 mb-4" dir="rtl">
                      <h5 className={`text-xs sm:text-sm font-bold transition-colors ${
                        isActive ? 'text-[#D4E128]' : 'text-white/90'
                      }`}>
                        {stage.titleAr}
                      </h5>
                      <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                        {stage.description}
                      </p>
                    </div>

                    {/* Deliverables Checklist */}
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

        </div>
      </div>
    </section>
  );
};

export default AgileResourcingSection;

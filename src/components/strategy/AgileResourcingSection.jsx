import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import {
  Users,
  Wrench,
  Package,
  ShieldCheck,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TIMELINE_STAGES = [
  {
    id: 'planning',
    number: '01',
    stageName: 'PLANNING',
    stageSubtitle: 'Resource planning',
    resourceTag: 'RESOURCE 01 · PEOPLE',
    resourceSubtitle: 'Right expertise at the right stage.',
    icon: Users,
    titleAr: 'تخطيط الموارد وجدولة الاحتياج',
    summaryAr: 'تحديد دقيق لحجم الكفاءات والمعدات المطلوبة لكل مرحلة لمنع تكدس العمالة وضمان أعلى إنتاجية.',
    progressPct: 15,
    progressLabel: '15% اكتمال التخطيط',
    metric: '95% كفاءة استغلال الكوادر'
  },
  {
    id: 'design',
    number: '02',
    stageName: 'DESIGN',
    stageSubtitle: 'Technical capacity',
    resourceTag: 'RESOURCE 03 · MATERIALS',
    resourceSubtitle: 'Availability managed around milestones.',
    icon: Package,
    titleAr: 'التصميم الفني والهندسة القيمة',
    summaryAr: 'توظيف نمذجة BIM ثلاثية الأبعاد لتفادي التعارضات واعتماد المواد المعيارية قبل بدء الأعمال الميدانية.',
    progressPct: 40,
    progressLabel: '40% الهندسة والتوريد',
    metric: 'صفر هدر في المواد وسلاسل الإمداد'
  },
  {
    id: 'execution',
    number: '03',
    stageName: 'EXECUTION',
    stageSubtitle: 'Field deployment',
    resourceTag: 'RESOURCE 02 · EQUIPMENT',
    resourceSubtitle: 'Capacity aligned with site demand.',
    icon: Wrench,
    titleAr: 'التنفيذ والانتشار الميداني المرن',
    summaryAr: 'توريد وتشغيل الآلات والمعدات بطاقتها الاستيعابية الكاملة وتوجيه الفرق الهندسية بمرونة وفق وتيرة العمل.',
    progressPct: 80,
    progressLabel: '80% التنفيذ الميداني',
    metric: '40% خفض في تكاليف المعدات'
  },
  {
    id: 'delivery',
    number: '04',
    stageName: 'DELIVERY',
    stageSubtitle: 'Close-out',
    resourceTag: 'PROJECT CLOSE-OUT',
    resourceSubtitle: 'Testing, Commissioning & Handover.',
    icon: ShieldCheck,
    titleAr: 'التشغيل والتسليم النهائي',
    summaryAr: 'إجراء الفحوصات والتشغيل التجريبي الشامل وتسليم المشروع بأعلى معايير الجودة وفي الموعد المحدد.',
    progressPct: 100,
    progressLabel: '100% التسليم المعتمد',
    metric: 'تسليم معتمد بنسبة 100%'
  }
];

const AgileResourcingSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const triggerContainerRef = useRef(null);
  const pinnedTimelineRef = useRef(null);
  const scrollTriggerInstanceRef = useRef(null);

  // GSAP ScrollTrigger Pin: Pins ONLY the Timeline & Cards when they arrive in full view
  useGSAP(() => {
    const totalStages = TIMELINE_STAGES.length; // 4

    const st = ScrollTrigger.create({
      trigger: triggerContainerRef.current,
      start: "top top",
      end: `+=${totalStages * 220}`, // Fast, lightweight, responsive scroll distance
      pin: pinnedTimelineRef.current,
      pinSpacing: true,
      scrub: 0.1, // Instant response to wheel
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
  }, { scope: triggerContainerRef });

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
      id="التوزيع-المرن-للموارد"
      className="relative w-full bg-[#111312] text-white overflow-hidden select-none border-b border-white/5"
      dir="rtl"
    >
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#D4E128]/5 rounded-full blur-[180px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-[650px] h-[650px] bg-[#2A352F]/35 rounded-full blur-[180px] pointer-events-none -z-0" />

      {/* Part 1: Section Header & Context (Normal page scroll) */}
      <div className="max-w-7xl mx-auto px-6 pt-24 sm:pt-32 pb-12 relative z-10">
        <div className="text-right space-y-4 max-w-4xl">
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
      </div>

      {/* Part 2: Pinned Timeline & 4 Cards Viewport Container */}
      <div 
        ref={triggerContainerRef}
        className="relative w-full z-10"
      >
        <div 
          ref={pinnedTimelineRef}
          className="w-full h-screen min-h-[600px] flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto"
        >
          {/* Timeline Header Label */}
          <div className="mb-6 text-left" dir="ltr">
            <span className="text-xs font-mono font-black tracking-widest text-[#D4E128] uppercase">
              PROJECT DELIVERY TIMELINE
            </span>
          </div>

          {/* Full-Width Interactive Timeline Rail */}
          <div className="relative mb-10 sm:mb-14 px-4 sm:px-8 hidden md:block" dir="ltr">
            {/* Background Rail Line */}
            <div className="absolute top-[18px] left-8 right-8 h-1 bg-white/10 rounded-full" />
            
            {/* Active Glowing Progress Line */}
            <motion.div
              className="absolute top-[18px] left-8 h-1 bg-gradient-to-r from-[#D4E128] to-[#EAB308] rounded-full shadow-[0_0_12px_rgba(212,225,40,0.8)]"
              animate={{ 
                width: `${(activeIdx / (TIMELINE_STAGES.length - 1)) * 92 + 8}%` 
              }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
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
          <div className="md:hidden grid grid-cols-2 gap-2.5 mb-6" dir="rtl">
            {TIMELINE_STAGES.map((stage, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={stage.id}
                  onClick={() => goToStage(idx)}
                  className={`p-3 rounded-2xl text-right transition-all flex items-center justify-between border ${
                    isActive
                      ? 'bg-[#D4E128]/15 border-[#D4E128] text-white shadow-lg'
                      : 'bg-black/40 border-white/10 text-white/60'
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

          {/* High-Contrast Clear 4 Cards Grid */}
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
                    scale: isActive ? 1.03 : 0.97,
                    y: isActive ? -6 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left select-none ${
                    isActive
                      ? 'bg-[#191D1A] border-2 border-[#D4E128] shadow-[0_15px_40px_rgba(212,225,40,0.25)] ring-1 ring-[#D4E128]/40'
                      : 'bg-[#141615] border border-white/10 hover:border-white/30 hover:opacity-75'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Resource Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-black tracking-wider uppercase ${
                        isActive ? 'text-[#D4E128]' : 'text-white/60'
                      }`}>
                        {stage.resourceTag}
                      </span>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#D4E128] text-black shadow-md' : 'bg-white/5 text-white/60'
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Stage Title & Subtitle */}
                    <div className="space-y-1">
                      <h4 className="text-lg sm:text-xl font-black font-sans tracking-wide text-white uppercase">
                        {stage.stageName}
                      </h4>
                      <p className="text-xs text-white/60 font-medium">
                        {stage.resourceSubtitle}
                      </p>
                    </div>

                    {/* Arabic Title & Concise Context */}
                    <div className="space-y-1.5 pt-2 border-t border-white/10" dir="rtl">
                      <h5 className={`text-sm sm:text-base font-bold transition-colors ${
                        isActive ? 'text-[#D4E128]' : 'text-white/90'
                      }`}>
                        {stage.titleAr}
                      </h5>
                      <p className="text-xs text-white/75 leading-relaxed">
                        {stage.summaryAr}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Metric & Progress Pill */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs" dir="rtl">
                    <div className={`flex items-center gap-1.5 font-bold ${
                      isActive ? 'text-[#D4E128]' : 'text-white/50'
                    }`}>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="font-mono text-xs">{stage.metric}</span>
                    </div>
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import {
  Users,
  Wrench,
  Package,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  Zap,
  TrendingDown,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const TIMELINE_STAGES = [
  {
    id: 'planning',
    number: '01',
    title: 'PLANNING',
    subtitle: 'Resource planning',
    titleAr: 'تخطيط الموارد وجدولة الاحتياج',
    description: 'تحديد دقيق لحجم الكفاءات والمعدات والمواد المطلوبة لكل مرحلة زمنية، وتوزيعها بناءً على محطات العمل المحددة.',
    percentage: '15%',
    progress: 15,
    focus: 'PEOPLE',
    activeResourceIdx: 0,
    deliverables: [
      'تقدير احتياج العمالة المتخصصة وتوقيت استدعائها',
      'برمجة طلبيات المواد طويلة الأجل (Long-Lead Items)',
      'وضع مصفوفة تسعير تنافسية خالية من تكاليف الاحتفاظ الزائد'
    ]
  },
  {
    id: 'design',
    number: '02',
    title: 'DESIGN',
    subtitle: 'Technical capacity',
    titleAr: 'التصميم الفني والهندسة القيمة',
    description: 'إشراك مهندسي التصميم ونمذجة BIM لتحسين المواصفات وتحديد المعدات المناسبة لاحتياجات المشروع الفعلية.',
    percentage: '40%',
    progress: 40,
    focus: 'MATERIALS',
    activeResourceIdx: 2,
    deliverables: [
      'تحديد مواصفات المواد المعيارية المعتمدة',
      'فحص تعارضات المخططات التنفيذية بدقة',
      'جدولة تصنيع مجاري الهواء وموزعات التكييف بمصانعنا'
    ]
  },
  {
    id: 'execution',
    number: '03',
    title: 'EXECUTION',
    subtitle: 'Field deployment',
    titleAr: 'التنفيذ والانتشار الميداني المرن',
    description: 'استدعاء الفرق الهندسية وتوريد الآلات والمعدات الثقيلة في موعد العمل المباشر لتجنب فترات التعطيل والهدر المالي.',
    percentage: '80%',
    progress: 80,
    focus: 'EQUIPMENT',
    activeResourceIdx: 1,
    deliverables: [
      'تشغيل الآلات والمعدات بطاقة استيعابية 100%',
      'استلام المواد وتوريدها مباشرة إلى خطوط التركيب (JIT)',
      'توجيه الفرق التخصصية بين قطاعات المشروع بمرونة عالية'
    ]
  },
  {
    id: 'delivery',
    number: '04',
    title: 'DELIVERY',
    subtitle: 'Close-out',
    titleAr: 'التشغيل والتسليم النهائي (Close-out)',
    description: 'إعادة توزيع الموارد المتبقية وسحب المعدات الميدانية فور إتمام الأعمال لتقليل تكاليف الإغلاق والتسليم.',
    percentage: '100%',
    progress: 100,
    focus: 'PEOPLE',
    activeResourceIdx: 0,
    deliverables: [
      'إجراء اختبارات الفحص والتشغيل التجريبي (Testing & Commissioning)',
      'تسليم المشروع وفق معايير الجودة المعتمدة وفي الوقت المحدد',
      'تحرير المعدات والفرق للمشاريع التنموية التالية'
    ]
  }
];

const RESOURCE_CARDS = [
  {
    id: 'people',
    resourceNum: 'RESOURCE 01',
    title: 'PEOPLE',
    subtitle: 'Right expertise at the right stage.',
    titleAr: 'الكوادر والخبرات البشرية',
    icon: Users,
    desc: 'توفير الكفاءات الهندسية والفنية المتخصصة عند الحاجة الفعلية فقط، مما يمنع تكدس العمالة ويرفع الإنتاجية الفردية.',
    metric: '95% كفاءة استغلال الكوادر'
  },
  {
    id: 'equipment',
    resourceNum: 'RESOURCE 02',
    title: 'EQUIPMENT',
    subtitle: 'Capacity aligned with site demand.',
    titleAr: 'المعدات والآلات التخصصية',
    icon: Wrench,
    desc: 'مواءمة سعة الآلات والمعدات الثقيلة مع متطلبات الموقع الميدانية، لتقليل تكاليف الاستئجار ورسوم الوقوف غير المستغل.',
    metric: '40% خفض في تكلفة المعدات'
  },
  {
    id: 'materials',
    resourceNum: 'RESOURCE 03',
    title: 'MATERIALS',
    subtitle: 'Availability managed around milestones.',
    titleAr: 'المواد وسلاسل الإمداد',
    icon: Package,
    desc: 'إدارة توريد المواد وفق محطات الإنجاز الميدانية (Just-in-Time)، لتفادي التلف وتكاليف التخزين الموقعي غير الضرورية.',
    metric: 'صفر هدر في التخزين الموقعي'
  }
];

const AgileResourcingSection = () => {
  const [activeStageId, setActiveStageId] = useState('planning');
  const activeStage = TIMELINE_STAGES.find(s => s.id === activeStageId) || TIMELINE_STAGES[0];

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

        {/* Project Delivery Timeline Container */}
        <div className="rounded-3xl sm:rounded-[2.5rem] bg-[#171A18] border border-white/10 p-6 sm:p-10 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.85)] mb-12">
          
          {/* Timeline Title Header */}
          <div className="mb-10 text-left" dir="ltr">
            <span className="text-xs font-mono font-black tracking-widest text-[#D4E128] uppercase">
              PROJECT DELIVERY TIMELINE
            </span>
          </div>

          {/* Interactive Horizontal Timeline Rail (Desktop / Tablet) */}
          <div className="relative mb-14 px-4 sm:px-8 hidden md:block" dir="ltr">
            
            {/* Background Base Rail Line */}
            <div className="absolute top-[18px] left-8 right-8 h-1 bg-white/10 rounded-full" />
            
            {/* Active Glowing Progress Rail Line */}
            <motion.div
              className="absolute top-[18px] left-8 h-1 bg-gradient-to-r from-[#D4E128] to-[#EAB308] rounded-full shadow-[0_0_12px_rgba(212,225,40,0.8)]"
              initial={{ width: '15%' }}
              animate={{ width: `${activeStage.progress}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            {/* 4 Interactive Timeline Milestone Nodes */}
            <div className="relative flex items-start justify-between z-10">
              {TIMELINE_STAGES.map((stage, idx) => {
                const isActive = stage.id === activeStageId;
                const isPassed = stage.progress <= activeStage.progress;

                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    {/* Glowing Circular Milestone Dot */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400 ${
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
                    <div className="mt-4 text-center space-y-0.5">
                      <h5 className={`text-xs sm:text-sm font-black font-sans tracking-wider transition-colors uppercase ${
                        isActive ? 'text-[#D4E128]' : 'text-white/90 group-hover:text-white'
                      }`}>
                        {stage.title}
                      </h5>
                      <p className="text-[11px] font-mono text-white/50">
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical Responsive Timeline Rail */}
          <div className="md:hidden space-y-4 mb-10" dir="rtl">
            <div className="grid grid-cols-2 gap-2.5">
              {TIMELINE_STAGES.map((stage) => {
                const isActive = stage.id === activeStageId;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    className={`p-3.5 rounded-2xl text-right transition-all flex items-center justify-between border ${
                      isActive
                        ? 'bg-[#D4E128]/15 border-[#D4E128] text-white shadow-lg'
                        : 'bg-black/30 border-white/10 text-white/70'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#D4E128] block">{stage.number}</span>
                      <span className="text-xs font-bold font-sans uppercase">{stage.title}</span>
                    </div>
                    <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#D4E128]' : 'bg-white/20'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Description & Deliverables Box */}
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="p-6 rounded-2xl bg-black/40 border border-white/10 text-right space-y-4"
            dir="rtl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold text-[#D4E128]">
                  المرحلة {activeStage.number}: {activeStage.title} ({activeStage.subtitle})
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  {activeStage.titleAr}
                </h4>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#D4E128]/10 border border-[#D4E128]/30 text-xs font-mono font-bold text-[#D4E128]">
                نسبة الإنجاز: {activeStage.percentage}
              </span>
            </div>

            <p className="text-sm text-white/80 leading-relaxed font-medium">
              {activeStage.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {activeStage.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-[#D4E128] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* 3 Dark Resource Pillars Cards matching diagram exactly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" dir="ltr">
          {RESOURCE_CARDS.map((card, idx) => {
            const IconComp = card.icon;
            const isHighlight = activeStage.activeResourceIdx === idx;

            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-400 shadow-2xl text-left border ${
                  isHighlight
                    ? 'bg-[#1D221F] border-[#D4E128] shadow-[0_0_30px_rgba(212,225,40,0.2)] ring-1 ring-[#D4E128]'
                    : 'bg-[#181B19] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  {/* Top Badge matching design */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-black text-[#D4E128] tracking-widest uppercase">
                      {card.resourceNum}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4E128]">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle matching design */}
                  <div className="space-y-1 mb-4">
                    <h4 className="text-lg sm:text-xl font-black font-sans tracking-wide text-white uppercase">
                      {card.title}
                    </h4>
                    <p className="text-xs text-white/60 font-medium">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Arabic Context Description */}
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-6" dir="rtl">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Metric Tag */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs" dir="rtl">
                  <div className="flex items-center gap-1.5 text-[#D4E128] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{card.metric}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AgileResourcingSection;

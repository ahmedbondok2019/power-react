import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import {
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Clock,
  Coins,
  Cpu,
  CheckCircle2,
  Workflow,
  ArrowLeft,
  Layers,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const STRATEGY_NODES = [
  {
    id: 'lean-management',
    number: '01',
    title: 'LEAN MANAGEMENT',
    titleAr: 'الإدارة الرشيقة والحد من الهدر',
    position: 'top',
    bgColor: '#FEF08A', // Pastel Warm Yellow
    textColor: '#1C1917',
    borderColor: '#FACC15',
    icon: Workflow,
    summary: 'إزالة الفاقد في الوقت والمواد والمجهود لرفع كفاءة وسرعة التنفيذ الميداني.',
    details: [
      'تطبيق مبادئ 5S في تنظيم ومراقبة مواقع العمل الإنشائية',
      'تقليص فترات التوقف بين فرق الأعمال المختلفة',
      'تحسين كفاءة استخدام المعدات والآليات الثقيلة بنسبة 30%'
    ],
    kpi: '30% تقليص في الهدر'
  },
  {
    id: 'cash-flow',
    number: '02',
    title: 'TWO-WAY CASH FLOW ANALYSIS',
    titleAr: 'تحليل التدفق النقدي ثنائي الاتجاه',
    position: 'top-right',
    bgColor: '#BAE6FD', // Pastel Sky Blue
    textColor: '#0C4A6E',
    borderColor: '#38BDF8',
    icon: Coins,
    summary: 'موازنة دقيقة بين الالتزامات والمستخلصات لضمان استقرار السيولة واستمرارية التوريد دون انقطاع.',
    details: [
      'توقع التدفقات النقدية الداخلة والخارجة بدقة أسبوعية',
      'إدارة دفعات الموردين والمصانع التابعة بشكل استباقي',
      'حماية وتأمين استمرارية سلاسل التوريد ضد أي تقلبات مالية'
    ],
    kpi: 'استقرار مالي 100%'
  },
  {
    id: 'safety-risk',
    number: '03',
    title: 'SAFETY RISK ANALYSIS',
    titleAr: 'تحليل مخاطر السلامة المهنية',
    position: 'bottom-right',
    bgColor: '#FECDD3', // Pastel Rose Pink
    textColor: '#881337',
    borderColor: '#FB7185',
    icon: ShieldAlert,
    summary: 'تقييم شامل واستباقي لمخاطر السلامة والبيئة المهنية لحماية الكوادر والأصول والمشاريع.',
    details: [
      'تطبيق أعلى معايير OSHA و OPITO و ISO 45001',
      'مصفوفة تقييم المخاطر اليومية قبل بدء الأعمال الحرجة',
      'سجل أمان يفوق 2 مليون ساعة عمل بدون حوادث مفقودة'
    ],
    kpi: 'صفر حوادث مهنية (Zero LTI)'
  },
  {
    id: 'lead-time',
    number: '04',
    title: 'LEAD TIME ANALYSIS & REDISTRIBUTION',
    titleAr: 'تحليل وإعادة توزيع فترات التوريد',
    position: 'bottom',
    bgColor: '#A7F3D0', // Pastel Mint Green
    textColor: '#064E3B',
    borderColor: '#34D399',
    icon: Clock,
    summary: 'إدارة الجدول الزمني للمشتريات والتصنيع المباشر لتسليم المواد قبل موعد تركيبها الميداني.',
    details: [
      'برمجة أوامر التوريد للمعدات طويلة الأمد (Long Lead Items)',
      'تنسيق لوجستي فوري مع مصانعنا لتصنيع مجاري الهواء والموزعات',
      'تفادي أي تأخيرات ناجمة عن الشحن أو التخليص الجمركي'
    ],
    kpi: '40% تسريع في زمن التوريد'
  },
  {
    id: 'value-engineering',
    number: '05',
    title: 'VALUE ENGINEERING',
    titleAr: 'الهندسة القيمة',
    position: 'bottom-left',
    bgColor: '#BBF7D0', // Pastel Sage Green
    textColor: '#14532D',
    borderColor: '#4ADE80',
    icon: TrendingUp,
    summary: 'ابتكار حلول وبدائل هندسية ذكية ترفع الكفاءة التشغيلية وتخفض التكاليف الرأسمالية دون المساس بالجودة.',
    details: [
      'إعادة دراسة المخططات واقتراح بدائل مواد متكافئة وموثوقة',
      'تحسين مسارات شبكات التكييف والتغذية لتقليل أطوال الأنابيب',
      'خفض تكاليف التشغيل والصيانة (OPEX) للأصول المنفذة'
    ],
    kpi: '20% توفير في تكلفة الدورة التشغيلية'
  },
  {
    id: 'agile-resourcing',
    number: '06',
    title: 'AGILE RESOURCING',
    titleAr: 'التخصيص المرن للموارد',
    position: 'top-left',
    bgColor: '#DDD6FE', // Pastel Lavender Purple
    textColor: '#4C1D95',
    borderColor: '#A78BFA',
    icon: Cpu,
    summary: 'مرونة عالية في توجيه الكوادر الفنية والمعدات التخصصية بين مراحل ومواقع العمل وفق أولويات الإنجاز.',
    details: [
      'إعادة توجيه الفرق الميدانية بكفاءة عند وصول المعدات الرئيسية',
      'مرونة في زيادة ساعات العمل بنظام الورديات المتتابعة',
      'نظام مركزي لتتبع وتوزيع الآلات والمعدات بين مشاريع المملكة'
    ],
    kpi: 'استجابة ميدانية فائقة'
  }
];

const SmartStrategyFlowchart = () => {
  const [activeNodeId, setActiveNodeId] = useState('lean-management');

  const activeNode = STRATEGY_NODES.find(n => n.id === activeNodeId) || STRATEGY_NODES[0];

  return (
    <section 
      id="النهج-الاستراتيجي"
      className="relative w-full bg-[#111312] text-white pt-56 sm:pt-64 pb-24 sm:pb-32 overflow-hidden select-none border-b border-white/5"
      dir="rtl"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D4E128]/5 rounded-full blur-[180px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#2A352F]/40 rounded-full blur-[150px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center w-full mb-14 sm:mb-20">
          <SectionTitle title="منهجية إدارة المشاريع الذكية" theme="dark" />
          <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-3xl mt-4 leading-relaxed font-medium">
            خريطة التدفق الاستراتيجي المتكاملة التي تحكم كافة مراحل تنفيذ مشاريعنا، وتربط بين التخطيط الذكي والكفاءة التشغيلية لضمان أعلى معايير الجودة والسلامة. (اضغط على أي ركن للاطلاع على التفاصيل)
          </p>
        </div>

        {/* Desktop Mindmap Flowchart Graphic Layout */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[580px] sm:min-h-[640px] hidden md:flex items-center justify-center p-4">

          {/* SVG Connector Lines Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="neonGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4E128" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#EAB308" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Central Node Bounds in SVG coordinates: center=(500, 300), width=280, height=140 */}
            {/* Top Connector: (500, 230) -> (500, 90) */}
            <motion.path
              d="M 500 230 L 500 90"
              fill="none"
              stroke={activeNodeId === 'lean-management' ? '#D4E128' : '#D4E12888'}
              strokeWidth={activeNodeId === 'lean-management' ? 4.5 : 2.5}
              filter={activeNodeId === 'lean-management' ? 'url(#glowFilter)' : undefined}
              className="transition-all duration-300"
            />

            {/* Top-Right Connector: (640, 260) -> (800, 140) */}
            <motion.path
              d="M 640 260 C 720 260, 740 140, 800 140"
              fill="none"
              stroke={activeNodeId === 'cash-flow' ? '#D4E128' : '#D4E12888'}
              strokeWidth={activeNodeId === 'cash-flow' ? 4.5 : 2.5}
              filter={activeNodeId === 'cash-flow' ? 'url(#glowFilter)' : undefined}
              className="transition-all duration-300"
            />

            {/* Bottom-Right Connector: (640, 340) -> (800, 460) */}
            <motion.path
              d="M 640 340 C 720 340, 740 460, 800 460"
              fill="none"
              stroke={activeNodeId === 'safety-risk' ? '#D4E128' : '#D4E12888'}
              strokeWidth={activeNodeId === 'safety-risk' ? 4.5 : 2.5}
              filter={activeNodeId === 'safety-risk' ? 'url(#glowFilter)' : undefined}
              className="transition-all duration-300"
            />

            {/* Bottom Connector: (500, 370) -> (500, 510) */}
            <motion.path
              d="M 500 370 L 500 510"
              fill="none"
              stroke={activeNodeId === 'lead-time' ? '#D4E128' : '#D4E12888'}
              strokeWidth={activeNodeId === 'lead-time' ? 4.5 : 2.5}
              filter={activeNodeId === 'lead-time' ? 'url(#glowFilter)' : undefined}
              className="transition-all duration-300"
            />

            {/* Bottom-Left Connector: (360, 340) -> (200, 460) */}
            <motion.path
              d="M 360 340 C 280 340, 260 460, 200 460"
              fill="none"
              stroke={activeNodeId === 'value-engineering' ? '#D4E128' : '#D4E12888'}
              strokeWidth={activeNodeId === 'value-engineering' ? 4.5 : 2.5}
              filter={activeNodeId === 'value-engineering' ? 'url(#glowFilter)' : undefined}
              className="transition-all duration-300"
            />

            {/* Top-Left Connector: (360, 260) -> (200, 140) */}
            <motion.path
              d="M 360 260 C 280 260, 260 140, 200 140"
              fill="none"
              stroke={activeNodeId === 'agile-resourcing' ? '#D4E128' : '#D4E12888'}
              strokeWidth={activeNodeId === 'agile-resourcing' ? 4.5 : 2.5}
              filter={activeNodeId === 'agile-resourcing' ? 'url(#glowFilter)' : undefined}
              className="transition-all duration-300"
            />
          </svg>

          {/* Central Core Node (Dark green with neon border & corner brackets) */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative z-10 w-[300px] sm:w-[340px] h-[150px] sm:h-[160px] rounded-3xl bg-[#1C3322] border-2 border-[#D4E128] shadow-[0_0_40px_rgba(212,225,40,0.25)] p-5 flex flex-col items-center justify-center text-center select-none"
          >
            {/* Top-Left Yellow Bracket */}
            <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#D4E128]" />
            {/* Bottom-Right Yellow Bracket */}
            <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#D4E128]" />

            <span className="text-[11px] font-mono font-bold tracking-widest text-[#D4E128] uppercase mb-1.5 opacity-90">
              CORE APPROACH
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white leading-snug tracking-wide font-sans">
              SMART PROJECT <br />
              MANAGEMENT <br />
              STRATEGIES
            </h3>
          </motion.div>

          {/* Node 1: Top (Lean Management) */}
          <motion.div
            onClick={() => setActiveNodeId('lean-management')}
            whileHover={{ scale: 1.08, y: -4 }}
            className={`absolute top-2 left-1/2 -translate-x-1/2 z-20 cursor-pointer rounded-2xl px-6 py-3.5 shadow-xl transition-all duration-300 ${
              activeNodeId === 'lean-management' 
                ? 'ring-4 ring-[#D4E128] scale-105 shadow-[0_0_25px_rgba(254,240,138,0.6)]' 
                : 'opacity-90 hover:opacity-100'
            }`}
            style={{ backgroundColor: STRATEGY_NODES[0].bgColor, color: STRATEGY_NODES[0].textColor }}
          >
            <div className="text-center font-extrabold text-xs sm:text-sm font-sans tracking-wide">
              {STRATEGY_NODES[0].title}
            </div>
          </motion.div>

          {/* Node 2: Top-Right (Two-Way Cash Flow Analysis) */}
          <motion.div
            onClick={() => setActiveNodeId('cash-flow')}
            whileHover={{ scale: 1.08 }}
            className={`absolute top-12 left-4 sm:left-10 z-20 cursor-pointer rounded-2xl px-5 sm:px-6 py-3.5 shadow-xl transition-all duration-300 ${
              activeNodeId === 'cash-flow' 
                ? 'ring-4 ring-[#D4E128] scale-105 shadow-[0_0_25px_rgba(186,230,253,0.6)]' 
                : 'opacity-90 hover:opacity-100'
            }`}
            style={{ backgroundColor: STRATEGY_NODES[1].bgColor, color: STRATEGY_NODES[1].textColor }}
          >
            <div className="text-center font-extrabold text-xs sm:text-sm font-sans tracking-wide">
              TWO-WAY CASH <br /> FLOW ANALYSIS
            </div>
          </motion.div>

          {/* Node 3: Bottom-Right (Safety Risk Analysis) */}
          <motion.div
            onClick={() => setActiveNodeId('safety-risk')}
            whileHover={{ scale: 1.08 }}
            className={`absolute bottom-12 left-4 sm:left-10 z-20 cursor-pointer rounded-2xl px-5 sm:px-6 py-3.5 shadow-xl transition-all duration-300 ${
              activeNodeId === 'safety-risk' 
                ? 'ring-4 ring-[#D4E128] scale-105 shadow-[0_0_25px_rgba(254,205,211,0.6)]' 
                : 'opacity-90 hover:opacity-100'
            }`}
            style={{ backgroundColor: STRATEGY_NODES[2].bgColor, color: STRATEGY_NODES[2].textColor }}
          >
            <div className="text-center font-extrabold text-xs sm:text-sm font-sans tracking-wide">
              SAFETY RISK <br /> ANALYSIS
            </div>
          </motion.div>

          {/* Node 4: Bottom (Lead Time Analysis & Redistribution) */}
          <motion.div
            onClick={() => setActiveNodeId('lead-time')}
            whileHover={{ scale: 1.08, y: 4 }}
            className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-20 cursor-pointer rounded-2xl px-6 py-3.5 shadow-xl transition-all duration-300 ${
              activeNodeId === 'lead-time' 
                ? 'ring-4 ring-[#D4E128] scale-105 shadow-[0_0_25px_rgba(167,243,208,0.6)]' 
                : 'opacity-90 hover:opacity-100'
            }`}
            style={{ backgroundColor: STRATEGY_NODES[3].bgColor, color: STRATEGY_NODES[3].textColor }}
          >
            <div className="text-center font-extrabold text-xs sm:text-sm font-sans tracking-wide">
              LEAD TIME <br /> ANALYSIS &amp; REDISTRIBUTION
            </div>
          </motion.div>

          {/* Node 5: Bottom-Left (Value Engineering) */}
          <motion.div
            onClick={() => setActiveNodeId('value-engineering')}
            whileHover={{ scale: 1.08 }}
            className={`absolute bottom-12 right-4 sm:right-10 z-20 cursor-pointer rounded-2xl px-5 sm:px-6 py-3.5 shadow-xl transition-all duration-300 ${
              activeNodeId === 'value-engineering' 
                ? 'ring-4 ring-[#D4E128] scale-105 shadow-[0_0_25px_rgba(187,247,208,0.6)]' 
                : 'opacity-90 hover:opacity-100'
            }`}
            style={{ backgroundColor: STRATEGY_NODES[4].bgColor, color: STRATEGY_NODES[4].textColor }}
          >
            <div className="text-center font-extrabold text-xs sm:text-sm font-sans tracking-wide">
              VALUE <br /> ENGINEERING
            </div>
          </motion.div>

          {/* Node 6: Top-Left (Agile Resourcing) */}
          <motion.div
            onClick={() => setActiveNodeId('agile-resourcing')}
            whileHover={{ scale: 1.08 }}
            className={`absolute top-12 right-4 sm:right-10 z-20 cursor-pointer rounded-2xl px-5 sm:px-6 py-3.5 shadow-xl transition-all duration-300 ${
              activeNodeId === 'agile-resourcing' 
                ? 'ring-4 ring-[#D4E128] scale-105 shadow-[0_0_25px_rgba(221,214,254,0.6)]' 
                : 'opacity-90 hover:opacity-100'
            }`}
            style={{ backgroundColor: STRATEGY_NODES[5].bgColor, color: STRATEGY_NODES[5].textColor }}
          >
            <div className="text-center font-extrabold text-xs sm:text-sm font-sans tracking-wide">
              AGILE <br /> RESOURCING
            </div>
          </motion.div>

        </div>

        {/* Mobile / Tablet Interactive Radial Carousel & Grid */}
        <div className="md:hidden space-y-6">
          
          {/* Mobile Central Node */}
          <div className="relative w-full max-w-sm mx-auto rounded-3xl bg-[#1C3322] border-2 border-[#D4E128] shadow-xl p-5 flex flex-col items-center justify-center text-center">
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#D4E128]" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#D4E128]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4E128] uppercase mb-1">
              CORE APPROACH
            </span>
            <h3 className="text-base font-black text-white">
              SMART PROJECT MANAGEMENT STRATEGIES
            </h3>
          </div>

          {/* Mobile Interactive 6 Pills Grid */}
          <div className="grid grid-cols-2 gap-3">
            {STRATEGY_NODES.map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                style={{ backgroundColor: node.bgColor, color: node.textColor }}
                className={`p-3.5 rounded-2xl text-center font-bold text-xs shadow-md transition-all ${
                  activeNodeId === node.id 
                    ? 'ring-3 ring-[#D4E128] scale-[1.03]' 
                    : 'opacity-85 hover:opacity-100'
                }`}
              >
                {node.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Active Pillar Detail Card (Shows full corporate explanation of selected node) */}
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 sm:mt-16 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#181B19] to-[#141615] border border-white/15 p-6 sm:p-8 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-center gap-4 text-right">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner shrink-0"
                style={{ backgroundColor: activeNode.bgColor, color: activeNode.textColor }}
              >
                <activeNode.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#D4E128]">
                  {activeNode.title}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {activeNode.titleAr}
                </h4>
              </div>
            </div>

            <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#D4E128] shrink-0">
              {activeNode.kpi}
            </div>
          </div>

          <div className="mt-5 space-y-4 text-right">
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
              {activeNode.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {activeNode.details.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-[#D4E128] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SmartStrategyFlowchart;

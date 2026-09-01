import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import SmartStrategyFlowchart from '../components/strategy/SmartStrategyFlowchart';
import LeanManagementSection from '../components/strategy/LeanManagementSection';
import TwoWayCashFlowSection from '../components/strategy/TwoWayCashFlowSection';
import AgileResourcingSection from '../components/strategy/AgileResourcingSection';
import {
  Target,
  Compass,
  Cpu,
  ShieldCheck,
  Zap,
  TrendingUp,
  Workflow,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Layers,
  BarChart3,
  Award,
  Globe2,
  Clock,
  FileCheck
} from 'lucide-react';

const STRATEGIC_PILLARS = [
  {
    id: 'pillar-1',
    number: '01',
    icon: Compass,
    title: 'التخطيط الذكي والهندسة القيمة',
    titleEn: 'Smart Planning & Value Engineering',
    description: 'تطبيق دراسات الهندسة القيمة المتقدمة لتحسين كفاءة التكاليف مع تعظيم الأداء والجودة، بالاعتماد على أحدث برمجيات النمذجة ثلاثية الأبعاد (BIM).',
    points: [
      'تحليل وتقييم المخططات لتقليل الهدر التشغيلي',
      'تطبيق نمذجة معلومات البناء BIM لتفادي التعارضات',
      'تحسين التكلفة الإجمالية لدورة حياة المشروع (LCC)'
    ]
  },
  {
    id: 'pillar-2',
    number: '02',
    icon: Workflow,
    title: 'التكامل التشغيلي وسلاسل الإمداد المباشرة',
    titleEn: 'Integrated Supply Chain & Direct Manufacturing',
    description: 'تحقيق أقصى درجات الاستقلالية والسرعة عبر مصانعنا التابعة (POWER DUCT, KIENZLER) والوكالات الحصرية لكبرى الشركات العالمية.',
    points: [
      'تصنيع مباشر لمجاري الهواء وموزعات التكييف',
      'توريد مباشر لأنظمة الضخ والمحابس ومبردات الشيلر',
      'تقليص فترات الانتظار والتسليم اللوجستي بنسبة 40%'
    ]
  },
  {
    id: 'pillar-3',
    number: '03',
    icon: ShieldCheck,
    title: 'الحوكمة الصارمة وإدارة المخاطر',
    titleEn: 'Governance & Proactive Risk Management',
    description: 'منظومة حوكمة شاملة تضمن الشفافية والامتثال ومراقبة مسارات التنفيذ عبر مصفوفات مخاطر استباقية تحمي استثمارات العملاء.',
    points: [
      'متابعة ومطابقة الجداول الزمنية بنظام المسار الحرج (CPM)',
      'تطبيق أعلى بروتوكولات السلامة المهنية (OSHA / OPITO)',
      'تقارير أداء دورية وشفافة للإدارة التنفيذية والعميل'
    ]
  },
  {
    id: 'pillar-4',
    number: '04',
    icon: Zap,
    title: 'الاستدامة والحلول الموفرة للطاقة',
    titleEn: 'Sustainability & Green Building Solutions',
    description: 'دمج تقنيات البناء المستدام وأنظمة الطاقة المتجددة وترشيد استهلاك الكهرباء والمياه تماشياً مع معايير ومستهدفات رؤية المملكة 2030.',
    points: [
      'اعتماد حلول التكييف ذات الكفاءة الموسمية العالية',
      'أنظمة إدارة المباني الذكية (BMS) للتحكم في استهلاك الطاقة',
      'إعادة تدوير المخلفات الإنشائية والحد من الانبعاثات'
    ]
  },
  {
    id: 'pillar-5',
    number: '05',
    icon: Award,
    title: 'الضبط الهندسي الشامل وضمان الجودة (QA/QC)',
    titleEn: 'Quality Assurance & Quality Control (QA/QC)',
    description: 'منظومة فحص وتدقيق صارمة في كافة مراحل التوريد والتركيب والتشغيل وفق معايير الجودة العالمية ISO 9001 و كود البناء السعودي.',
    points: [
      'فحوصات واختبارات مخبرية دورية لكافة المواد الموردة',
      'إجراءات فحص ما قبل التسليم (Commissioning Tests)',
      'توثيق هندسي دقيق لشهادات المطابقة وضمانات المصنع'
    ]
  },
  {
    id: 'pillar-6',
    number: '06',
    icon: TrendingUp,
    title: 'الاستثمار في الكفاءات والتحول الرقمي',
    titleEn: 'Human Capital & Digital Transformation',
    description: 'تمكين وتطوير الكوادر الوطنية الشابة وتزويدها بأحدث الأدوات والأنظمة الرقمية السحابية لإدارة المشاريع بكفاءة استثنائية.',
    points: [
      'برامج تدريب وتأهيل مستمرة للمهندسين والفنيين',
      'أتمتة دورات العمل وإدارة الوثائق سحابياً',
      'تحفيز الابتكار الهندسي وتطوير الحلول الميدانية'
    ]
  }
];

const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'الدراسة والاستكشاف الفني',
    subtitle: 'Discovery & Feasibility',
    description: 'تحليل متطلبات المشروع بدقة، دراسة الموقع، وتقييم المتطلبات الفنية والجدوى الاقتصادية والجدول الزمني المستهدف.'
  },
  {
    step: '02',
    title: 'الهندسة والتخطيط ونمذجة BIM',
    subtitle: 'Engineering & Clash Detection',
    description: 'إعداد المخططات التنفيذية، فحص ومطابقة الأنظمة لتفادي أي تعارضات ميدانية، وتحديد خطط التوريد والتنفيذ.'
  },
  {
    step: '03',
    title: 'التصنيع والتوريد اللوجستي المباشر',
    subtitle: 'Direct Fabrication & Supply',
    description: 'بدء عمليات التصنيع المباشر في مصانعنا وتوريد المعدات المعتمدة من الشركاء العالميين عبر خطوط إمداد سريعة.'
  },
  {
    step: '04',
    title: 'التنفيذ الميداني وضبط الجودة',
    subtitle: 'Field Execution & QA/QC',
    description: 'إشراف هندسي مستمر، تنفيذ دقيق لشبكات البناء والمقاولات، وتطبيق صارم لمعايير الجودة والسلامة المهنية.'
  },
  {
    step: '05',
    title: 'الاختبار والتشغيل والتسليم النهائي',
    subtitle: 'Testing, Commissioning & Handover',
    description: 'إجراء كافة الاختبارات التشغيلية الشاملة وتدريب فرق التشغيل وتسليم المشروع وفق المعايير الزمنية والمواصفات.'
  }
];

const Strategy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black">

      {/* Hero Section matching the exact design and stats cards */}
      <Hero
        id="strategy-hero"
        badge="استراتيجيتنا"
        title={
          <>
            منهجية ذكية لإدارة المشاريع <br />
            وتحقيق نتائج تتجاوز التوقعات
          </>
        }
        subtitle={
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl text-right font-medium">
            نعتمد في إدارة مشاريعنا على منهجية متكاملة تجمع بين التخطيط الذكي، كفاءة الموارد، الهندسة القيمة، إدارة المخاطر، والتحكم في الوقت والتكاليف، لضمان تنفيذ أكثر كفاءة وجودة واستدامة.
          </p>
        }
        buttonText="تعرف علينا"
        buttonLink="/about"
        bgImage="/strategy-hero-bg.jpg"
        showVisionLogo={false}
        showStatsCards={true}
        stats={[
          { number: 16, label: "عاماً من الخبرة" },
          { number: 50, label: "مشروعاً مكتمل" },
          { number: 10, label: "مدن رئيسية" }
        ]}
      />

      {/* Section 2: Interactive Smart Strategy Flowchart (خريطة التدفق الاستراتيجي التفاعلية) */}
      <SmartStrategyFlowchart />

      {/* Section 3: Lean Management (إدارة رشيدة مع خريطة React Flow) */}
      <LeanManagementSection />

      {/* Section 4: Two-Way Cash Flow Analysis (تحليل التدفق النقدي ذو الاتجاهين مع Line Chart) */}
      <TwoWayCashFlowSection />

      {/* Section 5: Agile Resourcing (التوزيع المرن للموارد مع Interactive Timeline) */}
      <AgileResourcingSection />

      {/* Main Strategy Content Area (Pillars, Methodology, Alignment, CTA) */}
      <section className="relative py-24 sm:py-32 overflow-hidden" dir="rtl">

        {/* Ambient Lighting Background */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#FFB800]/5 rounded-full blur-[160px] pointer-events-none -z-0" />
        <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-[#2A352F]/30 rounded-full blur-[160px] pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Section 1: Strategic Pillars (الركائز الاستراتيجية) */}
          <div className="mb-24">
            <div className="text-right mb-12 sm:mb-16">
              <SectionTitle title="ركائز استراتيجيتنا المؤسسية" theme="dark" />
              <p className="text-white/70 text-sm sm:text-base lg:text-lg mt-4 max-w-3xl leading-relaxed font-medium">
                تستند رؤيتنا الاستراتيجية في مجموعة باور على أسس متينة تضمن تقديم قيمة استثنائية لشركائنا والمساهمة الفعالة في النهضة العمرانية للمملكة.
              </p>
            </div>

            {/* 6 Strategic Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {STRATEGIC_PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;

                return (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                    className="group relative rounded-3xl bg-[#1A1D1B] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#FFB800]/50 transition-all duration-400 hover:-translate-y-2 shadow-2xl"
                  >
                    <div>
                      {/* Top Header: Number & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800] group-hover:scale-110 transition-transform shadow-inner">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-white/20 font-mono group-hover:text-[#FFB800]/40 transition-colors">
                          {pillar.number}
                        </span>
                      </div>

                      {/* Titles */}
                      <div className="space-y-1.5 mb-4 text-right">
                        <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-white/50 font-mono">
                          {pillar.titleEn}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6 text-right">
                        {pillar.description}
                      </p>

                      {/* Key Points */}
                      <div className="space-y-2.5 pt-4 border-t border-white/10 text-right">
                        {pillar.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2.5 text-xs text-white/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB800] shrink-0 mt-0.5" />
                            <span className="leading-tight">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Methodology & Execution Lifecycle (منهجية التنفيذ المتكاملة) */}
          <div className="mb-24">
            <div className="text-right mb-12 sm:mb-16">
              <SectionTitle title="منهجية العمل ودورة حياة المشروع" theme="dark" />
              <p className="text-white/70 text-sm sm:text-base lg:text-lg mt-4 max-w-3xl leading-relaxed font-medium">
                مسار عمل هندسي دقيق ومنظم يضمن إدارة المشاريع من الفكرة الأولية حتى التسليم والتشغيل النهائي بأعلى كفاءة.
              </p>
            </div>

            {/* Process Flow Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {METHODOLOGY_STEPS.map((step, sIdx) => (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: sIdx * 0.1 }}
                  className="relative rounded-2xl bg-[#181A19] border border-white/10 p-6 flex flex-col justify-between hover:border-[#FFB800]/50 transition-all duration-300 group shadow-lg"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFB800] font-mono font-black text-sm mb-4 group-hover:bg-[#FFB800] group-hover:text-black transition-colors">
                      {step.step}
                    </div>
                    <h4 className="text-base font-bold text-white mb-1 group-hover:text-[#FFB800] transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-[#FFB800]/80 font-mono mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-xs text-white/65 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 3: Vision 2030 Alignment Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#1C2420] via-[#1E201E] to-[#181D1A] border border-white/15 p-8 sm:p-12 mb-20 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-right space-y-5">
                <div className="flex items-center gap-2 text-[#FFB800] text-xs sm:text-sm font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>التزامنا الوطني</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  استراتيجية متوائمة مع <span className="text-[#FFB800]">رؤية السعودية 2030</span>
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  نسهم بفخر في تحقيق طموحات المملكة التنموية عبر توفير حلول مقاولات هندسية مستدامة، وتوطين الكفاءات الفنية، وتطبيق أحدث ممارسات البناء والتشييد الذكي للارتقاء بجودة المشاريع الوطنية الكبرى.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    to="/projects"
                    className="px-6 py-3 rounded-xl bg-[#FFB800] hover:bg-[#EAB308] text-black font-extrabold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-[#FFB800]/20 flex items-center gap-2"
                  >
                    <span>استعرض مشاريعنا المنفذة</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-black/40 border border-white/10 text-center">
                <img
                  src="/Vision2030.png"
                  alt="Saudi Vision 2030"
                  className="h-24 sm:h-28 w-auto object-contain mb-4 brightness-110 drop-shadow-xl"
                />
                <h4 className="text-lg font-bold text-white mb-1">شريك وطني للتنمية والاستدامة</h4>
                <p className="text-xs text-white/60 max-w-sm">
                  دعم متواصل للنهضة الشاملة ومشاريع المستقبل في كافة أرجاء المملكة.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Call To Action */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1C2420] via-[#1E201E] to-[#181D1A] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl text-right">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2 text-[#FFB800] text-xs sm:text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>شريكك الاستراتيجي في الإنجاز</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                هل تبحث عن إدارة استراتيجية لمشروعك القادم؟
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                تواصل مع فريقنا الاستشاري والهندسي اليوم لمناقشة متطلبات مشروعك ووضع خطة التنفيذ المثالية.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                to="/#اتصل-بنا"
                className="px-8 py-4 rounded-2xl bg-[#FFB800] text-black font-extrabold text-sm sm:text-base hover:bg-[#EAB308] shadow-lg shadow-[#FFB800]/25 transition-all hover:scale-105 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>تواصل معنا الآن</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Strategy;

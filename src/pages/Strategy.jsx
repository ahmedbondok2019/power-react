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

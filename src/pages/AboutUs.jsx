import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import {
  Building2,
  Award,
  Target,
  Eye,
  ShieldCheck,
  Users,
  Compass,
  Sparkles,
  ArrowRight,
  Zap,
  Globe2,
  Clock,
  CheckCircle2
} from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import CapabilitiesWheel from '../components/about/CapabilitiesWheel';
import VisionMissionSection from '../components/about/VisionMissionSection';
import ValuesSection from '../components/about/ValuesSection';
import LeadershipSection from '../components/about/LeadershipSection';
import OrganizationChart from '../components/about/OrganizationChart';
import WorkforceTable from '../components/about/WorkforceTable';
import CertificatesSection from '../components/about/CertificatesSection';
import IsoCertificatesSection from '../components/about/IsoCertificatesSection';
import HallOfFameSection from '../components/HallOfFameSection';
import SafetyStatementSection from '../components/about/SafetyStatementSection';
import QualityStatementSection from '../components/about/QualityStatementSection';
import OurPresenceSection from '../components/about/OurPresenceSection';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const methodologyPoints = [
    { title: "خبرة عملية" },
    { title: "حلول\nمتكاملة" },
    { title: "جودة\nالتنفيذ" },
    { title: "السلامة" },
    { title: "الالتزام\nبالوقت" },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'الجودة والسلامة أولاً',
      description: 'نلتزم بتطبيق أرفع معايير السلامة المهنية والضبط الهندسي الصارم في كافة مراحل التنفيذ.'
    },
    {
      icon: Sparkles,
      title: 'الابتكار والحلول الذكية',
      description: 'نطوّر ونعتمد أحدث تقنيات الهندسة الكهروميكانيكية والإنشاءات لتحقيق أعلى كفاءة واستدامة.'
    },
    {
      icon: Users,
      title: 'الكوادر والخبرات الوطنية',
      description: 'فريق عمل متكامل من أفضل المهندسين والاستشاريين والفنيين المؤهلين لإدارة أضخم المشاريع.'
    },
    {
      icon: Target,
      title: 'الالتزام والشفافية',
      description: 'نفي بوعودنا في تسليم المشاريع بدقة متناهية وفي الجداول الزمنية المحددة بأقصى درجات الشفافية.'
    }
  ];

  const milestones = [
    {
      year: '2008',
      title: 'انطلاقة مسيرة التميز',
      description: 'تأسيس الشركة في المملكة العربية السعودية برؤية تركز على الريادة في المقاولات العامة والحلول الهندسية المتطورة.'
    },
    {
      year: '2014',
      title: 'التوسع في قطاع الكهروميكانيكا (MEP)',
      description: 'إنشاء تحالفات وتوسيع محفظة الأعمال لتشمل أحدث حلول التكييف، التهوية، وإدارة شبكات المياه والبنية التحتية.'
    },
    {
      year: '2019',
      title: 'تأسيس المصانع والشراكات العالمية',
      description: 'إطلاق مصانع متخصصة كـ POWER DUCT و KIENZLER، وعقد شراكات توزيع حصرية مع كبرى الشركات العالمية مثل KSB و TRANE.'
    },
    {
      year: '2024 - 2030',
      title: 'مواكبة رؤية السعودية 2030',
      description: 'المساهمة الفعّالة في كبرى المشاريع الوطنية التنموية، وتطبيق أحدث ممارسات البناء المستدام والمدن الذكية.'
    }
  ];

  const leadershipPoints = [
    'إدارة تنفيذية ذات خبرة عريقة في قطاع المقاولات والهندسة الكبرى.',
    'فلسفة ترتكز على القيمة المضافة والشراكة المستدامة مع عملائنا.',
    'التكامل الفريد بين المقاولات، التصنيع المباشر، وتوريد أفضل المعدات العالمية.'
  ];

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black">

      {/* Hero Section */}
      <Hero
        id="about-hero"
        badge="من نحن"
        title={
          <>
            نبني الخبرة. ننفّذ بثقة. <br />
            نصنع أثراً يدوم.
          </>
        }
        subtitle={
          <div className="space-y-2 text-right">
            <p>
              شركة متخصصة في خدمات المقاولات وتنفيذ المشاريع في المملكة العربية السعودية، تجمع بين الخبرة العملية لـ Power Preparation، الكفاءة الفنية، وجودة التنفيذ لتقديم حلول تتوافق مع متطلبات المشاريع وتطلعات العملاء.
            </p>
            <p className="text-white/70 text-xs sm:text-sm">
              منذ 2008، نواصل تطوير قدراتنا وتوسيع نطاق خدماتنا لنكون شريكاً موثوقاً في المشاريع التي تتطلب الدقة، الجودة، والسلامة.
            </p>
          </div>
        }
        buttonText="استكشف مشاريعنا"
        buttonLink="/#مشاريعنا"
        bgImage="/saudi_engineers_construction.jpg"
        showVisionLogo={false}
        showStatsCards={true}
        stats={[
          { number: 16, label: "عاماً من الخبرة" },
          { number: 50, label: "مشروعاً مكتمل" },
          { number: 10, label: "مدن رئيسية" }
        ]}
      />

      {/* 2nd Section: من نحن & ما يميز منهجنا (Matching the exact design with 3D Saudi Map Background) */}
      <section className="relative bg-[#404040C4] text-white pt-60 pb-24 overflow-hidden border-b border-white/5">

        {/* Subtle Dark 3D Map of Saudi Arabia positioned strictly on the far left */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-0 pointer-events-none opacity-25 flex items-center justify-start overflow-hidden">
          <img
            src="/saudi_arabia_3d_map_no_text2.png"
            alt="Saudi Arabia 3D Map"
            className="h-[650px] sm:h-[750px] lg:h-[900px] w-auto max-w-none object-contain -translate-x-[18%] sm:-translate-x-[15%] grayscale contrast-125"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Top Text Header: "من نحن" Section Title & Paragraph */}
          <div className="text-right space-y-6 max-w-4xl mr-0 ml-auto mb-20">
            <SectionTitle title="من نحن" theme="dark" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[#E0E0E0] text-sm sm:text-base md:text-lg leading-relaxed space-y-3 font-normal"
            >
              <p>
                نحن فريق متخصص يعمل على تحويل متطلبات المشاريع إلى حلول تنفيذية مدروسة وفعالة.
              </p>
              <p>
                نعمل في مجموعة متنوعة من القطاعات، تشمل المشاريع التجارية والتجزئة، التطوير السكني، التعليم، الرعاية الصحية، الضيافة والمنتجعات، الترفيه والمنشآت المسرحية، والبنية التحتية.
              </p>
              <p>
                وتشمل خدماتنا نطاقات مختلفة من المقاولات الجزئية إلى المقاولات العامة، إلى جانب القدرات المرتبطة بالتطوير والاستشارات وتحليل التصميم وهندسة القيمة.
              </p>
            </motion.div>
          </div>

          {/* Section Subheading: "ما يميز منهجنا" */}
          <div className="text-right mb-12">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
            >
              ما يميز منهجنا
            </motion.h3>
          </div>

          {/* Methodology Horizontal Timeline / Milestones Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative pt-7 pb-2"
          >
            {/* The Horizontal Line */}
            <div className="absolute top-9 left-0 right-0 h-[2px] bg-white/20 -z-0" />

            {/* 5 Distinct Points Grid */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 relative z-10">
              {methodologyPoints.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center group cursor-pointer">

                  {/* Glowing Yellow Dot on the line */}
                  <motion.div
                    whileHover={{ scale: 1.4 }}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FFB800] ring-4 ring-[#1A1A1A] mb-6 shadow-[0_0_12px_rgba(255,184,0,0.8)] transition-transform duration-300"
                  />

                  {/* Title with potential line-breaks */}
                  <h4 className="text-sm sm:text-lg md:text-xl font-bold text-white leading-snug whitespace-pre-line group-hover:text-[#FFB800] transition-colors">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3rd Section: قدراتنا (Interactive Capabilities Rotating Wheel) */}
      <CapabilitiesWheel />

      {/* 4th Section: رؤيتنا ورسالتنا (Matching the exact design with logo & connector wires) */}
      <VisionMissionSection />

      {/* Values Section */}
      <ValuesSection />

      {/* Leadership Section */}
      <LeadershipSection />

      {/* Organization Chart Section */}
      <OrganizationChart />

      {/* Workforce Table Section */}
      <WorkforceTable />

      {/* Certificates Section */}
      <CertificatesSection />

      {/* ISO Certificates Grid */}
      <IsoCertificatesSection />

      {/* Equipment Partners Section (Reusing Hall of Fame) */}
      <HallOfFameSection title="شركاء المعدات المعتمدين" />

      {/* Safety Statement Section */}
      <SafetyStatementSection />

      {/* Quality Statement Section */}
      <QualityStatementSection />

      {/* Our Presence Section */}
      <OurPresenceSection />

      {/* Capabilities Section */}
      <div id="تفاصيل-الشركة" className="pt-16 pb-20 overflow-hidden relative">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAB308]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-[#2A352F]/40 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-[#EAB308]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6">

          {/* Navigation Breadcrumb / Back Button */}
          <div className="flex items-center justify-between mb-16">
            <Link
              to="/"
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 hover:bg-[#EAB308] text-white hover:text-black transition-all duration-300 border border-white/10 font-medium text-sm"
            >
              <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>العودة للرئيسية</span>
            </Link>

            <div className="text-xs sm:text-sm text-text-muted flex items-center gap-2">
              <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-[#EAB308]">من نحن</span>
            </div>
          </div>

          {/* Core Values (قيمنا) */}
          <div id="قيمنا" className="mb-24 scroll-mt-28">
            <div className="text-center mb-14">
              <SectionTitle title="قيمنا الجوهرية" theme="dark" />
              <p className="text-text-muted mt-4 max-w-2xl mx-auto text-sm sm:text-base">
                المبادئ الراسخة التي تحكم كل مشروع ننفذه وكل شراكة نبنيها.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-[#1E201E] border border-white/10 rounded-2xl p-7 text-right flex flex-col justify-between hover:border-[#EAB308]/50 transition-all duration-300 group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white/5 text-[#EAB308] group-hover:bg-[#EAB308] group-hover:text-black flex items-center justify-center mb-6 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#EAB308] transition-colors">
                        {val.title}
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end text-xs text-[#EAB308] font-semibold gap-1">
                      <span>التزامنا الدائم</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Timeline / Journey (مسيرة النجاح) */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <SectionTitle title="مسيرة النمو والريادة" theme="dark" />
              <p className="text-text-muted mt-4 max-w-2xl mx-auto text-sm sm:text-base">
                محطات مضيئة صنعت اسم ومكانة Power Preparation في السوق السعودي.
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute top-0 bottom-0 right-1/2 translate-x-1/2 w-0.5 bg-white/15" />

              <div className="space-y-10 lg:space-y-16">
                {milestones.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${isEven ? 'lg:flex-row-reverse' : ''
                        }`}
                    >
                      {/* Content Box */}
                      <div className="w-full lg:w-1/2 text-right">
                        <div className="bg-[#1E201E] border border-white/10 hover:border-[#EAB308]/40 p-6 sm:p-8 rounded-2xl transition-all duration-300">
                          <span className="inline-block px-3 py-1 rounded-md bg-[#EAB308]/15 text-[#EAB308] font-black text-sm mb-3">
                            {item.year}
                          </span>
                          <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                          <p className="text-sm text-white/75 leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      {/* Timeline Node Center Marker */}
                      <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-[#111312] border-4 border-[#EAB308] text-[#EAB308] z-10 font-bold text-xs shadow-lg shadow-[#EAB308]/20">
                        <div className="w-3 h-3 rounded-full bg-[#EAB308]" />
                      </div>

                      <div className="hidden lg:block w-1/2" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Why Power Preparation & Leadership */}
          <div className="rounded-3xl bg-gradient-to-r from-[#1C2420] via-[#1E201E] to-[#181D1A] border border-white/15 p-8 sm:p-12 lg:p-14 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              <div className="text-right space-y-6">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  لماذا يختار كبار العملاء <span className="text-[#EAB308]">Power Preparation</span>؟
                </h3>
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                  نحن لا نكتفي بتقديم خدمات المقاولات، بل نقدم منظومة متكاملة من التخطيط، التصنيع المباشر، وتوريد أفضل التقنيات العالمية مما يمنحنا سرعة فائقة في الإنجاز وتحكماً كاملاً بجودة العمل وتكلفته.
                </p>

                <ul className="space-y-3.5 pt-2">
                  {leadershipPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 justify-start">
                      <CheckCircle2 className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white/90 font-medium">{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Link
                    to="/"
                    className="inline-block px-8 py-3.5 rounded-xl bg-[#EAB308] text-black font-bold hover:bg-[#FACC15] transition-all duration-300 shadow-lg shadow-[#EAB308]/20"
                  >
                    استعرض مشاريعنا وأعمالنا
                  </Link>
                </div>
              </div>

              {/* Vision 2030 Alignment Banner */}
              <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-black/40 border border-white/10 text-center relative overflow-hidden">
                <img
                  src="/Vision2030.png"
                  alt="Saudi Vision 2030"
                  className="h-24 sm:h-28 w-auto object-contain mb-6 drop-shadow-md brightness-110"
                />
                <h4 className="text-lg font-bold text-white mb-2">ملتزمون برؤية المملكة 2030</h4>
                <p className="text-xs sm:text-sm text-text-muted max-w-sm">
                  نسهم بفخر في النهضة العمرانية والصناعية الكبرى للمملكة عبر بنية تحتية مستدامة وكفاءات وطنية طموحة.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;

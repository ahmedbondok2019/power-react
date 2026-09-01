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
import SaudiPresenceMapSection from '../components/about/SaudiPresenceMapSection';
import OurPoliciesSection from '../components/about/OurPoliciesSection';

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

      {/* Saudi Presence 3D Map Section */}
      <SaudiPresenceMapSection />

      {/* Our Policies Section (سياستنا - Shadcn Accordion) */}
      <OurPoliciesSection />
    </div>
  );
};

export default AboutUs;

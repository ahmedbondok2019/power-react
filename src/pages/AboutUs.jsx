import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
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
import { useAboutPageData } from '../hooks/useAboutPageData';

const AboutUs = () => {
  const { data: aboutData } = useAboutPageData();
  const resolvedData = aboutData?.data || aboutData || {};

  const hero = resolvedData.hero_section || {};
  const methodology = resolvedData.methodology_section || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const defaultMethodologyPoints = [
    { title: "خبرة عملية" },
    { title: "حلول\nمتكاملة" },
    { title: "جودة\nالتنفيذ" },
    { title: "السلامة" },
    { title: "الالتزام\nبالوقت" },
  ];

  const methodologyPoints = (methodology.points && methodology.points.length > 0)
    ? methodology.points
    : defaultMethodologyPoints;

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black">

      {/* Hero Section */}
      <Hero
        id="about-hero"
        badge={hero.badge || "من نحن"}
        title={
          hero.title ? (
            <span className="whitespace-pre-line">{hero.title}</span>
          ) : (
            <>
              نبني الخبرة. ننفّذ بثقة. <br />
              نصنع أثراً يدوم.
            </>
          )
        }
        subtitle={
          hero.paragraphs && hero.paragraphs.length > 0 ? (
            <div className="space-y-2 text-right">
              {hero.paragraphs.map((p, idx) => (
                <p key={idx} className={idx > 0 ? "text-white/70 text-xs sm:text-sm" : ""}>
                  {p}
                </p>
              ))}
            </div>
          ) : hero.subtitle ? (
            <p className="whitespace-pre-line text-right">{hero.subtitle}</p>
          ) : (
            <div className="space-y-2 text-right">
              <p>
                شركة متخصصة في خدمات المقاولات وتنفيذ المشاريع في المملكة العربية السعودية، تجمع بين الخبرة العملية لـ Power Preparation، الكفاءة الفنية، وجودة التنفيذ لتقديم حلول تتوافق مع متطلبات المشاريع وتطلعات العملاء.
              </p>
              <p className="text-white/70 text-xs sm:text-sm">
                منذ 2008، نواصل تطوير قدراتنا وتوسيع نطاق خدماتنا لنكون شريكاً موثوقاً في المشاريع التي تتطلب الدقة، الجودة، والسلامة.
              </p>
            </div>
          )
        }
        buttonText="استكشف مشاريعنا"
        buttonLink="/projects"
        bgImage={hero.image || "/saudi_engineers_construction.jpg"}
        showVisionLogo={false}
        showStatsCards={true}
        stats={hero.stats && hero.stats.length > 0 ? hero.stats : [
          { number: 16, label: "عاماً من الخبرة" },
          { number: 50, label: "مشروعاً مكتمل" },
          { number: 10, label: "مدن رئيسية" }
        ]}
      />

      {/* 2nd Section: من نحن & ما يميز منهجنا (Matching the exact design with 3D Saudi Map Background) */}
      <section className="relative bg-[#404040C4] text-white pt-60 pb-24 overflow-hidden border-b border-white/5">

        {/* Subtle Dark 3D Map of Saudi Arabia sliding in from Left to Right */}
        <motion.div
          initial={{ opacity: 0, x: -140 }}
          whileInView={{ opacity: 0.28, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-0 pointer-events-none flex items-center justify-start overflow-hidden"
        >
          <img
            src={methodology.image || "/saudi_arabia_3d_map_no_text2.png"}
            alt="Saudi Arabia 3D Map"
            className="h-[650px] sm:h-[750px] lg:h-[900px] w-auto max-w-none object-contain -translate-x-[18%] sm:-translate-x-[15%] grayscale contrast-125"
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Top Text Header: "من نحن" Section Title & Paragraph sliding in from Right to Left */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-right space-y-6 max-w-4xl mr-0 ml-auto mb-20"
          >
            <SectionTitle title={methodology.title || "من نحن"} theme="dark" />

            <div className="text-[#E0E0E0] text-sm sm:text-base md:text-lg leading-relaxed space-y-3 font-normal">
              {(methodology.paragraphs && methodology.paragraphs.length > 0) ? (
                methodology.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))
              ) : (
                <>
                  <p>
                    نحن فريق متخصص يعمل على تحويل متطلبات المشاريع إلى حلول تنفيذية مدروسة وفعالة.
                  </p>
                  <p>
                    نعمل في مجموعة متنوعة من القطاعات، تشمل المشاريع التجارية والتجزئة، التطوير السكني، التعليم، الرعاية الصحية، الضيافة والمنتجعات، الترفيه والمنشآت المسرحية، والبنية التحتية.
                  </p>
                  <p>
                    وتشمل خدماتنا نطاقات مختلفة من المقاولات الجزئية إلى المقاولات العامة، إلى جانب القدرات المرتبطة بالتطوير والاستشارات وتحليل التصميم وهندسة القيمة.
                  </p>
                </>
              )}
            </div>
          </motion.div>

          {/* Section Subheading: "ما يميز منهجنا" */}
          <div className="text-right mb-12">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
            >
              {methodology.subtitle || "ما يميز منهجنا"}
            </motion.h3>
          </div>

          {/* Methodology Horizontal Timeline / Milestones Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
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
      <CapabilitiesWheel data={resolvedData.capabilities_wheel} />

      {/* 4th Section: رؤيتنا ورسالتنا (Matching the exact design with logo & connector wires) */}
      <VisionMissionSection data={resolvedData.vision_mission} />

      {/* Values Section */}
      <ValuesSection data={resolvedData.values_section} />

      {/* Leadership Section */}
      <LeadershipSection data={resolvedData.leadership_section} />

      {/* Organization Chart Section */}
      <OrganizationChart data={resolvedData.organization_chart} />

      {/* Workforce Table Section */}
      <WorkforceTable data={resolvedData.workforce_table} />

      {/* Certificates Section */}
      <CertificatesSection data={resolvedData.certificates_section} />

      {/* ISO Certificates Grid */}
      <IsoCertificatesSection data={resolvedData.iso_certificates} />

      {/* Equipment Partners Section (Reusing Hall of Fame) */}
      <HallOfFameSection title="شركاء المعدات المعتمدين" clients={resolvedData.equipment_partners} />

      {/* Safety Statement Section */}
      <SafetyStatementSection data={resolvedData.safety_statement} />

      {/* Quality Statement Section */}
      <QualityStatementSection data={resolvedData.quality_statement} />

      {/* Our Presence Section */}
      <OurPresenceSection data={resolvedData.presence_section} />

      {/* Saudi Presence 3D Map Section */}
      <SaudiPresenceMapSection data={resolvedData.presence_section} />

      {/* Our Policies Section (سياستنا - Shadcn Accordion) */}
      <OurPoliciesSection data={resolvedData.policies_section} />
    </div>
  );
};

export default AboutUs;

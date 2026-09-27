import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { useLanguage } from '../../contexts/LanguageContext';

const DEFAULT_LEADERS_AR = [
  {
    title: "القيادة التنفيذية - مدير العمليات",
    name: "القيادة التنفيذية - مدير العمليات",
    paragraphs: [
      "إشراف تنفيذي مباشر على كافة العقود الكبرى وإدارة العمليات الميدانية وفق أعلى معايير الحوكمة والالتزام بالجداول الزمنية المحددة.",
      "تطوير الكوادر الفنية وتبني أحدث الأنظمة التقنية في إدارة المشاريع لضمان تحقيق أعلى مستويات الكفاءة والسلامة في كافة مواقع العمل."
    ]
  },
  {
    title: "القيادة الهندسية - مدير المشاريع والتطوير",
    name: "القيادة الهندسية - مدير المشاريع والتطوير",
    paragraphs: [
      "قيادة فرق الهندسة والتصميم وتطبيق منهجيات الهندسة القيمية ونمذجة معلومات المباني (BIM) لتسريع وتيرة الإنجاز وخفض التكاليف.",
      "التنسيق المتكامل بين مختلف التخصصات الإنشائية والكهروميكانيكية لضمان تسليم المشاريع بأعلى مواصفات الجودة المعتمدة."
    ]
  },
  {
    title: "القيادة الفنية - مدير الجودة والسلامة والبيئة (QHSE)",
    name: "القيادة الفنية - مدير الجودة والسلامة والبيئة (QHSE)",
    paragraphs: [
      "تطبيق صارم لمنظومة ISO ومعايير السلامة المهنية لحماية الكوادر والأصول وضمان صفر حوادث في كافة المواقع.",
      "مراقبة دقيقة لمطابقة المواد والأعمال للأكواد الهندسية السعودية والمواصفات العالمية في جميع مراحل التنفيذ."
    ]
  }
];

const DEFAULT_LEADERS_EN = [
  {
    title: "Executive Leader - Operations Director",
    name: "Executive Leader - Operations Director",
    paragraphs: [
      "Brief overview highlighting executive governance across mega contracts, operations leadership, and strategic milestones.",
      "Additional details on workforce modernization, technology adoption, and ensuring uncompromised safety and on-time handovers."
    ]
  },
  {
    title: "Engineering Leader - Projects & Development Director",
    name: "Engineering Leader - Projects & Development Director",
    paragraphs: [
      "Spearheading engineering teams, BIM workflows, and value engineering frameworks to optimize costs and accelerate execution milestones.",
      "Seamless multi-disciplinary integration across civil, structural, and MEP works ensuring uncompromised engineering quality."
    ]
  },
  {
    title: "Technical Leader - QHSE Director",
    name: "Technical Leader - QHSE Director",
    paragraphs: [
      "Enforcing strict ISO management systems and rigorous HSE protocols across all active project sites to ensure zero incidents.",
      "Ensuring rigorous compliance with Saudi Building Codes and international engineering standards throughout all phases."
    ]
  }
];

const LeadershipSection = ({ data }) => {
  const containerRef = useRef(null);
  const { lang, t, isRTL } = useLanguage();
  const [activeLeaderIndex, setActiveLeaderIndex] = useState(0);

  const headerTitle = (lang === 'en' ? (data?.header?.title_en || data?.header?.title) : null)
    || data?.header?.title 
    || (isRTL ? 'قيادتنا' : 'Our Leadership');

  const headerSubtitle = (lang === 'en' ? (data?.header?.subtitle_en || data?.header?.subtitle) : null)
    || data?.header?.subtitle 
    || (isRTL ? 'قيادة تجمع بين الرؤية والخبرة والتنفيذ' : 'Leadership Combining Vision, Expertise, and Execution');

  const bgImage = data?.header?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

  const defaultList = isRTL ? DEFAULT_LEADERS_AR : DEFAULT_LEADERS_EN;

  const leadersList = useMemo(() => {
    if (data?.leaders && data.leaders.length > 0) {
      return data.leaders.map((leader, idx) => {
        const fallback = defaultList[idx] || defaultList[0];
        return {
          title: (lang === 'en' ? (leader.title_en || leader.name_en) : null) || leader.title || leader.name || fallback.title,
          name: (lang === 'en' ? (leader.name_en || leader.title_en) : null) || leader.name || leader.title || fallback.name,
          paragraphs: (lang === 'en' && leader.paragraphs_en && leader.paragraphs_en.length > 0 ? leader.paragraphs_en : null) || leader.paragraphs || fallback.paragraphs
        };
      });
    }
    return defaultList;
  }, [data, defaultList, lang]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Keep track of active leader index for navigation dots
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest < 0.33) {
        setActiveLeaderIndex(0);
      } else if (latest < 0.66) {
        setActiveLeaderIndex(1);
      } else {
        setActiveLeaderIndex(2);
      }
    });
  }, [scrollYProgress]);

  // Stage 1 (0% to 33%): Visible right from the start, fades and slides out cleanly by 0.28
  const l1Opacity = useTransform(scrollYProgress, [0, 0.20, 0.28], [1, 1, 0]);
  const l1X = useTransform(scrollYProgress, [0, 0.20, 0.28], [0, 0, isRTL ? -80 : 80]);
  const l1Scale = useTransform(scrollYProgress, [0, 0.20, 0.28], [1, 1, 0.95]);
  const l1PointerEvents = useTransform(scrollYProgress, (val) => val > 0.28 ? "none" : "auto");

  // Stage 2 (33% to 66%): Fades in at 0.33, stays sharp, fades out completely by 0.62
  const l2Opacity = useTransform(scrollYProgress, [0.33, 0.40, 0.55, 0.62], [0, 1, 1, 0]);
  const l2X = useTransform(scrollYProgress, [0.33, 0.40, 0.55, 0.62], [isRTL ? 80 : -80, 0, 0, isRTL ? -80 : 80]);
  const l2Scale = useTransform(scrollYProgress, [0.33, 0.40, 0.55, 0.62], [0.95, 1, 1, 0.95]);
  const l2PointerEvents = useTransform(scrollYProgress, (val) => (val < 0.33 || val > 0.62) ? "none" : "auto");

  // Stage 3 (66% to 100%): Fades in at 0.67, stays locked
  const l3Opacity = useTransform(scrollYProgress, [0.67, 0.75, 1], [0, 1, 1]);
  const l3X = useTransform(scrollYProgress, [0.67, 0.75, 1], [isRTL ? 80 : -80, 0, 0]);
  const l3Scale = useTransform(scrollYProgress, [0.67, 0.75, 1], [0.95, 1, 1]);
  const l3PointerEvents = useTransform(scrollYProgress, (val) => val < 0.67 ? "none" : "auto");

  if (leadersList.length === 0) return null;

  const leader1 = leadersList[0];
  const leader2 = leadersList[1] || leader1;
  const leader3 = leadersList[2] || leader2;

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[320vh] text-white bg-fixed bg-cover bg-center select-none border-b border-white/5"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141615]/90 via-[#141615]/85 to-[#141615]/95 backdrop-blur-[1.5px] z-0" />

      {/* Sticky Inner Container: plenty of top padding to avoid navbar clipping */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 z-10 overflow-hidden">
        
        {/* Section Header: Clearly positioned with zero clipping */}
        <div className={`flex flex-col ${isRTL ? 'items-start text-right' : 'items-start text-left'} shrink-0 w-full max-w-7xl mx-auto mb-4 sm:mb-6`}>
          {headerTitle && <SectionTitle title={headerTitle} theme="dark" />}
          {headerSubtitle && (
            <p className="text-white/80 text-sm sm:text-base lg:text-lg font-medium tracking-wide mt-3 max-w-2xl">
              {headerSubtitle}
            </p>
          )}
        </div>

        {/* Leaders Central Stage */}
        <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center text-center my-auto">
          
          {/* Leader 1 */}
          {leader1 && (
            <motion.div 
              style={{ opacity: l1Opacity, x: l1X, scale: l1Scale, pointerEvents: l1PointerEvents }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-white mb-6 lg:mb-8 tracking-wide drop-shadow-xl">
                {leader1.name || leader1.title}
              </h3>
              <div className="space-y-5 text-white/90 text-sm sm:text-base lg:text-lg font-normal leading-[2] max-w-3xl mx-auto text-center">
                {(leader1.paragraphs || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Leader 2 */}
          {leader2 && (
            <motion.div 
              style={{ opacity: l2Opacity, x: l2X, scale: l2Scale, pointerEvents: l2PointerEvents }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-white mb-6 lg:mb-8 tracking-wide drop-shadow-xl">
                {leader2.name || leader2.title}
              </h3>
              <div className="space-y-5 text-white/90 text-sm sm:text-base lg:text-lg font-normal leading-[2] max-w-3xl mx-auto text-center">
                {(leader2.paragraphs || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Leader 3 */}
          {leader3 && (
            <motion.div 
              style={{ opacity: l3Opacity, x: l3X, scale: l3Scale, pointerEvents: l3PointerEvents }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-white mb-6 lg:mb-8 tracking-wide drop-shadow-xl">
                {leader3.name || leader3.title}
              </h3>
              <div className="space-y-5 text-white/90 text-sm sm:text-base lg:text-lg font-normal leading-[2] max-w-3xl mx-auto text-center">
                {(leader3.paragraphs || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        {/* Bottom Stage Indicator: visual feedback of active leader */}
        <div className="flex items-center justify-center gap-3 shrink-0 pt-4 z-20">
          {leadersList.slice(0, 3).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeLeaderIndex === idx ? 'w-8 bg-[#FFB800]' : 'w-2.5 bg-white/25'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LeadershipSection;

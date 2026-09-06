import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

const LEADERS = [
  {
    id: 1,
    name: "محمد الملا - المدير العام",
    paragraphs: [
      "بصفته رائد أعمال ذو خبرة طويلة، بدأ السيد محمد الملا رحلته لتحقيق النجاح لشركة Power Preparation Ltd قبل 14 عامًا. يحرص على اتباع أسلوب ومفهوم عملي يعتمد بشكل كبير على جودة الأفراد المشاركين في الشركة، لتوفير إحساس بالملكية داخليًا يعكس تصرفات كل شخص ويحفزه للتفوق وتحسين محيطه.",
      "لقد أثبتت هذه الطريقة في الإدارة فعاليتها من خلال إشراك كل رئيس قسم كعضو في مجلس الإدارة لضمان تقديمهم مدخلاتهم حول خطط النمو المقبلة، بالإضافة إلى السعي لتحقيق هدف موحد يتمثل في أن تكون الشركة الرائدة في تقديم خدمات التعاقد في سوق المملكة العربية السعودية."
    ]
  },
  {
    id: 2,
    name: "مجد الملا - المدير التنفيذي",
    paragraphs: [
      "بصفته محترفاً ذو سنوات من الخبرة في مجالات إدارة الأعمال، كان السيد مجد الملا دائماً يسعى لمواكبة أحدث مفاهيم الإدارة والاهتمام بالتفاصيل الصغيرة ولكن الفعالة في الأعمال.",
      "في عام 2018، قام السيد ماجد بتطبيق نظام الإدارة المرنة الموحد الذي يساعد في تعزيز التواصل بين الأقسام لضمان استجابة تشغيلية أسرع. وقد ضمن هذا النظام حصولنا على أسرع وأعلى جودة من الخدمة الممكنة لمشروعاتهم.",
      "في عام 2021، قدّم السيد ماجد خدمات إدارة المشاريع لمشاريعنا، والتي أصبحت الآن سببًا رئيسيًا في نجاحا البارز ورضا عملائنا."
    ]
  },
  {
    id: 3,
    name: "قائد آخر - المسمى الوظيفي",
    paragraphs: [
      "وصف مختصر يبرز دور القائد في إدارة المشاريع وتوجيه فرق العمل نحو تحقيق أهداف الشركة الاستراتيجية ومتابعة خطط التنفيذ.",
      "نص إضافي يوضح مساهمات القائد في تطوير بيئة العمل وتبني أحدث التقنيات لضمان تقديم أعلى معايير الجودة للعملاء والالتزام بالجدول الزمني."
    ]
  }
];

const LeadershipSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Top Header ("القادة"): Appears immediately on entry (0 to 0.1)
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [-20, 0]);

  // LEADER 1 (محمد الملا):
  // Entry: 0 to 0.15 (comes from top to center)
  // Exit: 0.25 to 0.35 (goes up and fades)
  const l1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  const l1Y = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [-50, 0, 0, -50]);
  const l1PointerEvents = useTransform(scrollYProgress, (val) => val > 0.35 ? "none" : "auto");

  // LEADER 2 (مجد الملا):
  // Entry: 0.35 to 0.45 (comes from right to center)
  // Exit: 0.55 to 0.65 (goes back right and fades)
  const l2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const l2X = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [100, 0, 0, 100]);
  const l2PointerEvents = useTransform(scrollYProgress, (val) => (val < 0.35 || val > 0.65) ? "none" : "auto");

  // LEADER 3 (قائد آخر):
  // Entry: 0.65 to 0.75 (comes from left to center)
  // Exit: stays until the section ends
  const l3Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const l3X = useTransform(scrollYProgress, [0.65, 0.75], [-100, 0]);
  const l3PointerEvents = useTransform(scrollYProgress, (val) => val < 0.65 ? "none" : "auto");

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[400vh] text-white bg-fixed bg-cover bg-center select-none border-b border-white/5"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#141615]/85 backdrop-blur-[1px] z-0"></div>

      {/* Sticky Inner Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col px-6 lg:px-12 py-12 lg:py-20 z-10 overflow-hidden">
        
        {/* Header */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="flex flex-col items-start text-right mb-10 shrink-0 w-full max-w-7xl mx-auto"
        >
          <SectionTitle title="القادة" theme="dark" />
          <p className="text-white/90 text-base sm:text-lg lg:text-xl font-medium tracking-wide mt-4">
            قيادة تجمع بين الرؤية والخبرة والتنفيذ
          </p>
        </motion.div>

        {/* Leaders Central Stage */}
        <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center text-center">
          
          {/* Leader 1 */}
          <motion.div 
            style={{ opacity: l1Opacity, y: l1Y, pointerEvents: l1PointerEvents }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
          >
            <h3 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-white mb-6 lg:mb-10 tracking-wide drop-shadow-lg">
              {LEADERS[0].name}
            </h3>
            <div className="space-y-6 text-white/95 text-sm sm:text-base lg:text-[17px] font-normal leading-[2.2] max-w-4xl mx-auto text-right md:text-center">
              {LEADERS[0].paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          {/* Leader 2 */}
          <motion.div 
            style={{ opacity: l2Opacity, x: l2X, pointerEvents: l2PointerEvents }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
          >
            <h3 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-white mb-6 lg:mb-10 tracking-wide drop-shadow-lg">
              {LEADERS[1].name}
            </h3>
            <div className="space-y-6 text-white/95 text-sm sm:text-base lg:text-[17px] font-normal leading-[2.2] max-w-4xl mx-auto text-right md:text-center">
              {LEADERS[1].paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          {/* Leader 3 */}
          <motion.div 
            style={{ opacity: l3Opacity, x: l3X, pointerEvents: l3PointerEvents }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
          >
            <h3 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-white mb-6 lg:mb-10 tracking-wide drop-shadow-lg">
              {LEADERS[2].name}
            </h3>
            <div className="space-y-6 text-white/95 text-sm sm:text-base lg:text-[17px] font-normal leading-[2.2] max-w-4xl mx-auto text-right md:text-center">
              {LEADERS[2].paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;

import React from 'react';
import { motion } from 'framer-motion';
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
  }
];

const LeadershipSection = () => {
  return (
    <section 
      className="relative w-full text-white overflow-hidden py-24 select-none bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')` }}
    >
      
      {/* Dark overlay to match the design's readability */}
      <div className="absolute inset-0 bg-[#141615]/85 backdrop-blur-[1px] z-0"></div>

      <div className="relative z-10 max-w-9xl mx-auto px-6 lg:px-12 flex flex-col h-full">

        {/* Header (Top Right) */}
        <div className="flex flex-col items-start text-right mb-16 mt-8">
          <SectionTitle title="القادة" theme="dark" />
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white/90 text-base sm:text-lg lg:text-xl font-medium tracking-wide mt-4"
          >
            قيادة تجمع بين الرؤية والخبرة والتنفيذ
          </motion.p>
        </div>

        {/* Main Content Layout */}
        <div className="w-full relative pb-10">

          {/* Top Row: Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-20 max-w-5xl mx-auto"
          >
            <h3 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-white mb-6 lg:mb-10 tracking-wide drop-shadow-lg">
              محمد الملا - المدير العام
            </h3>
            <div className="space-y-6 text-white/95 text-sm sm:text-base lg:text-[17px] font-normal leading-[2.2]">
              <p>
                بصفته رائد أعمال ذو خبرة طويلة، بدأ السيد محمد الملا رحلته لتحقيق النجاح لشركة Power Preparation Ltd قبل 14 عامًا. يحرص على اتباع أسلوب ومفهوم عملي يعتمد بشكل كبير على جودة الأفراد المشاركين في الشركة، لتوفير إحساس بالملكية داخليًا يعكس تصرفات كل شخص ويحفزه للتفوق وتحسين محيطه.
              </p>
              <p>
                لقد أثبتت هذه الطريقة في الإدارة فعاليتها من خلال إشراك كل رئيس قسم كعضو في مجلس الإدارة لضمان تقديمهم مدخلاتهم حول خطط النمو المقبلة، بالإضافة إلى السعي لتحقيق هدف موحد يتمثل في أن تكون الشركة الرائدة في تقديم خدمات التعاقد في سوق المملكة العربية السعودية.
              </p>
            </div>
          </motion.div>

          {/* Bottom Row: Two Columns (Right & Left) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-40 max-w-7xl mx-auto">

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col text-right"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-white mb-6 tracking-wide drop-shadow-lg">
                مجد الملا - المدير التنفيذي
              </h3>
              <div className="space-y-4 text-white/80 text-sm sm:text-base lg:text-lg font-normal leading-[2.2]">
                <p>
                  وصف مختصر يبرز دور القائد في إدارة المشاريع وتوجيه فرق العمل نحو تحقيق أهداف الشركة الاستراتيجية ومتابعة خطط التنفيذ.
                </p>
                <p>
                  نص إضافي يوضح مساهمات القائد في تطوير بيئة العمل وتبني أحدث التقنيات لضمان تقديم أعلى معايير الجودة للعملاء والالتزام بالجدول الزمني.
                </p>
              </div>
            </motion.div>

            {/* Left Column (Placeholder for 3rd Leader or remaining text) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col text-right"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-white mb-6 tracking-wide drop-shadow-lg">
                قائد آخر - المسمى الوظيفي
              </h3>
              <div className="space-y-4 text-white/80 text-sm sm:text-base lg:text-lg font-normal leading-[2.2]">
                <p>
                  وصف مختصر يبرز دور القائد في إدارة المشاريع وتوجيه فرق العمل نحو تحقيق أهداف الشركة الاستراتيجية ومتابعة خطط التنفيذ.
                </p>
                <p>
                  نص إضافي يوضح مساهمات القائد في تطوير بيئة العمل وتبني أحدث التقنيات لضمان تقديم أعلى معايير الجودة للعملاء والالتزام بالجدول الزمني.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default LeadershipSection;

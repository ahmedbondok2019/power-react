import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

const VALUES = [
  {
    id: 1,
    title: "العميل أولاً",
    description: "نركز على فهم احتياجات العميل وتقديم حلول مصممة بما يتناسب مع متطلبات المشروع."
  },
  {
    id: 2,
    title: "التميز",
    description: "نسعى إلى تحقيق أعلى المعايير في مختلف جوانب العمل، من التخطيط والتنفيذ إلى جودة النتائج."
  },
  {
    id: 3,
    title: "النزاهة",
    description: "نلتزم بالصدق والشفافية والمسؤولية في تعاملاتنا وعلاقاتنا."
  },
  {
    id: 4,
    title: "الابتكار",
    description: "نبحث باستمرار عن طرق جديدة وحلول أكثر كفاءة لتطوير أعمالنا وتحسين نتائج المشاريع."
  },
  {
    id: 5,
    title: "السلامة",
    description: "نجعل السلامة أولوية أساسية في جميع مراحل المشروع."
  },
  {
    id: 6,
    title: "التعاون",
    description: "نعمل بروح الفريق ونسعى إلى تحقيق التكامل بين مختلف الأطراف والأقسام لتحقيق أهداف المشروع."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const ValuesSection = () => {
  return (
    <section className="relative w-full bg-[#141615] text-white py-24 px-6 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col items-start text-right mb-16">
          <SectionTitle title="قيمنا" theme="dark" />
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed mt-4"
          >
            القيم بالنسبة لنا ليست مجرد مبادئ مكتوبة، بل أساس للطريقة التي ندير بها أعمالنا وننفذ بها مشاريعنا.
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto">

          {/* Values Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {VALUES.map((val) => (
              <motion.div
                key={val.id}
                variants={cardVariants}
                className="bg-white rounded-[12px] pt-[11px] pr-[9px] pb-[37px] pl-[5px] flex flex-col items-center justify-start gap-[26px] text-center shadow-lg hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(235,251,56,0.15)] transition-all duration-300 group cursor-default w-[216px] h-[206px] mx-auto"
              >
                <h3 className="text-2xl sm:text-3xl font-black text-[#FFB800] group-hover:scale-105 transition-transform duration-300 mt-2">
                  {val.title}
                </h3>
                <p className="text-[#333333] text-sm sm:text-base font-bold leading-[1.8] px-2">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ValuesSection;

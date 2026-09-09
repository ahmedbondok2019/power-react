import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

const SafetyStatementSection = ({ data }) => {
  const title = data?.title || "بيان السلامة";
  const bgImage = data?.image || "/pix-off-labor-7576514_1920.jpg";
  const logos = (data?.logos && data.logos.length > 0) ? data.logos : [
    "/OPITO.png",
    "/OSHA.png",
    "/Iso-45001.png"
  ];
  const statement = data?.statement || data?.description || "أعظم أصول أي شركة هي الأشخاص، فحياتهم وسلامتهم وجودة حياتهم هي ما يجعل هذه الشركة كما هي اليوم. نحن نؤمن بالحفاظ على سلامة موظفينا وعملائنا وأي طرف ثالث ومعداتنا قدر الإمكان، ولا يمكننا تحقيق ذلك إلا من خلال التأكد من اتباع الإرشادات واللوائح الدولية للصحة والسلامة. لا يوجد أي تهاون عندما يتعلق الأمر بالسلامة.";

  return (
    <section className="w-full bg-[#3C3C3CDE] text-white py-12 sm:py-16 select-none overflow-hidden" dir="rtl">
      <div className="max-w-9xl mx-auto px-6 lg:px-12 flex flex-col h-full">

        {/* Header (Top Right) */}
        <div className="flex flex-col items-start text-right mb-12 w-full">
          <SectionTitle title={title} theme="dark" />
        </div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[32px] overflow-hidden flex flex-col items-center justify-center py-10 sm:py-16 px-6 sm:px-12 shadow-2xl border border-white/5"
        >
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={bgImage}
              alt="Safety at work background"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay to ensure text readability matching the Figma spec */}
            <div className="absolute inset-0 bg-[#3C3C3CDE]"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-8 sm:gap-12">

            {/* Logos Row */}
            <div className="flex flex-row justify-center items-center gap-12 sm:gap-20 md:gap-32 w-full flex-wrap">
              {logos.map((logo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.2 }}
                  className="flex items-center justify-center max-h-16"
                >
                  <img src={logo} alt="Safety Logo" className="w-auto h-12 sm:h-16 object-contain" />
                </motion.div>
              ))}
            </div>

            {/* Paragraph Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white/95 text-lg sm:text-xl lg:text-[24px] font-medium leading-[2] sm:leading-[48px] tracking-normal text-center"
            >
              "{statement}"
            </motion.p>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SafetyStatementSection;

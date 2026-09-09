import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { containerVariants, slideFromRight, slideFromLeft } from '../../utils/animations';

const QualityStatementSection = ({ data }) => {
  const title = data?.title || "بيان الجودة";
  const image = data?.image || "/quality-image.png";
  const certLogo = data?.cert_logo || "/ISO-9001.png";
  const paragraphs = (data?.paragraphs && data.paragraphs.length > 0) ? data.paragraphs : [
    "الالتزام بمعيار جودة عالي يعني إنشاء دورة مراقبة الجودة المناسبة والتأكد من أن كل شخص لديه المؤهلات المطلوبة لأداء عمله بأفضل ممارسة ممكنة.",
    "لذلك، قمنا بتعيين مكتب إدارة مشاريع خارجي (PMO) وتكليف EIS للتأكد من أننا نقدم أعلى جودة إدارية وتنفيذية ممكنة لعملائنا. ولاء العملاء هو نتيجة الالتزام بالجودة."
  ];

  return (
    <section className="w-full bg-[#141615] text-white py-20 select-none overflow-hidden" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col items-start text-right mb-16 w-full">
          <SectionTitle title={title} theme="dark" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1, margin: '0px 0px -100px 0px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          
          {/* Right side (Image) - RTL so first in DOM */}
          <motion.div 
            variants={slideFromRight}
            className="w-full h-[400px] sm:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img 
              src={image} 
              alt="Quality Statement Worker" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Left side (Content) */}
          <motion.div 
            variants={slideFromLeft}
            className="flex flex-col items-center justify-center text-center px-2 sm:px-6"
          >
            <img src={certLogo} alt="ISO 9001 Certified" className="w-32 sm:w-48 h-auto mb-10 object-contain" />
            
            {paragraphs.map((p, idx) => (
              <p key={idx} className="text-white/95 text-xl sm:text-[22px] font-medium leading-[2.2] mb-10 max-w-lg">
                "{p}"
              </p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QualityStatementSection;

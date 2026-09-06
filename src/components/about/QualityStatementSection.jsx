import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { containerVariants, slideFromRight, slideFromLeft } from '../../utils/animations';

const QualityStatementSection = () => {
  return (
    <section className="w-full bg-[#141615] text-white py-20 select-none overflow-hidden" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col items-start text-right mb-16 w-full">
          <SectionTitle title="بيان الجودة" theme="dark" />
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
              src="/quality-image.png" 
              alt="Quality Statement Worker" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Left side (Content) */}
          <motion.div 
            variants={slideFromLeft}
            className="flex flex-col items-center justify-center text-center px-2 sm:px-6"
          >
            <img src="/ISO-9001.png" alt="ISO 9001 Certified" className="w-32 sm:w-48 h-auto mb-10 object-contain" />
            
            <p className="text-white/95 text-xl sm:text-[22px] font-medium leading-[2.2] mb-10 max-w-lg">
              "الالتزام بمعيار جودة عالي يعني إنشاء دورة مراقبة الجودة المناسبة والتأكد من أن كل شخص لديه المؤهلات المطلوبة لأداء عمله بأفضل ممارسة ممكنة."
            </p>
            
            <p className="text-white/95 text-xl sm:text-[22px] font-medium leading-[2.2] max-w-lg">
              "لذلك، قمنا بتعيين مكتب إدارة مشاريع خارجي (PMO) وتكليف EIS للتأكد من أننا نقدم أعلى جودة إدارية وتنفيذية ممكنة لعملائنا. ولاء العملاء هو نتيجة الالتزام بالجودة."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QualityStatementSection;

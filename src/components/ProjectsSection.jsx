import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftCircle } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const EASE = [0.22, 1, 0.36, 1];

const projects = [
  { subtitle: 'مستشفى',       title: 'RoQiah Al Qaffari',       location: 'الرياض',                      year: '2022', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1400&auto=format&fit=crop' },
  { subtitle: 'محطة مترو',    title: 'KAFD',                     location: 'مركز الملك عبدالله المالي', year: '2021', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop' },
  { subtitle: 'ثكنات العمال', title: 'في نيوم',                  location: 'تبوك',                       year: '2023', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1400&auto=format&fit=crop' },
  { subtitle: 'المدارس',      title: 'الدولية البريطانية',       location: 'جدة',                        year: '2020', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1400&auto=format&fit=crop' },
];

/*
 * 2×2 grid — Staggered entry from bottom-right (right col) and bottom-left (left col).
 */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: (index) => ({ 
    opacity: 0, 
    x: index % 2 === 0 ? 80 : -80, 
    y: 80, 
    scale: 0.95 
  }),
  show: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.9, ease: EASE }
  }
};

const ProjectsSection = () => (
  <section id="مشاريعنا" className="relative bg-white text-[#111312] overflow-hidden py-24 sm:py-32">

    {/* Saudi map background */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1500px] h-[85%] flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1.15 }}
        viewport={{ once: false }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        src="/saudi_arabia_3d_map_no_text2.png"
        alt=""
        className="w-full h-full object-contain select-none"
      />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6">

      {/* Header: title from right, link from left */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <motion.div
          className="text-right"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <SectionTitle title="مشاريعنا" theme="light" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          <a href="#مشاريعنا" className="group flex items-center gap-2.5 text-[#374151] hover:text-[#FFB800] transition-colors duration-300 text-sm md:text-base font-medium">
            <span>مزيد من المشاريع</span>
            <ArrowLeftCircle className="w-5 h-5 group-hover:-translate-x-1 transition-all duration-300 stroke-[1.8]" />
          </a>
        </motion.div>
      </div>

      {/* 2×2 grid — Cards from bottom corners */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1, margin: '0px 0px -100px 0px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 justify-items-center max-w-[1140px] mx-auto"
      >
        {projects.map((project, index) => {
          return (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="group relative w-full max-w-[529px] h-[420px] sm:h-[500px] lg:h-[593px] rounded-[18px] overflow-hidden cursor-pointer border border-white/10 bg-[#1E201E] shadow-xl hover:shadow-[0_24px_50px_-10px_rgba(0,0,0,0.5)] hover:border-[#FFB800]/30 transition-all duration-500"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              <div className="absolute bottom-8 left-8 right-8 z-10 text-right">
                <p className="text-[#FFB800] font-bold text-lg sm:text-2xl lg:text-3xl leading-tight mb-1 drop-shadow-md">
                  {project.subtitle}
                </p>
                <h3 className="text-white font-bold text-2xl sm:text-3xl lg:text-[40px] leading-tight drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1">
                  {project.title}
                </h3>
                <div className="flex items-center justify-end gap-3 mt-2">
                  <span className="text-white/50 text-xs font-mono">{project.year}</span>
                  <div className="h-px w-8 bg-white/20" />
                  <span className="text-white/60 text-xs">{project.location}</span>
                </div>
                <div className="w-0 group-hover:w-16 h-[3px] bg-[#FFB800] mt-3 rounded-full mr-auto ml-0 transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </div>
  </section>
);

export default ProjectsSection;

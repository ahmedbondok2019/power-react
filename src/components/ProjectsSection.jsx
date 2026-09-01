import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftCircle } from 'lucide-react';
import ImageOverlayCard from './ui/ImageOverlayCard';
import SectionTitle from './ui/SectionTitle';

const ProjectsSection = () => {
  const projects = [
    {
      subtitle: "مستشفى",
      title: "RoQiah Al Qaffari",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      subtitle: "محطة مترو",
      title: "KAFD",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    },
    {
      subtitle: "ثكنات العمال",
      title: "في نيوم",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop",
    },
    {
      subtitle: "المدارس",
      title: "الدولية البريطانية",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <section id="مشاريعنا" className="relative bg-white text-[#111312] overflow-hidden py-24 sm:py-32">
      
      {/* 3D Saudi Arabia Map Background - Exactly Centered on the Y-Axis (Vertical Center of Section) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1500px] h-[85%] flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <motion.img 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src="/saudi_arabia_3d_map_no_text2.png" 
          alt="Saudi Arabia 3D Map" 
          className="w-full h-full object-contain select-none drop-shadow-sm"
        />
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          
          {/* Right Side in RTL: Section Title (1st in DOM) */}
          <div className="text-right">
            <SectionTitle title="مشاريعنا" theme="light" />
          </div>

          {/* Left Side in RTL: "More Projects" Link (2nd in DOM) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <a 
              href="#مشاريعنا" 
              className="group flex items-center gap-2.5 text-[#374151] hover:text-[#FFB800] transition-colors duration-300 text-sm md:text-base font-medium"
            >
              <span>مزيد من المشاريع</span>
              <ArrowLeftCircle className="w-5 h-5 text-[#374151] group-hover:text-[#FFB800] group-hover:-translate-x-1 transition-all duration-300 stroke-[1.8]" />
            </a>
          </motion.div>
          
        </div>

        {/* Projects 2x2 Grid using ImageOverlayCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 justify-items-center max-w-[1140px] mx-auto">
          {projects.map((project, index) => (
            <ImageOverlayCard 
              key={index}
              subtitle={project.subtitle}
              title={project.title}
              imageSrc={project.image}
              textPosition="right"
              delay={index * 0.12}
              className="w-full max-w-[529px] h-[420px] sm:h-[500px] lg:h-[593px] rounded-[18px]"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from './ui/SectionTitle';
import ProjectDetailsModal from './projects/ProjectDetailsModal';

// Luxurious cubic-bezier curve for high-end feel
const EASE = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? 60 : -60,
    filter: 'blur(4px)',
  }),
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: 'linear', // سرعة واحدة ثابتة وسلسة من البداية للنهاية
    },
  },
};

const ProjectsSection = ({
  data,
  badge = '',
  title = '',
  mapImage = '',
  projects = [],
}) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const sectionBadge = data?.header?.badge || badge;
  const sectionTitle = data?.header?.title || title;
  const sectionMap = data?.header?.map_image || mapImage || '/saudi_arabia_3d_map_no_text2.png';
  const rawProjects = data?.items || projects || [];

  // Normalize project structure to ensure all properties work cleanly
  const displayProjects = rawProjects.map((p) => ({
    ...p,
    title: p.title,
    image: p.image,
    location: p.location || '',
    year: p.year || p.execution_year || '',
    category: p.category || p.category_obj?.name || p.subtitle || '',
  }));

  return (
    <section id="مشاريعنا" className="relative bg-[#FAFAFA] text-[#111312] overflow-hidden py-24 sm:py-32">

      {/* Saudi map subtle 3D background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1500px] h-[90%] flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-40">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1.08 }}
          viewport={{ once: false }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          src={sectionMap}
          alt=""
          className="w-full h-full object-contain select-none"
        />
      </div>

      {/* Decorative soft radial background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FFB800]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header: title + link */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 sm:mb-20 gap-6">
          <motion.div
            className="text-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {sectionBadge && (
              <div className="flex items-center gap-2 justify-end mb-2 text-[#FFB800] text-sm font-bold tracking-wider">
                <span className="w-8 h-[2px] bg-[#FFB800] rounded-full inline-block" />
                <span>{sectionBadge}</span>
              </div>
            )}
            <SectionTitle title={sectionTitle} theme="light" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <Link 
              to="/projects" 
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 hover:bg-[#FFB800] text-[#1E201E] border border-black/5 hover:border-[#FFB800] shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-sm sm:text-base"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">مزيد من المشاريع</span>
              <span className="w-8 h-8 rounded-full bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* 2×2 grid — Smooth staggered Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 justify-items-center max-w-[1140px] mx-auto"
        >
          {displayProjects.map((project, index) => {
            return (
              <motion.div
                key={project.id || index}
                custom={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
                }}
                onClick={() => setSelectedProject(project)}
                className="group relative w-full max-w-[529px] h-[430px] sm:h-[490px] lg:h-[540px] rounded-[24px] overflow-hidden cursor-pointer bg-[#141514] shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.25)] border border-black/5 transition-all duration-500"
              >
                {/* Card Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-linear group-hover:scale-110"
                  />
                </div>

                {/* Multi-layer gradients for rich contrast & readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-500 group-hover:via-black/50" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-80" />
                
                {/* Hover Highlight Ring */}
                <div className="absolute inset-0 rounded-[24px] border-2 border-transparent group-hover:border-[#FFB800]/40 transition-colors duration-500 pointer-events-none" />

                {/* Top Floating Action Pill */}
                <div className="absolute top-6 left-6 z-20">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-500 group-hover:bg-[#FFB800] group-hover:text-black group-hover:scale-110 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Top Tag */}
                <div className="absolute top-6 right-6 z-20">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium tracking-wide">
                    {project.location}
                  </span>
                </div>

                {/* Bottom Information */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 text-right transform transition-transform duration-500">
                  
                  {/* Category / Subtitle */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFB800]/20 border border-[#FFB800]/40 backdrop-blur-sm text-[#FFB800] font-bold text-xs sm:text-sm mb-2.5">
                    <span>{project.category || project.subtitle}</span>
                  </div>

                  {/* Main Title */}
                  <h3 className="text-white font-bold text-2xl sm:text-3xl lg:text-[34px] leading-snug drop-shadow-md transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
                    {project.title}
                  </h3>

                  {/* Metadata details (Location & Year) */}
                  <div className="flex items-center justify-end gap-4 mt-3 pt-3 border-t border-white/15 text-white/70 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{project.year}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Animated Accent Bar */}
                  <div className="h-[3px] bg-gradient-to-l from-[#FFB800] to-transparent w-12 group-hover:w-full transition-all duration-500 ease-linear mt-3 rounded-full mr-auto ml-0" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Interactive Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;

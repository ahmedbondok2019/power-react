import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { containerVariants, cardVariants } from '../../utils/animations';
import {
  Server,
  Droplets,
  Warehouse,
  Wind,
  ShoppingBag,
  SunMedium,
  Building,
  FlaskConical,
  Anchor,
  MapPin,
  Calendar,
  Layers,
  ArrowLeft
} from 'lucide-react';

const AdditionalProjectsSection = ({
  data,
  projects,
  items,
  title = "المشاريع الإضافية",
  subtitle = "سجل ممتد من المشروعات النوعية والتخصصية المنفذة في مختلف مناطق المملكة",
  onSelectProject,
}) => {
  const displayList = data?.items || projects || items || [];

  if (!displayList || displayList.length === 0) return null;

  return (
    <section 
      id="مشاريع-إضافية"
      className="relative w-full bg-[#141615] text-white py-20 lg:py-28 overflow-hidden select-none border-t border-white/5"
      dir="rtl"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#FFB800]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#2A352F]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-right mb-14 sm:mb-16">
          <SectionTitle title={data?.header?.title || title} theme="dark" />
          <p className="text-white/70 text-sm sm:text-base mt-3 max-w-2xl font-sans">
            {data?.header?.subtitle || subtitle}
          </p>
        </div>

        {/* Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          {displayList.map((project, idx) => {
            const IconComponent = project.icon || (idx % 3 === 0 ? Server : idx % 3 === 1 ? Droplets : Warehouse);
            const isCompleted = (project.status || '').includes('مكتمل');
            
            return (
              <motion.div
                key={project.id || idx}
                variants={cardVariants}
                onClick={() => onSelectProject && onSelectProject(project)}
                className="group relative rounded-2xl bg-[#1A1D1B] border border-white/10 p-5 sm:p-6 flex flex-col justify-between hover:border-[#FFB800]/50 transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer"
              >
                <div>
                  {/* Top Bar: Icon + Status Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800] group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      isCompleted 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/25'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isCompleted ? 'bg-emerald-400' : 'bg-[#FFB800]'
                      }`} />
                      <span>{project.status}</span>
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="text-right space-y-1 mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFB800] transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/50 font-mono">
                      {project.titleEn}
                    </p>
                  </div>

                  {/* Compact Metadata Row */}
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-3 text-right">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FFB800]" />
                      <span>{project.location}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#FFB800]" />
                      <span>{project.year}</span>
                    </span>
                    <span>•</span>
                    <span className="text-[#FFB800]/80">
                      {project.category}
                    </span>
                  </div>

                  {/* Short Scope Text */}
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed text-right line-clamp-2">
                    {project.scope}
                  </p>
                </div>

                {/* Clean Bottom Bar */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-[#FFB800] font-mono border border-white/5">
                    {project.highlight}
                  </span>

                  <div className="flex items-center gap-1 text-white/70 group-hover:text-[#FFB800] text-xs font-semibold group-hover:-translate-x-1 transition-all">
                    <span>تفاصيل المشروع</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default AdditionalProjectsSection;

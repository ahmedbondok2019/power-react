import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  ExternalLink,
  Cpu,
  Clock,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  // Lock body scroll when modal is open and handle ESC key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!project) return null;

  const IconComponent = project.icon || Building2;
  const isCompleted = project.statusType === 'completed' || project.year?.includes('2023') || project.year?.includes('2024');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 select-none" dir="rtl">
          
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#171918] border border-white/15 rounded-3xl sm:rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white z-10 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex flex-col justify-between"
          >
            {/* Close Button Floating */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 left-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-[#FFB800] text-white hover:text-black border border-white/20 transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Modal Header: Image Hero OR Technical Glow Header */}
            {project.image ? (
              <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171918] via-[#171918]/50 to-black/40" />

                {/* Badges Over Image */}
                <div className="absolute bottom-6 right-6 left-6 flex flex-wrap items-center justify-between gap-3 text-right">
                  <div className="space-y-1.5">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FFB800] text-black font-extrabold text-xs shadow-md">
                      {project.category || 'مشروع هندسي'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                      {project.title}
                    </h2>
                    {project.titleEn && (
                      <p className="text-xs sm:text-sm text-white/80 font-mono">
                        {project.titleEn}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative p-6 sm:p-8 bg-gradient-to-b from-[#222724] to-[#171918] border-b border-white/10 shrink-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800] shadow-inner">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20 font-bold text-xs">
                      {project.category || 'المشاريع التخصصية'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                      {project.title}
                    </h2>
                    {project.titleEn && (
                      <p className="text-xs text-white/60 font-mono mt-0.5">
                        {project.titleEn}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-6 text-right">
              
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="space-y-1">
                  <span className="text-[11px] text-white/50 block font-medium">المدينة والموقع</span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white">
                    <MapPin className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
                    <span>{project.location || 'المملكة العربية السعودية'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-white/50 block font-medium">سنة التنفيذ</span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white">
                    <Calendar className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
                    <span>{project.year || '2023 - 2024'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-white/50 block font-medium">حالة المشروع</span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{project.status || 'مكتمل ومسلّم'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-white/50 block font-medium">المعايير المطبقة</span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FFB800]">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{project.highlight || 'ISO & Saudi Code'}</span>
                  </div>
                </div>
              </div>

              {/* Scope of Work Section */}
              <div className="space-y-2.5">
                <h4 className="text-sm font-bold text-[#FFB800] flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>نطاق الأعمال والحلول الهندسية</span>
                </h4>
                <div className="p-4 rounded-2xl bg-black/30 border border-white/5 text-sm text-white/80 leading-relaxed">
                  {project.scope || 'تنفيذ وتوريد الأعمال المتكاملة وفق أعلى المعايير الفنية والهندسية المعتمدة في كود البناء السعودي.'}
                </div>
              </div>

              {/* Key Deliverables if present */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-sm font-bold text-[#FFB800] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>أبرز المخرجات والمواصفات الفنية</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/90"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs & Performance Stats */}
              {(project.stats || project.specs) && (
                <div className="space-y-2.5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#FFB800]" />
                    <span>مؤشرات وأرقام الأداء</span>
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {Object.entries(project.stats || project.specs).map(([key, val], idx) => (
                      <div
                        key={idx}
                        className="px-3.5 py-2 rounded-xl bg-white/5 border border-[#FFB800]/20 text-xs font-mono text-white flex items-center gap-2"
                      >
                        <span className="text-[#FFB800] font-bold">•</span>
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Bar */}
            <div className="p-6 bg-[#121413] border-t border-white/10 rounded-b-3xl sm:rounded-b-[2rem] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <p className="text-xs text-white/60 text-right">
                هل ترغب في الحصول على دراسة فنية أو تنفيذ مماثل لمشروعك؟
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/#اتصل-بنا"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#FFB800] hover:bg-[#EAB308] text-black font-extrabold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-[#FFB800]/20 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>تواصل معنا للمشروع</span>
                </Link>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;

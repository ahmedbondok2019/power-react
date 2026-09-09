import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import AdditionalProjectsSection from '../components/projects/AdditionalProjectsSection';
import ProjectDetailsModal from '../components/projects/ProjectDetailsModal';
import { useProjectsPageData } from '../hooks/useProjectsPageData';
import {
  MapPin,
  Calendar,
  Sparkles,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { data: pageData, isLoading } = useProjectsPageData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Collect all project items from API sections
  const allApiProjects = useMemo(() => {
    const mainList = pageData?.projects_section?.items || [];
    const addList = pageData?.additional_projects_section?.items || [];
    return [...mainList, ...addList];
  }, [pageData]);

  // Main projects (type === 'main')
  const mainProjects = useMemo(() => {
    const list = allApiProjects.filter(p => p.type === 'main');
    return list.length > 0 ? list : (pageData?.projects_section?.items || []);
  }, [allApiProjects, pageData]);

  // Additional projects (type !== 'main' or from additional_projects_section)
  const additionalProjects = useMemo(() => {
    const list = allApiProjects.filter(p => p.type !== 'main');
    return list.length > 0 ? list : (pageData?.additional_projects_section?.items || []);
  }, [allApiProjects, pageData]);

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black">

      {/* Hero Section matching the exact design and stats cards from About */}
      <Hero
        id="projects-hero"
        badge="مشاريعنا"
        title="إرثٌ يُبنى على أرض الواقع"
        subtitle={
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl text-right font-medium">
            نستعرض مجموعة من مشاريعنا المنفذة والجارية في مختلف مناطق المملكة، والتي تعكس خبرتنا في تنفيذ المشاريع وتقديم الحلول الهندسية والإنشائية وفق أعلى معايير الجودة والسلامة والكفاءة.
          </p>
        }
        buttonText="اتصل بنا"
        buttonLink="/contact"
        bgImage="/projects-hero-bg.jpg"
        showVisionLogo={false}
        showStatsCards={true}
        stats={[
          { number: 16, label: "عاماً من الخبرة" },
          { number: 50, label: "مشروعاً مكتمل" },
          { number: 10, label: "مدن رئيسية" }
        ]}
      />

      {/* Main Content Area (Spaced below the overlapping floating stats cards) */}
      <section className="relative pt-60 sm:pt-64 pb-24 overflow-hidden" dir="rtl">

        {/* Ambient Lighting & Background Elements */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#FFB800]/5 rounded-full blur-[160px] pointer-events-none -z-0" />
        <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-[#2A352F]/30 rounded-full blur-[160px] pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Section Header */}
          <div className="text-right mb-12 sm:mb-16">
            <SectionTitle title="مشاريعنا" theme="dark" />
            <p className="text-white/70 text-sm sm:text-base lg:text-lg mt-4 max-w-2xl">
              بصمة هندسية متميزة في أضخم المشروعات التنموية والصناعية والحضرية في المملكة العربية السعودية. (اضغط على أي مشروع للاطلاع على التفاصيل الكاملة)
            </p>
          </div>

          {/* Projects Cards Grid with Bottom-to-Top Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 70, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 20,
                  mass: 0.8,
                  delay: (idx % 6) * 0.15
                }}
                onClick={() => setSelectedProject(project)}
                className="group bg-[#1A1D1B] rounded-3xl border border-white/10 overflow-hidden hover:border-[#FFB800]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-2xl cursor-pointer"
              >
                <div>
                  {/* Project Image Banner */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D1B] via-transparent to-black/30" />

                    {/* Top Category Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#FFB800]">
                        {project.category || project.category_obj?.name}
                      </span>
                    </div>

                    {/* Location Tag */}
                    <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-xs text-white/90 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Project Info Body */}
                  <div className="p-6 text-right space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    {project.titleEn && (
                      <p className="text-xs text-[#FFB800] font-mono tracking-wide">
                        {project.titleEn}
                      </p>
                    )}
                    <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                      {project.scope}
                    </p>
                  </div>
                </div>

                {/* Bottom Metadata & Specs Bar */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#FFB800]" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#FFB800] font-semibold group-hover:translate-x-1 transition-transform">
                      <span>عرض تفاصيل المشروع</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Additional Projects Section (المشاريع الإضافية - filtered by type !== 'main') */}
      <AdditionalProjectsSection
        items={additionalProjects}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Interactive Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Bottom Call To Action */}
      <section className="bg-[#111312] py-16 px-6 relative z-10" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1C2420] via-[#1E201E] to-[#181D1A] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl text-right">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2 text-[#FFB800] text-xs sm:text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>شريكك الموثوق في البناء والإنشاء</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                هل تخطط لمشروعك الإنشائي أو الكهروميكانيكي القادم؟
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                تواصل مع خبرائنا الهندسيين اليوم لمناقشة المتطلبات الفنية والجدول الزمني وتقديم الحلول المتكاملة.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-2xl bg-[#FFB800] text-black font-extrabold text-sm sm:text-base hover:bg-[#EAB308] shadow-lg shadow-[#FFB800]/25 transition-all hover:scale-105 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>تواصل معنا الآن</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Projects;


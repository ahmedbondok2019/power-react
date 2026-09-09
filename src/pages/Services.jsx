import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Sparkles, 
  ArrowLeft, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Compass, 
  CheckSquare2,
  Calendar
} from 'lucide-react';
import Hero from '../components/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import ServiceDetailsModal from '../components/services/ServiceDetailsModal';
import { useServicesPageData } from '../hooks/useServicesPageData';

const getPillarIcon = (iconName) => {
  switch (iconName) {
    case 'ShieldCheck': return ShieldCheck;
    case 'Cpu': return Cpu;
    case 'Compass': return Compass;
    default: return ShieldCheck;
  }
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { data: pageData, isLoading } = useServicesPageData();

  const heroData = pageData?.hero_section;
  const servicesSection = pageData?.services_section;
  const items = servicesSection?.items || [];
  const valuePillars = pageData?.value_pillars;
  const modalSettings = pageData?.modal_settings;

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black" dir="rtl">
      {/* Services Hero */}
      <Hero
        id="services-hero"
        badge={heroData?.badge || "خدماتنا وحلولنا"}
        title={
          heroData?.title ? (
            <span className="whitespace-pre-line">{heroData.title}</span>
          ) : (
            <>
              حلول هندسية شاملة. <br />
              إمكانات مقاولات متكاملة.
            </>
          )
        }
        subtitle={
          heroData?.paragraphs && heroData.paragraphs.length > 0 ? (
            <div className="space-y-2 text-right">
              {heroData.paragraphs.map((p, idx) => (
                <p key={idx} className={idx > 0 ? "text-white/70 text-xs sm:text-sm" : ""}>
                  {p}
                </p>
              ))}
            </div>
          ) : (
            <div className="space-y-2 text-right">
              <p>
                {heroData?.subtitle || "نقدم في مجموعة باور منظومة متكاملة من خدمات المقاولات العامة والتنفيذ الكهروميكانيكي المتخصص، مغطين مختلف القطاعات الاستراتيجية في المملكة العربية السعودية."}
              </p>
            </div>
          )
        }
        buttonText={heroData?.button_text || "استكشف مشاريعنا"}
        buttonLink={heroData?.button_link || "/projects"}
        bgImage={heroData?.image || "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?q=80&w=1600&auto=format&fit=crop"}
        showVisionLogo={false}
        showStatsCards={true}
        stats={heroData?.stats || [
          { number: 8, label: "قطاعات تخصصية" },
          { number: 50, label: "مشروعاً منجزاً" },
          { number: 100, label: "نسبة الامتثال الفني" }
        ]}
      />

      {/* Main Services Grid Section */}
      <section className="relative w-full py-24 sm:py-32 bg-[#141615] overflow-hidden">
        {/* Decorative Background Lighting */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#FFB800]/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-[#2A352F]/30 rounded-full blur-[170px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Heading */}
          <div className="text-right mb-16 sm:mb-20">
            <SectionTitle title={servicesSection?.header?.title || "مجالات أعمالنا وخدماتنا"} theme="dark" />
            <p className="text-white/70 text-sm sm:text-base lg:text-lg mt-4 max-w-3xl leading-relaxed">
              {servicesSection?.header?.subtitle || "تغطي خدماتنا دورة حياة المشروع من الدراسات الأولية والهندسة القيمية وحتى التسليم والتشغيل المتكامل. اضغط على أي بطاقة لعرض التفاصيل الهندسية الكاملة للخدمة."}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center">
            {items.map((svc, idx) => {
              const displayTitle = svc.title || svc.arabic;
              const displayCategory = svc.category || svc.category_obj?.name;
              
              return (
                <motion.div
                  key={svc.id || idx}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    type: 'spring',
                    stiffness: 240,
                    damping: 22,
                    delay: (idx % 3) * 0.12
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  onClick={() => setSelectedService(svc)}
                  className="group relative w-full h-[400px] rounded-[26px] overflow-hidden cursor-pointer border border-white/10 bg-[#1A1D1B] shadow-2xl flex flex-col justify-end p-6 hover:border-[#FFB800]/50 transition-colors"
                >
                  {/* Background Card Image with Scale on Hover */}
                  <img
                    src={svc.image}
                    alt={displayTitle}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  {displayCategory && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-bold text-[#FFB800]">
                        {displayCategory}
                      </span>
                    </div>
                  )}

                  {/* Bottom Card Content */}
                  <div className="relative z-20 text-right space-y-2">
                    <h3 className="text-white font-sans text-xl sm:text-2xl font-bold leading-tight drop-shadow-md group-hover:text-[#FFB800] transition-colors whitespace-pre-line">
                      {displayTitle}
                    </h3>
                    
                    {svc.short_description && (
                      <p className="text-white/70 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {svc.short_description}
                      </p>
                    )}
                    
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                      <span className="group-hover:text-white transition-colors font-medium">عرض تفاصيل الخدمة</span>
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Integration & Value Pillars Section */}
      {valuePillars && valuePillars.length > 0 ? (
        <section className="py-20 bg-[#0F1110] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
              {valuePillars.map((pillar) => {
                const IconComp = getPillarIcon(pillar.icon);
                return (
                  <div key={pillar.id} className="p-7 rounded-3xl bg-[#171918] border border-white/10 hover:border-[#FFB800]/40 transition-colors space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800]">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-white">{pillar.title}</h4>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 bg-[#0F1110] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
              <div className="p-7 rounded-3xl bg-[#171918] border border-white/10 hover:border-[#FFB800]/40 transition-colors space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">الالتزام الصارم بالجودة والسلامة</h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  تطبيق منظومة ISO للجودة والسلامة المهنية وإدارة البيئة في كافة مواقع العمل والمنشآت.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-[#171918] border border-white/10 hover:border-[#FFB800]/40 transition-colors space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800]">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">التصنيع والتوريد المباشر</h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  امتلاك مصانع متقدمة وشراكات توزيع حصرية تضمن سرعة التوريد وتوفر أعلى درجات التحكم في الجودة.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-[#171918] border border-white/10 hover:border-[#FFB800]/40 transition-colors space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800]">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">الهندسة القيمية والتحسين</h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  تقديم دراسات هندسية تضمن ترشيد التكاليف واختصار الجداول الزمنية دون المساس بالمواصفات الفنية.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Service Details Pop-up Modal */}
      <ServiceDetailsModal
        service={selectedService}
        modalSettings={modalSettings}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};

export default Services;

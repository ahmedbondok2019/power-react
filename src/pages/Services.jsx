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
import { Link } from 'react-router-dom';

export const SERVICES_DATA = [
  {
    id: 'hospitality-resorts',
    title: 'HOSPITALITY\n& RESORTS',
    arabic: 'الضيافة والمنتجعات',
    category: 'الضيافة الفاخرة والسياحة',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop',
    description: 'تنفيذ المشروعات الفندقية الراقية والمنتجعات السياحية المتكاملة وفق أرفع المعايير العالمية للضيافة، مع التركيز على أنظمة التكييف الفائقة، المسابح والبحيرات الصناعية، الإضاءة المعمارية الذكية، ومرافق الاستجمام الفاخرة.',
    capabilities: [
      'تجهيز أنظمة التكييف والتهوية الفندقية فائقة الهدوء والتوفير للطاقة.',
      'شبكات المياه المركزية، معالجة وتنقية مياه المسابح ومرافق السبا.',
      'أعمال التشطيبات الكهروميكانيكية والمعمارية الدقيقة للردهات والأجنحة.',
      'حلول الطاقة الذكية وأنظمة إدارة غرف النزلاء الآلية (GRMS).'
    ]
  },
  {
    id: 'healthcare-medical',
    title: 'HEALTHCARE\n& MEDICAL',
    arabic: 'الرعاية الصحية',
    category: 'المنشآت الطبية والمستشفيات',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop',
    description: 'تنفيذ وتجهيز المستشفيات والمراكز الطبية التخصصية والمختبرات المعقمة، مع الالتزام التام باشتراطات وزارة الصحة والمعايير الدولية للسلامة ومكافحة العدوى.',
    capabilities: [
      'غرف العمليات الجراحية المعقمة (Cleanrooms) وأنظمة الضغط الهوائي التفاضلي.',
      'شبكات الغازات الطبية المركزية ومحطات الضخ والمراقبة الآمنة.',
      'أنظمة الطاقة الكهربائية الاحتياطية الحرجة ومولدات الطوارئ غير المنقطعة UPS.',
      'محطات معالجة مياه الغسيل الكلوي والتخلص الآمن من النفايات الطبية.'
    ]
  },
  {
    id: 'residential-development',
    title: 'RESIDENTIAL\nDEVELOPMENT',
    arabic: 'التطوير السكني',
    category: 'المجمعات والضواحي السكنية',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
    description: 'إنشاء الضواحي والمجمعات السكنية الحديثة والأبراج العصرية بتصاميم ذكية ومستدامة توفر أسلوب حياة متكامل ورفاهية معيشية بأعلى مواصفات البناء الحديث.',
    capabilities: [
      'بناء الهياكل الإنشائية والخرسانية العريضة وفق أنظمة كود البناء السعودي.',
      'التمديدات الكهروميكانيكية المتكاملة وتجهيزات المنازل الذكية (Smart Home).',
      'تطوير الحدائق الداخلية، مرافق الترفيه العائلي، وشبكات الري الآلية.',
      'محطات توزيع الطاقة الفرعية وحلول العزل الحراري والمائي المتطورة.'
    ]
  },
  {
    id: 'commercial-retail',
    title: 'COMMERCIAL\n& RETAIL',
    arabic: 'التجزئة والتجاري',
    category: 'المراكز التجارية والأبراج',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=1000&auto=format&fit=crop',
    description: 'إنشاء وتجهيز المولات التجارية الكبرى، ومقرات الشركات، والمجمعات متعددة الاستخدامات، مع دمج التقنيات الحديثة لتعزيز تجربة التسوق وبيئة الأعمال الديناميكية.',
    capabilities: [
      'تصنيع وتركيب شبكات مجاري الهواء المركزية لمساحات العرض الفسيحة.',
      'أنظمة إطفاء وإنذار الحريق الذكية المتوافقة مع الدفاع المدني.',
      'أعمال المصاعد والسلالم الكهربائية والواجهات الزجاجية الإنشائية الحديثة.',
      'شبكات الإنارة الموفرة والتوزيع الكهربائي لمقرات التجزئة والمطاعم العالمية.'
    ]
  },
  {
    id: 'infrastructure-civil',
    title: 'INFRASTRUCTURE\n& CIVIL',
    arabic: 'البنية التحتية والمدني',
    category: 'مشاريع البنية التحتية الوطنية',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1000&auto=format&fit=crop',
    description: 'تنفيذ أعمال الهندسة المدنية الضخمة ومشاريع البنية التحتية، بما يشمل شبكات المياه، خطوط الصرف، محطات الضخ، والأنفاق التحتية الداعمة للتنمية الحضرية.',
    capabilities: [
      'خطوط الأنابيب الضخمة ومحطات رفع وتوزيع المياه بأحدث مضخات KSB.',
      'أعمال الحفر العميق، دعم التربة، وصب الخرسانات المسلحة الثقيلة.',
      'غرف التحكم المركزي ومحطات التحويل الكهربائية فائقة الجهد.',
      'شبكات تصريف مياه الأمطار وتجهيزات تصريف السيول وحماية المرافق.'
    ]
  },
  {
    id: 'industrial-facilities',
    title: 'INDUSTRIAL\nFACILITIES',
    arabic: 'المنشآت الصناعية',
    category: 'المصانع والمستودعات واللوجستيات',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
    description: 'بناء المصانع المتطورة، المستودعات اللوجستية الذكية، والمرافق الصناعية المتخصصة بهياكل فولاذية وأنظمة تبريد وتخزين متقدمة تلبي متطلبات الثورة الصناعية.',
    capabilities: [
      'الهياكل الفولاذية العريضة (Steel Structures) والأرضيات الخرسانية المقواة.',
      'غرف التبريد والتجميد الصناعي والتكييف المخصص لخطوط الإنتاج.',
      'أنظمة التهوية الصناعية واستخلاص الغبار والغازات (POWER DUCT).',
      'محطات تغذية المولدات، شبكات ضغط الهواء، والرافعات العلوية الصناعية.'
    ]
  },
  {
    id: 'education-campuses',
    title: 'EDUCATION\n& CAMPUSES',
    arabic: 'التعليم والحرم الجامعي',
    category: 'المجمعات التعليمية والجامعات',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
    description: 'تطوير البيئات التعليمية والأكاديمية والمدارس والجامعات الذكية، بتجهيز قاعات المحاضرات، المختبرات، والمراكز الرياضية والبحثية الداعمة للابتكار المعرفي.',
    capabilities: [
      'القاعات والمدرجات الكبرى مع أنظمة العزل الصوتي والتجهيزات السمعية والبصرية.',
      'مختبرات العلوم المجهزة بشبكات التهوية المتخصصة وأنظمة الأمان والسلامة.',
      'المجمعات والملاعب الرياضية المغطاة وحمامات السباحة الأولمبية.',
      'حلول الطاقة النظيفة وشبكات الإنترنت الذكية لتغطية الحرم الجامعي كاملاً.'
    ]
  },
  {
    id: 'mep-engineering',
    title: 'MEP SPECIALIZED\nSOLUTIONS',
    arabic: 'الحلول الكهروميكانيكية المتكاملة',
    category: 'الأعمال الكهروميكانيكية المتخصصة',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop',
    description: 'الذراع التقني الرائد لمجموعة باور في تصميم وتنفيذ وتوريد أحدث المنظومات الكهروميكانيكية (ميكانيك، كهرباء، سباكة، وتحكم آلي) بدقة هندسية غير مسبوقة.',
    capabilities: [
      'تصنيع وتوريد مجاري الهواء المجلفنة والنسيجية عبر مصانع POWER DUCT و KIENZLER.',
      'توريد وتركيب أضخم محطات التبريد المركزي (Chillers) بشراكة استراتيجية مع TRANE.',
      'أنظمة الضخ المتقدمة ومحطات الرفع بالتعاون الحصري مع KSB العالمية.',
      'أنظمة إدارة المباني الذكية (BMS) للتحكم الرقمي الشامل وكفاءة الطاقة القصوى.'
    ]
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black" dir="rtl">
      {/* Services Hero */}
      <Hero
        id="services-hero"
        badge="خدماتنا وحلولنا"
        title={
          <>
            حلول هندسية شاملة. <br />
            إمكانات مقاولات متكاملة.
          </>
        }
        subtitle={
          <div className="space-y-2 text-right">
            <p>
              نقدم في مجموعة باور منظومة متكاملة من خدمات المقاولات العامة والتنفيذ الكهروميكانيكي المتخصص، مغطين مختلف القطاعات الاستراتيجية في المملكة العربية السعودية.
            </p>
            <p className="text-white/70 text-xs sm:text-sm">
              خبرات ممتدة تجمع بين الكفاءة الهندسية الميدانية، التصنيع المباشر، والشراكات العالمية الموثوقة.
            </p>
          </div>
        }
        buttonText="استكشف مشاريعنا"
        buttonLink="/projects"
        bgImage="https://images.unsplash.com/photo-1541888946425-d0fbb186156a?q=80&w=1600&auto=format&fit=crop"
        showVisionLogo={false}
        showStatsCards={true}
        stats={[
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
            <SectionTitle title="مجالات أعمالنا وخدماتنا" theme="dark" />
            <p className="text-white/70 text-sm sm:text-base lg:text-lg mt-4 max-w-3xl leading-relaxed">
              تغطي خدماتنا دورة حياة المشروع من الدراسات الأولية والهندسة القيمية وحتى التسليم والتشغيل المتكامل. اضغط على أي بطاقة لعرض التفاصيل الهندسية الكاملة للخدمة.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 justify-items-center">
            {SERVICES_DATA.map((svc, idx) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 22,
                  delay: (idx % 4) * 0.12
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                onClick={() => setSelectedService(svc)}
                className="group relative w-full max-w-[320px] h-[390px] rounded-[26px] overflow-hidden cursor-pointer border border-white/10 bg-[#1A1D1B] shadow-2xl flex flex-col justify-end p-6 hover:border-[#FFB800]/50 transition-colors"
              >
                {/* Background Card Image with Scale on Hover */}
                <img
                  src={svc.image}
                  alt={svc.arabic}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-bold text-[#FFB800]">
                    {svc.category}
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-20 text-right space-y-2">
                  <p className="text-[#FFB800] text-xs font-semibold tracking-wider uppercase">
                    {svc.arabic}
                  </p>
                  <h3 className="text-white font-sans text-xl sm:text-2xl font-bold leading-tight drop-shadow-md group-hover:text-[#FFB800] transition-colors whitespace-pre-line">
                    {svc.title}
                  </h3>
                  
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                    <span className="group-hover:text-white transition-colors font-medium">عرض تفاصيل الخدمة</span>
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Integration & Value Pillars Section */}
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

      {/* Service Details Pop-up Modal */}
      <ServiceDetailsModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};

export default Services;

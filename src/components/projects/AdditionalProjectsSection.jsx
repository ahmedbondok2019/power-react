import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
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

const ADDITIONAL_PROJECTS_DATA = [
  {
    id: 'data-center-riyadh',
    title: 'مركز البيانات السحابية (Tier IV)',
    titleEn: 'Hyperscale Tier IV Cloud Data Center',
    category: 'مراكز البيانات',
    location: 'الرياض',
    year: '2024',
    status: 'مكتمل',
    statusType: 'completed',
    icon: Server,
    scope: 'تنفيذ أعمال البنية التحتية الحرجة، أنظمة التبريد السائل الدقيق، ومولدات الطاقة غير المنقطعة UPS بقدرة 10MVA.',
    highlight: 'Tier IV Certified'
  },
  {
    id: 'water-treatment-rabigh',
    title: 'محطة معالجة وضخ المياه المركزية',
    titleEn: 'Central Water Pumping & Treatment Plant',
    category: 'البنية التحتية والمياه',
    location: 'رابغ',
    year: '2024',
    status: 'مكتمل',
    statusType: 'completed',
    icon: Droplets,
    scope: 'توريد وتركيب خطوط الأنابيب الفولاذية عالية الضغط والمضخات الكبرى مع نظام تحكم ومراقبة SCADA متكامل.',
    highlight: '80,000 م³/يوم'
  },
  {
    id: 'logistics-hub-dammam',
    title: 'مجمع المستودعات والتبريد الذكي',
    titleEn: 'Smart Logistics & Cold Storage Hub',
    category: 'الخدمات اللوجستية',
    location: 'الدمام',
    year: '2024',
    status: 'مكتمل',
    statusType: 'completed',
    icon: Warehouse,
    scope: 'تنفيذ الهياكل الفولاذية العريضة وشبكات التبريد الصناعي المتطورة وأرضيات المستودعات فائقة الاستواء.',
    highlight: '55,000 م²'
  },
  {
    id: 'dq-hvac-riyadh',
    title: 'تكييف المجمع السكني الدبلوماسي',
    titleEn: 'Diplomatic Quarter HVAC Modernization',
    category: 'كهروميكانيكا MEP',
    location: 'الرياض',
    year: '2023',
    status: 'مكتمل',
    statusType: 'completed',
    icon: Wind,
    scope: 'إحلال وتحديث مبردات الشيلر المركزية وشبكات توزيع الهواء وتكامل أنظمة إدارة المباني الذكية BMS.',
    highlight: '6,500 طن تبريد'
  },
  {
    id: 'avenues-east-khobar',
    title: 'المجمع التجاري "أفنيوز الشرق"',
    titleEn: 'East Avenues Commercial Complex',
    category: 'المباني التجارية',
    location: 'الخبر',
    year: '2024',
    status: 'قيد التنفيذ',
    statusType: 'ongoing',
    icon: ShoppingBag,
    scope: 'الأعمال الكهربائية للجهد المتوسط والمنخفض، شبكات التيار الخفيف والإنارة التفاعلية للمجمع.',
    highlight: '90,000 م²'
  },
  {
    id: 'solar-pv-sakaka',
    title: 'محطة الطاقة الشمسية الكهروضوئية',
    titleEn: 'Auxiliary Solar PV Power Station',
    category: 'الطاقة المتجددة',
    location: 'سكاكا',
    year: '2024',
    status: 'مكتمل',
    statusType: 'completed',
    icon: SunMedium,
    scope: 'الأعمال الإنشائية والمدنية، هياكل التثبيت الميكانيكية، وتركيب 45,000 لوح شمسي عالي الكفاءة.',
    highlight: '25 ميجاوات'
  },
  {
    id: 'the-gate-tower-jeddah',
    title: 'برج الأعمال "ذا جيت"',
    titleEn: 'The Gate Specialized Business Tower',
    category: 'الأبراج والمباني',
    location: 'جدة',
    year: '2024',
    status: 'مكتمل',
    statusType: 'completed',
    icon: Building,
    scope: 'أعمال مكافحة الحريق المعتمدة NFPA، والمصاعد البانورامية فائقة السرعة، والواجهات الزجاجية العازلة.',
    highlight: '32 طابقاً'
  },
  {
    id: 'forensic-labs-madina',
    title: 'مجمع المختبرات التحليلية',
    titleEn: 'Analytical Laboratories Complex',
    category: 'المنشآت الطبية والبحثية',
    location: 'المدينة المنورة',
    year: '2023',
    status: 'مكتمل',
    statusType: 'completed',
    icon: FlaskConical,
    scope: 'غرف العزل البيولوجي المعقمة، أنظمة الضغط التفاضلي والسلبي، وشبكات الغازات المخبرية فائقة النقاء.',
    highlight: '18 مختبراً معقماً'
  },
  {
    id: 'marine-corniche-jizan',
    title: 'تطوير المرافق والواجهة البحرية',
    titleEn: 'Marine Facilities & Waterfront',
    category: 'التطوير الحضري',
    location: 'جازان',
    year: '2024',
    status: 'قيد التنفيذ',
    statusType: 'ongoing',
    icon: Anchor,
    scope: 'الإنشاءات الخرسانية المقاومة للأملاح البحرية، شبكات الري الآلي، ومرافق رسو القوارب والإنارة الذكية.',
    highlight: '3.5 كم ساحلي'
  }
];

const AdditionalProjectsSection = ({ onSelectProject }) => {
  return (
    <section 
      id="مشاريع-إضافية"
      className="relative w-full bg-[#141615] text-white py-20 lg:py-28 overflow-hidden select-none border-t border-white/5"
      dir="rtl"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FFB800]/5 rounded-full blur-[150px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#2A352F]/30 rounded-full blur-[150px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-right mb-12 sm:mb-14">
          <SectionTitle title="المشاريع الإضافية" theme="dark" />
          <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-2xl mt-4 leading-relaxed font-medium">
            سجل ممتد من المشاريع الهندسية والتخصصية المنفذة في مختلف قطاعات المملكة.
          </p>
        </div>

        {/* Streamlined Minimalist Engineering Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADDITIONAL_PROJECTS_DATA.map((project, idx) => {
            const IconComponent = project.icon;
            const isCompleted = project.statusType === 'completed';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
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
        </div>

      </div>
    </section>
  );
};

export default AdditionalProjectsSection;

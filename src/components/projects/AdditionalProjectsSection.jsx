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
  CheckCircle2,
  Clock,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

const ADDITIONAL_PROJECTS_DATA = [
  {
    id: 'data-center-riyadh',
    code: 'PRJ-DC-01',
    title: 'مركز البيانات السحابية فائق الأمان (Tier IV)',
    titleEn: 'Hyperscale Tier IV Cloud Data Center',
    category: 'مراكز البيانات والاتصالات',
    location: 'الرياض',
    year: '2023 - 2024',
    status: 'مكتمل بنجاح',
    statusType: 'completed',
    icon: Server,
    scope: 'تنفيذ أعمال البنية التحتية الحرجة، أنظمة التبريد السائل الدقيق (Precision Cooling)، ومولدات الطاقة الاحتياطية المستمرة.',
    deliverables: [
      'أنظمة الطاقة غير المنقطعة (UPS) بقدرة 10MVA',
      'تجهيز قاعات الخوادم المعزولة حرارياً',
      'أنظمة إخماد الحرائق بالغاز النظيف FM200'
    ],
    specs: { capacity: '1,200 خادم', standard: 'Tier IV Certified' }
  },
  {
    id: 'water-treatment-rabigh',
    code: 'PRJ-WT-02',
    title: 'محطة معالجة وضخ المياه المركزية',
    titleEn: 'Central Water Pumping & Treatment Plant',
    category: 'محطات البنية التحتية والمياه',
    location: 'رابغ / المنطقة الغربية',
    year: '2022 - 2024',
    status: 'مكتمل وقيد التشغيل',
    statusType: 'completed',
    icon: Droplets,
    scope: 'توريد وتركيب خطوط الأنابيب الفولاذية عالية الضغط، المضخات الكبرى وغرف التحكم والمراقبة الآلية SCADA.',
    deliverables: [
      'مضخات طرد مركزي بقدرة ضخ 80,000 م³/يوم',
      'لوحات تحكم ومراقبة ذكية متكاملة',
      'خطوط نقل بطول 14 كم بأقطار متقدمة'
    ],
    specs: { output: '80,000 م³/يوم', control: 'SCADA Integrated' }
  },
  {
    id: 'logistics-hub-dammam',
    code: 'PRJ-LG-03',
    title: 'مجمع المستودعات اللوجستية والتبريد الذكي',
    titleEn: 'Smart Logistics & Cold Storage Hub',
    category: 'الخدمات اللوجستية والتخزين',
    location: 'ميناء الملك عبد العزيز / الدمام',
    year: '2023 - 2024',
    status: 'مكتمل ومسلّم',
    statusType: 'completed',
    icon: Warehouse,
    scope: 'الهياكل الفولاذية العريضة، شبكات التبريد الصناعي المتطورة، وأنظمة الإطفاء الرغوي المؤتمتة للمخازن الجمركية.',
    deliverables: [
      'مستودعات مبردة ومجمدة حتى -25°C',
      'أرضيات صناعية عالية التحمل فائق الاستواء',
      'أرصفة تحميل هيدروليكية ذكية (Dock Levelers)'
    ],
    specs: { area: '55,000 م²', capacity: '40,000 طبلية' }
  },
  {
    id: 'dq-hvac-riyadh',
    code: 'PRJ-MEP-04',
    title: 'تطوير شبكات التكييف المركزي للحي الدبلوماسي',
    titleEn: 'Diplomatic Quarter HVAC Modernization',
    category: 'المقاولات الكهروميكانيكية (MEP)',
    location: 'الرياض',
    year: '2023 - 2024',
    status: 'مكتمل بنجاح',
    statusType: 'completed',
    icon: Wind,
    scope: 'إحلال وتحديث مبردات الشيلر المركزية، شبكات توزيع الهواء المعزولة، وتكامل أنظمة إدارة المباني الذكية (BMS).',
    deliverables: [
      'وحدات تبريد مياه بقدرة 6,500 طن تبريد',
      'تحديث مجاري الهواء وتخفيض استهلاك الطاقة 35%',
      'تطبيق نظام مراقبة تدفق الهواء الذكي'
    ],
    specs: { cooling: '6,500 طن تبريد', efficiency: '35% توفير طاقة' }
  },
  {
    id: 'avenues-east-khobar',
    code: 'PRJ-CM-05',
    title: 'المجمع التجاري والإداري "أفنيوز الشرق"',
    titleEn: 'East Avenues Commercial & Business Complex',
    category: 'المباني التجارية والإدارية',
    location: 'الخبر / المنطقة الشرقية',
    year: '2024 - مستمر',
    status: 'قيد التنفيذ الميداني',
    statusType: 'ongoing',
    icon: ShoppingBag,
    scope: 'الأعمال الكهربائية للجهد المتوسط والمنخفض، شبكات التيار الخفيف والإنارة التفاعلية للواجهات والممرات.',
    deliverables: [
      'محولات توزيع قدرة 13.8kV وغرف كهرباء رئيسية',
      'شبكات الألياف الضوئية وأنظمة الأمن والمراقبة',
      'نظام مواقف سيارات ذكي متعدد المستويات'
    ],
    specs: { area: '90,000 م²', retail: '120 معرضاً ومكتباً' }
  },
  {
    id: 'solar-pv-sakaka',
    code: 'PRJ-RN-06',
    title: 'محطة الطاقة الشمسية الكهروضوئية المساندة',
    titleEn: 'Auxiliary Solar PV Power Station',
    category: 'الطاقة المتجددة والاستدامة',
    location: 'سكاكا / الجوف',
    year: '2023 - 2024',
    status: 'مكتمل بنجاح',
    statusType: 'completed',
    icon: SunMedium,
    scope: 'الأعمال الإنشائية والمدنية، هياكل التثبيت الميكانيكية، وربط عواكس ومحولات الطاقة بالشبكة المحلية.',
    deliverables: [
      'تركيب 45,000 لوح شمسي عالي الكفاءة',
      'شبكة كابلات تيار مستمر وتحكم متطورة',
      'محطة تحويل فرعية بقدرة 25 ميجاوات'
    ],
    specs: { power: '25 ميجاوات', panels: '45,000 لوح' }
  },
  {
    id: 'the-gate-tower-jeddah',
    code: 'PRJ-TW-07',
    title: 'برج الأعمال التخصصي "ذا جيت"',
    titleEn: 'The Gate Specialized Business Tower',
    category: 'الأبراج والمباني الشاهقة',
    location: 'جدة',
    year: '2022 - 2024',
    status: 'تسليم نهائي',
    statusType: 'completed',
    icon: Building,
    scope: 'أعمال مكافحة الحريق المعتمدة (NFPA)، المصاعد البانورامية فائقة السرعة، وأنظمة إدارة المرافق الحيوية.',
    deliverables: [
      'شبكات رشاشات ومضخات حريق مطابقة للمواصفات',
      '8 مصاعد ذكية عالية السرعة مجهزة بحجز الوجهة',
      'واجهات ألومنيوم وزجاجية مزدوجة عازلة للحرارة'
    ],
    specs: { floors: '32 طابقاً', height: '145 متراً' }
  },
  {
    id: 'forensic-labs-madina',
    code: 'PRJ-LB-08',
    title: 'مجمع المختبرات الجنائية والتحليلية',
    titleEn: 'Forensic & Analytical Laboratories Complex',
    category: 'المنشآت الطبية والبحثية',
    location: 'المدينة المنورة',
    year: '2023 - 2024',
    status: 'مكتمل بنجاح',
    statusType: 'completed',
    icon: FlaskConical,
    scope: 'غرف العزل البيولوجي المعقمة، أنظمة الضغط التفاضلي والسلبي، وشبكات الغازات المخبرية النقية.',
    deliverables: [
      'فلاتر هواء HEPA فائقة النقاء لغرف الأبحاث',
      'شبكات غازات نقية متوافقة مع متطلبات المعايرة',
      'أثاث ومقاعد مخبرية معالجة ضد الأحماض والمواد الكيميائية'
    ],
    specs: { labs: '18 مختبراً تخصصياً', standard: 'ISO 17025 Compliant' }
  },
  {
    id: 'marine-corniche-jizan',
    code: 'PRJ-MR-09',
    title: 'تطوير واجهة الكورنيش والمرافق البحرية',
    titleEn: 'North Corniche Marine Facilities & Promenade',
    category: 'التطوير الحضري والسياحي',
    location: 'جازان',
    year: '2024 - مستمر',
    status: 'قيد التنفيذ الميداني',
    statusType: 'ongoing',
    icon: Anchor,
    scope: 'الإنشاءات الخرسانية المقاومة للأملاح البحرية، شبكات الري الآلي، وممشى بحري مزود بأنظمة الإنارة الذكية.',
    deliverables: [
      'جدار حماية بحري بطول 3.5 كم وخرسانات معالجة',
      'مرافق رسو قوارب نزهة وخدمات لوجستية',
      'إنارة تجميلية ذكية موفرة للطاقة مع أنظمة تحكم مركزي'
    ],
    specs: { length: '3.5 كم ساحلي', concrete: '40,000 م³ خرسانة' }
  }
];

const AdditionalProjectsSection = () => {
  return (
    <section 
      id="مشاريع-إضافية"
      className="relative w-full bg-[#141615] text-white py-24 sm:py-32 overflow-hidden select-none border-t border-white/5"
      dir="rtl"
    >
      {/* Ambient Lighting & Glow */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-[#FFB800]/5 rounded-full blur-[160px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#2A352F]/30 rounded-full blur-[170px] pointer-events-none -z-0" />
      <div className="absolute top-10 right-1/4 w-[350px] h-[350px] bg-[#FFB800]/5 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-start w-full mb-12 sm:mb-16">
          <SectionTitle title="المشاريع الإضافية" theme="dark" />
          <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-3xl mt-4 leading-relaxed font-medium">
            سجل ممتد من المشاريع الهندسية التخصصية المنجزة والجارية في مختلف قطاعات البنية التحتية، الطاقة، المرافق الطبية، والمنشآت الحيوية في كافة أنحاء المملكة.
          </p>
        </div>

        {/* Professional Non-Image Engineering Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ADDITIONAL_PROJECTS_DATA.map((project, idx) => {
            const IconComponent = project.icon;
            const isCompleted = project.statusType === 'completed';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="group relative rounded-3xl bg-gradient-to-br from-[#1C201D]/90 via-[#161817]/95 to-[#101211] border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-[#FFB800]/50 transition-all duration-400 shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Subtle Card Ambient Glow on Hover */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 rounded-full blur-3xl transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon, Code & Status Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800] group-hover:scale-110 transition-transform duration-300 shadow-inner">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60">
                        {project.code}
                      </span>
                    </div>

                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      isCompleted 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/25'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isCompleted ? 'bg-emerald-400' : 'bg-[#FFB800] animate-pulse'
                      }`} />
                      <span>{project.status}</span>
                    </div>
                  </div>

                  {/* Project Titles */}
                  <div className="space-y-1.5 mb-4 text-right">
                    <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#FFB800]/90 font-mono tracking-wide">
                      {project.titleEn}
                    </p>
                  </div>

                  {/* Location, Category & Date Metadata Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="flex items-center gap-1 text-xs text-white/80 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{project.location}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/80 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{project.year}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/80 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      <Layers className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{project.category}</span>
                    </span>
                  </div>

                  {/* Scope Description */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 mb-5 text-right">
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                      {project.scope}
                    </p>
                  </div>

                  {/* Key Deliverables Bullet Points */}
                  <div className="space-y-2 mb-6 text-right">
                    <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-2">
                      أبرز المخرجات الفنية:
                    </span>
                    {project.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB800] shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Specs Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                  <div className="flex items-center gap-2">
                    {Object.entries(project.specs).map(([key, val], sIdx) => (
                      <span key={sIdx} className="bg-white/5 px-2.5 py-1 rounded-md text-[11px] text-white/70 border border-white/5 font-mono">
                        {val}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[#FFB800] font-bold group-hover:-translate-x-1 transition-transform">
                    <span>تفاصيل النطاق</span>
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

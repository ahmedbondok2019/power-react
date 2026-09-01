import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import ImageOverlayCard from '../components/ui/ImageOverlayCard';
import {
  Building2,
  MapPin,
  Calendar,
  Layers,
  ArrowLeftCircle,
  Sparkles,
  Search,
  CheckCircle2,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  'الكل',
  'المشاريع الكبرى ونيوم',
  'المباني الطبية والصحية',
  'النقل والبنية التحتية',
  'التعليم والمرافق الأكاديمية',
  'الوجهات الترفيهية والتجارية'
];

const PROJECTS_LIST = [
  {
    id: 'kafd-metro',
    title: 'محطة مترو مركز الملك عبدالله المالي',
    titleEn: 'KAFD Metro Station',
    category: 'النقل والبنية التحتية',
    location: 'الرياض',
    year: '2022 - 2024',
    scope: 'الأعمال الكهروميكانيكية المتكاملة وأنظمة التهوية والتبريد والتحكم الذكي',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    stats: { area: '45,000 م²', capacity: '100k راكب/يوم' }
  },
  {
    id: 'roqiah-hospital',
    title: 'مستشفى رقية القفاري التخصصي',
    titleEn: 'RoQiah Al Qaffari Specialist Hospital',
    category: 'المباني الطبية والصحية',
    location: 'القصيم',
    year: '2021 - 2023',
    scope: 'التجهيزات الطبية المتخصصة، شبكات الغازات الطبية، وغرف العمليات المعقمة',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    stats: { beds: '300 سرير', theaters: '12 غرفة عمليات' }
  },
  {
    id: 'neom-camps',
    title: 'مجمعات ومرافق سكن العاملين بنيوم',
    titleEn: 'NEOM Pioneer Residential Communities',
    category: 'المشاريع الكبرى ونيوم',
    location: 'نيوم / تبوك',
    year: '2022 - مستمر',
    scope: 'حلول البناء السريع، شبكات الطاقة المستقلة ومحطات تنقية المياه ومعالجة الصرف',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    stats: { capacity: '15,000 مقيم', units: '3,500 وحدة سكنية' }
  },
  {
    id: 'british-schools',
    title: 'المدارس البريطانية الدولية',
    titleEn: 'British International Schools Campus',
    category: 'التعليم والمرافق الأكاديمية',
    location: 'الرياض',
    year: '2020 - 2022',
    scope: 'المباني الأكاديمية الذكية، المجمعات الرياضية المغلقة والمختبرات العلمية',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    stats: { students: '2,500 طالب', labs: '24 مختبراً علمياً' }
  },
  {
    id: 'sindallah-resort',
    title: 'جزيرة سندالة البحرية الفاخرة',
    titleEn: 'Sindalah Luxury Island Resort',
    category: 'المشاريع الكبرى ونيوم',
    location: 'نيوم / البحر الأحمر',
    year: '2023 - 2024',
    scope: 'الأعمال البحرية والإنشائية الفاخرة وأنظمة الطاقة المستدامة',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    stats: { berths: '86 مرسى يخت', hotels: '3 منتجعات فاخرة' }
  },
  {
    id: 'riyadh-front-hub',
    title: 'واجهة الرياض للأعمال والابتكار',
    titleEn: 'Riyadh Front Business Hub',
    category: 'الوجهات الترفيهية والتجارية',
    location: 'الرياض',
    year: '2019 - 2021',
    scope: 'مجمعات المكاتب الذكية، الواجهات الزجاجية المتطورة ومحطات التبريد المركزي',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    stats: { area: '180,000 م²', offices: '60+ مقراً عالمياً' }
  },
  {
    id: 'qiddiyah-entertainment',
    title: 'مجمع القدية الترفيهي والرياضي',
    titleEn: 'Qiddiya Entertainment & Sports Complex',
    category: 'الوجهات الترفيهية والتجارية',
    location: 'الرياض / القدية',
    year: '2023 - مستمر',
    scope: 'الإنشاءات الكبرى والمرافق الرياضية المتوافقة مع المعايير الأولمبية',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    stats: { capacity: '40,000 متفرج', attractions: '18 مرفقاً ترفيهياً' }
  },
  {
    id: 'al-murabaa-downtown',
    title: 'داون تاون المربع الجديد',
    titleEn: 'New Murabba Modern Downtown',
    category: 'المشاريع الكبرى ونيوم',
    location: 'الرياض',
    year: '2023 - مستمر',
    scope: 'أعمال البنية التحتية التأسيسية وشبكات الخدمات للمدينة الذكية المستقبلية',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    stats: { area: '19 كم²', units: '104k وحدة سكنية' }
  },
  {
    id: 'seven-alkharj',
    title: 'وجهة مشاريع الترفيه سفن - الخرج',
    titleEn: 'SEVEN Entertainment Destination - Al-Kharj',
    category: 'الوجهات الترفيهية والتجارية',
    location: 'الخرج / المنطقة الوسطى',
    year: '2023 - 2024',
    scope: 'المجمعات الترفيهية العائلية والمسارح المفتوحة والمطاعم الفاخرة',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    stats: { area: '65,000 م²', zones: '8 مناطق ترفيهية' }
  }
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = PROJECTS_LIST.filter(proj => {
    const matchesCat = selectedCategory === 'الكل' || proj.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.scope.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
        buttonLink="/#اتصل-بنا"
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="text-right">
              <SectionTitle title="مشاريعنا" theme="dark" />
              <p className="text-white/70 text-sm sm:text-base lg:text-lg mt-4 max-w-2xl">
                بصمة هندسية متميزة في أضخم المشروعات التنموية والصناعية والحضرية في المملكة العربية السعودية.
              </p>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="ابحث بالاسم أو المدينة أو النطاق..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1D1B] border border-white/10 rounded-2xl py-3.5 pr-11 pl-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800] transition-all"
              />
              <Search className="w-5 h-5 text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Filter Categories Pills */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 border ${selectedCategory === cat
                    ? 'bg-[#FFB800] text-black border-[#FFB800] shadow-lg shadow-[#FFB800]/25'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Cards Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 my-8">
              <Building2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">لم يتم العثور على مشاريع مطابقة</h3>
              <p className="text-white/60 text-sm">جرب اختيار تصنيف آخر أو مسح عبارة البحث.</p>
              <button
                onClick={() => { setSelectedCategory('الكل'); setSearchQuery(''); }}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#FFB800] text-black font-bold text-xs hover:bg-[#EAB308] transition-colors"
              >
                إعادة ضبط الفلاتر
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="group bg-[#1A1D1B] rounded-3xl border border-white/10 overflow-hidden hover:border-[#FFB800]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-2xl"
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

                        {/* Top Badges */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#FFB800]">
                            {project.category}
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
                        <p className="text-xs text-[#FFB800] font-mono tracking-wide">
                          {project.titleEn}
                        </p>
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
                          <span>تفاصيل المشروع</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Bottom Call To Action */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1C2420] via-[#1E201E] to-[#181D1A] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl text-right">
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
                to="/#اتصل-بنا"
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

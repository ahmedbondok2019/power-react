import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Sparkles, CheckCircle2, ChevronRight, Layers, Eye } from 'lucide-react';

// Data for Saudi presence locations and mega projects
const LOCATIONS_DATA = [
  {
    id: 'dumat-aljandal',
    nameEn: 'DUMAT-ALJANDAL',
    nameAr: 'دومة الجندل',
    region: 'الشمالية',
    sector: 'مشاريع البنية التحتية والطاقة المتجددة',
    desc: 'تنفيذ أعمال هندسية ومشاريع متخصصة تسهم في تنمية وتطوير المنطقة الشمالية.',
    pin: { x: 35.8, y: 37.5 },
    label: { x: 35.8, y: 21 },
    lineType: 'vertical-up',
    color: '#FFB800'
  },
  {
    id: 'neom',
    nameEn: 'NEOM',
    nameAr: 'نيوم',
    region: 'نيوم والمشاريع الكبرى',
    sector: 'مدن المستقبل والابتكار المستدام',
    desc: 'المساهمة في تنفيذ الحلول الكهروميكانيكية والإنشائية لأعظم مشاريع القرن.',
    pin: { x: 17.8, y: 41.2 },
    label: { x: 17.8, y: 29 },
    lineType: 'vertical-up',
    color: '#FFB800',
    isMega: true
  },
  {
    id: 'sindallah',
    nameEn: 'SINDALLAH',
    nameAr: 'جزيرة سندالة',
    region: 'نيوم والمشاريع الكبرى',
    sector: 'الضيافة الفاخرة والمنتجعات العالمية',
    desc: 'أعمال كهروميكانيكية وهندسية متقدمة لأولى وجهات نيوم الفاخرة للسياحة البحرية.',
    pin: { x: 18.2, y: 45.8 },
    label: { x: 12.8, y: 45.8 },
    lineType: 'horizontal-left',
    color: '#FFB800',
    isMega: true
  },
  {
    id: 'oxagon',
    nameEn: 'OXAGON',
    nameAr: 'أوكساجون',
    region: 'نيوم والمشاريع الكبرى',
    sector: 'المدينة الصناعية المتقدمة والموانئ الذكية',
    desc: 'حلول متكاملة للصناعات المتقدمة وسلاسل الإمداد ومرافق الطاقة النظيفة.',
    pin: { x: 17.2, y: 48.8 },
    label: { x: 12.8, y: 48.8 },
    lineType: 'horizontal-left',
    color: '#FFB800',
    isMega: true
  },
  {
    id: 'trojena',
    nameEn: 'TROJENA',
    nameAr: 'تروجينا',
    region: 'نيوم والمشاريع الكبرى',
    sector: 'السياحة الجبلية والمرافق الاستثنائية',
    desc: 'مشاريع نوعية في البيئات الجبلية المعقدة بأعلى معايير الاستدامة والسلامة.',
    pin: { x: 20.3, y: 51.8 },
    label: { x: 15.2, y: 51.8 },
    lineType: 'horizontal-left',
    color: '#FFB800',
    isMega: true
  },
  {
    id: 'madina',
    nameEn: 'MADINA',
    nameAr: 'المدينة المنورة',
    region: 'الغربية',
    sector: 'الضيافة، الإسكان، والمرافق الخدمية',
    desc: 'تنفيذ أعمال التطوير العمراني وخدمات المقاولات المتخصصة لخدمة ضيوف الرحمن.',
    pin: { x: 26.6, y: 58.2 },
    label: { x: 21.2, y: 58.2 },
    lineType: 'horizontal-left',
    color: '#FFB800'
  },
  {
    id: 'jeddah',
    nameEn: 'JEDDAH',
    nameAr: 'جدة',
    region: 'الغربية',
    sector: 'المشاريع التجارية والسكنية والبنية التحتية',
    desc: 'تنفيذ مشاريع تجارية وسكنية رائدة على الساحل الغربي بأعلى مواصفات الجودة.',
    pin: { x: 31.2, y: 64.5 },
    label: { x: 25.8, y: 64.5 },
    lineType: 'horizontal-left',
    color: '#FFB800'
  },
  {
    id: 'makkah',
    nameEn: 'MAKKAH',
    nameAr: 'مكة المكرمة',
    region: 'الغربية',
    sector: 'المشاريع الفندقية والتطوير العقاري',
    desc: 'خبرات متقدمة في المشروعات الضخمة والمرافق الحيوية في أقدس بقاع الأرض.',
    pin: { x: 33.8, y: 69.0 },
    label: { x: 28.4, y: 69.0 },
    lineType: 'horizontal-left',
    color: '#FFB800'
  },
  {
    id: 'jizan',
    nameEn: 'JIZAN',
    nameAr: 'جازان',
    region: 'الجنوبية',
    sector: 'المشاريع الصناعية والتنموية',
    desc: 'مشاريع مقاولات نوعية تدعم التنمية الاقتصادية والصناعية في المنطقة الجنوبية.',
    pin: { x: 41.2, y: 81.2 },
    label: { x: 34.8, y: 81.2 },
    lineType: 'horizontal-left',
    color: '#FFB800'
  },
  {
    id: 'najran',
    nameEn: 'NAJRAN',
    nameAr: 'نجران',
    region: 'الجنوبية',
    sector: 'المباني والمرافق الحكومية والتجارية',
    desc: 'تنفيذ أعمال المقاولات العامة والتشطيبات الكهروميكانيكية المتكاملة.',
    pin: { x: 51.8, y: 79.2 },
    label: { x: 51.8, y: 92.5 },
    lineType: 'vertical-down',
    color: '#FFB800'
  },
  {
    id: 'alqassim',
    nameEn: 'ALQASSIM',
    nameAr: 'القصيم',
    region: 'الوسطى',
    sector: 'المرافق التعليمية والتجارية والخدمية',
    desc: 'مشاريع حيوية وبنية تحتية تدعم النمو الاقتصادي والتجاري بالمنطقة.',
    pin: { x: 49.8, y: 52.0 },
    label: { x: 49.8, y: 35.0 },
    lineType: 'vertical-up',
    color: '#FFB800'
  },
  {
    id: 'dammam',
    nameEn: 'DAMMAM',
    nameAr: 'الدمام',
    region: 'الشرقية',
    sector: 'المنشآت الصناعية والمقرات اللوجستية',
    desc: 'خدمات هندسية متقدمة في قلب المنطقة الشرقية لقطاعات الصناعة واللوجستيات.',
    pin: { x: 89.5, y: 68.8 },
    label: { x: 89.5, y: 51.5 },
    lineType: 'vertical-up',
    color: '#FFB800'
  }
];

// Riyadh Sub-projects list
const RIYADH_PROJECTS = [
  { id: 'seven-alkharj', nameEn: 'SEVEN –ALKHARJ', nameAr: 'سفن - الخرج', desc: 'مشاريع الترفيه والوجهات العائلية الحديثة', y: 12.8 },
  { id: 'almurabaa', nameEn: 'ALMURABAA', nameAr: 'المربع الجديد', desc: 'داون تاون الرياض الحديث ورمز التطوير العصري', y: 16.6 },
  { id: 'ksp', nameEn: 'KSP', nameAr: 'حديقة الملك سلمان', desc: 'أكبر حدائق المدن في العالم والمرافق المرتبطة بها', y: 20.4 },
  { id: 'aldiriyah', nameEn: 'ALDIRIYAH', nameAr: 'الدرعية', desc: 'بوابة التاريخ والثقافة وأعمال التراث العمراني الفاخر', y: 24.2 },
  { id: 'riyadh-front', nameEn: 'RIYADH FRONT', nameAr: 'واجهة الرياض', desc: 'الوجهة الرائدة للأعمال والترفيه والتسوق', y: 28.0 },
  { id: 'qiddiyah', nameEn: 'QIDDIYAH', nameAr: 'القدية', desc: 'عاصمة الترفيه والرياضة والفنون بالمملكة', y: 31.8 },
  { id: 'roshn', nameEn: 'ROSHN', nameAr: 'روشن', desc: 'المجتمعات السكنية المتكاملة والأحياء الحضرية الذكية', y: 35.6 },
  { id: 'kafd', nameEn: 'KAFD', nameAr: 'مركز الملك عبد الله المالي', desc: 'المركز المالي العالمي وأبراج الأعمال المتقدمة', y: 39.4 },
  { id: 'boulevard', nameEn: 'BOULEVARD', nameAr: 'بوليفارد الرياض', desc: 'المرافق الترفيهية والتجارية وأضخم المسارح والفعاليات', y: 43.2 }
];

const REGIONS = [
  'الكل',
  'الوسطى ومشاريع العاصمة',
  'نيوم والمشاريع الكبرى',
  'الغربية',
  'الشرقية والشمالية',
  'الجنوبية'
];

const SaudiPresenceMapSection = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('الكل');
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'grid'

  // Filter locations based on category
  const filteredLocations = LOCATIONS_DATA.filter(loc => {
    if (selectedRegion === 'الكل') return true;
    if (selectedRegion === 'الوسطى ومشاريع العاصمة') return loc.region === 'الوسطى' || loc.id === 'riyadh';
    if (selectedRegion === 'نيوم والمشاريع الكبرى') return loc.region === 'نيوم والمشاريع الكبرى';
    if (selectedRegion === 'الغربية') return loc.region === 'الغربية';
    if (selectedRegion === 'الشرقية والشمالية') return loc.region === 'الشرقية' || loc.region === 'الشمالية';
    if (selectedRegion === 'الجنوبية') return loc.region === 'الجنوبية';
    return true;
  });

  return (
    <section className="relative w-full bg-[#141615] text-white pt-4 pb-24 select-none overflow-hidden" dir="rtl">
      
      {/* Background Ambience & Lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FFB800]/5 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-[#2A352F]/30 rounded-full blur-[150px] pointer-events-none -z-0" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Section Navigation / Toggle Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800] animate-pulse" />
            <span className="font-semibold text-white">الخريطة التفاعلية لانتشار المشاريع</span>
            <span className="text-white/40">|</span>
            <span className="text-xs text-[#FFB800] font-medium">13 موقعاً و 9 مشاريع عملاقة في الرياض</span>
          </div>

          {/* View Switcher Tabs (Map vs Directory) */}
          <div className="flex items-center bg-[#1E201E] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'map'
                  ? 'bg-[#FFB800] text-black shadow-lg shadow-[#FFB800]/20'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>الخريطة التفاعلية</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#FFB800] text-black shadow-lg shadow-[#FFB800]/20'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>دليل المواقع والمشاريع</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: INTERACTIVE 3D MAP */}
        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full rounded-3xl bg-[#111312] border border-white/10 p-2 sm:p-4 lg:p-8 shadow-2xl overflow-hidden"
          >
            {/* Aspect Ratio Container for the Map */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] max-w-[1250px] mx-auto flex items-center justify-center overflow-x-auto select-none">
              
              {/* The 3D Saudi Map Background */}
              <img
                src="/saudi_arabia_3d_map_no_text2.png"
                alt="Saudi Arabia 3D Project Map"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter brightness-105 contrast-110"
              />

              {/* SVG Connector Lines Layer */}
              <svg
                viewBox="0 0 1000 650"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Subtle Glow Filter for SVG lines */}
                  <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 1. DUMAT-ALJANDAL (Vertical Up) */}
                <line x1="358" y1="245" x2="358" y2="155" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="358" cy="245" r="3.5" fill="#FFB800" />
                <circle cx="358" cy="155" r="2.5" fill="#FFB800" />

                {/* 2. NEOM (Vertical Up) */}
                <line x1="178" y1="268" x2="178" y2="208" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="178" cy="268" r="3.5" fill="#FFB800" />
                <circle cx="178" cy="208" r="2.5" fill="#FFB800" />

                {/* 3. SINDALLAH (Horizontal Left) */}
                <line x1="182" y1="298" x2="135" y2="298" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="182" cy="298" r="3.5" fill="#FFB800" />
                <circle cx="135" cy="298" r="2.5" fill="#FFB800" />

                {/* 4. OXAGON (Horizontal Left) */}
                <line x1="172" y1="317" x2="135" y2="317" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="172" cy="317" r="3.5" fill="#FFB800" />
                <circle cx="135" cy="317" r="2.5" fill="#FFB800" />

                {/* 5. TROJENA (Horizontal Left) */}
                <line x1="203" y1="337" x2="159" y2="337" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="203" cy="337" r="3.5" fill="#FFB800" />
                <circle cx="159" cy="337" r="2.5" fill="#FFB800" />

                {/* 6. MADINA (Horizontal Left) */}
                <line x1="266" y1="378" x2="218" y2="378" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="266" cy="378" r="3.5" fill="#FFB800" />
                <circle cx="218" cy="378" r="2.5" fill="#FFB800" />

                {/* 7. JEDDAH (Horizontal Left) */}
                <line x1="312" y1="419" x2="264" y2="419" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="312" cy="419" r="3.5" fill="#FFB800" />
                <circle cx="264" cy="419" r="2.5" fill="#FFB800" />

                {/* 8. MAKKAH (Horizontal Left) */}
                <line x1="338" y1="448" x2="290" y2="448" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="338" cy="448" r="3.5" fill="#FFB800" />
                <circle cx="290" cy="448" r="2.5" fill="#FFB800" />

                {/* 9. JIZAN (Horizontal Left) */}
                <line x1="412" y1="528" x2="355" y2="528" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="412" cy="528" r="3.5" fill="#FFB800" />
                <circle cx="355" cy="528" r="2.5" fill="#FFB800" />

                {/* 10. NAJRAN (Vertical Down) */}
                <line x1="518" y1="515" x2="518" y2="585" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="518" cy="515" r="3.5" fill="#FFB800" />
                <circle cx="518" cy="585" r="2.5" fill="#FFB800" />

                {/* 11. ALQASSIM (Vertical Up) */}
                <line x1="498" y1="338" x2="498" y2="245" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="498" cy="338" r="3.5" fill="#FFB800" />
                <circle cx="498" cy="245" r="2.5" fill="#FFB800" />

                {/* 12. DAMMAM (Vertical Up) */}
                <line x1="895" y1="447" x2="895" y2="355" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />
                <circle cx="895" cy="447" r="3.5" fill="#FFB800" />
                <circle cx="895" cy="355" r="2.5" fill="#FFB800" />

                {/* 13. RIYADH HUB & TREE STRUCTURE */}
                {/* Vertical stem from Riyadh map pin up to label */}
                <line x1="581" y1="348" x2="581" y2="225" stroke="#FFB800" strokeWidth="1.8" filter="url(#gold-glow)" />
                <circle cx="581" cy="348" r="4" fill="#FFB800" />
                <circle cx="581" cy="225" r="2.5" fill="#FFB800" />

                {/* Horizontal branch from Riyadh text rightward to tree spine */}
                <line x1="595" y1="225" x2="662" y2="225" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />

                {/* Vertical Spine for Riyadh Projects (from top project to bottom project) */}
                <line x1="662" y1="83" x2="662" y2="281" stroke="#FFB800" strokeWidth="1.6" filter="url(#gold-glow)" />

                {/* 9 Horizontal Project Branches */}
                {RIYADH_PROJECTS.map((proj, idx) => {
                  const yCoord = 83 + idx * 24.75;
                  return (
                    <g key={proj.id}>
                      <line x1="662" y1={yCoord} x2="714" y2={yCoord} stroke="#FFB800" strokeWidth="1.4" filter="url(#gold-glow)" />
                      <circle cx="714" cy={yCoord} r="2.5" fill="#FFB800" />
                    </g>
                  );
                })}
              </svg>

              {/* INTERACTIVE HOTSPOTS & LABELS LAYER */}
              <div className="absolute inset-0 w-full h-full z-20 pointer-events-auto font-sans" dir="ltr">

                {/* 1. DUMAT-ALJANDAL */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: '35.8%', top: '21%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'dumat-aljandal'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    DUMAT-ALJANDAL
                  </span>
                </div>

                {/* 2. NEOM */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: '17.8%', top: '29%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'neom'))}
                >
                  <span className="text-[11px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    NEOM
                  </span>
                </div>

                {/* 3. SINDALLAH */}
                <div
                  className="absolute -translate-x-full -translate-y-1/2 cursor-pointer group pr-2"
                  style={{ left: '13.2%', top: '45.8%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'sindallah'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    SINDALLAH
                  </span>
                </div>

                {/* 4. OXAGON */}
                <div
                  className="absolute -translate-x-full -translate-y-1/2 cursor-pointer group pr-2"
                  style={{ left: '13.2%', top: '48.8%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'oxagon'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    OXAGON
                  </span>
                </div>

                {/* 5. TROJENA */}
                <div
                  className="absolute -translate-x-full -translate-y-1/2 cursor-pointer group pr-2"
                  style={{ left: '15.6%', top: '51.8%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'trojena'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    TROJENA
                  </span>
                </div>

                {/* 6. MADINA */}
                <div
                  className="absolute -translate-x-full -translate-y-1/2 cursor-pointer group pr-2"
                  style={{ left: '21.5%', top: '58.2%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'madina'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    MADINA
                  </span>
                </div>

                {/* 7. JEDDAH */}
                <div
                  className="absolute -translate-x-full -translate-y-1/2 cursor-pointer group pr-2"
                  style={{ left: '26.0%', top: '64.5%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'jeddah'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    JEDDAH
                  </span>
                </div>

                {/* 8. MAKKAH */}
                <div
                  className="absolute -translate-x-full -translate-y-1/2 cursor-pointer group pr-2"
                  style={{ left: '28.6%', top: '69.0%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'makkah'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    MAKKAH
                  </span>
                </div>

                {/* 9. JIZAN */}
                <div
                  className="absolute -translate-x-full -translate-y-1/2 cursor-pointer group pr-2"
                  style={{ left: '35.0%', top: '81.2%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'jizan'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    JIZAN
                  </span>
                </div>

                {/* 10. NAJRAN */}
                <div
                  className="absolute -translate-x-1/2 translate-y-1 cursor-pointer group"
                  style={{ left: '51.8%', top: '90.0%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'najran'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    NAJRAN
                  </span>
                </div>

                {/* 11. ALQASSIM */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: '49.8%', top: '35.0%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'alqassim'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    ALQASSIM
                  </span>
                </div>

                {/* 12. DAMMAM */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: '89.5%', top: '51.5%' }}
                  onClick={() => setActiveItem(LOCATIONS_DATA.find(d => d.id === 'dammam'))}
                >
                  <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    DAMMAM
                  </span>
                </div>

                {/* 13. RIYADH HUB LABEL */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: '58.1%', top: '29.5%' }}
                  onClick={() => setActiveItem({
                    id: 'riyadh',
                    nameEn: 'RIYADH',
                    nameAr: 'مدينة الرياض',
                    region: 'الوسطى',
                    sector: 'المشاريع العملاقة والمقرات الرئيسية',
                    desc: 'مركز الثقل الاقتصادي ومقر أكبر محفظة من المشاريع التنموية الكبرى في المملكة.',
                    projectsCount: 9
                  })}
                >
                  <span className="text-xs sm:text-sm lg:text-base font-black text-white tracking-wider group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    RIYADH
                  </span>
                </div>

                {/* 14. RIYADH 9 SUB-PROJECTS LIST */}
                {RIYADH_PROJECTS.map((proj, idx) => {
                  const topPercent = 12.8 + idx * 3.8;
                  return (
                    <div
                      key={proj.id}
                      className="absolute -translate-y-1/2 cursor-pointer group pl-2 transition-transform hover:translate-x-1"
                      style={{ left: '72.0%', top: `${topPercent}%` }}
                      onClick={() => setActiveItem({
                        ...proj,
                        region: 'الوسطى ومشاريع العاصمة',
                        sector: 'مشاريع الرياض الكبرى',
                        isMega: true
                      })}
                    >
                      <span className="text-[9px] sm:text-[11px] lg:text-xs font-bold text-white tracking-wide group-hover:text-[#FFB800] transition-colors whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {proj.nameEn}
                      </span>
                    </div>
                  );
                })}

                {/* PULSING RADAR RINGS ON ALL MAP PINS */}
                {LOCATIONS_DATA.map((loc) => (
                  <div
                    key={`pin-${loc.id}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                    style={{ left: `${loc.pin.x}%`, top: `${loc.pin.y}%` }}
                    onClick={() => setActiveItem(loc)}
                  >
                    <span className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#FFB800] ring-2 ring-black shadow-[0_0_8px_#FFB800]" />
                    </span>
                  </div>
                ))}

                {/* Riyadh Central Pin */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                  style={{ left: '58.1%', top: '53.5%' }}
                  onClick={() => setActiveItem({
                    id: 'riyadh',
                    nameEn: 'RIYADH',
                    nameAr: 'مدينة الرياض',
                    region: 'الوسطى',
                    sector: 'المشاريع العملاقة والمقرات الرئيسية',
                    desc: 'مركز الثقل الاقتصادي ومقر أكبر محفظة من المشاريع التنموية الكبرى في المملكة.'
                  })}
                >
                  <span className="relative flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-80" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#FFB800] ring-2 ring-black shadow-[0_0_12px_#FFB800]" />
                  </span>
                </div>

              </div>
            </div>

            {/* Interactive Info Banner at the bottom of Map */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70 px-2 sm:px-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFB800]" />
                <span>انقر على أي مدينة أو مشروع لاستعراض تفاصيل النطاق والقطاع</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFB800]" />
                  <span>مشاريع ومواقع نشطة</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span>تغطية جغرافية شاملة</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: DIRECTORY & CARDS GRID (Perfect for deep exploration & Mobile) */}
        {viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {REGIONS.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    selectedRegion === reg
                      ? 'bg-[#FFB800] text-black shadow-md shadow-[#FFB800]/20'
                      : 'bg-[#1E201E] text-white/80 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            {/* Locations Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredLocations.map((loc) => (
                <motion.div
                  key={loc.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveItem(loc)}
                  className="bg-[#1E201E] border border-white/10 hover:border-[#FFB800]/50 rounded-2xl p-6 text-right transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  {loc.isMega && (
                    <div className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-[#FFB800]/15 text-[#FFB800] text-[10px] font-black tracking-wider">
                      MEGA PROJECT
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black flex items-center justify-center transition-all duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#FFB800] transition-colors">
                        {loc.nameAr}
                      </h4>
                      <p className="text-xs text-white/50 font-mono">{loc.nameEn}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="text-[#FFB800] font-medium">{loc.sector}</p>
                    <p className="text-white/70 leading-relaxed line-clamp-2">{loc.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/50 group-hover:text-white">
                    <span>المنطقة: {loc.region}</span>
                    <ChevronRight className="w-4 h-4 text-[#FFB800] group-hover:-translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}

              {/* Riyadh Mega Hub Card in Grid */}
              {(selectedRegion === 'الكل' || selectedRegion === 'الوسطى ومشاريع العاصمة') && (
                <div className="sm:col-span-2 lg:col-span-3 rounded-2xl bg-gradient-to-r from-[#1C2420] via-[#1E201E] to-[#181D1A] border border-[#FFB800]/30 p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-md bg-[#FFB800] text-black font-black text-xs">
                          العاصمة ومشاريع الرؤية
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">مدينة الرياض والمشاريع الاستراتيجية</h3>
                      </div>
                      <p className="text-sm text-white/70 mt-1">تتضمن 9 مشاريع عملاقة تمثل علامات فارقة في التنمية الحضرية</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {RIYADH_PROJECTS.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => setActiveItem({
                          ...proj,
                          region: 'الوسطى ومشاريع العاصمة',
                          sector: 'مشاريع الرياض الكبرى'
                        })}
                        className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#FFB800]/50 hover:bg-[#FFB800]/10 transition-all cursor-pointer group text-right"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white group-hover:text-[#FFB800]">{proj.nameAr}</span>
                          <span className="text-[10px] font-mono text-[#FFB800]">{proj.nameEn}</span>
                        </div>
                        <p className="text-[11px] text-white/60 line-clamp-1">{proj.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* MODAL / DRAWER FOR SELECTED LOCATION DETAILS */}
        <AnimatePresence>
          {activeItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg rounded-3xl bg-[#1A1C1A] border border-[#FFB800]/40 p-6 sm:p-8 text-right shadow-2xl shadow-black/80"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-5 left-5 w-8 h-8 rounded-full bg-white/10 hover:bg-[#FFB800] hover:text-black flex items-center justify-center text-white transition-all text-sm font-bold"
                >
                  ✕
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{activeItem.nameAr}</h3>
                    <p className="text-xs font-mono text-[#FFB800] tracking-wider">{activeItem.nameEn}</p>
                  </div>
                </div>

                <div className="space-y-4 my-6 text-sm">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-white/50 block mb-1">المنطقة والقطاع:</span>
                    <span className="font-bold text-white text-sm">{activeItem.region} — {activeItem.sector}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-white/50 block mb-1">نطاق الأعمال والأهمية:</span>
                    <p className="text-white/85 leading-relaxed text-sm">{activeItem.desc}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-white/50 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />
                    <span>جاهزية وتواجد تشغيلي كامل</span>
                  </span>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="px-5 py-2 rounded-xl bg-[#FFB800] text-black font-bold text-xs hover:bg-[#FACC15] transition-all"
                  >
                    إغلاق
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default SaudiPresenceMapSection;

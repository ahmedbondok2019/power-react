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
    desc: 'تنفيذ أعمال هندسية ومشاريع متخصصة تسهم في تنمية وتطوير المنطقة الشمالية.'
  },
  {
    id: 'neom',
    nameEn: 'NEOM',
    nameAr: 'نيوم',
    region: 'نيوم والمشاريع الكبرى',
    sector: 'مدن المستقبل والابتكار المستدام',
    desc: 'المساهمة في تنفيذ الحلول الكهروميكانيكية والإنشائية لأعظم مشاريع القرن.',
    isMega: true
  },
  {
    id: 'sindallah',
    nameEn: 'SINDALLAH',
    nameAr: 'جزيرة سندالة',
    region: 'نيوم والمشاريع الكبرى',
    sector: 'الضيافة الفاخرة والمنتجعات العالمية',
    desc: 'أعمال كهروميكانيكية وهندسية متقدمة لأولى وجهات نيوم الفاخرة للسياحة البحرية.',
    isMega: true
  },
  {
    id: 'oxagon',
    nameEn: 'OXAGON',
    nameAr: 'أوكساجون',
    region: 'نيوم والمشاريع الكبرى',
    sector: 'المدينة الصناعية المتقدمة والموانئ الذكية',
    desc: 'حلول متكاملة للصناعات المتقدمة وسلاسل الإمداد ومرافق الطاقة النظيفة.',
    isMega: true
  },
  {
    id: 'trojena',
    nameEn: 'TROJENA',
    nameAr: 'تروجينا',
    region: 'نيوم والمشاريع الكبرى',
    sector: 'السياحة الجبلية والمرافق الاستثنائية',
    desc: 'مشاريع نوعية في البيئات الجبلية المعقدة بأعلى معايير الاستدامة والسلامة.',
    isMega: true
  },
  {
    id: 'madina',
    nameEn: 'MADINA',
    nameAr: 'المدينة المنورة',
    region: 'الغربية',
    sector: 'الضيافة، الإسكان، والمرافق الخدمية',
    desc: 'تنفيذ أعمال التطوير العمراني وخدمات المقاولات المتخصصة لخدمة ضيوف الرحمن.'
  },
  {
    id: 'jeddah',
    nameEn: 'JEDDAH',
    nameAr: 'جدة',
    region: 'الغربية',
    sector: 'المشاريع التجارية والسكنية والبنية التحتية',
    desc: 'تنفيذ مشاريع تجارية وسكنية رائدة على الساحل الغربي بأعلى مواصفات الجودة.'
  },
  {
    id: 'makkah',
    nameEn: 'MAKKAH',
    nameAr: 'مكة المكرمة',
    region: 'الغربية',
    sector: 'المشاريع الفندقية والتطوير العقاري',
    desc: 'خبرات متقدمة في المشروعات الضخمة والمرافق الحيوية في أقدس بقاع الأرض.'
  },
  {
    id: 'jizan',
    nameEn: 'JIZAN',
    nameAr: 'جازان',
    region: 'الجنوبية',
    sector: 'المشاريع الصناعية والتنموية',
    desc: 'مشاريع مقاولات نوعية تدعم التنمية الاقتصادية والصناعية في المنطقة الجنوبية.'
  },
  {
    id: 'najran',
    nameEn: 'NAJRAN',
    nameAr: 'نجران',
    region: 'الجنوبية',
    sector: 'المباني والمرافق الحكومية والتجارية',
    desc: 'تنفيذ أعمال المقاولات العامة والتشطيبات الكهروميكانيكية المتكاملة.'
  },
  {
    id: 'alqassim',
    nameEn: 'ALQASSIM',
    nameAr: 'القصيم',
    region: 'الوسطى',
    sector: 'المرافق التعليمية والتجارية والخدمية',
    desc: 'مشاريع حيوية وبنية تحتية تدعم النمو الاقتصادي والتجاري بالمنطقة.'
  },
  {
    id: 'dammam',
    nameEn: 'DAMMAM',
    nameAr: 'الدمام',
    region: 'الشرقية',
    sector: 'المنشآت الصناعية والمقرات اللوجستية',
    desc: 'خدمات هندسية متقدمة في قلب المنطقة الشرقية لقطاعات الصناعة واللوجستيات.'
  },
  {
    id: 'riyadh',
    nameEn: 'RIYADH',
    nameAr: 'مدينة الرياض',
    region: 'الوسطى',
    sector: 'المشاريع العملاقة والمقرات الرئيسية',
    desc: 'مركز الثقل الاقتصادي ومقر أكبر محفظة من المشاريع التنموية الكبرى في المملكة.',
    isMega: true
  }
];

// Riyadh Sub-projects list
const RIYADH_PROJECTS = [
  { id: 'seven-alkharj', nameEn: 'SEVEN –ALKHARJ', nameAr: 'سفن - الخرج', desc: 'مشاريع الترفيه والوجهات العائلية الحديثة', y: 125 },
  { id: 'almurabaa', nameEn: 'ALMURABAA', nameAr: 'المربع الجديد', desc: 'داون تاون الرياض الحديث ورمز التطوير العصري', y: 165 },
  { id: 'ksp', nameEn: 'KSP', nameAr: 'حديقة الملك سلمان', desc: 'أكبر حدائق المدن في العالم والمرافق المرتبطة بها', y: 205 },
  { id: 'aldiriyah', nameEn: 'ALDIRIYAH', nameAr: 'الدرعية', desc: 'بوابة التاريخ والثقافة وأعمال التراث العمراني الفاخر', y: 245 },
  { id: 'riyadh-front', nameEn: 'RIYADH FRONT', nameAr: 'واجهة الرياض', desc: 'الوجهة الرائدة للأعمال والترفيه والتسوق', y: 285 },
  { id: 'qiddiyah', nameEn: 'QIDDIYAH', nameAr: 'القدية', desc: 'عاصمة الترفيه والرياضة والفنون بالمملكة', y: 325 },
  { id: 'roshn', nameEn: 'ROSHN', nameAr: 'روشن', desc: 'المجتمعات السكنية المتكاملة والأحياء الحضرية الذكية', y: 365 },
  { id: 'kafd', nameEn: 'KAFD', nameAr: 'مركز الملك عبد الله المالي', desc: 'المركز المالي العالمي وأبراج الأعمال المتقدمة', y: 405 },
  { id: 'boulevard', nameEn: 'BOULEVARD', nameAr: 'بوليفارد الرياض', desc: 'المرافق الترفيهية والتجارية وأضخم المسارح والفعاليات', y: 445 }
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

  const handleSelectLocation = (id) => {
    const found = LOCATIONS_DATA.find(d => d.id === id);
    if (found) setActiveItem(found);
  };

  const handleSelectRiyadhProject = (proj) => {
    setActiveItem({
      ...proj,
      region: 'الوسطى ومشاريع العاصمة',
      sector: 'مشاريع الرياض الكبرى',
      isMega: true
    });
  };

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

        {/* VIEW 1: UNIFIED HIGH-PRECISION 3D INTERACTIVE SVG MAP */}
        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full rounded-3xl bg-[#111312] border border-white/10 p-2 sm:p-4 lg:p-6 shadow-2xl overflow-hidden"
          >
            <div className="relative w-full max-w-[1280px] mx-auto overflow-x-auto select-none">
              <svg
                viewBox="0 0 1920 1080"
                className="w-full h-auto min-w-[900px] lg:min-w-0"
              >
                {/* 3D Map Image */}
                <image
                  href="/saudi_arabia_3d_map_no_text2.png"
                  x="0"
                  y="0"
                  width="1920"
                  height="1080"
                  preserveAspectRatio="xMidYMid meet"
                  className="brightness-105 contrast-110"
                />

                {/* ============================================================ */}
                {/* 1. DUMAT-ALJANDAL */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('dumat-aljandal')}>
                  {/* Pin on map */}
                  <circle cx="684" cy="368" r="6" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  {/* Vertical Connector Line (الشرطة) */}
                  <line x1="684" y1="368" x2="684" y2="230" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  {/* Dot on line end */}
                  <circle cx="684" cy="230" r="5" fill="#FFB800" />
                  {/* Text Label */}
                  <text
                    x="684"
                    y="205"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="22"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    DUMAT-ALJANDAL
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 2. NEOM */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('neom')}>
                  <circle cx="345" cy="415" r="6" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="345" y1="415" x2="345" y2="305" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="345" cy="305" r="5" fill="#FFB800" />
                  <text
                    x="345"
                    y="280"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="24"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.5"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    NEOM
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 3. SINDALLAH */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('sindallah')}>
                  <circle cx="358" cy="452" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="358" y1="452" x2="290" y2="452" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="290" cy="452" r="4.5" fill="#FFB800" />
                  <text
                    x="275"
                    y="459"
                    textAnchor="end"
                    fill="#FFFFFF"
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    SINDALLAH
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 4. OXAGON */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('oxagon')}>
                  <circle cx="334" cy="482" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="334" y1="482" x2="255" y2="482" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="255" cy="482" r="4.5" fill="#FFB800" />
                  <text
                    x="240"
                    y="489"
                    textAnchor="end"
                    fill="#FFFFFF"
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    OXAGON
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 5. TROJENA */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('trojena')}>
                  <circle cx="375" cy="515" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="375" y1="515" x2="290" y2="515" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="290" cy="515" r="4.5" fill="#FFB800" />
                  <text
                    x="275"
                    y="522"
                    textAnchor="end"
                    fill="#FFFFFF"
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    TROJENA
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 6. MADINA */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('madina')}>
                  <circle cx="500" cy="590" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="500" y1="590" x2="430" y2="590" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="430" cy="590" r="4.5" fill="#FFB800" />
                  <text
                    x="415"
                    y="597"
                    textAnchor="end"
                    fill="#FFFFFF"
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    MADINA
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 7. JEDDAH */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('jeddah')}>
                  <circle cx="585" cy="662" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="585" y1="662" x2="500" y2="662" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="500" cy="662" r="4.5" fill="#FFB800" />
                  <text
                    x="485"
                    y="669"
                    textAnchor="end"
                    fill="#FFFFFF"
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    JEDDAH
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 8. MAKKAH */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('makkah')}>
                  <circle cx="630" cy="712" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="630" y1="712" x2="550" y2="712" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="550" cy="712" r="4.5" fill="#FFB800" />
                  <text
                    x="535"
                    y="719"
                    textAnchor="end"
                    fill="#FFFFFF"
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    MAKKAH
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 9. JIZAN */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('jizan')}>
                  <circle cx="785" cy="840" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="785" y1="840" x2="685" y2="840" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="685" cy="840" r="4.5" fill="#FFB800" />
                  <text
                    x="670"
                    y="847"
                    textAnchor="end"
                    fill="#FFFFFF"
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    JIZAN
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 10. NAJRAN */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('najran')}>
                  <circle cx="965" cy="820" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="965" y1="820" x2="965" y2="930" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="965" cy="930" r="5" fill="#FFB800" />
                  <text
                    x="965"
                    y="960"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="22"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    NAJRAN
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 11. ALQASSIM */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('alqassim')}>
                  <circle cx="930" cy="535" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="930" y1="535" x2="930" y2="375" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="930" cy="375" r="5" fill="#FFB800" />
                  <text
                    x="930"
                    y="350"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="23"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    ALQASSIM
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 12. DAMMAM */}
                {/* ============================================================ */}
                <g className="cursor-pointer group" onClick={() => handleSelectLocation('dammam')}>
                  <circle cx="1720" cy="718" r="6" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                  <line x1="1720" y1="718" x2="1720" y2="555" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="1720" cy="555" r="5" fill="#FFB800" />
                  <text
                    x="1720"
                    y="530"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="24"
                    fontWeight="800"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.5"
                    className="hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    DAMMAM
                  </text>
                </g>

                {/* ============================================================ */}
                {/* 13. RIYADH HUB & TREE BRANCHES */}
                {/* ============================================================ */}
                {/* Riyadh Pin on map */}
                <circle cx="1065" cy="555" r="7" fill="#FFB800" stroke="#000000" strokeWidth="2.5" />

                {/* Vertical Line from Riyadh Pin to Label */}
                <line x1="1065" y1="555" x2="1065" y2="335" stroke="#FFB800" strokeWidth="3.2" strokeLinecap="round" />
                <circle cx="1065" cy="335" r="5" fill="#FFB800" />

                {/* Riyadh Main Label */}
                <text
                  x="1065"
                  y="310"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="25"
                  fontWeight="900"
                  fontFamily="Inter, system-ui, sans-serif"
                  letterSpacing="1.5"
                  className="hover:fill-[#FFB800] cursor-pointer transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  onClick={() => handleSelectLocation('riyadh')}
                >
                  RIYADH
                </text>

                {/* Horizontal branch line from Riyadh vertical line to tree spine */}
                <line x1="1065" y1="350" x2="1220" y2="350" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />

                {/* Vertical Tree Spine connecting all 9 sub-projects */}
                <line x1="1220" y1="125" x2="1220" y2="445" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />

                {/* 9 Riyadh Sub-Projects Horizontal Lines (الشرط), Dots & Labels */}
                {RIYADH_PROJECTS.map((proj) => (
                  <g
                    key={proj.id}
                    className="cursor-pointer group"
                    onClick={() => handleSelectRiyadhProject(proj)}
                  >
                    {/* Horizontal connector line (الشرطة) */}
                    <line
                      x1="1220"
                      y1={proj.y}
                      x2="1300"
                      y2={proj.y}
                      stroke="#FFB800"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                    {/* Yellow Node Dot */}
                    <circle cx="1300" cy={proj.y} r="4.5" fill="#FFB800" />
                    
                    {/* Project Label */}
                    <text
                      x="1315"
                      y={proj.y + 6.5}
                      textAnchor="start"
                      fill="#FFFFFF"
                      fontSize="19"
                      fontWeight="800"
                      fontFamily="Inter, system-ui, sans-serif"
                      letterSpacing="1.2"
                      className="group-hover:fill-[#FFB800] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                    >
                      {proj.nameEn}
                    </text>
                  </g>
                ))}

              </svg>
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
                        onClick={() => handleSelectRiyadhProject(proj)}
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

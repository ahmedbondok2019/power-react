import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Sparkles, CheckCircle2, ChevronRight, Layers, Eye, Compass } from 'lucide-react';

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
    sector: 'المشاريع العملاقة ومقر القيادة',
    desc: 'مركز الثقل الاقتصادي ومقر أكبر محفظة من المشاريع التنموية الكبرى في المملكة.',
    isMega: true
  }
];

// Riyadh Sub-projects list with enhanced coordinates & metadata
const RIYADH_PROJECTS = [
  { id: 'seven-alkharj', nameEn: 'SEVEN –ALKHARJ', nameAr: 'سفن - الخرج', desc: 'مشاريع الترفيه والوجهات العائلية الحديثة', y: 100 },
  { id: 'almurabaa', nameEn: 'ALMURABAA', nameAr: 'المربع الجديد', desc: 'داون تاون الرياض الحديث ورمز التطوير العصري', y: 145 },
  { id: 'ksp', nameEn: 'KSP', nameAr: 'حديقة الملك سلمان', desc: 'أكبر حدائق المدن في العالم والمرافق المرتبطة بها', y: 190 },
  { id: 'aldiriyah', nameEn: 'ALDIRIYAH', nameAr: 'الدرعية', desc: 'بوابة التاريخ والثقافة وأعمال التراث العمراني الفاخر', y: 235 },
  { id: 'riyadh-front', nameEn: 'RIYADH FRONT', nameAr: 'واجهة الرياض', desc: 'الوجهة الرائدة للأعمال والترفيه والتسوق', y: 280 },
  { id: 'qiddiyah', nameEn: 'QIDDIYAH', nameAr: 'القدية', desc: 'عاصمة الترفيه والرياضة والفنون بالمملكة', y: 325 },
  { id: 'roshn', nameEn: 'ROSHN', nameAr: 'روشن', desc: 'المجتمعات السكنية المتكاملة والأحياء الحضرية الذكية', y: 370 },
  { id: 'kafd', nameEn: 'KAFD', nameAr: 'مركز الملك عبد الله المالي', desc: 'المركز المالي العالمي وأبراج الأعمال المتقدمة', y: 415 },
  { id: 'boulevard', nameEn: 'BOULEVARD', nameAr: 'بوليفارد الرياض', desc: 'المرافق الترفيهية والتجارية وأضخم المسارح والفعاليات', y: 460 }
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
  const [hoveredId, setHoveredId] = useState(null);
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
    <section className="relative w-full bg-[#141615] text-white pt-6 pb-28 select-none overflow-hidden" dir="rtl">
      
      {/* Background Ambience & Lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#FFB800]/10 rounded-full blur-[150px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/3 left-0 w-[650px] h-[650px] bg-[#2A352F]/40 rounded-full blur-[160px] pointer-events-none -z-0" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Section Navigation / Toggle Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3 text-sm text-white/75">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFB800]" />
            </span>
            <span className="font-bold text-white text-base">خريطة الحضور الاستراتيجي والمشاريع الكبرى</span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-xs text-[#FFB800] font-semibold bg-[#FFB800]/10 px-2.5 py-1 rounded-full border border-[#FFB800]/20 hidden sm:inline-block">
              13 موقعاً و 9 مشاريع عملاقة
            </span>
          </div>

          {/* View Switcher Tabs (Map vs Directory) */}
          <div className="flex items-center bg-[#1E201E]/80 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-lg">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                viewMode === 'map'
                  ? 'bg-gradient-to-r from-[#FFB800] to-[#EAB308] text-black shadow-lg shadow-[#FFB800]/25'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>الخريطة التفاعلية 3D</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[#FFB800] to-[#EAB308] text-black shadow-lg shadow-[#FFB800]/25'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>دليل المواقع والمشاريع</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: HIGH-TECH REALISTIC 3D MAP CALLOUTS */}
        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full rounded-3xl bg-gradient-to-b from-[#161816] via-[#121413] to-[#0E100F] border border-white/15 p-2 sm:p-4 lg:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            <div className="relative w-full max-w-[1300px] mx-auto overflow-x-auto select-none">
              <svg
                viewBox="0 0 1920 1080"
                className="w-full h-auto min-w-[950px] lg:min-w-0"
              >
                <defs>
                  {/* Linear Gradients for Connector Light Beams */}
                  <linearGradient id="beam-vertical" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#FFB800" stopOpacity="1" />
                    <stop offset="60%" stopColor="#FFD166" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  </linearGradient>

                  <linearGradient id="beam-horizontal-left" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#FFB800" stopOpacity="1" />
                    <stop offset="70%" stopColor="#FFD166" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  </linearGradient>

                  <linearGradient id="beam-horizontal-right" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFB800" stopOpacity="1" />
                    <stop offset="70%" stopColor="#FFD166" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  </linearGradient>

                  {/* Gradient for Glass Callout Background */}
                  <linearGradient id="badge-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1C1F1D" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#121413" stopOpacity="0.92" />
                  </linearGradient>

                  <linearGradient id="badge-bg-active" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFB800" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#181A18" stopOpacity="0.95" />
                  </linearGradient>

                  {/* Glowing Marker Radial */}
                  <radialGradient id="beacon-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFB800" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#FFB800" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 3D Map Image Base */}
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
                {/* 1. DUMAT-ALJANDAL CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('dumat-aljandal')}
                  onMouseEnter={() => setHoveredId('dumat-aljandal')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Ground Base Beacon */}
                  <ellipse cx="684" cy="368" rx="22" ry="8" fill="url(#beacon-glow)" />
                  <ellipse cx="684" cy="368" rx="8" ry="3" fill="#FFB800" />
                  <circle cx="684" cy="368" r="4.5" fill="#FFFFFF" />

                  {/* Luminous Vertical Beam */}
                  <line x1="684" y1="368" x2="684" y2="175" stroke="url(#beam-vertical)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="684" cy="175" r="4" fill="#FFB800" stroke="#FFFFFF" strokeWidth="1.5" />

                  {/* Callout Pill Badge */}
                  <g transform="translate(684, 140)">
                    <rect
                      x="-110"
                      y="-18"
                      width="220"
                      height="36"
                      rx="18"
                      fill={hoveredId === 'dumat-aljandal' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'dumat-aljandal' ? '#FFB800' : 'rgba(255,184,0,0.5)'}
                      strokeWidth={hoveredId === 'dumat-aljandal' ? '2' : '1.2'}
                      className="transition-all duration-300"
                    />
                    <circle cx="-90" cy="0" r="4" fill="#FFB800" />
                    <text
                      x="-78"
                      y="5"
                      fill="#FFFFFF"
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="Inter, system-ui, sans-serif"
                      letterSpacing="0.8"
                    >
                      DUMAT-ALJANDAL
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 2. NEOM CALLOUT (MEGA PROJECT) */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('neom')}
                  onMouseEnter={() => setHoveredId('neom')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="345" cy="415" rx="26" ry="9" fill="url(#beacon-glow)" />
                  <ellipse cx="345" cy="415" rx="9" ry="3.5" fill="#FFB800" />
                  <circle cx="345" cy="415" r="4.5" fill="#FFFFFF" />

                  <line x1="345" y1="415" x2="345" y2="235" stroke="url(#beam-vertical)" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="345" cy="235" r="4.5" fill="#FFB800" stroke="#FFFFFF" strokeWidth="1.5" />

                  <g transform="translate(345, 195)">
                    <rect
                      x="-85"
                      y="-20"
                      width="170"
                      height="40"
                      rx="20"
                      fill={hoveredId === 'neom' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke="#FFB800"
                      strokeWidth={hoveredId === 'neom' ? '2.5' : '1.6'}
                      className="transition-all duration-300"
                    />
                    <circle cx="-62" cy="0" r="4.5" fill="#FFB800" />
                    <text
                      x="-48"
                      y="6"
                      fill="#FFFFFF"
                      fontSize="16"
                      fontWeight="900"
                      fontFamily="Inter, system-ui, sans-serif"
                      letterSpacing="1.5"
                    >
                      NEOM
                    </text>
                    <rect x="22" y="-10" width="48" height="20" rx="6" fill="#FFB800" fillOpacity="0.2" />
                    <text x="46" y="4" textAnchor="middle" fill="#FFB800" fontSize="9" fontWeight="900">MEGA</text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 3. SINDALLAH CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('sindallah')}
                  onMouseEnter={() => setHoveredId('sindallah')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="358" cy="452" rx="16" ry="6" fill="url(#beacon-glow)" />
                  <circle cx="358" cy="452" r="4" fill="#FFB800" />
                  <line x1="358" y1="452" x2="235" y2="452" stroke="url(#beam-horizontal-left)" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="235" cy="452" r="3.5" fill="#FFB800" />

                  <g transform="translate(225, 452)">
                    <rect
                      x="-140"
                      y="-16"
                      width="140"
                      height="32"
                      rx="16"
                      fill={hoveredId === 'sindallah' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'sindallah' ? '#FFB800' : 'rgba(255,184,0,0.45)'}
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                    <circle cx="-124" cy="0" r="3.5" fill="#FFB800" />
                    <text x="-112" y="4.5" fill="#FFFFFF" fontSize="13" fontWeight="800" letterSpacing="0.8">
                      SINDALLAH
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 4. OXAGON CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('oxagon')}
                  onMouseEnter={() => setHoveredId('oxagon')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="334" cy="482" rx="16" ry="6" fill="url(#beacon-glow)" />
                  <circle cx="334" cy="482" r="4" fill="#FFB800" />
                  <line x1="334" y1="482" x2="235" y2="482" stroke="url(#beam-horizontal-left)" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="235" cy="482" r="3.5" fill="#FFB800" />

                  <g transform="translate(225, 482)">
                    <rect
                      x="-130"
                      y="-16"
                      width="130"
                      height="32"
                      rx="16"
                      fill={hoveredId === 'oxagon' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'oxagon' ? '#FFB800' : 'rgba(255,184,0,0.45)'}
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                    <circle cx="-114" cy="0" r="3.5" fill="#FFB800" />
                    <text x="-102" y="4.5" fill="#FFFFFF" fontSize="13" fontWeight="800" letterSpacing="0.8">
                      OXAGON
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 5. TROJENA CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('trojena')}
                  onMouseEnter={() => setHoveredId('trojena')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="375" cy="515" rx="16" ry="6" fill="url(#beacon-glow)" />
                  <circle cx="375" cy="515" r="4" fill="#FFB800" />
                  <line x1="375" y1="515" x2="235" y2="515" stroke="url(#beam-horizontal-left)" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="235" cy="515" r="3.5" fill="#FFB800" />

                  <g transform="translate(225, 515)">
                    <rect
                      x="-130"
                      y="-16"
                      width="130"
                      height="32"
                      rx="16"
                      fill={hoveredId === 'trojena' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'trojena' ? '#FFB800' : 'rgba(255,184,0,0.45)'}
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                    <circle cx="-114" cy="0" r="3.5" fill="#FFB800" />
                    <text x="-102" y="4.5" fill="#FFFFFF" fontSize="13" fontWeight="800" letterSpacing="0.8">
                      TROJENA
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 6. MADINA CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('madina')}
                  onMouseEnter={() => setHoveredId('madina')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="500" cy="590" rx="18" ry="6.5" fill="url(#beacon-glow)" />
                  <circle cx="500" cy="590" r="4.5" fill="#FFB800" />
                  <line x1="500" y1="590" x2="355" y2="590" stroke="url(#beam-horizontal-left)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="355" cy="590" r="3.5" fill="#FFB800" />

                  <g transform="translate(345, 590)">
                    <rect
                      x="-130"
                      y="-16"
                      width="130"
                      height="32"
                      rx="16"
                      fill={hoveredId === 'madina' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'madina' ? '#FFB800' : 'rgba(255,184,0,0.45)'}
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                    <circle cx="-114" cy="0" r="3.5" fill="#FFB800" />
                    <text x="-102" y="4.5" fill="#FFFFFF" fontSize="13" fontWeight="800" letterSpacing="0.8">
                      MADINA
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 7. JEDDAH CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('jeddah')}
                  onMouseEnter={() => setHoveredId('jeddah')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="585" cy="662" rx="18" ry="6.5" fill="url(#beacon-glow)" />
                  <circle cx="585" cy="662" r="4.5" fill="#FFB800" />
                  <line x1="585" y1="662" x2="435" y2="662" stroke="url(#beam-horizontal-left)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="435" cy="662" r="3.5" fill="#FFB800" />

                  <g transform="translate(425, 662)">
                    <rect
                      x="-130"
                      y="-16"
                      width="130"
                      height="32"
                      rx="16"
                      fill={hoveredId === 'jeddah' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'jeddah' ? '#FFB800' : 'rgba(255,184,0,0.45)'}
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                    <circle cx="-114" cy="0" r="3.5" fill="#FFB800" />
                    <text x="-102" y="4.5" fill="#FFFFFF" fontSize="13" fontWeight="800" letterSpacing="0.8">
                      JEDDAH
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 8. MAKKAH CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('makkah')}
                  onMouseEnter={() => setHoveredId('makkah')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="630" cy="712" rx="18" ry="6.5" fill="url(#beacon-glow)" />
                  <circle cx="630" cy="712" r="4.5" fill="#FFB800" />
                  <line x1="630" y1="712" x2="485" y2="712" stroke="url(#beam-horizontal-left)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="485" cy="712" r="3.5" fill="#FFB800" />

                  <g transform="translate(475, 712)">
                    <rect
                      x="-130"
                      y="-16"
                      width="130"
                      height="32"
                      rx="16"
                      fill={hoveredId === 'makkah' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'makkah' ? '#FFB800' : 'rgba(255,184,0,0.45)'}
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                    <circle cx="-114" cy="0" r="3.5" fill="#FFB800" />
                    <text x="-102" y="4.5" fill="#FFFFFF" fontSize="13" fontWeight="800" letterSpacing="0.8">
                      MAKKAH
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 9. JIZAN CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('jizan')}
                  onMouseEnter={() => setHoveredId('jizan')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="785" cy="840" rx="18" ry="6.5" fill="url(#beacon-glow)" />
                  <circle cx="785" cy="840" r="4.5" fill="#FFB800" />
                  <line x1="785" y1="840" x2="635" y2="840" stroke="url(#beam-horizontal-left)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="635" cy="840" r="3.5" fill="#FFB800" />

                  <g transform="translate(625, 840)">
                    <rect
                      x="-125"
                      y="-16"
                      width="125"
                      height="32"
                      rx="16"
                      fill={hoveredId === 'jizan' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'jizan' ? '#FFB800' : 'rgba(255,184,0,0.45)'}
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                    <circle cx="-110" cy="0" r="3.5" fill="#FFB800" />
                    <text x="-98" y="4.5" fill="#FFFFFF" fontSize="13" fontWeight="800" letterSpacing="0.8">
                      JIZAN
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 10. NAJRAN CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('najran')}
                  onMouseEnter={() => setHoveredId('najran')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="965" cy="820" rx="20" ry="7" fill="url(#beacon-glow)" />
                  <circle cx="965" cy="820" r="4.5" fill="#FFB800" />
                  <line x1="965" y1="820" x2="965" y2="955" stroke="url(#beam-vertical)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="965" cy="955" r="4" fill="#FFB800" />

                  <g transform="translate(965, 985)">
                    <rect
                      x="-75"
                      y="-18"
                      width="150"
                      height="36"
                      rx="18"
                      fill={hoveredId === 'najran' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'najran' ? '#FFB800' : 'rgba(255,184,0,0.5)'}
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                    <circle cx="-55" cy="0" r="3.5" fill="#FFB800" />
                    <text x="-42" y="5" fill="#FFFFFF" fontSize="14" fontWeight="800" letterSpacing="0.8">
                      NAJRAN
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 11. ALQASSIM CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('alqassim')}
                  onMouseEnter={() => setHoveredId('alqassim')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="930" cy="535" rx="20" ry="7" fill="url(#beacon-glow)" />
                  <circle cx="930" cy="535" r="4.5" fill="#FFB800" />
                  <line x1="930" y1="535" x2="930" y2="305" stroke="url(#beam-vertical)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="930" cy="305" r="4" fill="#FFB800" />

                  <g transform="translate(930, 275)">
                    <rect
                      x="-80"
                      y="-18"
                      width="160"
                      height="36"
                      rx="18"
                      fill={hoveredId === 'alqassim' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'alqassim' ? '#FFB800' : 'rgba(255,184,0,0.5)'}
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                    <circle cx="-60" cy="0" r="3.5" fill="#FFB800" />
                    <text x="-48" y="5" fill="#FFFFFF" fontSize="14" fontWeight="800" letterSpacing="0.8">
                      ALQASSIM
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 12. DAMMAM CALLOUT */}
                {/* ============================================================ */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('dammam')}
                  onMouseEnter={() => setHoveredId('dammam')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="1720" cy="718" rx="22" ry="8" fill="url(#beacon-glow)" />
                  <circle cx="1720" cy="718" r="5" fill="#FFB800" />
                  <line x1="1720" y1="718" x2="1720" y2="480" stroke="url(#beam-vertical)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="1720" cy="480" r="4" fill="#FFB800" />

                  <g transform="translate(1720, 445)">
                    <rect
                      x="-80"
                      y="-18"
                      width="160"
                      height="36"
                      rx="18"
                      fill={hoveredId === 'dammam' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                      stroke={hoveredId === 'dammam' ? '#FFB800' : 'rgba(255,184,0,0.5)'}
                      strokeWidth="1.2"
                      className="transition-all duration-300"
                    />
                    <circle cx="-60" cy="0" r="3.5" fill="#FFB800" />
                    <text x="-48" y="5" fill="#FFFFFF" fontSize="14" fontWeight="800" letterSpacing="0.8">
                      DAMMAM
                    </text>
                  </g>
                </g>

                {/* ============================================================ */}
                {/* 13. RIYADH HUB & 9 MEGA PROJECTS TREE (THE SHOWSTOPPER) */}
                {/* ============================================================ */}
                {/* Riyadh Ground Beacon with pulsating radar ring */}
                <ellipse cx="1065" cy="555" rx="30" ry="11" fill="url(#beacon-glow)" />
                <ellipse cx="1065" cy="555" rx="12" ry="4.5" fill="#FFB800" />
                <circle cx="1065" cy="555" r="5" fill="#FFFFFF" />

                {/* Main Vertical Beam */}
                <line x1="1065" y1="555" x2="1065" y2="280" stroke="url(#beam-vertical)" strokeWidth="3.2" strokeLinecap="round" />
                <circle cx="1065" cy="280" r="4.5" fill="#FFB800" />

                {/* RIYADH Main Badge */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('riyadh')}
                  onMouseEnter={() => setHoveredId('riyadh')}
                  onMouseLeave={() => setHoveredId(null)}
                  transform="translate(1065, 235)"
                >
                  <rect
                    x="-95"
                    y="-22"
                    width="190"
                    height="44"
                    rx="22"
                    fill={hoveredId === 'riyadh' ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                    stroke="#FFB800"
                    strokeWidth={hoveredId === 'riyadh' ? '2.5' : '1.8'}
                    className="transition-all duration-300"
                  />
                  <circle cx="-70" cy="0" r="5" fill="#FFB800" />
                  <text
                    x="-54"
                    y="7"
                    fill="#FFFFFF"
                    fontSize="18"
                    fontWeight="900"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="1.8"
                  >
                    RIYADH
                  </text>
                  <rect x="24" y="-11" width="52" height="22" rx="7" fill="#FFB800" fillOpacity="0.25" />
                  <text x="50" y="4" textAnchor="middle" fill="#FFB800" fontSize="10" fontWeight="900">HUB</text>
                </g>

                {/* Circuit Connection from Riyadh to Project Tree */}
                <path
                  d="M 1065 295 L 1220 295"
                  stroke="url(#beam-horizontal-right)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Tree Vertical Spine connecting 9 projects */}
                <line x1="1220" y1="100" x2="1220" y2="460" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="1220" cy="295" r="4.5" fill="#FFFFFF" stroke="#FFB800" strokeWidth="1.5" />

                {/* 9 Projects Branches with Interactive Callout Chips */}
                {RIYADH_PROJECTS.map((proj) => {
                  const isHovered = hoveredId === proj.id;
                  return (
                    <g
                      key={proj.id}
                      className="cursor-pointer group"
                      onClick={() => handleSelectRiyadhProject(proj)}
                      onMouseEnter={() => setHoveredId(proj.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Horizontal Branch Line */}
                      <line
                        x1="1220"
                        y1={proj.y}
                        x2="1285"
                        y2={proj.y}
                        stroke={isHovered ? '#FFFFFF' : '#FFB800'}
                        strokeWidth={isHovered ? '2.8' : '2'}
                        strokeLinecap="round"
                      />
                      <circle cx="1285" cy={proj.y} r="3.5" fill={isHovered ? '#FFFFFF' : '#FFB800'} />

                      {/* Floating Project Pill Chip */}
                      <g transform={`translate(1295, ${proj.y})`}>
                        <rect
                          x="0"
                          y="-16"
                          width="210"
                          height="32"
                          rx="16"
                          fill={isHovered ? 'url(#badge-bg-active)' : 'url(#badge-bg)'}
                          stroke={isHovered ? '#FFB800' : 'rgba(255,184,0,0.4)'}
                          strokeWidth={isHovered ? '1.8' : '1'}
                          className="transition-all duration-300"
                        />
                        <circle cx="16" cy="0" r="3.5" fill={isHovered ? '#FFFFFF' : '#FFB800'} />
                        <text
                          x="28"
                          y="4.5"
                          fill="#FFFFFF"
                          fontSize="13"
                          fontWeight="800"
                          fontFamily="Inter, system-ui, sans-serif"
                          letterSpacing="0.8"
                        >
                          {proj.nameEn}
                        </text>
                      </g>
                    </g>
                  );
                })}

              </svg>
            </div>

            {/* Interactive Info Banner at the bottom of Map */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70 px-2 sm:px-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFB800]" />
                <span className="font-medium">انقر على أي مدينة أو مشروع لاستعراض تفاصيل النطاق والقطاع</span>
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

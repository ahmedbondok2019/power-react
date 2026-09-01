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

// Riyadh Sub-projects list with generous 48px vertical spacing
const RIYADH_PROJECTS = [
  { id: 'seven-alkharj', nameEn: 'SEVEN –ALKHARJ', nameAr: 'سفن - الخرج', desc: 'مشاريع الترفيه والوجهات العائلية الحديثة', y: 110 },
  { id: 'almurabaa', nameEn: 'ALMURABAA', nameAr: 'المربع الجديد', desc: 'داون تاون الرياض الحديث ورمز التطوير العصري', y: 158 },
  { id: 'ksp', nameEn: 'KSP', nameAr: 'حديقة الملك سلمان', desc: 'أكبر حدائق المدن في العالم والمرافق المرتبطة بها', y: 206 },
  { id: 'aldiriyah', nameEn: 'ALDIRIYAH', nameAr: 'الدرعية', desc: 'بوابة التاريخ والثقافة وأعمال التراث العمراني الفاخر', y: 254 },
  { id: 'riyadh-front', nameEn: 'RIYADH FRONT', nameAr: 'واجهة الرياض', desc: 'الوجهة الرائدة للأعمال والترفيه والتسوق', y: 302 },
  { id: 'qiddiyah', nameEn: 'QIDDIYAH', nameAr: 'القدية', desc: 'عاصمة الترفيه والرياضة والفنون بالمملكة', y: 350 },
  { id: 'roshn', nameEn: 'ROSHN', nameAr: 'روشن', desc: 'المجتمعات السكنية المتكاملة والأحياء الحضرية الذكية', y: 398 },
  { id: 'kafd', nameEn: 'KAFD', nameAr: 'مركز الملك عبد الله المالي', desc: 'المركز المالي العالمي وأبراج الأعمال المتقدمة', y: 446 },
  { id: 'boulevard', nameEn: 'BOULEVARD', nameAr: 'بوليفارد الرياض', desc: 'المرافق الترفيهية والتجارية وأضخم المسارح والفعاليات', y: 494 }
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
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#FFB800]/5 rounded-full blur-[150px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/3 left-0 w-[650px] h-[650px] bg-[#2A352F]/30 rounded-full blur-[160px] pointer-events-none -z-0" />

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
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${viewMode === 'map'
                  ? 'bg-gradient-to-r from-[#FFB800] to-[#EAB308] text-black shadow-lg shadow-[#FFB800]/25'
                  : 'text-white/70 hover:text-white'
                }`}
            >
              <Eye className="w-4 h-4" />
              <span>الخريطة التفاعلية 3D</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[#FFB800] to-[#EAB308] text-black shadow-lg shadow-[#FFB800]/25'
                  : 'text-white/70 hover:text-white'
                }`}
            >
              <Layers className="w-4 h-4" />
              <span>دليل المواقع والمشاريع</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: CLEAN PRECISION 3D INTERACTIVE SVG MAP */}
        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full rounded-3xl bg-gradient-to-b from-[#141614] via-[#101211] to-[#0A0C0B] border border-white/10 p-2 sm:p-4 lg:p-6 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            <div className="relative w-full max-w-[1300px] mx-auto overflow-x-auto select-none">
              <svg
                viewBox="0 0 1920 1080"
                direction="ltr"
                style={{ direction: 'ltr' }}
                className="w-full h-auto min-w-[950px] lg:min-w-0"
              >
                <defs>
                  <radialGradient id="beacon-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFB800" stopOpacity="0.85" />
                    <stop offset="45%" stopColor="#FFB800" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <image
                  href="/saudi_arabia_3d_map_no_text2.png"
                  x="0"
                  y="0"
                  width="1920"
                  height="1080"
                  preserveAspectRatio="xMidYMid meet"
                  className="brightness-105 contrast-105"
                />

                {/* 1. DUMAT-ALJANDAL */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('dumat-aljandal')}
                  onMouseEnter={() => setHoveredId('dumat-aljandal')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="708" cy="355" rx="16" ry="6.5" fill="url(#beacon-glow)" />
                  <circle cx="708" cy="355" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="708" cy="355" r="2" fill="#FFFFFF" />

                  <line
                    x1="708"
                    y1="355"
                    x2="708"
                    y2="140"
                    stroke={hoveredId === 'dumat-aljandal' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'dumat-aljandal' ? '3.5' : '2.8'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="708" cy="140" r="5" fill={hoveredId === 'dumat-aljandal' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="708"
                    y="115"
                    textAnchor="middle"
                    direction="ltr"
                    fill={hoveredId === 'dumat-aljandal' ? '#FFB800' : '#FFFFFF'}
                    fontSize="22"
                    fontWeight="800"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    DUMAT-ALJANDAL
                  </text>
                </g>

                {/* 2. NEOM */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('neom')}
                  onMouseEnter={() => setHoveredId('neom')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="420" cy="415" rx="18" ry="7" fill="url(#beacon-glow)" />
                  <circle cx="420" cy="415" r="6" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="420" cy="415" r="2.5" fill="#FFFFFF" />

                  <line
                    x1="420"
                    y1="415"
                    x2="420"
                    y2="220"
                    stroke={hoveredId === 'neom' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'neom' ? '3.5' : '2.8'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="420" cy="220" r="5" fill={hoveredId === 'neom' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="420"
                    y="195"
                    textAnchor="middle"
                    direction="ltr"
                    fill={hoveredId === 'neom' ? '#FFB800' : '#FFFFFF'}
                    fontSize="24"
                    fontWeight="900"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.5"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    NEOM
                  </text>
                </g>

                {/* 3. SINDALLAH */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('sindallah')}
                  onMouseEnter={() => setHoveredId('sindallah')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="390" cy="450" rx="14" ry="5.5" fill="url(#beacon-glow)" />
                  <circle cx="390" cy="450" r="5" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="390" cy="450" r="2" fill="#FFFFFF" />

                  <line
                    x1="390"
                    y1="450"
                    x2="230"
                    y2="450"
                    stroke={hoveredId === 'sindallah' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'sindallah' ? '3.2' : '2.6'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="230" cy="450" r="4.5" fill={hoveredId === 'sindallah' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="215"
                    y="456"
                    textAnchor="end"
                    direction="ltr"
                    fill={hoveredId === 'sindallah' ? '#FFB800' : '#FFFFFF'}
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    SINDALLAH
                  </text>
                </g>

                {/* 4. OXAGON */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('oxagon')}
                  onMouseEnter={() => setHoveredId('oxagon')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="425" cy="495" rx="14" ry="5.5" fill="url(#beacon-glow)" />
                  <circle cx="425" cy="495" r="5" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="425" cy="495" r="2" fill="#FFFFFF" />

                  <line
                    x1="425"
                    y1="495"
                    x2="230"
                    y2="495"
                    stroke={hoveredId === 'oxagon' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'oxagon' ? '3.2' : '2.6'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="230" cy="495" r="4.5" fill={hoveredId === 'oxagon' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="215"
                    y="501"
                    textAnchor="end"
                    direction="ltr"
                    fill={hoveredId === 'oxagon' ? '#FFB800' : '#FFFFFF'}
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    OXAGON
                  </text>
                </g>

                {/* 5. TROJENA */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('trojena')}
                  onMouseEnter={() => setHoveredId('trojena')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="460" cy="545" rx="14" ry="5.5" fill="url(#beacon-glow)" />
                  <circle cx="460" cy="545" r="5" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="460" cy="545" r="2" fill="#FFFFFF" />

                  <line
                    x1="460"
                    y1="545"
                    x2="230"
                    y2="545"
                    stroke={hoveredId === 'trojena' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'trojena' ? '3.2' : '2.6'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="230" cy="545" r="4.5" fill={hoveredId === 'trojena' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="215"
                    y="551"
                    textAnchor="end"
                    direction="ltr"
                    fill={hoveredId === 'trojena' ? '#FFB800' : '#FFFFFF'}
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    TROJENA
                  </text>
                </g>

                {/* 6. MADINA */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('madina')}
                  onMouseEnter={() => setHoveredId('madina')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="550" cy="600" rx="15" ry="6" fill="url(#beacon-glow)" />
                  <circle cx="550" cy="600" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="550" cy="600" r="2" fill="#FFFFFF" />

                  <line
                    x1="550"
                    y1="600"
                    x2="410"
                    y2="600"
                    stroke={hoveredId === 'madina' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'madina' ? '3.2' : '2.6'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="410" cy="600" r="4.5" fill={hoveredId === 'madina' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="395"
                    y="606"
                    textAnchor="end"
                    direction="ltr"
                    fill={hoveredId === 'madina' ? '#FFB800' : '#FFFFFF'}
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    MADINA
                  </text>
                </g>

                {/* 7. JEDDAH */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('jeddah')}
                  onMouseEnter={() => setHoveredId('jeddah')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="630" cy="660" rx="15" ry="6" fill="url(#beacon-glow)" />
                  <circle cx="630" cy="660" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="630" cy="660" r="2" fill="#FFFFFF" />

                  <line
                    x1="630"
                    y1="660"
                    x2="480"
                    y2="660"
                    stroke={hoveredId === 'jeddah' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'jeddah' ? '3.2' : '2.6'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="480" cy="660" r="4.5" fill={hoveredId === 'jeddah' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="465"
                    y="666"
                    textAnchor="end"
                    direction="ltr"
                    fill={hoveredId === 'jeddah' ? '#FFB800' : '#FFFFFF'}
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    JEDDAH
                  </text>
                </g>

                {/* 8. MAKKAH */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('makkah')}
                  onMouseEnter={() => setHoveredId('makkah')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="670" cy="715" rx="15" ry="6" fill="url(#beacon-glow)" />
                  <circle cx="670" cy="715" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="670" cy="715" r="2" fill="#FFFFFF" />

                  <line
                    x1="670"
                    y1="715"
                    x2="520"
                    y2="715"
                    stroke={hoveredId === 'makkah' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'makkah' ? '3.2' : '2.6'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="520" cy="715" r="4.5" fill={hoveredId === 'makkah' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="505"
                    y="721"
                    textAnchor="end"
                    direction="ltr"
                    fill={hoveredId === 'makkah' ? '#FFB800' : '#FFFFFF'}
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    MAKKAH
                  </text>
                </g>

                {/* 9. JIZAN */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('jizan')}
                  onMouseEnter={() => setHoveredId('jizan')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="770" cy="815" rx="15" ry="6" fill="url(#beacon-glow)" />
                  <circle cx="770" cy="815" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="770" cy="815" r="2" fill="#FFFFFF" />

                  <line
                    x1="770"
                    y1="815"
                    x2="630"
                    y2="815"
                    stroke={hoveredId === 'jizan' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'jizan' ? '3.2' : '2.6'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="630" cy="815" r="4.5" fill={hoveredId === 'jizan' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="615"
                    y="821"
                    textAnchor="end"
                    direction="ltr"
                    fill={hoveredId === 'jizan' ? '#FFB800' : '#FFFFFF'}
                    fontSize="21"
                    fontWeight="800"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    JIZAN
                  </text>
                </g>

                {/* 10. NAJRAN */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('najran')}
                  onMouseEnter={() => setHoveredId('najran')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="965" cy="815" rx="16" ry="6.5" fill="url(#beacon-glow)" />
                  <circle cx="965" cy="815" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="965" cy="815" r="2" fill="#FFFFFF" />

                  <line
                    x1="965"
                    y1="815"
                    x2="965"
                    y2="945"
                    stroke={hoveredId === 'najran' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'najran' ? '3.5' : '2.8'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="965" cy="945" r="5" fill={hoveredId === 'najran' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="965"
                    y="980"
                    textAnchor="middle"
                    direction="ltr"
                    fill={hoveredId === 'najran' ? '#FFB800' : '#FFFFFF'}
                    fontSize="22"
                    fontWeight="800"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    NAJRAN
                  </text>
                </g>

                {/* 11. ALQASSIM */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('alqassim')}
                  onMouseEnter={() => setHoveredId('alqassim')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="935" cy="495" rx="16" ry="6.5" fill="url(#beacon-glow)" />
                  <circle cx="935" cy="495" r="5.5" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="935" cy="495" r="2" fill="#FFFFFF" />

                  <line
                    x1="935"
                    y1="495"
                    x2="935"
                    y2="260"
                    stroke={hoveredId === 'alqassim' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'alqassim' ? '3.5' : '2.8'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="935" cy="260" r="5" fill={hoveredId === 'alqassim' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="935"
                    y="235"
                    textAnchor="middle"
                    direction="ltr"
                    fill={hoveredId === 'alqassim' ? '#FFB800' : '#FFFFFF'}
                    fontSize="23"
                    fontWeight="800"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.2"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    ALQASSIM
                  </text>
                </g>

                {/* 12. DAMMAM */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleSelectLocation('dammam')}
                  onMouseEnter={() => setHoveredId('dammam')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <ellipse cx="1570" cy="695" rx="18" ry="7" fill="url(#beacon-glow)" />
                  <circle cx="1570" cy="695" r="6" fill="#FFB800" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="1570" cy="695" r="2.5" fill="#FFFFFF" />

                  <line
                    x1="1570"
                    y1="695"
                    x2="1570"
                    y2="360"
                    stroke={hoveredId === 'dammam' ? '#FFFFFF' : '#FFB800'}
                    strokeWidth={hoveredId === 'dammam' ? '3.5' : '2.8'}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  <circle cx="1570" cy="360" r="5" fill={hoveredId === 'dammam' ? '#FFFFFF' : '#FFB800'} />

                  <text
                    x="1570"
                    y="335"
                    textAnchor="middle"
                    direction="ltr"
                    fill={hoveredId === 'dammam' ? '#FFB800' : '#FFFFFF'}
                    fontSize="24"
                    fontWeight="900"
                    fontFamily="Inter, -apple-system, system-ui, sans-serif"
                    letterSpacing="1.5"
                    className="transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    DAMMAM
                  </text>
                </g>

                {/* 13. RIYADH HUB & 9 SUB-PROJECTS LIST (CLEARLY SPACED & ANCHORED) */}
                {/* Riyadh Ground Beacon */}
                <ellipse cx="1065" cy="540" rx="20" ry="8" fill="url(#beacon-glow)" />
                <circle cx="1065" cy="540" r="6.5" fill="#FFB800" stroke="#000000" strokeWidth="2" />
                <circle cx="1065" cy="540" r="2.5" fill="#FFFFFF" />

                <line
                  x1="1065"
                  y1="540"
                  x2="1065"
                  y2="302"
                  stroke={hoveredId === 'riyadh' ? '#FFFFFF' : '#FFB800'}
                  strokeWidth={hoveredId === 'riyadh' ? '3.8' : '3.2'}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
                <circle cx="1065" cy="302" r="5.5" fill={hoveredId === 'riyadh' ? '#FFFFFF' : '#FFB800'} />

                <text
                  x="1065"
                  y="272"
                  textAnchor="middle"
                  direction="ltr"
                  fill={hoveredId === 'riyadh' ? '#FFB800' : '#FFFFFF'}
                  fontSize="25"
                  fontWeight="900"
                  fontFamily="Inter, -apple-system, system-ui, sans-serif"
                  letterSpacing="1.5"
                  className="cursor-pointer transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  onClick={() => handleSelectLocation('riyadh')}
                  onMouseEnter={() => setHoveredId('riyadh')}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  RIYADH
                </text>

                {/* Horizontal branch line from Riyadh vertical line across to the project tree spine */}
                <line
                  x1="1065"
                  y1="302"
                  x2="1220"
                  y2="302"
                  stroke="#FFB800"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Vertical Tree Spine connecting all 9 sub-projects from y=110 to y=494 */}
                <line
                  x1="1220"
                  y1="110"
                  x2="1220"
                  y2="494"
                  stroke="#FFB800"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* 9 Riyadh Sub-Projects with generous 48px vertical spacing */}
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
                      {/* Horizontal Connector Line */}
                      <line
                        x1="1220"
                        y1={proj.y}
                        x2="1280"
                        y2={proj.y}
                        stroke={isHovered ? '#FFFFFF' : '#FFB800'}
                        strokeWidth={isHovered ? '3.2' : '2.4'}
                        strokeLinecap="round"
                        className="transition-all duration-200"
                      />

                      {/* Branch Node Dot */}
                      <circle
                        cx="1280"
                        cy={proj.y}
                        r="4.5"
                        fill={isHovered ? '#FFFFFF' : '#FFB800'}
                        className="transition-all duration-200"
                      />

                      {/* Project Name Label positioned 16px to the right of node and flows strictly LTR to the right */}
                      <text
                        x="1296"
                        y={proj.y + 6}
                        textAnchor="start"
                        direction="ltr"
                        fill={isHovered ? '#FFB800' : '#FFFFFF'}
                        fontSize="18"
                        fontWeight="800"
                        fontFamily="Inter, -apple-system, system-ui, sans-serif"
                        letterSpacing="1px"
                        className="transition-colors duration-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                      >
                        {proj.nameEn}
                      </text>
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
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${selectedRegion === reg
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

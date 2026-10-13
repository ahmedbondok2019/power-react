import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Award,
  ShieldCheck,
  LayoutGrid,
  Table2,
  Search,
  Sparkles,
  Clock
} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { useLanguage } from '../../contexts/LanguageContext';

const DEFAULT_WORKFORCE_DATA = [
  {
    id: "gm",
    function: { ar: "المدير العام", en: "General Manager" },
    code: "GM",
    staff: "1",
    exp: { ar: "15 سنة", en: "15 Years" },
    level: "EXCEPTIONAL",
    levelLabel: { ar: "استثنائي", en: "Exceptional" },
    category: "executive"
  },
  {
    id: "ceo",
    function: { ar: "الرئيس التنفيذي", en: "Chief Executive Officer" },
    code: "CEO",
    staff: "1",
    exp: { ar: "12 سنة", en: "12 Years" },
    level: "EXCEPTIONAL",
    levelLabel: { ar: "استثنائي", en: "Exceptional" },
    category: "executive"
  },
  {
    id: "cfo",
    function: { ar: "المدير المالي", en: "Chief Financial Officer" },
    code: "CFO (Quick-Wins)",
    staff: "1",
    exp: { ar: "45 سنة", en: "45 Years" },
    level: "EXCEPTIONAL",
    levelLabel: { ar: "استثنائي", en: "Exceptional" },
    category: "executive"
  },
  {
    id: "pmo",
    function: { ar: "مكتب إدارة المشاريع", en: "Project Management Office" },
    code: "PMO (MAVEN)",
    staff: "4",
    exp: { ar: "75 سنة (مجمعة)", en: "75 Years (Combined)" },
    level: "EXCEPTIONAL",
    levelLabel: { ar: "استثنائي", en: "Exceptional" },
    category: "management"
  },
  {
    id: "bdm",
    function: { ar: "مدير تطوير الأعمال", en: "Business Development Manager" },
    code: "BDM",
    staff: "1",
    exp: { ar: "13 سنة", en: "13 Years" },
    level: "EXCEPTIONAL",
    levelLabel: { ar: "استثنائي", en: "Exceptional" },
    category: "management"
  },
  {
    id: "projects-managers",
    function: { ar: "مدراء المشاريع الكبرى", en: "Projects Managers" },
    code: "PROJECTS MANAGERS",
    staff: "2",
    exp: { ar: "55 سنة (مجمعة)", en: "55 Years (Combined)" },
    level: "HIGH",
    levelLabel: { ar: "عالي", en: "High" },
    category: "management"
  },
  {
    id: "project-managers",
    function: { ar: "مدراء المشاريع الميدانيون", en: "Project Managers" },
    code: "PROJECT MANAGERS",
    staff: "4",
    exp: { ar: "32 سنة (مجمعة)", en: "32 Years (Combined)" },
    level: "HIGH",
    levelLabel: { ar: "عالي", en: "High" },
    category: "management"
  },
  {
    id: "hse",
    function: { ar: "مدير السلامة والصحة المهنية", en: "HSE Manager" },
    code: "HSE MANAGER",
    staff: "1",
    exp: { ar: "7 سنوات", en: "7 Years" },
    level: "HIGH",
    levelLabel: { ar: "عالي", en: "High" },
    category: "management"
  },
  {
    id: "chief-accountant",
    function: { ar: "كبير المحاسبين", en: "Chief Accountant" },
    code: "CHIEF ACCOUNTANT",
    staff: "1",
    exp: { ar: "10 سنوات", en: "10 Years" },
    level: "HIGH",
    levelLabel: { ar: "عالي", en: "High" },
    category: "management"
  },
  {
    id: "accountant",
    function: { ar: "فريق المحاسبة والمالية", en: "Accounting Team" },
    code: "ACCOUNTANT",
    staff: "2",
    exp: { ar: "15 سنة (مجمعة)", en: "15 Years (Combined)" },
    level: "STANDARD",
    levelLabel: { ar: "قياسي معتمد", en: "Standard" },
    category: "operations"
  },
  {
    id: "qc-engineer",
    function: { ar: "مهندس ضبط الجودة الميداني", en: "QC Site Engineer" },
    code: "QC SITE ENGINEER",
    staff: "2",
    exp: { ar: "30 سنة (مجمعة)", en: "30 Years (Combined)" },
    level: "STANDARD",
    levelLabel: { ar: "قياسي معتمد", en: "Standard" },
    category: "engineering"
  },
  {
    id: "sr-site-engineer",
    function: { ar: "مهندس موقع أول", en: "Senior Site Engineer" },
    code: "SR. SITE ENGINEER",
    staff: "4",
    exp: { ar: "22 سنة (مجمعة)", en: "22 Years (Combined)" },
    level: "STANDARD",
    levelLabel: { ar: "قياسي معتمد", en: "Standard" },
    category: "engineering"
  },
  {
    id: "sr-foreman",
    function: { ar: "مشرف موقع أول (فورمان)", en: "Senior Foreman" },
    code: "SR. FOREMAN",
    staff: "8",
    exp: { ar: "76 سنة (مجمعة)", en: "76 Years (Combined)" },
    level: "STANDARD",
    levelLabel: { ar: "قياسي معتمد", en: "Standard" },
    category: "technical"
  },
  {
    id: "sr-technicians",
    function: { ar: "فنيون محترفون أول", en: "Senior Technicians" },
    code: "SR. TECHNICIANS",
    staff: "+30",
    exp: { ar: "163 سنة (مجمعة)", en: "163 Years (Combined)" },
    level: "HIGH",
    levelLabel: { ar: "عالي", en: "High" },
    category: "technical"
  },
  {
    id: "workers",
    function: { ar: "الكوادر والعمالة الميدانية", en: "Field Workforce & Labor" },
    code: "WORKERS",
    staff: { ar: "مرن (يصل إلى 1,800)", en: "Variable (Up to 1,800)" },
    exp: { ar: "+100 سنة (مرن)", en: "+100 Years (Variable)" },
    level: "LOW",
    levelLabel: { ar: "تنفيذي ميداني", en: "Operational" },
    category: "operations"
  },
  {
    id: "design-engineers",
    function: { ar: "مهندسو التصميم والدراسات", en: "Design Engineers" },
    code: "DESIGN ENGINEERS",
    staff: "4",
    exp: { ar: "38 سنة (مجمعة)", en: "38 Years (Combined)" },
    level: "EXCEPTIONAL",
    levelLabel: { ar: "عالي / استثنائي", en: "High / Exceptional" },
    category: "engineering"
  },
  {
    id: "logistics",
    function: { ar: "الدعم اللوجستي وسلاسل الإمداد", en: "Logistics & Supply Chain" },
    code: "LOGISTICS",
    staff: { ar: "+10 (يصل إلى 100)", en: "+10 (Variable up to 100)" },
    exp: { ar: "+45 سنة (مرن)", en: "+45 Years (Variable)" },
    level: "STANDARD",
    levelLabel: { ar: "قياسي معتمد", en: "Standard" },
    category: "operations"
  }
];

// Helper for localized strings
const resolveText = (val, lang = 'ar') => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    return val[lang] || val.ar || val.en || '';
  }
  return '';
};

// Level Badge Component
const LevelBadge = ({ level, label, lang }) => {
  const normalized = (level || '').toUpperCase();
  let badgeStyle = "bg-white/10 text-white/80 border-white/15";
  let dotColor = "bg-white/60";

  if (normalized.includes('EXCEPTIONAL')) {
    badgeStyle = "bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]/30 shadow-[0_0_12px_rgba(255,184,0,0.15)]";
    dotColor = "bg-[#FFB800]";
  } else if (normalized.includes('HIGH')) {
    badgeStyle = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]";
    dotColor = "bg-emerald-400";
  } else if (normalized.includes('STANDARD')) {
    badgeStyle = "bg-sky-500/15 text-sky-300 border-sky-500/30";
    dotColor = "bg-sky-400";
  }

  const displayText = label
    ? resolveText(label, lang)
    : normalized === 'EXCEPTIONAL'
      ? (lang === 'en' ? 'Exceptional' : 'استثنائي')
      : normalized.includes('HIGH')
        ? (lang === 'en' ? 'High' : 'عالي')
        : normalized === 'STANDARD'
          ? (lang === 'en' ? 'Standard' : 'قياسي معتمد')
          : (lang === 'en' ? 'Operational' : 'تنفيذي');

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border tracking-wide uppercase whitespace-nowrap ${badgeStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`}></span>
      <span>{displayText}</span>
    </span>
  );
};

const WorkforceTable = ({ data }) => {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Default view mode: 'cards' on mobile/tablet, 'cards' or 'table' on desktop
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 'table' : 'cards';
    }
    return 'cards';
  });

  // Prepare & normalize data
  const rawRows = (data?.rows && data.rows.length > 0) ? data.rows : DEFAULT_WORKFORCE_DATA;
  const normalizedRows = useMemo(() => {
    return rawRows.map((item, idx) => {
      // If item is already structured like DEFAULT_WORKFORCE_DATA
      if (item.id && item.function && typeof item.function === 'object') {
        return item;
      }
      // If item is from raw API / legacy format: { function, staff, exp, level }
      const funcName = item.function || item.title || `Role ${idx + 1}`;
      const defaultMatch = DEFAULT_WORKFORCE_DATA.find(
        d => d.code.toLowerCase() === String(funcName).toLowerCase() ||
             d.id.toLowerCase() === String(funcName).toLowerCase()
      );

      return {
        id: defaultMatch?.id || `role-${idx}`,
        function: defaultMatch?.function || { ar: funcName, en: funcName },
        code: defaultMatch?.code || funcName,
        staff: item.staff || defaultMatch?.staff || '1',
        exp: defaultMatch?.exp || { ar: `${item.exp || ''}`, en: `${item.exp || ''}` },
        level: item.level || defaultMatch?.level || 'STANDARD',
        levelLabel: defaultMatch?.levelLabel || { ar: item.level || 'قياسي', en: item.level || 'Standard' },
        category: defaultMatch?.category || 'operations'
      };
    });
  }, [rawRows]);

  // Section titles & metrics
  const title = data?.title || (lang === 'en' ? 'Workforce & Experience' : 'القوى العاملة والخبرة');
  const subtitle = lang === 'en'
    ? 'An integrated executive and engineering powerhouse combining decades of accumulated experience.'
    : 'منظومة هندسية وتنفيذية متكاملة تجمع بين عقود من الخبرات المتراكمة والجاهزية الفورية لتنفيذ أضخم المشاريع.';

  const totalStaff = data?.total_staff || (lang === 'en' ? "+76 (Up to 1,500 on demand)" : "+76 كادر أساسي (يصل إلى 1,500)");
  const totalExp = data?.total_experience || (lang === 'en' ? "+750 Years of Compiled Experience" : "+750 سنة من الخبرة المهنية المتراكمة");

  // Filtering
  const filteredRows = useMemo(() => {
    return normalizedRows.filter(row => {
      const levelMatches = selectedLevel === 'all' ||
        (selectedLevel === 'exceptional' && row.level.toUpperCase().includes('EXCEPTIONAL')) ||
        (selectedLevel === 'high' && row.level.toUpperCase().includes('HIGH')) ||
        (selectedLevel === 'standard' && row.level.toUpperCase().includes('STANDARD'));

      if (!levelMatches) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const arTitle = resolveText(row.function, 'ar').toLowerCase();
      const enTitle = resolveText(row.function, 'en').toLowerCase();
      const code = (row.code || '').toLowerCase();
      return arTitle.includes(q) || enTitle.includes(q) || code.includes(q);
    });
  }, [normalizedRows, selectedLevel, searchQuery]);

  return (
    <section className="relative w-full bg-[#141615] text-white py-14 sm:py-20 lg:py-24 select-none overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFB800]/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col h-full">

        {/* Section Header & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 border-b border-white/10 pb-6">
          <div className="text-start space-y-2.5 max-w-2xl">
            <SectionTitle title={title} theme="dark" />
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-[#1F2321] p-1.5 rounded-2xl shrink-0 self-start md:self-auto border border-white/10 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'cards'
                  ? 'bg-[#FFB800] text-black shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Smart Cards' : 'عرض البطاقات'}</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-[#FFB800] text-black shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Full Table' : 'الجدول الكامل'}</span>
            </button>
          </div>
        </div>

        {/* Key Executive KPI Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 mb-8 sm:mb-10">
          {/* KPI 1: Total Experience */}
          <div className="bg-gradient-to-br from-[#1E2220] via-[#161817] to-[#121413] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-lg hover:border-[#FFB800]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/25 flex items-center justify-center shrink-0 text-[#FFB800]">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-start">
              <span className="text-[10px] sm:text-[11px] font-bold text-white/60 uppercase tracking-wider block">
                {lang === 'en' ? 'Combined Experience' : 'الخبرة المهنية التراكمية'}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5 tracking-tight">
                +750 <span className="text-xs sm:text-sm font-semibold text-[#FFB800]">{lang === 'en' ? 'Years' : 'عاماً'}</span>
              </h4>
              <p className="text-[10px] text-white/50 mt-0.5 line-clamp-1">
                {lang === 'en' ? 'Compiled professional track record' : 'خبرات متراكمة لكافة القيادات والكوادر'}
              </p>
            </div>
          </div>

          {/* KPI 2: Total Workforce */}
          <div className="bg-gradient-to-br from-[#1E2220] via-[#161817] to-[#121413] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-lg hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-start">
              <span className="text-[10px] sm:text-[11px] font-bold text-white/60 uppercase tracking-wider block">
                {lang === 'en' ? 'Workforce Capacity' : 'القوى العاملة والتوسع'}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5 tracking-tight">
                +76 <span className="text-xs sm:text-sm font-semibold text-emerald-400">{lang === 'en' ? 'Core' : 'كادر'}</span>
                <span className="text-[10px] text-white/60 font-normal ms-1">({lang === 'en' ? 'Up to 1,500' : 'حتى 1,500'})</span>
              </h4>
              <p className="text-[10px] text-white/50 mt-0.5 line-clamp-1">
                {lang === 'en' ? 'Permanent core with rapid scalability' : 'جاهزية فورية لتغطية أضخم المشروعات'}
              </p>
            </div>
          </div>

          {/* KPI 3: Caliber / Qualification */}
          <div className="bg-gradient-to-br from-[#1E2220] via-[#161817] to-[#121413] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-lg hover:border-sky-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center shrink-0 text-sky-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-start">
              <span className="text-[10px] sm:text-[11px] font-bold text-white/60 uppercase tracking-wider block">
                {lang === 'en' ? 'Caliber Standard' : 'معايير الكفاءة والاعتماد'}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5 tracking-tight">
                100% <span className="text-xs sm:text-sm font-semibold text-sky-400">{lang === 'en' ? 'Certified' : 'معتمد'}</span>
              </h4>
              <p className="text-[10px] text-white/50 mt-0.5 line-clamp-1">
                {lang === 'en' ? 'Engineering & executive accreditations' : 'كوادر هندسية وإدارية مرخصة بالكامل'}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          {/* Level Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                selectedLevel === 'all'
                  ? 'bg-white text-black border-white shadow-sm'
                  : 'bg-[#181B19] text-white/70 border-white/10 hover:text-white'
              }`}
            >
              {lang === 'en' ? `All Calibers (${normalizedRows.length})` : `كافة الكوادر (${normalizedRows.length})`}
            </button>

            <button
              type="button"
              onClick={() => setSelectedLevel('exceptional')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                selectedLevel === 'exceptional'
                  ? 'bg-[#FFB800] text-black border-[#FFB800] shadow-sm'
                  : 'bg-[#181B19] text-[#FFB800]/80 border-white/10 hover:border-[#FFB800]/40'
              }`}
            >
              {lang === 'en' ? 'Exceptional' : 'استثنائي'}
            </button>

            <button
              type="button"
              onClick={() => setSelectedLevel('high')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                selectedLevel === 'high'
                  ? 'bg-emerald-400 text-black border-emerald-400 shadow-sm'
                  : 'bg-[#181B19] text-emerald-400/80 border-white/10 hover:border-emerald-400/40'
              }`}
            >
              {lang === 'en' ? 'High' : 'عالي'}
            </button>

            <button
              type="button"
              onClick={() => setSelectedLevel('standard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                selectedLevel === 'standard'
                  ? 'bg-sky-400 text-black border-sky-400 shadow-sm'
                  : 'bg-[#181B19] text-sky-400/80 border-white/10 hover:border-sky-400/40'
              }`}
            >
              {lang === 'en' ? 'Standard' : 'قياسي'}
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute top-1/2 -translate-y-1/2 start-3 text-white/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search role or code...' : 'بحث في التخصص أو الوظيفة...'}
              className="w-full bg-[#181B19] border border-white/10 rounded-xl ps-8 pe-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFB800]/60 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 -translate-y-1/2 end-2.5 text-white/40 hover:text-white text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* ============================================================
            VIEW 1: RESPONSIVE CARDS VIEW (MASTERPIECE FOR MOBILE/TABLET)
            - 100% Mobile & Small Screen Optimized
            - Zero Horizontal Scroll Trap
            - Clean Data Chips & Visual Hierarchy
           ============================================================ */}
        {viewMode === 'cards' && (
          <div className="w-full">
            {filteredRows.length === 0 ? (
              <div className="bg-[#181B19] border border-white/10 rounded-2xl p-10 text-center text-white/60 text-xs sm:text-sm">
                {lang === 'en' ? 'No matching roles found.' : 'لا توجد نتائج مطابقة لخيارات البحث الحالية.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {filteredRows.map((row, index) => {
                  const arFunction = resolveText(row.function, 'ar');
                  const enFunction = resolveText(row.function, 'en');
                  const mainTitle = lang === 'en' ? enFunction : arFunction;
                  const secondaryTitle = row.code || (lang === 'en' ? arFunction : enFunction);
                  const staffDisplay = resolveText(row.staff, lang);
                  const expDisplay = resolveText(row.exp, lang);

                  return (
                    <motion.div
                      key={row.id || index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                      className="group bg-gradient-to-br from-[#1C1F1D] via-[#161817] to-[#121413] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-md hover:border-[#FFB800]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Ambient hover top border line */}
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFB800]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      <div>
                        {/* Header: Role & Level Badge */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="text-start">
                            <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                              {mainTitle}
                            </h4>
                            {secondaryTitle && secondaryTitle !== mainTitle && (
                              <span className="inline-block mt-0.5 text-[11px] font-semibold text-white/50 tracking-wider">
                                {secondaryTitle}
                              </span>
                            )}
                          </div>

                          <LevelBadge level={row.level} label={row.levelLabel} lang={lang} />
                        </div>
                      </div>

                      {/* Data Metrics Pills */}
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 mt-3">
                        {/* Staff count */}
                        <div className="bg-[#121413] border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
                          <div className="flex items-center gap-1 text-white/50 text-[10px] mb-0.5 font-medium">
                            <Users className="w-3 h-3 text-[#FFB800]" />
                            <span>{lang === 'en' ? 'Staff' : 'الكوادر'}</span>
                          </div>
                          <span className="text-xs sm:text-sm font-black text-white">
                            {staffDisplay}
                          </span>
                        </div>

                        {/* Experience */}
                        <div className="bg-[#121413] border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
                          <div className="flex items-center gap-1 text-white/50 text-[10px] mb-0.5 font-medium">
                            <Clock className="w-3 h-3 text-[#FFB800]" />
                            <span>{lang === 'en' ? 'Experience' : 'سنوات الخبرة'}</span>
                          </div>
                          <span className="text-xs sm:text-sm font-black text-[#FFB800] leading-tight">
                            {expDisplay}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================
            VIEW 2: REDESIGNED EXECUTIVE FULL TABLE
            - Cohesive Dark Luxury Palette
            - Touch Scroll Assistance on Mobile
            - Fully Aligned Integrated Totals Footer
           ============================================================ */}
        {viewMode === 'table' && (
          <div className="w-full flex flex-col">
            {/* Mobile swipe helper banner */}
            <div className="md:hidden flex items-center justify-between bg-[#1C1F1D] border border-white/10 rounded-xl px-3 py-2 mb-3 text-[11px] text-white/60">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{lang === 'en' ? 'Swipe horizontally to view all columns' : 'اسحب أفقياً لتصفح كامل أعمدة الجدول'}</span>
              </span>
              <span className="text-[#FFB800] font-bold">⟵ ⟶</span>
            </div>

            {/* Table Container */}
            <div className="w-full overflow-x-auto pb-4 hide-scrollbar rounded-2xl border border-white/15 bg-[#171A18] shadow-2xl">
              <table className="w-full min-w-[700px] text-start border-collapse">

                {/* Table Header */}
                <thead>
                  <tr className="bg-gradient-to-r from-[#212623] via-[#1A1E1C] to-[#212623] text-[#FFB800] font-black text-xs uppercase border-b border-white/15">
                    <th className="py-4 px-4 sm:px-6 text-start first:rounded-s-xl w-4/12">
                      {lang === 'en' ? 'Function & Role' : 'الوظيفة / الدور التنفيذي'}
                    </th>
                    <th className="py-4 px-4 text-center border-s border-white/10 w-2/12">
                      {lang === 'en' ? 'Number of Staff' : 'عدد الكوادر'}
                    </th>
                    <th className="py-4 px-4 text-center border-s border-white/10 w-3/12">
                      {lang === 'en' ? 'Years of Experience' : 'سنوات الخبرة'}
                    </th>
                    <th className="py-4 px-4 text-center border-s border-white/10 last:rounded-e-xl w-3/12">
                      {lang === 'en' ? 'Qualification Level' : 'مستوى الكفاءة'}
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="text-white/80 text-xs sm:text-sm font-medium divide-y divide-white/5">
                  {filteredRows.map((row, index) => {
                    const arFunction = resolveText(row.function, 'ar');
                    const enFunction = resolveText(row.function, 'en');
                    const mainTitle = lang === 'en' ? enFunction : arFunction;
                    const secondaryTitle = row.code;
                    const staffDisplay = resolveText(row.staff, lang);
                    const expDisplay = resolveText(row.exp, lang);

                    return (
                      <tr
                        key={row.id || index}
                        className="hover:bg-white/[0.04] odd:bg-white/[0.015] transition-colors duration-150"
                      >
                        {/* Function */}
                        <td className="py-3.5 px-4 sm:px-6 text-start">
                          <div className="font-bold text-white text-xs sm:text-sm">
                            {mainTitle}
                          </div>
                          {secondaryTitle && (
                            <div className="text-[10px] sm:text-[11px] font-semibold text-white/50 tracking-wider mt-0.5">
                              {secondaryTitle}
                            </div>
                          )}
                        </td>

                        {/* Number of Staff */}
                        <td className="py-3.5 px-4 text-center border-s border-white/5 font-bold text-white">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 text-xs">
                            {staffDisplay}
                          </span>
                        </td>

                        {/* Years of Experience */}
                        <td className="py-3.5 px-4 text-center border-s border-white/5 font-bold text-[#FFB800]">
                          {expDisplay}
                        </td>

                        {/* Qualification Level */}
                        <td className="py-3.5 px-4 text-center border-s border-white/5">
                          <LevelBadge level={row.level} label={row.levelLabel} lang={lang} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                {/* Integrated Table Footer (Synchronized with Columns) */}
                <tfoot>
                  <tr className="bg-[#1C201E] border-t-2 border-white/15 text-white font-black text-xs sm:text-sm uppercase">
                    <td className="py-4 px-4 sm:px-6 text-start text-[#FFB800] tracking-wider">
                      {lang === 'en' ? 'TOTAL CAPACITY' : 'إجمالي الطاقة الاستيعابية والخبرة'}
                    </td>
                    <td className="py-4 px-4 text-center border-s border-white/10 text-white font-extrabold whitespace-pre-line leading-tight">
                      {totalStaff}
                    </td>
                    <td className="py-4 px-4 text-center border-s border-white/10 text-[#FFB800] font-extrabold whitespace-pre-line leading-tight">
                      {totalExp}
                    </td>
                    <td className="py-4 px-4 text-center border-s border-white/10 text-emerald-400 font-bold">
                      {lang === 'en' ? 'HIGH-CALIBER STANDARD' : 'كفاءات قيادية معتمدة'}
                    </td>
                  </tr>
                </tfoot>

              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default WorkforceTable;

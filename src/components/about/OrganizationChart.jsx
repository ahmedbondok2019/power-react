import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Network,
  ChevronLeft,
  ChevronRight,
  Crown,
  Briefcase,
  Layers,
  Users,
  DollarSign,
  Scale,
  ShieldCheck,
  HardHat,
  Info,
  Maximize2
} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { useLanguage } from '../../contexts/LanguageContext';

const ORG_DATA_LOCALIZED = {
  gm: {
    title: { ar: "المدير العام", en: "GENERAL MANAGER" },
    name: { ar: "محمد الملا", en: "Mohammed Al Mulla" }
  },
  ceo: {
    title: { ar: "الرئيس التنفيذي", en: "CHIEF EXECUTIVE OFFICER" },
    name: { ar: "مجد الملا", en: "Majd Al Mulla" }
  },
  secretary: {
    title: { ar: "السكرتارية التنفيذية", en: "EXECUTIVE SECRETARY" },
    name: { ar: "زينة الغامدي", en: "Zeina Alghamdi" }
  },
  branches: [
    {
      id: "bdm",
      icon: "Briefcase",
      header: {
        title: { ar: "تطوير الأعمال (BDM)", en: "BDM" },
        name: { ar: "أحمد الخطيب", en: "Ahmad Elkhatib" }
      },
      items: [
        { title: { ar: "مدير التسويق", en: "MARKETING MANAGER" }, name: { ar: "مشعل العتيبي", en: "Meshal Alotaibi" } },
        { title: { ar: "مدير المبيعات", en: "SALES MANAGER" }, name: { ar: "مجد غانم", en: "Majd Ghanem" } },
        { title: { ar: "فريق التقدير ودراسة العطاءات", en: "ESTIMATION TEAM" } },
        { title: { ar: "فريق التصميم المبدئي", en: "PRE-DESIGN TEAM" } },
        { title: { ar: "مهندسو المبيعات", en: "SALES ENGINEERS" } }
      ]
    },
    {
      id: "pmo",
      icon: "Layers",
      header: {
        title: { ar: "مكتب إدارة المشاريع (PMO)", en: "PMO" }
      },
      items: [
        { title: { ar: "مدير المشاريع", en: "PROJECTS MANAGER" }, name: { ar: "إيهاب عسوس", en: "Ehab Asous" } },
        { title: { ar: "مدراء المشاريع الميدانيون", en: "PROJECT MANAGERS" } },
        { title: { ar: "فرق المشاريع", en: "PROJECT TEAMS" }, desc: { ar: "(فرق المواقع الميدانية)", en: "(Site Teams)" } }
      ]
    },
    {
      id: "hr",
      icon: "Users",
      header: {
        title: { ar: "مدير الموارد البشرية", en: "HR MANAGER" },
        name: { ar: "رهف حروبي", en: "Rahaf Horoubi" }
      },
      items: [
        { title: { ar: "إداري الموارد البشرية", en: "HR ADMIN" }, name: { ar: "ريما العنزي", en: "Reema Enezi" } },
        { title: { ar: "ممثل العلاقات الحكومية", en: "GOV REP" }, name: { ar: "أحمد العمري", en: "Ahmad Al Amry" } },
        { title: { ar: "سلسلة الإمداد والمشتريات", en: "PROCUREMENT" } }
      ]
    },
    {
      id: "cfo",
      icon: "DollarSign",
      header: {
        title: { ar: "المدير المالي (CFO)", en: "CFO" }
      },
      items: [
        { title: { ar: "كبير المحاسبين", en: "CHIEF ACCOUNTANT" }, name: { ar: "أحمد رضوان", en: "Ahmed Radwan" } },
        { title: { ar: "فريق المحاسبة والمالية", en: "ACCOUNTING TEAM" } },
        { title: { ar: "المستودعات وإدارة المخزون", en: "WAREHOUSE & INVENTORY" } }
      ]
    },
    {
      id: "legal",
      icon: "Scale",
      header: {
        title: { ar: "المستشار القانوني", en: "LEGAL ADVISOR" },
        name: { ar: "ندى القحطاني", en: "Nada Alqahtani" }
      },
      items: [
        { title: { ar: "محامي الشركة", en: "LAWYER" }, name: { ar: "مروان نعمان", en: "Marwan Noaman" } }
      ]
    }
  ],
  hse: {
    title: { ar: "السلامة والصحة المهنية (HSE)", en: "HSE & SAFETY" },
    name: { ar: "وظيفة رقابية مستقلة", en: "Independent Function" }
  },
  operations: {
    title: { ar: "عمليات المشاريع والمواقع الميدانية", en: "PROJECT & SITE OPERATIONS" },
    items: [
      { ar: "فرق المشاريع", en: "PROJECT TEAMS" },
      { ar: "عمليات المواقع الميدانية", en: "SITE OPERATIONS" },
      { ar: "الفرق الفنية والهندسية", en: "TECHNICAL TEAMS" }
    ]
  }
};

const getLocalized = (val, lang = 'ar') => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    return val[lang] || val.ar || val.en || '';
  }
  return '';
};

// Reusable Boxes for the Diagram View
const DiagramBlackBox = ({ title, name, className = "" }) => (
  <div className={`bg-gradient-to-b from-[#1E2220] via-[#141615] to-[#0D0F0E] text-white border border-white/15 rounded-xl px-3 py-3.5 shadow-md flex flex-col items-center justify-center text-center z-10 relative transition-transform hover:scale-105 ${className}`}>
    <h4 className="font-bold text-[12px] sm:text-[13px] tracking-wide leading-tight mb-1">{title}</h4>
    {name && <p className="text-[#FFB800] text-[11px] sm:text-[12px] font-bold">{name}</p>}
  </div>
);

const DiagramWhiteBox = ({ title, name, desc, className = "", minH = "min-h-[56px]" }) => (
  <div className={`bg-white text-gray-900 border border-gray-200 rounded-xl px-2.5 py-2.5 shadow-sm hover:border-[#FFB800]/50 hover:shadow-md transition-all flex flex-col items-center justify-center text-center z-10 relative ${minH} ${className}`}>
    <h4 className="font-bold text-[11px] sm:text-[12px] tracking-tight leading-tight text-gray-900">{title}</h4>
    {name && <p className="text-[#B45309] text-[10px] sm:text-[11px] font-semibold mt-0.5">{name}</p>}
    {desc && <p className="text-gray-400 text-[10px] mt-0.5">{desc}</p>}
  </div>
);

const OrganizationChart = ({ data }) => {
  const { lang, isRTL } = useLanguage();
  const scrollContainerRef = useRef(null);

  // View Mode: 'cards' (optimal for mobile/tablet) vs 'diagram' (wide tree)
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 'diagram' : 'cards';
    }
    return 'cards';
  });

  const [selectedBranch, setSelectedBranch] = useState('all');

  const chartData = useMemo(() => {
    if (data?.chart_data && data.chart_data.branches) {
      return data.chart_data;
    }
    return ORG_DATA_LOCALIZED;
  }, [data]);

  const title = data?.title || (lang === 'en' ? 'Our Organization Structure' : 'الهيكل التنظيمي للشركة');
  const subtitle = lang === 'en'
    ? 'An integrated governance and executive structure ensuring leadership excellence and agile execution.'
    : 'منظومة إدارية وتنفيذية متكاملة تضمن أعلى معايير الحوكمة وسرعة اتخاذ القرارات.';

  // Center scroll container on diagram mount or viewMode change
  useEffect(() => {
    if (viewMode === 'diagram' && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollTarget = (container.scrollWidth - container.clientWidth) / 2;
      container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    }
  }, [viewMode]);

  const scrollDiagram = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 350;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const branches = chartData.branches || [];
  const filteredBranches = selectedBranch === 'all'
    ? branches
    : branches.filter((b, idx) => (b.id || String(idx)) === selectedBranch);

  return (
    <section className="relative w-full bg-[#F8F9FA] text-black py-16 sm:py-24 select-none overflow-hidden border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col h-full">

        {/* Section Header & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-gray-200/80 pb-5">
          <div className="text-start space-y-2">
            <SectionTitle title={title} theme="light" />
            <p className="text-gray-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-gray-200/80 p-1 rounded-2xl shrink-0 self-start md:self-auto border border-gray-300/60">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${viewMode === 'cards'
                  ? 'bg-black text-[#FFB800] shadow-sm'
                  : 'text-gray-700 hover:text-black'
                }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Department Cards' : 'عرض الإدارات'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('diagram')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${viewMode === 'diagram'
                  ? 'bg-black text-[#FFB800] shadow-sm'
                  : 'text-gray-700 hover:text-black'
                }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Full Tree Diagram' : 'المخطط الشجري'}</span>
            </button>
          </div>
        </div>

        {/* ============================================================
            VIEW 1: HIERARCHICAL DEPARTMENT CARDS (RESPONSIVE MASTER)
            - 100% Mobile & Tablet Optimized
            - No Horizontal Scroll Trap
           ============================================================ */}
        {viewMode === 'cards' && (
          <div className="w-full flex flex-col space-y-8 animate-fadeIn">

            {/* 1. Executive Leadership Suite */}
            <div className="bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5 pb-3.5 border-b border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-black text-[#FFB800] flex items-center justify-center shadow-sm shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-gray-900">
                    {lang === 'en' ? 'Executive Leadership' : 'الإدارة العليا والمكتب التنفيذي'}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                    {lang === 'en' ? 'Board & Strategic Executive Office' : 'التوجيه الاستراتيجي وحوكمة العمليات'}
                  </p>
                </div>
              </div>

              {/* Leadership Hierarchy Tree */}
              <div className="flex flex-col items-center">
                {/* General Manager */}
                <div className="w-full max-w-xs sm:max-w-sm bg-gradient-to-b from-[#1E2220] via-[#141615] to-[#0D0F0E] text-white rounded-2xl p-4 text-center shadow-lg border border-white/10 relative">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFB800]/20 text-[#FFB800] text-[10px] font-bold tracking-wider mb-1.5 uppercase">
                    {getLocalized(chartData.gm.title, lang)}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {getLocalized(chartData.gm.name, lang)}
                  </h4>
                </div>

                {/* Connecting Line */}
                <div className="w-0.5 h-6 bg-gray-300"></div>

                {/* CEO & Executive Secretary */}
                <div className="w-full max-w-xs sm:max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                  {/* CEO */}
                  <div className="bg-gradient-to-b from-[#1E2220] via-[#141615] to-[#0D0F0E] text-white rounded-2xl p-4 text-center shadow-md border border-white/10">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#FFB800]/20 text-[#FFB800] text-[10px] font-bold tracking-wider mb-1.5 uppercase">
                      {getLocalized(chartData.ceo.title, lang)}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-white">
                      {getLocalized(chartData.ceo.name, lang)}
                    </h4>
                  </div>

                  {/* Secretary */}
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center shadow-sm flex flex-col justify-center">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold tracking-wider mb-1.5 uppercase">
                      {getLocalized(chartData.secretary.title, lang)}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-gray-800">
                      {getLocalized(chartData.secretary.name, lang)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Department Filter Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 hide-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedBranch('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${selectedBranch === 'all'
                    ? 'bg-black text-[#FFB800] shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {lang === 'en' ? `All Departments (${branches.length})` : `جميع الإدارات (${branches.length})`}
              </button>
              {branches.map((b, i) => {
                const branchKey = b.id || String(i);
                const isSelected = selectedBranch === branchKey;
                return (
                  <button
                    key={branchKey}
                    type="button"
                    onClick={() => setSelectedBranch(branchKey)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${isSelected
                        ? 'bg-black text-[#FFB800] shadow-sm'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                  >
                    {getLocalized(b.header.title, lang)}
                  </button>
                );
              })}
            </div>

            {/* 3. Department Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredBranches.map((branch, idx) => (
                <div
                  key={branch.id || idx}
                  className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Department Header */}
                    <div className="bg-gradient-to-b from-[#1E2220] via-[#141615] to-[#0D0F0E] text-white rounded-xl p-3.5 text-center shadow-sm mb-4 border border-white/10">
                      <h4 className="font-black text-xs sm:text-sm tracking-wide mb-1 text-white">
                        {getLocalized(branch.header.title, lang)}
                      </h4>
                      {branch.header.name && (
                        <p className="text-[#FFB800] text-xs font-bold">
                          {getLocalized(branch.header.name, lang)}
                        </p>
                      )}
                    </div>

                    {/* Hierarchy Sub-items */}
                    <div className="relative pl-4 rtl:pl-0 rtl:pr-4 space-y-2 border-l-2 rtl:border-l-0 rtl:border-r-2 border-gray-200 ml-2.5 rtl:ml-0 rtl:mr-2.5">
                      {branch.items && branch.items.map((item, i) => (
                        <div
                          key={i}
                          className="relative bg-[#F8F9FA] hover:bg-gray-100/90 border border-gray-200/80 rounded-xl p-2.5 transition-all text-start"
                        >
                          {/* Dot on connector line */}
                          <div className="absolute top-1/2 -left-[21px] rtl:-left-auto rtl:-right-[21px] -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>

                          <h5 className="font-bold text-xs text-gray-900 leading-snug">
                            {getLocalized(item.title, lang)}
                          </h5>
                          {item.name && (
                            <p className="text-[11px] font-semibold text-[#B45309] mt-0.5">
                              {getLocalized(item.name, lang)}
                            </p>
                          )}
                          {item.desc && (
                            <span className="text-[10px] text-gray-400 block mt-0.5">
                              {getLocalized(item.desc, lang)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. Independent Operations & Safety */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
              {/* HSE & Safety */}
              <div className="bg-gradient-to-b from-[#1E2220] via-[#141615] to-[#0D0F0E] text-white rounded-2xl p-5 shadow-sm border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#FFB800]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-start">
                  <span className="text-[10px] font-bold text-[#FFB800] uppercase tracking-wider block mb-0.5">
                    {lang === 'en' ? 'Independent Audit & Compliance' : 'إدارة رقابية مستقلة'}
                  </span>
                  <h4 className="font-black text-sm sm:text-base text-white">
                    {getLocalized(chartData.hse?.title, lang)}
                  </h4>
                  <p className="text-xs text-white/70 mt-0.5">
                    {getLocalized(chartData.hse?.name, lang)}
                  </p>
                </div>
              </div>

              {/* Project & Site Operations */}
              <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3 text-start">
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                    <HardHat className="w-5 h-5 text-[#FFB800]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                      {getLocalized(chartData.operations?.title, lang)}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {lang === 'en' ? 'Direct On-Site Execution Teams' : 'الكوادر التنفيذية والهندسية بالميدان'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {chartData.operations?.items?.map((op, opIdx) => (
                    <div key={opIdx} className="bg-gray-50 border border-gray-200/80 rounded-xl p-2 text-center">
                      <span className="text-[10px] sm:text-[11px] font-bold text-gray-700 leading-tight block">
                        {getLocalized(op, lang)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Legend */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-bold text-gray-800 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-gray-400" />
                <span>{lang === 'en' ? 'Organizational Levels:' : 'دليل المستويات التنظيمية:'}</span>
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-black"></div>
                  <span className="text-gray-600 text-[11px] font-medium">{lang === 'en' ? 'Executive Leadership' : 'الإدارة العليا'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-[#FFB800]"></div>
                  <span className="text-gray-600 text-[11px] font-medium">{lang === 'en' ? 'Department Heads' : 'رؤساء الإدارات'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-white border border-gray-300"></div>
                  <span className="text-gray-600 text-[11px] font-medium">{lang === 'en' ? 'Managers' : 'المدراء الميدانيون'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-gray-100 border border-gray-200"></div>
                  <span className="text-gray-600 text-[11px] font-medium">{lang === 'en' ? 'Teams & Staff' : 'الفرق التنفيذية'}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================
            VIEW 2: FULL TREE DIAGRAM (ENHANCED TOUCH-ASSISTED)
            - Smooth scroll with left/right buttons & swipe hint
            - Crisp, centered, balanced alignment in RTL & LTR
           ============================================================ */}
        {viewMode === 'diagram' && (
          <div className="w-full flex flex-col relative animate-fadeIn">

            {/* Diagram Helper Toolbar */}
            <div className="flex items-center justify-between mb-4 px-1 text-xs">
              <span className="text-gray-500 font-medium inline-flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-gray-400" />
                <span>{lang === 'en' ? 'Drag or use arrows to navigate full chart' : 'يمكنك سحب المخطط أو استخدام الأسهم للتنقل'}</span>
              </span>
              <div className="flex items-center gap-1.5">

                <button
                  type="button"
                  onClick={() => scrollDiagram('right')}
                  className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 shadow-sm transition-colors text-gray-700"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollDiagram('left')}
                  className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 shadow-sm transition-colors text-gray-700"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

              </div>
            </div>

            {/* Overflow Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing border border-gray-200/60 rounded-2xl bg-white p-4 sm:p-6 shadow-inner"
            >
              <div className="min-w-[1100px] flex flex-col items-center relative font-sans pt-4 mx-auto">

                {/* Level 1: GM */}
                <div className="relative flex flex-col items-center">
                  <DiagramBlackBox
                    title={getLocalized(chartData.gm.title, lang)}
                    name={getLocalized(chartData.gm.name, lang)}
                    className="w-[260px]"
                  />
                  {/* Line down to CEO */}
                  <div className="w-0.5 h-8 bg-black"></div>
                </div>

                {/* Level 2: CEO & Secretary */}
                <div className="relative flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <DiagramBlackBox
                      title={getLocalized(chartData.ceo.title, lang)}
                      name={getLocalized(chartData.ceo.name, lang)}
                      className="w-[260px]"
                    />

                    {/* Secretary Box (Attached to side of CEO via dashed line) */}
                    <div className="absolute top-1/2 rtl:right-[100%] ltr:left-[100%] -translate-y-1/2 flex items-center rtl:pr-8 ltr:pl-8 pointer-events-auto">
                      <div className="absolute rtl:right-0 ltr:left-0 top-1/2 w-8 border-t-2 border-dashed border-gray-400 -z-10"></div>
                      <DiagramWhiteBox
                        title={getLocalized(chartData.secretary.title, lang)}
                        name={getLocalized(chartData.secretary.name, lang)}
                        className="w-[170px]"
                      />
                    </div>
                  </div>

                  {/* Line down from CEO to Branches */}
                  <div className="w-0.5 h-8 bg-black"></div>
                </div>

                {/* Level 3: Branches */}
                <div className="relative w-full max-w-[1080px]">
                  {/* Horizontal Line connecting all branches */}
                  <div className="absolute top-0 left-[90px] right-[90px] h-[2px] bg-black"></div>

                  <div className="flex flex-row justify-between w-full pt-6 relative">
                    {branches.map((branch, idx) => (
                      <div key={branch.id || idx} className="flex flex-col items-center relative w-[190px]">
                        {/* Vertical line up to horizontal bus */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-black"></div>

                        {/* Header Box */}
                        <DiagramBlackBox
                          title={getLocalized(branch.header.title, lang)}
                          name={getLocalized(branch.header.name, lang)}
                          className="w-full"
                        />

                        {/* Sub Items */}
                        <div className="flex flex-col items-center mt-5 gap-4 relative w-full">
                          {/* Continuous vertical line behind items */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%-25px)] bg-gray-300 -z-0"></div>

                          {branch.items && branch.items.map((item, i) => (
                            <DiagramWhiteBox
                              key={i}
                              title={getLocalized(item.title, lang)}
                              name={getLocalized(item.name, lang)}
                              desc={getLocalized(item.desc, lang)}
                              className="w-full"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Accessories (HSE & Operations & Legend) */}
                <div className="flex flex-row justify-between items-center w-full max-w-[1080px] mt-14 pt-6 border-t border-gray-200">
                  {/* Left: HSE */}
                  <DiagramBlackBox
                    title={getLocalized(chartData.hse?.title, lang)}
                    name={getLocalized(chartData.hse?.name, lang)}
                    className="w-[200px]"
                  />

                  {/* Center: Project & Site Operations */}
                  <div className="bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col items-center w-[480px] shadow-sm">
                    <h4 className="font-bold text-xs mb-2 text-center text-gray-900">
                      {getLocalized(chartData.operations?.title, lang)}
                    </h4>
                    <div className="flex flex-row justify-between w-full px-4">
                      {chartData.operations?.items?.map((op, opIdx) => (
                        <span key={opIdx} className="text-[11px] font-bold text-gray-700">
                          {getLocalized(op, lang)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Legend */}
                  <div className="flex flex-col gap-1.5 w-[200px] text-start bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <h4 className="font-bold text-[11px] mb-0.5 text-gray-900">{lang === 'en' ? 'LEGEND' : 'دليل المخطط'}</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-2.5 bg-black rounded-sm"></div>
                      <span className="text-[10px] text-gray-600 font-medium">{lang === 'en' ? 'Executive Leadership' : 'الإدارة العليا'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-2.5 bg-[#FFB800] rounded-sm"></div>
                      <span className="text-[10px] text-gray-600 font-medium">{lang === 'en' ? 'Department Heads' : 'رؤساء الإدارات'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-2.5 bg-white border border-gray-300 rounded-sm"></div>
                      <span className="text-[10px] text-gray-600 font-medium">{lang === 'en' ? 'Managers' : 'المدراء'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-2.5 bg-gray-100 border border-gray-200 rounded-sm"></div>
                      <span className="text-[10px] text-gray-600 font-medium">{lang === 'en' ? 'Teams / Staff' : 'الفرق التنفيذية'}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default OrganizationChart;

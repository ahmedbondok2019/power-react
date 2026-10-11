import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Briefcase,
  Wrench,
  Building2,
  TrendingUp,
  BookOpen,
  Users,
  Phone,
  UserCheck,
  Search,
  ExternalLink,
  FileCode,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Compass,
  Layers,
  Sparkles,
  ShieldCheck,
  Globe2,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const EASE = [0.22, 1, 0.36, 1];

const Sitemap = () => {
  const { t, lang, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sitemapData = useMemo(() => {
    const isAr = lang === 'ar';
    return [
      {
        id: 'overview',
        title: isAr ? 'الرئيسية والتعريف بالشركة' : 'Home & Company Overview',
        description: isAr
          ? 'نظرة عامة على الشركة، الرؤية، القيم، الهيكل التنظيمي والشهادات'
          : 'Corporate overview, vision, values, group structure, and ISO certifications',
        icon: Home,
        color: 'from-amber-500/20 to-yellow-600/10',
        badgeColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
        links: [
          { title: isAr ? 'الصفحة الرئيسية' : 'Homepage', path: '/', tag: isAr ? 'رئيسي' : 'Main' },
          { title: isAr ? 'من نحن ورؤيتنا' : 'About Us & Vision', path: '/about', tag: isAr ? 'تعريفي' : 'About' },
          { title: isAr ? 'قيمنا ورسالتنا' : 'Our Values & Mission', path: '/about#values', tag: isAr ? 'قسم' : 'Section' },
          { title: isAr ? 'القيادة ومجلس الإدارة' : 'Leadership & Board', path: '/about#leadership', tag: isAr ? 'قسم' : 'Section' },
          { title: isAr ? 'هيكل المجموعة التنظيمي' : 'Group Organization Chart', path: '/about#structure', tag: isAr ? 'قسم' : 'Section' },
          { title: isAr ? 'شهادات الجودة والاعتمادات ISO' : 'ISO Certifications & Accreditations', path: '/about#certificates', tag: isAr ? 'جودة' : 'ISO' },
          { title: isAr ? 'شركاء النجاح والأسطول' : 'Partners & Equipment Fleet', path: '/about#partners', tag: isAr ? 'شركاء' : 'Fleet' },
        ],
      },
      {
        id: 'services',
        title: isAr ? 'قطاعات الأعمال والخدمات' : 'Business Sectors & Services',
        description: isAr
          ? 'خدمات المقاولات المتكاملة، الأعمال الكهروميكانيكية، وتصنيع مجاري الهواء'
          : 'Integrated contracting, electromechanical works (MEP), and ductwork fabrication',
        icon: Wrench,
        color: 'from-blue-500/20 to-cyan-600/10',
        badgeColor: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
        links: [
          { title: isAr ? 'كافة الخدمات والقطاعات' : 'All Services & Sectors', path: '/services', tag: isAr ? 'رئيسي' : 'Main' },
          { title: isAr ? 'الأعمال الكهروميكانيكية (MEP)' : 'Electromechanical Works (MEP)', path: '/services#mep', tag: isAr ? 'تخصصي' : 'MEP' },
          { title: isAr ? 'المقاولات الإنشائية والمدنية' : 'General Contracting & Construction', path: '/services#construction', tag: isAr ? 'إنشاءات' : 'Civil' },
          { title: isAr ? 'تصنيع مجاري الهواء (Ductwork)' : 'Ductwork Fabrication (SMACNA)', path: '/services#duct', tag: isAr ? 'تصنيع' : 'Factory' },
          { title: isAr ? 'البنية التحتية ومعالجة المياه' : 'Infrastructure & Water Treatment', path: '/services#infrastructure', tag: isAr ? 'بنية تحتية' : 'Infra' },
          { title: isAr ? 'الصيانة الوقائية والتشغيل' : 'Operation & Maintenance (O&M)', path: '/services#maintenance', tag: isAr ? 'تشغيل' : 'O&M' },
        ],
      },
      {
        id: 'projects',
        title: isAr ? 'المشاريع والإنجازات' : 'Projects & Portfolio',
        description: isAr
          ? 'سجل حافل بالمشاريع الكبرى المنجزة وقيد التنفيذ في مختلف أنحاء المملكة'
          : 'Track record of mega completed and ongoing projects across the Kingdom',
        icon: Building2,
        color: 'from-emerald-500/20 to-teal-600/10',
        badgeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
        links: [
          { title: isAr ? 'معرض المشاريع الرئيسي' : 'Projects Showcase', path: '/projects', tag: isAr ? 'رئيسي' : 'Main' },
          { title: isAr ? 'المشاريع المنجزة' : 'Completed Projects', path: '/projects?filter=completed', tag: isAr ? 'منجز' : 'Done' },
          { title: isAr ? 'مشاريع قيد التنفيذ' : 'Ongoing Projects', path: '/projects?filter=ongoing', tag: isAr ? 'جاري' : 'Active' },
        ],
      },
      {
        id: 'strategy',
        title: isAr ? 'الاستراتيجية ورؤية 2030' : 'Strategy & Vision 2030',
        description: isAr
          ? 'محاور التوسع والنمو، الاستدامة البيئية، وتطبيق أعلى معايير السلامة'
          : 'Strategic growth pillars, environmental sustainability, and safety standards',
        icon: TrendingUp,
        color: 'from-purple-500/20 to-indigo-600/10',
        badgeColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
        links: [
          { title: isAr ? 'خطة النمو والاستراتيجية' : 'Strategic Growth Plan', path: '/strategy', tag: isAr ? 'رئيسي' : 'Main' },
          { title: isAr ? 'الاستدامة والمسؤولية البيئية' : 'Sustainability & Environment', path: '/strategy#sustainability', tag: isAr ? 'استدامة' : 'Eco' },
          { title: isAr ? 'معايير السلامة والصحة المهنية' : 'HSE & Safety Protocols', path: '/strategy#safety', tag: isAr ? 'سلامة' : 'HSE' },
          { title: isAr ? 'المواءمة مع رؤية المملكة 2030' : 'Alignment with Saudi Vision 2030', path: '/strategy#vision2030', tag: isAr ? 'رؤية 2030' : '2030' },
        ],
      },
      {
        id: 'blogs',
        title: isAr ? 'المركز الإعلامي والمدونة' : 'Media Center & Blog',
        description: isAr
          ? 'أحدث المقالات الفنية والأخبار الهندسية والمشاريع التنموية'
          : 'Latest technical articles, engineering insights, and development updates',
        icon: BookOpen,
        color: 'from-orange-500/20 to-red-600/10',
        badgeColor: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
        links: [
          { title: isAr ? 'فهرس المدونة والأخبار' : 'Blog & News Hub', path: '/blogs', tag: isAr ? 'رئيسي' : 'Main' },
          { title: isAr ? 'كود البناء السعودي ومعايير التكييف' : 'Saudi Building Code HVAC Standards', path: '/blogs/saudi-building-code-hvac-standards', tag: isAr ? 'مقال' : 'Article' },
          { title: isAr ? 'أفضل ممارسات أعمال MEP في المشاريع العملاقة' : 'MEP Works Best Practices in Mega Projects', path: '/blogs/mep-works-best-practices-mega-projects', tag: isAr ? 'مقال' : 'Article' },
          { title: isAr ? 'محطات معالجة المياه ومضخات الضغط العالي' : 'Water Treatment Plants & High Pressure Pumps', path: '/blogs/water-treatment-plants-and-high-pressure-pumps', tag: isAr ? 'مقال' : 'Article' },
          { title: isAr ? 'معايير تصنيع مجاري الهواء SMACNA' : 'Ductwork Fabrication Standards SMACNA', path: '/blogs/ductwork-fabrication-standards-smacna', tag: isAr ? 'مقال' : 'Article' },
          { title: isAr ? 'كفاءة الطاقة والتبريد المركزي' : 'Energy Efficiency & Central Cooling', path: '/blogs/energy-efficiency-central-chilled-water-cooling', tag: isAr ? 'مقال' : 'Article' },
          { title: isAr ? 'أنظمة مكافحة الحريق والربط مع BMS' : 'Fire Protection & BMS Integration', path: '/blogs/fire-protection-and-bms-integration', tag: isAr ? 'مقال' : 'Article' },
        ],
      },
      {
        id: 'careers',
        title: isAr ? 'الوظائف واستقطاب الكفاءات' : 'Careers & Opportunities',
        description: isAr
          ? 'الفرص الوظيفية المتاحة والانضمام لفريق عمل باور للتهيئة'
          : 'Open career opportunities and joining the Power Preparation team',
        icon: Briefcase,
        color: 'from-sky-500/20 to-blue-600/10',
        badgeColor: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
        links: [
          { title: isAr ? 'بوابة الوظائف الشاغرة' : 'Careers & Job Openings', path: '/careers', tag: isAr ? 'رئيسي' : 'Main' },
          { title: isAr ? 'التقديم وإرسال السيرة الذاتية' : 'Submit Job Application', path: '/careers#apply', tag: isAr ? 'تقديم' : 'Apply' },
        ],
      },
      {
        id: 'vendors',
        title: isAr ? 'بوابة الموردين والمقاولين' : 'Vendor & Supplier Portal',
        description: isAr
          ? 'تسجيل الموردين والمقاولين وتأهيل الشركاء لمشاريعنا'
          : 'Registration and pre-qualification for vendors and subcontractors',
        icon: Users,
        color: 'from-rose-500/20 to-pink-600/10',
        badgeColor: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
        links: [
          { title: isAr ? 'تسجيل مورد / مقاول باطن جديد' : 'New Vendor / Subcontractor Registration', path: '/join-as-vendor', tag: isAr ? 'تسجيل' : 'Register' },
          { title: isAr ? 'الاستعلام عن حالة التسجيل' : 'Check Application Status', path: '/join-as-vendor#status', tag: isAr ? 'متابعة' : 'Track' },
        ],
      },
      {
        id: 'contact',
        title: isAr ? 'التواصل والدعم الفني' : 'Contact & Support',
        description: isAr
          ? 'قنوات الاتصال المباشرة، مواقع الفروع، ونموذج إرسال الاستفسارات'
          : 'Direct communication channels, branch locations, and inquiry form',
        icon: Phone,
        color: 'from-emerald-500/20 to-green-600/10',
        badgeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
        links: [
          { title: isAr ? 'اتصل بنا ومواقع العمل' : 'Contact Us & Branch Locations', path: '/contact', tag: isAr ? 'رئيسي' : 'Main' },
          { title: isAr ? 'إرسال استفسار أو طلب عرض سعر' : 'Send Inquiry / Request Quote', path: '/contact#form', tag: isAr ? 'نموذج' : 'Form' },
        ],
      },
      {
        id: 'portal',
        title: isAr ? 'بوابة الحسابات والمستخدم' : 'User & Client Portal',
        description: isAr
          ? 'تسجيل الدخول، إنشاء حساب، وإدارة الملف الشخصي'
          : 'Sign in, account creation, and user profile management',
        icon: UserCheck,
        color: 'from-violet-500/20 to-purple-600/10',
        badgeColor: 'text-violet-400 border-violet-400/30 bg-violet-400/10',
        links: [
          { title: isAr ? 'تسجيل الدخول' : 'Sign In', path: '/auth/login', tag: isAr ? 'دخول' : 'Login' },
          { title: isAr ? 'إنشاء حساب جديد' : 'Create New Account', path: '/auth/signup', tag: isAr ? 'تسجيل' : 'Signup' },
          { title: isAr ? 'استعادة كلمة المرور' : 'Forgot Password', path: '/auth/forgot-password', tag: isAr ? 'أمان' : 'Security' },
          { title: isAr ? 'الملف الشخصي وإعدادات الحساب' : 'User Profile & Settings', path: '/profile', tag: isAr ? 'حسابي' : 'Profile' },
        ],
      },
    ];
  }, [lang]);

  // Compute total links
  const totalLinksCount = useMemo(() => {
    return sitemapData.reduce((acc, cat) => acc + cat.links.length, 0);
  }, [sitemapData]);

  // Filter links based on category and query
  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sitemapData
      .filter((cat) => (activeCategory === 'all' ? true : cat.id === activeCategory))
      .map((cat) => {
        if (!q) return cat;
        const matchingLinks = cat.links.filter(
          (l) => l.title.toLowerCase().includes(q) || l.path.toLowerCase().includes(q)
        );
        const matchesCategory =
          cat.title.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q);

        if (matchesCategory) return cat;
        if (matchingLinks.length > 0) return { ...cat, links: matchingLinks };
        return null;
      })
      .filter(Boolean);
  }, [sitemapData, activeCategory, searchQuery]);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#EAB308] selection:text-black pt-28 pb-20">
      {/* Background Decorative Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#EAB308]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -start-40 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/50">
          <Link to="/" className="hover:text-[#EAB308] transition-colors">
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-[#EAB308]">{lang === 'ar' ? 'خريطة الموقع' : 'Sitemap'}</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/30 text-[#EAB308] text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t?.sitemapPage?.heroBadge || (lang === 'ar' ? 'دليل الموقع الشامل' : 'Comprehensive Site Directory')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight"
          >
            {t?.sitemapPage?.heroTitle || (lang === 'ar' ? 'خريطة الموقع (Sitemap)' : 'Website Sitemap')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-white/60 text-sm sm:text-base leading-relaxed mb-8"
          >
            {t?.sitemapPage?.heroSubtitle ||
              (lang === 'ar'
                ? 'تصفح كافة صفحات وأقسام الموقع والخدمات والمشاريع والمقالات الهندسية بسهولة تامة وبضغطة واحدة.'
                : 'Easily navigate all pages, business sectors, services, projects, and engineering articles in one place.')}
          </motion.p>

          {/* Action Pills & XML Links */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EAB308] text-black font-semibold text-xs sm:text-sm hover:bg-[#FACC15] hover:shadow-lg hover:shadow-[#EAB308]/20 transition-all active:scale-95"
            >
              <FileCode className="w-4 h-4" />
              <span>{t?.sitemapPage?.downloadXml || 'sitemap.xml'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-xs sm:text-sm hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>robots.txt</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/50" />
            </a>
          </motion.div>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#181A18]/90 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EAB308]/10 border border-[#EAB308]/20 flex items-center justify-center text-[#EAB308]">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">+{totalLinksCount}</div>
              <div className="text-xs text-white/50">
                {t?.sitemapPage?.statsPages || (lang === 'ar' ? 'صفحة ورابط رئيسي' : 'Pages & Primary Links')}
              </div>
            </div>
          </div>

          <div className="bg-[#181A18]/90 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{sitemapData.length}</div>
              <div className="text-xs text-white/50">
                {t?.sitemapPage?.statsSections || (lang === 'ar' ? 'أقسام رئيسية' : 'Core Categories')}
              </div>
            </div>
          </div>

          <div className="bg-[#181A18]/90 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Google & Search Console</span>
              </div>
              <div className="text-xs text-emerald-400/90 font-medium">
                {t?.sitemapPage?.statsUpdated || (lang === 'ar' ? 'جاهز لمحركات البحث (SEO)' : 'SEO-Ready Standard')}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-[#181A18] border border-white/10 rounded-2xl p-4 sm:p-5 mb-10 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute start-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                t?.sitemapPage?.searchPlaceholder ||
                (lang === 'ar' ? 'ابحث في صفحات وأقسام الموقع...' : 'Search pages and sections...')
              }
              className="w-full bg-[#111312] border border-white/10 rounded-xl ps-12 pe-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute end-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white bg-white/10 px-2 py-0.5 rounded-md"
              >
                {lang === 'ar' ? 'مسح' : 'Clear'}
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#EAB308] text-black font-semibold shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {t?.sitemapPage?.allSections || (lang === 'ar' ? 'كافة الأقسام' : 'All Sections')}
            </button>
            {sitemapData.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white/20 text-[#EAB308] font-semibold border border-[#EAB308]/40'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories & Links Grid */}
        {filteredData.length === 0 ? (
          <div className="text-center py-16 bg-[#181A18] rounded-3xl border border-white/10 p-8">
            <Search className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">
              {t?.sitemapPage?.noResults || (lang === 'ar' ? 'لم يتم العثور على صفحات' : 'No pages found')}
            </h3>
            <p className="text-white/50 text-sm mb-4">
              {lang === 'ar'
                ? 'جرب البحث بكلمات أخرى أو تصفح كافة الأقسام.'
                : 'Try searching with different keywords or browse all sections.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-[#EAB308] text-black rounded-xl text-xs font-semibold"
            >
              {lang === 'ar' ? 'إعادة ضبط البحث' : 'Reset Search'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((category, catIndex) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: catIndex * 0.05, ease: EASE }}
                  className="bg-[#181A18] rounded-3xl border border-white/10 hover:border-[#EAB308]/30 transition-all duration-300 p-6 flex flex-col justify-between group hover:shadow-xl hover:shadow-black/50"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${category.color} border border-white/10 flex items-center justify-center text-[#EAB308] group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="font-bold text-base text-white group-hover:text-[#EAB308] transition-colors">
                            {category.title}
                          </h2>
                          <span className="text-[11px] text-white/40">
                            {category.links.length}{' '}
                            {lang === 'ar' ? 'صفحات وروابط' : 'links'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-white/50 mb-5 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>

                    {/* Links List */}
                    <ul className="space-y-2.5">
                      {category.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            to={link.path}
                            className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04] hover:border-[#EAB308]/30 transition-all duration-200 group/link"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]/60 group-hover/link:bg-[#EAB308] group-hover/link:scale-125 transition-all flex-shrink-0" />
                              <span className="text-xs font-medium text-white/80 group-hover/link:text-white truncate">
                                {link.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              {link.tag && (
                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/50 group-hover/link:text-[#EAB308] group-hover/link:bg-[#EAB308]/10 transition-colors">
                                  {link.tag}
                                </span>
                              )}
                              <ArrowIcon className="w-3.5 h-3.5 text-white/30 group-hover/link:text-[#EAB308] group-hover/link:translate-x-0.5 rtl:group-hover/link:-translate-x-0.5 transition-all" />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
                    <span>
                      {lang === 'ar' ? 'القسم:' : 'Section:'} {category.id}
                    </span>
                    <Link
                      to={category.links[0]?.path || '/'}
                      className="text-[#EAB308]/80 hover:text-[#EAB308] flex items-center gap-1 font-medium transition-colors"
                    >
                      <span>{lang === 'ar' ? 'زيارة القسم' : 'Visit Section'}</span>
                      <ArrowIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* SEO & Webmaster Information Box */}
        <div className="mt-16 bg-gradient-to-r from-[#181A18] via-[#1c1f1c] to-[#181A18] border border-[#EAB308]/20 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#EAB308] uppercase tracking-wider">
                <Globe2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تهيئة محركات البحث والأرشفة (Search Engine Optimization)' : 'Search Engine Optimization & Indexing'}</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'ar' ? 'جاهز للفهرسة في Google Search Console' : 'Ready for Google Search Console'}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                {lang === 'ar'
                  ? 'تم إنشاء ملف sitemap.xml وملف robots.txt وفق أحدث المعايير القياسية لمحركات البحث (Google وBing). يمكنك نسخ رابط الـ Sitemap وتقديمه مباشرة في لوحة تحكم مشرفي المواقع.'
                  : 'The sitemap.xml and robots.txt files have been generated following the latest search engine standards (Google & Bing). You can copy the XML URL and submit it directly to Google Search Console.'}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#EAB308] text-black font-semibold text-xs sm:text-sm text-center hover:bg-[#FACC15] transition-all flex items-center justify-center gap-2"
              >
                <FileCode className="w-4 h-4" />
                <span>{lang === 'ar' ? 'فتح ملف XML' : 'Open XML File'}</span>
              </a>

              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'ملف robots.txt' : 'robots.txt File'}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sitemap;

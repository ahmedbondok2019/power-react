import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, ArrowLeft, Building2, Briefcase, FileText, Globe, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { searchGlobal } from '../../api/searchApi';
import { useLanguage } from '../../contexts/LanguageContext';

const SUGGESTIONS_AR = [
  'مشاريعنا',
  'التكييف والتهوية',
  'المقاولات العامة',
  'هندسة القيمة',
  'الأبنية الخضراء',
  'الوظائف',
  'الاستدامة',
];

const SUGGESTIONS_EN = [
  'Our Projects',
  'HVAC & Ventilation',
  'General Contracting',
  'Value Engineering',
  'Green Buildings',
  'Careers',
  'Sustainability',
];

const SearchModal = ({ isOpen, onClose }) => {
  const { lang, isRTL } = useLanguage();
  const suggestions = lang === 'en' ? SUGGESTIONS_EN : SUGGESTIONS_AR;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ projects: [], services: [], blogs: [], pages: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults({ projects: [], services: [], blogs: [], pages: [] });
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Global ESC & shortcut handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced API Search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ projects: [], services: [], blogs: [], pages: [] });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchGlobal(query);
        setResults(res);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const totalResults =
    results.projects.length +
    results.services.length +
    results.blogs.length +
    results.pages.length;

  const handleSelectResult = (link) => {
    onClose();
    navigate(link);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasSearch = query.trim().length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl bg-[#181A19]/95 border border-white/20 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Header / Input Field */}
            <div className="relative flex items-center px-6 py-5 border-b border-white/10 gap-4">
              <Search className="w-6 h-6 text-[#EAB308] shrink-0" />
              
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'en' ? 'Search projects, services, blogs, or pages...' : 'ابحث عن مشاريع، خدمات، مقالات، أو أقسام الموقع...'}
                className="w-full bg-transparent text-white text-base sm:text-lg outline-none placeholder-white/40 font-medium text-start"
              />

              {isLoading && (
                <Loader2 className="w-5 h-5 text-[#EAB308] animate-spin shrink-0" />
              )}

              {query && !isLoading && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-white/50 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={onClose}
                className="px-2.5 py-1 text-xs font-bold text-white/60 bg-white/10 border border-white/10 rounded-lg hover:bg-white/20 hover:text-white transition-colors shrink-0"
              >
                ESC
              </button>
            </div>

            {/* Filter Tabs (when results available) */}
            {hasSearch && totalResults > 0 && (
              <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10 overflow-x-auto no-scrollbar text-xs sm:text-sm">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 font-medium ${
                    activeFilter === 'all'
                      ? 'bg-[#EAB308] text-black font-bold shadow-md'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'All' : 'الكل'} ({totalResults})
                </button>
                {results.projects.length > 0 && (
                  <button
                    onClick={() => setActiveFilter('projects')}
                    className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 font-medium ${
                      activeFilter === 'projects'
                        ? 'bg-[#EAB308] text-black font-bold shadow-md'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'Projects' : 'المشاريع'} ({results.projects.length})
                  </button>
                )}
                {results.services.length > 0 && (
                  <button
                    onClick={() => setActiveFilter('services')}
                    className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 font-medium ${
                      activeFilter === 'services'
                        ? 'bg-[#EAB308] text-black font-bold shadow-md'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'Services' : 'الخدمات'} ({results.services.length})
                  </button>
                )}
                {results.blogs.length > 0 && (
                  <button
                    onClick={() => setActiveFilter('blogs')}
                    className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 font-medium ${
                      activeFilter === 'blogs'
                        ? 'bg-[#EAB308] text-black font-bold shadow-md'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'Blog' : 'المدونة'} ({results.blogs.length})
                  </button>
                )}
                {results.pages.length > 0 && (
                  <button
                    onClick={() => setActiveFilter('pages')}
                    className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 font-medium ${
                      activeFilter === 'pages'
                        ? 'bg-[#EAB308] text-black font-bold shadow-md'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'Pages' : 'الصفحات'} ({results.pages.length})
                  </button>
                )}
              </div>
            )}

            {/* Results Body */}
            <div className="overflow-y-auto px-6 py-6 space-y-6 flex-1 max-h-[55vh]">
              {/* State 1: Initial Empty / Suggestions */}
              {!hasSearch && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#EAB308]" />
                    <span>{lang === 'en' ? 'Suggested Searches' : 'عمليات البحث المقترحة'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(s)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#EAB308]/15 border border-white/10 hover:border-[#EAB308]/40 text-white/80 hover:text-[#EAB308] text-sm transition-all duration-200"
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <span className="text-xs text-white/40 block mb-3 font-semibold">{lang === 'en' ? 'Quick Links' : 'وصول سريع للصفحات'}</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { title: lang === 'en' ? 'About Us' : 'من نحن', link: '/about' },
                        { title: lang === 'en' ? 'Services' : 'خدماتنا', link: '/services' },
                        { title: lang === 'en' ? 'Projects' : 'مشاريعنا', link: '/projects' },
                        { title: lang === 'en' ? 'Contact Us' : 'اتصل بنا', link: '/contact' },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectResult(item.link)}
                          className="p-3 text-start rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-medium transition-colors"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* State 2: No Results Found */}
              {hasSearch && !isLoading && totalResults === 0 && (
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center text-white/40">
                    <Search className="w-8 h-8" />
                  </div>
                  <h4 className="text-white font-bold text-lg">{lang === 'en' ? 'No results found' : 'لم يتم العثور على نتائج'}</h4>
                  <p className="text-white/50 text-sm max-w-md mx-auto">
                    {lang === 'en' ? `We couldn't find any results matching "${query}". Try searching with different keywords.` : `لم نتمكن من إيجاد نتائج مطابقة لكلمة "${query}". جرب البحث بكلمات أخرى أو تصفح الأقسام الرئيسية.`}
                  </p>
                </div>
              )}

              {/* State 3: Render Categorized Results */}
              {hasSearch && totalResults > 0 && (
                <div className="space-y-6">
                  {/* Projects */}
                  {(activeFilter === 'all' || activeFilter === 'projects') && results.projects.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#EAB308] text-xs font-bold uppercase tracking-wider">
                        <Building2 className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Projects' : 'المشاريع'} ({results.projects.length})</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {results.projects.map((proj, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectResult(proj.link)}
                            className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#EAB308]/40 cursor-pointer transition-all duration-200 group"
                          >
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                            />
                            <div className="flex-1 min-w-0 text-start">
                              <h5 className="text-white text-sm font-bold truncate group-hover:text-[#EAB308] transition-colors">
                                {proj.title}
                              </h5>
                              <span className="text-xs text-white/50 block truncate mt-0.5">
                                {proj.category}
                              </span>
                            </div>
                            <ArrowLeft className="w-4 h-4 text-white/30 group-hover:text-[#EAB308] rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 rtl:rotate-0 ltr:rotate-180 transition-all shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Services */}
                  {(activeFilter === 'all' || activeFilter === 'services') && results.services.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#EAB308] text-xs font-bold uppercase tracking-wider">
                        <Briefcase className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Services' : 'الخدمات'} ({results.services.length})</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {results.services.map((serv, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectResult(serv.link)}
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#EAB308]/40 cursor-pointer transition-all duration-200 group text-start"
                          >
                            <div className="flex-1 min-w-0 pr-1">
                              <h5 className="text-white text-sm font-bold group-hover:text-[#EAB308] transition-colors">
                                {serv.title}
                              </h5>
                              {serv.description && (
                                <p className="text-xs text-white/50 truncate mt-1">
                                  {serv.description}
                                </p>
                              )}
                            </div>
                            <ArrowLeft className="w-4 h-4 text-white/30 group-hover:text-[#EAB308] rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 rtl:rotate-0 ltr:rotate-180 transition-all shrink-0 rtl:ml-2 ltr:mr-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blogs */}
                  {(activeFilter === 'all' || activeFilter === 'blogs') && results.blogs.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#EAB308] text-xs font-bold uppercase tracking-wider">
                        <FileText className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Blog & Articles' : 'المدونة والمقالات'} ({results.blogs.length})</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {results.blogs.map((blog, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectResult(blog.link)}
                            className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#EAB308]/40 cursor-pointer transition-all duration-200 group"
                          >
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                            />
                            <div className="flex-1 min-w-0 text-start">
                              <h5 className="text-white text-sm font-bold truncate group-hover:text-[#EAB308] transition-colors">
                                {blog.title}
                              </h5>
                              <span className="text-xs text-[#EAB308]/80 block truncate mt-0.5">
                                {blog.category}
                              </span>
                            </div>
                            <ArrowLeft className="w-4 h-4 text-white/30 group-hover:text-[#EAB308] rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 rtl:rotate-0 ltr:rotate-180 transition-all shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pages */}
                  {(activeFilter === 'all' || activeFilter === 'pages') && results.pages.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#EAB308] text-xs font-bold uppercase tracking-wider">
                        <Globe className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Pages' : 'صفحات الموقع'} ({results.pages.length})</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {results.pages.map((pg, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectResult(pg.link)}
                            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#EAB308]/40 cursor-pointer transition-all duration-200 group text-start flex items-center justify-between"
                          >
                            <div>
                              <h5 className="text-white text-sm font-bold group-hover:text-[#EAB308] transition-colors">
                                {pg.title}
                              </h5>
                              <p className="text-xs text-white/50 truncate mt-0.5">
                                {pg.description}
                              </p>
                            </div>
                            <ArrowLeft className="w-4 h-4 text-white/30 group-hover:text-[#EAB308] rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 rtl:rotate-0 ltr:rotate-180 transition-all shrink-0 rtl:mr-2 ltr:ml-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer helper */}
            <div className="px-6 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
              <span>{lang === 'en' ? 'Click on any result to navigate directly' : 'انقر فوق أي نتيجة للانتقال إليها مباشرة'}</span>
              <div className="flex items-center gap-3">
                <span>{lang === 'en' ? 'Filter by categories' : 'تصفح باستخدام الفلاتر'}</span>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <span>{lang === 'en' ? 'ESC to close' : 'ESC للإغلاق'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;

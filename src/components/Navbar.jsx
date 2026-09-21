import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, User, Globe, Check, ChevronDown } from 'lucide-react';
import Logo from '../../public/logo.png';
import { useSettingsData } from '../hooks/useSettingsData';
import { useProfile } from '../hooks/useProfile';
import SearchModal from './ui/SearchModal';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const notificationsRef = useRef(null);
  const langMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { data: settingsData } = useSettingsData();
  const { data: profileResponse, isError } = useProfile();
  const logoUrl = settingsData?.data?.logo || Logo;
  const { lang, setLang, t } = useLanguage();

  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const isLoggedIn = !!token && !isError && !!profileResponse?.data;

  useEffect(() => {
    if (token && isError) {
      localStorage.removeItem('auth_token');
    }
  }, [token, isError]);

  useEffect(() => {
    setNotificationsOpen(false);
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };
    if (notificationsOpen || langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen, langMenuOpen]);

  const handleProfileClick = (e) => {
    if (e) e.preventDefault();
    const currentToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (currentToken && !isError) {
      navigate('/profile');
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isAboutPage = location.pathname.toLowerCase().includes('about');
  const isServicesPage = location.pathname.toLowerCase().includes('service') || location.pathname.includes('خدمات');
  const isProjectsPage = location.pathname.toLowerCase().includes('project');
  const isStrategyPage = location.pathname.toLowerCase().includes('strategy') || location.pathname.includes('استراتيجيتنا');
  const isContactPage = location.pathname.toLowerCase().includes('contact') || location.pathname.includes('اتصل');
  const isBlogsPage = location.pathname.toLowerCase().includes('blog') || location.pathname.includes('مقالات');
  const isCareersPage = location.pathname.toLowerCase().includes('career') || location.pathname.includes('job') || location.pathname.includes('وظائف');
  const isVendorPage = location.pathname.toLowerCase().includes('vendor') || location.pathname.toLowerCase().includes('supplier') || location.pathname.includes('مورد');

  const navItems = [
    { label: t.nav.home, to: '/', isRoute: true, active: location.pathname === '/' },
    { label: t.nav.about, to: '/about', isRoute: true, active: isAboutPage },
    { label: t.nav.services, to: '/services', isRoute: true, active: isServicesPage },
    { label: t.nav.projects, to: '/projects', isRoute: true, active: isProjectsPage },
    { label: t.nav.strategy, to: '/strategy', isRoute: true, active: isStrategyPage },
    { label: t.nav.blogs, to: '/blogs', isRoute: true, active: isBlogsPage },
    { label: t.nav.careers, to: '/careers', isRoute: true, active: isCareersPage },
    { label: t.nav.joinVendor, to: '/join-as-vendor', isRoute: true, active: isVendorPage },
    { label: t.nav.contact, to: '/contact', isRoute: true, active: isContactPage },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.77, 0, 0.175, 1] }}
        className="fixed w-full z-50 top-0 left-0 border-b border-white/20 bg-white/10 backdrop-blur-xl shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logoUrl} alt={settingsData?.data?.site_name || "Egypt Vision"} className="h-20 md:h-24 w-auto object-contain transition-all duration-300" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            {navItems.map((item) => {
              const isActive = !!item.active;
              return (
                <motion.div key={item.to} whileHover={{ scale: 1.05 }}>
                  <Link
                    to={item.to}
                    className={`font-medium text-sm xl:text-base transition-colors whitespace-nowrap cursor-pointer relative py-1 ${isActive ? 'text-[#EAB308] font-bold' : 'text-white/90 hover:text-[#EAB308]'}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#EAB308] rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Language Dropdown Menu */}
            <div className="relative" ref={langMenuRef}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setLangMenuOpen(prev => !prev)}
                aria-label="Language selection"
                aria-expanded={langMenuOpen}
                title={lang === 'ar' ? 'تغيير اللغة' : 'Change Language'}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer select-none border ${
                  langMenuOpen
                    ? 'bg-[#EAB308]/15 border-[#EAB308] text-[#EAB308] shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                    : 'bg-white/10 hover:bg-white/15 text-white border-white/15 hover:border-[#EAB308]/50'
                }`}
              >
                <Globe className="w-4 h-4 text-[#EAB308]" />
                <span className="tracking-wide font-bold">
                  {lang === 'ar' ? 'العربية' : 'English'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    langMenuOpen ? 'rotate-180 text-[#EAB308]' : 'text-white/60'
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto mt-2.5 w-52 bg-[#161817]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {/* Menu Header */}
                    <div className="px-2.5 py-1.5 mb-1.5 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-white/40">
                        <Globe className="w-3.5 h-3.5 text-[#EAB308]" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider">
                          {t.nav.selectLanguage || (lang === 'ar' ? 'اختر اللغة' : 'Select Language')}
                        </span>
                      </div>
                      <span className="text-[10px] bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 px-1.5 py-0.5 rounded font-bold uppercase">
                        {lang}
                      </span>
                    </div>

                    {/* Language Options */}
                    <div className="space-y-1">
                      {/* Arabic */}
                      <button
                        type="button"
                        onClick={() => {
                          setLang('ar');
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          lang === 'ar'
                            ? 'bg-[#EAB308]/15 text-[#EAB308] border border-[#EAB308]/30 shadow-inner'
                            : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">🇸🇦</span>
                          <div className="flex flex-col text-start">
                            <span className="font-bold text-xs leading-tight">{t.nav.arabic || 'العربية'}</span>
                            <span className="text-[10px] text-white/40 leading-tight">Arabic</span>
                          </div>
                        </div>
                        {lang === 'ar' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                          >
                            <Check className="w-4 h-4 text-[#EAB308]" />
                          </motion.div>
                        )}
                      </button>

                      {/* English */}
                      <button
                        type="button"
                        onClick={() => {
                          setLang('en');
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          lang === 'en'
                            ? 'bg-[#EAB308]/15 text-[#EAB308] border border-[#EAB308]/30 shadow-inner'
                            : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">🇬🇧</span>
                          <div className="flex flex-col text-start">
                            <span className="font-bold text-xs leading-tight">{t.nav.english || 'English'}</span>
                            <span className="text-[10px] text-white/40 leading-tight">
                              {lang === 'ar' ? 'الإنجليزية' : 'English'}
                            </span>
                          </div>
                        </div>
                        {lang === 'en' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                          >
                            <Check className="w-4 h-4 text-[#EAB308]" />
                          </motion.div>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              title={`${t.nav.search} (Ctrl + K)`}
              className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-primary hover:text-background transition-colors duration-300 text-white cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen(prev => !prev)}
                aria-label="Notifications"
                className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer ${notificationsOpen ? 'bg-primary text-background' : 'bg-white/10 hover:bg-primary hover:text-background text-white'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-3 w-80 sm:w-96 bg-[#161817]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-primary" />
                        <h4 className="text-sm font-bold text-white">{t.nav.notifications}</h4>
                      </div>
                      <span className="text-[11px] font-medium bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                        0 {t.nav.notificationsNew}
                      </span>
                    </div>
                    <div className="p-8 text-center flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-3 shadow-inner">
                        <Bell className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <p className="text-sm font-semibold text-white/80 mb-1">{t.nav.noNotifications}</p>
                      <p className="text-xs text-white/40 leading-relaxed max-w-[220px]">{t.nav.noNotificationsDesc}</p>
                    </div>
                    <div className="p-3 bg-white/[0.02] border-t border-white/5 text-center">
                      <button
                        type="button"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs text-white/50 hover:text-primary transition-colors font-medium cursor-pointer"
                      >
                        {t.nav.closeMenu}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={handleProfileClick}
              aria-label="Profile"
              title={isLoggedIn ? t.nav.profile : t.nav.login}
              className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-primary hover:text-background transition-colors duration-300 text-white cursor-pointer relative"
            >
              <User className="w-5 h-5" />
              {isLoggedIn && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border border-surface"></span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#141615] border-b border-white/10 px-6 py-6"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${lang === 'ar' ? 'text-right' : 'text-left'} py-2 text-base font-medium transition-colors ${item.active ? 'text-[#EAB308] font-bold' : 'text-white/80 hover:text-[#EAB308]'}`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Language Selector in Mobile Menu */}
                <div className="border-t border-white/10 pt-4 mt-2">
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
                      <Globe className="w-3.5 h-3.5 text-[#EAB308]" />
                      <span>{t.nav.selectLanguage || (lang === 'ar' ? 'اختر اللغة' : 'Select Language')}</span>
                    </div>
                    <span className="text-[10px] bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 px-2 py-0.5 rounded-full font-bold uppercase">
                      {lang.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLang('ar');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                        lang === 'ar'
                          ? 'bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#EAB308] shadow-sm font-bold'
                          : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">🇸🇦</span>
                        <div className="text-start">
                          <div className="text-xs leading-tight">{t.nav.arabic || 'العربية'}</div>
                          <div className="text-[10px] text-white/40 leading-tight">Arabic</div>
                        </div>
                      </div>
                      {lang === 'ar' && <Check className="w-4 h-4 text-[#EAB308]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLang('en');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                        lang === 'en'
                          ? 'bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#EAB308] shadow-sm font-bold'
                          : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">🇬🇧</span>
                        <div className="text-start">
                          <div className="text-xs leading-tight">{t.nav.english || 'English'}</div>
                          <div className="text-[10px] text-white/40 leading-tight">{lang === 'ar' ? 'الإنجليزية' : 'English'}</div>
                        </div>
                      </div>
                      {lang === 'en' && <Check className="w-4 h-4 text-[#EAB308]" />}
                    </button>
                  </div>
                </div>

                {/* Profile link */}
                <button
                  type="button"
                  onClick={(e) => { setMobileMenuOpen(false); handleProfileClick(e); }}
                  className={`${lang === 'ar' ? 'text-right' : 'text-left'} py-2.5 text-base font-medium transition-colors text-white/80 hover:text-[#EAB308] flex items-center gap-2 border-t border-white/10 mt-2 pt-3 cursor-pointer`}
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>{isLoggedIn ? t.nav.profile : t.nav.login}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;

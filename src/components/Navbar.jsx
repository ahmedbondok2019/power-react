import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import Logo from '../../public/logo.png';
import { useSettingsData } from '../hooks/useSettingsData';
import { useProfile } from '../hooks/useProfile';
import SearchModal from './ui/SearchModal';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { data: settingsData } = useSettingsData();
  const { data: profileResponse, isError } = useProfile();
  const logoUrl = settingsData?.data?.logo || Logo;

  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const isLoggedIn = !!token && !isError && !!profileResponse?.data;

  // Clear stale token if profile query fails with error
  useEffect(() => {
    if (token && isError) {
      localStorage.removeItem('auth_token');
    }
  }, [token, isError]);

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

  // Keyboard shortcut: Ctrl+K or Cmd+K to trigger search
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

  const navItems = [
    { label: 'الرئيسية', to: '/', isRoute: true, active: location.pathname === '/' },
    { label: 'من نحن', to: '/about', isRoute: true, active: isAboutPage },
    { label: 'خدماتنا', to: '/services', isRoute: true, active: isServicesPage },
    { label: 'مشاريعنا', to: '/projects', isRoute: true, active: isProjectsPage },
    { label: 'استراتيجياتنا', to: '/strategy', isRoute: true, active: isStrategyPage },
    { label: 'المدونة', to: '/blogs', isRoute: true, active: isBlogsPage },
    { label: 'الوظائف', to: '/careers', isRoute: true, active: isCareersPage },
    { label: 'اتصل بنا', to: '/contact', isRoute: true, active: isContactPage },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.77, 0, 0.175, 1] }}
        className="fixed w-full z-50 top-0 left-0 border-b border-white/20 bg-white/10 backdrop-blur-xl shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2 ">

          {/* Logo (First in DOM = Right side in RTL) */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logoUrl} alt={settingsData?.data?.site_name || "Egypt Vision"} className="h-10 md:h-12 w-auto object-contain" />
          </Link>

          {/* Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-7">
            {navItems.map((item) => {
              const isActive = !!item.active;

              return (
                <motion.div key={item.label} whileHover={{ scale: 1.05 }}>
                  <Link
                    to={item.to}
                    className={`font-medium text-sm xl:text-base transition-colors whitespace-nowrap cursor-pointer relative py-1 ${isActive
                      ? 'text-[#EAB308] font-bold'
                      : 'text-white/90 hover:text-[#EAB308]'
                      }`}
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

          {/* Actions (Last in DOM = Left side in RTL) */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              title="بحث (Ctrl + K)"
              className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-primary hover:text-background transition-colors duration-300 text-white cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              aria-label="Notifications"
              className="relative w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-primary hover:text-background transition-colors duration-300 text-white"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border border-surface"></span>
            </button>

            <button
              type="button"
              onClick={handleProfileClick}
              aria-label="Profile"
              title={isLoggedIn ? "بيانات المستخدم" : "تسجيل الدخول"}
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

        {/* Mobile Menu Dropdown */}
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
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-right py-2 text-base font-medium transition-colors ${item.active
                      ? 'text-[#EAB308] font-bold'
                      : 'text-white/80 hover:text-[#EAB308]'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Profile / Auth link in mobile menu */}
                <button
                  type="button"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleProfileClick(e);
                  }}
                  className="text-right py-2.5 text-base font-medium transition-colors text-white/80 hover:text-[#EAB308] flex items-center gap-2 border-t border-white/10 mt-2 pt-3 cursor-pointer"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>{isLoggedIn ? 'بيانات المستخدم' : 'تسجيل الدخول'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Global Live Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;

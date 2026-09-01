import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import Logo from './ui/Logo';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAboutPage = location.pathname.toLowerCase().includes('about');
  const isProjectsPage = location.pathname.toLowerCase().includes('project');
  const isStrategyPage = location.pathname.toLowerCase().includes('strategy') || location.pathname.includes('استراتيجيتنا');

  const navItems = [
    { label: 'الرئيسية', to: '/', hash: '#الرئيسية' },
    { label: 'من نحن', to: '/about', isRoute: true, active: isAboutPage },
    { label: 'خدماتنا', to: '/#خدماتنا', hash: '#خدماتنا' },
    { label: 'هيكل المجموعة', to: '/#هيكل-المجموعة', hash: '#هيكل-المجموعة' },
    { label: 'مشاريعنا', to: '/projects', isRoute: true, active: isProjectsPage },
    { label: 'مالية', to: '/#مالية', hash: '#مالية' },
    { label: 'استراتيجياتنا', to: '/strategy', isRoute: true, active: isStrategyPage },
    { label: 'وظائف', to: '/#وظائف', hash: '#وظائف' },
    { label: 'اتصل بنا', to: '/#اتصل-بنا', hash: '#اتصل-بنا' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.77, 0, 0.175, 1] }}
      className="fixed w-full z-50 top-0 left-0 border-b border-white/10 bg-[#111312]/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 lg:py-6">
        
        {/* Logo (First in DOM = Right side in RTL) */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo />
        </Link>

        {/* Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-7">
          {navItems.map((item) => {
            const isActive = !!item.active;

            return (
              <motion.div key={item.label} whileHover={{ scale: 1.05 }}>
                <Link
                  to={item.to}
                  className={`font-medium text-sm xl:text-base transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                    isActive 
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
            aria-label="Search"
            className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-primary hover:text-background transition-colors duration-300 text-white"
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
            aria-label="Profile"
            className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-primary hover:text-background transition-colors duration-300 text-white"
          >
            <User className="w-5 h-5" />
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
                  className={`text-right py-2 text-base font-medium transition-colors ${
                    item.active
                      ? 'text-[#EAB308] font-bold'
                      : 'text-white/80 hover:text-[#EAB308]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

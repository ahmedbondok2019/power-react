import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Building2,
  PhoneCall,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceDetailsModal = ({ service, modalSettings, isOpen, onClose }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!service) return null;

  const title = service.title || service.arabic || '';
  const subtitle = service.titleEn || service.category || '';
  const description = service.description || service.short_description || '';
  const capabilities = service.capabilities || [];

  const standards = modalSettings?.standards || [
    { icon: 'ShieldCheck', title: 'معايير الجودة', description: 'مطابقة لأكواد البناء الدولية' },
    { icon: 'Clock', title: 'الالتزام الزمني', description: 'إدارة مشاريع دقيقة وسلسة' },
    { icon: 'Zap', title: 'حلول كهروميكانيكية', description: 'كفاءة تشغيلية واستهلاك طاقة مثالي' }
  ];

  const cta = modalSettings?.cta || {
    text: `هل لديك مشروع يتطلب تنفيذ أعمال ${title}؟`,
    button_text: 'طلب استشارة أو عرض سعر',
    button_link: '/contact'
  };

  const getStandardIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Clock': return Clock;
      case 'Zap': return Zap;
      default: return ShieldCheck;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 select-none"
          dir="rtl"
          data-lenis-prevent="true"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[88vh] bg-[#171918] border border-white/15 rounded-3xl sm:rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white z-10 flex flex-col overflow-hidden"
          >
            {/* Close Button Floating */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 left-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-[#FFB800] text-white hover:text-black border border-white/20 transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Scrollable Modal Content */}
            <div
              ref={scrollContainerRef}
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto overscroll-contain custom-modal-scroll"
            >
              {/* Image Hero */}
              <div className="relative h-64 sm:h-76 w-full overflow-hidden shrink-0">
                <img
                  src={service.image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171918] via-[#171918]/55 to-black/30" />

                {/* Badges Over Image */}
                <div className="absolute bottom-5 right-6 left-6 flex flex-wrap items-center justify-between gap-3 text-right">
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FFB800] text-black font-extrabold text-xs shadow-md">
                      {service.category || service.category_obj?.name || 'قطاع هندسي متخصص'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white drop-shadow-md leading-snug">
                      {title}
                    </h2>
                  </div>
                  {subtitle && (
                    <span className="text-xs sm:text-sm font-mono text-white/80 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      {subtitle.replace('\n', ' ')}
                    </span>
                  )}
                </div>
              </div>

              {/* Main Modal Body */}
              <div className="p-6 sm:p-8 space-y-7 text-right">

                {/* Executive Overview */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-[#FFB800]" />
                  <h3 className="text-base sm:text-lg font-bold text-[#FFB800] mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FFB800]" />
                    <span>{modalSettings?.overview_title || 'نطاق الخدمة والحلول المتكاملة'}</span>
                  </h3>
                  <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Key Execution Phases / Capabilities */}
                {capabilities.length > 0 && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-white/90 uppercase tracking-wider mb-3.5 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#FFB800]" />
                      <span>{modalSettings?.capabilities_title || 'أبرز القدرات والمزايا الهندسية:'}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {capabilities.map((cap, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FFB800]/40 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0 mt-1" />
                          <span className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed">
                            {cap}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Standards and Compliance */}
                {standards.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {standards.map((std, idx) => {
                      const IconComp = getStandardIcon(std.icon);
                      return (
                        <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center space-y-1">
                          <IconComp className="w-5 h-5 text-[#FFB800] mx-auto mb-1" />
                          <span className="block text-xs font-bold text-white">{std.title}</span>
                          <span className="block text-[11px] text-white/60">{std.description}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-white/60 text-right">
                    <span>{cta.text || `هل لديك مشروع يتطلب تنفيذ أعمال ${title}؟`}</span>
                  </div>

                  <Link
                    to={cta.button_link || '/contact'}
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#EAB308] text-black font-extrabold text-sm shadow-lg shadow-[#FFB800]/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{cta.button_text || 'طلب استشارة أو عرض سعر'}</span>
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailsModal;

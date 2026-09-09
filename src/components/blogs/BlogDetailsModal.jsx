import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Tag,
  Share2,
  Check,
  BookOpen,
  Sparkles,
} from 'lucide-react';

const BlogDetailsModal = ({ blog, isOpen, onClose }) => {
  const scrollContainerRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Lock body scroll and handle Escape key
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

  const handleShare = () => {
    if (navigator.clipboard) {
      const shareUrl = `${window.location.origin}/blogs#${blog?.slug || ''}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!blog) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 select-text"
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#141614] border border-white/15 rounded-[28px] shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-10"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 left-5 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-[#FFB800] text-white hover:text-black border border-white/20 hover:border-[#FFB800] flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content Area */}
            <div
              ref={scrollContainerRef}
              className="overflow-y-auto overflow-x-hidden flex-1 p-6 sm:p-8 md:p-10 space-y-8 custom-scrollbar"
              data-lenis-prevent="true"
            >
              {/* Header Image with Overlay */}
              <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden shadow-xl border border-white/10">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141614] via-black/30 to-transparent" />

                {/* Top Category Tag */}
                <div className="absolute bottom-6 right-6 z-10">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFB800] text-black text-xs font-bold shadow-lg">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{blog.category || blog.category_obj?.name}</span>
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="text-right space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-white/50 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 font-mono">
                    <Calendar className="w-4 h-4 text-[#FFB800]" />
                    <span>{blog.created_at || '2026-09-08'}</span>
                  </div>

                  {/* Share button */}
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400">تم نسخ الرابط!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#FFB800]" />
                        <span>مشاركة المقال</span>
                      </>
                    )}
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  {blog.title}
                </h2>
              </div>

              {/* Short description callout */}
              {blog.short_description && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#1D201D] border-r-4 border-[#FFB800] text-right">
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed font-medium">
                    {blog.short_description}
                  </p>
                </div>
              )}

              {/* Rich Body Content (Rendered from HTML) */}
              <div className="text-right pt-2">
                <div
                  className="blog-modal-content text-white/80 text-sm sm:text-base leading-loose space-y-4
                    [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:border-r-2 [&>h3]:border-[#FFB800] [&>h3]:pr-3
                    [&>h4]:text-lg sm:[&>h4]:text-xl [&>h4]:font-bold [&>h4]:text-[#FFB800] [&>h4]:mt-5 [&>h4]:mb-2
                    [&>p]:text-white/80 [&>p]:leading-relaxed [&>p]:mb-4
                    [&>ul]:list-disc [&>ul]:pr-6 [&>ul]:space-y-2.5 [&>ul]:mb-6
                    [&>ul>li]:text-white/80 [&>ul>li]:leading-relaxed
                    [&_strong]:text-white [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />
              </div>

              {/* Footer Close Action */}
              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-8 py-2.5 rounded-full bg-white/10 hover:bg-[#FFB800] text-white hover:text-black font-bold text-sm transition-all duration-300 cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BlogDetailsModal;

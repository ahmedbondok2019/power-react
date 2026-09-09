import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlogDetails, useBlogs } from '../hooks/useBlogs';
import {
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  Tag,
  Check,
  ChevronLeft,
  BookOpen,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const BlogDetails = () => {
  const { slug } = useParams();
  const { data: blog, isLoading, isError } = useBlogDetails(slug);
  const { data: allBlogs = [] } = useBlogs();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Related articles (excluding current one)
  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111312] text-white pt-32 pb-24 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-[#FFB800] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen bg-[#111312] text-white pt-40 pb-24 text-center px-6" dir="rtl">
        <div className="max-w-md mx-auto bg-[#181A18] p-8 rounded-3xl border border-white/10">
          <BookOpen className="w-12 h-12 text-[#FFB800] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">المقال غير متوفر</h2>
          <p className="text-white/60 text-sm mb-6">
            عذراً، لم نتمكن من العثور على المقال المطلوب أو ربما تم نقله.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFB800] text-black font-bold text-sm hover:scale-105 transition-transform"
          >
            <span>العودة لجميع المقالات</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#FFB800] selection:text-black" dir="rtl">
      {/* ── Article Hero / Banner ── */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-black/80 via-[#111312] to-[#111312]">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-right">
          {/* Breadcrumb / Back Link */}
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#FFB800] text-sm mb-8 transition-colors group font-medium"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span>العودة إلى المدونة</span>
          </Link>

          {/* Category Pill */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-[#FFB800]/15 border border-[#FFB800]/30 text-[#FFB800] text-xs font-bold">
              {blog.category || blog.category_obj?.name}
            </span>
          </div>

          {/* Article Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
          >
            {blog.title}
          </motion.h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/60">
            <div className="flex items-center gap-6 font-mono">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FFB800]" />
                <span>{blog.created_at || '2026-09-08'}</span>
              </span>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
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
        </div>
      </section>

      {/* ── Featured Image ── */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="relative h-72 sm:h-96 md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ── Article Body Content ── */}
      <article className="max-w-4xl mx-auto px-6 pb-24 text-right">
        {/* Short description lead */}
        {blog.short_description && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#181A18] border-r-4 border-[#FFB800] mb-12 shadow-md">
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium">
              {blog.short_description}
            </p>
          </div>
        )}

        {/* Rich Content Rendered from HTML */}
        <div
          className="blog-content prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h4:text-xl prose-h4:text-[#FFB800] prose-h4:mt-6 prose-p:text-white/80 prose-p:leading-loose prose-p:text-base prose-li:text-white/80 prose-li:leading-relaxed prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </article>

      {/* ── Related Articles ── */}
      {relatedBlogs.length > 0 && (
        <section className="bg-[#0B0C0B] py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-right">
            <div className="mb-10">
              <span className="text-[#FFB800] text-xs font-bold tracking-wider">مقالات ذات صلة</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">تابع القراءة</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.id}
                  to={`/blogs/${item.slug}`}
                  className="group block bg-[#141514] rounded-2xl overflow-hidden border border-white/10 hover:border-[#FFB800]/50 transition-all duration-300 shadow-md hover:-translate-y-1.5"
                >
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 text-right space-y-2">
                    <span className="text-[11px] text-[#FFB800] font-semibold">
                      {item.category || item.category_obj?.name}
                    </span>
                    <h4 className="text-white font-bold text-base line-clamp-2 group-hover:text-[#FFB800] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;

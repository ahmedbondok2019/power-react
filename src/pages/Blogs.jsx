import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import BlogDetailsModal from '../components/blogs/BlogDetailsModal';
import { useBlogsPageData } from '../hooks/useBlogs';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Search,
  Calendar,
  BookOpen,
  Tag,
  Sparkles,
  ArrowLeft,
  ChevronLeft,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

const Blogs = () => {
  const { data: pageData, isLoading, isError, refetch } = useBlogsPageData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { t, lang } = useLanguage();
  const allCategoryLabel = lang === 'ar' ? 'الكل' : 'All';

  // Hero section data from API with fallbacks
  const heroData = pageData?.hero_section || pageData?.data?.hero_section || {};
  const articlesSection = pageData?.articles_section || pageData?.data?.articles_section || {};
  const headerData = articlesSection.header || {};
  const rawItems = articlesSection.items || pageData?.data || [];
  const modalSettings = pageData?.modal_settings || pageData?.data?.modal_settings || {};

  // Extract categories (either from API categories array or extracted from items)
  const categories = useMemo(() => {
    if (articlesSection.categories && articlesSection.categories.length > 0) {
      return articlesSection.categories;
    }
    const cats = new Set();
    rawItems.forEach((b) => {
      const cat = b.category || b.category_obj?.name;
      if (cat) cats.add(cat);
    });
    return ['الكل', ...Array.from(cats)];
  }, [articlesSection.categories, rawItems]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return (rawItems || []).filter((blog) => {
      const matchesCategory =
        selectedCategory === 'الكل' ||
        blog.category === selectedCategory ||
        blog.category_obj?.name === selectedCategory;

      const matchesSearch =
        !searchQuery.trim() ||
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [rawItems, selectedCategory, searchQuery]);

  // Featured Article
  const featuredBlog = useMemo(() => {
    return (
      articlesSection.featured_article ||
      rawItems.find((b) => b.is_featured) ||
      rawItems[0]
    );
  }, [articlesSection.featured_article, rawItems]);

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#FFB800] selection:text-black">
      {/* ── Page Hero ── */}
      <Hero
        id="blogs-hero"
        badge={heroData.badge || t.blogs.heroBadge}
        title={heroData.title || t.blogs.heroTitle}
        subtitle={heroData.subtitle || t.blogs.heroSubtitle}
        buttonText={heroData.button_text || t.blogs.allPosts}
        buttonLink={heroData.button_link || "#articles-section"}
        bgImage={heroData.image || "/projects-hero-bg.jpg"}
        showVisionLogo={false}
        showStatsCards={true}
        stats={heroData.stats && heroData.stats.length > 0 ? heroData.stats : [
          { number: rawItems.length || 6, label: lang === 'ar' ? 'مقالات منشورة' : 'Published Articles' },
          { number: categories.length > 1 ? categories.length - 1 : 5, label: lang === 'ar' ? 'مجالات تخصصية' : 'Specialized Fields' },
          { number: 100, label: lang === 'ar' ? 'معايير هندسية معتمدة' : 'Certified Engineering Standards' },
        ]}
      />

      {/* ── Main Content Area ── */}
      <section
        id="articles-section"
        className="relative pt-56 sm:pt-64 pb-28 overflow-hidden"
      >
        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#FFB800]/5 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-[#2A352F]/30 rounded-full blur-[170px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header & Section Title */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="text-start">
              <div className="flex items-center gap-2 justify-start mb-2 text-[#FFB800] text-sm font-bold tracking-wider">
                <span className="w-8 h-[2px] bg-[#FFB800] rounded-full inline-block" />
                <span>{headerData.badge || (lang === 'ar' ? "مركز المعرفة الهندسية" : "Engineering Knowledge Hub")}</span>
              </div>
              <SectionTitle title={headerData.title || (lang === 'ar' ? "المقالات والدراسات" : "Articles & Studies")} theme="dark" />
              {headerData.subtitle && (
                <p className="text-white/70 text-sm md:text-base mt-2 max-w-2xl">
                  {headerData.subtitle}
                </p>
              )}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder={headerData.search_placeholder || "ابحث في المقالات..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1C1E1C] border border-white/10 rounded-full py-3.5 pr-12 pl-4 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#FFB800] transition-colors shadow-inner"
              />
              <Search className="w-5 h-5 text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#FFB800] text-black shadow-[0_0_20px_rgba(255,184,0,0.35)] scale-105'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* ── Featured Main Article (Full-image card banner) ── */}
          {!searchQuery && selectedCategory === 'الكل' && featuredBlog && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mb-16"
            >
              <div
                onClick={() => setSelectedBlog(featuredBlog)}
                className="group relative block w-full h-[460px] sm:h-[520px] rounded-[28px] overflow-hidden border border-white/15 hover:border-[#FFB800]/60 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-500 cursor-pointer"
              >
                {/* Full Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                  />
                </div>

                {/* Rich Multi-stop Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-black/35 group-hover:via-black/50 transition-colors duration-500" />

                {/* Top Badge & Date */}
                <div className="relative z-20 p-6 sm:p-8 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFB800] text-black text-xs font-extrabold shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>مقال مميز</span>
                  </span>

                  <div className="flex items-center gap-2 text-white/80 text-xs font-mono bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span>{featuredBlog.created_at || '2026-09-10'}</span>
                  </div>
                </div>

                {/* Bottom Details Overlaid on Image */}
                <div className="absolute bottom-0 inset-x-0 z-20 p-6 sm:p-10 lg:p-12 text-start space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#FFB800] text-xs font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{featuredBlog.category || featuredBlog.category_obj?.name}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-[#FFB800] transition-colors leading-snug drop-shadow-md max-w-4xl">
                    {featuredBlog.title}
                  </h3>

                  <p className="text-white/85 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-3xl drop-shadow-sm font-normal">
                    {featuredBlog.short_description}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#ffe066] text-black font-extrabold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-xl group-hover:shadow-[0_0_25px_rgba(255,184,0,0.5)] cursor-pointer"
                    >
                      <span>{lang === 'ar' ? 'عرض تفاصيل المقال' : 'View Article Details'}</span>
                      <ArrowLeft className="w-4 h-4 rtl:group-hover:-translate-x-1.5 ltr:group-hover:translate-x-1.5 rtl:rotate-0 ltr:rotate-180 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Loading Skeleton State ── */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-[480px] bg-[#181A18] rounded-[24px] border border-white/5 animate-pulse p-6 flex flex-col justify-between"
                >
                  <div className="flex justify-between">
                    <div className="h-6 bg-white/10 rounded-full w-24" />
                    <div className="h-6 bg-white/10 rounded-full w-24" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-7 bg-white/15 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-full" />
                    <div className="h-4 bg-white/10 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Error State ── */}
          {isError && (
            <div className="text-center py-20 bg-[#181A18] rounded-3xl border border-red-500/20 max-w-xl mx-auto p-8">
              <p className="text-white/80 text-lg mb-4">{lang === 'ar' ? 'تعذر تحميل المقالات حالياً' : 'Failed to load articles at this moment'}</p>
              <button
                onClick={() => refetch()}
                className="px-6 py-2.5 rounded-full bg-[#FFB800] text-black font-bold text-sm hover:scale-105 transition-transform cursor-pointer"
              >
                {lang === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
              </button>
            </div>
          )}

          {/* ── Empty State ── */}
          {!isLoading && !isError && filteredBlogs.length === 0 && (
            <div className="text-center py-24 bg-[#181A18]/50 rounded-3xl border border-white/5 max-w-xl mx-auto p-8">
              <BookOpen className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">
                {headerData.empty_state?.title || (lang === 'ar' ? "لا توجد مقالات مطابقة" : "No Matching Articles")}
              </h4>
              <p className="text-white/60 text-sm">
                {headerData.empty_state?.subtitle || (lang === 'ar' ? "لم يتم العثور على أي مقالات تطابق بحثك. جرّب كلمات دلالية أخرى أو اختر تصنيفاً آخر." : "No articles match your search. Try different keywords or select another category.")}
              </p>
            </div>
          )}

          {/* ── Articles Grid: Full Image Overlay Cards ── */}
          {!isLoading && !isError && filteredBlogs.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
            >
              {filteredBlogs.map((blog, idx) => (
                <motion.article
                  key={blog.id || idx}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.35, ease: 'easeOut' } }}
                  onClick={() => setSelectedBlog(blog)}
                  className="w-full max-w-[420px] h-[480px] sm:h-[520px] rounded-[24px] overflow-hidden relative shadow-2xl border border-white/10 hover:border-[#FFB800]/60 group cursor-pointer flex flex-col justify-between"
                >
                  {/* Background Full Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Multi-stop Overlay Gradient for Perfect Contrast */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/60 to-black/35 group-hover:from-black group-hover:via-black/50 group-hover:to-black/25 transition-all duration-500" />

                  {/* Top Bar: Category Badge & Date */}
                  <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between w-full">
                    <span className="px-3.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[#FFB800] text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <Tag className="w-3 h-3" />
                      <span>{blog.category || blog.category_obj?.name}</span>
                    </span>

                    <div className="flex items-center gap-1.5 text-white/80 text-[11px] font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-sm">
                      <Calendar className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{blog.created_at || '2026-09-10'}</span>
                    </div>
                  </div>

                  {/* Bottom Details Overlaid on the Image */}
                  <div className="relative z-20 p-6 sm:p-7 text-start space-y-3">
                    <h3 className="text-white font-extrabold text-lg sm:text-xl leading-snug group-hover:text-[#FFB800] transition-colors line-clamp-2 drop-shadow-md">
                      {blog.title}
                    </h3>

                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal drop-shadow-sm">
                      {blog.short_description}
                    </p>

                    {/* Bottom Action Button */}
                    <div className="pt-3 flex items-center justify-between border-t border-white/15">
                      <span className="text-xs text-[#FFB800] font-bold group-hover:underline">
                        {lang === 'ar' ? 'عرض تفاصيل المقال' : 'View Article Details'}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#FFB800] group-hover:text-black text-white flex items-center justify-center transition-all duration-300 shadow-md">
                        <ChevronLeft className="w-5 h-5 rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5 rtl:rotate-0 ltr:rotate-180 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Blog Details Pop-up Modal ── */}
      <BlogDetailsModal
        blog={selectedBlog}
        isOpen={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        settings={modalSettings}
      />
    </div>
  );
};

export default Blogs;

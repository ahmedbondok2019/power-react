import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import BlogDetailsModal from '../components/blogs/BlogDetailsModal';
import { useBlogs } from '../hooks/useBlogs';
import {
  Search,
  Calendar,
  BookOpen,
  Tag,
  Sparkles,
  ChevronLeft,
  ArrowLeft,
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const Blogs = () => {
  const { data: blogs = [], isLoading, isError, refetch } = useBlogs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Extract unique categories dynamically from blogs
  const categories = useMemo(() => {
    const cats = new Set();
    blogs.forEach((b) => {
      const cat = b.category || b.category_obj?.name;
      if (cat) cats.add(cat);
    });
    return ['الكل', ...Array.from(cats)];
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
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
  }, [blogs, selectedCategory, searchQuery]);

  // Separate featured blog (first featured item or first blog in list)
  const featuredBlog = useMemo(() => {
    return blogs.find((b) => b.is_featured) || blogs[0];
  }, [blogs]);

  return (
    <div className="min-h-screen bg-[#111312] text-white selection:bg-[#FFB800] selection:text-black">
      {/* ── Page Hero ── */}
      <Hero
        id="blogs-hero"
        badge="المدونة الهندسية"
        title="رؤى هندسية ومقالات متخصصة"
        subtitle="استكشف أحدث المقالات والتحليلات الفنية في مجالات المقاولات العامة، الأعمال الكهروميكانيكية، وأنظمة التكييف وكود البناء السعودي."
        buttonText="تصفح المقالات"
        buttonLink="#articles-section"
        bgImage="/projects-hero-bg.jpg"
        showVisionLogo={false}
        showStatsCards={true}
        stats={[
          { number: blogs.length || 6, label: "مقالات منشورة" },
          { number: categories.length > 1 ? categories.length - 1 : 3, label: "مجالات تخصصية" },
          { number: 100, label: "معايير هندسية معتمدة" },
        ]}
      />

      {/* ── Main Content Area ── */}
      <section
        id="articles-section"
        className="relative pt-56 sm:pt-64 pb-28 overflow-hidden"
        dir="rtl"
      >
        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#FFB800]/5 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-[#2A352F]/30 rounded-full blur-[170px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header & Section Title */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2 text-[#FFB800] text-sm font-bold tracking-wider">
                <span className="w-8 h-[2px] bg-[#FFB800] rounded-full inline-block" />
                <span>مركز المعرفة الهندسية</span>
              </div>
              <SectionTitle title="المقالات والدراسات" theme="dark" />
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="ابحث في المقالات..."
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

          {/* ── Featured Main Article (Only shown when not searching and viewing 'الكل') ── */}
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
                className="group relative block bg-[#181A18] border border-white/10 hover:border-[#FFB800]/50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Featured Image */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden">
                    <img
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-linear group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#181A18] via-[#181A18]/30 to-transparent" />
                    <div className="absolute top-6 right-6">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFB800] text-black text-xs font-extrabold shadow-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>مقال مميز</span>
                      </span>
                    </div>
                  </div>

                  {/* Featured Info */}
                  <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between text-right">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 text-xs text-[#FFB800] font-semibold tracking-wider">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{featuredBlog.category || featuredBlog.category_obj?.name}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                        {featuredBlog.title}
                      </h3>

                      <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-4">
                        {featuredBlog.short_description}
                      </p>
                    </div>

                    <div className="pt-8 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                      <div className="flex items-center gap-2 font-mono">
                        <Calendar className="w-4 h-4 text-[#FFB800]" />
                        <span>{featuredBlog.created_at || '2026-09-08'}</span>
                      </div>

                      <span className="inline-flex items-center gap-2 text-[#FFB800] font-bold group-hover:-translate-x-2 transition-transform">
                        <span>عرض تفاصيل المقال</span>
                        <ArrowLeft className="w-4 h-4" />
                      </span>
                    </div>
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
                  className="bg-[#181A18] rounded-3xl p-4 border border-white/5 animate-pulse space-y-4"
                >
                  <div className="h-56 bg-white/5 rounded-2xl w-full" />
                  <div className="h-4 bg-white/10 rounded w-1/3" />
                  <div className="h-6 bg-white/10 rounded w-3/4" />
                  <div className="h-16 bg-white/5 rounded w-full" />
                </div>
              ))}
            </div>
          )}

          {/* ── Error State ── */}
          {isError && (
            <div className="text-center py-20 bg-[#181A18] rounded-3xl border border-red-500/20 max-w-xl mx-auto p-8">
              <p className="text-white/80 text-lg mb-4">تعذر تحميل المقالات حالياً</p>
              <button
                onClick={() => refetch()}
                className="px-6 py-2.5 rounded-full bg-[#FFB800] text-black font-bold text-sm hover:scale-105 transition-transform cursor-pointer"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {/* ── Empty State ── */}
          {!isLoading && !isError && filteredBlogs.length === 0 && (
            <div className="text-center py-24 bg-[#181A18]/50 rounded-3xl border border-white/5 max-w-xl mx-auto p-8">
              <BookOpen className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">لا توجد مقالات مطابقة</h4>
              <p className="text-white/60 text-sm">
                لم يتم العثور على أي مقالات تطابق بحثك. جرّب كلمات دلالية أخرى أو اختر تصنيفاً آخر.
              </p>
            </div>
          )}

          {/* ── Articles Grid ── */}
          {!isLoading && !isError && filteredBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, idx) => (
                <motion.article
                  key={blog.id || idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: (idx % 3) * 0.12, ease: EASE }}
                  onClick={() => setSelectedBlog(blog)}
                  className="group relative bg-[#181A18] border border-white/10 hover:border-[#FFB800]/50 rounded-[24px] overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="flex flex-col h-full">
                    {/* Card Image */}
                    <div className="relative h-60 w-full overflow-hidden bg-black/40">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-linear group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181A18] via-transparent to-transparent opacity-90" />

                      {/* Category Tag */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold">
                          {blog.category || blog.category_obj?.name}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between text-right">
                      <div className="space-y-3">
                        <div className="flex items-center justify-end gap-3 text-white/50 text-xs font-mono">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#FFB800]" />
                            <span>{blog.created_at || '2026-09-08'}</span>
                          </span>
                        </div>

                        <h3 className="text-white font-bold text-lg sm:text-xl leading-snug group-hover:text-[#FFB800] transition-colors line-clamp-2">
                          {blog.title}
                        </h3>

                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-3">
                          {blog.short_description}
                        </p>
                      </div>

                      {/* Footer Read Action */}
                      <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-[#FFB800] font-bold group-hover:underline">
                          عرض التفاصيل
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#FFB800] group-hover:text-black text-white flex items-center justify-center transition-all duration-300">
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Blog Details Pop-up Modal ── */}
      <BlogDetailsModal
        blog={selectedBlog}
        isOpen={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />
    </div>
  );
};

export default Blogs;

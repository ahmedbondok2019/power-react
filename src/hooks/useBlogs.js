import { useQuery } from '@tanstack/react-query';
import { getBlogs, getBlogBySlug, getBlogsPageData } from '../api/blogsApi';
import { useLanguage } from '../contexts/LanguageContext';

export const BLOGS_PAGE_QUERY_KEY = (lang = 'ar') => ['blogs-page', lang];
export const BLOGS_QUERY_KEY = (lang = 'ar') => ['blogs', lang];
export const BLOG_DETAILS_QUERY_KEY = (slug, lang = 'ar') => ['blog', slug, lang];

/**
 * Hook to fetch full blogs page data (Hero, categories, articles, settings)
 */
export const useBlogsPageData = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: BLOGS_PAGE_QUERY_KEY(lang),
    queryFn: getBlogsPageData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Hook to fetch all blogs with caching
 */
export const useBlogs = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: BLOGS_QUERY_KEY(lang),
    queryFn: getBlogs,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Hook to fetch a single blog article by slug
 */
export const useBlogDetails = (slug, options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: BLOG_DETAILS_QUERY_KEY(slug, lang),
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export default useBlogs;

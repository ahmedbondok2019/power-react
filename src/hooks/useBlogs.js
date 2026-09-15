import { useQuery } from '@tanstack/react-query';
import { getBlogs, getBlogBySlug, getBlogsPageData } from '../api/blogsApi';

export const BLOGS_PAGE_QUERY_KEY = ['blogs-page'];
export const BLOGS_QUERY_KEY = ['blogs'];
export const BLOG_DETAILS_QUERY_KEY = (slug) => ['blog', slug];

/**
 * Hook to fetch full blogs page data (Hero, categories, articles, settings)
 */
export const useBlogsPageData = (options = {}) => {
  return useQuery({
    queryKey: BLOGS_PAGE_QUERY_KEY,
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
  return useQuery({
    queryKey: BLOGS_QUERY_KEY,
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
  return useQuery({
    queryKey: BLOG_DETAILS_QUERY_KEY(slug),
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export default useBlogs;

import { useQuery } from '@tanstack/react-query';
import { getBlogs, getBlogBySlug } from '../api/blogsApi';

export const BLOGS_QUERY_KEY = ['blogs'];
export const BLOG_DETAILS_QUERY_KEY = (slug) => ['blog', slug];

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

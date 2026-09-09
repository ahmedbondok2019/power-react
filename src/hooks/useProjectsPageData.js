import { useQuery } from '@tanstack/react-query';
import { getProjectsPageData } from '../api/projectsApi';

export const PROJECTS_PAGE_QUERY_KEY = ['projects-page'];

/**
 * Custom hook to fetch Projects Page data with caching
 */
export const useProjectsPageData = (options = {}) => {
  return useQuery({
    queryKey: PROJECTS_PAGE_QUERY_KEY,
    queryFn: getProjectsPageData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export default useProjectsPageData;

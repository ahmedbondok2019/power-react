import { useQuery } from '@tanstack/react-query';
import { getProjectsPageData } from '../api/projectsApi';
import { useLanguage } from '../contexts/LanguageContext';

export const PROJECTS_PAGE_QUERY_KEY = (lang = 'ar') => ['projects-page', lang];

/**
 * Custom hook to fetch Projects Page data with caching
 */
export const useProjectsPageData = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: PROJECTS_PAGE_QUERY_KEY(lang),
    queryFn: getProjectsPageData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export default useProjectsPageData;

import { useQuery } from '@tanstack/react-query';
import { getHomeData } from '../api/homeApi';
import { useLanguage } from '../contexts/LanguageContext';

export const HOME_QUERY_KEY = (lang = 'ar') => ['home', lang];

/**
 * Custom hook to fetch and cache Home Page data using TanStack React Query
 * @param {Object} [options] - Optional React Query options
 */
export const useHomeData = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: HOME_QUERY_KEY(lang),
    queryFn: getHomeData,
    staleTime: 1000 * 60 * 5, // 5 minutes cache fresh
    gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
    refetchOnWindowFocus: false,
    ...options,
  });
};

export default useHomeData;

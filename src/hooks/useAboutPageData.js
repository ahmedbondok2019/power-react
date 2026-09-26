import { useQuery } from '@tanstack/react-query';
import { getAboutPageData } from '../api/aboutApi';
import { useLanguage } from '../contexts/LanguageContext';

export const ABOUT_PAGE_QUERY_KEY = (lang = 'ar') => ['about-page', lang];

export const useAboutPageData = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: ABOUT_PAGE_QUERY_KEY(lang),
    queryFn: getAboutPageData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
    ...options,
  });
};

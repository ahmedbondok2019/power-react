import { useQuery } from '@tanstack/react-query';
import { getServicesPageData } from '../api/servicesApi';
import { useLanguage } from '../contexts/LanguageContext';

export const SERVICES_PAGE_QUERY_KEY = (lang = 'ar') => ['services-page', lang];

export const useServicesPageData = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: SERVICES_PAGE_QUERY_KEY(lang),
    queryFn: getServicesPageData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
    ...options,
  });
};

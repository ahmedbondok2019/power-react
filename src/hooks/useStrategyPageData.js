import { useQuery } from '@tanstack/react-query';
import { getStrategyPageData } from '../api/strategyApi';
import { useLanguage } from '../contexts/LanguageContext';

export const STRATEGY_PAGE_QUERY_KEY = (lang = 'ar') => ['strategy-page', lang];

export const useStrategyPageData = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: STRATEGY_PAGE_QUERY_KEY(lang),
    queryFn: getStrategyPageData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
    ...options,
  });
};

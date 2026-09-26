import { useQuery } from '@tanstack/react-query';
import { getContactPageData } from '../api/contactApi';
import { useLanguage } from '../contexts/LanguageContext';

export const useContactPageData = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: ['contactPageData', lang],
    queryFn: getContactPageData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    ...options,
  });
};

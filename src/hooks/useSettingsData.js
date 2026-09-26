import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../api/settingsApi';
import { useLanguage } from '../contexts/LanguageContext';

export const useSettingsData = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: ['settingsData', lang],
    queryFn: getSettings,
    staleTime: 60 * 60 * 1000, // Cache for 1 hour
    retry: 2,
    ...options,
  });
};

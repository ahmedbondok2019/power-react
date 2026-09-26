import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/authApi';
import { useLanguage } from '../contexts/LanguageContext';

export const useProfile = (options = {}) => {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: ['profile', lang],
    queryFn: getProfile,
    // Only fetch if we have a token
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('auth_token'),
    retry: 1,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

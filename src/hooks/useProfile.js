import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/authApi';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    // Only fetch if we have a token
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('auth_token'),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};

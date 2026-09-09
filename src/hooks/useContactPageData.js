import { useQuery } from '@tanstack/react-query';
import { getContactPageData } from '../api/contactApi';

export const useContactPageData = () => {
  return useQuery({
    queryKey: ['contactPageData'],
    queryFn: getContactPageData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

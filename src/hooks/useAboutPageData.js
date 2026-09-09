import { useQuery } from '@tanstack/react-query';
import { getAboutPageData } from '../api/aboutApi';

export const ABOUT_PAGE_QUERY_KEY = ['about-page'];

export const useAboutPageData = () => {
  return useQuery({
    queryKey: ABOUT_PAGE_QUERY_KEY,
    queryFn: getAboutPageData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};

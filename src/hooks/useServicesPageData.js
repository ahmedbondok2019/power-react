import { useQuery } from '@tanstack/react-query';
import { getServicesPageData } from '../api/servicesApi';

export const SERVICES_PAGE_QUERY_KEY = ['services-page'];

export const useServicesPageData = () => {
  return useQuery({
    queryKey: SERVICES_PAGE_QUERY_KEY,
    queryFn: getServicesPageData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};

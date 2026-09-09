import { useQuery } from '@tanstack/react-query';
import { getHomeData } from '../api/homeApi';

export const HOME_QUERY_KEY = ['home'];

/**
 * Custom hook to fetch and cache Home Page data using TanStack React Query
 * @param {Object} [options] - Optional React Query options
 */
export const useHomeData = (options = {}) => {
  return useQuery({
    queryKey: HOME_QUERY_KEY,
    queryFn: getHomeData,
    staleTime: 1000 * 60 * 5, // 5 minutes cache fresh
    gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
    refetchOnWindowFocus: false,
    ...options,
  });
};

export default useHomeData;

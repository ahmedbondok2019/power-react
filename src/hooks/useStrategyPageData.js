import { useQuery } from '@tanstack/react-query';
import { getStrategyPageData } from '../api/strategyApi';

export const STRATEGY_PAGE_QUERY_KEY = ['strategy-page'];

export const useStrategyPageData = () => {
  return useQuery({
    queryKey: STRATEGY_PAGE_QUERY_KEY,
    queryFn: getStrategyPageData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};

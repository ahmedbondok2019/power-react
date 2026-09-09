import apiClient from './client';
import { ENDPOINTS } from './endpoints';

/**
 * Fetch Strategy Page content from API
 */
export const getStrategyPageData = async () => {
  const response = await apiClient.get(ENDPOINTS.STRATEGY_PAGE);
  return response?.data || response;
};

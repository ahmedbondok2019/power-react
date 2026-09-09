import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';

/**
 * Fetch Services Page content from API
 */
export const getServicesPageData = async () => {
  const response = await apiClient.get(ENDPOINTS.SERVICES_PAGE);
  return response.data?.data;
};

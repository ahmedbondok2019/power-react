import apiClient from './client';
import { ENDPOINTS } from './endpoints';

/**
 * Fetch Services Page content from API
 */
export const getServicesPageData = async () => {
  const response = await apiClient.get(ENDPOINTS.SERVICES_PAGE);
  // apiClient interceptor returns response.data directly:
  // if response has a nested .data property, return response.data, otherwise return response
  return response?.data || response;
};

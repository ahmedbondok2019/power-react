import apiClient from './client';
import { ENDPOINTS } from './endpoints';

/**
 * Fetch About Page content from API
 */
export const getAboutPageData = async () => {
  const response = await apiClient.get(ENDPOINTS.ABOUT);
  return response?.data || response;
};

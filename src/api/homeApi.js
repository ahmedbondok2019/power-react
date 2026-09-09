import apiClient from './client';
import { ENDPOINTS } from './endpoints';

/**
 * Fetch Home Page Data
 * @returns {Promise<Object>} Home data response
 */
export const getHomeData = async () => {
  const response = await apiClient.get(ENDPOINTS.HOME);
  return response?.data;
};

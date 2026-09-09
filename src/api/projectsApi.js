import apiClient from './client';
import { ENDPOINTS } from './endpoints';

/**
 * Fetch Projects Page Data
 * @returns {Promise<Object>} Projects page data (main projects & additional projects)
 */
export const getProjectsPageData = async () => {
  const response = await apiClient.get(ENDPOINTS.PROJECTS_PAGE);
  return response?.data || null;
};

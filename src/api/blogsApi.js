import apiClient from './client';
import { ENDPOINTS } from './endpoints';

/**
 * Fetch Blogs Page full content from API (Hero, articles, categories, settings)
 * @returns {Promise<Object>} Blogs page data
 */
export const getBlogsPageData = async () => {
  const response = await apiClient.get(ENDPOINTS.BLOGS_PAGE);
  return response?.data || response;
};

/**
 * Fetch all blogs
 * @returns {Promise<Array>} List of blogs
 */
export const getBlogs = async () => {
  const response = await apiClient.get(ENDPOINTS.BLOGS);
  return response?.data || [];
};

/**
 * Fetch a single blog by its slug
 * @param {string} slug - The slug of the article
 * @returns {Promise<Object>} Single blog details
 */
export const getBlogBySlug = async (slug) => {
  const response = await apiClient.get(`${ENDPOINTS.BLOGS}/${slug}`);
  return response?.data || null;
};

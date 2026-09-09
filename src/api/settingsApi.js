import apiClient from './client';
import { ENDPOINTS } from './endpoints';

export const getSettings = async () => {
  const response = await apiClient.get(ENDPOINTS.SETTINGS);
  return response;
};

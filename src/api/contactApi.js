import apiClient from './client';
import { ENDPOINTS } from './endpoints';

export const getContactPageData = async () => {
  const response = await apiClient.get(ENDPOINTS.CONTACT_PAGE);
  return response;
};

export const sendContactMessage = async (data) => {
  const response = await apiClient.post(ENDPOINTS.CONTACT_SEND, data);
  return response;
};

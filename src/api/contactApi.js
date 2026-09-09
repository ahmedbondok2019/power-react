import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const getContactPageData = async () => {
  const response = await axiosInstance.get(ENDPOINTS.CONTACT_PAGE);
  return response.data;
};

export const sendContactMessage = async (data) => {
  const response = await axiosInstance.post(ENDPOINTS.CONTACT_SEND, data);
  return response.data;
};

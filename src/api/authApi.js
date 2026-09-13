import apiClient from './client';
import { ENDPOINTS } from './endpoints';

export const getProfile = async () => {
  const response = await apiClient.get(ENDPOINTS.AUTH_ME);
  return response;
};

export const loginUser = async (data) => {
  const response = await apiClient.post(ENDPOINTS.AUTH_LOGIN, data);
  return response;
};

export const registerUser = async (data) => {
  const response = await apiClient.post(ENDPOINTS.AUTH_REGISTER, data);
  return response;
};

export const logoutUser = async () => {
  const response = await apiClient.post(ENDPOINTS.AUTH_LOGOUT);
  return response;
};

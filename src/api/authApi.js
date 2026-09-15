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

export const loginWithGoogle = async (data) => {
  const token = typeof data === 'string' ? data : (data?.credential || data?.id_token);
  const payload = {
    credential: data?.credential || token,
    id_token: data?.id_token || token,
  };
  const response = await apiClient.post(ENDPOINTS.AUTH_GOOGLE, payload);
  return response;
};

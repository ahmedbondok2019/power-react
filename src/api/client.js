import axios from 'axios';
import { BASE_URL } from './endpoints';

/**
 * Axios client instance with standard configurations
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': 'ar',
    'lang': 'ar',
    'X-Localization': 'ar',
  },
  timeout: 15000,
});

// Request interceptor to ensure language is always passed (supporting localStorage if changed)
apiClient.interceptors.request.use((config) => {
  const currentLang = (typeof window !== 'undefined' && localStorage.getItem('app_lang')) || 'ar';
  config.headers['Accept-Language'] = currentLang;
  config.headers['lang'] = currentLang;
  config.headers['X-Localization'] = currentLang;
  return config;
});

// Response interceptor for unified response handling & errors
apiClient.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response.data;
  },
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'حدث خطأ غير متوقع',
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(customError);
  }
);

export default apiClient;

import axios from 'axios';
import { BASE_URL } from './endpoints';

/**
 * Axios client instance with optimized configurations for speed and reliability
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',   // Ask server for compressed responses
    'Connection': 'keep-alive',               // Reuse TCP connections
    'Accept-Language': 'ar',
    'lang': 'ar',
    'X-Localization': 'ar',
  },
  timeout: 12000,   // 12s timeout (reduced from 15s)
});

// Request interceptor to ensure language is always passed (supporting localStorage if changed)
apiClient.interceptors.request.use((config) => {
  const currentLang =
    (typeof window !== 'undefined' &&
      (localStorage.getItem('site_lang') || localStorage.getItem('app_lang'))) ||
    'ar';
  config.headers['Accept-Language'] = currentLang;
  config.headers['lang'] = currentLang;
  config.headers['X-Localization'] = currentLang;

  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor for unified response handling & errors
apiClient.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    const customError = {
      message: error.response?.data?.message || error.message || 'حدث خطأ غير متوقع',
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(customError);
  }
);

export default apiClient;

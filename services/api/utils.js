import axios from 'axios';
import { API_CONFIG, HTTP_STATUS, ERROR_MESSAGES } from './config';

// Create axios instance
export const apiClient = axios.create(API_CONFIG);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (!response) {
      return Promise.reject(new Error(ERROR_MESSAGES.NETWORK_ERROR));
    }

    switch (response.status) {
      case HTTP_STATUS.UNAUTHORIZED:
        // Handle unauthorized - redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        break;
      case HTTP_STATUS.FORBIDDEN:
        return Promise.reject(new Error(ERROR_MESSAGES.FORBIDDEN));
      case HTTP_STATUS.NOT_FOUND:
        return Promise.reject(new Error(ERROR_MESSAGES.NOT_FOUND));
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return Promise.reject(new Error(ERROR_MESSAGES.INTERNAL_ERROR));
      default:
        return Promise.reject(error);
    }
  }
);

// API utility functions
export const apiUtils = {
  // GET request
  get: async (url, config = {}) => {
    const response = await apiClient.get(url, config);
    return response.data;
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    const response = await apiClient.post(url, data, config);
    return response.data;
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    const response = await apiClient.put(url, data, config);
    return response.data;
  },

  // DELETE request
  delete: async (url, config = {}) => {
    const response = await apiClient.delete(url, config);
    return response.data;
  },

  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  },
};

export default apiUtils;

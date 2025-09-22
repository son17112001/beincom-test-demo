import axios from 'axios';
import { API_CONFIG, HTTP_STATUS, ERROR_MESSAGES } from './config';

export const apiClient = axios.create(API_CONFIG);

apiClient.interceptors.request.use(
  (config) => {
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

export const apiUtils = {
  get: async (url, config = {}) => {
    const response = await apiClient.get(url, config);
    return response.data;
  },

  post: async (url, data = {}, config = {}) => {
    const response = await apiClient.post(url, data, config);
    return response.data;
  },

  put: async (url, data = {}, config = {}) => {
    const response = await apiClient.put(url, data, config);
    return response.data;
  },

  delete: async (url, config = {}) => {
    const response = await apiClient.delete(url, config);
    return response.data;
  },

  patch: async (url, data = {}, config = {}) => {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  },
};

export default apiUtils;

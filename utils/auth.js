import { setCookie, deleteCookie } from 'cookies-next';

export const setAuthCookie = (token, options = {}) => {
  setCookie('authToken', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    ...options,
  });
};

export const removeAuthCookie = () => {
  deleteCookie('authToken');
};

export const roleValidator = (userRoles, requiredRoles) => {
  if (!userRoles || !requiredRoles) return false;

  if (Array.isArray(requiredRoles)) {
    return requiredRoles.some(role => userRoles.includes(role));
  }

  return userRoles.includes(requiredRoles);
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('authToken');
};

export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

export const logout = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('authToken');
  removeAuthCookie();

  window.location.href = '/login';
};

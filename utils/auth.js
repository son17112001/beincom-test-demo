// Auth utilities
import { setCookie, deleteCookie } from 'cookies-next';

// Set auth cookie
export const setAuthCookie = (token, options = {}) => {
  setCookie('authToken', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
    ...options,
  });
};

// Remove auth cookie
export const removeAuthCookie = () => {
  deleteCookie('authToken');
};

// Role validator
export const roleValidator = (userRoles, requiredRoles) => {
  if (!userRoles || !requiredRoles) return false;

  if (Array.isArray(requiredRoles)) {
    return requiredRoles.some(role => userRoles.includes(role));
  }

  return userRoles.includes(requiredRoles);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('authToken');
};

// Get user token
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

// Logout user
export const logout = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('authToken');
  removeAuthCookie();

  // Redirect to login page
  window.location.href = '/login';
};

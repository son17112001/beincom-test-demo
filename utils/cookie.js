import { getCookie, setCookie, deleteCookie } from 'cookies-next';

// Cookie configuration
const COOKIE_CONFIG = {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
};

// Auth token management
export const authCookie = {
    // Get auth token from cookie
    get: () => {
        return getCookie('authToken');
    },

    // Set auth token in cookie
    set: (token) => {
        setCookie('authToken', token, COOKIE_CONFIG);
    },

    // Remove auth token from cookie
    remove: () => {
        deleteCookie('authToken');
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!getCookie('authToken');
    }
};

export default authCookie;

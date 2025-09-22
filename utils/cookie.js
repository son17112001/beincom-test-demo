import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const COOKIE_CONFIG = {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
};

export const authCookie = {
    get: () => {
        return getCookie('authToken');
    },

    set: (token) => {
        setCookie('authToken', token, COOKIE_CONFIG);
    },

    remove: () => {
        deleteCookie('authToken');
    },

    isAuthenticated: () => {
        return !!getCookie('authToken');
    }
};

export default authCookie;

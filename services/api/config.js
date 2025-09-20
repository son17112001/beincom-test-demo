// API Configuration
export const API_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
    headers: {
        "Content-Type": "application/json",
    },
};

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",

    // Users
    USERS: "/users",
    USER_PROFILE: "/users/profile",

    // Common
    UPLOAD: "/upload",
    FILES: "/files",
};

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: "Network error occurred",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access forbidden",
    NOT_FOUND: "Resource not found",
    INTERNAL_ERROR: "Internal server error",
    VALIDATION_ERROR: "Validation failed",
};

// HTTP Methods
export const METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
};

// Headers
export const HEADERS = {
    JSON: {
        "Content-Type": "application/json",
    },
    MULTIPART: {
        "Content-Type": "multipart/form-data",
    },
    FORM_URLENCODED: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
};

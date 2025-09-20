// App configuration
export const APP_CONFIG = {
    NAME: "Next.js Admin Template",
    VERSION: "1.0.0",
    DESCRIPTION: "A modern admin dashboard template",
};

// Theme colors
export const THEME = {
    COLORS: {
        PRIMARY: "#3B82F6",
        SECONDARY: "#6B7280",
        SUCCESS: "#10B981",
        WARNING: "#F59E0B",
        ERROR: "#EF4444",
        INFO: "#06B6D4",
        LIGHT: "#F9FAFB",
        DARK: "#111827",
        WHITE: "#FFFFFF",
        BLACK: "#000000",
    },
    SPACING: {
        XS: "0.25rem",
        SM: "0.5rem",
        MD: "1rem",
        LG: "1.5rem",
        XL: "2rem",
        XXL: "3rem",
    },
    BORDER_RADIUS: {
        SM: "0.25rem",
        MD: "0.375rem",
        LG: "0.5rem",
        XL: "0.75rem",
        FULL: "9999px",
    },
    SHADOWS: {
        SM: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        MD: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        LG: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        XL: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    },
};

// Validation patterns
export const VALIDATION = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^[\+]?[1-9][\d]{0,15}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    URL: /^https?:\/\/.+/,
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [ 5, 10, 20, 50, 100 ],
};

// Date formats
export const DATE_FORMATS = {
    DISPLAY: "DD/MM/YYYY",
    INPUT: "YYYY-MM-DD",
    DATETIME: "DD/MM/YYYY HH:mm",
    TIME: "HH:mm",
};

// HTTP status codes
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

// Common messages
export const MESSAGES = {
    SUCCESS: {
        CREATED: "Created successfully",
        UPDATED: "Updated successfully",
        DELETED: "Deleted successfully",
        SAVED: "Saved successfully",
    },
    ERROR: {
        REQUIRED: "This field is required",
        INVALID_EMAIL: "Please enter a valid email",
        INVALID_PHONE: "Please enter a valid phone number",
        INVALID_PASSWORD:
            "Password must be at least 8 characters with uppercase, lowercase and number",
        NETWORK_ERROR: "Network error, please try again",
        SERVER_ERROR: "Server error, please try again later",
    },
    CONFIRM: {
        DELETE: "Are you sure you want to delete this item?",
        LOGOUT: "Are you sure you want to logout?",
    },
};

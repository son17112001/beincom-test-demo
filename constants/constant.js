// Status constants
export const commonStatus = {
    ACTIVE: 1,
    INACTIVE: 0,
};

// Date formats
export const DATE_YEAR_FORMAT = "DD/MM/YYYY";
export const YEAR_DATE_FORMAT = "YYYY-MM-DD";
export const DATE_TIME_DISPLAY_FORMAT = "DD/MM/YYYY HH:mm";
export const TIME_FORMAT = "HH:mm";

// Locale
export const DEFAULT_LOCALE = "vi";
export const LANGUAGE_DDL = [
    { value: "vi", label: "Tiếng Việt" },
    { value: "en", label: "English" },
];

// Storage keys
export const storageKeys = {
    LOCALE: "locale",
    AUTH_TOKEN: "authToken",
};

// Default values
export const DEFAULT_TABLE_SIZE = 10;

// Field types
export const FieldTypes = {
    TEXT: "text",
    NUMBER: "number",
    DATE: "date",
    SELECT: "select",
    MULTI_SELECT: "multi_select",
};

// Search and Filter options
export const FILTER_OPTIONS = [
    { value: "newest", label: "Newest First", sortBy: "id", order: "desc" },
    { value: "oldest", label: "Oldest First", sortBy: "id", order: "asc" },
    { value: "title-asc", label: "Title A-Z", sortBy: "title", order: "asc" },
    { value: "title-desc", label: "Title Z-A", sortBy: "title", order: "desc" },
    { value: "most-comments", label: "Most Comments", sortBy: "comments", order: "desc" },
    { value: "least-comments", label: "Least Comments", sortBy: "comments", order: "asc" },
];

// Default filter
export const DEFAULT_FILTER = "newest";

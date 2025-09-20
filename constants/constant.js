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

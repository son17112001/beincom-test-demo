import { FILTER_OPTIONS } from '../constants/constant';

/**
 * Get current filter option by value
 * @param {string} filterValue - The filter value to find
 * @returns {Object} The filter option object
 */
export const getCurrentFilter = (filterValue) => {
    return FILTER_OPTIONS.find(option => option.value === filterValue) || FILTER_OPTIONS[0];
};

/**
 * Get filter options for dropdown
 * @returns {Array} Array of filter options
 */
export const getFilterOptions = () => {
    return FILTER_OPTIONS;
};

/**
 * Get default filter value
 * @returns {string} Default filter value
 */
export const getDefaultFilter = () => {
    return FILTER_OPTIONS[0].value;
};

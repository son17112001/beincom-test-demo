import { FILTER_OPTIONS } from '../constants/constant';

export const getCurrentFilter = (filterValue) => {
    return FILTER_OPTIONS.find(option => option.value === filterValue) || FILTER_OPTIONS[0];
};

export const getFilterOptions = () => {
    return FILTER_OPTIONS;
};

export const getDefaultFilter = () => {
    return FILTER_OPTIONS[0].value;
};

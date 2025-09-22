import React, { createContext, useCallback, useContext, useState } from 'react';

import { DEFAULT_FILTER } from '../constants/constant';

const SearchContext = createContext();

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};

export const SearchProvider = ({ children }) => {
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ selectedFilter, setSelectedFilter ] = useState(DEFAULT_FILTER);
    const [ isFilterOpen, setIsFilterOpen ] = useState(false);

    const updateSearchQuery = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    const updateSelectedFilter = useCallback((filter) => {
        setSelectedFilter(filter);
    }, []);

    const updateFilterOpen = useCallback((isOpen) => {
        setIsFilterOpen(isOpen);
    }, []);

    const clearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);

    const resetFilter = useCallback(() => {
        setSelectedFilter(DEFAULT_FILTER);
    }, []);

    const value = {
        searchQuery,
        selectedFilter,
        isFilterOpen,
        updateSearchQuery,
        updateSelectedFilter,
        updateFilterOpen,
        clearSearch,
        resetFilter,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;


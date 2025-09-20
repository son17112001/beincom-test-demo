import React, { useState } from 'react';

import Button from '../Button';
import Input from '../Input';

import styles from './SearchAndFilter.module.scss';

const SearchAndFilter = ({
    searchQuery,
    onSearchChange,
    onClearSearch,
    onFilterChange,
    onSortChange,
    sortBy,
    filterBy,
    totalResults,
}) => {
    const [ showFilters, setShowFilters ] = useState(false);

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'most_comments', label: 'Most Comments' },
        { value: 'least_comments', label: 'Least Comments' },
        { value: 'title_asc', label: 'Title A-Z' },
        { value: 'title_desc', label: 'Title Z-A' },
    ];

    const filterOptions = [
        { value: 'all', label: 'All Posts' },
        { value: 'recent', label: 'Recent (Last 7 days)' },
        { value: 'popular', label: 'Popular (10+ comments)' },
        { value: 'trending', label: 'Trending (5+ comments)' },
    ];

    const handleSortChange = (e) => {
        onSortChange?.(e.target.value);
    };

    const handleFilterChange = (e) => {
        onFilterChange?.(e.target.value);
    };

    return (
        <div className={styles.searchAndFilter}>
            <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchInputWrapper}>
                        <Input
                            type="text"
                            placeholder="Search posts by title or content..."
                            value={searchQuery}
                            onChange={onSearchChange}
                            className={styles.searchInput}
                        />
                        <div className={styles.searchIcon}>🔍</div>
                    </div>

                    {searchQuery && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClearSearch}
                            className={styles.clearButton}
                        >
                            Clear
                        </Button>
                    )}
                </div>

                <div className={styles.resultsInfo}>
                    {totalResults !== undefined && (
                        <span className={styles.resultsCount}>
                            {totalResults} {totalResults === 1 ? 'post' : 'posts'} found
                        </span>
                    )}
                </div>
            </div>

            <div className={styles.filterSection}>
                <div className={styles.filterControls}>
                    <div className={styles.filterGroup}>
                        <label htmlFor="sort-select" className={styles.filterLabel}>
                            Sort by:
                        </label>
                        <select
                            id="sort-select"
                            value={sortBy || 'newest'}
                            onChange={handleSortChange}
                            className={styles.filterSelect}
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label htmlFor="filter-select" className={styles.filterLabel}>
                            Filter:
                        </label>
                        <select
                            id="filter-select"
                            value={filterBy || 'all'}
                            onChange={handleFilterChange}
                            className={styles.filterSelect}
                        >
                            {filterOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowFilters(!showFilters)}
                        className={styles.toggleFilters}
                    >
                        {showFilters ? 'Hide' : 'Show'} Advanced Filters
                    </Button>
                </div>

                {showFilters && (
                    <div className={styles.advancedFilters}>
                        <div className={styles.filterRow}>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>
                                    Date Range:
                                </label>
                                <div className={styles.dateInputs}>
                                    <Input
                                        type="date"
                                        className={styles.dateInput}
                                        placeholder="From"
                                    />
                                    <span className={styles.dateSeparator}>to</span>
                                    <Input
                                        type="date"
                                        className={styles.dateInput}
                                        placeholder="To"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.filterRow}>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>
                                    Comment Count:
                                </label>
                                <div className={styles.rangeInputs}>
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        className={styles.numberInput}
                                    />
                                    <span className={styles.rangeSeparator}>to</span>
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        className={styles.numberInput}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchAndFilter;

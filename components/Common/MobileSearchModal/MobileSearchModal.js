import React, { useEffect, useRef } from 'react';
import { useSearchContext } from '../../../contexts';
import { getFilterOptions } from '../../../utils';
import FilterDropdown from '../FilterDropdown';

import styles from './MobileSearchModal.module.scss';

const MobileSearchModal = ({ isOpen, onClose }) => {
    const {
        searchQuery,
        selectedFilter,
        isFilterOpen,
        updateSearchQuery,
        updateSelectedFilter,
        updateFilterOpen,
        clearSearch,
    } = useSearchContext();

    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleSearchChange = (e) => {
        updateSearchQuery(e.target.value);
    };

    const handleFilterSelect = (filterValue) => {
        updateSelectedFilter(filterValue);
        updateFilterOpen(false);
    };

    const toggleFilterDropdown = () => {
        updateFilterOpen(!isFilterOpen);
    };

    const closeFilterDropdown = () => {
        updateFilterOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h3>Search Posts</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className={styles.searchContainer}>
                    <div className={styles.searchInputWrapper}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search posts by title or content..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {searchQuery && (
                            <button
                                className={styles.clearButton}
                                onClick={clearSearch}
                                type="button"
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className={styles.filterContainer}>
                        <button
                            className={styles.filterButton}
                            onClick={toggleFilterDropdown}
                            type="button"
                            aria-label="Filter options"
                        >
                            <span className={styles.filterIcon}>⚙️</span>
                            <span className={styles.filterText}>Filter</span>
                            <span className={styles.arrowIcon}>
                                {isFilterOpen ? '▲' : '▼'}
                            </span>
                        </button>

                        <FilterDropdown
                            isOpen={isFilterOpen}
                            onClose={closeFilterDropdown}
                            options={getFilterOptions()}
                            selectedValue={selectedFilter}
                            onSelect={handleFilterSelect}
                            className={styles.filterDropdown}
                        />
                    </div>
                </div>

                <div className={styles.footer}>
                    <button className={styles.searchButton} onClick={onClose}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileSearchModal;

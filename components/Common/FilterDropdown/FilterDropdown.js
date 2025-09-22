import React, { useRef, useEffect } from 'react';

import styles from './FilterDropdown.module.scss';

const FilterDropdown = ({
    isOpen,
    onClose,
    options,
    selectedValue,
    onSelect,
    className = ''
}) => {
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Close dropdown on escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={`${styles.dropdown} ${className}`} ref={dropdownRef}>
            <div className={styles.dropdownContent}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        className={`${styles.dropdownItem} ${
                            selectedValue === option.value ? styles.selected : ''
                        }`}
                        onClick={() => onSelect(option.value)}
                        type="button"
                    >
                        <span className={styles.itemLabel}>{option.label}</span>
                        {selectedValue === option.value && (
                            <span className={styles.checkIcon}>✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterDropdown;


import Link from "next/link";

import { useSearchContext } from "../../../contexts";
import { useAuth } from "../../../hooks/useAuth";
import { getFilterOptions } from "../../../utils";
import FilterDropdown from "../../Common/FilterDropdown";
import UserDropdown from "../../Common/UserDropdown";

import styles from "./Header.module.scss";

function Header() {
    const { isAuthenticated } = useAuth();
    const {
        searchQuery,
        selectedFilter,
        isFilterOpen,
        updateSearchQuery,
        updateSelectedFilter,
        updateFilterOpen,
    } = useSearchContext();

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

    return (
        <header className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>BIC</div>
                    <Link href="/" className={styles.logoLink}>
                        beincom
                    </Link>
                </div>

                <div className={styles.searchBar}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search posts by title or content..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    <div className={styles.filterContainer}>
                        <button
                            className={styles.filterButton}
                            onClick={toggleFilterDropdown}
                            type="button"
                            aria-label="Filter options"
                        >
                            <span className={styles.filterIcon}>⚙️</span>
                            <span className={styles.filterText}>Filter</span>
                            <span className={styles.arrowIcon}>{isFilterOpen ? "▲" : "▼"}</span>
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

                <nav className={styles.nav}>
                    {isAuthenticated ? (
                        <UserDropdown />
                    ) : (
                        <div className={styles.authSection}>
                            <Link href="/login" className={styles.authLink}>
                                Đăng nhập
                            </Link>
                            <Link href="/register" className={styles.authLink}>
                                Đăng ký
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;

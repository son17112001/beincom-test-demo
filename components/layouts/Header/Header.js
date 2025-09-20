import Link from "next/link";

import { useAuth } from "../../../hooks/useAuth";
import UserDropdown from "../../Common/UserDropdown";

import styles from "./Header.module.scss";

function Header() {
    const { isAuthenticated } = useAuth();

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
                        placeholder="Search content"
                        className={styles.searchInput}
                    />
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

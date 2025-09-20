import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../Common/Button';

import styles from "./Header.module.scss";

function Header() {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
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
                        placeholder="Search content"
                        className={styles.searchInput}
                    />
                </div>

                <nav className={styles.nav}>
                    <a href="/" className={`${styles.navItem} ${styles.active}`}>
                        🏠
                    </a>
                    <a href="/people" className={styles.navItem}>
                        👥
                    </a>
                    <a href="/shop" className={styles.navItem}>
                        🛍️
                    </a>
                    <a href="/notifications" className={styles.navItem}>
                        🔔
                        <span className={styles.badge}>2</span>
                    </a>
                    <div className={styles.navItem}>🔴</div>

                    {isAuthenticated ? (
                        <div className={styles.userSection}>
                            <button className={styles.walletBtn}>
                                Wallet
                            </button>
                            <div className={styles.userAvatar}>
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                        </div>
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

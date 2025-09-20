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
                    <Link href="/" className={styles.logoLink}>
                        Social Community Platform
                    </Link>
                </div>

                <nav className={styles.nav}>
                    {isAuthenticated ? (
                        <div className={styles.userSection}>
                            <span className={styles.welcome}>
                                Xin chào, <strong>{user?.name || 'User'}</strong>
                            </span>
                            <Button
                                type="secondary"
                                onClick={handleLogout}
                                className={styles.logoutBtn}
                            >
                                Đăng xuất
                            </Button>
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

import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../Common/Button";

import styles from "./Homepage.module.scss";

const Homepage = () => {
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles.homepage}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Chào mừng đến với Social Community Platform
                </h1>

                {isAuthenticated ? (
                    <div className={styles.authenticatedContent}>
                        <div className={styles.userInfo}>
                            <h2>Thông tin người dùng</h2>
                            <div className={styles.infoCard}>
                                <p><strong>Tên:</strong> {user?.name}</p>
                                <p><strong>Email:</strong> {user?.email}</p>
                                <p><strong>Vai trò:</strong> {user?.role}</p>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Button type="primary" onClick={() => window.location.href = '/posts'}>
                                Xem danh sách bài viết
                            </Button>
                            <Button type="secondary" onClick={handleLogout}>
                                Đăng xuất
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.unauthenticatedContent}>
                        <p className={styles.description}>
                            Vui lòng đăng nhập để truy cập các tính năng của Social Community Platform.
                        </p>
                        <div className={styles.actions}>
                            <Button
                                type="primary"
                                onClick={() => window.location.href = '/login'}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                type="secondary"
                                onClick={() => window.location.href = '/register'}
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homepage;

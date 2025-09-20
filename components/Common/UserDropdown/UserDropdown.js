import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

import { useAuth } from "../../../hooks/useAuth";
import styles from "./UserDropdown.module.scss";

const UserDropdown = () => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        router.push("/");
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <button className={styles.userButton} onClick={toggleDropdown}>
                <div className={styles.userAvatar}>
                    {user?.name?.charAt(0) || "U"}
                </div>
                <div className={styles.chevron}>
                    {isOpen ? "▲" : "▼"}
                </div>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatarLarge}>
                            {user?.name?.charAt(0) || "U"}
                        </div>
                        <div className={styles.userDetails}>
                            <div className={styles.userName}>{user?.name || "User"}</div>
                            <div className={styles.userUsername}>@{user?.username || "username"}</div>
                        </div>
                        <div className={styles.chevronRight}>›</div>
                    </div>

                    <div className={styles.premiumBanner}>
                        <div className={styles.premiumIcon}>💎</div>
                        <div className={styles.premiumText}>Get Premium to maximize your earnings</div>
                    </div>

                    <div className={styles.missionsSection}>
                        <div className={styles.missionsIcon}>📋</div>
                        <div className={styles.missionsContent}>
                            <div className={styles.missionsTitle}>Your missions</div>
                            <div className={styles.missionsStatus}>DAILY (1/2)</div>
                        </div>
                        <div className={styles.missionsDot}>•</div>
                    </div>

                    <div className={styles.menuItems}>
                        <Link href="/manage-content" className={styles.menuItem}>
                            <div className={styles.menuIcon}>📄</div>
                            <span>Manage Content</span>
                        </Link>

                        <Link href="/account-plan" className={styles.menuItem}>
                            <div className={styles.menuIcon}>🚀</div>
                            <span>Account Plan</span>
                        </Link>

                        <Link href="/settings" className={styles.menuItem}>
                            <div className={styles.menuIcon}>⚙️</div>
                            <span>Setting & privacy</span>
                            <div className={styles.chevronRight}>›</div>
                        </Link>

                        <Link href="/help" className={styles.menuItem}>
                            <div className={styles.menuIcon}>❓</div>
                            <span>Help Center</span>
                        </Link>

                        <Link href="/switch-profile" className={styles.menuItem}>
                            <div className={styles.menuIcon}>👥</div>
                            <span>Switch Profile</span>
                            <div className={styles.chevronRight}>›</div>
                        </Link>

                        <button className={styles.menuItem} onClick={handleLogout}>
                            <div className={styles.menuIcon}>🚪</div>
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../../../hooks/useAuth";

import styles from "./UserDropdown.module.scss";

const UserDropdown = () => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [ isOpen, setIsOpen ] = useState(false);
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
                <div className={styles.userAvatar}>{user?.name?.charAt(0) || "U"}</div>
                <div className={styles.chevron}>{isOpen ? "▲" : "▼"}</div>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatarLarge}>{user?.name?.charAt(0) || "U"}</div>
                        <div className={styles.userDetails}>
                            <div className={styles.userName}>{user?.name || "User"}</div>
                            <div className={styles.userUsername}>
                                @{user?.username || "username"}
                            </div>
                        </div>
                        <div className={styles.chevronRight}>›</div>
                    </div>

                    <div className={styles.menuItems}>
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

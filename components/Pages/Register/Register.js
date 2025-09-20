import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from "../../../hooks/useAuth";
import AuthLeftPanel from "../../Common/AuthLeftPanel";

import styles from "./Register.module.scss";

const Register = () => {
    const router = useRouter();
    const { isAuthenticated, loading, register } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, loading, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.name) {
            newErrors.name = "Tên là bắt buộc";
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = "Email là bắt buộc";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu là bắt buộc";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        });

        if (result.success) {
            router.push("/");
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    fontSize: "1.6rem",
                }}
            >
                Đang kiểm tra xác thực...
            </div>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.registerPage}>
            <AuthLeftPanel />

            <div className={styles.rightPanel}>
                <div className={styles.registerCard}>
                    <h1 className={styles.registerTitle}>Sign up to Beincom</h1>
                    <p className={styles.registerSubtitle}>Create your account to join our community.</p>

                    <div className={styles.socialLogin}>
                        <button className={`${styles.socialBtn} ${styles.google}`}>
                            <div className={styles.icon}></div>
                            Google
                        </button>
                        <button className={`${styles.socialBtn} ${styles.facebook}`}>
                            <div className={styles.icon}></div>
                            Facebook
                        </button>
                        <button className={`${styles.socialBtn} ${styles.twitter}`}>
                            <div className={styles.icon}></div>
                            X
                        </button>
                    </div>

                    <div className={styles.divider}>
                        <span>or</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Your full name"
                            />
                            {errors.name && <span style={{ color: "var(--error-color)", fontSize: "1.2rem" }}>{errors.name}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Your email"
                            />
                            {errors.email && <span style={{ color: "var(--error-color)", fontSize: "1.2rem" }}>{errors.email}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Password</label>
                            <div className={styles.passwordInput}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="Your password"
                                />
                                <button
                                    type="button"
                                    className={styles.toggleBtn}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                            {errors.password && <span style={{ color: "var(--error-color)", fontSize: "1.2rem" }}>{errors.password}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Confirm Password</label>
                            <div className={styles.passwordInput}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className={styles.toggleBtn}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                            {errors.confirmPassword && <span style={{ color: "var(--error-color)", fontSize: "1.2rem" }}>{errors.confirmPassword}</span>}
                        </div>

                        <button type="submit" className={styles.registerBtn}>
                            Sign Up
                        </button>
                    </form>

                    <p className={styles.loginLink}>
                        Already have an account? <Link href="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

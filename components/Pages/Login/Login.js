import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../../../hooks/useAuth";
import AuthLeftPanel from "../../Common/AuthLeftPanel";

import styles from "./Login.module.scss";

const Login = () => {
    const router = useRouter();
    const { isAuthenticated, loading, login } = useAuth();
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    });
    const [ errors, setErrors ] = useState({});
    const [ showPassword, setShowPassword ] = useState(false);

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.push("/");
        }
    }, [ isAuthenticated, loading, router ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setErrors({
                email: !formData.email ? "Email is required" : "",
                password: !formData.password ? "Password is required" : "",
            });
            return;
        }

        const result = await login({
            email: formData.email,
            password: formData.password,
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
        <div className={styles.loginPage}>
            <AuthLeftPanel />

            <div className={styles.rightPanel}>
                <div className={styles.loginCard}>
                    <h1 className={styles.loginTitle}>Log in to Beincom</h1>
                    <p className={styles.loginSubtitle}>
                        Enter your credentials to access your account.
                    </p>

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
                            <div className={styles.icon}></div>X
                        </button>
                    </div>

                    <div className={styles.divider}>
                        <span>or</span>
                    </div>

                    <form onSubmit={handleSubmit}>
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
                            {errors.email && (
                                <span style={{ color: "var(--error-color)", fontSize: "1.2rem" }}>
                                    {errors.email}
                                </span>
                            )}
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
                            {errors.password && (
                                <span style={{ color: "var(--error-color)", fontSize: "1.2rem" }}>
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <button type="submit" className={styles.loginBtn}>
                            Log In
                        </button>
                    </form>

                    <Link href="/forgot-password" className={styles.forgotPassword}>
                        Forgot password?
                    </Link>

                    <p className={styles.signupLink}>
                        Dont have an account? <Link href="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

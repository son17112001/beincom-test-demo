import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../../../hooks/useAuth";
import { validateEmail, validatePassword } from "../../../utils/validation";
import AuthLeftPanel from "../../Common/AuthLeftPanel";
import Button from "../../Common/Button";
import InputField from "../../Common/InputField";
import PasswordField from "../../Common/PasswordField";

import styles from "./Login.module.scss";

const Login = () => {
    const router = useRouter();
    const { isAuthenticated, loading, login } = useAuth();

    // Form state
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    });

    // Validation errors
    const [ errors, setErrors ] = useState({
        email: null,
        password: null,
    });

    // Loading state
    const [ isLoading, setIsLoading ] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Real-time validation
        let error = null;
        switch (field) {
            case "email":
                error = validateEmail(value);
                break;
            case "password":
                error = validatePassword(value);
                break;
            default:
                break;
        }

        setErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
        };

        setErrors(newErrors);

        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some((error) => error !== null);
        if (hasErrors) return;

        // Set loading state
        setIsLoading(true);

        try {
            // Submit form
            const result = await login(formData);
            if (result.success) {
                router.push("/");
            }
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
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

                    {/* Temporarily hidden social login */}
                    {/* <div className={styles.socialLogin}>
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
                    </div> */}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            error={errors.email}
                            required
                        />

                        <PasswordField
                            label="Password"
                            placeholder="Your password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            error={errors.password}
                            required
                            showRequirements={true}
                        />

                        <Button
                            type="submit"
                            buttonType="submit"
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Log In"}
                        </Button>
                    </form>

                    {/* Temporarily hidden forgot password */}
                    {/* <Link href="/forgot-password" className={styles.forgotPassword}>
                        Forgot password?
                    </Link> */}

                    <p className={styles.signupLink}>
                        Dont have an account? <Link href="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

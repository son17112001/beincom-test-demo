import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../../../hooks/useAuth";
import {
    validateEmail,
    validateFullName,
    validatePassword,
    validateUsername,
} from "../../../utils/validation";
import AuthLeftPanel from "../../Common/AuthLeftPanel";
import Button from "../../Common/Button";
import InputField from "../../Common/InputField";
import PasswordField from "../../Common/PasswordField";

import styles from "./Register.module.scss";

const Register = () => {
    const router = useRouter();
    const { isAuthenticated, loading, register } = useAuth();

    const [ formData, setFormData ] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });

    const [ errors, setErrors ] = useState({
        email: null,
        username: null,
        fullName: null,
        password: null,
    });

    const [ isLoading, setIsLoading ] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        let error = null;
        switch (field) {
            case "email":
                error = validateEmail(value);
                break;
            case "username":
                error = validateUsername(value);
                break;
            case "fullName":
                error = validateFullName(value);
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

        const newErrors = {
            email: validateEmail(formData.email),
            username: validateUsername(formData.username),
            fullName: validateFullName(formData.fullName),
            password: validatePassword(formData.password),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error !== null);
        if (hasErrors) return;

        setIsLoading(true);

        try {
            const result = await register(formData);
            if (result.success) {
                router.push("/");
            }
        } catch (error) {
            console.error("Registration error:", error);
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
        <div className={styles.registerPage}>
            <AuthLeftPanel />

            <div className={styles.rightPanel}>
                <div className={styles.registerCard}>
                    <h1 className={styles.registerTitle}>Sign up to Beincom</h1>
                    <p className={styles.registerSubtitle}>
                        Create your account to join our community.
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

                        <InputField
                            label="Username"
                            type="text"
                            placeholder="Your username"
                            value={formData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            error={errors.username}
                            required
                        />

                        <InputField
                            label="Full name"
                            type="text"
                            placeholder="Your full name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            error={errors.fullName}
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
                            {isLoading ? "Signing up..." : "Sign Up"}
                        </Button>
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

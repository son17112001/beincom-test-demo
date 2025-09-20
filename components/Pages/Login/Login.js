import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import PasswordInput, { PasswordField } from "@/components/Common/PasswordInput";

import { useAuth } from "../../../hooks/useAuth";
import AuthLeftPanel from "../../Common/AuthLeftPanel";
import Button from "../../Common/Button";
import { Form, useForm } from "../../Common/Form";
import { InputField } from "../../Common/Input";

import styles from "./Login.module.scss";

const Login = () => {
    const router = useRouter();
    const { isAuthenticated, loading, login } = useAuth();
    const [ form ] = useForm();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.push("/");
        }
    }, [ isAuthenticated, loading, router ]);

    const handleSubmit = async (values) => {
        const result = await login({
            email: values.email,
            password: values.password,
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

                    <Form
                        form={form}
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onFinish={handleSubmit}
                    >
                        <div className={styles.formGroup}>
                            <InputField
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Your email"
                                required
                            />
                            <PasswordField
                                name="password"
                                label="Password"
                                placeholder="Your password"
                                required
                            />
                            <Button type="submit" buttonType="submit" fullWidth>
                                Log In
                            </Button>
                        </div>
                    </Form>

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

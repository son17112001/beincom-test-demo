import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { PasswordField } from "@/components/Common/PasswordInput";

import { useAuth } from "../../../hooks/useAuth";
import AuthLeftPanel from "../../Common/AuthLeftPanel";
import Button from "../../Common/Button";
import { Form, useForm } from "../../Common/Form";
import { InputField } from "../../Common/Input";

import styles from "./Register.module.scss";

const Register = () => {
    const router = useRouter();
    const { isAuthenticated, loading, register } = useAuth();
    const [ form ] = useForm();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.push("/");
        }
    }, [ isAuthenticated, loading, router ]);

    const handleSubmit = async (values) => {
        console.log(values);
        const result = await register({
            email: values.email,
            username: values.username,
            fullName: values.fullName,
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
        <div className={styles.registerPage}>
            <AuthLeftPanel />

            <div className={styles.rightPanel}>
                <div className={styles.registerCard}>
                    <h1 className={styles.registerTitle}>Sign up to Beincom</h1>
                    <p className={styles.registerSubtitle}>
                        Create your account to join our community.
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
                            username: "",
                            fullName: "",
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

                            <InputField
                                name="username"
                                label="Username"
                                type="text"
                                placeholder="Your username"
                                required
                            />

                            <InputField
                                name="fullName"
                                label="Full name"
                                type="text"
                                placeholder="Your full name"
                                required
                            />

                            <PasswordField
                                name="password"
                                label="Password"
                                placeholder="Your password"
                                required
                            />

                            <Button type="submit" buttonType="submit" fullWidth>
                                Sign Up
                            </Button>
                        </div>
                    </Form>

                    <p className={styles.loginLink}>
                        Already have an account? <Link href="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

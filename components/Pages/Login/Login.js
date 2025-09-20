import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../../../hooks/useAuth";
import AuthForm from "../../Common/AuthForm";

const Login = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.push("/");
        }
    }, [ isAuthenticated, loading, router ]);

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

    return <AuthForm type="login" />;
};

export default Login;

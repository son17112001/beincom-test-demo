import Head from "next/head";
import Login from "../components/pages/Login";

export default function LoginPage() {
    return (
        <>
            <Head>
                <title>Đăng nhập - Social Community Platform</title>
                <meta name="description" content="Đăng nhập vào Social Community Platform" />
            </Head>
            <Login />
        </>
    );
}

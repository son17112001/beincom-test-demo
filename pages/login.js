import Head from "next/head";

import Login from "@/components/pages/Login/Login";

import Layout from "../components/layouts/Layout/Layout";

export default function LoginPage() {
    return (
        <Layout title="Đăng nhập - Social Community Platform">
            <Head>
                <title>Đăng nhập - Social Community Platform</title>
                <meta name="description" content="Đăng nhập vào Social Community Platform" />
            </Head>
            <Login />
        </Layout>
    );
}

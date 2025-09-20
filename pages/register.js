import Head from "next/head";

import Layout from "../components/layouts/Layout/Layout";
import Register from "../components/pages/Register";

export default function RegisterPage() {
    return (
        <Layout title="Đăng ký - Social Community Platform">
            <Head>
                <title>Đăng ký - Social Community Platform</title>
                <meta name="description" content="Đăng ký tài khoản mới trên Social Community Platform" />
            </Head>
            <Register />
        </Layout>
    );
}

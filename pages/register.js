import Head from "next/head";

import Register from "@/components/Pages/Register";

export default function RegisterPage() {
    return (
        <>
            <Head>
                <title>Đăng ký - Social Community Platform</title>
                <meta
                    name="description"
                    content="Đăng ký tài khoản mới trên Social Community Platform"
                />
            </Head>
            <Register />
        </>
    );
}

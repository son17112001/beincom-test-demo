import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import AuthForm from '../components/Common/AuthForm';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.6rem'
            }}>
                Đang kiểm tra xác thực...
            </div>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Đăng nhập - Next.js Admin Template</title>
                <meta name="description" content="Đăng nhập vào hệ thống quản trị" />
            </Head>
            <AuthForm type="login" />
        </>
    );
}

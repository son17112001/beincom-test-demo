import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import AuthForm from '../components/Common/AuthForm';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
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
                <title>Đăng ký - Next.js Admin Template</title>
                <meta name="description" content="Đăng ký tài khoản mới" />
            </Head>
            <AuthForm type="register" />
        </>
    );
}

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

import { useAuth } from '../../../hooks/useAuth';

const ProtectedRoute = ({ children, fallback = null }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            toast.error('Vui lòng đăng nhập để truy cập trang này');
            router.push('/login');
        }
    }, [ isAuthenticated, loading, router ]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.6rem',
            }}>
                Đang kiểm tra xác thực...
            </div>
        );
    }

    if (!isAuthenticated) {
        return fallback;
    }

    return children;
};

export default ProtectedRoute;

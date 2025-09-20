import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/Common/ProtectedRoute';
import Button from '../components/Common/Button';
import { authCookie } from '../utils/cookie';

export default function TestCookie() {
    const { user, isAuthenticated, logout } = useAuth();

    const handleCheckCookie = () => {
        const token = authCookie.get();
        const isAuth = authCookie.isAuthenticated();
        alert(`Token: ${token}\nIs Authenticated: ${isAuth}`);
    };

    return (
        <ProtectedRoute>
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1>Test Cookie Authentication</h1>

                <div style={{
                    background: '#f5f5f5',
                    padding: '2rem',
                    borderRadius: '8px',
                    marginBottom: '2rem'
                }}>
                    <h2>Authentication Status</h2>
                    <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
                    <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'None'}</p>
                </div>

                <div style={{
                    background: '#e8f5e8',
                    padding: '2rem',
                    borderRadius: '8px',
                    marginBottom: '2rem'
                }}>
                    <h2>Cookie Test Actions</h2>
                    <Button onClick={handleCheckCookie} type="primary" style={{ marginRight: '1rem' }}>
                        Check Cookie
                    </Button>
                    <Button onClick={logout} type="secondary">
                        Logout
                    </Button>
                </div>

                <div style={{
                    background: '#fff3cd',
                    padding: '2rem',
                    borderRadius: '8px'
                }}>
                    <h2>Cookie Authentication Benefits</h2>
                    <ul>
                        <li>✅ Works with SSR (Server-Side Rendering)</li>
                        <li>✅ More secure than localStorage</li>
                        <li>✅ Automatic expiration (7 days)</li>
                        <li>✅ HttpOnly option available</li>
                        <li>✅ SameSite protection</li>
                        <li>✅ Secure flag in production</li>
                    </ul>
                </div>
            </div>
        </ProtectedRoute>
    );
}

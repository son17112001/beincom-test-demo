import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/Common/ProtectedRoute';
import Button from '../components/Common/Button';

export default function TestAuth() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <ProtectedRoute>
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1>Test Authentication</h1>

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
                    <h2>Test Actions</h2>
                    <Button onClick={logout} type="secondary">
                        Logout
                    </Button>
                </div>

                <div style={{
                    background: '#fff3cd',
                    padding: '2rem',
                    borderRadius: '8px'
                }}>
                    <h2>Instructions</h2>
                    <ol>
                        <li>Try accessing this page without being logged in - you should be redirected to /login</li>
                        <li>Login with admin@example.com / password</li>
                        <li>You should see your user information above</li>
                        <li>Try logging out and logging back in</li>
                    </ol>
                </div>
            </div>
        </ProtectedRoute>
    );
}

import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/Common/ProtectedRoute';
import Button from '../components/Common/Button';
import { authCookie } from '../utils/cookie';
import { jwtUtils } from '../utils/jwt';

export default function TestJWT() {
    const { user, isAuthenticated, logout } = useAuth();

    const handleCheckJWT = () => {
        const token = authCookie.get();
        if (token) {
            const decoded = jwtUtils.decodeToken(token);
            const isExpired = jwtUtils.isTokenExpired(token);
            const expiration = jwtUtils.getTokenExpiration(token);

            alert(`JWT Token Info:
Token: ${token.substring(0, 50)}...
Decoded: ${JSON.stringify(decoded, null, 2)}
Expired: ${isExpired}
Expires: ${expiration ? expiration.toLocaleString() : 'Unknown'}`);
        } else {
            alert('No JWT token found');
        }
    };

    const handleVerifyJWT = async () => {
        const token = authCookie.get();
        if (token) {
            try {
                const response = await fetch('/api/auth/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                alert(`JWT Verification Result:
Status: ${response.ok ? 'Valid' : 'Invalid'}
Message: ${data.message}
User: ${JSON.stringify(data.user, null, 2)}`);
            } catch (error) {
                alert(`JWT Verification Error: ${error.message}`);
            }
        } else {
            alert('No JWT token found');
        }
    };

    return (
        <ProtectedRoute>
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1>Test JWT Authentication</h1>

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
                    <h2>JWT Test Actions</h2>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Button onClick={handleCheckJWT} type="primary">
                            Check JWT Token
                        </Button>
                        <Button onClick={handleVerifyJWT} type="secondary">
                            Verify JWT Token
                        </Button>
                        <Button onClick={logout} type="secondary">
                            Logout
                        </Button>
                    </div>
                </div>

                <div style={{
                    background: '#fff3cd',
                    padding: '2rem',
                    borderRadius: '8px'
                }}>
                    <h2>JWT Features</h2>
                    <ul>
                        <li>✅ Real JWT tokens with signature verification</li>
                        <li>✅ Token expiration (7 days)</li>
                        <li>✅ Issuer and audience validation</li>
                        <li>✅ Secure token generation</li>
                        <li>✅ Automatic token validation</li>
                        <li>✅ Token payload with user info</li>
                        <li>✅ Refresh token support</li>
                    </ul>
                </div>

                <div style={{
                    background: '#d1ecf1',
                    padding: '2rem',
                    borderRadius: '8px',
                    marginTop: '2rem'
                }}>
                    <h2>JWT Token Structure</h2>
                    <p>JWT tokens consist of three parts separated by dots:</p>
                    <ul>
                        <li><strong>Header:</strong> Algorithm and token type</li>
                        <li><strong>Payload:</strong> Claims (user data, expiration, etc.)</li>
                        <li><strong>Signature:</strong> Verifies token authenticity</li>
                    </ul>
                    <p>Example: <code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5OTk5OTl9.signature</code></p>
                </div>
            </div>
        </ProtectedRoute>
    );
}

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { authCookie } from '../utils/cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = authCookie.get();
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        authCookie.remove();
        setUser(null);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      authCookie.remove();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        authCookie.set(data.token);
        setUser(data.user);
        toast.success('Đăng nhập thành công!');
        router.push('/');
        return { success: true };
      } else {
        toast.error(data.message || 'Đăng nhập thất bại');
        return { success: false, error: data.message || 'Invalid credentials' };
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đăng nhập');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
        router.push('/login');
        return { success: true };
      } else {
        toast.error(data.message || 'Đăng ký thất bại');
        return { success: false, error: data.message || 'Registration failed' };
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đăng ký');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authCookie.remove();
    setUser(null);
    toast.success('Đã đăng xuất');
    router.push('/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

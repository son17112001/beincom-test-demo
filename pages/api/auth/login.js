import { jwtUtils } from '../../../utils/jwt';
import { findUserByEmail } from '../../../utils/userStorage';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email và mật khẩu là bắt buộc',
        });
    }

    try {
        const user = findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: 'Email hoặc mật khẩu không đúng',
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: 'Email hoặc mật khẩu không đúng',
            });
        }

        const tokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            iat: Math.floor(Date.now() / 1000),
        };

        const token = jwtUtils.generateToken(tokenPayload);

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        return res.status(200).json({
            message: 'Đăng nhập thành công',
            token,
            user: userData,
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: 'Có lỗi xảy ra khi đăng nhập',
        });
    }
}

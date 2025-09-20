import { jwtUtils } from "../../../utils/jwt";
import { addUser,findUserByEmail } from "../../../utils/userStorage";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            message: "Tất cả các trường là bắt buộc",
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Mật khẩu xác nhận không khớp",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Mật khẩu phải có ít nhất 6 ký tự",
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Email không hợp lệ",
        });
    }

    try {
        const existingUser = findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                message: "Email đã được sử dụng",
            });
        }

        const newUser = addUser({
            email,
            password,
            name,
            role: "user",
        });

        const tokenPayload = {
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role,
            iat: Math.floor(Date.now() / 1000),
        };

        const token = jwtUtils.generateToken(tokenPayload);

        const userData = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        };

        return res.status(201).json({
            message: "Đăng ký thành công!",
            token,
            user: userData,
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "Có lỗi xảy ra khi đăng ký",
        });
    }
}

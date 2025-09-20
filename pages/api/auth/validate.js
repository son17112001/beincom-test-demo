import { jwtUtils } from "../../../utils/jwt";
import { findUserById } from "../../../utils/userStorage";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token không hợp lệ",
        });
    }

    const token = authHeader.substring(7);

    try {
        const decoded = jwtUtils.verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                message: "Token không hợp lệ hoặc đã hết hạn",
            });
        }

        if (jwtUtils.isTokenExpired(token)) {
            return res.status(401).json({
                message: "Token đã hết hạn",
            });
        }

        const userData = findUserById(decoded.userId);

        if (!userData) {
            return res.status(401).json({
                message: "User không tồn tại",
            });
        }

        const user = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
        };

        return res.status(200).json({
            message: "Token hợp lệ",
            user,
        });
    } catch (error) {
        console.error("Token validation error:", error);
        return res.status(401).json({
            message: "Token không hợp lệ hoặc đã hết hạn",
        });
    }
}

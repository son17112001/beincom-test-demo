import jwt from "jsonwebtoken";

const JWT_CONFIG = {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    expiresIn: "7d",
    issuer: "nextjs-admin-template",
    audience: "nextjs-admin-users",
};

export const jwtUtils = {
    generateToken: (payload) => {
        try {
            return jwt.sign(payload, JWT_CONFIG.secret, {
                expiresIn: JWT_CONFIG.expiresIn,
                issuer: JWT_CONFIG.issuer,
                audience: JWT_CONFIG.audience,
            });
        } catch (error) {
            console.error("JWT generation error:", error);
            throw new Error("Failed to generate token");
        }
    },

    verifyToken: (token) => {
        try {
            return jwt.verify(token, JWT_CONFIG.secret, {
                issuer: JWT_CONFIG.issuer,
                audience: JWT_CONFIG.audience,
            });
        } catch (error) {
            console.error("JWT verification error:", error);
            return null;
        }
    },

    decodeToken: (token) => {
        try {
            return jwt.decode(token);
        } catch (error) {
            console.error("JWT decode error:", error);
            return null;
        }
    },

    isTokenExpired: (token) => {
        try {
            const decoded = jwt.decode(token);
            if (!decoded || !decoded.exp) return true;

            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        } catch (error) {
            console.error("JWT expiration check error:", error);
            return true;
        }
    },

    getTokenExpiration: (token) => {
        try {
            const decoded = jwt.decode(token);
            if (!decoded || !decoded.exp) return null;

            return new Date(decoded.exp * 1000);
        } catch (error) {
            console.error("JWT expiration time error:", error);
            return null;
        }
    },

    generateRefreshToken: (payload) => {
        try {
            return jwt.sign(payload, JWT_CONFIG.secret, {
                expiresIn: "30d",
                issuer: JWT_CONFIG.issuer,
                audience: JWT_CONFIG.audience,
            });
        } catch (error) {
            console.error("Refresh token generation error:", error);
            throw new Error("Failed to generate refresh token");
        }
    },

    verifyRefreshToken: (token) => {
        try {
            return jwt.verify(token, JWT_CONFIG.secret, {
                issuer: JWT_CONFIG.issuer,
                audience: JWT_CONFIG.audience,
            });
        } catch (error) {
            console.error("Refresh token verification error:", error);
            return null;
        }
    },
};

export default jwtUtils;

export const errorCodes = {
    // Authentication errors
    AUTH_INVALID_CREDENTIALS: {
        message: "Email hoặc mật khẩu không đúng",
        field: "password"
    },
    AUTH_USER_NOT_FOUND: {
        message: "Tài khoản không tồn tại",
        field: "email"
    },
    AUTH_EMAIL_ALREADY_EXISTS: {
        message: "Email đã được sử dụng",
        field: "email"
    },
    AUTH_WEAK_PASSWORD: {
        message: "Mật khẩu quá yếu",
        field: "password"
    },
    AUTH_PASSWORDS_DO_NOT_MATCH: {
        message: "Mật khẩu xác nhận không khớp",
        field: "confirmPassword"
    },

    // Validation errors
    VALIDATION_REQUIRED: {
        message: "Trường này là bắt buộc"
    },
    VALIDATION_INVALID_EMAIL: {
        message: "Email không hợp lệ",
        field: "email"
    },
    VALIDATION_INVALID_PHONE: {
        message: "Số điện thoại không hợp lệ",
        field: "phone"
    },

    // Server errors
    SERVER_ERROR: {
        message: "Có lỗi xảy ra, vui lòng thử lại sau"
    },
    SERVER_UNAVAILABLE: {
        message: "Hệ thống đang bảo trì, vui lòng thử lại sau"
    },

    // Network errors
    NETWORK_ERROR: {
        message: "Lỗi kết nối mạng, vui lòng kiểm tra kết nối"
    },
    TIMEOUT_ERROR: {
        message: "Hết thời gian chờ, vui lòng thử lại"
    }
};

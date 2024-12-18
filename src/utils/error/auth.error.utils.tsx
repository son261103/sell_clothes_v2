// Trả về mã HTTP tương ứng với ErrorCode liên quan đến Auth
import {ErrorCode, ErrorResponse} from "../../types/error.types.tsx";

export const getHttpStatusFromAuthErrorCode = (code: ErrorCode): number => {
    switch (code) {
        // Lỗi xác thực (4xx)
        case ErrorCode.INVALID_CREDENTIALS:
        case ErrorCode.TOKEN_EXPIRED:
        case ErrorCode.INVALID_TOKEN:
            return 401;
        case ErrorCode.UNAUTHORIZED:
            return 401;
        case ErrorCode.FORBIDDEN:
        case ErrorCode.INSUFFICIENT_PERMISSIONS:
            return 403;

        // Lỗi đăng ký
        case ErrorCode.USERNAME_EXISTS:
        case ErrorCode.EMAIL_EXISTS:
        case ErrorCode.INVALID_EMAIL:
        case ErrorCode.WEAK_PASSWORD:
        case ErrorCode.INVALID_USERNAME:
            return 400;

        // Mặc định
        default:
            return 500;
    }
};

// Trả về thông báo lỗi tương ứng với ErrorCode liên quan đến Auth
export const getAuthErrorMessage = (code: ErrorCode): string => {
    switch (code) {
        case ErrorCode.INVALID_CREDENTIALS:
            return 'Tên đăng nhập hoặc mật khẩu không đúng';
        case ErrorCode.TOKEN_EXPIRED:
            return 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
        case ErrorCode.INVALID_TOKEN:
            return 'Token không hợp lệ';
        case ErrorCode.UNAUTHORIZED:
            return 'Bạn cần đăng nhập để thực hiện chức năng này';
        case ErrorCode.FORBIDDEN:
            return 'Bạn không có quyền thực hiện chức năng này';
        case ErrorCode.INSUFFICIENT_PERMISSIONS:
            return 'Bạn không đủ quyền để thực hiện chức năng này';
        case ErrorCode.USERNAME_EXISTS:
            return 'Tên đăng nhập đã tồn tại';
        case ErrorCode.EMAIL_EXISTS:
            return 'Email đã được sử dụng';
        case ErrorCode.INVALID_EMAIL:
            return 'Email không hợp lệ';
        case ErrorCode.WEAK_PASSWORD:
            return 'Mật khẩu không đủ mạnh';
        case ErrorCode.INVALID_USERNAME:
            return 'Tên đăng nhập không hợp lệ';
        case ErrorCode.USER_NOT_FOUND:
            return 'Không tìm thấy người dùng';
        case ErrorCode.USER_DISABLED:
            return 'Tài khoản đã bị vô hiệu hóa';
        default:
            return 'Lỗi xác thực không xác định';
    }
};

// Định dạng lỗi liên quan đến Auth
export const formatAuthError = (error: unknown): ErrorResponse => {
    const timestamp = new Date().toISOString();

    if (error instanceof Error) {
        return {
            message: error.message || getAuthErrorMessage(ErrorCode.UNKNOWN_ERROR),
            code: ErrorCode.UNKNOWN_ERROR,
            status: 500,
            timestamp
        };
    }

    return {
        message: getAuthErrorMessage(ErrorCode.UNKNOWN_ERROR),
        code: ErrorCode.UNKNOWN_ERROR,
        status: 500,
        timestamp
    };
};

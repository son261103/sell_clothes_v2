import { ErrorCode, ErrorResponse, NetworkErrorResponse } from "../../types/error.types.tsx";

// Trả về mã HTTP tương ứng với ErrorCode
export const getHttpStatusFromErrorCode = (code: ErrorCode): number => {
    switch (code) {
        // Lỗi xác thực (4xx)
        case ErrorCode.USER_NOT_FOUND:
        case ErrorCode.NOT_FOUND:
            return 404;

        // Lỗi xác thực đầu vào (4xx)
        case ErrorCode.VALIDATION_ERROR:
        case ErrorCode.BAD_REQUEST:
            return 400;

        // Lỗi máy chủ (5xx)
        case ErrorCode.SERVER_ERROR:
            return 500;
        case ErrorCode.SERVICE_UNAVAILABLE:
            return 503;

        // Mặc định cho các lỗi không xác định
        default:
            return 500;
    }
};

// Trả về thông báo lỗi tương ứng với ErrorCode
export const getErrorMessage = (code: ErrorCode): string => {
    switch (code) {
        case ErrorCode.NOT_FOUND:
            return 'Không tìm thấy tài nguyên yêu cầu';
        case ErrorCode.SERVER_ERROR:
            return 'Lỗi máy chủ, vui lòng thử lại sau';
        case ErrorCode.VALIDATION_ERROR:
            return 'Dữ liệu không hợp lệ';
        case ErrorCode.UNKNOWN_ERROR:
        default:
            return 'Đã xảy ra lỗi không xác định';
    }
};

// Kiểm tra xem lỗi có phải là lỗi mạng không
const isNetworkError = (error: unknown): error is NetworkErrorResponse => {
    return Boolean(
        error &&
        typeof error === 'object' &&
        'isAxiosError' in error &&
        'response' in error &&
        error['response'] !== null &&
        typeof error['response'] === 'object' &&
        'status' in error['response'] // Đảm bảo rằng có thuộc tính 'status' trong response
    );
};

// Định dạng lỗi về một đối tượng lỗi chuẩn
export const formatError = (error: unknown): ErrorResponse => {
    const timestamp = new Date().toISOString();

    // Kiểm tra nếu lỗi là mạng và xử lý
    if (isNetworkError(error)) {
        const responseData = error.response?.data || {};
        return {
            message: responseData.message || getErrorMessage(ErrorCode.UNKNOWN_ERROR),
            code: responseData.code || ErrorCode.UNKNOWN_ERROR,
            status: error.response?.status || 500,
            details: responseData,
            timestamp,
            path: error.config?.url || ''
        };
    }

    // Trường hợp lỗi không phải mạng
    return {
        message: getErrorMessage(ErrorCode.UNKNOWN_ERROR),
        code: ErrorCode.UNKNOWN_ERROR,
        status: 500,
        timestamp
    };
};

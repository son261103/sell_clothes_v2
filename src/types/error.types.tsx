// Enum chứa các mã lỗi
export enum ErrorCode {
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    INVALID_TOKEN = 'INVALID_TOKEN',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_DISABLED = 'USER_DISABLED',
    USER_LOCKED = 'USER_LOCKED',
    USERNAME_EXISTS = 'USERNAME_EXISTS',
    EMAIL_EXISTS = 'EMAIL_EXISTS',
    INVALID_EMAIL = 'INVALID_EMAIL',
    WEAK_PASSWORD = 'WEAK_PASSWORD',
    INVALID_USERNAME = 'INVALID_USERNAME',
    PASSWORD_RESET_EXPIRED = 'PASSWORD_RESET_EXPIRED',
    INVALID_RESET_TOKEN = 'INVALID_RESET_TOKEN',
    SAME_PASSWORD = 'SAME_PASSWORD',
    ADMIN_NOT_FOUND = 'ADMIN_NOT_FOUND',
    SUPER_ADMIN_EXISTS = 'SUPER_ADMIN_EXISTS',
    CANNOT_DELETE_SELF = 'CANNOT_DELETE_SELF',
    INVALID_ROLE = 'INVALID_ROLE',
    NETWORK_ERROR = 'NETWORK_ERROR',
    TIMEOUT = 'TIMEOUT',
    SERVER_ERROR = 'SERVER_ERROR',
    SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
    BAD_REQUEST = 'BAD_REQUEST',
    NOT_FOUND = 'NOT_FOUND',
    METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
    TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// Định nghĩa các interface cho các phản hồi lỗi
export interface ErrorResponse {
    message: string;
    code: ErrorCode;
    status: number;
    timestamp: string;
    path?: string;
    details?: unknown;
}

export interface NetworkErrorResponse {
    isAxiosError: boolean;
    response?: {
        status: number;
        data: {
            message?: string;
            code?: ErrorCode;
            [key: string]: unknown;
        };
    };
    config?: {
        url: string;
    };
}

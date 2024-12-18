export interface AuthRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    fullName: string;
    phone: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    username: string;
    email: string;
    fullName: string;
    roles: string[];
}

export interface ResetPasswordRequest {
    username: string;
    oldPassword: string;
    newPassword: string;
}

export interface ForceResetPasswordRequest {
    targetUsername: string;
    newPassword: string;
}

export interface SuperAdminRecoveryRequest {
    username: string;
    email: string;
    newPassword: string;
}

export interface SuperAdminPasswordChangeRequest {
    username: string;
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmedDefaultSuperAdmin: boolean;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface User {
    userId: number;
    username: string;
    email: string;
    fullName: string;
    phone: string;
    enabled: boolean;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
}
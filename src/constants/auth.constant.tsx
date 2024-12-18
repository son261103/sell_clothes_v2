// Constants for localStorage keys
export const TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

// Error messages
export const NETWORK_ERROR_MESSAGE = 'Network error occurred';
export const GENERIC_ERROR_MESSAGE = 'An error occurred';

// API Endpoints
export const API_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REGISTER_ADMIN: '/auth/register-admin',
    REGISTER_SUPER_ADMIN: '/auth/register-super-admin',
    RESET_PASSWORD: '/auth/reset-password',
    FORCE_RESET_PASSWORD: '/auth/force-reset-password',
    RECOVER_SUPER_ADMIN: '/auth/recover-super-admin',
    CHANGE_SUPER_ADMIN_PASSWORD: '/auth/change-super-admin-password',
    DELETE_ADMIN: '/auth/delete-admin',
    DELETE_SUPER_ADMIN: '/auth/delete-super-admin',
    UPDATE_ROLES: '/auth/update-roles',
    DISABLE_USER: '/auth/disable-user',
    ENABLE_USER: '/auth/enable-user',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
    CHANGE_PASSWORD: "/auth/change-password",
    SUPER_ADMIN_PASSWORD_CHANGE: "/auth/super-admin-password-change",
    SUPER_ADMIN_RECOVERY: "/auth/super-admin-recovery",
    VERIFY_TOKEN: "/auth/verify-token",


};

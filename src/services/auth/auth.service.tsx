import {
    AuthRequest,
    AuthResponse,
    ForceResetPasswordRequest, RefreshTokenRequest,
    RegisterRequest,
    ResetPasswordRequest, SuperAdminPasswordChangeRequest, SuperAdminRecoveryRequest
} from "../../types/auth.types.tsx";
import apiConfig from "../../config/api.config.tsx";
import {API_ENDPOINTS} from "../../constants/auth.constant.tsx";
import {clearTokens, getAuthHeader, getToken, setTokens} from "../../utils/auth.utils.tsx";
import axios from "axios";
import {formatAuthError, formatError, getAuthErrorMessage} from "../../utils/error";
import {ErrorCode} from "../../types/error.types.tsx";

class AuthService {

    async login(request: AuthRequest): Promise<AuthResponse> {
        try {
            const response = await apiConfig.post<AuthResponse>(
                API_ENDPOINTS.LOGIN,
                request
            );

            if (response.data.token && response.data.refreshToken) {
                setTokens(response.data.token, response.data.refreshToken);
            }

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = formatAuthError(error);
                throw new Error(getAuthErrorMessage(errorResponse.code as ErrorCode));
            }
            throw formatError(error);
        }
    }

    async register(request: RegisterRequest): Promise<AuthResponse> {
        try {
            const response = await apiConfig.post<AuthResponse>(
                API_ENDPOINTS.REGISTER,
                request
            );

            if (response.data.token && response.data.refreshToken) {
                setTokens(response.data.token, response.data.refreshToken);
            }

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = formatAuthError(error);
                throw new Error(getAuthErrorMessage(errorResponse.code as ErrorCode));
            }
            throw formatError(error);
        }
    }

    async registerAdmin(request: RegisterRequest): Promise<AuthResponse> {
        try {
            const response = await apiConfig.post<AuthResponse>(
                API_ENDPOINTS.REGISTER_ADMIN,
                request,
                { headers: getAuthHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = formatAuthError(error);
                throw new Error(getAuthErrorMessage(errorResponse.code as ErrorCode));
            }
            throw formatError(error);
        }
    }

    async registerSuperAdmin(request: RegisterRequest): Promise<AuthResponse> {
        try {
            const response = await apiConfig.post<AuthResponse>(
                API_ENDPOINTS.REGISTER_SUPER_ADMIN,
                request,
                { headers: getAuthHeader() }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = formatAuthError(error);
                throw new Error(getAuthErrorMessage(errorResponse.code as ErrorCode));
            }
            throw formatError(error);
        }
    }

    async resetPassword(request: ResetPasswordRequest): Promise<void> {
        try {
            await apiConfig.post(
                API_ENDPOINTS.RESET_PASSWORD,
                request,
                { headers: getAuthHeader() }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = formatAuthError(error);
                throw new Error(getAuthErrorMessage(errorResponse.code as ErrorCode));
            }
            throw formatError(error);
        }
    }

    async changePassword(oldPassword: string, newPassword: string): Promise<void> {
        try {
            await apiConfig.post(
                API_ENDPOINTS.CHANGE_PASSWORD,
                { oldPassword, newPassword },
                { headers: getAuthHeader() }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = formatAuthError(error);
                throw new Error(getAuthErrorMessage(errorResponse.code as ErrorCode));
            }
            throw formatError(error);
        }
    }

    async forceResetPassword(request: ForceResetPasswordRequest): Promise<void> {
        try {
            await apiConfig.post(
                API_ENDPOINTS.FORCE_RESET_PASSWORD,
                request,
                { headers: getAuthHeader() }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = formatAuthError(error);
                throw new Error(getAuthErrorMessage(errorResponse.code as ErrorCode));
            }
            throw formatError(error);
        }
    }

    async superAdminPasswordChange(request: SuperAdminPasswordChangeRequest): Promise<void> {
        try {
            await apiConfig.post(
                API_ENDPOINTS.SUPER_ADMIN_PASSWORD_CHANGE,
                request,
                { headers: getAuthHeader() }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = formatAuthError(error);
                throw new Error(getAuthErrorMessage(errorResponse.code as ErrorCode));
            }
            throw formatError(error);
        }
    }

    async superAdminRecovery(request: SuperAdminRecoveryRequest): Promise<void> {
        try {
            await apiConfig.post(
                API_ENDPOINTS.SUPER_ADMIN_RECOVERY,
                request,
                { headers: getAuthHeader() }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = formatAuthError(error);
                throw new Error(getAuthErrorMessage(errorResponse.code as ErrorCode));
            }
            throw formatError(error);
        }
    }

    async refreshToken(request: RefreshTokenRequest): Promise<AuthResponse> {
        try {
            const response = await apiConfig.post<AuthResponse>(
                API_ENDPOINTS.REFRESH_TOKEN,
                request
            );

            if (response.data.token && response.data.refreshToken) {
                setTokens(response.data.token, response.data.refreshToken);
            }

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorResponse = formatAuthError(error);
                throw new Error(getAuthErrorMessage(errorResponse.code as ErrorCode));
            }
            throw formatError(error);
        }
    }

    async verifyToken(token: string): Promise<boolean> {
        try {
            const response = await apiConfig.post(
                API_ENDPOINTS.VERIFY_TOKEN,
                { token }
            );
            return response.status === 200;
        } catch {
            return false;
        }
    }

    async logout(): Promise<void> {
        try {
            const token = getToken();
            if (token) {
                await apiConfig.post(
                    API_ENDPOINTS.LOGOUT,
                    {},
                    { headers: getAuthHeader() }
                );
            }
        } catch {
            // Ignore logout errors
        } finally {
            clearTokens();
        }
    }

    isAuthenticated(): boolean {
        const token = getToken();
        return !!token;
    }

    needsTokenRefresh(): boolean {
        const token = getToken();
        if (!token) return false;

        try {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();

            // Return true if token will expire in less than 5 minutes
            return (expirationTime - currentTime) < 300000;
        } catch {
            return false;
        }
    }
}

export const authService = new AuthService();
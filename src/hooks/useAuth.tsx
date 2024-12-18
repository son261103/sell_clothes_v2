import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
    login,
    register,
    registerAdmin,
    registerSuperAdmin,
    logout,
    resetPassword,
    changePassword,
    forceResetPassword,
    superAdminPasswordChange,
    superAdminRecovery,
    refreshToken,
    verifyToken,
    clearError,
    resetAuth
} from '../store/auth/authSlice';
import {
    selectAuthStatus,
    selectUserDetails,
    selectTokenDetails,
    selectHasValidToken,
    selectIsAdmin,
    selectIsSuperAdmin
} from '../store/auth/selectors';
import type {
    AuthRequest,
    RegisterRequest,
    ResetPasswordRequest,
    ForceResetPasswordRequest,
    SuperAdminPasswordChangeRequest,
    SuperAdminRecoveryRequest,
    RefreshTokenRequest,
    AuthResponse,
} from '../types/auth.types';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
    roles: string[];
    exp: number;
    sub: string;
    email?: string;
    fullName?: string;
}

export const useAuth = () => {
    const dispatch = useAppDispatch();

    // Selectors
    const authStatus = useAppSelector(selectAuthStatus);
    const userDetails = useAppSelector(selectUserDetails);
    const tokenDetails = useAppSelector(selectTokenDetails);
    const hasValidToken = useAppSelector(selectHasValidToken);
    const isAdmin = useAppSelector(selectIsAdmin);
    const isSuperAdmin = useAppSelector(selectIsSuperAdmin);

    // Token refresh check and handling
    useEffect(() => {
        if (!hasValidToken) return;

        const checkTokenValidity = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) return;

            try {
                const decodedToken = jwtDecode<TokenPayload>(accessToken);
                const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
                const currentTime = Date.now();
                const timeUntilExpiry = expirationTime - currentTime;

                // If token expires in less than 5 minutes, try to refresh
                if (timeUntilExpiry < 300000) {
                    const refreshTokenStr = localStorage.getItem('refreshToken');
                    if (refreshTokenStr) {
                        try {
                            await handleTokenRefresh({ refreshToken: refreshTokenStr });
                        } catch (error) {
                            console.error('Token refresh failed:', error);
                            await handleLogout();
                        }
                    } else {
                        await handleLogout();
                    }
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                await handleLogout();
            }
        };

        const interval = setInterval(checkTokenValidity, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [hasValidToken]);

    // Auth methods
    const handleLogin = useCallback(
        async (credentials: AuthRequest): Promise<AuthResponse> => {
            try {
                const response = await dispatch(login(credentials)).unwrap();
                if (response.token) {
                    localStorage.setItem('accessToken', response.token);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    localStorage.setItem('tokenType', response.tokenType);
                }
                return response;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        [dispatch]
    );

    const handleRegister = useCallback(
        async (userData: RegisterRequest): Promise<AuthResponse> => {
            try {
                const response = await dispatch(register(userData)).unwrap();
                if (response.token) {
                    localStorage.setItem('accessToken', response.token);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    localStorage.setItem('tokenType', response.tokenType);
                }
                return response;
            } catch (error) {
                console.error('Registration failed:', error);
                throw error;
            }
        },
        [dispatch]
    );

    const handleRegisterAdmin = useCallback(
        async (userData: RegisterRequest): Promise<AuthResponse> => {
            const response = await dispatch(registerAdmin(userData)).unwrap();
            return response;
        },
        [dispatch]
    );

    const handleRegisterSuperAdmin = useCallback(
        async (userData: RegisterRequest): Promise<AuthResponse> => {
            const response = await dispatch(registerSuperAdmin(userData)).unwrap();
            return response;
        },
        [dispatch]
    );

    const handleResetPassword = useCallback(
        async (resetData: ResetPasswordRequest): Promise<void> => {
            await dispatch(resetPassword(resetData)).unwrap();
        },
        [dispatch]
    );

    const handleChangePassword = useCallback(
        async (oldPassword: string, newPassword: string): Promise<void> => {
            await dispatch(changePassword({ oldPassword, newPassword })).unwrap();
        },
        [dispatch]
    );

    const handleForceResetPassword = useCallback(
        async (resetData: ForceResetPasswordRequest): Promise<void> => {
            await dispatch(forceResetPassword(resetData)).unwrap();
        },
        [dispatch]
    );

    const handleSuperAdminPasswordChange = useCallback(
        async (changeData: SuperAdminPasswordChangeRequest): Promise<void> => {
            await dispatch(superAdminPasswordChange(changeData)).unwrap();
        },
        [dispatch]
    );

    const handleSuperAdminRecovery = useCallback(
        async (recoveryData: SuperAdminRecoveryRequest): Promise<void> => {
            await dispatch(superAdminRecovery(recoveryData)).unwrap();
        },
        [dispatch]
    );

    const handleVerifyToken = useCallback(
        async (token: string): Promise<boolean> => {
            return dispatch(verifyToken(token)).unwrap();
        },
        [dispatch]
    );

    const handleTokenRefresh = useCallback(
        async (refreshData: RefreshTokenRequest): Promise<AuthResponse> => {
            try {
                const response = await dispatch(refreshToken(refreshData)).unwrap();
                if (response.token) {
                    localStorage.setItem('accessToken', response.token);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    localStorage.setItem('tokenType', response.tokenType);
                }
                return response;
            } catch (error) {
                console.error('Token refresh failed:', error);
                throw error;
            }
        },
        [dispatch]
    );

    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logout()).unwrap();
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('tokenType');
            dispatch(resetAuth());
        }
    }, [dispatch]);

    const handleClearError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const getAccessToken = useCallback(() => {
        return localStorage.getItem('accessToken');
    }, []);

    const getRefreshToken = useCallback(() => {
        return localStorage.getItem('refreshToken');
    }, []);

    const getUserRoles = useCallback((): string[] => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return [];

            const decodedToken = jwtDecode<TokenPayload>(token);
            return decodedToken.roles || [];
        } catch {
            return [];
        }
    }, []);

    return {
        // Auth state
        ...authStatus,
        user: userDetails,
        tokens: tokenDetails,
        hasValidToken,
        isAdmin,
        isSuperAdmin,

        // Auth methods
        login: handleLogin,
        register: handleRegister,
        registerAdmin: handleRegisterAdmin,
        registerSuperAdmin: handleRegisterSuperAdmin,
        resetPassword: handleResetPassword,
        changePassword: handleChangePassword,
        forceResetPassword: handleForceResetPassword,
        superAdminPasswordChange: handleSuperAdminPasswordChange,
        superAdminRecovery: handleSuperAdminRecovery,
        refreshToken: handleTokenRefresh,
        verifyToken: handleVerifyToken,
        logout: handleLogout,
        clearError: handleClearError,

        // Token utilities
        getAccessToken,
        getRefreshToken,
        getUserRoles
    };
};

export type AuthHookReturn = ReturnType<typeof useAuth>;
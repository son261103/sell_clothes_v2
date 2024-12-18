import {REFRESH_TOKEN_KEY, TOKEN_KEY} from '../constants/auth.constant.tsx';

// Token Utilities
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const getRefreshToken = (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY);

export const setTokens = (token: string, refreshToken: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Authorization Header Utility
export const getAuthHeader = (): Record<string, string> => {
    const token = getToken();
    return token ? {Authorization: `Bearer ${token}`} : {};
};


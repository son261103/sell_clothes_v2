import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

interface TokenPayload {
    exp: number;
    roles: string[];
}

// Create admin API instance
const adminApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
adminApi.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken) {
            return config;
        }

        try {
            const decodedToken = jwtDecode<TokenPayload>(accessToken);
            const currentTime = Date.now() / 1000;

            // If token is expired and we have a refresh token
            if (decodedToken.exp < currentTime && refreshToken) {
                try {
                    const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
                        refreshToken,
                    });

                    const { token: newAccessToken, refreshToken: newRefreshToken } = response.data;

                    localStorage.setItem('accessToken', newAccessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                } catch {
                    // If refresh fails, clear tokens and throw error
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('tokenType');
                    throw new Error('Session expired. Please login again.');
                }
            } else {
                // Token is still valid, add it to request
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch {
            // Invalid token format
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('tokenType');
            throw new Error('Invalid token format');
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// Response interceptor
adminApi.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Clear all auth tokens on unauthorized
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('tokenType');

            // Redirect to login page or dispatch logout action
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

// Helper functions
export const setAuthToken = (token: string) => {
    if (token) {
        adminApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete adminApi.defaults.headers.common['Authorization'];
    }
};

export const checkIsAdmin = (token: string): boolean => {
    try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.roles.includes('ROLE_ADMIN') || decoded.roles.includes('ROLE_SUPER_ADMIN');
    } catch {
        return false;
    }
};

export default adminApi;

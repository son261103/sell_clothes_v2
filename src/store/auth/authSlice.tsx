import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/auth/auth.service';
import {
    AuthRequest,
    RegisterRequest,
    ResetPasswordRequest,
    ForceResetPasswordRequest,
    SuperAdminPasswordChangeRequest,
    SuperAdminRecoveryRequest,
    RefreshTokenRequest,
    User,
    AuthResponse
} from '../../types/auth.types';

export interface AuthState {
    user: Partial<User> | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    tokens: {
        accessToken: string | null;
        refreshToken: string | null;
        tokenType: string | null;
        expiresIn: number | null;
    };
    tokenNeedsRefresh: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    tokens: {
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        tokenType: localStorage.getItem('tokenType') || null,
        expiresIn: null
    },
    tokenNeedsRefresh: false
};

// Helper Functions
const handleAuthSuccess = (state: AuthState, response: AuthResponse) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = {
        username: response.username,
        email: response.email,
        fullName: response.fullName,
        roles: response.roles
    };
    state.tokens = {
        accessToken: response.token,
        refreshToken: response.refreshToken,
        tokenType: response.tokenType,
        expiresIn: response.expiresIn
    };
    state.error = null;

    // Save to localStorage
    localStorage.setItem('accessToken', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('tokenType', response.tokenType);
};

const handleAuthError = (state: AuthState) => {
    state.isAuthenticated = false;
    state.user = null;
    state.tokens = {
        accessToken: null,
        refreshToken: null,
        tokenType: null,
        expiresIn: null
    };
    state.error = null;

    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenType');
};

// Async Thunks
export const login = createAsyncThunk<AuthResponse, AuthRequest>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            return await authService.login(credentials);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
        }
    }
);

export const register = createAsyncThunk<AuthResponse, RegisterRequest>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            return await authService.register(userData);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
        }
    }
);

export const registerAdmin = createAsyncThunk<AuthResponse, RegisterRequest>(
    'auth/registerAdmin',
    async (userData, { rejectWithValue }) => {
        try {
            return await authService.registerAdmin(userData);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Admin registration failed');
        }
    }
);

export const registerSuperAdmin = createAsyncThunk<AuthResponse, RegisterRequest>(
    'auth/registerSuperAdmin',
    async (userData, { rejectWithValue }) => {
        try {
            return await authService.registerSuperAdmin(userData);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Super admin registration failed');
        }
    }
);

export const resetPassword = createAsyncThunk<void, ResetPasswordRequest>(
    'auth/resetPassword',
    async (resetData, { rejectWithValue }) => {
        try {
            await authService.resetPassword(resetData);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Password reset failed');
        }
    }
);

export const changePassword = createAsyncThunk<void, { oldPassword: string; newPassword: string }>(
    'auth/changePassword',
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            await authService.changePassword(oldPassword, newPassword);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Password change failed');
        }
    }
);

export const forceResetPassword = createAsyncThunk<void, ForceResetPasswordRequest>(
    'auth/forceResetPassword',
    async (resetData, { rejectWithValue }) => {
        try {
            await authService.forceResetPassword(resetData);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Force password reset failed');
        }
    }
);

export const superAdminPasswordChange = createAsyncThunk<void, SuperAdminPasswordChangeRequest>(
    'auth/superAdminPasswordChange',
    async (changeData, { rejectWithValue }) => {
        try {
            await authService.superAdminPasswordChange(changeData);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Super admin password change failed');
        }
    }
);

export const superAdminRecovery = createAsyncThunk<void, SuperAdminRecoveryRequest>(
    'auth/superAdminRecovery',
    async (recoveryData, { rejectWithValue }) => {
        try {
            await authService.superAdminRecovery(recoveryData);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Super admin recovery failed');
        }
    }
);

export const refreshToken = createAsyncThunk<AuthResponse, RefreshTokenRequest>(
    'auth/refreshToken',
    async (refreshData, { rejectWithValue }) => {
        try {
            return await authService.refreshToken(refreshData);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Token refresh failed');
        }
    }
);

export const verifyToken = createAsyncThunk<boolean, string>(
    'auth/verifyToken',
    async (token, { rejectWithValue }) => {
        try {
            return await authService.verifyToken(token);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Token verification failed');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkTokenRefreshNeeded: (state: AuthState) => {
            const token = state.tokens.accessToken;
            const expiresIn = state.tokens.expiresIn;

            if (!token || !expiresIn) {
                state.tokenNeedsRefresh = false;
                return;
            }

            try {
                const tokenData = JSON.parse(atob(token.split('.')[1]));
                const expirationTime = tokenData.exp * 1000;
                const currentTime = Date.now();
                state.tokenNeedsRefresh = (expirationTime - currentTime) < 300000; // 5 minutes
            } catch {
                state.tokenNeedsRefresh = false;
            }
        },
        clearError: (state: AuthState) => {
            state.error = null;
        },
        resetAuth: () => initialState
    },
    extraReducers: (builder) => {
        // Login cases
        builder
            .addCase(login.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse>) => {
                handleAuthSuccess(state, action.payload);
            })
            .addCase(login.rejected, (state: AuthState, action) => {
                state.loading = false;
                state.error = action.payload as string;
                handleAuthError(state);
            });

        // Registration cases
        [register, registerAdmin, registerSuperAdmin].forEach(thunk => {
            builder
                .addCase(thunk.pending, (state: AuthState) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(thunk.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse>) => {
                    handleAuthSuccess(state, action.payload);
                })
                .addCase(thunk.rejected, (state: AuthState, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                    handleAuthError(state);
                });
        });

        // Password related cases
        [resetPassword, changePassword, forceResetPassword, superAdminPasswordChange, superAdminRecovery].forEach(thunk => {
            builder
                .addCase(thunk.pending, (state: AuthState) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(thunk.fulfilled, (state: AuthState) => {
                    state.loading = false;
                    state.error = null;
                })
                .addCase(thunk.rejected, (state: AuthState, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                });
        });

        // RefreshToken cases
        builder
            .addCase(refreshToken.fulfilled, (state: AuthState, action: PayloadAction<AuthResponse>) => {
                handleAuthSuccess(state, action.payload);
            });

        // Logout cases
        builder
            .addCase(logout.fulfilled, () => {
                return initialState;
            })
            .addCase(logout.rejected, () => {
                return initialState;
            });
    }
});

export const { checkTokenRefreshNeeded, clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
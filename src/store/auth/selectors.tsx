import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {AuthState} from './authSlice';

// Base selector
const selectAuthState = (state: RootState): AuthState => state.auth;

// User selectors
export const selectUser = createSelector(
    selectAuthState,
    (auth) => auth.user
);

export const selectUserId = createSelector(
    selectUser,
    (user) => user?.userId
);

export const selectUserRoles = createSelector(
    selectUser,
    (user) => user?.roles || []
);

export const selectUserEmail = createSelector(
    selectUser,
    (user) => user?.email
);

export const selectUserFullName = createSelector(
    selectUser,
    (user) => user?.fullName
);

export const selectUsername = createSelector(
    selectUser,
    (user) => user?.username
);

// Auth state selectors
export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (auth) => auth.isAuthenticated
);

export const selectIsLoading = createSelector(
    selectAuthState,
    (auth) => auth.loading
);

export const selectError = createSelector(
    selectAuthState,
    (auth) => auth.error
);

// Token selectors
export const selectTokens = createSelector(
    selectAuthState,
    (auth) => auth.tokens
);

export const selectAccessToken = createSelector(
    selectTokens,
    (tokens) => tokens.accessToken
);

export const selectRefreshToken = createSelector(
    selectTokens,
    (tokens) => tokens.refreshToken
);

export const selectTokenType = createSelector(
    selectTokens,
    (tokens) => tokens.tokenType
);

export const selectTokenExpiresIn = createSelector(
    selectTokens,
    (tokens) => tokens.expiresIn
);

export const selectTokenNeedsRefresh = createSelector(
    selectAuthState,
    (auth) => auth.tokenNeedsRefresh
);

// Role-based selectors
export const selectIsSuperAdmin = createSelector(
    selectUserRoles,
    (roles) => roles.includes('SUPER_ADMIN')
);

export const selectIsAdmin = createSelector(
    selectUserRoles,
    (roles) => roles.includes('ADMIN')
);

// Complex selectors
export const selectAuthStatus = createSelector(
    [selectIsAuthenticated, selectIsLoading, selectError],
    (isAuthenticated, isLoading, error) => ({
        isAuthenticated,
        isLoading,
        error
    })
);

export const selectUserDetails = createSelector(
    [selectUser, selectUserRoles],
    (user, roles) => ({
        ...user,
        roles,
        isSuperAdmin: roles.includes('SUPER_ADMIN'),
        isAdmin: roles.includes('ADMIN')
    })
);

export const selectTokenDetails = createSelector(
    [selectTokens, selectTokenNeedsRefresh],
    (tokens, needsRefresh) => ({
        ...tokens,
        needsRefresh
    })
);

// Type-guard selector
export const selectHasValidToken = createSelector(
    [selectAccessToken, selectTokenNeedsRefresh],
    (accessToken, needsRefresh) => Boolean(accessToken && !needsRefresh)
);
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
    fetchPaymentMethods,
    fetchPaymentMethodById,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    searchPaymentMethods,
    clearError,
    resetPaymentMethod
} from '../store/admin/payment.method/payment.method.slice';
import {
    selectAllPaymentMethods,
    selectSelectedPaymentMethod,
    selectPaymentMethodStatus,
    selectPaymentMethodDetails,
    selectPaymentMethodStats
} from '../store/admin/payment.method/payment.method.selectors';
import { CreatePaymentMethodRequest, UpdatePaymentMethodRequest } from '../types/payment.method.types';
import { useAuth } from './useAuth';

// Define strict types for API errors
interface ApiErrorResponse {
    status: number;
    data: {
        message: string;
        error?: string;
        details?: Record<string, string[]>; // Optional detailed error information
    };
}

interface ApiError extends Error {
    response?: ApiErrorResponse;
}

export const usePaymentMethod = () => {
    const dispatch = useAppDispatch();
    const { getAccessToken, logout } = useAuth();

    // Selectors
    const paymentMethods = useAppSelector(selectAllPaymentMethods);
    const selectedPaymentMethod = useAppSelector(selectSelectedPaymentMethod);
    const { loading, error } = useAppSelector(selectPaymentMethodStatus);
    const paymentMethodDetails = useAppSelector(selectPaymentMethodDetails);
    const paymentMethodStats = useAppSelector(selectPaymentMethodStats);

    // Error Handler
    const handleAuthError = useCallback(async (error: ApiError) => {
        if (error.response?.status === 401) {
            await logout();
            throw new Error('Authentication expired. Please login again.');
        }
        // Handle specific API error responses
        if (error.response?.data) {
            throw new Error(error.response.data.message || 'An error occurred with the API request');
        }
        throw error;
    }, [logout]);

    // Token Validator
    const validateToken = useCallback((): string => {
        const token = getAccessToken();
        if (!token) {
            throw new Error('No access token available');
        }
        return token;
    }, [getAccessToken]);

    // Base Payment Methods Actions
    const getAllPaymentMethods = useCallback(async () => {
        try {
            validateToken();
            await dispatch(fetchPaymentMethods()).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const getPaymentMethodById = useCallback(async (paymentMethodId: number) => {
        try {
            validateToken();
            await dispatch(fetchPaymentMethodById(paymentMethodId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Create, Update, and Delete Actions
    const createNewPaymentMethod = useCallback(async (request: CreatePaymentMethodRequest) => {
        try {
            validateToken();
            await dispatch(createPaymentMethod(request)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const updateExistingPaymentMethod = useCallback(async (paymentMethodId: number, request: UpdatePaymentMethodRequest) => {
        try {
            validateToken();
            await dispatch(updatePaymentMethod({ paymentMethodId, request })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const removePaymentMethod = useCallback(async (paymentMethodId: number) => {
        try {
            validateToken();
            await dispatch(deletePaymentMethod(paymentMethodId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Search Action
    const searchPaymentMethodsByKeyword = useCallback(async (keyword: string) => {
        try {
            validateToken();
            await dispatch(searchPaymentMethods(keyword)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const clearPaymentMethodError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const resetPaymentMethodState = useCallback(() => {
        dispatch(resetPaymentMethod());
    }, [dispatch]);

    return {
        // State
        paymentMethods,
        selectedPaymentMethod,
        loading,
        error,
        paymentMethodDetails,
        paymentMethodStats,

        // Base Payment Methods Actions
        getAllPaymentMethods,
        getPaymentMethodById,
        searchPaymentMethodsByKeyword,

        // Create, Update, Delete Actions
        createNewPaymentMethod,
        updateExistingPaymentMethod,
        removePaymentMethod,

        // State Management
        clearPaymentMethodError,
        resetPaymentMethodState
    };
};

// Type export for consumers of the hook
export type PaymentMethodHookReturn = ReturnType<typeof usePaymentMethod>;

export default usePaymentMethod;

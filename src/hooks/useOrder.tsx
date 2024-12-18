import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
    fetchOrdersByUser,
    searchOrders,
    fetchOrderStatistics,
    fetchTopOrders,
    clearSelectedOrder,
    clearError,
    resetOrder,
    clearSearchResults
} from '../store/admin/order/order.slice';
import {
    selectAllOrders,
    selectSearchResults,
    selectUserOrders,
    selectSelectedOrder,
    selectOrderStatus,
    selectOrderDetails,
    selectOrderStats,
    selectOrdersByStatusCount,
    selectTotalOrdersAmount,
    selectOrdersByStatusAmount,
    selectDailyOrderStats,
    selectTopUsers
} from '../store/admin/order/order.selectors';
import { CreateOrderRequest, UpdateOrderRequest, OrderSearchParams } from '../types/order.types';
import { useAuth } from './useAuth';

// Define strict types for API errors
interface ApiErrorResponse {
    status: number;
    data: {
        message: string;
        error?: string;
        details?: Record<string, string[]>;
    };
}

interface ApiError extends Error {
    response?: ApiErrorResponse;
}

export const useOrder = () => {
    const dispatch = useAppDispatch();
    const { getAccessToken, logout } = useAuth();

    // Selectors
    const orders = useAppSelector(selectAllOrders);
    const searchResults = useAppSelector(selectSearchResults);
    const userOrders = useAppSelector(selectUserOrders);
    const selectedOrder = useAppSelector(selectSelectedOrder);
    const { loading, error } = useAppSelector(selectOrderStatus);
    const orderDetails = useAppSelector(selectOrderDetails);
    const orderStats = useAppSelector(selectOrderStats);
    const statusCount = useAppSelector(selectOrdersByStatusCount);
    const totalAmount = useAppSelector(selectTotalOrdersAmount);
    const statusAmount = useAppSelector(selectOrdersByStatusAmount);
    const dailyStats = useAppSelector(selectDailyOrderStats);
    const topUsers = useAppSelector(selectTopUsers);

    // Error Handler
    const handleAuthError = useCallback(async (error: ApiError) => {
        if (error.response?.status === 401) {
            await logout();
            throw new Error('Authentication expired. Please login again.');
        }
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

    // Base Order Actions
    const getAllOrders = useCallback(async (page: number, size: number) => {
        try {
            validateToken();
            await dispatch(fetchOrders({ page, size })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const getOrderById = useCallback(async (orderId: number) => {
        try {
            validateToken();
            await dispatch(fetchOrderById(orderId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Order CRUD Operations
    const createNewOrder = useCallback(async (request: CreateOrderRequest) => {
        try {
            validateToken();
            await dispatch(createOrder(request)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const updateExistingOrder = useCallback(async (orderId: number, request: UpdateOrderRequest) => {
        try {
            validateToken();
            await dispatch(updateOrder({ orderId, request })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const removeOrder = useCallback(async (orderId: number) => {
        try {
            validateToken();
            await dispatch(deleteOrder(orderId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Order Status Management
    const changeOrderStatus = useCallback(async (orderId: number, status: string) => {
        try {
            validateToken();
            await dispatch(updateOrderStatus({ orderId, status })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // User Related Actions
    const getUserOrders = useCallback(async (userId: number, page: number, size: number) => {
        try {
            validateToken();
            await dispatch(fetchOrdersByUser({ userId, page, size })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Search and Filter Actions
    const searchOrdersWithParams = useCallback(async (params: OrderSearchParams, page: number, size: number) => {
        try {
            validateToken();
            await dispatch(searchOrders({ params, page, size })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Statistics Actions
    const getOrderStatistics = useCallback(async () => {
        try {
            validateToken();
            await dispatch(fetchOrderStatistics()).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const getTopOrdersByAmount = useCallback(async (
        startDate: string,
        endDate: string,
        status: string,
        limit: number
    ) => {
        try {
            validateToken();
            await dispatch(fetchTopOrders({ startDate, endDate, status, limit })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // State Management Actions
    const clearSelected = useCallback(() => {
        dispatch(clearSelectedOrder());
    }, [dispatch]);

    const clearOrderError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const resetOrderState = useCallback(() => {
        dispatch(resetOrder());
    }, [dispatch]);

    const clearSearch = useCallback(() => {
        dispatch(clearSearchResults());
    }, [dispatch]);

    return {
        // State
        orders,
        searchResults,
        userOrders,
        selectedOrder,
        loading,
        error,
        orderDetails,
        orderStats,
        statusCount,
        totalAmount,
        statusAmount,
        dailyStats,
        topUsers,

        // Base Order Actions
        getAllOrders,
        getOrderById,

        // CRUD Operations
        createNewOrder,
        updateExistingOrder,
        removeOrder,

        // Order Status Management
        changeOrderStatus,

        // User Related Actions
        getUserOrders,

        // Search and Filter Actions
        searchOrdersWithParams,

        // Statistics Actions
        getOrderStatistics,
        getTopOrdersByAmount,

        // State Management
        clearSelected,
        clearOrderError,
        resetOrderState,
        clearSearch
    };
};

// Type export for consumers of the hook
export type OrderHookReturn = ReturnType<typeof useOrder>;

export default useOrder;
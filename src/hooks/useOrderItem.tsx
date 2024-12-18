import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
    fetchOrderItems,
    fetchOrderItemByIds,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
    bulkCreateOrderItems,
    bulkUpdateOrderItems,
    clearSelectedOrderItem,
    clearError,
    resetOrderItems,
    updateTotals
} from '../store/admin/order.item/order.item.slice';
import {
    selectAllOrderItems,
    selectSelectedOrderItem,
    selectOrderItemTotals,
    selectOrderItemStats,
    selectOrderItemLoading,
    selectOrderItemError,
    selectOrderItemMetadata,
} from '../store/admin/order.item/order.item.selectors';
import {
    CreateOrderItemRequest,
    UpdateOrderItemRequest,
} from '../types/order.item.types';
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

export const useOrderItem = () => {
    const dispatch = useAppDispatch();
    const { getAccessToken, logout } = useAuth();

    // Selectors
    const orderItems = useAppSelector(selectAllOrderItems);
    const selectedOrderItem = useAppSelector(selectSelectedOrderItem);
    const { totalQuantity, totalAmount } = useAppSelector(selectOrderItemTotals);
    const stats = useAppSelector(selectOrderItemStats);
    const loading = useAppSelector(selectOrderItemLoading);
    const error = useAppSelector(selectOrderItemError);
    const metadata = useAppSelector(selectOrderItemMetadata);

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

    // Basic CRUD Operations
    const getOrderItems = useCallback(async (orderId: number) => {
        try {
            validateToken();
            await dispatch(fetchOrderItems(orderId)).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const getOrderItemByIds = useCallback(async (orderId: number, productId: number) => {
        try {
            validateToken();
            await dispatch(fetchOrderItemByIds({ orderId, productId })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const createNewOrderItem = useCallback(async (
        orderId: number,
        request: CreateOrderItemRequest
    ) => {
        try {
            validateToken();
            await dispatch(createOrderItem({ orderId, request })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const updateExistingOrderItem = useCallback(async (
        orderId: number,
        productId: number,
        request: UpdateOrderItemRequest
    ) => {
        try {
            validateToken();
            await dispatch(updateOrderItem({ orderId, productId, request })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const removeOrderItem = useCallback(async (orderId: number, productId: number) => {
        try {
            validateToken();
            await dispatch(deleteOrderItem({ orderId, productId })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Batch Operations
    const bulkCreate = useCallback(async (
        orderId: number,
        items: CreateOrderItemRequest[]
    ) => {
        try {
            validateToken();
            await dispatch(bulkCreateOrderItems({ orderId, items })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    const bulkUpdate = useCallback(async (
        orderId: number,
        items: Array<{ productId: number; request: UpdateOrderItemRequest }>
    ) => {
        try {
            validateToken();
            await dispatch(bulkUpdateOrderItems({ orderId, items })).unwrap();
        } catch (error) {
            await handleAuthError(error as ApiError);
        }
    }, [dispatch, validateToken, handleAuthError]);

    // Memoized Selectors
    const orderItemsByOrderId = useMemo(() => {
        return (orderId: number) => orderItems.filter(item => item.orderId === orderId);
    }, [orderItems]);

    const topSellingProducts = useMemo(() => {
        return (limit: number = 5) => {
            return [...orderItems]
                .sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price))
                .slice(0, limit);
        };
    }, [orderItems]);

    // State Management
    const clearSelected = useCallback(() => {
        dispatch(clearSelectedOrderItem());
    }, [dispatch]);

    const clearOrderItemError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const resetOrderItemState = useCallback(() => {
        dispatch(resetOrderItems());
    }, [dispatch]);

    const recalculateTotals = useCallback(() => {
        dispatch(updateTotals());
    }, [dispatch]);

    return {
        // State
        orderItems,
        selectedOrderItem,
        totalQuantity,
        totalAmount,
        loading,
        error,
        stats,
        metadata,

        // Basic CRUD Operations
        getOrderItems,
        getOrderItemByIds,
        createNewOrderItem,
        updateExistingOrderItem,
        removeOrderItem,

        // Batch Operations
        bulkCreate,
        bulkUpdate,

        // Utility Functions
        getOrderItemsByOrder: orderItemsByOrderId,
        getTopSellingProducts: topSellingProducts,

        // State Management
        clearSelected,
        clearOrderItemError,
        resetOrderItemState,
        recalculateTotals
    };
};

// Type export for consumers of the hook
export type OrderItemHookReturn = ReturnType<typeof useOrderItem>;

export default useOrderItem;
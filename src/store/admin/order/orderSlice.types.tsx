import { OrderDTO } from "../../../types/order.types";

export interface OrderState {
    // List of all orders
    orders: OrderDTO[];

    // Currently selected/active order
    selectedOrder: OrderDTO | null;

    // Filtered orders lists
    searchResults: OrderDTO[];
    userOrders: OrderDTO[];

    // Loading and error states
    loading: boolean;
    error: string | null;

    // Statistics and metadata
    totalOrders: number;
    totalAmount: number;
    lastUpdated: string | null;

    // Order statistics by status
    ordersByStatus: {
        pending: number;
        processing: number;
        shipped: number;
        delivered: number;
        cancelled: number;
    };

    // Daily/monthly statistics
    orderStatistics: {
        daily: number;
        monthly: number;
        total: number;
    };
}

export const initialState: OrderState = {
    orders: [],
    selectedOrder: null,
    searchResults: [],
    userOrders: [],
    loading: false,
    error: null,
    totalOrders: 0,
    totalAmount: 0,
    lastUpdated: null,
    ordersByStatus: {
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
    },
    orderStatistics: {
        daily: 0,
        monthly: 0,
        total: 0
    }
};
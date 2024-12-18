import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import { OrderState } from './orderSlice.types';

// Base Selector
const selectOrderState = (state: RootState): OrderState => state.order;

// Basic Selectors
export const selectAllOrders = createSelector(
    [selectOrderState],
    (orderState) => orderState.orders || []
);

export const selectSearchResults = createSelector(
    [selectOrderState],
    (orderState) => orderState.searchResults
);

export const selectUserOrders = createSelector(
    [selectOrderState],
    (orderState) => orderState.userOrders
);

// Specific Order Selectors
export const selectOrderById = (orderId: number) =>
    createSelector(
        [selectAllOrders],
        (orders) => orders.find((order) => order.order_item_id === orderId)
    );

export const selectOrdersByUserId = (userId: number) =>
    createSelector(
        [selectAllOrders],
        (orders) => orders.filter((order) => order.userId === userId)
    );

// Selected Order Related
export const selectSelectedOrder = createSelector(
    [selectOrderState],
    (orderState) => orderState.selectedOrder
);

// Status Selectors
export const selectOrderLoading = createSelector(
    [selectOrderState],
    (orderState) => orderState.loading
);

export const selectOrderError = createSelector(
    [selectOrderState],
    (orderState) => orderState.error
);

// Search and Filter Selectors
export const selectOrdersByStatus = (status: string) =>
    createSelector(
        [selectAllOrders],
        (orders) => orders.filter((order) => order.status === status)
    );

export const selectOrdersByDateRange = (startDate: string, endDate: string) =>
    createSelector(
        [selectAllOrders],
        (orders) => orders.filter((order) => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
        })
    );

export const selectOrdersByAmountRange = (minAmount: number, maxAmount: number) =>
    createSelector(
        [selectAllOrders],
        (orders) => orders.filter((order) =>
            order.totalAmount >= minAmount && order.totalAmount <= maxAmount
        )
    );

// Statistics Selectors
export const selectOrderStatistics = createSelector(
    [selectOrderState],
    (orderState) => orderState.orderStatistics
);

export const selectOrdersByStatusCount = createSelector(
    [selectAllOrders],
    (orders) => {
        const statusCount = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return statusCount;
    }
);

export const selectTotalOrdersAmount = createSelector(
    [selectAllOrders],
    (orders) => orders.reduce((sum, order) => sum + order.totalAmount, 0)
);

export const selectOrdersByStatusAmount = createSelector(
    [selectAllOrders],
    (orders) => {
        const statusAmount = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + order.totalAmount;
            return acc;
        }, {} as Record<string, number>);
        return statusAmount;
    }
);

// Complex/Combined Selectors
export const selectOrderStatus = createSelector(
    [selectOrderLoading, selectOrderError],
    (loading, error) => ({ loading, error })
);

export const selectOrderDetails = createSelector(
    [selectAllOrders, selectUserOrders, selectOrderState],
    (orders, userOrders, state) => ({
        orders,
        userOrders,
        totalOrders: state.totalOrders,
        lastUpdated: state.lastUpdated
    })
);

export const selectOrderStats = createSelector(
    [selectAllOrders],
    (orders) => ({
        totalOrders: orders.length,
        totalAmount: orders.reduce((sum, order) => sum + order.totalAmount, 0),
        averageOrderAmount: orders.length
            ? (orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length).toFixed(2)
            : 0,
        statusDistribution: orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    })
);

// Time-based Selectors
export const selectDailyOrderStats = createSelector(
    [selectAllOrders],
    (orders) => {
        const dailyStats = orders.reduce((acc, order) => {
            const date = new Date(order.orderDate).toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = {
                    count: 0,
                    totalAmount: 0
                };
            }
            acc[date].count += 1;
            acc[date].totalAmount += order.totalAmount;
            return acc;
        }, {} as Record<string, { count: number; totalAmount: number }>);
        return dailyStats;
    }
);

// User-based Selectors
export const selectTopUsers = createSelector(
    [selectAllOrders],
    (orders) => {
        const userStats = orders.reduce((acc, order) => {
            if (!acc[order.userId]) {
                acc[order.userId] = {
                    userId: order.userId,
                    username: order.username,
                    orderCount: 0,
                    totalAmount: 0
                };
            }
            acc[order.userId].orderCount += 1;
            acc[order.userId].totalAmount += order.totalAmount;
            return acc;
        }, {} as Record<number, { userId: number; username?: string; orderCount: number; totalAmount: number }>);

        return Object.values(userStats)
            .sort((a, b) => b.totalAmount - a.totalAmount);
    }
);

// Pagination Selectors
export const selectPaginatedOrders = (page: number, limit: number) =>
    createSelector(
        [selectAllOrders],
        (orders) => {
            const startIndex = page * limit;
            return orders.slice(startIndex, startIndex + limit);
        }
    );

// Metadata Selectors
export const selectOrderMetadata = createSelector(
    [selectOrderState],
    (orderState) => ({
        totalOrders: orderState.totalOrders,
        lastUpdated: orderState.lastUpdated
    })
);

// Sort Selectors
export const selectOrdersSortedByDate = createSelector(
    [selectAllOrders],
    (orders) => [...orders].sort((a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    )
);

export const selectOrdersSortedByAmount = createSelector(
    [selectAllOrders],
    (orders) => [...orders].sort((a, b) => b.totalAmount - a.totalAmount)
);